import { ShaderMaterialParameters } from "three";
import { WavyGridMaterial } from "../WavyGridMaterial";
/**
 * 十字線を正方形グリッドの中心に描画するマテリアル。
 */
export declare class CrossGridMaterial extends WavyGridMaterial {
    /**
     * グリッド線の太さ
     * 0.0で線なし、0.5でグリッド面なしになる。
     */
    get gridWeight(): number;
    set gridWeight(value: number);
    get radius(): number;
    set radius(value: number);
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
}
//# sourceMappingURL=CrossGridMaterial.d.ts.map