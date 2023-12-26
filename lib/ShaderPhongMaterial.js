"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderPhongMaterial = void 0;
const ShaderPhongMaterial_frag_glsl_1 = __importDefault(require("./ShaderPhongMaterial.frag.glsl"));
const ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("./ShaderPhongMaterial.vert.glsl"));
const chunk_1 = require("./chunk/");
const three_1 = require("three");
/**
 * MeshPhongMaterialに準じるShaderMaterialクラス。
 *
 * @see https://github.com/mrdoob/three.js/blob/76c64b23d422dcfb36a28353f45b1effa1f68c5a/src/renderers/shaders/ShaderLib.js#L53
 */
class ShaderPhongMaterial extends three_1.ShaderMaterial {
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
        vertexShader !== null && vertexShader !== void 0 ? vertexShader : (vertexShader = (0, ShaderPhongMaterial_vert_glsl_1.default)());
        fragmentShader !== null && fragmentShader !== void 0 ? fragmentShader : (fragmentShader = (0, ShaderPhongMaterial_frag_glsl_1.default)());
        this.initChunks();
        this.initUniforms();
        this.initDefines();
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.initDefaultSetting(parameters);
    }
    /**
     * このMaterialに必要なuniformsを生成する。
     */
    static getBasicUniforms() {
        return three_1.UniformsUtils.merge([
            three_1.UniformsLib.common,
            three_1.UniformsLib.specularmap,
            three_1.UniformsLib.envmap,
            three_1.UniformsLib.aomap,
            three_1.UniformsLib.lightmap,
            three_1.UniformsLib.emissivemap,
            three_1.UniformsLib.bumpmap,
            three_1.UniformsLib.normalmap,
            three_1.UniformsLib.displacementmap,
            three_1.UniformsLib.gradientmap,
            three_1.UniformsLib.fog,
            three_1.UniformsLib.lights,
            {
                emissive: { value: new three_1.Color(0x000000) },
                specular: { value: new three_1.Color(0x111111) },
                shininess: { value: 30 },
                hasAlphaMap: { value: false },
            },
            chunk_1.SurfaceNormalChunk.getUniform(),
            chunk_1.ExpansionChunk.getUniform(),
            chunk_1.MapChunk.getUniform(),
        ]);
    }
    /**
     * ShaderChunkにこのマテリアルに必要なChunkを追加する。
     */
    initChunks() {
        chunk_1.MeshPhongChunk.registerChunk();
        chunk_1.SurfaceNormalChunk.registerChunk();
        chunk_1.ExpansionChunk.registerChunk();
        chunk_1.MapChunk.registerChunk();
    }
    /**
     * uniformsを初期化する。
     */
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            chunk_1.ExpansionChunk.getUniform(),
            {},
        ]);
    }
    /**
     * definesを初期化する。
     */
    initDefines() {
        this.defines = Object.assign({}, chunk_1.MeshPhongChunk.getDefines(), chunk_1.SurfaceNormalChunk.getDefines(), chunk_1.ExpansionChunk.getDefines(), this.defines);
    }
    /**
     * 1.オプションで指定されなかったパラメーター値を補完する。
     * 2.uniformsに代入する必要のあるパラメーターを明示的に代入する。
     *
     * @param parameters
     */
    initDefaultSetting(parameters) {
        this.uniformOpacity = this._opacity;
        this.lights = true; //FIXME シェーダーがエラーを起こすのでlights設定は強制でON
        if ((parameters === null || parameters === void 0 ? void 0 : parameters.transparent) == null) {
            this.transparent = true;
        }
        else {
            this.transparent = parameters.transparent;
        }
    }
    /**
     * MeshPhongマテリアルと互換性を持つために、colorプロパティはdiffuseへ代入される。
     */
    get color() {
        return this.uniforms.diffuse.value;
    }
    set color(value) {
        this.uniforms.diffuse.value = value;
    }
    /**
     * 透明度
     * @deprecated Use uniformOpacity, To be removed in version 0.3.0
     * @see https://github.com/microsoft/TypeScript/pull/37894
     */
    //@ts-ignore : これはopacityプロパティとuniforms.opacityプロパティを同期するために利用されます。
    get opacity() {
        return this.uniformOpacity;
    }
    /**
     * 透明度
     */
    get uniformOpacity() {
        return this._opacity;
    }
    /**
     * 透明度
     * @param value
     * @deprecated Use uniformOpacity, To be removed in version 0.3.0
     * @see https://github.com/microsoft/TypeScript/pull/37894
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
    get emissive() {
        return this.uniforms.emissive.value;
    }
    set emissive(value) {
        this.uniforms.emissive.value = value;
    }
    get map() {
        return chunk_1.MapChunk.getMap(this);
    }
    set map(val) {
        chunk_1.MapChunk.setMap(this, val);
        this.onSetMap(val);
    }
    onSetMap(val) { }
    get alphaMap() {
        return this.uniforms.alphaMap.value;
    }
    set alphaMap(value) {
        this.uniforms.alphaMap.value = value;
        this.uniforms.hasAlphaMap.value = value != null;
        this.onSetAlphaMap(value);
    }
    onSetAlphaMap(value) { }
    /**
     * 発光状態のために、マテリアルの設定をまとめて変更する。
     * {@link https://stackoverflow.com/questions/37647853/three-js-depthwrite-vs-depthtest-for-transparent-canvas-texture-map-on-three-p}
     */
    startGlow() {
        this.alphaTest = 0.0;
        this.depthWrite = false;
        this.blending = three_1.AdditiveBlending;
    }
}
exports.ShaderPhongMaterial = ShaderPhongMaterial;
