import { describe, it, expect } from "vitest";
import { ShaderBasicMaterial } from "../src/index.js";
import { initScene } from "./CommonScene.js";
import { Mesh, BoxGeometry } from "three";

describe("ShaderBasicMaterial", () => {
  it("should be instance", () => {
    const material = new ShaderBasicMaterial(null, null);
    expect(material).toBeInstanceOf(ShaderBasicMaterial);
    expect(material).toBeTruthy();
  });

  it("should be renderable", () => {
    const { scene, camera, renderer } = initScene(100, 100);

    const material = new ShaderBasicMaterial(null, null);
    const cube = new Mesh(new BoxGeometry(10, 10, 10), material);
    scene.add(cube);

    renderer.render(scene, camera);
  });
});
