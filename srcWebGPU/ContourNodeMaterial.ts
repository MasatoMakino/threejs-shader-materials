import {
  materialOpacity,
  positionWorld,
  cos,
  uniform,
  MeshPhongNodeMaterial,
  MeshPhongMaterialParameters,
} from "three/webgpu";

export class ContourNodeMaterial extends MeshPhongNodeMaterial {
  readonly scaleY = uniform(2.0);
  readonly smoothMin = uniform(0.93);
  readonly smoothMax = uniform(1.0);
  constructor(param?: MeshPhongMaterialParameters) {
    super(param);

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
