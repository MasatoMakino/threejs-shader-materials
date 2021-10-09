"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwirlMaterial = void 0;
const raf_ticker_1 = require("raf-ticker");
const three_1 = require("three");
const index_1 = require("../index");
const SwirlMaterial_frag_glsl_1 = __importDefault(require("./SwirlMaterial.frag.glsl"));
class SwirlMaterial extends index_1.ShaderPhongMaterial {
    constructor(parameters) {
        super(null, (0, SwirlMaterial_frag_glsl_1.default)(), parameters);
        /*
         * implements IAnimatable
         */
        this.speed = -0.02;
        /*
         * IAnimatable implements
         */
        this.animationListener = (e) => {
            this.addTime(e.delta / 1000);
        };
        this.isAnimate = this.isAnimate;
    }
    addTime(delta) {
        if (this.isAnimate) {
            index_1.AnimationChunk.addTime(this, delta);
        }
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
    onSetMap(val) {
        super.onSetMap(val);
        this.setRepeat(val);
    }
    onSetAlphaMap(value) {
        super.onSetAlphaMap(value);
        this.setRepeat(value);
    }
    /**
     * リピートモードは強制的にRepeatWrappingに
     * @param value
     */
    setRepeat(value) {
        if (value) {
            value.wrapS = three_1.RepeatWrapping;
            value.wrapT = three_1.RepeatWrapping;
        }
    }
    get uvRotation() {
        return this.uniforms.uvRotation.value;
    }
    set uvRotation(value) {
        this.uniforms.uvRotation.value = value;
    }
    get swirlRotation() {
        return this.uniforms.swirlRotation.value;
    }
    set swirlRotation(value) {
        this.uniforms.swirlRotation.value = value;
    }
    get radius() {
        return this.uniforms.radius.value;
    }
    set radius(value) {
        this.uniforms.radius.value = value;
    }
    get center() {
        return this.uniforms.center.value;
    }
    set center(value) {
        this.uniforms.center.value = value;
    }
    initChunks() {
        super.initChunks();
        index_1.AnimationChunk.registerChunk();
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            index_1.ShaderPhongMaterial.getBasicUniforms(),
            index_1.AnimationChunk.getUniform(),
            {
                uvRotation: { value: 0.0 },
                swirlRotation: { value: 3.14 },
                radius: { value: 0.5 },
                center: { value: new three_1.Vector2(0.5, 0.5) },
            },
        ]);
    }
    startAnimation() {
        raf_ticker_1.RAFTicker.on(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    }
    stopAnimation() {
        raf_ticker_1.RAFTicker.off(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    }
}
exports.SwirlMaterial = SwirlMaterial;
