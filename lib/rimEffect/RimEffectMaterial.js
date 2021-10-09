"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RimEffectMaterial = void 0;
const ShaderPhongMaterial_1 = require("../ShaderPhongMaterial");
const RimEffectMaterial_frag_glsl_1 = __importDefault(require("./RimEffectMaterial.frag.glsl"));
const three_1 = require("three");
const three_2 = require("three");
class RimEffectMaterial extends ShaderPhongMaterial_1.ShaderPhongMaterial {
    get rimPow() {
        return this.uniforms.rimPow.value;
    }
    set rimPow(value) {
        this.uniforms.rimPow.value = value;
    }
    get rimStrength() {
        return this.uniforms.rimStrength.value;
    }
    set rimStrength(value) {
        this.uniforms.rimStrength.value = value;
    }
    get rimColor() {
        return this.uniforms.rimColor.value;
    }
    set rimColor(value) {
        this.uniforms.rimColor.value = value;
    }
    get insidePow() {
        return this.uniforms.insidePow.value;
    }
    set insidePow(value) {
        this.uniforms.insidePow.value = value;
    }
    get insideStrength() {
        return this.uniforms.insideStrength.value;
    }
    set insideStrength(value) {
        this.uniforms.insideStrength.value = value;
    }
    get insideColor() {
        return this.uniforms.insideColor.value;
    }
    set insideColor(value) {
        this.uniforms.insideColor.value = value;
    }
    /**
     *
     * @param parameters
     */
    constructor(parameters) {
        super(null, (0, RimEffectMaterial_frag_glsl_1.default)(), parameters);
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            ShaderPhongMaterial_1.ShaderPhongMaterial.getBasicUniforms(),
            {
                rimColor: { value: new three_2.Color(1.0, 1.0, 1.0) },
                rimStrength: { value: 1.0 },
                rimPow: { value: 1.0 },
                insideColor: { value: new three_2.Color(0.0, 0.0, 0.0) },
                insideStrength: { value: 1.0 },
                insidePow: { value: 1.0 }
            }
        ]);
    }
    initDefines() {
        super.initDefines();
        this.defines.USE_LIGHT = true;
        this.defines.USE_SURFACE_NORMAL = true;
    }
}
exports.RimEffectMaterial = RimEffectMaterial;
