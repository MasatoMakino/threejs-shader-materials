import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import VertexShader from "./RimEffectMaterial.vert.glsl";
import FragmentShader from "./RimEffectMaterial.frag.glsl";
import { UniformsUtils } from "three";
import { Color } from "three";
export class RimEffectMaterial extends ShaderPhongMaterial {
    get strength() {
        return this.uniforms.strength.value;
    }
    set strength(value) {
        this.uniforms.strength.value = value;
    }
    get rimColor() {
        return this.uniforms.rimColor.value;
    }
    set rimColor(value) {
        this.uniforms.rimColor.value = value;
    }
    /**
     *
     * @param parameters
     */
    constructor(parameters) {
        super(VertexShader(), FragmentShader(), parameters);
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            {
                rimColor: { value: new Color(1.0, 1.0, 1.0) },
                strength: { value: 1.0 }
            }
        ]);
    }
}
