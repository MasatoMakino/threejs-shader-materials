"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwirlMaterial = void 0;
const __1 = require("..");
const SwirlMaterial_glsl_1 = require("./SwirlMaterial.glsl");
const raf_ticker_1 = require("@masatomakino/raf-ticker");
const three_1 = require("three");
class SwirlMaterial extends __1.ShaderPhongMaterial {
    addTime(delta) {
        if (this.isAnimate) {
            __1.AnimationChunk.addTime(this, delta);
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
    constructor(parameters) {
        super(null, SwirlMaterial_glsl_1.fragment, parameters);
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
    initChunks() {
        super.initChunks();
        __1.AnimationChunk.registerChunk();
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            __1.ShaderPhongMaterial.getBasicUniforms(),
            __1.AnimationChunk.getUniform(),
            {
                uvRotation: { value: 0.0 },
                swirlRotation: { value: 3.14 },
                radius: { value: 0.5 },
                center: { value: new three_1.Vector2(0.5, 0.5) },
            },
        ]);
    }
    startAnimation() {
        raf_ticker_1.RAFTicker.on("onBeforeTick", this.animationListener);
    }
    stopAnimation() {
        raf_ticker_1.RAFTicker.off("onBeforeTick", this.animationListener);
    }
}
exports.SwirlMaterial = SwirlMaterial;
