import { describe, it, expect, beforeEach } from "vitest";
import { Mesh, PlaneGeometry } from "three";
import { OuterGlowMaterial } from "../../src/index.js";
import { initScene } from "../Common.js";

describe("OuterGlowMaterial", () => {
  let material: OuterGlowMaterial;

  beforeEach(() => {
    material = new OuterGlowMaterial();
  });

  it("should be able to create a material instance", () => {
    expect(material).toBeInstanceOf(OuterGlowMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);
    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);
    renderer.render(scene, camera);
  });

  it("should get and set expansionStrength correctly", () => {
    const value = 0.231;
    material.expansionStrength = value;
    expect(material.expansionStrength).toEqual(value);
  });
});
