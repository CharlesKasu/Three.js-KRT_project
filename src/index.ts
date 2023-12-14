import { createRackSection } from "./createRackSection";
import { initializeThree } from "./init";
import * as THREE from "three";
import { BoxMesh } from "./types";
import { cardboardMaterial } from "./materials";
const main = () => {
  const uuidBox = document.querySelector(".uuid");
  const capacityBox = document.querySelector(".capacity");

  const { scene, camera, renderer, controls, pointer, raycaster } =
    initializeThree();

  // Rack dimensions and geometry setup
  const uprightHeight = 110; // 11 meters
  const shelfWidth = 30; // 3 meters
  const shelfDepth = 12; // 1.2 meters
  const numLevels = 5;
  const levelSpacing = 20; // 2 meters
  const numRacks = 10; // Number of racks
  const boxesPerShelf = 3; // Number of boxes per shelf
  const boxes: BoxMesh[] = [];
  let INTERSECTED: any;

  // Create multiple rack sections
  for (let i = 0; i < numRacks; i++) {
    const hasNext = numRacks - 1 === i;
    createRackSection(
      scene,
      i * shelfWidth,
      {
        uprightHeight,
        levelSpacing,
        numLevels,
        shelfDepth,
        shelfWidth,
        boxesPerShelf,
        boxes,
        rackNumber: i,
      },
      hasNext
    );
  }

  // Handle window resizing
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  //handle and catch pointer movement
  document.addEventListener("pointermove", onPointerMove);
  function onPointerMove(event: PointerEvent) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(boxes, false);

    if (intersects.length > 0) {
      if (INTERSECTED != intersects[0].object) {
        if (INTERSECTED) {
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
          uuidBox.innerHTML = `UUID:`;
          capacityBox.innerHTML = `CAPACITY:`;
        }

        INTERSECTED = intersects[0].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex(0xff0000);
        uuidBox.innerHTML = `UUID: ${INTERSECTED.userData.uuid}`;
        capacityBox.innerHTML = `CAPACITY: ${INTERSECTED.userData.socketLoadCapacity}`;
      }
    } else {
      if (INTERSECTED) {
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        uuidBox.innerHTML = `UUID:`;
        capacityBox.innerHTML = `CAPACITY:`;
      }

      INTERSECTED = null;
    }

    renderer.render(scene, camera);
  }

  animate();
};

main();
