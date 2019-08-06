import { ShaderMaterial, ShaderMaterialParameters, Color, Vector2, Matrix3, Texture } from "three";
export declare class ShaderSpriteMaterial extends ShaderMaterial {
    /**
     * コンストラクタ。
     * @param vertexShader
     * @param fragmentShader
     * @param parameters
     */
    constructor(vertexShader: string, fragmentShader: string, parameters?: ShaderMaterialParameters);
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
     * 透明度
     */
    /**
    * opacityは基底クラスのMaterialのコンストラクタ内で明示的に1.0が代入される。
    * この段階でuniformsはundefinedなので、そのままでは初期化できない。
    * このsetterでは受け取った値をprivate変数に保存して、初期化後にuniformsに再代入する。
    * @param value
    */
    opacity: number;
    protected _opacity: number;
    /**
     * Spriteマテリアルと互換性を持つために、colorプロパティはdiffuseへ代入される。
     */
    color: Color;
    center: Vector2;
    rotation: number;
    uvTransform: Matrix3;
    map: Texture;
}
//# sourceMappingURL=ShaderSpriteMaterial.d.ts.map