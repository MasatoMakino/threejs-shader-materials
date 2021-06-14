"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBMFireMaterial = void 0;
const raf_ticker_1 = require("raf-ticker");
const three_1 = require("three");
const AnimationChunk_1 = require("../chunk/AnimationChunk");
const TilingFBMChunk_1 = require("../chunk/TilingFBMChunk");
const ShaderPhongMaterial_1 = require("../ShaderPhongMaterial");
const ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
const FBMFireMaterial_frag_glsl_1 = __importDefault(require("./FBMFireMaterial.frag.glsl"));
class FBMFireMaterial extends ShaderPhongMaterial_1.ShaderPhongMaterial {
    /**
     *
     * @param parameters
     */
    constructor(parameters) {
        super(ShaderPhongMaterial_vert_glsl_1.default(), FBMFireMaterial_frag_glsl_1.default(), parameters);
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
    get tiles() {
        return this.uniforms.tiles.value;
    }
    set tiles(value) {
        this.uniforms.tiles.value = value;
    }
    get hashLoop() {
        return this.uniforms.hashLoop.value;
    }
    set hashLoop(value) {
        this.uniforms.hashLoop.value = value;
    }
    get amp() {
        return this.uniforms.amp.value;
    }
    set amp(value) {
        this.uniforms.amp.value = value;
    }
    /*
     * IAnimatable implements
     */
    addTime(delta) {
        AnimationChunk_1.AnimationChunk.addTime(this, delta);
    }
    /**
     * アニメーションを行うか否か。
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
    get strength() {
        return this.uniforms.strength.value;
    }
    set strength(value) {
        this.uniforms.strength.value = value;
    }
    get bloom() {
        return this.uniforms.bloom.value;
    }
    set bloom(value) {
        this.uniforms.bloom.value = value;
    }
    get transformSpeed() {
        return this.uniforms.transformSpeed.value;
    }
    set transformSpeed(value) {
        this.uniforms.transformSpeed.value = value;
    }
    get rimPow() {
        return this.uniforms.rimPow.value;
    }
    set rimPow(value) {
        this.uniforms.rimPow.value = value;
    }
    get rimStrength() {
        return this.uniforms.rimStrength.value;
    }
    set rimStrength(value) {
        this.uniforms.rimStrength.value = value;
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            ShaderPhongMaterial_1.ShaderPhongMaterial.getBasicUniforms(),
            TilingFBMChunk_1.TilingFBMChunk.getUniform(),
            AnimationChunk_1.AnimationChunk.getUniform(),
            {
                strength: { value: 0.45 },
                bloom: { value: 0.1 },
                rimStrength: { value: 1.0 },
                rimPow: { value: 1.0 },
            },
        ]);
    }
    initChunks() {
        super.initChunks();
        TilingFBMChunk_1.TilingFBMChunk.registerChunk();
        AnimationChunk_1.AnimationChunk.registerChunk();
    }
    initDefines() {
        super.initDefines();
        this.defines = Object.assign({}, TilingFBMChunk_1.TilingFBMChunk.getDefines(), this.defines);
        this.defines.USE_SURFACE_NORMAL = true;
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
exports.FBMFireMaterial = FBMFireMaterial;
