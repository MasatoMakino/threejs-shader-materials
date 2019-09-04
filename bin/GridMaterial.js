import { UniformsUtils } from "three";
import { ShaderPhongMaterial } from "./ShaderPhongMaterial";
import { ReversibleChunk } from "./chunk/ReversibleChunk";
import { MaskMapChunk } from "./chunk/MaskMapChunk";
/**
 * グリッド状に分割されたマテリアル。
 */
export class GridMaterial extends ShaderPhongMaterial {
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
        return MaskMapChunk.getMaskTexture(this);
    }
    set maskTexture(val) {
        MaskMapChunk.setMaskTexture(this, val);
    }
    initChunks() {
        super.initChunks();
        MaskMapChunk.registerChunk();
        ReversibleChunk.registerChunk();
    }
    static getBasicUniforms() {
        return UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            ReversibleChunk.getUniform(),
            MaskMapChunk.getUniform()
        ]);
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
        if (parameters.transparent == null) {
            this.transparent = true;
        }
    }
}
