import { Color, Mesh, PlaneGeometry } from "three";
import { describe, expect, it, beforeEach } from "vitest";
import { HexDissolveMaterial } from "../../src/index.js";
import { initScene } from "../Common.js";

describe("HexDissolveMaterial", () => {
  let material: HexDissolveMaterial;
  beforeEach(() => {
    material = new HexDissolveMaterial();
  });

  it("should be able to create a material instance", () => {
    expect(material).toBeInstanceOf(HexDissolveMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);

    renderer.render(scene, camera);
  });

  it("should get and set progress correctly", () => {
    const value = 0.5;
    material.progress = value;
    expect(material.progress).toEqual(value);
  });

  it("should get and set delay correctly", () => {
    const value = 0.8;
    material.delay = value;
    expect(material.delay).toEqual(value);
  });

  it("should get and set isAscending correctly", () => {
    const value = false;
    material.isAscending = value;
    expect(material.isAscending).toEqual(value);
  });

  it("should get and set gridWeight correctly", () => {
    const value = 0.5;
    material.gridWeight = value;
    expect(material.gridWeight).toEqual(value);
  });

  it("should get and set gridEmissive correctly", () => {
    const value = new Color(0xff0000);
    material.gridEmissive = value;
    expect(material.gridEmissive).toEqual(value);
  });

  it("should get and set gridEmissiveWeight correctly", () => {
    const value = 2.5;
    material.gridEmissiveWeight = value;
    expect(material.gridEmissiveWeight).toEqual(value);
  });
});
