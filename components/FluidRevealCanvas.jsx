"use client";

import React, { useEffect, useRef } from "react";

// --- GLSL SHADERS (WebGL2 / ES 3.00) ---

const baseVertexShader = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const advectShader = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 out_color;
uniform sampler2D u_velocity;
uniform sampler2D u_target;
uniform float u_dt;
uniform float u_dissipation;

void main() {
  vec2 vel = texture(u_velocity, v_uv).xy;
  vec2 coord = v_uv - u_dt * vel;
  out_color = u_dissipation * texture(u_target, coord);
}
`;

const splatShader = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 out_color;
uniform sampler2D u_base;
uniform vec2 u_point;
uniform vec3 u_color;
uniform float u_radius;
uniform float u_aspect;

void main() {
  vec2 p = v_uv - u_point;
  p.x *= u_aspect;
  float d = exp(-dot(p, p) / u_radius);
  vec4 base = texture(u_base, v_uv);
  out_color = base + vec4(u_color, 0.0) * d;
}
`;

const curlShader = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 out_color;
uniform sampler2D u_velocity;
uniform vec2 u_texelSize;

void main() {
  float L = texture(u_velocity, v_uv - vec2(u_texelSize.x, 0.0)).y;
  float R = texture(u_velocity, v_uv + vec2(u_texelSize.x, 0.0)).y;
  float T = texture(u_velocity, v_uv + vec2(0.0, u_texelSize.y)).x;
  float B = texture(u_velocity, v_uv - vec2(0.0, u_texelSize.y)).x;
  float curl = R - L - T + B;
  out_color = vec4(curl, 0.0, 0.0, 1.0);
}
`;

const vorticityShader = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 out_color;
uniform sampler2D u_velocity;
uniform sampler2D u_curl;
uniform vec2 u_texelSize;
uniform float u_dt;
uniform float u_curlStrength;

void main() {
  float L = texture(u_curl, v_uv - vec2(u_texelSize.x, 0.0)).r;
  float R = texture(u_curl, v_uv + vec2(u_texelSize.x, 0.0)).r;
  float T = texture(u_curl, v_uv + vec2(0.0, u_texelSize.y)).r;
  float B = texture(u_curl, v_uv - vec2(0.0, u_texelSize.y)).r;
  float C = texture(u_curl, v_uv).r;

  vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L));
  float len = length(force);
  if (len > 0.0001) {
    force = normalize(force) * C * u_curlStrength;
  } else {
    force = vec2(0.0);
  }

  vec2 vel = texture(u_velocity, v_uv).xy;
  out_color = vec4(vel + force * u_dt, 0.0, 1.0);
}
`;

const divergenceShader = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 out_color;
uniform sampler2D u_velocity;
uniform vec2 u_texelSize;

void main() {
  float L = texture(u_velocity, v_uv - vec2(u_texelSize.x, 0.0)).x;
  float R = texture(u_velocity, v_uv + vec2(u_texelSize.x, 0.0)).x;
  float T = texture(u_velocity, v_uv + vec2(0.0, u_texelSize.y)).y;
  float B = texture(u_velocity, v_uv - vec2(0.0, u_texelSize.y)).y;
  float div = 0.5 * (R - L + T - B);
  out_color = vec4(div, 0.0, 0.0, 1.0);
}
`;

const pressureShader = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 out_color;
uniform sampler2D u_pressure;
uniform sampler2D u_divergence;
uniform vec2 u_texelSize;

void main() {
  float L = texture(u_pressure, v_uv - vec2(u_texelSize.x, 0.0)).r;
  float R = texture(u_pressure, v_uv + vec2(u_texelSize.x, 0.0)).r;
  float T = texture(u_pressure, v_uv + vec2(0.0, u_texelSize.y)).r;
  float B = texture(u_pressure, v_uv - vec2(0.0, u_texelSize.y)).r;
  float div = texture(u_divergence, v_uv).r;
  float p = 0.25 * (L + R + T + B - div);
  out_color = vec4(p, 0.0, 0.0, 1.0);
}
`;

const projectShader = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 out_color;
uniform sampler2D u_velocity;
uniform sampler2D u_pressure;
uniform vec2 u_texelSize;

void main() {
  float L = texture(u_pressure, v_uv - vec2(u_texelSize.x, 0.0)).r;
  float R = texture(u_pressure, v_uv + vec2(u_texelSize.x, 0.0)).r;
  float T = texture(u_pressure, v_uv + vec2(0.0, u_texelSize.y)).r;
  float B = texture(u_pressure, v_uv - vec2(0.0, u_texelSize.y)).r;
  vec2 vel = texture(u_velocity, v_uv).xy;
  vel -= 0.5 * vec2(R - L, T - B);
  out_color = vec4(vel, 0.0, 1.0);
}
`;

const compositeShader = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 out_color;

uniform sampler2D u_topImage;
uniform sampler2D u_bottomImage;
uniform sampler2D u_density;
uniform sampler2D u_velocity;

uniform vec2 u_uvScale;
uniform vec2 u_uvOffset;
uniform float u_time;

void main() {
  // Read fluid density directly with zero coordinate distortion to prevent jitter
  float maskVal = texture(u_density, v_uv).r;
  
  // Base image coordinates (object-fit mapped, 100% still and undistorted)
  vec2 imgUV = v_uv * u_uvScale + u_uvOffset;
  
  // Sample top and bottom images (absolutely static and sharp)
  vec4 topColor = texture(u_topImage, imgUV);
  vec4 bottomColor = texture(u_bottomImage, imgUV);
  
  // Smooth, organic transition simulating water surface tension
  float reveal = smoothstep(0.075, 0.125, maskVal);
  
  // Edge glow centered exactly on the liquid boundary (maskVal = 0.1)
  float distToBoundary = abs(maskVal - 0.1);
  float glowFactor = smoothstep(0.12, 0.0, distToBoundary);
  glowFactor = pow(glowFactor, 2.5); // Concentrate glow strictly at the boundary
  
  // Gold-orange glow matching the theme (#ff681c)
  vec3 glowColor = vec3(1.0, 0.408, 0.11);
  
  vec4 finalColor = mix(topColor, bottomColor, reveal);
  finalColor.rgb += glowColor * glowFactor * 0.75;
  
  out_color = finalColor;
}
`;

// --- HELPER COMPILING AND EXPERT CACHING FUNCTIONS ---

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader Compile Error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vsSource, fsSource) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program Link Error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// Optimization: Factory function to retrieve uniform maps once to bypass lookups in frame loop
function getUniforms(gl, program, names) {
  const map = {};
  names.forEach((name) => {
    map[name] = gl.getUniformLocation(program, name);
  });
  return map;
}

export default function FluidRevealCanvas({ ruchitImg, ruchitRevealedImg }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isMounted = true;

    // 1. Initialize WebGL2 Setup
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: true,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.error("WebGL2 context unavailable.");
      return;
    }

    let internalFormat = gl.RGBA;
    let format = gl.RGBA;
    let type = gl.UNSIGNED_BYTE;

    if (gl.getExtension("EXT_color_buffer_float")) {
      internalFormat = gl.RGBA16F;
      type = gl.HALF_FLOAT;
    }
    gl.getExtension("OES_texture_float_linear");

    const gridWidth = 128;
    const gridHeight = 128;
    const texelSizeX = 1.0 / gridWidth;
    const texelSizeY = 1.0 / gridHeight;

    // 2. Compile Programs
    const advectProg = createProgram(gl, baseVertexShader, advectShader);
    const splatProg = createProgram(gl, baseVertexShader, splatShader);
    const curlProg = createProgram(gl, baseVertexShader, curlShader);
    const vorticityProg = createProgram(gl, baseVertexShader, vorticityShader);
    const divergenceProg = createProgram(gl, baseVertexShader, divergenceShader);
    const pressureProg = createProgram(gl, baseVertexShader, pressureShader);
    const projectProg = createProgram(gl, baseVertexShader, projectShader);
    const compositeProg = createProgram(gl, baseVertexShader, compositeShader);

    // 3. Cache Uniform Locations At Compilation Phase (Crucial Optimization)
    const advectUniforms = getUniforms(gl, advectProg, ["u_velocity", "u_target", "u_dt", "u_dissipation"]);
    const splatUniforms = getUniforms(gl, splatProg, ["u_base", "u_point", "u_color", "u_radius", "u_aspect"]);
    const curlUniforms = getUniforms(gl, curlProg, ["u_velocity", "u_texelSize"]);
    const vorticityUniforms = getUniforms(gl, vorticityProg, ["u_velocity", "u_curl", "u_texelSize", "u_dt", "u_curlStrength"]);
    const divergenceUniforms = getUniforms(gl, divergenceProg, ["u_velocity", "u_texelSize"]);
    const pressureUniforms = getUniforms(gl, pressureProg, ["u_pressure", "u_divergence", "u_texelSize"]);
    const projectUniforms = getUniforms(gl, projectProg, ["u_velocity", "u_pressure", "u_texelSize"]);
    const compositeUniforms = getUniforms(gl, compositeProg, ["u_topImage", "u_bottomImage", "u_density", "u_velocity", "u_uvScale", "u_uvOffset", "u_time"]);

    const quadVertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const quadVAO = gl.createVertexArray();
    const quadBuffer = gl.createBuffer();
    gl.bindVertexArray(quadVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // 4. Buffer Creation Hooks
    function createTexture(w, h) {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return tex;
    }

    function createFbo(tex) {
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return fbo;
    }

    function createPingPong(w, h) {
      const texA = createTexture(w, h);
      const texB = createTexture(w, h);
      const fboA = createFbo(texA);
      const fboB = createFbo(texB);
      return {
        read: texA,
        write: texB,
        readFbo: fboA,
        writeFbo: fboB,
        swap() {
          let tmpTex = this.read; this.read = this.write; this.write = tmpTex;
          let tmpFbo = this.readFbo; this.readFbo = this.writeFbo; this.writeFbo = tmpFbo;
        },
      };
    }

    const velocity = createPingPong(gridWidth, gridHeight);
    const density = createPingPong(gridWidth, gridHeight);
    const pressure = createPingPong(gridWidth, gridHeight);

    const divergenceTex = createTexture(gridWidth, gridHeight);
    const divergenceFbo = createFbo(divergenceTex);
    const curlTex = createTexture(gridWidth, gridHeight);
    const curlFbo = createFbo(curlTex);

    // 5. Native Image Handling Lifecycle
    let topImageLoaded = false;
    let bottomImageLoaded = false;
    let imgAspect = 1.0;
    let imgNaturalWidth = 1;
    let imgNaturalHeight = 1;
    let hasTriggeredSplash = false; // Flag to prevent multiple initial splashes

    const topTex = gl.createTexture();
    const bottomTex = gl.createTexture();

    function setupImageTexture(tex, image) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    // New Idea Execution: Smooth initial fluid entry burst when readiness conditions are satisfied
    function triggerIntroSplash() {
      if (hasTriggeredSplash) return;
      hasTriggeredSplash = true;

      // Emit a sequence of centered splashes to cleanly wake up the mask dynamically
      setTimeout(() => {
        if (!isMounted) return;
        splat(velocity, 0.5, 0.5, 0.0, 1.5, 0.008, 0.0);
        splat(density, 0.5, 0.5, 2.5, 0.0, 0.008, 0.0);
      }, 200);

      setTimeout(() => {
        if (!isMounted) return;
        splat(velocity, 0.45, 0.55, -1.0, -0.5, 0.005, 0.0);
        splat(density, 0.45, 0.55, 1.8, 0.0, 0.005, 0.0);
        splat(velocity, 0.55, 0.45, 1.0, 0.5, 0.005, 0.0);
        splat(density, 0.55, 0.45, 1.8, 0.0, 0.005, 0.0);
      }, 450);
    }

    const topImg = new Image();
    topImg.crossOrigin = "anonymous";
    topImg.onload = () => {
      if (!isMounted) return;
      setupImageTexture(topTex, topImg);
      imgNaturalWidth = topImg.naturalWidth;
      imgNaturalHeight = topImg.naturalHeight;
      imgAspect = imgNaturalWidth / imgNaturalHeight;
      topImageLoaded = true;
      triggerResize();
      if (bottomImageLoaded) triggerIntroSplash();
    };
    topImg.src = ruchitImg;

    const bottomImg = new Image();
    bottomImg.crossOrigin = "anonymous";
    bottomImg.onload = () => {
      if (!isMounted) return;
      setupImageTexture(bottomTex, bottomImg);
      bottomImageLoaded = true;
      triggerResize();
      if (topImageLoaded) triggerIntroSplash();
    };
    bottomImg.src = ruchitRevealedImg;

    // 6. Interaction Model Coordinates Tracker
    const pointer = { x: 0, y: 0, lx: 0, ly: 0, vx: 0, vy: 0, active: false, moved: false };
    let uvScale = [1, 1];
    let uvOffset = [0, 0];

    const triggerResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      if (imgNaturalWidth > 1 && imgNaturalHeight > 1) {
        const rc = rect.width / rect.height;
        const ri = imgAspect;
        let sx = 1.0, sy = 1.0, ax = 0.5, ay = 0.5;

        if (window.innerWidth < 768) {
          if (rc > ri) { sx = rc / ri; sy = 1.0; } else { sx = 1.0; sy = ri / rc; }
          ax = 1.0; ay = 1.0;
        } else {
          if (rc > ri) { sx = 1.0; sy = ri / rc; } else { sx = rc / ri; sy = 1.0; }
          ax = 0.5; ay = 0.5;
        }
        uvScale = [sx, sy];
        uvOffset = [ax * (1.0 - sx), ay * (1.0 - sy)];
      }
    };

    window.addEventListener("resize", triggerResize);
    triggerResize();

    const getPointerCoords = (e) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      let clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) / rect.width,
        y: 1.0 - (clientY - rect.top) / rect.height
      };
    };

    const handlePointerDown = (e) => {
      const coords = getPointerCoords(e);
      Object.assign(pointer, { ...coords, lx: coords.x, ly: coords.y, vx: 0, vy: 0, active: true });
    };

    const handlePointerMove = (e) => {
      const coords = getPointerCoords(e);
      if (!pointer.active) {
        Object.assign(pointer, { ...coords, lx: coords.x, ly: coords.y, active: true });
      }
      pointer.x = coords.x;
      pointer.y = coords.y;
      pointer.moved = true;
    };

    const handlePointerLeave = () => { pointer.active = false; };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerLeave);
    canvas.addEventListener("pointercancel", handlePointerLeave);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    const preventDefault = (e) => { if (pointer.active) e.preventDefault(); };
    canvas.addEventListener("touchstart", preventDefault, { passive: false });
    canvas.addEventListener("touchmove", preventDefault, { passive: false });

    // 7. Render Execution Pipeline
    function splat(target, x, y, vx, vy, rad, rColor) {
      gl.useProgram(splatProg);
      gl.uniform1i(splatUniforms.u_base, 0);
      gl.uniform2f(splatUniforms.u_point, x, y);
      gl.uniform3f(splatUniforms.u_color, vx, vy, rColor);
      gl.uniform1f(splatUniforms.u_radius, rad);
      gl.uniform1f(splatUniforms.u_aspect, canvas.width / canvas.height);

      gl.viewport(0, 0, gridWidth, gridHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.writeFbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, target.read);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      target.swap();
    }

    let lastTime = performance.now();
    let frameId;

    const update = (time) => {
      frameId = requestAnimationFrame(update);

      let dt = (time - lastTime) / 1000;
      lastTime = time;
      dt = Math.min(dt, 0.033);

      gl.bindVertexArray(quadVAO);

      // --- A. ADVECTION ---
      gl.useProgram(advectProg);
      gl.uniform1i(advectUniforms.u_velocity, 0);
      gl.uniform1i(advectUniforms.u_target, 0);
      gl.uniform1f(advectUniforms.u_dt, dt);
      gl.uniform1f(advectUniforms.u_dissipation, 0.95); // Faster velocity decay to prevent bouncing / oscillation

      gl.viewport(0, 0, gridWidth, gridHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.writeFbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      velocity.swap();

      gl.uniform1i(advectUniforms.u_target, 1);
      gl.uniform1f(advectUniforms.u_dissipation, 0.98); // Slow density mask decay

      gl.bindFramebuffer(gl.FRAMEBUFFER, density.writeFbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, density.read);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      density.swap();

      // --- B. SPLAT STREAMS ---
      if (pointer.active && pointer.moved) {
        const dx = pointer.x - pointer.lx;
        const dy = pointer.y - pointer.ly;
        const dist = Math.hypot(dx, dy);

        pointer.vx = dx / (dt || 0.016);
        pointer.vy = dy / (dt || 0.016);

        const speedScale = 0.22; // Gentler velocity injection for stable flow
        pointer.vx *= speedScale;
        pointer.vy *= speedScale;

        const maxSpeed = 3.0; // Slower max speed to prevent chaotic jumps
        pointer.vx = Math.max(-maxSpeed, Math.min(maxSpeed, pointer.vx));
        pointer.vy = Math.max(-maxSpeed, Math.min(maxSpeed, pointer.vy));

        const splatRad = window.innerWidth < 768 ? 0.007 : 0.0035; // Slightly larger splat radius for smooth metaball merging
        const steps = Math.max(1, Math.min(8, Math.floor(dist / 0.015)));

        for (let i = 0; i < steps; i++) {
          const t = (i + 1) / steps;
          const sx_val = pointer.lx + dx * t;
          const sy_val = pointer.ly + dy * t;
          splat(velocity, sx_val, sy_val, pointer.vx, pointer.vy, splatRad, 0.0);
          splat(density, sx_val, sy_val, 2.2, 0.0, splatRad, 0.0);
        }

        pointer.lx = pointer.x;
        pointer.ly = pointer.y;
        pointer.moved = false;
      }

      // Ambient Border Shimmer
      const slowTime = time * 0.0006;
      const idleX1 = 0.5 + 0.28 * Math.sin(slowTime * 1.8);
      const idleY1 = 0.5 + 0.22 * Math.cos(slowTime * 1.3);
      const idleVelStrength = 0.008;
      splat(velocity, idleX1, idleY1, Math.cos(slowTime * 2.0) * idleVelStrength, Math.sin(slowTime * 2.0) * idleVelStrength, 0.004, 0.0);

      // --- C. VORTICITY CONFINEMENT ---
      gl.useProgram(curlProg);
      gl.uniform1i(curlUniforms.u_velocity, 0);
      gl.uniform2f(curlUniforms.u_texelSize, texelSizeX, texelSizeY);
      gl.viewport(0, 0, gridWidth, gridHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, curlFbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      gl.useProgram(vorticityProg);
      gl.uniform1i(vorticityUniforms.u_velocity, 0);
      gl.uniform1i(vorticityUniforms.u_curl, 1);
      gl.uniform2f(vorticityUniforms.u_texelSize, texelSizeX, texelSizeY);
      gl.uniform1f(vorticityUniforms.u_dt, dt);
      gl.uniform1f(vorticityUniforms.u_curlStrength, 0.4); // Slower curl to prevent bouncing/oscillation and ensure calm flow // Calmer vorticity for organic metaball shapes

      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.writeFbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, curlTex);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      velocity.swap();

      // --- D. DIVERGENCE ---
      gl.useProgram(divergenceProg);
      gl.uniform1i(divergenceUniforms.u_velocity, 0);
      gl.uniform2f(divergenceUniforms.u_texelSize, texelSizeX, texelSizeY);
      gl.bindFramebuffer(gl.FRAMEBUFFER, divergenceFbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // --- E. PRESSURE SYSTEM SOLVER ---
      gl.useProgram(pressureProg);
      gl.uniform1i(pressureUniforms.u_pressure, 0);
      gl.uniform1i(pressureUniforms.u_divergence, 1);
      gl.uniform2f(pressureUniforms.u_texelSize, texelSizeX, texelSizeY);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, divergenceTex);

      for (let i = 0; i < 16; i++) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.writeFbo);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pressure.read);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        pressure.swap();
      }

      // --- F. GRADIENT PROJECTION ---
      gl.useProgram(projectProg);
      gl.uniform1i(projectUniforms.u_velocity, 0);
      gl.uniform1i(projectUniforms.u_pressure, 1);
      gl.uniform2f(projectUniforms.u_texelSize, texelSizeX, texelSizeY);
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.writeFbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, pressure.read);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      velocity.swap();

      // --- G. COMPOSITE FINAL BLEND ---
      if (topImageLoaded && bottomImageLoaded) {
        gl.useProgram(compositeProg);
        gl.uniform1i(compositeUniforms.u_topImage, 0);
        gl.uniform1i(compositeUniforms.u_bottomImage, 1);
        gl.uniform1i(compositeUniforms.u_density, 2);
        gl.uniform1i(compositeUniforms.u_velocity, 3);
        gl.uniform2f(compositeUniforms.u_uvScale, uvScale[0], uvScale[1]);
        gl.uniform2f(compositeUniforms.u_uvOffset, uvOffset[0], uvOffset[1]);
        gl.uniform1f(compositeUniforms.u_time, time * 0.001);

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, topTex);
        gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, bottomTex);
        gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, density.read);
        gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, velocity.read);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    };

    frameId = requestAnimationFrame(update);

    // 8. Explicit Memory Disposal Cleanups
    return () => {
      isMounted = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", triggerResize);

      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerLeave);
      canvas.removeEventListener("pointercancel", handlePointerLeave);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("touchstart", preventDefault);
      canvas.removeEventListener("touchmove", preventDefault);

      gl.deleteBuffer(quadBuffer);
      gl.deleteVertexArray(quadVAO);
      gl.deleteTexture(velocity.read); gl.deleteTexture(velocity.write);
      gl.deleteTexture(density.read); gl.deleteTexture(density.write);
      gl.deleteTexture(pressure.read); gl.deleteTexture(pressure.write);
      gl.deleteTexture(divergenceTex); gl.deleteTexture(curlTex);
      gl.deleteTexture(topTex); gl.deleteTexture(bottomTex);

      gl.deleteFramebuffer(velocity.readFbo); gl.deleteFramebuffer(velocity.writeFbo);
      gl.deleteFramebuffer(density.readFbo); gl.deleteFramebuffer(density.writeFbo);
      gl.deleteFramebuffer(pressure.readFbo); gl.deleteFramebuffer(pressure.writeFbo);
      gl.deleteFramebuffer(divergenceFbo); gl.deleteFramebuffer(curlFbo);

      [advectProg, splatProg, curlProg, vorticityProg, divergenceProg, pressureProg, projectProg, compositeProg].forEach(p => gl.deleteProgram(p));
    };
  }, [ruchitImg, ruchitRevealedImg]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-auto z-[2]"
      style={{ display: "block" }}
    />
  );
}