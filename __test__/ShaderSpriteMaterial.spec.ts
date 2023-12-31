import { Sprite, Color, Vector2, Matrix3, Texture } from "three";
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

  it("should get and set center correctly", () => {
    const material = new ShaderSpriteMaterial(null, null);
    const center = new Vector2(0.5, 0.5);

    material.center = center;
    const retrievedCenter = material.center;

    expect(retrievedCenter).toEqual(center);
  });

  it("should get and set rotation correctly", () => {
    const material = new ShaderSpriteMaterial(null, null);
    const rotation = Math.PI / 4; // 45 degrees

    material.rotation = rotation;
    const retrievedRotation = material.rotation;

    expect(retrievedRotation).toEqual(rotation);
  });

  it("should get and set uvTransform correctly", () => {
    const material = new ShaderSpriteMaterial(null, null);
    const uvTransform = new Matrix3();

    material.uvTransform = uvTransform;
    const retrievedUvTransform = material.uvTransform;

    console.log(uvTransform);
    console.log(retrievedUvTransform);

    expect(retrievedUvTransform).toEqual(uvTransform);
  });

  it("should get and set map correctly", () => {
    const material = new ShaderSpriteMaterial(null, null);
    const map = new Texture();

    material.map = map;
    const retrievedMap = material.map;

    expect(retrievedMap).toEqual(map);
  });

  it("should get and set alphaMap correctly", () => {
    const material = new ShaderSpriteMaterial(null, null);
    const alphaMap = new Texture();

    material.alphaMap = alphaMap;
    const retrievedAlphaMap = material.alphaMap;

    expect(retrievedAlphaMap).toEqual(alphaMap);
  });
});
