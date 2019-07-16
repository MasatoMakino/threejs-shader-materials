import { ShaderMaterialParameters } from "three";
import { UniformsUtils } from "three";
import { Color } from "three";

import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import VertexShader from "../ShaderPhongMaterial.vert.glsl";
import FragmentShader from "./FBMDissolveMaterial.frag.glsl";

export class FBMDissolveMaterial extends ShaderPhongMaterial {
  get tiles(): number {
    return this.uniforms.tiles.value;
  }
  set tiles(value: number) {
    this.uniforms.tiles.value = value;
  }

  get progress(): number {
    return this.uniforms.progress.value;
  }
  set progress(value: number) {
    this.uniforms.progress.value = value;
  }

  get edgeWeight(): number {
    return this.uniforms.edgeWeight.value;
  }
  set edgeWeight(value: number) {
    this.uniforms.edgeWeight.value = value;
  }

  get edgeColor(): Color {
    return this.uniforms.edgeColor.value;
  }
  set edgeColor(value: Color) {
    this.uniforms.edgeColor.value = value;
  }

  get hashLoop(): number {
    return this.uniforms.hashLoop.value;
  }
  set hashLoop(value: number) {
    this.uniforms.hashLoop.value = value;
  }

  get amp(): number {
    return this.uniforms.amp.value;
  }
  set amp(value: number) {
    this.uniforms.amp.value = value;
  }
  /**
   *
   * @param parameters
   */
  constructor(parameters?: ShaderMaterialParameters) {
    super(VertexShader(), FragmentShader(), parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      {
        tiles: { value: 2.0 },
        progress: { value: 0.0 },

        edgeWeight: { value: 0.1 },
        edgeColor: { value: new Color(1.0, 1.0, 1.0) },

        hashLoop: { value: 8.0 },
        amp: { value: 0.5 }
      }
    ]);
  }

  protected initDefaultSetting(parameters?: ShaderMaterialParameters): void {
    super.initDefaultSetting(parameters);

    if (parameters.transparent == null) {
      this.transparent = true;
    } else {
      this.transparent = parameters.transparent;
    }
  }
}
