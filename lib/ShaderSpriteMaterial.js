"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderSpriteMaterial = void 0;
const three_1 = require("three");
const SpriteChunk_1 = require("./chunk/SpriteChunk");
const ShaderSpriteMaterial_frag_glsl_1 = __importDefault(require("./ShaderSpriteMaterial.frag.glsl"));
const ShaderSpriteMaterial_vert_glsl_1 = __importDefault(require("./ShaderSpriteMaterial.vert.glsl"));
class ShaderSpriteMaterial extends three_1.ShaderMaterial {
    /**
     * コンストラクタ。
     * @param vertexShader
     * @param fragmentShader
     * @param parameters
     */
    constructor(vertexShader, fragmentShader, parameters) {
        super(parameters);
        this._opacity = 1.0;
        parameters !== null && parameters !== void 0 ? parameters : (parameters = {});
        vertexShader !== null && vertexShader !== void 0 ? vertexShader : (vertexShader = (0, ShaderSpriteMaterial_vert_glsl_1.default)());
        fragmentShader !== null && fragmentShader !== void 0 ? fragmentShader : (fragmentShader = (0, ShaderSpriteMaterial_frag_glsl_1.default)());
        this.initChunks();
        this.initUniforms();
        this.initDefines();
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.initDefaultSetting(parameters);
    }
    /**
     * ShaderChunkにこのマテリアルに必要なChunkを追加する。
     */
    initChunks() {
        SpriteChunk_1.SpriteChunk.registerChunk();
    }
    /**
     * uniformsを初期化する。
     */
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([SpriteChunk_1.SpriteChunk.getUniform(), {}]);
    }
    /**
     * definesを初期化する。
     */
    initDefines() {
        this.defines = Object.assign({}, SpriteChunk_1.SpriteChunk.getDefines(), this.defines);
    }
    /**
     * 1.オプションで指定されなかったパラメーター値を補完する。
     * 2.uniformsに代入する必要のあるパラメーターを明示的に代入する。
     *
     * @param parameters
     */
    initDefaultSetting(parameters) {
        this.uniformOpacity = this._opacity;
    }
    /**
     * 透明度
     * @deprecated Use uniformOpacity, To be removed in version 0.3.0
     * @see https://github.com/microsoft/TypeScript/pull/37894
     */
    //@ts-ignore : これはopacityプロパティとuniforms.opacityプロパティを同期するために利用されます。
    get opacity() {
        return this._opacity;
    }
    /**
     * 透明度
     */
    get uniformOpacity() {
        return this._opacity;
    }
    /**
     * 透明度
     * @deprecated Use uniformOpacity, To be removed in version 0.3.0
     * @param value
     */
    //@ts-ignore : これはopacityプロパティとuniforms.opacityプロパティを同期するために利用されます。
    set opacity(value) {
        this.uniformOpacity = value;
    }
    /**
     * 透明度
     * opacityは基底クラスのMaterialのコンストラクタ内で明示的に1.0が代入される。
     * この段階でuniformsはundefinedなので、そのままでは初期化できない。
     * このsetterでは受け取った値をprivate変数に保存して、初期化後にuniformsに再代入する。
     * @param value
     */
    set uniformOpacity(value) {
        var _a;
        this._opacity = value;
        if ((_a = this.uniforms) === null || _a === void 0 ? void 0 : _a.opacity) {
            this.uniforms.opacity.value = value;
        }
    }
    /**
     * Spriteマテリアルと互換性を持つために、colorプロパティはdiffuseへ代入される。
     */
    get color() {
        return this.uniforms.diffuse.value;
    }
    set color(value) {
        this.uniforms.diffuse.value = value;
    }
    get center() {
        return this.uniforms.center.value;
    }
    set center(value) {
        this.uniforms.center.value = value;
    }
    get rotation() {
        return this.uniforms.rotation.value;
    }
    set rotation(value) {
        this.uniforms.rotation.value = value;
    }
    get uvTransform() {
        return this.uniforms.uvTransform.value;
    }
    set uvTransform(value) {
        this.uniforms.uvTransform.value = value;
    }
    get map() {
        return this.uniforms.map.value;
    }
    set map(value) {
        this.uniforms.map.value = value;
    }
}
exports.ShaderSpriteMaterial = ShaderSpriteMaterial;
