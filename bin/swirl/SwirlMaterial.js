import { ShaderPhongMaterial, AnimationChunk } from "../index";
import { Vector2, UniformsUtils } from "three";
import FragmentShader from "./SwirlMaterial.frag.glsl";
import { RepeatWrapping } from "three";
export class SwirlMaterial extends ShaderPhongMaterial {
    constructor(parameters) {
        super(null, FragmentShader(), parameters);
        /*
         * implements IAnimatable
         */
        this.speed = -0.02;
        this.isAnimate = true;
    }
    addTime(delta) {
        if (this.isAnimate) {
            AnimationChunk.addTime(this, delta);
        }
    }
    set map(val) {
        super.map = val;
        this.setRepeat(val);
    }
    set alphaMap(value) {
        super.alphaMap = value;
        this.setRepeat(value);
    }
    /**
     * リピートモードは強制的にRepeatWrappingに
     * @param value
     */
    setRepeat(value) {
        if (value) {
            value.wrapS = RepeatWrapping;
            value.wrapT = RepeatWrapping;
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
        AnimationChunk.registerChunk();
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            AnimationChunk.getUniform(),
            {
                uvRotation: { value: 0.0 },
                swirlRotation: { value: 3.14 },
                radius: { value: 0.5 },
                center: { value: new Vector2(0.5, 0.5) }
            }
        ]);
    }
}
