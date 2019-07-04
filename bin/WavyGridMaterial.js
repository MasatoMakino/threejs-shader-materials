import { UniformsUtils } from "three";
import { ShaderPhongMaterial } from "./ShaderPhongMaterial";
import { WavyAnimationChunk } from "./chunk/WavyAnimationChunk";
import { MaskMapChunk } from "./chunk/MaskMapChunk";
import { ReversibleChunk } from "./chunk/ReversibleChunk";
import { AnimationChunk } from "./chunk/AnimationChunk";
/**
 * グリッド状に分割され、Wavyアニメーションを行うマテリアル。
 */
export class WavyGridMaterial extends ShaderPhongMaterial {
    constructor() {
        super(...arguments);
        /**
         * 波の速度
         * 0.5にすると1の半分の速度になる。
         * マイナスを指定すると、波の進行方向が反転する。
         */
        this.speed = -0.5;
    }
    addTime(delta) {
        AnimationChunk.addTime(this, delta);
    }
    /**
     * 波アニメーションを行うか否か。
     */
    get isAnimate() {
        return this.uniforms.isAnimate.value;
    }
    set isAnimate(value) {
        this.uniforms.isAnimate.value = value;
    }
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
    /**
     * 明るさの底上げ
     */
    get raisedBottom() {
        return this.uniforms.raisedBottom.value;
    }
    set raisedBottom(value) {
        this.uniforms.raisedBottom.value = value;
    }
    /**
     * 波の振幅
     * 1の場合、幅1ヘックス
     * 0.5の場合、幅2ヘックスになる
     */
    get waveFrequency() {
        return this.uniforms.waveFrequency.value;
    }
    set waveFrequency(value) {
        this.uniforms.waveFrequency.value = value;
    }
    get wavePow() {
        return this.uniforms.wavePow.value;
    }
    set wavePow(value) {
        this.uniforms.wavePow.value = value;
    }
    /**
     * 波が発生する方角
     */
    get direction() {
        return this.uniforms.direction.value;
    }
    set direction(value) {
        this.uniforms.direction.value = value;
    }
    get maskTexture() {
        return MaskMapChunk.getMaskTexture(this);
    }
    set maskTexture(val) {
        MaskMapChunk.setMaskTexture(this, val);
    }
    initChunks() {
        super.initChunks();
        WavyAnimationChunk.registerChunk();
        MaskMapChunk.registerChunk();
        ReversibleChunk.registerChunk();
    }
    static getBasicUniforms() {
        return UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            ReversibleChunk.getUniform(),
            WavyAnimationChunk.getUniform(),
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
