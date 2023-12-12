import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CameraType, RendererType, SceneType } from "./types";

export const initializeThree = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(150, 50, 100); // Adjust camera position to fit all racks

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Controls setup
  const controls = new OrbitControls(camera, renderer.domElement);

  // Lighting setup
  scene.fog = new THREE.Fog(0xa0a0a0, 1000, 5000);

  const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 10, 10);
  scene.add(directionalLight);

  // debug: outlines directional camera shadow box
  // scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

  return { scene, camera, renderer, controls };
};
