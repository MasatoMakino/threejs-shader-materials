import { WavyGridMaterial } from "../WavyGridMaterial";
import { ShaderMaterialParameters } from "three";
/**
 * 四角形グリッドマテリアル
 */
export declare class SquareGridMaterial extends WavyGridMaterial {
    /**
     * グリッド線の太さ
     * 0.0で線なし、0.5でグリッド面なしになる。
     */
    get gridWeight(): number;
    set gridWeight(value: number);
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
}
//# sourceMappingURL=SquareGridMaterial.d.ts.map