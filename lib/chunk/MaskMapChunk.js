"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskMapChunk = void 0;
const GLSLChunk_1 = require("./GLSLChunk");
const RepeatPatternChunk_1 = require("./RepeatPatternChunk");
const three_1 = require("three");
/**
 * マスクテクスチャを利用するShaderMaterial用Chunk。
 * マスクテクスチャがどのように描画に反映されるかは、各Materialのシェーダー実装による。
 */
class MaskMapChunk extends RepeatPatternChunk_1.RepeatPatternChunk {
    static registerChunk() {
        super.registerChunk();
        MaskMapUniformChunk.registerChunk();
        MaskMapFragmentChunk.registerChunk();
    }
    static getUniform() {
        return three_1.UniformsUtils.merge([
            super.getUniform(),
            {
                hasMaskTexture: { value: false },
                maskTexture: { value: null },
            },
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
exports.MaskMapChunk = MaskMapChunk;
class MaskMapUniformChunk extends GLSLChunk_1.GLSLChunk {
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
class MaskMapFragmentChunk extends GLSLChunk_1.GLSLChunk {
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
