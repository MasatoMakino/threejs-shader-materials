import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { UniformsUtils } from "three";
import FragmentShader from "./ExpansionMaterial.frag.glsl";
import VertexShader from "./ExpansionMaterial.vert.glsl";
export class ExpansionMaterial extends ShaderPhongMaterial {
    get amp() {
        return this.uniforms.amp.value;
    }
    set amp(value) {
        this.uniforms.amp.value = value;
    }
    constructor(parameters) {
        super(VertexShader(), FragmentShader(), parameters);
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            {
                amp: { value: 0.0 }
            }
        ]);
    }
}
