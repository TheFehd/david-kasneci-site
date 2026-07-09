import { useEffect, useRef } from 'react';

/* Site background — react-bits "Galaxy" shader (MIT), ported to raw WebGL
   (no ogl dependency) and graded to the site's monochrome palette:
   saturation 0, soft glow, slow rotation, gentle mouse parallax.
   Falls back to a static 2D starfield when WebGL or motion is unavailable. */

const VERT = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uMouseActiveFactor;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) { return abs(fract(x) * 2.0 - 1.0); }

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

/* monochrome star layer: brightness only, no hue */
float StarLayer(vec2 uv) {
  float col = 0.0;
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + offset;
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;
      vec2 pad = vec2(
        tris(seed * 34.0 + uTime * uSpeed / 10.0),
        tris(seed * 38.0 + uTime * uSpeed / 30.0)
      ) - 0.5;
      float star = Star(gv - offset - pad, flareSize);
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      col += star * size;
    }
  }
  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  uv += mouseNorm * 0.08 * uMouseActiveFactor;

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  float col = 0.0;
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  /* near-white, faintly warm-free grey to match --accent #f5f5f5 */
  vec3 tint = vec3(0.96, 0.96, 0.97);
  float alpha = smoothstep(0.0, 0.3, col);
  gl_FragColor = vec4(tint * col, min(alpha, 1.0));
}
`;

function staticFallback(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = '#ffffff';
  const count = Math.round((w * h) / 9000);
  for (let i = 0; i < count; i++) {
    ctx.globalAlpha = 0.1 + Math.random() * 0.4;
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, 0.4 + Math.random() * 1.1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

const CONFIG = {
  density: 1.2,
  speed: 0.6,
  starSpeed: 0.5,
  glowIntensity: 0.55,
  twinkleIntensity: 0.35,
  rotationSpeed: 0.04,
};

export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* phones + coarse pointers get the free static field — the shader is a
       desktop luxury, not worth battery or scroll jank on mobile */
    const lite = window.matchMedia('(max-width: 860px), (pointer: coarse)').matches;
    const gl = (reduce || lite)
      ? null
      : canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) {
      staticFallback(canvas);
      const onResize = () => staticFallback(canvas);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      staticFallback(canvas);
      return;
    }
    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    /* fullscreen triangle */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 0, 0, 3, -1, 2, 0, -1, 3, 0, 2]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, 'position');
    const aUv = gl.getAttribLocation(prog, 'uv');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8);

    const U = {};
    ['uTime', 'uResolution', 'uFocal', 'uStarSpeed', 'uDensity', 'uSpeed', 'uMouse',
      'uGlowIntensity', 'uTwinkleIntensity', 'uRotationSpeed', 'uMouseActiveFactor',
    ].forEach((n) => { U[n] = gl.getUniformLocation(prog, n); });

    const resize = () => {
      const scale = 0.7; /* stars don't need full res; CSS stretches the canvas */
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform3f(U.uResolution, canvas.width, canvas.height, canvas.width / canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    gl.uniform2f(U.uFocal, 0.5, 0.5);
    gl.uniform1f(U.uDensity, CONFIG.density);
    gl.uniform1f(U.uSpeed, CONFIG.speed);
    gl.uniform1f(U.uGlowIntensity, CONFIG.glowIntensity);
    gl.uniform1f(U.uTwinkleIntensity, CONFIG.twinkleIntensity);
    gl.uniform1f(U.uRotationSpeed, CONFIG.rotationSpeed);

    const targetMouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };
    let targetActive = 0;
    let smoothActive = 0;
    const onMove = (e) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1 - e.clientY / window.innerHeight;
      targetActive = 1;
    };
    const onLeave = () => { targetActive = 0; };
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);

    let raf;
    let last = 0;
    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      if (t - last < 33) return; /* 30fps is plenty for a twinkle */
      last = t;
      const time = t * 0.001;
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.05;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.05;
      smoothActive += (targetActive - smoothActive) * 0.05;
      gl.uniform1f(U.uTime, time);
      gl.uniform1f(U.uStarSpeed, (time * CONFIG.starSpeed) / 10);
      gl.uniform2f(U.uMouse, smoothMouse.x, smoothMouse.y);
      gl.uniform1f(U.uMouseActiveFactor, smoothActive);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <canvas className="starfield" ref={ref} aria-hidden="true" />;
}
