import { ShaderPhongMaterial, IAnimatable } from "../index";
import { Vector2, ShaderMaterialParameters } from "three";
import { Texture } from "three";
export declare class SwirlMaterial extends ShaderPhongMaterial implements IAnimatable {
    speed: number;
    addTime(delta: number): void;
    get isAnimate(): boolean;
    set isAnimate(value: boolean);
    set map(val: Texture);
    set alphaMap(value: Texture);
    /**
     * リピートモードは強制的にRepeatWrappingに
     * @param value
     */
    private setRepeat;
    get uvRotation(): number;
    set uvRotation(value: number);
    get swirlRotation(): number;
    set swirlRotation(value: number);
    get radius(): number;
    set radius(value: number);
    get center(): Vector2;
    set center(value: Vector2);
    constructor(parameters?: ShaderMaterialParameters);
    protected initChunks(): void;
    protected initUniforms(): void;
    private animationListener;
    protected startAnimation(): void;
    protected stopAnimation(): void;
}
//# sourceMappingURL=SwirlMaterial.d.ts.map