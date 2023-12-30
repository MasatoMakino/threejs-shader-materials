import { vertex } from "../ShaderPhongMaterial.glsl.js";
import { WavyGridMaterial } from "../WavyGridMaterial.js";
import { fragment } from "./CrossGridMaterial.glsl.js";
import { UniformsUtils } from "three";
/**
 * 十字線を正方形グリッドの中心に描画するマテリアル。
 */
export class CrossGridMaterial extends WavyGridMaterial {
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
                gridWeight: { value: 0.03 },
                radius: { value: 0.15 },
            },
        ]);
    }
}
