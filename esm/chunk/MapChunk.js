import { UniformsUtils } from "three";
import { GLSLChunk } from "./GLSLChunk";
/**
 * マスクテクスチャを利用するShaderMaterial用Chunk。
 * マスクテクスチャがどのように描画に反映されるかは、各Materialのシェーダー実装による。
 */
export class MapChunk extends GLSLChunk {
    static registerChunk() {
        super.registerChunk();
        MapUniformChunk.registerChunk();
        MapFragmentChunk.registerChunk();
        MapFragmentBeginChunk.registerChunk();
    }
    static getUniform() {
        return UniformsUtils.merge([
            super.getUniform(),
            {
                hasMap: { value: false },
                map: { value: null },
            },
        ]);
    }
    static getMap(_self) {
        return _self.uniforms.map.value;
    }
    static setMap(_self, val) {
        _self.uniforms.map.value = val;
        _self.uniforms.hasMap.value = val != null;
    }
}
class MapUniformChunk extends GLSLChunk {
    static getChunkName() {
        return "map_uniform_chunk";
    }
    static getChunk() {
        return `
      uniform bool hasMap;
      uniform sampler2D map;
    `;
    }
}
class MapFragmentChunk extends GLSLChunk {
    static getChunkName() {
        return "map_fragment_chunk";
    }
    static getChunk() {
        return `
      if( hasMap ){
        vec4 texelColor = texture2D( map, mapUV );
        diffuseColor *= texelColor;
      }
    `;
    }
}
class MapFragmentBeginChunk extends GLSLChunk {
    static getChunkName() {
        return "__ShaderMaterial__map_fragment_begin_chunk";
    }
    static getChunk() {
        return `
      vec2 mapUV = uvPosition;
    `;
    }
}
