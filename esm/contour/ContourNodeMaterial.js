import { MeshPhongNodeMaterial, materialOpacity, positionWorld, cos, uniform, } from "three/examples/jsm/nodes/Nodes.js";
export class ContourNodeMaterial extends MeshPhongNodeMaterial {
    constructor() {
        super();
        this.scaleY = uniform(2.0);
        this.smoothMin = uniform(0.93);
        this.smoothMax = uniform(1.0);
        this.transparent = true;
        this.side = 2;
        this.opacityNode = materialOpacity.mul(cos(positionWorld.y.mul(this.scaleY)).smoothstep(this.smoothMin, this.smoothMax));
    }
}
