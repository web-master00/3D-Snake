// ── Apple builder ────────────────────────────────────────────────────────────
function buildApple(scale = 1) {
  const group = new THREE.Group();

  // Body: slightly squashed sphere
  const bodyGeo = new THREE.SphereGeometry(0.9, 32, 24);
  bodyGeo.applyMatrix4(new THREE.Matrix4().makeScale(1.0, 0.92, 1.0));
  const bodyMat = new THREE.MeshPhongMaterial({
    color: 0xe53935,
    shininess: 90,
    specular: 0xff8888,
    emissive: 0x220000,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = -0.05;
  group.add(body);

  // Stem
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.07, 0.45, 8),
    new THREE.MeshPhongMaterial({ color: 0x4e342e, shininess: 30 }),
  );
  stem.position.y = 0.85;
  stem.rotation.z = 0.18;
  group.add(stem);

  // Leaf
  const leafGeo = new THREE.SphereGeometry(0.22, 8, 8);
  leafGeo.applyMatrix4(new THREE.Matrix4().makeScale(1.7, 0.35, 0.7));
  const leaf = new THREE.Mesh(
    leafGeo,
    new THREE.MeshPhongMaterial({ color: 0x66bb6a, shininess: 50 }),
  );
  leaf.position.set(0.32, 0.95, 0.05);
  leaf.rotation.set(0.0, 0.0, -0.7);
  group.add(leaf);

  group.scale.setScalar(scale);
  return group;
}

// ── Trophy builder ───────────────────────────────────────────────────────────
function buildTrophy(scale = 1) {
  const group = new THREE.Group();

  const goldMat = new THREE.MeshPhongMaterial({
    color: 0xffc94d,
    shininess: 140,
    specular: 0xfff0a8,
    emissive: 0x3d2a00,
  });

  // Cup body (open top)
  const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.55, 0.95, 32, 1, false),
    goldMat,
  );
  cup.position.y = 0.55;
  group.add(cup);

  // Cup lip (slightly wider top rim)
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.07, 10, 32),
    goldMat,
  );
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.02;
  group.add(rim);

  // Handles (left + right)
  const handleGeo = new THREE.TorusGeometry(0.32, 0.07, 8, 16, Math.PI);
  const handleL = new THREE.Mesh(handleGeo, goldMat);
  handleL.rotation.set(0, 0, Math.PI / 2);
  handleL.position.set(-0.85, 0.55, 0);
  group.add(handleL);

  const handleR = new THREE.Mesh(handleGeo, goldMat);
  handleR.rotation.set(0, 0, -Math.PI / 2);
  handleR.position.set(0.85, 0.55, 0);
  group.add(handleR);

  // Stem
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.22, 0.35, 12),
    goldMat,
  );
  stem.position.y = -0.05;
  group.add(stem);

  // Base disc
  const baseDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.55, 0.12, 24),
    goldMat,
  );
  baseDisc.position.y = -0.32;
  group.add(baseDisc);

  // Plinth (square block under disc)
  const plinth = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.18, 0.95),
    new THREE.MeshPhongMaterial({ color: 0x6d4c41, shininess: 40 }),
  );
  plinth.position.y = -0.48;
  group.add(plinth);

  // Star detail on the cup front
  const starGeo = new THREE.OctahedronGeometry(0.18, 0);
  const star = new THREE.Mesh(
    starGeo,
    new THREE.MeshPhongMaterial({
      color: 0xfff3a8,
      emissive: 0x5a4400,
      shininess: 200,
    }),
  );
  star.position.set(0, 0.6, 0.66);
  star.rotation.y = Math.PI / 4;
  group.add(star);

  group.scale.setScalar(scale);
  return group;
}

// ── Generic small renderer ───────────────────────────────────────────────────
function makeMiniRenderer(canvas, w, h) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h, false);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
  camera.position.set(0, 0.4, 4.6);
  camera.lookAt(0, 0.2, 0);

  const amb = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(amb);

  const key = new THREE.DirectionalLight(0xffffff, 0.95);
  key.position.set(2.5, 3, 4);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xb6e4ff, 0.35);
  rim.position.set(-3, 1.5, -2);
  scene.add(rim);

  return { renderer, scene, camera };
}

// ── Public: score apple ──────────────────────────────────────────────────────
export function mountScoreApple(canvas) {
  if (!canvas || typeof THREE === "undefined") return;

  const cssW = canvas.clientWidth || 40;
  const cssH = canvas.clientHeight || 40;
  const { renderer, scene, camera } = makeMiniRenderer(canvas, cssW, cssH);

  const apple = buildApple(1);
  scene.add(apple);

  const start = performance.now();
  function tick() {
    const t = (performance.now() - start) / 1000;
    apple.rotation.y = t * 0.9;
    apple.position.y = Math.sin(t * 2.4) * 0.05;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
}

// ── Public: score trophy ─────────────────────────────────────────────────────
export function mountScoreTrophy(canvas) {
  if (!canvas || typeof THREE === "undefined") return;

  const cssW = canvas.clientWidth || 40;
  const cssH = canvas.clientHeight || 40;
  const { renderer, scene, camera } = makeMiniRenderer(canvas, cssW, cssH);

  const trophy = buildTrophy(0.85);
  scene.add(trophy);

  const start = performance.now();
  function tick() {
    const t = (performance.now() - start) / 1000;
    trophy.rotation.y = Math.sin(t * 0.9) * 0.6;
    trophy.position.y = Math.sin(t * 1.8) * 0.04;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
}

// ── Public: board food overlay ───────────────────────────────────────────────
export function mountBoardFood(boardEl, count) {
  if (!boardEl || typeof THREE === "undefined") {
    return { setFood() {}, dispose() {} };
  }

  const wrap = document.createElement("div");
  wrap.style.cssText = [
    "position:absolute",
    "top:0",
    "left:0",
    "pointer-events:none",
    "z-index:4",
    "transition:transform 0.12s linear, opacity 0.2s",
    "transform-origin:center center",
    "will-change:transform",
    "opacity:0",
  ].join(";");

  const canvas = document.createElement("canvas");
  canvas.style.cssText = "width:100%;height:100%;display:block";
  wrap.appendChild(canvas);
  boardEl.appendChild(wrap);

  // Initial sizing — will be updated when first food is placed
  let cssSize = 32;
  canvas.width = cssSize;
  canvas.height = cssSize;

  const { renderer, scene, camera } = makeMiniRenderer(
    canvas,
    cssSize,
    cssSize,
  );
  camera.position.set(0, 0.3, 4.0);

  const apple = buildApple(1.05);
  scene.add(apple);

  let active = false;
  let pulse = 0;
  let lastFood = null;

  function getGrid() {
    return boardEl.querySelector(".grid");
  }

  function resizeIfNeeded() {
    const grid = getGrid();
    if (!grid || !grid.clientWidth) return false;
    const cell = grid.clientWidth / count;
    if (Math.abs(cell - cssSize) > 0.5) {
      cssSize = cell;
      wrap.style.width = `${cssSize}px`;
      wrap.style.height = `${cssSize}px`;
      renderer.setSize(cssSize, cssSize, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    }
    return true;
  }

  function setFood(food) {
    if (!food) {
      active = false;
      wrap.style.opacity = "0";
      return;
    }
    const ready = resizeIfNeeded();
    if (!ready) {
      requestAnimationFrame(() => setFood(food));
      return;
    }
    active = true;
    pulse = 0;
    lastFood = food;

    const grid = getGrid();
    const offsetLeft = grid.offsetLeft;
    const offsetTop = grid.offsetTop;
    const left = offsetLeft + food.x * cssSize;
    const top = offsetTop + food.y * cssSize;
    wrap.style.transform = `translate(${left}px, ${top}px)`;
    wrap.style.opacity = "1";
  }

  function onResize() {
    resizeIfNeeded();
    if (lastFood) setFood(lastFood);
  }

  const start = performance.now();
  function tick() {
    const t = (performance.now() - start) / 1000;
    apple.rotation.y = t * 1.6;
    apple.rotation.x = Math.sin(t * 1.1) * 0.12;

    if (active) {
      pulse += 0.07;
      const s = 1 + Math.sin(pulse) * 0.07;
      apple.scale.setScalar(s);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  window.addEventListener("resize", onResize);

  function dispose() {
    window.removeEventListener("resize", onResize);
    wrap.remove();
  }

  return { setFood, dispose };
}
