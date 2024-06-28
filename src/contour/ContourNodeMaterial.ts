import {
  MeshPhongNodeMaterial,
  materialOpacity,
  positionWorld,
  sin,
  uniform,
} from "three/examples/jsm/nodes/Nodes.js";

export class ContourNodeMaterial extends MeshPhongNodeMaterial {
  readonly scaleY = uniform(2.0);
  readonly smoothMin = uniform(0.93);
  readonly smoothMax = uniform(1.0);
  constructor() {
    super();

    this.transparent = true;
    this.side = 2;
    this.opacityNode = materialOpacity.mul(
      sin(positionWorld.y.mul(this.scaleY)).smoothstep(
        this.smoothMin,
        this.smoothMax,
      ),
    );
  }
}
