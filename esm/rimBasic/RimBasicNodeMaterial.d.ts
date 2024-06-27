import { Color } from "three";
import { MeshBasicNodeMaterial } from "three/examples/jsm/nodes/Nodes.js";
export declare class RimBasicNodeMaterial extends MeshBasicNodeMaterial {
    readonly rimColor: import("three/examples/jsm/nodes/Nodes.js").ShaderNodeObject<import("three/examples/jsm/nodes/Nodes.js").UniformNode<Color>>;
    readonly rimStrength: import("three/examples/jsm/nodes/Nodes.js").ShaderNodeObject<import("three/examples/jsm/nodes/Nodes.js").UniformNode<number>>;
    readonly rimPow: import("three/examples/jsm/nodes/Nodes.js").ShaderNodeObject<import("three/examples/jsm/nodes/Nodes.js").UniformNode<number>>;
    readonly insideColor: import("three/examples/jsm/nodes/Nodes.js").ShaderNodeObject<import("three/examples/jsm/nodes/Nodes.js").UniformNode<Color>>;
    readonly insideStrength: import("three/examples/jsm/nodes/Nodes.js").ShaderNodeObject<import("three/examples/jsm/nodes/Nodes.js").UniformNode<number>>;
    readonly insidePow: import("three/examples/jsm/nodes/Nodes.js").ShaderNodeObject<import("three/examples/jsm/nodes/Nodes.js").UniformNode<number>>;
    constructor();
}
//# sourceMappingURL=RimBasicNodeMaterial.d.ts.map