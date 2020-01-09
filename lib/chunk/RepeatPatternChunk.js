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
var RepeatPatternChunk = /** @class */ (function (_super) {
    __extends(RepeatPatternChunk, _super);
    function RepeatPatternChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepeatPatternChunk.registerChunk = function () {
        RepeatPatternUniformChunk.registerChunk();
        RepeatPatternFragmentChunk.registerChunk();
    };
    RepeatPatternChunk.getUniform = function () {
        return {
            division: { value: 32.0 },
            divisionScaleX: { value: 1.0 }
        };
    };
    return RepeatPatternChunk;
}(GLSLChunk_1.GLSLChunk));
exports.RepeatPatternChunk = RepeatPatternChunk;
var RepeatPatternUniformChunk = /** @class */ (function (_super) {
    __extends(RepeatPatternUniformChunk, _super);
    function RepeatPatternUniformChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepeatPatternUniformChunk.getChunkName = function () {
        return "repeat_pattern_uniform_chunk";
    };
    RepeatPatternUniformChunk.getChunk = function () {
        return "\n      uniform float division;\n      uniform float divisionScaleX;\n    ";
    };
    return RepeatPatternUniformChunk;
}(GLSLChunk_1.GLSLChunk));
var RepeatPatternFragmentChunk = /** @class */ (function (_super) {
    __extends(RepeatPatternFragmentChunk, _super);
    function RepeatPatternFragmentChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepeatPatternFragmentChunk.getChunkName = function () {
        return "repeat_pattern_fragment_chunk";
    };
    RepeatPatternFragmentChunk.getChunk = function () {
        return "\n      vec2 uv =\n        uvPosition\n        * vec2( division * divisionScaleX, division);\n    ";
    };
    return RepeatPatternFragmentChunk;
}(GLSLChunk_1.GLSLChunk));
