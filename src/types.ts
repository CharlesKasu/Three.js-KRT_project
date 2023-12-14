export type CreateRackSectionConfig = {
  uprightHeight: number;
  shelfWidth: number;
  shelfDepth: number;
  numLevels: number;
  levelSpacing: number;
  boxesPerShelf: number;
};

export type SceneType = THREE.Scene;
export type CameraType = THREE.PerspectiveCamera;
export type RendererType = THREE.WebGLRenderer;
