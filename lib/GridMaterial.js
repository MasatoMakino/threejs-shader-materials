"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridMaterial = void 0;
const ShaderPhongMaterial_1 = require("./ShaderPhongMaterial");
const chunk_1 = require("./chunk");
const three_1 = require("three");
/**
 * グリッド状に分割されたマテリアル。
 */
class GridMaterial extends ShaderPhongMaterial_1.ShaderPhongMaterial {
    get division() {
        return this.uniforms.division.value;
    }
    set division(value) {
        this.uniforms.division.value = value;
    }
    get divisionScaleX() {
        return this.uniforms.divisionScaleX.value;
    }
    set divisionScaleX(value) {
        this.uniforms.divisionScaleX.value = value;
    }
    get isReversed() {
        return this.uniforms.isReversed.value;
    }
    set isReversed(value) {
        this.uniforms.isReversed.value = value;
    }
    get maskTexture() {
        return chunk_1.MaskMapChunk.getMaskTexture(this);
    }
    set maskTexture(val) {
        chunk_1.MaskMapChunk.setMaskTexture(this, val);
    }
    initChunks() {
        super.initChunks();
        chunk_1.MaskMapChunk.registerChunk();
        chunk_1.ReversibleChunk.registerChunk();
    }
    static getBasicUniforms() {
        return three_1.UniformsUtils.merge([
            ShaderPhongMaterial_1.ShaderPhongMaterial.getBasicUniforms(),
            chunk_1.ReversibleChunk.getUniform(),
            chunk_1.MaskMapChunk.getUniform(),
        ]);
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
        if (parameters.transparent == null) {
            this.transparent = true;
        }
    }
}
exports.GridMaterial = GridMaterial;
