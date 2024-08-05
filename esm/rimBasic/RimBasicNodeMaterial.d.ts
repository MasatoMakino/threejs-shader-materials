import { Color } from "three";
import { MeshBasicNodeMaterial } from "three/src/nodes/Nodes.js";
export declare class RimBasicNodeMaterial extends MeshBasicNodeMaterial {
    readonly rimColor: import("three/src/nodes/Nodes.js").ShaderNodeObject<import("three/src/nodes/Nodes.js").UniformNode<Color>>;
    readonly rimStrength: import("three/src/nodes/Nodes.js").ShaderNodeObject<import("three/src/nodes/Nodes.js").UniformNode<number>>;
    readonly rimPow: import("three/src/nodes/Nodes.js").ShaderNodeObject<import("three/src/nodes/Nodes.js").UniformNode<number>>;
    readonly insideColor: import("three/src/nodes/Nodes.js").ShaderNodeObject<import("three/src/nodes/Nodes.js").UniformNode<Color>>;
    readonly insideStrength: import("three/src/nodes/Nodes.js").ShaderNodeObject<import("three/src/nodes/Nodes.js").UniformNode<number>>;
    readonly insidePow: import("three/src/nodes/Nodes.js").ShaderNodeObject<import("three/src/nodes/Nodes.js").UniformNode<number>>;
    constructor();
}
//# sourceMappingURL=RimBasicNodeMaterial.d.ts.map