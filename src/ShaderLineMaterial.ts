import {
  Color,
  ShaderChunk,
  ShaderMaterial,
  ShaderMaterialParameters,
  UniformsLib,
  UniformsUtils,
} from "three";

export class ShaderLineMaterial extends ShaderMaterial {
  protected _opacity: number = 1.0;

  constructor(
    vertexShader: string | null | undefined,
    fragmentShader: string | null | undefined,
    parameters?: ShaderMaterialParameters,
  ) {
    super(parameters);

    this.vertexShader = vertexShader ?? ShaderChunk.linedashed_vert;
    this.fragmentShader = fragmentShader ?? ShaderChunk.linedashed_frag;

    this.uniforms = UniformsUtils.merge([
      UniformsLib.common,
      UniformsLib.lightmap,
      UniformsLib.fog,
      {
        scale: { value: 1.0 },
        dashSize: { value: 1.0 },
        totalSize: { value: 1.0 },
      },
    ]);
  }

  get color(): Color {
    return this.uniforms.diffuse.value;
  }
  set color(value: Color) {
    this.uniforms.diffuse.value = value;
  }

  get uniformOpacity(): number {
    return this._opacity;
  }

  set uniformOpacity(value: number) {
    this._opacity = value;
    if (this.uniforms?.opacity) {
      this.uniforms.opacity.value = value;
    }
  }

  get scale(): number {
    return this.uniforms.scale.value;
  }
  set scale(value: number) {
    this.uniforms.scale.value = value;
  }

  get dashSize(): number {
    return this.uniforms.dashSize.value;
  }
  set dashSize(value: number) {
    this.uniforms.dashSize.value = value;
  }

  get totalSize(): number {
    return this.uniforms.totalSize.value;
  }
  set totalSize(value: number) {
    this.uniforms.totalSize.value = value;
  }
}
