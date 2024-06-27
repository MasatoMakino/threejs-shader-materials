import { Color } from "three";
import { MeshBasicNodeMaterial, materialColor, uniform, } from "three/examples/jsm/nodes/Nodes.js";
import { rimEffect } from "../tsl/RimFunction.js";
export class RimBasicNodeMaterial extends MeshBasicNodeMaterial {
    constructor() {
        super();
        this.rimColor = uniform(new Color(1, 1, 1));
        this.rimStrength = uniform(1.0);
        this.rimPow = uniform(1.0);
        this.insideColor = uniform(new Color(0.0, 0.0, 0.0));
        this.insideStrength = uniform(1.0);
        this.insidePow = uniform(1.0);
        this.colorNode = materialColor.add(rimEffect(this.rimColor, this.rimPow, this.rimStrength, this.insideColor, this.insidePow, this.insideStrength));
    }
}
