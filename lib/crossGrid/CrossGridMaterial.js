"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossGridMaterial = void 0;
const three_1 = require("three");
const CrossGridMaterial_frag_glsl_1 = __importDefault(require("./CrossGridMaterial.frag.glsl"));
const ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
const WavyGridMaterial_1 = require("../WavyGridMaterial");
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
        super(ShaderPhongMaterial_vert_glsl_1.default(), CrossGridMaterial_frag_glsl_1.default(), parameters);
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            WavyGridMaterial_1.WavyGridMaterial.getBasicUniforms(),
            {
                gridWeight: { value: 0.03 },
                radius: { value: 0.15 }
            }
        ]);
    }
}
exports.CrossGridMaterial = CrossGridMaterial;
