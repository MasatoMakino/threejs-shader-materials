import { vertex } from "../ShaderPhongMaterial.glsl";
import { WavyGridMaterial } from "../WavyGridMaterial";
import { HexGridChunk } from "../chunk";
import { fragment } from "./HexGridMaterial.glsl";
import { ShaderMaterialParameters, UniformsUtils } from "three";

/**
 * 六角形グリッドマテリアル
 */
export class HexGridMaterial extends WavyGridMaterial {
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

  protected initChunks(): void {
    super.initChunks();
    HexGridChunk.registerChunk();
  }
}
