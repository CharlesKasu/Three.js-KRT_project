import * as THREE from "three";
import { CreateRackSectionConfig, SceneType } from "./types";
import { cardboardMaterial, metalMaterial } from "./materials";
import { dataArray } from "./boxesConfig";

export function createRackSection(
  scene: SceneType,
  xPosition: number,
  config: CreateRackSectionConfig,
  hasNext: boolean
) {
  const {
    uprightHeight,
    shelfWidth,
    shelfDepth,
    numLevels,
    levelSpacing,
    boxesPerShelf,
    boxes,
    rackNumber,
  } = config;
  let maxSides;
  if (hasNext) {
    maxSides = 1;
  } else {
    maxSides = 2;
  }
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

  // Create braces on both sides
  for (let side = 0; side < 2; side++) {
    const bracePositions = ["|", "\\", "/", "\\", "/", "|"]; // Pattern for braces
    bracePositions.forEach((position, index) => {
      let braceLength;
      switch (position) {
        case "|":
          braceLength = straightBraceLength;
          break;
        case "\\":
        case "/":
          braceLength = diagonalBraceLength;
          break;
      }

      const braceGeometry = new THREE.BoxGeometry(braceLength, 1, 1);
      const brace = new THREE.Mesh(braceGeometry, metalMaterial);

      // Adjust x-position for both sides
      if (side === 0) {
        brace.position.x = xPosition + shelfWidth / 2; // Front side
      } else {
        brace.position.x = xPosition - shelfWidth / 2; // Back side
      }

      brace.position.y = index * levelSpacing + levelSpacing / 2;

      // Adjust rotation and position based on pattern
      if (position === "|") {
        brace.rotation.y = Math.PI / 2;
      } else {
        brace.rotation.y = Math.PI / 2;
        brace.rotation.z = position === "\\" ? Math.PI / 4 : -Math.PI / 4;
      }

      scene.add(brace);
    });
  }
  // Create shelves
  for (let i = 0; i < numLevels; i++) {
    const shelfGeometry = new THREE.BoxGeometry(shelfWidth, 2, shelfDepth);
    const shelf = new THREE.Mesh(shelfGeometry, metalMaterial);

    for (let j = 0; j < boxesPerShelf; j++) {
      const foundBox = dataArray.find(
        ({ rackOrdinalNumber, levelOrdinalNumber, slotOrdinalNumber }) =>
          rackOrdinalNumber === rackNumber &&
          levelOrdinalNumber === i &&
          slotOrdinalNumber === j
      );

      if (!foundBox) continue;

      const BoxGeometry = new THREE.BoxGeometry(
        shelfWidth / boxesPerShelf - 2,
        levelSpacing - 5,
        shelfDepth - 2
      );
      const box = new THREE.Mesh(
        BoxGeometry,
        new THREE.MeshStandardMaterial({
          color: 0xcc9966,
          roughness: 0.8,
          metalness: 0.2,
        })
      );
      box.position.x =
        xPosition -
        shelfWidth / 2 +
        shelfWidth / boxesPerShelf / 2 +
        j * (shelfWidth / boxesPerShelf);
      box.position.y = i * levelSpacing + levelSpacing / 2 - 2.5;
      box.userData = {
        uuid: foundBox.uuid,
        socketLoadCapacity: foundBox.socketLoadCapacity,
      };
      scene.add(box);
      boxes.push(box);
    }

    shelf.position.x = xPosition;
    shelf.position.y = i * levelSpacing + levelSpacing;
    scene.add(shelf);
  }
}
