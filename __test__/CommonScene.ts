import { Scene, AmbientLight, PerspectiveCamera, WebGLRenderer } from "three";

export const initScene = (W: number, H: number, far = 400) => {
  const canvas = document.createElement("canvas");
  const gl = require("gl")(1, 1);

  const scene = new Scene();
  const ambientLight = new AmbientLight(0xffffff, Math.PI);
  scene.add(ambientLight);

  const camera = new PerspectiveCamera(45, W / H, 1, far);
  camera.position.set(0, 0, 100);
  camera.updateMatrixWorld(false);
  scene.add(camera);

  const renderer = new WebGLRenderer({ context: gl, canvas: canvas });
  renderer.setSize(W, H);

  return { scene, ambientLight, camera, renderer };
};
