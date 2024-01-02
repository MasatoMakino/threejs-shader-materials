import { describe, it, expect, beforeEach } from "vitest";
import { Color, Mesh, PlaneGeometry } from "three";
import { RimBasicMaterial } from "../../src/index.js";
import { initScene } from "../Common.js";

describe("RimBasicMaterial", () => {
  let material: RimBasicMaterial;
  beforeEach(() => {
    material = new RimBasicMaterial();
  });

  it("should be able to create a material instance", () => {
    expect(material).toBeInstanceOf(RimBasicMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);
    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);
    renderer.render(scene, camera);
  });

  it("should get and set rimPow correctly", () => {
    const value = 0.5;
    material.rimPow = value;
    expect(material.rimPow).toEqual(value);
  });

  it("should get and set rimStrength correctly", () => {
    const value = 0.8;
    material.rimStrength = value;
    expect(material.rimStrength).toEqual(value);
  });

  it("should get and set rimColor correctly", () => {
    const value = new Color(0xff0000);
    material.rimColor = value;
    expect(material.rimColor).toEqual(value);
  });

  it("should get and set insidePow correctly", () => {
    const value = 0.5;
    material.insidePow = value;
    expect(material.insidePow).toEqual(value);
  });

  it("should get and set insideStrength correctly", () => {
    const value = 0.8;
    material.insideStrength = value;
    expect(material.insideStrength).toEqual(value);
  });

  it("should get and set insideColor correctly", () => {
    const value = new Color(0x00ff00);
    material.insideColor = value;
    expect(material.insideColor).toEqual(value);
  });
});
