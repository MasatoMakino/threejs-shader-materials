import { ShaderBasicMaterial } from "../index.js";
import { fragment } from "./RimBasicMaterial.glsl.js";
import { Color, ShaderMaterialParameters, UniformsUtils } from "three";

export class RimBasicMaterial extends ShaderBasicMaterial {
  get rimPow(): number {
    return this.uniforms.rimPow.value;
  }
  set rimPow(value: number) {
    this.uniforms.rimPow.value = value;
  }

  get rimStrength(): number {
    return this.uniforms.rimStrength.value;
  }
  set rimStrength(value: number) {
    this.uniforms.rimStrength.value = value;
  }
  get rimColor(): Color {
    return this.uniforms.rimColor.value;
  }
  set rimColor(value: Color) {
    this.uniforms.rimColor.value = value;
  }

  get insidePow(): number {
    return this.uniforms.insidePow.value;
  }
  set insidePow(value: number) {
    this.uniforms.insidePow.value = value;
  }

  get insideStrength(): number {
    return this.uniforms.insideStrength.value;
  }
  set insideStrength(value: number) {
    this.uniforms.insideStrength.value = value;
  }

  get insideColor(): Color {
    return this.uniforms.insideColor.value;
  }
  set insideColor(value: Color) {
    this.uniforms.insideColor.value = value;
  }

  constructor(param: ShaderMaterialParameters) {
    super(null, fragment, param);

    this.uniforms = UniformsUtils.merge([
      ShaderBasicMaterial.getBasicUniforms(),
      RimBasicMaterial.getRimUniforms(),
    ]);
    this.initDefines();
  }

  public static getRimUniforms() {
    return UniformsUtils.merge([
      {
        rimColor: { value: new Color(1.0, 1.0, 1.0) },
        rimStrength: { value: 1.0 },
        rimPow: { value: 1.0 },
        insideColor: { value: new Color(0.0, 0.0, 0.0) },
        insideStrength: { value: 1.0 },
        insidePow: { value: 1.0 },
      },
    ]);
  }

  public initDefines(): void {
    super.initDefines();
    this.defines.USE_SURFACE_NORMAL = true;
  }
}
