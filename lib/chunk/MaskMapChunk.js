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
exports.MaskMapChunk = void 0;
var three_1 = require("three");
var GLSLChunk_1 = require("./GLSLChunk");
var RepeatPatternChunk_1 = require("./RepeatPatternChunk");
/**
 * マスクテクスチャを利用するShaderMaterial用Chunk。
 * マスクテクスチャがどのように描画に反映されるかは、各Materialのシェーダー実装による。
 */
var MaskMapChunk = /** @class */ (function (_super) {
    __extends(MaskMapChunk, _super);
    function MaskMapChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskMapChunk.registerChunk = function () {
        _super.registerChunk.call(this);
        MaskMapUniformChunk.registerChunk();
        MaskMapFragmentChunk.registerChunk();
    };
    MaskMapChunk.getUniform = function () {
        return three_1.UniformsUtils.merge([
            _super.getUniform.call(this),
            {
                hasMaskTexture: { value: false },
                maskTexture: { value: null }
            }
        ]);
    };
    MaskMapChunk.getMaskTexture = function (_self) {
        return _self.uniforms.maskTexture.value;
    };
    MaskMapChunk.setMaskTexture = function (_self, val) {
        _self.uniforms.maskTexture.value = val;
        _self.uniforms.hasMaskTexture.value = val != null;
    };
    return MaskMapChunk;
}(RepeatPatternChunk_1.RepeatPatternChunk));
exports.MaskMapChunk = MaskMapChunk;
var MaskMapUniformChunk = /** @class */ (function (_super) {
    __extends(MaskMapUniformChunk, _super);
    function MaskMapUniformChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskMapUniformChunk.getChunkName = function () {
        return "mask_map_uniform_chunk";
    };
    MaskMapUniformChunk.getChunk = function () {
        return "\n      uniform bool hasMaskTexture;\n      uniform sampler2D maskTexture;\n    ";
    };
    return MaskMapUniformChunk;
}(GLSLChunk_1.GLSLChunk));
var MaskMapFragmentChunk = /** @class */ (function (_super) {
    __extends(MaskMapFragmentChunk, _super);
    function MaskMapFragmentChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskMapFragmentChunk.getChunkName = function () {
        return "mask_map_fragment_chunk";
    };
    MaskMapFragmentChunk.getChunk = function () {
        return "\n      float mask = 1.0;\n      if( hasMaskTexture ){\n        vec2 uVm = id / vec2( division * divisionScaleX, division);\n        mask = texture2D( maskTexture, uVm ).g;\n      }\n    ";
    };
    return MaskMapFragmentChunk;
}(GLSLChunk_1.GLSLChunk));
