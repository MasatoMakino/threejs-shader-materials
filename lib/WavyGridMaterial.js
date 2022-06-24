"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WavyGridMaterial = void 0;
const GridMaterial_1 = require("./GridMaterial");
const chunk_1 = require("./chunk");
const raf_ticker_1 = require("@masatomakino/raf-ticker");
const three_1 = require("three");
/**
 * グリッド状に分割され、Wavyアニメーションを行うマテリアル。
 */
class WavyGridMaterial extends GridMaterial_1.GridMaterial {
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
        this.animationListener = (e) => {
            this.addTime(e.delta / 1000);
        };
        this.isAnimate = this.isAnimate; //reset and start animation
    }
    addTime(delta) {
        chunk_1.AnimationChunk.addTime(this, delta);
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
        chunk_1.WavyAnimationChunk.registerChunk();
    }
    static getBasicUniforms() {
        return three_1.UniformsUtils.merge([
            super.getBasicUniforms(),
            chunk_1.ReversibleChunk.getUniform(),
            chunk_1.WavyAnimationChunk.getUniform(),
            chunk_1.MaskMapChunk.getUniform(),
        ]);
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
    }
    startAnimation() {
        raf_ticker_1.RAFTicker.on(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    }
    stopAnimation() {
        raf_ticker_1.RAFTicker.off(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    }
}
exports.WavyGridMaterial = WavyGridMaterial;
