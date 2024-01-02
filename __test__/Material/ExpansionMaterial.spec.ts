import { Mesh, PlaneGeometry } from "three";
import { describe, expect, it } from "vitest";
import { ExpansionMaterial } from "../../src/index.js";
import { initScene } from "../Common.js";

describe("ExpansionMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new ExpansionMaterial();
    expect(material).toBeInstanceOf(ExpansionMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const material = new ExpansionMaterial();
    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);

    renderer.render(scene, camera);
  });

  it("should get and set expansionStrength correctly", () => {
    const material = new ExpansionMaterial();
    const expansionStrength = 0.5;

    material.expansionStrength = expansionStrength;
    const retrievedExpansionStrength = material.expansionStrength;

    expect(retrievedExpansionStrength).toEqual(expansionStrength);
  });
});
