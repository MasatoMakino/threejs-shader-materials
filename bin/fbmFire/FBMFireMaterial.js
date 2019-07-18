import { UniformsUtils } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import VertexShader from "../ShaderPhongMaterial.vert.glsl";
import FragmentShader from "./FBMFireMaterial.frag.glsl";
import { TilingFBMChunk } from "../chunk/TilingFBMChunk";
import { AnimationChunk } from "../chunk/AnimationChunk";
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
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            TilingFBMChunk.getUniform(),
            AnimationChunk.getUniform(),
            {
                strength: { value: 0.45 },
                bloom: { value: 0.1 }
            }
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
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
        if (parameters.transparent == null) {
            this.transparent = true;
        }
        else {
            this.transparent = parameters.transparent;
        }
        this.isAnimate = this.isAnimate; //reset and start requestAnimationFrame()
    }
    /*
     * IAnimatable implements
     */
    startAnimation() {
        if (this.animationID != null)
            return;
        this.animationID = requestAnimationFrame(timestamp => {
            this.onRequestAnimationFrame(timestamp);
        });
    }
    stopAnimation() {
        this.lastAnimatedTimestamp = null;
        if (this.animationID == null)
            return;
        cancelAnimationFrame(this.animationID);
        this.animationID = null;
    }
    onRequestAnimationFrame(timestamp) {
        if (this.lastAnimatedTimestamp != null) {
            const delta = (timestamp - this.lastAnimatedTimestamp) / 1000;
            this.addTime(delta);
        }
        this.lastAnimatedTimestamp = timestamp;
        this.animationID = requestAnimationFrame(timestamp => {
            this.onRequestAnimationFrame(timestamp);
        });
    }
}
