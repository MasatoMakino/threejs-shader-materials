import { Color } from "three";
import { MeshBasicNodeMaterial } from "three/webgpu";
export declare class RimBasicNodeMaterial extends MeshBasicNodeMaterial {
    readonly rimColor: import("three/webgpu").ShaderNodeObject<import("three/webgpu").UniformNode<Color>>;
    readonly rimStrength: import("three/webgpu").ShaderNodeObject<import("three/webgpu").UniformNode<number>>;
    readonly rimPow: import("three/webgpu").ShaderNodeObject<import("three/webgpu").UniformNode<number>>;
    readonly insideColor: import("three/webgpu").ShaderNodeObject<import("three/webgpu").UniformNode<Color>>;
    readonly insideStrength: import("three/webgpu").ShaderNodeObject<import("three/webgpu").UniformNode<number>>;
    readonly insidePow: import("three/webgpu").ShaderNodeObject<import("three/webgpu").UniformNode<number>>;
    constructor();
}
//# sourceMappingURL=RimBasicNodeMaterial.d.ts.map