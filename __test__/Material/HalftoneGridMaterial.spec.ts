import { Mesh, PlaneGeometry } from "three";
import { describe, expect, it } from "vitest";
import { HalftoneGridMaterial } from "../../src/index.js";
import { initScene } from "../Common.js";

describe("HalftoneGridMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new HalftoneGridMaterial();
    expect(material).toBeInstanceOf(HalftoneGridMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const material = new HalftoneGridMaterial();
    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);

    renderer.render(scene, camera);
  });

  it("should get and set radius correctly", () => {
    const material = new HalftoneGridMaterial();
    const value = 0.5;

    material.radius = value;
    expect(material.radius).toEqual(value);
  });
});
