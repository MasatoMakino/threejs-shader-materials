import { vertex, fragment } from "./ShaderBasicMaterial.glsl.js";
import { SurfaceNormalChunk } from "./chunk/index.js";
import {
  Color,
  ShaderMaterial,
  ShaderMaterialParameters,
  UniformsLib,
  UniformsUtils,
} from "three";

/**
 * MeshBasicMaterialに準じたShaderMaterial
 */
export class ShaderBasicMaterial extends ShaderMaterial {
  protected _opacity: number = 1.0;

  /**
   * @param vertexShader
   * @param fragmentShader
   * @param parameters
   */
  constructor(
    vertexShader: string | undefined | null,
    fragmentShader: string | undefined | null,
    parameters?: ShaderMaterialParameters,
  ) {
    super(parameters);

    this.uniforms = ShaderBasicMaterial.getBasicUniforms();
    this.vertexShader = vertexShader ?? vertex;
    this.fragmentShader = fragmentShader ?? fragment;
    SurfaceNormalChunk.registerChunk();
    this.initDefines();
    this.uniformOpacity = this._opacity;
  }

  /**
   * このMaterialに必要なuniformsを生成する。
   *
   * @see https://github.com/mrdoob/three.js/blob/0c26bb4bb8220126447c8373154ac045588441de/src/renderers/shaders/ShaderLib.js#L11
   */
  public static getBasicUniforms(): any {
    return UniformsUtils.merge([
      UniformsLib.common,
      UniformsLib.specularmap,
      UniformsLib.envmap,
      UniformsLib.aomap,
      UniformsLib.lightmap,
      UniformsLib.fog,
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

  public initDefines(): void {
    this.defines = Object.assign(
      {},
      SurfaceNormalChunk.getDefines(),
      this.defines,
    );
  }
}
