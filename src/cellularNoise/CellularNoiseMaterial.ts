import { ShaderPhongMaterial, IAnimatable, AnimationChunk } from "../index";
import { ShaderMaterialParameters, UniformsUtils } from "three";
import FragmentShader from "./CellularNoiseMaterial.frag.glsl";

export class CellularNoiseMaterial extends ShaderPhongMaterial
  implements IAnimatable {
  /*
   * implements IAnimatable
   */
  speed: number = -0.02;
  isAnimate: boolean = true;
  addTime(delta: number): void {
    if (this.isAnimate) {
      AnimationChunk.addTime(this, delta);
    }
  }

  get grid(): number {
    return this.uniforms.grid.value;
  }
  set grid(value: number) {
    this.uniforms.grid.value = value;
  }

  get tiles(): number {
    return this.uniforms.tiles.value;
  }
  set tiles(value: number) {
    this.uniforms.tiles.value = value;
  }

  get divisionScaleX(): number {
    return this.uniforms.divisionScaleX.value;
  }
  set divisionScaleX(value: number) {
    this.uniforms.divisionScaleX.value = value;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(null, FragmentShader(), parameters);
  }

  protected initChunks(): void {
    super.initChunks();
    AnimationChunk.registerChunk();
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      AnimationChunk.getUniform(),
      {
        grid: { value: 3.0 },
        tiles: { value: 1.0 },
        divisionScaleX: { value: 1.0 }
      }
    ]);
  }
}
