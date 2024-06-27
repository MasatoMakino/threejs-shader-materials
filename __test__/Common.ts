import { expect } from "vitest";
import {
  Scene,
  AmbientLight,
  PerspectiveCamera,
  WebGLRenderer,
  Material,
  Mesh,
  PlaneGeometry,
} from "three";
import { IAnimatable } from "../src";
import WebGPURenderer from "three/examples/jsm/renderers/webgpu/WebGPURenderer.js";

export const initScene = (
  W: number,
  H: number,
  far = 400,
  isWebGPU: boolean = false,
) => {
  const canvas = document.createElement("canvas");

  const scene = new Scene();
  const ambientLight = new AmbientLight(0xffffff, Math.PI);
  scene.add(ambientLight);

  const camera = new PerspectiveCamera(45, W / H, 1, far);
  camera.position.set(0, 0, 100);
  camera.updateMatrixWorld(false);
  scene.add(camera);

  const getRenderer = () => {
    if (isWebGPU) {
      return new WebGPURenderer({ canvas: canvas });
    }
    return new WebGLRenderer({ canvas: canvas });
  };
  const renderer = getRenderer();
  renderer.setSize(W, H);

  return { scene, ambientLight, camera, renderer };
};

export const testRendering = (material: Material) => {
  const { scene, camera, renderer } = initScene(1, 1);
  const mesh = new Mesh(new PlaneGeometry(), material);
  scene.add(mesh);
  renderer.render(scene, camera);
};

export const testAnimateProperty = (material: IAnimatable) => {
  const setAnimate = (isAnimate: boolean) => {
    material.isAnimate = isAnimate;
    const retrievedIsAnimate = material.isAnimate;
    expect(retrievedIsAnimate).toEqual(isAnimate);
  };
  setAnimate(true);
  setAnimate(false);
};
