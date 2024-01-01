import { Color, Mesh, PlaneGeometry } from "three";
import { describe, expect, it } from "vitest";
import { ExpansionDissolveMaterial } from "../../src/index.js";
import { initScene } from "../Common.js";

describe("ExpansionDissolveMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new ExpansionDissolveMaterial();
    expect(material).toBeInstanceOf(ExpansionDissolveMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const material = new ExpansionDissolveMaterial();
    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);

    renderer.render(scene, camera);
  });

  it("should get and set isAnimate correctly", () => {
    const material = new ExpansionDissolveMaterial();

    const setAnimate = (isAnimate: boolean) => {
      material.isAnimate = isAnimate;
      const retrievedIsAnimate = material.isAnimate;
      expect(retrievedIsAnimate).toEqual(isAnimate);
    };
    setAnimate(true);
    setAnimate(false);
  });

  it("should get and set tiles correctly", () => {
    const material = new ExpansionDissolveMaterial();
    const tiles = 2;

    material.tiles = tiles;
    const retrievedTiles = material.tiles;

    expect(retrievedTiles).toEqual(tiles);
  });

  it("should get and set hashLoop correctly", () => {
    const material = new ExpansionDissolveMaterial();
    const hashLoop = 1.0;

    material.hashLoop = hashLoop;
    const retrievedHashLoop = material.hashLoop;

    expect(retrievedHashLoop).toEqual(hashLoop);
  });

  it("should get and set amp correctly", () => {
    const material = new ExpansionDissolveMaterial();
    const amp = 0.5;

    material.amp = amp;
    const retrievedAmp = material.amp;

    expect(retrievedAmp).toEqual(amp);
  });

  it("should get and set scaleMax correctly", () => {
    const material = new ExpansionDissolveMaterial();
    const scaleMax = 1.0;

    material.scaleMax = scaleMax;
    const retrievedScaleMax = material.scaleMax;

    expect(retrievedScaleMax).toEqual(scaleMax);
  });

  it("should get and set time correctly", () => {
    const material = new ExpansionDissolveMaterial();
    const time = 1000;

    material.time = time;
    const retrievedTime = material.time;

    expect(retrievedTime).toEqual(time);
  });

  it("should get and set progress correctly", () => {
    const material = new ExpansionDissolveMaterial();
    const progress = 0.5;

    material.progress = progress;
    const retrievedProgress = material.progress;

    expect(retrievedProgress).toEqual(progress);
  });

  it("should get and set dissolveColor correctly", () => {
    const material = new ExpansionDissolveMaterial();
    const dissolveColor = new Color(0xffffff);

    material.dissolveColor = dissolveColor;
    const retrievedDissolveColor = material.dissolveColor;

    expect(retrievedDissolveColor).toEqual(dissolveColor);
  });

  it("should get and set dissolveOutColor correctly", () => {
    const material = new ExpansionDissolveMaterial();
    const dissolveOutColor = new Color(0x000000);

    material.dissolveOutColor = dissolveOutColor;
    const retrievedDissolveOutColor = material.dissolveOutColor;

    expect(retrievedDissolveOutColor).toEqual(dissolveOutColor);
  });
  // Add more tests for specific properties of ExpansionDissolveMaterial
});
