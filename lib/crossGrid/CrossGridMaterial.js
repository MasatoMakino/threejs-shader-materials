"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossGridMaterial = void 0;
const ShaderPhongMaterial_glsl_1 = require("../ShaderPhongMaterial.glsl");
const WavyGridMaterial_1 = require("../WavyGridMaterial");
const CrossGridMaterial_glsl_1 = require("./CrossGridMaterial.glsl");
const three_1 = require("three");
/**
 * 十字線を正方形グリッドの中心に描画するマテリアル。
 */
class CrossGridMaterial extends WavyGridMaterial_1.WavyGridMaterial {
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
        super(ShaderPhongMaterial_glsl_1.vertex, CrossGridMaterial_glsl_1.fragment, parameters);
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            WavyGridMaterial_1.WavyGridMaterial.getBasicUniforms(),
            {
                gridWeight: { value: 0.03 },
                radius: { value: 0.15 },
            },
        ]);
    }
}
exports.CrossGridMaterial = CrossGridMaterial;
