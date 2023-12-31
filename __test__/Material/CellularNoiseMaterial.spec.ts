import { Mesh, PlaneGeometry, Vector2 } from "three";
import { describe, expect, it } from "vitest";
import { CellularNoiseMaterial } from "../../src/index.js";
import { initScene } from "../CommonScene.js";

describe("CellularNoiseMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new CellularNoiseMaterial();
    expect(material).toBeInstanceOf(CellularNoiseMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const material = new CellularNoiseMaterial();
    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);

    renderer.render(scene, camera);
  });

  it("should get and set isAnimate correctly", () => {
    const material = new CellularNoiseMaterial();

    const setAnimate = (isAnimate: boolean) => {
      material.isAnimate = isAnimate;
      const retrievedIsAnimate = material.isAnimate;
      expect(retrievedIsAnimate).toEqual(isAnimate);
    };
    setAnimate(true);
    setAnimate(false);
  });

  it("should get and set grid correctly", () => {
    const material = new CellularNoiseMaterial();
    const grid = 100;

    material.grid = grid;
    const retrievedGrid = material.grid;

    expect(retrievedGrid).toEqual(grid);
  });

  it("should get and set divisionScaleX correctly", () => {
    const material = new CellularNoiseMaterial();
    const divisionScaleX = 2.0;

    material.divisionScaleX = divisionScaleX;
    const retrievedDivisionScaleX = material.divisionScaleX;

    expect(retrievedDivisionScaleX).toEqual(divisionScaleX);
  });
});
