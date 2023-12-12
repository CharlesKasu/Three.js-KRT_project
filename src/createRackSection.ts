import * as THREE from "three";
import { CreateRackSectionConfig, SceneType } from "./types";
import { metalMaterial } from "./materials";

export function createRackSection(
  scene: SceneType,
  xPosition: number,
  config: CreateRackSectionConfig
) {
  const { uprightHeight, shelfWidth, shelfDepth, numLevels, levelSpacing } = config;

  // Create uprights with braces
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

  // Constants for brace lengths
  const straightBraceLength = shelfDepth + 1; // Subtract the widths of the uprights
  const diagonalBraceLength = shelfDepth + 5; 

  // Create braces
  const bracePositions = ['|', '\\', '/', '\\', '/', '|']; // Pattern for braces
  bracePositions.forEach((position, index) => {
    let braceLength;
    switch(position) {
      case '|':
        braceLength = straightBraceLength;
        break;
      case '\\':
      case '/':
        braceLength = diagonalBraceLength;
        break;
    }

    const braceGeometry = new THREE.BoxGeometry(braceLength, 1, 1); 
    const brace = new THREE.Mesh(braceGeometry, metalMaterial);
    brace.position.x = -shelfWidth + xPosition + shelfWidth / 2;
    brace.position.y = index * levelSpacing + levelSpacing / 2;

    // Adjust rotation and position based on pattern
    if (position === '|') {
      brace.rotation.y = Math.PI / 2;
    } else {
      brace.rotation.y = Math.PI / 2;
      brace.rotation.z = position === '\\' ? Math.PI / 4 : -Math.PI / 4;
    }

    scene.add(brace);
  });

  // Create shelves
  const shelfGeometry = new THREE.BoxGeometry(shelfWidth, 2, shelfDepth);
  for (let i = 0; i < numLevels; i++) {
    const shelf = new THREE.Mesh(shelfGeometry, metalMaterial);
    shelf.position.x = xPosition;
    shelf.position.y = i * levelSpacing + levelSpacing;
    scene.add(shelf);
  }
}

