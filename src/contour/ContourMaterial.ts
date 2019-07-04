/**
 * テクスチャを等高線状にマップするマテリアル。
 * マッピング以外の昨日はMeshPhongMaterialに準じる。
 */

import {
  UniformsUtils,
  ShaderMaterialParameters,
  Texture,
  TextureLoader,
  DoubleSide,
  Geometry,
  BufferGeometry
} from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";

import FragmentShader from "./ContourMaterial.frag.glsl";
import VertexShader from "../ShaderPhongMaterial.vert.glsl";

export class ContourMaterial extends ShaderPhongMaterial {
  get map(): Texture {
    return this._map;
  }
  public loadMap(url: string, geo: Geometry | BufferGeometry) {
    this._map = new TextureLoader().load(url, texture => {
      if (this.uniforms && this.uniforms.map) {
        this.uniforms.map.value = texture;
      }
    });

    geo.computeBoundingBox();
    this.uniforms.top.value = geo.boundingBox.max.y;
    this.uniforms.bottom.value = geo.boundingBox.min.y;
  }
  private _map: Texture;

  constructor(parameters?: ShaderMaterialParameters) {
    super(VertexShader(), FragmentShader(), parameters);
  }

  protected initDefines(): void {
    super.initDefines();
    this.defines.USE_MESH_POSITION = true;
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      {
        top: { value: 1.0 },
        bottom: { value: -1.0 }
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

    if (this.transparent && parameters.alphaTest == null) {
      this.alphaTest = 0.5;
    }

    if (parameters.side == null) {
      this.side = DoubleSide;
    } else {
      this.side = parameters.side;
    }
  }
}
