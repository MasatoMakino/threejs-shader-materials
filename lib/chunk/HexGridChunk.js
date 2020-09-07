"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexGridChunk = void 0;
var GLSLChunk_1 = require("./GLSLChunk");
var HexGridChunk = /** @class */ (function (_super) {
    __extends(HexGridChunk, _super);
    function HexGridChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HexGridChunk.registerChunk = function () {
        _super.registerChunk.call(this);
        HexGridFunctionChunk.registerChunk();
    };
    return HexGridChunk;
}(GLSLChunk_1.GLSLChunk));
exports.HexGridChunk = HexGridChunk;
var HexGridFunctionChunk = /** @class */ (function (_super) {
    __extends(HexGridFunctionChunk, _super);
    function HexGridFunctionChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HexGridFunctionChunk.getChunkName = function () {
        return "hex_grid_function_chunk";
    };
    HexGridFunctionChunk.getChunk = function () {
        // language=GLSL
        return "\n    /**\n     * \u30D8\u30C3\u30AF\u30B9\u306E\u7E01\u307E\u3067\u306E\u8DDD\u96E2\u3092\u53D6\u5F97\u3059\u308B\u3002\n     */\n    float hexDist(vec2 p)\n    {\n        p = abs(p);\n        float d = dot(p, normalize(vec2(1.0, 1.73)));\n        return max(d, p.x);\n    }\n    \n    /**\n     * uv\u5EA7\u6A19\u304B\u3089\u30D8\u30C3\u30AF\u30B9\u56FA\u6709\u306Exy\u5EA7\u6A19\u3068ID\u3092\u53D6\u5F97\u3059\u308B\n     *\n     * x : \u30D8\u30C3\u30AF\u30B9\u306E\u4E2D\u5FC3\u70B9\u304B\u3089\u306E\u56DE\u8EE2\u89D2\n     * y : \u30D8\u30C3\u30AF\u30B9\u306E\u7E01\u307E\u3067\u306E\u8DDD\u96E2\n     * zw : \u30D8\u30C3\u30AF\u30B9\u306EID\n     */\n    vec4 hexCoords(vec2 uv)\n    {\n        vec2 r = vec2(1.0, 1.73);\n        vec2 h = r * 0.5;\n        vec2 a = mod(uv, r) - h;\n        vec2 b = mod(uv - h, r) - h;\n    \n        vec2 gv = length(a) < length(b) ? a : b;\n        vec2 id = uv - gv;\n    \n        float x = atan(gv.x, gv.y);\n        float y = 0.5 - hexDist(gv);\n    \n        return vec4(x, y, id);\n    }\n    ";
    };
    return HexGridFunctionChunk;
}(GLSLChunk_1.GLSLChunk));
