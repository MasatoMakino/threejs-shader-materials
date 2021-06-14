"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexGridChunk = void 0;
const GLSLChunk_1 = require("./GLSLChunk");
class HexGridChunk extends GLSLChunk_1.GLSLChunk {
    static registerChunk() {
        super.registerChunk();
        HexGridFunctionChunk.registerChunk();
    }
}
exports.HexGridChunk = HexGridChunk;
class HexGridFunctionChunk extends GLSLChunk_1.GLSLChunk {
    static getChunkName() {
        return "hex_grid_function_chunk";
    }
    static getChunk() {
        // language=GLSL
        return `
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
