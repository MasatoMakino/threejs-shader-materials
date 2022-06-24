import VertexShader from "../ShaderPhongMaterial.vert.glsl";
import { WavyGridMaterial } from "../WavyGridMaterial";
import FragmentShader from "./SquareGridMaterial.frag.glsl";
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
    super(VertexShader(), FragmentShader(), parameters);
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
