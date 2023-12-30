import { IMap } from "./chunk/index.js";
import { Color, ShaderMaterial, ShaderMaterialParameters, Texture } from "three";
/**
 * MeshPhongMaterialに準じるShaderMaterialクラス。
 *
 * @see https://github.com/mrdoob/three.js/blob/76c64b23d422dcfb36a28353f45b1effa1f68c5a/src/renderers/shaders/ShaderLib.js#L53
 */
export declare abstract class ShaderPhongMaterial extends ShaderMaterial implements IMap {
    /**
     * コンストラクタ。
     * @param vertexShader
     * @param fragmentShader
     * @param parameters
     */
    constructor(vertexShader: string, fragmentShader: string, parameters?: ShaderMaterialParameters);
    /**
     * このMaterialに必要なuniformsを生成する。
     */
    static getBasicUniforms(): any;
    /**
     * ShaderChunkにこのマテリアルに必要なChunkを追加する。
     */
    protected initChunks(): void;
    /**
     * uniformsを初期化する。
     */
    protected initUniforms(): void;
    /**
     * definesを初期化する。
     */
    protected initDefines(): void;
    /**
     * 1.オプションで指定されなかったパラメーター値を補完する。
     * 2.uniformsに代入する必要のあるパラメーターを明示的に代入する。
     *
     * @param parameters
     */
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
    /**
     * MeshPhongマテリアルと互換性を持つために、colorプロパティはdiffuseへ代入される。
     */
    get color(): Color;
    set color(value: Color);
    /**
     * 透明度
     * @deprecated Use uniformOpacity, To be removed in version 0.3.0
     * @see https://github.com/microsoft/TypeScript/pull/37894
     */
    get opacity(): number;
    /**
     * 透明度
     */
    get uniformOpacity(): number;
    /**
     * 透明度
     * @param value
     * @deprecated Use uniformOpacity, To be removed in version 0.3.0
     * @see https://github.com/microsoft/TypeScript/pull/37894
     */
    set opacity(value: number);
    /**
     * 透明度
     * opacityは基底クラスのMaterialのコンストラクタ内で明示的に1.0が代入される。
     * この段階でuniformsはundefinedなので、そのままでは初期化できない。
     * このsetterでは受け取った値をprivate変数に保存して、初期化後にuniformsに再代入する。
     * @param value
     */
    set uniformOpacity(value: number);
    protected _opacity: number;
    get emissive(): Color;
    set emissive(value: Color);
    get map(): Texture;
    set map(val: Texture);
    protected onSetMap(val: Texture): void;
    get alphaMap(): Texture;
    set alphaMap(value: Texture);
    protected onSetAlphaMap(value: Texture): void;
    /**
     * 発光状態のために、マテリアルの設定をまとめて変更する。
     * {@link https://stackoverflow.com/questions/37647853/three-js-depthwrite-vs-depthtest-for-transparent-canvas-texture-map-on-three-p}
     */
    startGlow(): void;
}
//# sourceMappingURL=ShaderPhongMaterial.d.ts.map