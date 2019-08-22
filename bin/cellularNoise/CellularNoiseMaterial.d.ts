import { ShaderPhongMaterial, IAnimatable } from "../index";
import { ShaderMaterialParameters } from "three";
export declare class CellularNoiseMaterial extends ShaderPhongMaterial implements IAnimatable {
    speed: number;
    isAnimate: boolean;
    addTime(delta: number): void;
    grid: number;
    tiles: number;
    divisionScaleX: number;
    constructor(parameters?: ShaderMaterialParameters);
    protected initChunks(): void;
    protected initUniforms(): void;
}
//# sourceMappingURL=CellularNoiseMaterial.d.ts.map