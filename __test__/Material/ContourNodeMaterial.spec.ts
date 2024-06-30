import { Mesh, PlaneGeometry } from "three";
import WebGPURenderer from "three/examples/jsm/renderers/webgpu/WebGPURenderer.js";
import { describe, expect, it } from "vitest";
import { ContourNodeMaterial } from "../../src/index.js";
import { initScene } from "../Common.js";

describe("ContourMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new ContourNodeMaterial();
    expect(material).toBeInstanceOf(ContourNodeMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1, 400, true);
    const mesh = new Mesh(new PlaneGeometry(), new ContourNodeMaterial());
    scene.add(mesh);
    (renderer as WebGPURenderer).renderAsync(scene, camera);
  });
});
