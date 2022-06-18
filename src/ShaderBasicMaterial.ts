import {
  ShaderMaterial,
  ShaderMaterialParameters,
  UniformsLib,
  UniformsUtils,
} from "three";
import FragmentShader from "./ShaderBasicMaterial.frag.glsl";
import VertexShader from "./ShaderBasicMaterial.vert.glsl";

/**
 * MeshBasicMaterialに準じたShaderMaterial
 */
export class ShaderBasicMaterial extends ShaderMaterial {
  constructor(
    vertexShader: string,
    fragmentShader: string,
    parameters?: ShaderMaterialParameters
  ) {
    super(parameters);

    parameters ??= {};

    this.uniforms = ShaderBasicMaterial.getBasicUniforms();
    this.vertexShader = vertexShader ?? VertexShader();
    this.fragmentShader = fragmentShader ?? FragmentShader();
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
}
