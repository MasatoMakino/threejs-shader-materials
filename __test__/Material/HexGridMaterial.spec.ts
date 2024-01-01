import { Color, Mesh, PlaneGeometry } from "three";
import { describe, expect, it, beforeEach } from "vitest";
import { HexGridMaterial } from "../../src/index.js";
import { initScene } from "../CommonScene.js";

describe("HexGridMaterial", () => {
  let material: HexGridMaterial;

  beforeEach(() => {
    material = new HexGridMaterial();
  });

  it("should be able to create a material instance", () => {
    expect(material).toBeInstanceOf(HexGridMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);

    renderer.render(scene, camera);
  });

  it("should get and set gridWeight correctly", () => {
    const value = 0.5;
    material.gridWeight = value;
    expect(material.gridWeight).toEqual(value);
  });
});
