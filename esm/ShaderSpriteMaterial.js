import { ShaderMaterial, UniformsUtils, } from "three";
import { SpriteChunk } from "./chunk/SpriteChunk";
import FragmentShader from "./ShaderSpriteMaterial.frag.glsl";
import VertexShader from "./ShaderSpriteMaterial.vert.glsl";
export class ShaderSpriteMaterial extends ShaderMaterial {
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
     * ShaderChunkにこのマテリアルに必要なChunkを追加する。
     */
    initChunks() {
        SpriteChunk.registerChunk();
    }
    /**
     * uniformsを初期化する。
     */
    initUniforms() {
        this.uniforms = UniformsUtils.merge([SpriteChunk.getUniform(), {}]);
    }
    /**
     * definesを初期化する。
     */
    initDefines() {
        this.defines = Object.assign({}, SpriteChunk.getDefines(), this.defines);
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
