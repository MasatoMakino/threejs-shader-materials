import { Mesh, PlaneGeometry, TorusGeometry, FrontSide } from "three";
import { describe, expect, it } from "vitest";
import { ContourMaterial } from "../../src/index.js";
import { initScene } from "../CommonScene.js";
import { TestImage } from "../TestImage.js";

describe("ContourMaterial", () => {
  it("should be able to create a material instance", () => {
    const material = new ContourMaterial();
    expect(material).toBeInstanceOf(ContourMaterial);
    expect(material).toBeTruthy();
    expect(material.alphaTest).toBe(0.5);
  });

  it("should create a material instance with the correct side option", () => {
    const material = new ContourMaterial({ side: FrontSide });
    expect(material.side).toBe(FrontSide);
  });

  it("should handle glsl inclusion and render correctly", () => {
    const { scene, camera, renderer } = initScene(1, 1);

    const material = new ContourMaterial();
    const mesh = new Mesh(new PlaneGeometry(), material);
    scene.add(mesh);

    renderer.render(scene, camera);
  });

  it("should load map correctly", async () => {
    const geo = new TorusGeometry(10, 4, 32, 32);
    const material = new ContourMaterial();
    await material.loadMap(TestImage, geo);
    expect(material.map).toBeTruthy();
  });
});
