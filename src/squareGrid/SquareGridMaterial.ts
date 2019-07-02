/**
 * 地球儀用の緯度経度グリッド
 */

import { ShaderMaterialParameters, Texture, UniformsUtils } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";

import { AnimationChunk } from "../chunk/AnimationChunk";
import {
  Directions,
  IWavyAnimatable,
  WavyAnimationChunk
} from "../chunk/WavyAnimationChunk";
import { IReversible, ReversibleChunk } from "../chunk/ReversibleChunk";
import { IMaskable, MaskMapChunk } from "../chunk/MaskMapChunk";

import FragmentShader from "./SquareGridMaterial.frag.glsl";
import VertexShader from "../ShaderPhongMaterial.vert.glsl";
import { WavyGridMaterial } from "../WavyGridMaterial";

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
    super(VertexShader, FragmentShader, parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      WavyGridMaterial.getBasicUniforms(),
      {
        gridWeight: { value: 0.03 }
      }
    ]);
  }
}
