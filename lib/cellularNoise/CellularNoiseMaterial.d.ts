import { IAnimatable, ShaderPhongMaterial } from "../";
import { ShaderMaterialParameters } from "three";
export declare class CellularNoiseMaterial extends ShaderPhongMaterial implements IAnimatable {
    speed: number;
    addTime(delta: number): void;
    get isAnimate(): boolean;
    set isAnimate(value: boolean);
    get grid(): number;
    set grid(value: number);
    get divisionScaleX(): number;
    set divisionScaleX(value: number);
    constructor(parameters?: ShaderMaterialParameters);
    protected initChunks(): void;
    protected initUniforms(): void;
    private animationListener;
    protected startAnimation(): void;
    protected stopAnimation(): void;
}
//# sourceMappingURL=CellularNoiseMaterial.d.ts.map