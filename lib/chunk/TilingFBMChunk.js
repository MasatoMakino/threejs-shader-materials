"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilingFBMChunk = void 0;
var GLSLChunk_1 = require("./GLSLChunk");
var TilingFBMChunk = /** @class */ (function (_super) {
    __extends(TilingFBMChunk, _super);
    function TilingFBMChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TilingFBMChunk.registerChunk = function () {
        TilingFBMFunctionChunk.registerChunk();
        TilingFBMUniformChunk.registerChunk();
    };
    TilingFBMChunk.getUniform = function () {
        return {
            tiles: { value: 2.0 },
            hashLoop: { value: 8.0 },
            amp: { value: 0.5 }
        };
    };
    TilingFBMChunk.getDefines = function () {
        return {
            NUM_OCTAVES: 3.0
        };
    };
    return TilingFBMChunk;
}(GLSLChunk_1.GLSLChunk));
exports.TilingFBMChunk = TilingFBMChunk;
var TilingFBMFunctionChunk = /** @class */ (function (_super) {
    __extends(TilingFBMFunctionChunk, _super);
    function TilingFBMFunctionChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TilingFBMFunctionChunk.getChunkName = function () {
        return "tiling_fbm_function_chunk";
    };
    TilingFBMFunctionChunk.getChunk = function () {
        return "\n        // Based On Dave_Hoskins \n        // https://www.shadertoy.com/view/4dlGW2\n        \n        highp float hash(in vec2 p, in float hashLoop)\n        {\n            p = mod(p, hashLoop);\n            return rand(p);\n        }\n        \n        float noise(in vec2 p, in float hashLoop)\n        {\n            p *= hashLoop;\n            vec2 f = fract(p);\n            vec2 u = f*f*(3.0-2.0*f);\n        \n            p = floor(p);\n            float a = hash(p, hashLoop);\n            float b = hash(p + vec2(1.0, 0.0), hashLoop);\n            float c = hash(p + vec2(0.0, 1.0), hashLoop);\n            float d = hash(p + vec2(1.0, 1.0), hashLoop);\n        \n            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;\n        }\n        \n        // Based On Dave_Hoskins \n        // https://www.shadertoy.com/view/4dlGW2\n        \n        float fbm(in vec2 p)\n        {\n            float v = 0.0;\n            \n            p = mod(p, hashLoop);\n            float a = amp;\n            float hashLoopVal = hashLoop;\n            \n            for (int i = 0; i < NUM_OCTAVES; i++){\n                v += noise(p, hashLoopVal) * a;\n                a *= .5;\n                hashLoopVal *= 2.0;\n            }\n            return v;\n        }\n    ";
    };
    return TilingFBMFunctionChunk;
}(GLSLChunk_1.GLSLChunk));
var TilingFBMUniformChunk = /** @class */ (function (_super) {
    __extends(TilingFBMUniformChunk, _super);
    function TilingFBMUniformChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TilingFBMUniformChunk.getChunkName = function () {
        return "tiling_fbm_uniform_chunk";
    };
    TilingFBMUniformChunk.getChunk = function () {
        return "\n      uniform float tiles;  \n      uniform float hashLoop;\n      uniform float amp;\n    ";
    };
    return TilingFBMUniformChunk;
}(GLSLChunk_1.GLSLChunk));
