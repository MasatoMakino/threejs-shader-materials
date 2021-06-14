"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkyCloudMaterial = void 0;
const raf_ticker_1 = require("raf-ticker");
const three_1 = require("three");
const AnimationChunk_1 = require("../chunk/AnimationChunk");
const ShaderPhongMaterial_1 = require("../ShaderPhongMaterial");
const ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
const SkyCloudMaterial_frag_glsl_1 = __importDefault(require("./SkyCloudMaterial.frag.glsl"));
class SkyCloudMaterial extends ShaderPhongMaterial_1.ShaderPhongMaterial {
    /**
     *
     * @param parameters
     */
    constructor(parameters) {
        super(ShaderPhongMaterial_vert_glsl_1.default(), SkyCloudMaterial_frag_glsl_1.default(), parameters);
        /**
         * 波の速度
         * 0.5にすると1の半分の速度になる。
         * マイナスを指定すると、波の進行方向が反転する。
         */
        this.speed = -0.02;
        /*
         * IAnimatable implements
         */
        this.animationListener = (e) => {
            this.addTime(e.delta / 1000);
        };
        this.isAnimate = this.isAnimate; //reset and start animation
    }
    get scale() {
        return this.uniforms.scale.value;
    }
    set scale(value) {
        this.uniforms.scale.value = value;
    }
    addTime(delta) {
        AnimationChunk_1.AnimationChunk.addTime(this, delta);
    }
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
    get skyColor() {
        return this.uniforms.skyColor.value;
    }
    set skyColor(value) {
        this.uniforms.skyColor.value = value;
    }
    get cloudVolume() {
        return this.uniforms.cloudVolume.value;
    }
    set cloudVolume(value) {
        this.uniforms.cloudVolume.value = value;
    }
    get cloudBottomVolume() {
        return this.uniforms.cloudBottomVolume.value;
    }
    set cloudBottomVolume(value) {
        this.uniforms.cloudBottomVolume.value = value;
    }
    get cloudBottomSaturation() {
        return this.uniforms.cloudBottomSaturation.value;
    }
    set cloudBottomSaturation(value) {
        this.uniforms.cloudBottomSaturation.value = value;
    }
    get cloudTransformSpeed() {
        return this.uniforms.cloudTransformSpeed.value;
    }
    set cloudTransformSpeed(value) {
        this.uniforms.cloudTransformSpeed.value = value;
    }
    initChunks() {
        super.initChunks();
        AnimationChunk_1.AnimationChunk.registerChunk();
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            ShaderPhongMaterial_1.ShaderPhongMaterial.getBasicUniforms(),
            AnimationChunk_1.AnimationChunk.getUniform(),
            {
                scale: { value: 3.0 },
                cloudTransformSpeed: { value: 0.15 },
                cloudVolume: { value: 16.0 },
                cloudBottomVolume: { value: 0.08 },
                cloudBottomSaturation: { value: 0.5 },
                skyColor: { value: new three_1.Color(0.101961, 0.619608, 0.666667) },
            },
        ]);
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
        if (parameters.transparent == null) {
            this.transparent = true;
        }
        else {
            this.transparent = parameters.transparent;
        }
    }
    startAnimation() {
        raf_ticker_1.RAFTicker.on(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    }
    stopAnimation() {
        raf_ticker_1.RAFTicker.off(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    }
}
exports.SkyCloudMaterial = SkyCloudMaterial;
