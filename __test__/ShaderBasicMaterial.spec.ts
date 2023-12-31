import { BoxGeometry, Color, Mesh } from "three";
import { describe, expect, it } from "vitest";
import { ShaderBasicMaterial } from "../src/index.js";
import { initScene } from "./CommonScene.js";

describe("ShaderBasicMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new ShaderBasicMaterial(null, null);
    expect(material).toBeInstanceOf(ShaderBasicMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const material = new ShaderBasicMaterial(null, null);
    const cube = new Mesh(new BoxGeometry(10, 10, 10), material);
    scene.add(cube);

    renderer.render(scene, camera);
  });

  it("should get and set color correctly", () => {
    const material = new ShaderBasicMaterial(null, null);
    const color = new Color(0xff0000);

    material.color = color;
    const retrievedColor = material.color;

    expect(retrievedColor).toEqual(color);
  });

  it("should get and set uniformOpacity correctly", () => {
    const material = new ShaderBasicMaterial(null, null);
    const opacity = 0.5;

    material.uniformOpacity = opacity;
    const retrievedOpacity = material.uniformOpacity;
    expect(retrievedOpacity).toEqual(opacity);
  });
});
