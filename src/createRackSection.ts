import * as THREE from "three";
import { CreateRackSectionConfig, SceneType } from "./types";
import { metalMaterial } from "./materials";

export function createRackSection(
  scene: SceneType,
  xPosition: number,
  config: CreateRackSectionConfig
) {
  const { uprightHeight, shelfWidth, shelfDepth, numLevels, levelSpacing } =
    config;
  // Create uprights with braces
  const uprightGeometry = new THREE.BoxGeometry(1, uprightHeight, 1); // Thin, tall uprights
  const braceGeometry = new THREE.BoxGeometry(1, 10, 1); // Braces
  const numUprightsPerSide = 2; // Two uprights on each side (front and back)
  for (let i = 0; i < numUprightsPerSide; i++) {
    for (let j = 0; j < numUprightsPerSide; j++) {
      const upright = new THREE.Mesh(uprightGeometry, metalMaterial);
      upright.position.x = xPosition + (i - 0.5) * shelfWidth; // Position the uprights on either end of the shelf width
      upright.position.z = (j - 0.5) * shelfDepth; // Position the uprights on either end of the shelf depth
      upright.position.y = uprightHeight / 2; // Position the uprights at the half-height
      scene.add(upright);
    }
  }

  // Create shelves
  const shelfGeometry = new THREE.BoxGeometry(shelfWidth, 2, shelfDepth);
  for (let i = 0; i < numLevels; i++) {
    const shelf = new THREE.Mesh(shelfGeometry, metalMaterial);
    shelf.position.x = xPosition;
    shelf.position.y = i * levelSpacing + levelSpacing; // Position shelves
    scene.add(shelf);
  }
}
