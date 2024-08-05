import {
  materialOpacity,
  positionWorld,
  cos,
  uniform,
  MeshBasicNodeMaterial,
} from "three/src/nodes/Nodes.js";

export class ContourNodeMaterial extends MeshBasicNodeMaterial {
  readonly scaleY = uniform(2.0);
  readonly smoothMin = uniform(0.93);
  readonly smoothMax = uniform(1.0);
  constructor() {
    super();

    this.transparent = true;
    this.side = 2;
    this.depthTest = false;

    this.opacityNode = materialOpacity.mul(
      cos(positionWorld.y.mul(this.scaleY)).smoothstep(
        this.smoothMin,
        this.smoothMax,
      ),
    );
  }
}
