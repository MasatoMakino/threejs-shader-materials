import { GLSLChunk } from "./GLSLChunk";

export class HexGridChunk extends GLSLChunk {
  public static registerChunk(): void {
    super.registerChunk();
    HexGridFunctionChunk.registerChunk();
  }
}

class HexGridFunctionChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "hex_grid_function_chunk";
  }

  protected static getChunk(): string {
    // language=GLSL
    return /* GLSL */ `
    /**
     * ヘックスの縁までの距離を取得する。
     */
    float hexDist(vec2 p)
    {
        p = abs(p);
        float d = dot(p, normalize(vec2(1.0, 1.73)));
        return max(d, p.x);
    }
    
    /**
     * uv座標からヘックス固有のxy座標とIDを取得する
     *
     * x : ヘックスの中心点からの回転角
     * y : ヘックスの縁までの距離
     * zw : ヘックスのID
     */
    vec4 hexCoords(vec2 uv)
    {
        vec2 r = vec2(1.0, 1.73);
        vec2 h = r * 0.5;
        vec2 a = mod(uv, r) - h;
        vec2 b = mod(uv - h, r) - h;
    
        vec2 gv = length(a) < length(b) ? a : b;
        vec2 id = uv - gv;
    
        float x = atan(gv.x, gv.y);
        float y = 0.5 - hexDist(gv);
    
        return vec4(x, y, id);
    }
    `;
  }
}
