import { describe, it, expect, beforeEach } from "vitest";
import { Color } from "three";
import { SpriteCloudMaterial } from "../../src/index.js";
import { testRendering } from "../Common.js";

describe("SpriteCloudMaterial", () => {
  let material: SpriteCloudMaterial;
  beforeEach(() => {
    material = new SpriteCloudMaterial();
  });

  it("should be able to create a material instance", () => {
    expect(material).toBeInstanceOf(SpriteCloudMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    testRendering(material);
  });

  it("should get and set rimCenter correctly", () => {
    const value = 0.3;
    material.rimCenter = value;
    expect(material.rimCenter).toEqual(value);
  });

  it("should get and set rimRange correctly", () => {
    const value = 0.4;
    material.rimRange = value;
    expect(material.rimRange).toEqual(value);
  });

  it("should get and set rimStrength correctly", () => {
    const value = 0.5;
    material.rimStrength = value;
    expect(material.rimStrength).toEqual(value);
  });

  it("should get and set bottomStrength correctly", () => {
    const value = 0.6;
    material.bottomStrength = value;
    expect(material.bottomStrength).toEqual(value);
  });

  it("should get and set rimColor correctly", () => {
    const value = new Color(0x123456);
    material.rimColor = value;
    expect(material.rimColor).toEqual(value);
  });

  it("should get and set skyColor correctly", () => {
    const value = new Color(0x654321);
    material.skyColor = value;
    expect(material.skyColor).toEqual(value);
  });
});
