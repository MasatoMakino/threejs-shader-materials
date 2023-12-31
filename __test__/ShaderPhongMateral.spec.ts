import { BoxGeometry, Mesh } from "three";
import { describe, expect, it } from "vitest";
import { ShaderPhongMaterial } from "../src/index.js";
import { initScene } from "./CommonScene.js";

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
});
