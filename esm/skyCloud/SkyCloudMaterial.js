import { ShaderPhongMaterial } from "../ShaderPhongMaterial.js";
import { vertex } from "../ShaderPhongMaterial.glsl.js";
import { AnimationChunk } from "../chunk/index.js";
import { fragment } from "./SkyCloudMaterial.glsl.js";
import { RAFTicker } from "@masatomakino/raf-ticker";
import { Color, UniformsUtils } from "three";
export class SkyCloudMaterial extends ShaderPhongMaterial {
    get scale() {
        return this.uniforms.scale.value;
    }
    set scale(value) {
        this.uniforms.scale.value = value;
    }
    /*
     * implements IAnimatable
     */
    addTime(delta) {
        AnimationChunk.addTime(this, delta);
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
    /**
     *
     * @param parameters
     */
    constructor(parameters) {
        super(vertex, fragment, parameters);
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
    initChunks() {
        super.initChunks();
        AnimationChunk.registerChunk();
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            AnimationChunk.getUniform(),
            {
                scale: { value: 3.0 },
                cloudTransformSpeed: { value: 0.15 },
                cloudVolume: { value: 16.0 },
                cloudBottomVolume: { value: 0.08 },
                cloudBottomSaturation: { value: 0.5 },
                skyColor: { value: new Color(0.101961, 0.619608, 0.666667) },
            },
        ]);
    }
    startAnimation() {
        RAFTicker.on("onBeforeTick", this.animationListener);
    }
    stopAnimation() {
        RAFTicker.off("onBeforeTick", this.animationListener);
    }
}
