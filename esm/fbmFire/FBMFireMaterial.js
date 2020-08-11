import {RAFTicker, RAFTickerEventType} from "raf-ticker";
import {UniformsUtils} from "three";
import {AnimationChunk} from "../chunk/AnimationChunk";
import {TilingFBMChunk} from "../chunk/TilingFBMChunk";
import {ShaderPhongMaterial} from "../ShaderPhongMaterial";
import VertexShader from "../ShaderPhongMaterial.vert.glsl";
import FragmentShader from "./FBMFireMaterial.frag.glsl";

export class FBMFireMaterial extends ShaderPhongMaterial {
    /**
     *
     * @param parameters
     */
    constructor(parameters) {
        super(VertexShader(), FragmentShader(), parameters);
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
        AnimationChunk.addTime(this, delta);
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
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            TilingFBMChunk.getUniform(),
            AnimationChunk.getUniform(),
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
        TilingFBMChunk.registerChunk();
        AnimationChunk.registerChunk();
    }
    initDefines() {
        super.initDefines();
        this.defines = Object.assign({}, TilingFBMChunk.getDefines(), this.defines);
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
        RAFTicker.on(RAFTickerEventType.onBeforeTick, this.animationListener);
    }
    stopAnimation() {
        RAFTicker.off(RAFTickerEventType.onBeforeTick, this.animationListener);
    }
}
