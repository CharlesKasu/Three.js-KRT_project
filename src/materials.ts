import * as THREE from "three";

export const metalMaterial = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa,
  metalness: 0.8,
  roughness: 0.2,
});

export const cardboardMaterial = new THREE.MeshStandardMaterial({
  color: 0xcc9966,
  roughness: 0.8,
  metalness: 0.2,
});
