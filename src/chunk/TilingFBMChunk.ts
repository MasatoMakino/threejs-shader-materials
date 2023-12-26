import { GLSLChunk } from "./GLSLChunk";

export interface ITiledFBM {
  tiles: number;
  hashLoop: number;
  amp: number;
}

export class TilingFBMChunk extends GLSLChunk {
  public static registerChunk(): void {
    TilingFBMFunctionChunk.registerChunk();
    TilingFBMUniformChunk.registerChunk();
  }

  public static getUniform(): any {
    return {
      tiles: { value: 2.0 },
      hashLoop: { value: 8.0 },
      amp: { value: 0.5 },
    };
  }
  public static getDefines(): Object {
    return {
      NUM_OCTAVES: 3.0,
    };
  }
}

class TilingFBMFunctionChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "tiling_fbm_function_chunk";
  }

  protected static getChunk(): string {
    //language=GLSL
    return /* GLSL */ `
        // Based On Dave_Hoskins 
        // https://www.shadertoy.com/view/4dlGW2
        
        float hash(in vec2 p, in float hashLoop)
        {
            p = mod(p, hashLoop);
            return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));
        }
        
        float noise(in vec2 p, in float hashLoop)
        {
            p *= hashLoop;
            vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
        
            p = floor(p);
            float a = hash(p, hashLoop);
            float b = hash(p + vec2(1.0, 0.0), hashLoop);
            float c = hash(p + vec2(0.0, 1.0), hashLoop);
            float d = hash(p + vec2(1.0, 1.0), hashLoop);
        
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        
        // Based On Dave_Hoskins 
        // https://www.shadertoy.com/view/4dlGW2
        
        float fbm(in vec2 p)
        {
            float v = 0.0;
            
            p = mod(p, hashLoop);
            float a = amp;
            float hashLoopVal = hashLoop;
            
            for (int i = 0; i < NUM_OCTAVES; i++){
                v += noise(p, hashLoopVal) * a;
                a *= .5;
                hashLoopVal *= 2.0;
            }
            return v;
        }
    `;
  }
}

class TilingFBMUniformChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "tiling_fbm_uniform_chunk";
  }

  protected static getChunk(): string {
    //language=GLSL
    return /* GLSL */ `
      uniform float tiles;  
      uniform float hashLoop;
      uniform float amp;
    `;
  }
}
