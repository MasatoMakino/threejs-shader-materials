"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderBasicMaterial = void 0;
const ShaderBasicMaterial_glsl_1 = require("./ShaderBasicMaterial.glsl");
const chunk_1 = require("./chunk");
const three_1 = require("three");
/**
 * MeshBasicMaterialに準じたShaderMaterial
 */
class ShaderBasicMaterial extends three_1.ShaderMaterial {
    /**
     * @param vertexShader
     * @param fragmentShader
     * @param parameters
     */
    constructor(vertexShader, fragmentShader, parameters) {
        super(parameters);
        this._opacity = 1.0;
        this.uniforms = ShaderBasicMaterial.getBasicUniforms();
        this.vertexShader = vertexShader !== null && vertexShader !== void 0 ? vertexShader : ShaderBasicMaterial_glsl_1.vertex;
        this.fragmentShader = fragmentShader !== null && fragmentShader !== void 0 ? fragmentShader : ShaderBasicMaterial_glsl_1.fragment;
        chunk_1.SurfaceNormalChunk.registerChunk();
        this.initDefines();
        this.uniformOpacity = this._opacity;
    }
    /**
     * このMaterialに必要なuniformsを生成する。
     *
     * @see https://github.com/mrdoob/three.js/blob/0c26bb4bb8220126447c8373154ac045588441de/src/renderers/shaders/ShaderLib.js#L11
     */
    static getBasicUniforms() {
        return three_1.UniformsUtils.merge([
            three_1.UniformsLib.common,
            three_1.UniformsLib.specularmap,
            three_1.UniformsLib.envmap,
            three_1.UniformsLib.aomap,
            three_1.UniformsLib.lightmap,
            three_1.UniformsLib.fog,
        ]);
    }
    get color() {
        return this.uniforms.diffuse.value;
    }
    set color(value) {
        this.uniforms.diffuse.value = value;
    }
    get uniformOpacity() {
        return this._opacity;
    }
    set uniformOpacity(value) {
        var _a;
        this._opacity = value;
        if ((_a = this.uniforms) === null || _a === void 0 ? void 0 : _a.opacity) {
            this.uniforms.opacity.value = value;
        }
    }
    initDefines() {
        this.defines = Object.assign({}, chunk_1.SurfaceNormalChunk.getDefines(), this.defines);
    }
}
exports.ShaderBasicMaterial = ShaderBasicMaterial;
