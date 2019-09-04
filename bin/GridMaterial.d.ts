import { Texture, ShaderMaterialParameters } from "three";
import { ShaderPhongMaterial } from "./ShaderPhongMaterial";
import { IReversible } from "./chunk/ReversibleChunk";
import { IMaskable } from "./chunk/MaskMapChunk";
/**
 * グリッド状に分割されたマテリアル。
 */
export declare class GridMaterial extends ShaderPhongMaterial implements IReversible, IMaskable {
    division: number;
    divisionScaleX: number;
    isReversed: boolean;
    maskTexture: Texture;
    protected initChunks(): void;
    static getBasicUniforms(): any;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
}
//# sourceMappingURL=GridMaterial.d.ts.map