import { materialOpacity, positionWorld, cos, uniform, MeshPhongNodeMaterial, } from "three/webgpu";
export class ContourNodeMaterial extends MeshPhongNodeMaterial {
    constructor(param) {
        super(param);
        this.scaleY = uniform(2.0);
        this.smoothMin = uniform(0.93);
        this.smoothMax = uniform(1.0);
        this.transparent = true;
        this.side = 2;
        this.depthTest = false;
        this.opacityNode = materialOpacity.mul(cos(positionWorld.y.mul(this.scaleY)).smoothstep(this.smoothMin, this.smoothMax));
    }
}
