import { ShaderMaterialParameters, UniformsUtils } from "three";
import FragmentShader from "./HexDissolveMaterial.frag.glsl";
import { HexGridChunk } from "../index";
import { GridMaterial } from "../GridMaterial";

/**
 * 六角形グリッドマテリアル
 */
export class HexDissolveMaterial extends GridMaterial {
  /**
   * グリッド線の太さ
   * 0.0で線なし、0.5でグリッド面なしになる。
   */
  get progress(): number {
    return this.uniforms.progress.value;
  }
  set progress(value: number) {
    this.uniforms.progress.value = value;
  }

  get delay(): number {
    return this.uniforms.delay.value;
  }
  set delay(value: number) {
    this.uniforms.delay.value = value;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(null, FragmentShader(), parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      GridMaterial.getBasicUniforms(),
      {
        progress: { value: 0.0 },
        delay: { value: 0.8 }
      }
    ]);
  }

  protected initChunks(): void {
    super.initChunks();
    HexGridChunk.registerChunk();
  }
}
