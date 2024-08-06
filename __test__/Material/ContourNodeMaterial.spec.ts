import { Mesh, PlaneGeometry } from "three";
import { describe, expect, it } from "vitest";
import { ContourNodeMaterial } from "../../src/index.js";
import { initScene } from "../CommonWebGPU.js";

describe("ContourMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new ContourNodeMaterial();
    expect(material).toBeInstanceOf(ContourNodeMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1, 400);
    const mesh = new Mesh(new PlaneGeometry(), new ContourNodeMaterial());
    scene.add(mesh);
    renderer.renderAsync(scene, camera);
  });
});
