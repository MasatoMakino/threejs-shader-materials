import { Color } from "three";
import {
  MeshBasicNodeMaterial,
  materialColor,
  uniform,
} from "three/examples/jsm/nodes/Nodes.js";
import { rimEffect } from "../tsl/RimFunction.js";

export class RimBasicNodeMaterial extends MeshBasicNodeMaterial {
  readonly rimColor = uniform(new Color(1, 1, 1));
  readonly rimStrength = uniform(1.0);
  readonly rimPow = uniform(1.0);
  readonly insideColor = uniform(new Color(0.0, 0.0, 0.0));
  readonly insideStrength = uniform(1.0);
  readonly insidePow = uniform(1.0);

  constructor() {
    super();

    this.colorNode = materialColor.add(
      rimEffect(
        this.rimColor,
        this.rimPow,
        this.rimStrength,
        this.insideColor,
        this.insideStrength,
        this.insidePow,
      ),
    );
  }
}
