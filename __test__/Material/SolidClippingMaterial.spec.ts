import { describe, it, expect, beforeEach } from "vitest";
import { Color } from "three";
import { SolidClippingMaterial } from "../../src/index.js";
import { testRendering } from "../Common.js";

describe("SolidClippingMaterial", () => {
  let material: SolidClippingMaterial;
  beforeEach(() => {
    material = new SolidClippingMaterial();
  });

  it("should be able to create a material instance", () => {
    const material = new SolidClippingMaterial();
    expect(material).toBeInstanceOf(SolidClippingMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    testRendering(material);
  });

  it("should get and set cutSectionColor correctly", () => {
    const value = new Color(0x123456);
    material.cutSectionColor = value;
    expect(material.cutSectionColor).toEqual(value);
  });
});
