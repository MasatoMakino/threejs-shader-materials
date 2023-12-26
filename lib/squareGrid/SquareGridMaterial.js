"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquareGridMaterial = void 0;
const ShaderPhongMaterial_glsl_1 = require("../ShaderPhongMaterial.glsl");
const WavyGridMaterial_1 = require("../WavyGridMaterial");
const SquareGridMaterial_glsl_1 = require("./SquareGridMaterial.glsl");
const three_1 = require("three");
/**
 * 四角形グリッドマテリアル
 */
class SquareGridMaterial extends WavyGridMaterial_1.WavyGridMaterial {
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
        super(ShaderPhongMaterial_glsl_1.vertex, SquareGridMaterial_glsl_1.fragment, parameters);
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            WavyGridMaterial_1.WavyGridMaterial.getBasicUniforms(),
            {
                gridWeight: { value: 0.03 },
            },
        ]);
    }
}
exports.SquareGridMaterial = SquareGridMaterial;
