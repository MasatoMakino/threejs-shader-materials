/**
 * MaskMapをハーフトーン分解するマテリアル
 */
import { UniformsUtils } from "three";
import FragmentShader from "./HalftoneGridMaterial.frag.glsl";
import VertexShader from "../ShaderPhongMaterial.vert.glsl";
import { WavyGridMaterial } from "../WavyGridMaterial";
export class HalftoneGridMaterial extends WavyGridMaterial {
    get radius() {
        return this.uniforms.radius.value;
    }
    set radius(value) {
        this.uniforms.radius.value = value;
    }
    constructor(parameters) {
        super(VertexShader, FragmentShader, parameters);
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            WavyGridMaterial.getBasicUniforms(),
            {
                radius: { value: 0.75 }
            }
        ]);
    }
}
