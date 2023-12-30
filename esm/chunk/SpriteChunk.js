import { GLSLChunk } from "./GLSLChunk.js";
import { UniformsLib, UniformsUtils } from "three";
/**
 * SpriteMaterialと同等の機能を備えたShaderMaterialを実装するために必要なGLSLコードを格納したクラス。
 */
export class SpriteChunk extends GLSLChunk {
    static registerChunk() {
        SpriteVertexUniformChunk.registerChunk();
        SpriteFragmentUniformChunk.registerChunk();
        SpriteDiffuseColorChunk.registerChunk();
        SpriteMVPositionChunk.registerChunk();
    }
    static getDefines() {
        return {
            USE_SIZEATTENUATION: true,
        };
    }
    static getUniform() {
        //TODO : PR, UniformsLib.sprite in UniformsLib.d.ts
        return UniformsUtils.merge([
            UniformsLib.sprite,
            UniformsLib.fog,
            UniformsLib.lights,
        ]);
    }
}
class SpriteVertexUniformChunk extends GLSLChunk {
    static getChunkName() {
        return "sprite_vertex_uniform_chunk";
    }
    static getChunk() {
        return /* GLSL */ `
      uniform float rotation;
      uniform vec2 center;
    `;
    }
}
class SpriteFragmentUniformChunk extends GLSLChunk {
    static getChunkName() {
        return "sprite_fragment_uniform_chunk";
    }
    static getChunk() {
        return /* GLSL */ `
      uniform vec3 diffuse;
      uniform float opacity;
    `;
    }
}
class SpriteDiffuseColorChunk extends GLSLChunk {
    static getChunkName() {
        return "sprite_diffuse_color_chunk";
    }
    static getChunk() {
        return /* GLSL */ `
      vec3 outgoingLight = vec3( 0.0 );
      vec4 diffuseColor = vec4( diffuse, opacity );
    `;
    }
}
class SpriteMVPositionChunk extends GLSLChunk {
    static getChunkName() {
        return "sprite_mv_position_chunk";
    }
    static getChunk() {
        return /* GLSL */ `
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

	#ifndef USE_SIZEATTENUATION
		bool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
    `;
    }
}
