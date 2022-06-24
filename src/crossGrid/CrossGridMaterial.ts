import VertexShader from "../ShaderPhongMaterial.vert.glsl";
import { WavyGridMaterial } from "../WavyGridMaterial";
import FragmentShader from "./CrossGridMaterial.frag.glsl";
import { ShaderMaterialParameters, UniformsUtils } from "three";

/**
 * 十字線を正方形グリッドの中心に描画するマテリアル。
 */
export class CrossGridMaterial extends WavyGridMaterial {
  /**
   * グリッド線の太さ
   * 0.0で線なし、0.5でグリッド面なしになる。
   */
  get gridWeight(): number {
    return this.uniforms.gridWeight.value;
  }
  set gridWeight(value: number) {
    this.uniforms.gridWeight.value = value;
  }

  get radius(): number {
    return this.uniforms.radius.value;
  }
  set radius(value: number) {
    this.uniforms.radius.value = value;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(VertexShader(), FragmentShader(), parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      WavyGridMaterial.getBasicUniforms(),
      {
        gridWeight: { value: 0.03 },
        radius: { value: 0.15 },
      },
    ]);
  }
}
