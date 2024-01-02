import { describe, it, expect, beforeEach } from "vitest";
import { SquareGridMaterial } from "../../src/index.js";
import { testRendering } from "../Common.js";

describe("SquareGridMaterial", () => {
  let material: SquareGridMaterial;
  beforeEach(() => {
    material = new SquareGridMaterial();
  });

  it("should be able to create a material instance", () => {
    expect(material).toBeInstanceOf(SquareGridMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    testRendering(material);
  });

  it("should get and set gridWeight correctly", () => {
    const value = 0.123;
    material.gridWeight = value;
    expect(material.gridWeight).toEqual(value);
  });
});
