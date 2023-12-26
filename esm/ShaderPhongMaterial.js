import FragmentShader from "./ShaderPhongMaterial.frag.glsl";
import VertexShader from "./ShaderPhongMaterial.vert.glsl";
import { ExpansionChunk, MapChunk, MeshPhongChunk, SurfaceNormalChunk, } from "./chunk/";
import { AdditiveBlending, Color, ShaderMaterial, UniformsLib, UniformsUtils, } from "three";
/**
 * MeshPhongMaterialに準じるShaderMaterialクラス。
 *
 * @see https://github.com/mrdoob/three.js/blob/76c64b23d422dcfb36a28353f45b1effa1f68c5a/src/renderers/shaders/ShaderLib.js#L53
 */
export class ShaderPhongMaterial extends ShaderMaterial {
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
        vertexShader !== null && vertexShader !== void 0 ? vertexShader : (vertexShader = VertexShader());
        fragmentShader !== null && fragmentShader !== void 0 ? fragmentShader : (fragmentShader = FragmentShader());
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
        return UniformsUtils.merge([
            UniformsLib.common,
            UniformsLib.specularmap,
            UniformsLib.envmap,
            UniformsLib.aomap,
            UniformsLib.lightmap,
            UniformsLib.emissivemap,
            UniformsLib.bumpmap,
            UniformsLib.normalmap,
            UniformsLib.displacementmap,
            UniformsLib.gradientmap,
            UniformsLib.fog,
            UniformsLib.lights,
            {
                emissive: { value: new Color(0x000000) },
                specular: { value: new Color(0x111111) },
                shininess: { value: 30 },
                hasAlphaMap: { value: false },
            },
            SurfaceNormalChunk.getUniform(),
            ExpansionChunk.getUniform(),
            MapChunk.getUniform(),
        ]);
    }
    /**
     * ShaderChunkにこのマテリアルに必要なChunkを追加する。
     */
    initChunks() {
        MeshPhongChunk.registerChunk();
        SurfaceNormalChunk.registerChunk();
        ExpansionChunk.registerChunk();
        MapChunk.registerChunk();
    }
    /**
     * uniformsを初期化する。
     */
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            ExpansionChunk.getUniform(),
            {},
        ]);
    }
    /**
     * definesを初期化する。
     */
    initDefines() {
        this.defines = Object.assign({}, MeshPhongChunk.getDefines(), SurfaceNormalChunk.getDefines(), ExpansionChunk.getDefines(), this.defines);
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
        return MapChunk.getMap(this);
    }
    set map(val) {
        MapChunk.setMap(this, val);
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
        this.blending = AdditiveBlending;
    }
}
