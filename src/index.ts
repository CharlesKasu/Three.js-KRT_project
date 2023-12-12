import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(150, 50, 100); // Adjust camera position to fit all racks

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls setup
const controls = new OrbitControls(camera, renderer.domElement);

// Lighting setup
const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);

// Materials
const metalMaterial = new THREE.MeshStandardMaterial({
  color: 0xAAAAAA,
  metalness: 0.8,
  roughness: 0.2,
});

// Rack dimensions and geometry setup
const uprightHeight = 110; // 11 meters
const shelfWidth = 30;  // 3 meters
const shelfDepth = 12;  // 1.2 meters
const numLevels = 5;
const levelSpacing = 20; // 2 meters
const numRacks = 10; // Number of racks

// Function to create a single rack section with braces
function createRackSection(xPosition: number) {
  // Create uprights
  const uprightGeometry = new THREE.BoxGeometry(1, uprightHeight, 1); // Thin, tall uprights
  const numUprightsPerSide = 2; // Two uprights on each side (front and back)
  for (let i = 0; i < numUprightsPerSide; i++) {
    for (let j = 0; j < numUprightsPerSide; j++) {
      const upright = new THREE.Mesh(uprightGeometry, metalMaterial);
      upright.position.x = xPosition + (i - 0.5) * shelfWidth;
      upright.position.z = (j - 0.5) * shelfDepth;
      upright.position.y = uprightHeight / 2;
      scene.add(upright);
    }
  }

  // Create braces
  const braceLength = shelfWidth - 13;
  const braceGeometry = new THREE.BoxGeometry(braceLength, 1, 1); // Slim cuboid braces
  const bracePositions = ['|', '\\', '/', '\\', '/', '|']; // Pattern for braces
  bracePositions.forEach((position, index) => {
    const brace = new THREE.Mesh(braceGeometry, metalMaterial);
    brace.position.x = xPosition + shelfWidth / 2; // Center of the shelf width
    brace.position.y = index * levelSpacing + levelSpacing / 2; // Position based on level

    // Adjust rotation and position based on pattern
    switch(position) {
      case '|':
        brace.rotation.y = Math.PI / 2; // Rotate 90 degrees for straight braces
        break;
      case '\\':
        brace.rotation.y = Math.PI / 2; // First rotate 90 degrees in Y-axis
        brace.rotation.z = Math.PI / 4; // Then rotate 45 degrees in Z-axis
        break;
      case '/':
        brace.rotation.y = Math.PI / 2; // First rotate 90 degrees in Y-axis
        brace.rotation.z = -Math.PI / 4; // Then rotate -45 degrees in Z-axis
        break;
    }

    scene.add(brace);
  });

  // Create shelves
  const shelfGeometry = new THREE.BoxGeometry(shelfWidth, 0.5, shelfDepth);
  for (let i = 0; i < numLevels; i++) {
    const shelf = new THREE.Mesh(shelfGeometry, metalMaterial);
    shelf.position.x = xPosition;
    shelf.position.y = i * levelSpacing + levelSpacing; // Position shelves
    scene.add(shelf);
  }
}


// Create multiple rack sections
for (let i = 0; i < numRacks; i++) {
  createRackSection(i * shelfWidth);
}

// Handle window resizing
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();