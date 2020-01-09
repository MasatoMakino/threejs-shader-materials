import { ShaderMaterialParameters } from "three";
import { Color } from "three";
import { ShaderSpriteMaterial } from "../ShaderSpriteMaterial";
export declare class SpriteCloudMaterial extends ShaderSpriteMaterial {
    constructor(parameters?: ShaderMaterialParameters);
    /**
     * uniformsを初期化する。
     */
    protected initUniforms(): void;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
    get rimCenter(): number;
    set rimCenter(value: number);
    get rimRange(): number;
    set rimRange(value: number);
    get rimStrength(): number;
    set rimStrength(value: number);
    get bottomStrength(): number;
    set bottomStrength(value: number);
    get rimColor(): Color;
    set rimColor(value: Color);
    get skyColor(): Color;
    set skyColor(value: Color);
}
//# sourceMappingURL=SpriteCloudMaterial.d.ts.map