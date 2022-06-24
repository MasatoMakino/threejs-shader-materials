import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import FragmentShader from "./RimEffectMaterial.frag.glsl";
import { Color, UniformsUtils } from "three";
export class RimEffectMaterial extends ShaderPhongMaterial {
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
    get rimColor() {
        return this.uniforms.rimColor.value;
    }
    set rimColor(value) {
        this.uniforms.rimColor.value = value;
    }
    get insidePow() {
        return this.uniforms.insidePow.value;
    }
    set insidePow(value) {
        this.uniforms.insidePow.value = value;
    }
    get insideStrength() {
        return this.uniforms.insideStrength.value;
    }
    set insideStrength(value) {
        this.uniforms.insideStrength.value = value;
    }
    get insideColor() {
        return this.uniforms.insideColor.value;
    }
    set insideColor(value) {
        this.uniforms.insideColor.value = value;
    }
    /**
     *
     * @param parameters
     */
    constructor(parameters) {
        super(null, FragmentShader(), parameters);
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            {
                rimColor: { value: new Color(1.0, 1.0, 1.0) },
                rimStrength: { value: 1.0 },
                rimPow: { value: 1.0 },
                insideColor: { value: new Color(0.0, 0.0, 0.0) },
                insideStrength: { value: 1.0 },
                insidePow: { value: 1.0 },
            },
        ]);
    }
    initDefines() {
        super.initDefines();
        this.defines.USE_LIGHT = true;
        this.defines.USE_SURFACE_NORMAL = true;
    }
}
