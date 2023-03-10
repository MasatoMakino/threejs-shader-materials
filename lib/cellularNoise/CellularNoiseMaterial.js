"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellularNoiseMaterial = void 0;
const __1 = require("../");
const CellularNoiseMaterial_frag_glsl_1 = __importDefault(require("./CellularNoiseMaterial.frag.glsl"));
const raf_ticker_1 = require("@masatomakino/raf-ticker");
const three_1 = require("three");
class CellularNoiseMaterial extends __1.ShaderPhongMaterial {
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
    get grid() {
        return this.uniforms.grid.value;
    }
    set grid(value) {
        this.uniforms.grid.value = value;
    }
    get divisionScaleX() {
        return this.uniforms.divisionScaleX.value;
    }
    set divisionScaleX(value) {
        this.uniforms.divisionScaleX.value = value;
    }
    constructor(parameters) {
        super(null, (0, CellularNoiseMaterial_frag_glsl_1.default)(), parameters);
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
                grid: { value: 3.0 },
                divisionScaleX: { value: 1.0 },
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
exports.CellularNoiseMaterial = CellularNoiseMaterial;
