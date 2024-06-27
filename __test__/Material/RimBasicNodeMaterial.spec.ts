import { describe, it, expect, beforeEach } from "vitest";
import { Mesh, PlaneGeometry } from "three";
import { RimBasicNodeMaterial } from "../../src/index.js";
import { initScene } from "../Common.js";
import WebGPURenderer from "three/examples/jsm/renderers/webgpu/WebGPURenderer.js";

describe("RimBasicMaterial", () => {
  let material: RimBasicNodeMaterial;
  beforeEach(() => {
    material = new RimBasicNodeMaterial();
  });

  it("should be able to create a material instance", () => {
    expect(material).toBeInstanceOf(RimBasicNodeMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1, 400, true);
    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);
    (renderer as WebGPURenderer).renderAsync(scene, camera);
  });
});
