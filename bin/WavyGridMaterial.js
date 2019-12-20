import { UniformsUtils } from "three";
import { WavyAnimationChunk } from "./chunk/WavyAnimationChunk";
import { MaskMapChunk } from "./chunk/MaskMapChunk";
import { ReversibleChunk } from "./chunk/ReversibleChunk";
import { AnimationChunk } from "./chunk/AnimationChunk";
import { GridMaterial } from "./GridMaterial";
import { RAFTicker, RAFTickerEventType } from "raf-ticker";
/**
 * グリッド状に分割され、Wavyアニメーションを行うマテリアル。
 */
export class WavyGridMaterial extends GridMaterial {
    constructor(vertexShader, fragmentShader, parameters) {
        super(vertexShader, fragmentShader, parameters);
        /**
         * 波の速度
         * 0.5にすると1の半分の速度になる。
         * マイナスを指定すると、波の進行方向が反転する。
         */
        this.speed = -0.5;
        /*
         * IAnimatable implements
         */
        this.animationListener = e => {
            this.addTime(e.delta / 1000);
        };
        this.isAnimate = this.isAnimate; //reset and start animation
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
        if (this.isAnimate) {
            this.startAnimation();
        }
        else {
            this.stopAnimation();
        }
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
     * 明るさの底上げ
     */
    get raisedBottom() {
        return this.uniforms.raisedBottom.value;
    }
    set raisedBottom(value) {
        this.uniforms.raisedBottom.value = value;
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
    initChunks() {
        super.initChunks();
        WavyAnimationChunk.registerChunk();
    }
    static getBasicUniforms() {
        return UniformsUtils.merge([
            super.getBasicUniforms(),
            ReversibleChunk.getUniform(),
            WavyAnimationChunk.getUniform(),
            MaskMapChunk.getUniform()
        ]);
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
    }
    startAnimation() {
        RAFTicker.addEventListener(RAFTickerEventType.onBeforeTick, this.animationListener);
    }
    stopAnimation() {
        RAFTicker.removeEventListener(RAFTickerEventType.onBeforeTick, this.animationListener);
    }
}
