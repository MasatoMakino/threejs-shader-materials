import { Color, Mesh, PlaneGeometry } from "three";
import { describe, expect, it } from "vitest";
import { FBMDissolveMaterial } from "../../src/index.js";
import { initScene } from "../Common.js";

describe("FBMDissolveMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new FBMDissolveMaterial();
    expect(material).toBeInstanceOf(FBMDissolveMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const material = new FBMDissolveMaterial();
    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);

    renderer.render(scene, camera);
  });

  it("should get and set tiles correctly", () => {
    const material = new FBMDissolveMaterial();
    const value = 2;
    material.tiles = value;
    expect(material.tiles).toEqual(value);
  });

  it("should get and set hashLoop correctly", () => {
    const material = new FBMDissolveMaterial();
    const value = 1.0;
    material.hashLoop = value;
    expect(material.hashLoop).toEqual(value);
  });

  it("should get and set amp correctly", () => {
    const material = new FBMDissolveMaterial();
    const value = 0.5;
    material.amp = value;
    expect(material.amp).toEqual(value);
  });

  it("should get and set progress correctly", () => {
    const material = new FBMDissolveMaterial();
    const value = 0.5;
    material.progress = value;
    expect(material.progress).toEqual(value);
  });

  it("should get and set edgeWeight correctly", () => {
    const material = new FBMDissolveMaterial();
    const value = 0.1;
    material.edgeWeight = value;
    expect(material.edgeWeight).toEqual(value);
  });

  it("should get and set edgeColor correctly", () => {
    const material = new FBMDissolveMaterial();
    const value = new Color(0xffffff);
    material.edgeColor = value;
    expect(material.edgeColor).toEqual(value);
  });
});
