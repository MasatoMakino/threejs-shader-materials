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
var ReversibleChunk = /** @class */ (function (_super) {
    __extends(ReversibleChunk, _super);
    function ReversibleChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReversibleChunk.registerChunk = function () {
        ReversibleUniformChunk.registerChunk();
    };
    ReversibleChunk.getUniform = function () {
        return {
            isReversed: { value: false }
        };
    };
    return ReversibleChunk;
}(GLSLChunk_1.GLSLChunk));
exports.ReversibleChunk = ReversibleChunk;
var ReversibleUniformChunk = /** @class */ (function (_super) {
    __extends(ReversibleUniformChunk, _super);
    function ReversibleUniformChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReversibleUniformChunk.getChunkName = function () {
        return "reversible_uniform_chunk";
    };
    ReversibleUniformChunk.getChunk = function () {
        return "\n      uniform bool isReversed;\n    ";
    };
    return ReversibleUniformChunk;
}(GLSLChunk_1.GLSLChunk));
