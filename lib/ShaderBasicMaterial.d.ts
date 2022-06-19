import { Color, ShaderMaterial, ShaderMaterialParameters } from "three";
/**
 * MeshBasicMaterialに準じたShaderMaterial
 */
export declare class ShaderBasicMaterial extends ShaderMaterial {
    protected _opacity: number;
    constructor(vertexShader: string, fragmentShader: string, parameters?: ShaderMaterialParameters);
    /**
     * このMaterialに必要なuniformsを生成する。
     *
     * @see https://github.com/mrdoob/three.js/blob/0c26bb4bb8220126447c8373154ac045588441de/src/renderers/shaders/ShaderLib.js#L11
     */
    static getBasicUniforms(): any;
    get color(): Color;
    set color(value: Color);
    get uniformOpacity(): number;
    set uniformOpacity(value: number);
}
//# sourceMappingURL=ShaderBasicMaterial.d.ts.map