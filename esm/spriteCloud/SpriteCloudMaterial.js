import { ShaderSpriteMaterial } from "../ShaderSpriteMaterial.js";
import { fragment } from "./SpriteCloudMaterial.glsl.js";
import { SpriteChunk } from "../chunk/SpriteChunk.js";
import { Color, UniformsUtils } from "three";
export class SpriteCloudMaterial extends ShaderSpriteMaterial {
    constructor(parameters) {
        super(null, fragment, parameters);
    }
    /**
     * uniformsを初期化する。
     */
    initUniforms() {
        super.initUniforms();
        this.uniforms = UniformsUtils.merge([
            this.uniforms,
            {
                rimStrength: { value: 0.2 },
                bottomStrength: { value: 0.75 },
                rimColor: { value: new Color(0xffffff) },
                skyColor: { value: new Color(0xcccccc) },
                rimCenter: { value: 0.6 },
                rimRange: { value: 0.15 },
            },
        ]);
    }
    initDefines() {
        this.defines = Object.assign({
            USE_UV: true,
        }, SpriteChunk.getDefines(), this.defines);
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
