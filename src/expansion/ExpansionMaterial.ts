import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ShaderMaterialParameters } from "three";
import { IExpandable } from "../chunk/ExpansionChunk";

export class ExpansionMaterial extends ShaderPhongMaterial
  implements IExpandable {
  get expansionStrength(): number {
    return this.uniforms.expansionStrength.value;
  }
  set expansionStrength(value: number) {
    this.uniforms.expansionStrength.value = value;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(null, null, parameters);
  }

  protected initDefines(): void {
    super.initDefines();
    this.defines.USE_EXPANSION = true;
  }
}
