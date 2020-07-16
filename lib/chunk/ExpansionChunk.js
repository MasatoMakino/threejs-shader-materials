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
exports.ExpansionVertexChunk = exports.ExpansionUniformChunk = exports.ExpansionChunk = void 0;
var GLSLChunk_1 = require("./GLSLChunk");
var ExpansionChunk = /** @class */ (function (_super) {
    __extends(ExpansionChunk, _super);
    function ExpansionChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpansionChunk.registerChunk = function () {
        ExpansionUniformChunk.registerChunk();
        ExpansionVertexChunk.registerChunk();
    };
    ExpansionChunk.getDefines = function () {
        return {
            USE_EXPANSION: false
        };
    };
    ExpansionChunk.getUniform = function () {
        return {
            expansionStrength: {
                value: 0.0
            }
        };
    };
    return ExpansionChunk;
}(GLSLChunk_1.GLSLChunk));
exports.ExpansionChunk = ExpansionChunk;
var ExpansionUniformChunk = /** @class */ (function (_super) {
    __extends(ExpansionUniformChunk, _super);
    function ExpansionUniformChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpansionUniformChunk.getChunkName = function () {
        return "expansion_uniform_chunk";
    };
    ExpansionUniformChunk.getChunk = function () {
        return "\n    #ifdef USE_EXPANSION\n      uniform float expansionStrength;\n    #endif\n    ";
    };
    return ExpansionUniformChunk;
}(GLSLChunk_1.GLSLChunk));
exports.ExpansionUniformChunk = ExpansionUniformChunk;
var ExpansionVertexChunk = /** @class */ (function (_super) {
    __extends(ExpansionVertexChunk, _super);
    function ExpansionVertexChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpansionVertexChunk.getChunkName = function () {
        return "expansion_vertex_chunk";
    };
    ExpansionVertexChunk.getChunk = function () {
        return "\n    #ifdef USE_EXPANSION\n      transformed += normal * expansionStrength;\n    #endif\n    ";
    };
    return ExpansionVertexChunk;
}(GLSLChunk_1.GLSLChunk));
exports.ExpansionVertexChunk = ExpansionVertexChunk;
