import { GLSLChunk } from "./GLSLChunk";
export class TilingFBMChunk extends GLSLChunk {
    static registerChunk() {
        TilingFBMFunctionChunk.registerChunk();
        TilingFBMUniformChunk.registerChunk();
    }
    static getUniform() {
        return {
            tiles: { value: 2.0 },
            hashLoop: { value: 8.0 },
            amp: { value: 0.5 }
        };
    }
    static getDefines() {
        return {
            NUM_OCTAVES: 3.0
        };
    }
}
class TilingFBMFunctionChunk extends GLSLChunk {
    static getChunkName() {
        return "tiling_fbm_function_chunk";
    }
    static getChunk() {
        return `
        // Based On Dave_Hoskins 
        // https://www.shadertoy.com/view/4dlGW2
        
        highp float hash(in vec2 p, in float hashLoop)
        {
            p = mod(p, hashLoop);
            return rand(p);
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
    static getChunkName() {
        return "tiling_fbm_uniform_chunk";
    }
    static getChunk() {
        return `
      uniform float tiles;  
      uniform float hashLoop;
      uniform float amp;
    `;
    }
}
