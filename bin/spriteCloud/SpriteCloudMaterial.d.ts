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
    rimCenter: number;
    rimRange: number;
    rimStrength: number;
    bottomStrength: number;
    rimColor: Color;
    skyColor: Color;
}
//# sourceMappingURL=SpriteCloudMaterial.d.ts.map