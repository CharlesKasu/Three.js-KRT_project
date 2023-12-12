import { createRackSection } from "./createRackSection";
import { initializeThree } from "./init";

const main = () => {
  const { scene, camera, renderer, controls } = initializeThree();

  // Rack dimensions and geometry setup
  const uprightHeight = 110; // 11 meters
  const shelfWidth = 30; // 3 meters
  const shelfDepth = 12; // 1.2 meters
  const numLevels = 5;
  const levelSpacing = 20; // 2 meters
  const numRacks = 10; // Number of racks

  // Create multiple rack sections
  for (let i = 0; i < numRacks; i++) {
    const hasNext = numRacks - 1 === i
    createRackSection(scene, i * shelfWidth, {
      uprightHeight,
      levelSpacing,
      numLevels,
      shelfDepth,
      shelfWidth,
      
    },
    hasNext);
  }

  // Handle window resizing
  window.addEventListener("resize", onWindowResize, false);
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
};

main();