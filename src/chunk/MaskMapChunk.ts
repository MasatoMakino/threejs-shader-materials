import { Texture, IUniform, UniformsUtils } from "three";
import { GLSLChunk } from "./GLSLChunk";
import { IRepeatablePattern, RepeatPatternChunk } from "./RepeatPatternChunk";

export interface IMaskable extends IRepeatablePattern {
  uniforms: { [uniform: string]: IUniform };
  maskTexture: Texture;
}

/**
 * Grid内のマスク値を利用するテクスチャ用Chunk。
 * 実行にはgridのid値、division、divisionScaleXが必要。
 */
export class MaskMapChunk extends RepeatPatternChunk {
  public static registerChunk(): void {
    super.registerChunk();
    MaskMapUniformChunk.registerChunk();
    MaskMapFragmentChunk.registerChunk();
  }

  public static getUniform(): any {
    return UniformsUtils.merge([
      super.getUniform(),
      {
        hasMaskTexture: { value: false },
        maskTexture: { value: null }
      }
    ]);
  }

  public static getMaskTexture(_self: IMaskable): Texture {
    return _self.uniforms.maskTexture.value;
  }
  public static setMaskTexture(_self: IMaskable, val: Texture): void {
    _self.uniforms.maskTexture.value = val;
    _self.uniforms.hasMaskTexture.value = val != null;
  }
}

class MaskMapUniformChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "mask_map_uniform_chunk";
  }

  protected static getChunk(): string {
    return `
      uniform bool hasMaskTexture;
      uniform sampler2D maskTexture;
    `;
  }
}

class MaskMapFragmentChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "mask_map_fragment_chunk";
  }

  protected static getChunk(): string {
    return `
      float mask = 1.0;
      if( hasMaskTexture ){
        vec2 uVm = id / vec2( division * divisionScaleX, division);
        mask = texture2D( maskTexture, uVm ).g;
      }
    `;
  }
}
