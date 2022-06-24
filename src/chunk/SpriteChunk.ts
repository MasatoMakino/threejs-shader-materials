import { GLSLChunk } from "./GLSLChunk";
import { UniformsLib, UniformsUtils } from "three";

/**
 * SpriteMaterialと同等の機能を備えたShaderMaterialを実装するために必要なGLSLコードを格納したクラス。
 */
export class SpriteChunk extends GLSLChunk {
  public static registerChunk(): void {
    SpriteVertexUniformChunk.registerChunk();
    SpriteFragmentUniformChunk.registerChunk();
    SpriteDiffuseColorChunk.registerChunk();
    SpriteMVPositionChunk.registerChunk();
  }

  public static getDefines(): Object {
    return {
      USE_SIZEATTENUATION: true,
    };
  }

  public static getUniform(): any {
    //TODO : PR, UniformsLib.sprite in UniformsLib.d.ts
    return UniformsUtils.merge([
      (UniformsLib as any).sprite,
      UniformsLib.fog,
      UniformsLib.lights,
    ]);
  }
}

class SpriteVertexUniformChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "sprite_vertex_uniform_chunk";
  }

  protected static getChunk(): string {
    return `
      uniform float rotation;
      uniform vec2 center;
    `;
  }
}

class SpriteFragmentUniformChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "sprite_fragment_uniform_chunk";
  }

  protected static getChunk(): string {
    return `
      uniform vec3 diffuse;
      uniform float opacity;
    `;
  }
}

class SpriteDiffuseColorChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "sprite_diffuse_color_chunk";
  }

  protected static getChunk(): string {
    return `
      vec3 outgoingLight = vec3( 0.0 );
      vec4 diffuseColor = vec4( diffuse, opacity );
    `;
  }
}

class SpriteMVPositionChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "sprite_mv_position_chunk";
  }

  protected static getChunk(): string {
    return `
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
