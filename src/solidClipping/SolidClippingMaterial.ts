/**
 * ライトに影響を受けない、ソリッドな切断面をもつマテリアル
 */
import { ShaderPhongMaterial } from "../index.js";
import { fragment } from "./SolidClippingMaterial.glsl.js";
import {
  Color,
  DoubleSide,
  ShaderMaterialParameters,
  UniformsUtils,
  Vector3,
} from "three";

export class SolidClippingMaterial extends ShaderPhongMaterial {
  get cutSectionColor(): Color {
    return this.uniforms.cutSectionColor.value;
  }
  set cutSectionColor(value: Color) {
    this.uniforms.cutSectionColor.value = value;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(null, fragment, parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      {
        cutSectionColor: { value: new Color(1.0, 1.0, 1.0) },
      },
    ]);
  }

  protected initDefaultSetting(parameters?: ShaderMaterialParameters): void {
    super.initDefaultSetting(parameters);
    this.clipping = true;
    this.side = DoubleSide;
  }
}
