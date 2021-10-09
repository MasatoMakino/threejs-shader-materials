"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapChunk = void 0;
const three_1 = require("three");
const GLSLChunk_1 = require("./GLSLChunk");
/**
 * マスクテクスチャを利用するShaderMaterial用Chunk。
 * マスクテクスチャがどのように描画に反映されるかは、各Materialのシェーダー実装による。
 */
class MapChunk extends GLSLChunk_1.GLSLChunk {
    static registerChunk() {
        super.registerChunk();
        MapUniformChunk.registerChunk();
        MapFragmentChunk.registerChunk();
        MapFragmentBeginChunk.registerChunk();
    }
    static getUniform() {
        return three_1.UniformsUtils.merge([
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
exports.MapChunk = MapChunk;
class MapUniformChunk extends GLSLChunk_1.GLSLChunk {
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
class MapFragmentChunk extends GLSLChunk_1.GLSLChunk {
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
class MapFragmentBeginChunk extends GLSLChunk_1.GLSLChunk {
    static getChunkName() {
        return "__ShaderMaterial__map_fragment_begin_chunk";
    }
    static getChunk() {
        return `
      vec2 mapUV = uvPosition;
    `;
    }
}
