import * as THREE from "three";

// A jagged "data flow / commit graph" style line
function buildSignalPoints(count = 140, width = 6, amp = 0.55) {
  const pts = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const x = (t - 0.5) * width;
    const step = Math.floor(t * 14);
    const y = (((step % 2 === 0 ? 1 : -1) * (0.3 + rand() * 0.7)) * amp) * Math.sin(t * Math.PI);
    pts.push(new THREE.Vector3(x, y, 0));
  }
  return pts;
}

export function createHeroScene(canvas, { mobile = false } = {}) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 7.5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const group = new THREE.Group();
  scene.add(group);

  // Wireframe icosahedron — an abstract "system architecture" object
  const icoGeo = new THREE.IcosahedronGeometry(2.1, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0xff7a33,
    wireframe: true,
    transparent: true,
    opacity: 0.22,
  });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  group.add(ico);

  // Inner solid faint core
  const coreGeo = new THREE.IcosahedronGeometry(1.15, 0);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x1a1310,
    transparent: true,
    opacity: 0.55,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  // Particle field
  const particleCount = mobile ? 60 : 160;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const r = 3.6 + Math.random() * 2.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = r * Math.cos(phi);
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xff7a33,
    size: 0.028,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Data-flow signal line
  const POINT_COUNT = mobile ? 90 : 140;
  const signalPts = buildSignalPoints(POINT_COUNT);
  const lineGeo = new THREE.BufferGeometry().setFromPoints(signalPts);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xff9a5c,
    transparent: true,
    opacity: 0.85,
  });
  const line = new THREE.Line(lineGeo, lineMat);
  line.position.set(0, 0.15, 2.6);
  scene.add(line);

  // scrollT: 0 at top of hero, 1 once scrolled past — fades/recedes the line
  function setScrollT(t) {
    const clamped = Math.max(0, Math.min(1, t));
    lineMat.opacity = 0.85 * (1 - clamped * 0.7);
    line.position.z = 2.6 - clamped * 1.1;
    group.scale.setScalar(1 - clamped * 0.08);
  }
  setScrollT(0);

  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  function setPointer(nx, ny) {
    // nx, ny normalized -1..1
    targetRotY = nx * 0.35;
    targetRotX = ny * 0.22;
  }

  function resize(width, height) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  let raf = null;
  let running = true;
  const clock = new THREE.Clock();

  function tick() {
    if (!running) return;
    raf = requestAnimationFrame(tick);

    currentRotX += (targetRotX - currentRotX) * 0.04;
    currentRotY += (targetRotY - currentRotY) * 0.04;

    group.rotation.x = currentRotX + Math.sin(clock.elapsedTime * 0.15) * 0.05;
    group.rotation.y = currentRotY + clock.elapsedTime * 0.06;
    particles.rotation.y = -clock.elapsedTime * 0.02;

    line.position.x = Math.sin(clock.elapsedTime * 0.4) * 0.05;

    renderer.render(scene, camera);
  }

  function start() {
    if (raf === null) {
      running = true;
      tick();
    }
  }
  function stop() {
    running = false;
    if (raf !== null) cancelAnimationFrame(raf);
    raf = null;
  }

  function dispose() {
    stop();
    icoGeo.dispose();
    icoMat.dispose();
    coreGeo.dispose();
    coreMat.dispose();
    particleGeo.dispose();
    particleMat.dispose();
    lineGeo.dispose();
    lineMat.dispose();
    renderer.dispose();
  }

  return { start, stop, dispose, resize, setPointer, setScrollT };
}
