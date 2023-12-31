import { Sprite, Texture, Color, SpriteMaterial } from "three";
import { describe, expect, it } from "vitest";
import { ShaderSpriteMaterial } from "../src/index.js";
import { initScene } from "./CommonScene.js";

describe("ShaderSpriteMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new ShaderSpriteMaterial(null, null);
    expect(material).toBeInstanceOf(ShaderSpriteMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const material = new ShaderSpriteMaterial(null, null);
    const sprite = new Sprite(material);
    scene.add(sprite);

    renderer.render(scene, camera);
  });

  it("should get and set color correctly", () => {
    const material = new ShaderSpriteMaterial(null, null);
    const color = new Color(0xff0000);

    material.color = color;
    const retrievedColor = material.color;

    expect(retrievedColor).toEqual(color);
  });
});
