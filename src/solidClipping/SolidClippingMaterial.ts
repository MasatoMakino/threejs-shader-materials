/**
 * ライトに影響を受けない、ソリッドな切断面をもつマテリアル
 */

import { ShaderPhongMaterial } from "../index";
import { Vector3, UniformsUtils, Color, ShaderMaterialParameters } from "three";
import FragmentShader from "./SolidClippingMaterial.frag.glsl";
import { DoubleSide } from "three";

export class SolidClippingMaterial extends ShaderPhongMaterial {
  get cutSectionColor(): Vector3 {
    return this.uniforms.cutSectionColor.value;
  }
  set cutSectionColor(value: Vector3) {
    this.uniforms.cutSectionColor.value = value;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(null, FragmentShader(), parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      {
        cutSectionColor: { value: new Color(1.0, 1.0, 1.0) }
      }
    ]);
  }

  protected initDefaultSetting(parameters?: ShaderMaterialParameters): void {
    super.initDefaultSetting(parameters);
    this.clipping = true;
    this.side = DoubleSide;
  }
}
