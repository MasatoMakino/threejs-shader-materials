import { describe, it, expect, beforeEach } from "vitest";
import { Color } from "three";
import { SkyCloudMaterial } from "../../src/index.js";
import { testAnimateProperty, testRendering } from "../Common.js";

describe("SkyCloudMaterial", () => {
  let material: SkyCloudMaterial;
  beforeEach(() => {
    material = new SkyCloudMaterial();
  });

  it("should be able to create a material instance", () => {
    expect(material).toBeInstanceOf(SkyCloudMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    testRendering(material);
  });

  it("should get and set isAnimate correctly", () => {
    testAnimateProperty(material);
  });

  it("should get and set scale correctly", () => {
    const value = 0.5;
    material.scale = value;
    expect(material.scale).toEqual(value);
  });

  it("should get and set speed correctly", () => {
    const value = 0.8;
    material.speed = value;
    expect(material.speed).toEqual(value);
  });

  it("should get and set skyColor correctly", () => {
    const value = new Color(0x123456);
    material.skyColor = value;
    expect(material.skyColor).toEqual(value);
  });

  it("should get and set cloudVolume correctly", () => {
    const value = 0.7;
    material.cloudVolume = value;
    expect(material.cloudVolume).toEqual(value);
  });

  it("should get and set cloudBottomVolume correctly", () => {
    const value = 0.6;
    material.cloudBottomVolume = value;
    expect(material.cloudBottomVolume).toEqual(value);
  });

  it("should get and set cloudBottomSaturation correctly", () => {
    const value = 0.5;
    material.cloudBottomSaturation = value;
    expect(material.cloudBottomSaturation).toEqual(value);
  });

  it("should get and set cloudTransformSpeed correctly", () => {
    const value = 0.4;
    material.cloudTransformSpeed = value;
    expect(material.cloudTransformSpeed).toEqual(value);
  });
});
