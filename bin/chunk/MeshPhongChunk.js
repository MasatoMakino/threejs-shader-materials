import { GLSLChunk } from "./GLSLChunk";
/**
 * MeshPhongMaterialと同等の機能を備えたShaderMaterialを実装するために必要なGLSLコードを格納したクラス。
 */
export class MeshPhongChunk extends GLSLChunk {
    static registerChunk() {
        MeshPhongUniformChunk.registerChunk();
        MeshPhongDiffuseColorChunk.registerChunk();
        MeshPhongSwitchingAlphaMapChunk.registerChunk();
        MeshPositionVaryingChunk.registerChunk();
        MeshPositionVertexChunk.registerChunk();
    }
    static getDefines() {
        return {
            USE_MESH_POSITION: false
        };
    }
}
class MeshPhongUniformChunk extends GLSLChunk {
    static getChunkName() {
        return "mesh_phong_uniform";
    }
    static getChunk() {
        return `
      uniform vec3 diffuse;
      uniform vec3 emissive;
      uniform vec3 specular;
      uniform float shininess;
      uniform float opacity;
      uniform bool hasAlphaMap;
      uniform sampler2D alphaMap;
    `;
    }
}
class MeshPhongDiffuseColorChunk extends GLSLChunk {
    static getChunkName() {
        return "mesh_phong_diffuse_color";
    }
    static getChunk() {
        return `
      vec4 diffuseColor = vec4( diffuse, opacity );
      ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
      vec3 totalEmissiveRadiance = emissive;
    `;
    }
}
class MeshPhongSwitchingAlphaMapChunk extends GLSLChunk {
    static getChunkName() {
        return "mesh_phong_switching_alpha_map";
    }
    static getChunk() {
        return `
      if( hasAlphaMap ){
        diffuseColor.a *= texture2D( alphaMap, mapUV ).g;
      }
    `;
    }
}
class MeshPositionVaryingChunk extends GLSLChunk {
    static getChunkName() {
        return "mesh_position_varying";
    }
    static getChunk() {
        return `
    #ifdef USE_MESH_POSITION
    varying vec3 meshPosition;
    #endif
    `;
    }
}
class MeshPositionVertexChunk extends GLSLChunk {
    static getChunkName() {
        return "mesh_position_vertex";
    }
    static getChunk() {
        return `
    #ifdef USE_MESH_POSITION
    meshPosition = position;
    #endif
    `;
    }
}
