import { UniformsUtils } from "three";
import { GLSLChunk } from "./GLSLChunk";
import { RepeatPatternChunk } from "./RepeatPatternChunk";
/**
 * Grid内のマスク値を利用するテクスチャ用Chunk。
 * 実行にはgridのid値、division、divisionScaleXが必要。
 */
export class MaskMapChunk extends RepeatPatternChunk {
    static registerChunk() {
        super.registerChunk();
        MaskMapUniformChunk.registerChunk();
        MaskMapFragmentChunk.registerChunk();
    }
    static getUniform() {
        return UniformsUtils.merge([
            super.getUniform(),
            {
                hasMaskTexture: { value: false },
                maskTexture: { value: null }
            }
        ]);
    }
    static getMaskTexture(_self) {
        return _self.uniforms.maskTexture.value;
    }
    static setMaskTexture(_self, val) {
        _self.uniforms.maskTexture.value = val;
        _self.uniforms.hasMaskTexture.value = val != null;
    }
}
class MaskMapUniformChunk extends GLSLChunk {
    static getChunkName() {
        return "mask_map_uniform_chunk";
    }
    static getChunk() {
        return `
      uniform bool hasMaskTexture;
      uniform sampler2D maskTexture;
    `;
    }
}
class MaskMapFragmentChunk extends GLSLChunk {
    static getChunkName() {
        return "mask_map_fragment_chunk";
    }
    static getChunk() {
        return `
      float mask = 1.0;
      if( hasMaskTexture ){
        vec2 uVm = id / vec2( division * divisionScaleX, division);
        mask = texture2D( maskTexture, uVm ).g;
      }
    `;
    }
}
