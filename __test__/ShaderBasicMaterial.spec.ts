import { BoxGeometry, Mesh } from "three";
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
});
