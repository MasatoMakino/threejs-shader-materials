import { AnimationChunk, ShaderPhongMaterial } from "../";
import FragmentShader from "./CellularNoiseMaterial.frag.glsl";
import { RAFTicker, RAFTickerEventType } from "@masatomakino/raf-ticker";
import { UniformsUtils } from "three";
export class CellularNoiseMaterial extends ShaderPhongMaterial {
    constructor(parameters) {
        super(null, FragmentShader(), parameters);
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
            AnimationChunk.addTime(this, delta);
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
    initChunks() {
        super.initChunks();
        AnimationChunk.registerChunk();
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            AnimationChunk.getUniform(),
            {
                grid: { value: 3.0 },
                divisionScaleX: { value: 1.0 },
            },
        ]);
    }
    startAnimation() {
        RAFTicker.on(RAFTickerEventType.onBeforeTick, this.animationListener);
    }
    stopAnimation() {
        RAFTicker.off(RAFTickerEventType.onBeforeTick, this.animationListener);
    }
}
