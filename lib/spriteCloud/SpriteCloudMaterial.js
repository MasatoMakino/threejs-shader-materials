"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteCloudMaterial = void 0;
const ShaderSpriteMaterial_1 = require("../ShaderSpriteMaterial");
const SpriteCloudMaterial_glsl_1 = require("./SpriteCloudMaterial.glsl");
const three_1 = require("three");
class SpriteCloudMaterial extends ShaderSpriteMaterial_1.ShaderSpriteMaterial {
    constructor(parameters) {
        super(null, SpriteCloudMaterial_glsl_1.fragment, parameters);
    }
    /**
     * uniformsを初期化する。
     */
    initUniforms() {
        super.initUniforms();
        this.uniforms = three_1.UniformsUtils.merge([
            this.uniforms,
            {
                rimStrength: { value: 0.2 },
                bottomStrength: { value: 0.75 },
                rimColor: { value: new three_1.Color(0xffffff) },
                skyColor: { value: new three_1.Color(0xcccccc) },
                rimCenter: { value: 0.6 },
                rimRange: { value: 0.15 },
            },
        ]);
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
    }
    get rimCenter() {
        return this.uniforms.rimCenter.value;
    }
    set rimCenter(value) {
        this.uniforms.rimCenter.value = value;
    }
    get rimRange() {
        return this.uniforms.rimRange.value;
    }
    set rimRange(value) {
        this.uniforms.rimRange.value = value;
    }
    get rimStrength() {
        return this.uniforms.rimStrength.value;
    }
    set rimStrength(value) {
        this.uniforms.rimStrength.value = value;
    }
    get bottomStrength() {
        return this.uniforms.bottomStrength.value;
    }
    set bottomStrength(value) {
        this.uniforms.bottomStrength.value = value;
    }
    get rimColor() {
        return this.uniforms.rimColor.value;
    }
    set rimColor(value) {
        this.uniforms.rimColor.value = value;
    }
    get skyColor() {
        return this.uniforms.skyColor.value;
    }
    set skyColor(value) {
        this.uniforms.skyColor.value = value;
    }
}
exports.SpriteCloudMaterial = SpriteCloudMaterial;
