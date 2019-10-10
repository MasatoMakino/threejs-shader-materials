import { ShaderPhongMaterial, IAnimatable } from "../index";
import { Vector2, ShaderMaterialParameters } from "three";
import { Texture } from "three";
export declare class SwirlMaterial extends ShaderPhongMaterial implements IAnimatable {
    speed: number;
    addTime(delta: number): void;
    isAnimate: boolean;
    map: Texture;
    alphaMap: Texture;
    /**
     * リピートモードは強制的にRepeatWrappingに
     * @param value
     */
    private setRepeat;
    uvRotation: number;
    swirlRotation: number;
    radius: number;
    center: Vector2;
    constructor(parameters?: ShaderMaterialParameters);
    protected initChunks(): void;
    protected initUniforms(): void;
    private animationListener;
    protected startAnimation(): void;
    protected stopAnimation(): void;
}
//# sourceMappingURL=SwirlMaterial.d.ts.map