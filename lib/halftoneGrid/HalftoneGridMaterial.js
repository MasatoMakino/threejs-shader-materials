"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalftoneGridMaterial = void 0;
const ShaderPhongMaterial_glsl_1 = require("../ShaderPhongMaterial.glsl");
const WavyGridMaterial_1 = require("../WavyGridMaterial");
const HalftoneGridMaterial_glsl_1 = require("./HalftoneGridMaterial.glsl");
const three_1 = require("three");
/**
 * MaskMapをハーフトーン分解するマテリアル
 */
class HalftoneGridMaterial extends WavyGridMaterial_1.WavyGridMaterial {
    get radius() {
        return this.uniforms.radius.value;
    }
    set radius(value) {
        this.uniforms.radius.value = value;
    }
    constructor(parameters) {
        super(ShaderPhongMaterial_glsl_1.vertex, HalftoneGridMaterial_glsl_1.fragment, parameters);
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            WavyGridMaterial_1.WavyGridMaterial.getBasicUniforms(),
            {
                radius: { value: 0.75 },
            },
        ]);
    }
}
exports.HalftoneGridMaterial = HalftoneGridMaterial;
