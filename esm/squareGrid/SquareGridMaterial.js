import { vertex } from "../ShaderPhongMaterial.glsl.js";
import { WavyGridMaterial } from "../WavyGridMaterial.js";
import { fragment } from "./SquareGridMaterial.glsl.js";
import { UniformsUtils } from "three";
/**
 * 四角形グリッドマテリアル
 */
export class SquareGridMaterial extends WavyGridMaterial {
    /**
     * グリッド線の太さ
     * 0.0で線なし、0.5でグリッド面なしになる。
     */
    get gridWeight() {
        return this.uniforms.gridWeight.value;
    }
    set gridWeight(value) {
        this.uniforms.gridWeight.value = value;
    }
    constructor(parameters) {
        super(vertex, fragment, parameters);
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            WavyGridMaterial.getBasicUniforms(),
            {
                gridWeight: { value: 0.03 },
            },
        ]);
    }
}
