import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ShaderMaterialParameters, UniformsUtils } from "three";

import VertexShader from "./ExpansionMaterial.vert.glsl";

export class ExpansionMaterial extends ShaderPhongMaterial {
  get amp(): number {
    return this.uniforms.amp.value;
  }
  set amp(value: number) {
    this.uniforms.amp.value = value;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(VertexShader(), null, parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      {
        amp: { value: 0.0 }
      }
    ]);
  }
}
