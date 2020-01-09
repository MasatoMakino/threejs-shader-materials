import { ShaderMaterialParameters } from "three";
import { WavyGridMaterial } from "../WavyGridMaterial";
/**
 * 六角形グリッドマテリアル
 */
export declare class HexGridMaterial extends WavyGridMaterial {
    /**
     * グリッド線の太さ
     * 0.0で線なし、0.5でグリッド面なしになる。
     */
    get gridWeight(): number;
    set gridWeight(value: number);
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initChunks(): void;
}
//# sourceMappingURL=HexGridMaterial.d.ts.map