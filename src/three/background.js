const PARTICLE_COUNT = 90;
const LINE_PAIRS = 14;

let renderer, scene, camera;
let particleMesh, lineMesh;
let particleVelocities = [];
let clock = { t: 0 };
let animId = null;

export function initThreeBackground() {
  const canvas = document.getElementById("three-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  // ── Scene / camera ─────────────────────────────────────────────────────────
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 50);

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  // ── Particles ──────────────────────────────────────────────────────────────
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 130;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 90;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
    sizes[i] = 0.5 + Math.random() * 1.4;

    particleVelocities.push({
      x: (Math.random() - 0.5) * 0.013,
      y: 0.004 + Math.random() * 0.008, // drift upward like spores
      phase: Math.random() * Math.PI * 2,
      wobble: 0.003 + Math.random() * 0.006,
    });
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const pMat = new THREE.PointsMaterial({
    size: 1.4,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    color: 0x52a052,
  });

  particleMesh = new THREE.Points(pGeo, pMat);
  scene.add(particleMesh);

  // ── Vine line segments ─────────────────────────────────────────────────────
  const linePts = [];
  for (let i = 0; i < LINE_PAIRS; i++) {
    const x1 = (Math.random() - 0.5) * 110;
    const y1 = (Math.random() - 0.5) * 80;
    linePts.push(x1, y1, -5);
    linePts.push(
      x1 + (Math.random() - 0.5) * 40,
      y1 + (Math.random() - 0.5) * 30,
      -5,
    );
  }

  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(linePts), 3),
  );

  const lMat = new THREE.LineBasicMaterial({
    color: 0x3a7a3a,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
  });

  lineMesh = new THREE.LineSegments(lGeo, lMat);
  scene.add(lineMesh);

  window.addEventListener("resize", onResize);

  animate();
}

export function updateThreeTheme(isDark) {
  if (!particleMesh) return;
  particleMesh.material.color.set(isDark ? 0x52a052 : 0x2d7a1a);
  particleMesh.material.opacity = isDark ? 0.55 : 0.3;
  lineMesh.material.color.set(isDark ? 0x3a7a3a : 0x2a6a2a);
  lineMesh.material.opacity = isDark ? 0.1 : 0.07;
}

function animate() {
  animId = requestAnimationFrame(animate);
  clock.t += 0.008;
  const t = clock.t;

  const pa = particleMesh.geometry.attributes.position.array;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const v = particleVelocities[i];

    pa[i * 3] += v.x + Math.sin(t + v.phase) * v.wobble;
    pa[i * 3 + 1] += v.y;
    pa[i * 3 + 2] += Math.sin(t * 0.4 + v.phase) * 0.008;

    if (pa[i * 3 + 1] > 50) {
      pa[i * 3 + 1] = -50;
      pa[i * 3] = (Math.random() - 0.5) * 130;
    }
    if (pa[i * 3] > 68) pa[i * 3] = -68;
    if (pa[i * 3] < -68) pa[i * 3] = 68;
  }

  particleMesh.geometry.attributes.position.needsUpdate = true;

  particleMesh.rotation.y = Math.sin(t * 0.08) * 0.06;

  lineMesh.rotation.z = t * 0.002;

  const baseMat = particleMesh.material;
  const baseOpacity = baseMat.color.r < 0.3 ? 0.3 : 0.55; // light vs dark
  baseMat.opacity = baseOpacity * (0.8 + Math.sin(t * 0.35) * 0.2);

  renderer.render(scene, camera);
}

function onResize() {
  if (!renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
