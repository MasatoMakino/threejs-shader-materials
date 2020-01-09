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
var GLSLChunk_1 = require("./GLSLChunk");
var SurfaceNormalChunk = /** @class */ (function (_super) {
    __extends(SurfaceNormalChunk, _super);
    function SurfaceNormalChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SurfaceNormalChunk.registerChunk = function () {
        SurfaceNormalVaryingChunk.registerChunk();
        SurfaceNormalVertexChunk.registerChunk();
    };
    SurfaceNormalChunk.getDefines = function () {
        return {
            USE_SURFACE_NORMAL: false
        };
    };
    SurfaceNormalChunk.getUniform = function () {
        return {};
    };
    return SurfaceNormalChunk;
}(GLSLChunk_1.GLSLChunk));
exports.SurfaceNormalChunk = SurfaceNormalChunk;
var SurfaceNormalVaryingChunk = /** @class */ (function (_super) {
    __extends(SurfaceNormalVaryingChunk, _super);
    function SurfaceNormalVaryingChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SurfaceNormalVaryingChunk.getChunkName = function () {
        return "surface_normal_varying_chunk";
    };
    SurfaceNormalVaryingChunk.getChunk = function () {
        return "\n    #ifdef USE_SURFACE_NORMAL\n      varying vec3 surfaceNormal;\n    #endif\n    ";
    };
    return SurfaceNormalVaryingChunk;
}(GLSLChunk_1.GLSLChunk));
exports.SurfaceNormalVaryingChunk = SurfaceNormalVaryingChunk;
var SurfaceNormalVertexChunk = /** @class */ (function (_super) {
    __extends(SurfaceNormalVertexChunk, _super);
    function SurfaceNormalVertexChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SurfaceNormalVertexChunk.getChunkName = function () {
        return "surface_normal_vertex_chunk";
    };
    SurfaceNormalVertexChunk.getChunk = function () {
        return "\n    #ifdef USE_SURFACE_NORMAL\n      surfaceNormal = normalize( transformedNormal );\n    #endif\n    ";
    };
    return SurfaceNormalVertexChunk;
}(GLSLChunk_1.GLSLChunk));
exports.SurfaceNormalVertexChunk = SurfaceNormalVertexChunk;
