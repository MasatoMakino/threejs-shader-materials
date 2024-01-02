import { Line, BufferGeometry, Color } from "three";
import { describe, expect, it } from "vitest";
import { ShaderLineMaterial } from "../src/index.js";
import { initScene } from "./Common.js";

describe("ShaderLineMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new ShaderLineMaterial(null, null);
    expect(material).toBeInstanceOf(ShaderLineMaterial);
    expect(material).toBeTruthy();
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const material = new ShaderLineMaterial(null, null);
    const line = new Line(new BufferGeometry(), material);
    scene.add(line);

    renderer.render(scene, camera);
  });

  it("should get and set color correctly", () => {
    const material = new ShaderLineMaterial(null, null);
    const color = new Color(0xff0000);

    material.color = color;
    const retrievedColor = material.color;

    expect(retrievedColor).toEqual(color);
  });

  it("should get and set uniformOpacity correctly", () => {
    const material = new ShaderLineMaterial(null, null);
    const opacity = 0.5;

    material.uniformOpacity = opacity;
    const retrievedOpacity = material.uniformOpacity;

    expect(retrievedOpacity).toEqual(opacity);
  });

  it("should get and set scale correctly", () => {
    const material = new ShaderLineMaterial(null, null);
    const scale = 2.0;

    material.scale = scale;
    const retrievedScale = material.scale;

    expect(retrievedScale).toEqual(scale);
  });

  it("should get and set dashSize correctly", () => {
    const material = new ShaderLineMaterial(null, null);
    const dashSize = 3.0;

    material.dashSize = dashSize;
    const retrievedDashSize = material.dashSize;

    expect(retrievedDashSize).toEqual(dashSize);
  });

  it("should get and set totalSize correctly", () => {
    const material = new ShaderLineMaterial(null, null);
    const totalSize = 5.0;

    material.totalSize = totalSize;
    const retrievedTotalSize = material.totalSize;

    expect(retrievedTotalSize).toEqual(totalSize);
  });
});
