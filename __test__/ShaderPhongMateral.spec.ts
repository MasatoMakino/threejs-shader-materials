import { BoxGeometry, Color, Mesh, Texture } from "three";
import { describe, expect, it } from "vitest";
import { ShaderPhongMaterial } from "../src/index.js";
import { initScene } from "./Common.js";

describe("ShaderPhongMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new ShaderPhongMaterial(null, null);
    expect(material).toBeInstanceOf(ShaderPhongMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const material = new ShaderPhongMaterial(null, null);
    const cube = new Mesh(new BoxGeometry(10, 10, 10), material);
    scene.add(cube);

    renderer.render(scene, camera);
  });

  it("should get and set color correctly", () => {
    const material = new ShaderPhongMaterial(null, null);
    const color = new Color(0xff0000);

    material.color = color;
    const retrievedColor = material.color;
    expect(retrievedColor).toEqual(color);
  });

  it("should get and set uniformOpacity correctly", () => {
    const material = new ShaderPhongMaterial(null, null);
    const opacity = 0.5;

    material.uniformOpacity = opacity;
    const retrievedOpacity = material.uniformOpacity;
    expect(retrievedOpacity).toEqual(opacity);
  });

  it("should get and set emessive correctly", () => {
    const material = new ShaderPhongMaterial(null, null);
    const emissive = new Color(0xff0000);

    material.emissive = emissive;
    expect(material.emissive).toEqual(emissive);
  });

  it("should get and set map correctly", () => {
    const material = new ShaderPhongMaterial(null, null);
    const map = new Texture();

    material.map = map;
    expect(material.map).toEqual(map);
  });

  it("should get and set alphaMap correctly", () => {
    const material = new ShaderPhongMaterial(null, null);
    const alphaMap = new Texture();

    material.alphaMap = alphaMap;
    expect(material.alphaMap).toEqual(alphaMap);
  });
});
