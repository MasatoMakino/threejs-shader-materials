import { ShaderPhongMaterial, IAnimatable } from "../index";
import { ShaderMaterialParameters } from "three";
export declare class CellularNoiseMaterial extends ShaderPhongMaterial implements IAnimatable {
    speed: number;
    addTime(delta: number): void;
    isAnimate: boolean;
    grid: number;
    divisionScaleX: number;
    constructor(parameters?: ShaderMaterialParameters);
    protected initChunks(): void;
    protected initUniforms(): void;
    private animationListener;
    protected startAnimation(): void;
    protected stopAnimation(): void;
}
//# sourceMappingURL=CellularNoiseMaterial.d.ts.map