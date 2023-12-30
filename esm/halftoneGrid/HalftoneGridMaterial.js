import { vertex } from "../ShaderPhongMaterial.glsl.js";
import { WavyGridMaterial } from "../WavyGridMaterial.js";
import { fragment } from "./HalftoneGridMaterial.glsl.js";
import { UniformsUtils } from "three";
/**
 * MaskMapをハーフトーン分解するマテリアル
 */
export class HalftoneGridMaterial extends WavyGridMaterial {
    get radius() {
        return this.uniforms.radius.value;
    }
    set radius(value) {
        this.uniforms.radius.value = value;
    }
    constructor(parameters) {
        super(vertex, fragment, parameters);
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            WavyGridMaterial.getBasicUniforms(),
            {
                radius: { value: 0.75 },
            },
        ]);
    }
}
