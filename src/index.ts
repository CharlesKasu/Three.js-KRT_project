import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Regał
const shelfMaterial = new THREE.MeshBasicMaterial({
  color: 0x8b4513,
  wireframe: false,
});
const shelves = [];
const shelfHeight = 0.5;
const numShelves = 10;
const shelfSpacing = 2;
const shelfWidth = 5;
const shelfDepth = 2;

for (let i = 0; i < numShelves; i++) {
  const shelfGeometry = new THREE.BoxGeometry(
    shelfWidth,
    shelfHeight,
    shelfDepth
  );
  const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
  shelf.position.y = i * shelfSpacing;
  scene.add(shelf);
  shelves.push(shelf);
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const shelfFolder = gui.addFolder("Shelves");
shelves.forEach((shelf, index) => {
  shelfFolder.add(shelf.position, "y", 0, 10).name(`Shelf ${index + 1} Y`);
});
shelfFolder.open();
const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 30);
cameraFolder.open();

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  render();
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
