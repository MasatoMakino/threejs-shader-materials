import { vertex } from "../ShaderPhongMaterial.glsl.js";
import { WavyGridMaterial } from "../WavyGridMaterial.js";
import { fragment } from "./SquareGridMaterial.glsl.js";
import { ShaderMaterialParameters, UniformsUtils } from "three";

/**
 * 四角形グリッドマテリアル
 */
export class SquareGridMaterial extends WavyGridMaterial {
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

  constructor(parameters?: ShaderMaterialParameters) {
    super(vertex, fragment, parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      WavyGridMaterial.getBasicUniforms(),
      {
        gridWeight: { value: 0.03 },
      },
    ]);
  }
}
