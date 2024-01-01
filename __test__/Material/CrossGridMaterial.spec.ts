import { Mesh, PlaneGeometry } from "three";
import { describe, expect, it } from "vitest";
import { CrossGridMaterial, Directions } from "../../src/index.js";
import { initScene } from "../CommonScene.js";

describe("CrossGridMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new CrossGridMaterial();
    expect(material).toBeInstanceOf(CrossGridMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const material = new CrossGridMaterial();
    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);

    renderer.render(scene, camera);
  });

  it("should get and set gridWeight correctly", () => {
    const material = new CrossGridMaterial();
    const gridWeight = 0.5;

    material.gridWeight = gridWeight;
    const retrievedGridWeight = material.gridWeight;

    expect(retrievedGridWeight).toEqual(gridWeight);
  });

  it("should get and set radius correctly", () => {
    const material = new CrossGridMaterial();
    const radius = 1.0;

    material.radius = radius;
    const retrievedRadius = material.radius;

    expect(retrievedRadius).toEqual(radius);
  });
});

describe("WavyGridMaterial", () => {
  it("should get and set waveFrequency correctly", () => {
    const material = new CrossGridMaterial();
    const waveFrequency = 0.789;

    material.waveFrequency = waveFrequency;
    const retrieved = material.waveFrequency;

    expect(retrieved).toEqual(waveFrequency);
  });

  it("should get and set wavePow correctly", () => {
    const material = new CrossGridMaterial();
    const wavePow = 0.521;

    material.wavePow = wavePow;
    const retrieved = material.wavePow;

    expect(retrieved).toEqual(wavePow);
  });

  it("should get and set raisedBottom correctly", () => {
    const material = new CrossGridMaterial();
    const raisedBottom = 0.362;

    material.raisedBottom = raisedBottom;
    expect(material.raisedBottom).toEqual(raisedBottom);
  });

  it("should get and set direction correctly", () => {
    const material = new CrossGridMaterial();
    const value = Directions.radial;
    material.direction = value;
    expect(material.direction).toEqual(value);
  });

  it("should get and set isAnimate correctly", () => {
    const material = new CrossGridMaterial();

    const setAnimate = (isAnimate: boolean) => {
      material.isAnimate = isAnimate;
      const retrievedIsAnimate = material.isAnimate;
      expect(retrievedIsAnimate).toEqual(isAnimate);
    };
    setAnimate(true);
    setAnimate(false);
  });
});
