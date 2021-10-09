"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpansionDissolveMaterial = void 0;
const raf_ticker_1 = require("raf-ticker");
const three_1 = require("three");
const index_1 = require("../index");
const ExpansionDissolveMaterial_frag_glsl_1 = __importDefault(require("./ExpansionDissolveMaterial.frag.glsl"));
const ExpansionDissolveMaterial_vert_glsl_1 = __importDefault(require("./ExpansionDissolveMaterial.vert.glsl"));
/**
 * FBMノイズによるジオメトリの膨張でディゾルブを行うマテリアル。
 * 爆発しながら消滅するような表現になる。
 * 膨張の進行度合いはprogressで制御する。
 */
class ExpansionDissolveMaterial extends index_1.ShaderPhongMaterial {
    /**
     *
     * @param parameters
     */
    constructor(parameters) {
        super((0, ExpansionDissolveMaterial_vert_glsl_1.default)(), (0, ExpansionDissolveMaterial_frag_glsl_1.default)(), parameters);
        // IAnimatable //
        this.speed = -0.5;
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
    // ITiledFBM //
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
    get scaleMax() {
        return this.uniforms.scaleMax.value;
    }
    set scaleMax(value) {
        this.uniforms.scaleMax.value = value;
    }
    get time() {
        return this.uniforms.time.value;
    }
    set time(value) {
        this.uniforms.time.value = value;
    }
    get progress() {
        return this.uniforms.progress.value;
    }
    set progress(value) {
        this.uniforms.progress.value = value;
    }
    get dissolveColor() {
        return this.uniforms.dissolveColor.value;
    }
    set dissolveColor(value) {
        this.uniforms.dissolveColor.value = value;
    }
    get dissolveOutColor() {
        return this.uniforms.dissolveOutColor.value;
    }
    set dissolveOutColor(value) {
        this.uniforms.dissolveOutColor.value = value;
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            index_1.ShaderPhongMaterial.getBasicUniforms(),
            index_1.TilingFBMChunk.getUniform(),
            index_1.AnimationChunk.getUniform(),
            {
                scaleMax: { value: 20.0 },
                progress: { value: 0.0 },
                dissolveColor: { value: new three_1.Color(1.0, 1.0, 1.0) },
                dissolveOutColor: { value: new three_1.Color(0.0, 0.0, 0.0) },
            },
        ]);
    }
    initChunks() {
        super.initChunks();
        index_1.TilingFBMChunk.registerChunk();
    }
    initDefines() {
        super.initDefines();
        this.defines = Object.assign(this.defines, index_1.TilingFBMChunk.getDefines());
        this.defines.USE_EXPANSION = true;
    }
    startAnimation() {
        raf_ticker_1.RAFTicker.on(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    }
    stopAnimation() {
        raf_ticker_1.RAFTicker.off(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    }
}
exports.ExpansionDissolveMaterial = ExpansionDissolveMaterial;
