import { Color, ShaderMaterial, ShaderMaterialParameters } from "three";
export declare class ShaderLineMaterial extends ShaderMaterial {
    protected _opacity: number;
    constructor(vertexShader: string | null | undefined, fragmentShader: string | null | undefined, parameters?: ShaderMaterialParameters);
    get color(): Color;
    set color(value: Color);
    get uniformOpacity(): number;
    set uniformOpacity(value: number);
    get scale(): number;
    set scale(value: number);
    get dashSize(): number;
    set dashSize(value: number);
    get totalSize(): number;
    set totalSize(value: number);
}
//# sourceMappingURL=ShaderLineMaterial.d.ts.map