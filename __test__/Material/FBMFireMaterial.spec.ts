import { Mesh, PlaneGeometry } from "three";
import { describe, expect, it } from "vitest";
import { FBMFireMaterial } from "../../src/index.js";
import { initScene } from "../Common.js";

describe("FBMFireMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new FBMFireMaterial();
    expect(material).toBeInstanceOf(FBMFireMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const material = new FBMFireMaterial();
    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);

    renderer.render(scene, camera);
  });
  it("should get and set tiles correctly", () => {
    const material = new FBMFireMaterial();
    const value = 2;
    material.tiles = value;
    expect(material.tiles).toEqual(value);
  });

  it("should get and set hashLoop correctly", () => {
    const material = new FBMFireMaterial();
    const value = 1.0;
    material.hashLoop = value;
    expect(material.hashLoop).toEqual(value);
  });

  it("should get and set amp correctly", () => {
    const material = new FBMFireMaterial();
    const value = 0.5;
    material.amp = value;
    expect(material.amp).toEqual(value);
  });

  it("should get and set strength correctly", () => {
    const material = new FBMFireMaterial();
    const value = 0.5;
    material.strength = value;
    expect(material.strength).toEqual(value);
  });

  it("should get and set bloom correctly", () => {
    const material = new FBMFireMaterial();
    const value = 0.5;
    material.bloom = value;
    expect(material.bloom).toEqual(value);
  });

  it("should get and set rimPow correctly", () => {
    const material = new FBMFireMaterial();
    const value = 2;
    material.rimPow = value;
    expect(material.rimPow).toEqual(value);
  });

  it("should get and set rimStrength correctly", () => {
    const material = new FBMFireMaterial();
    const value = 0.5;
    material.rimStrength = value;
    expect(material.rimStrength).toEqual(value);
  });
});
