import { Texture, ShaderMaterialParameters } from "three";
import { ShaderPhongMaterial } from "./ShaderPhongMaterial";
import { IReversible } from "./chunk/ReversibleChunk";
import { IMaskable } from "./chunk/MaskMapChunk";
/**
 * グリッド状に分割されたマテリアル。
 */
export declare abstract class GridMaterial extends ShaderPhongMaterial implements IReversible, IMaskable {
    get division(): number;
    set division(value: number);
    get divisionScaleX(): number;
    set divisionScaleX(value: number);
    get isReversed(): boolean;
    set isReversed(value: boolean);
    get maskTexture(): Texture;
    set maskTexture(val: Texture);
    protected initChunks(): void;
    static getBasicUniforms(): any;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
}
//# sourceMappingURL=GridMaterial.d.ts.map