import { MeshPhongNodeMaterial, MeshPhongMaterialParameters } from "three/webgpu";
export declare class ContourNodeMaterial extends MeshPhongNodeMaterial {
    readonly scaleY: import("three/webgpu").ShaderNodeObject<import("three/webgpu").UniformNode<number>>;
    readonly smoothMin: import("three/webgpu").ShaderNodeObject<import("three/webgpu").UniformNode<number>>;
    readonly smoothMax: import("three/webgpu").ShaderNodeObject<import("three/webgpu").UniformNode<number>>;
    constructor(param?: MeshPhongMaterialParameters);
}
//# sourceMappingURL=ContourNodeMaterial.d.ts.map