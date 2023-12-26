import { GLSLChunk } from "./GLSLChunk";
import { IUniform, Texture, UniformsUtils } from "three";

/**
 * Maskテクスチャを設定可能なマテリアル用のインターフェース
 * - maskTexture変数
 *
 * にアクセス可能なことを保証する。
 */
export interface IMap {
  uniforms: { [uniform: string]: IUniform };
  map: Texture;
}

/**
 * マスクテクスチャを利用するShaderMaterial用Chunk。
 * マスクテクスチャがどのように描画に反映されるかは、各Materialのシェーダー実装による。
 */
export class MapChunk extends GLSLChunk {
  public static registerChunk(): void {
    super.registerChunk();
    MapUniformChunk.registerChunk();
    MapFragmentChunk.registerChunk();
    MapFragmentBeginChunk.registerChunk();
  }

  public static getUniform(): any {
    return UniformsUtils.merge([
      super.getUniform(),
      {
        hasMap: { value: false },
        map: { value: null },
      },
    ]);
  }

  public static getMap(_self: IMap): Texture {
    return _self.uniforms.map.value;
  }
  public static setMap(_self: IMap, val: Texture): void {
    _self.uniforms.map.value = val;
    _self.uniforms.hasMap.value = val != null;
  }
}

class MapUniformChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "map_uniform_chunk";
  }

  protected static getChunk(): string {
    return /* GLSL */ `
      uniform bool hasMap;
      uniform sampler2D map;
    `;
  }
}

class MapFragmentChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "map_fragment_chunk";
  }

  protected static getChunk(): string {
    return /* GLSL */ `
      if( hasMap ){
        vec4 texelColor = texture2D( map, mapUV );
        diffuseColor *= texelColor;
      }
    `;
  }
}

class MapFragmentBeginChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "__ShaderMaterial__map_fragment_begin_chunk";
  }

  protected static getChunk(): string {
    return /* GLSL */ `
      vec2 mapUV = uvPosition;
    `;
  }
}
