import { describe, it, expect, beforeEach } from "vitest";
import { SwirlMaterial } from "../../src/index.js";
import { testRendering, testAnimateProperty } from "../Common.js";
import { RepeatWrapping, Texture, Vector2 } from "three";

describe("SwirlMaterial", () => {
  let material: SwirlMaterial;
  beforeEach(() => {
    material = new SwirlMaterial();
  });

  it("should be able to create a material instance", () => {
    expect(material).toBeInstanceOf(SwirlMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    testRendering(material);
  });

  it("should get and set isAnimate correctly", () => {
    testAnimateProperty(material);
  });

  it("should get and set uvRotation correctly", () => {
    const value = 0.123;
    material.uvRotation = value;
    expect(material.uvRotation).toEqual(value);
  });

  it("should get and set swirlRotation correctly", () => {
    const value = 1.234;
    material.swirlRotation = value;
    expect(material.swirlRotation).toEqual(value);
  });

  it("should get and set radius correctly", () => {
    const value = 0.456;
    material.radius = value;
    expect(material.radius).toEqual(value);
  });

  it("should get and set center correctly", () => {
    const value = new Vector2(0.789, 0.987);
    material.center = value;
    expect(material.center).toEqual(value);
  });

  it("should set map wrap", () => {
    material.map = new Texture();
    expect(material.map.wrapS).toBe(RepeatWrapping);
    expect(material.map.wrapT).toBe(RepeatWrapping);
  });

  it("should set alphaMap wrap", () => {
    material.alphaMap = new Texture();
    expect(material.alphaMap.wrapS).toBe(RepeatWrapping);
    expect(material.alphaMap.wrapT).toBe(RepeatWrapping);
  });
});
