export type CreateRackSectionConfig = {
  uprightHeight: number;
  shelfWidth: number;
  shelfDepth: number;
  numLevels: number;
  levelSpacing: number;
  boxesPerShelf: number;
  boxes: BoxMesh[];
};

export type BoxMesh = THREE.Mesh<
  THREE.BoxGeometry,
  THREE.MeshStandardMaterial,
  THREE.Object3DEventMap
>;
export type SceneType = THREE.Scene;
export type CameraType = THREE.PerspectiveCamera;
export type RendererType = THREE.WebGLRenderer;
