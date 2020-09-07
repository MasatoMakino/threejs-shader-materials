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
exports.GridMaterial = void 0;
var three_1 = require("three");
var ShaderPhongMaterial_1 = require("./ShaderPhongMaterial");
var ReversibleChunk_1 = require("./chunk/ReversibleChunk");
var MaskMapChunk_1 = require("./chunk/MaskMapChunk");
/**
 * グリッド状に分割されたマテリアル。
 */
var GridMaterial = /** @class */ (function (_super) {
    __extends(GridMaterial, _super);
    function GridMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GridMaterial.prototype, "division", {
        get: function () {
            return this.uniforms.division.value;
        },
        set: function (value) {
            this.uniforms.division.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridMaterial.prototype, "divisionScaleX", {
        get: function () {
            return this.uniforms.divisionScaleX.value;
        },
        set: function (value) {
            this.uniforms.divisionScaleX.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridMaterial.prototype, "isReversed", {
        get: function () {
            return this.uniforms.isReversed.value;
        },
        set: function (value) {
            this.uniforms.isReversed.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridMaterial.prototype, "maskTexture", {
        get: function () {
            return MaskMapChunk_1.MaskMapChunk.getMaskTexture(this);
        },
        set: function (val) {
            MaskMapChunk_1.MaskMapChunk.setMaskTexture(this, val);
        },
        enumerable: false,
        configurable: true
    });
    GridMaterial.prototype.initChunks = function () {
        _super.prototype.initChunks.call(this);
        MaskMapChunk_1.MaskMapChunk.registerChunk();
        ReversibleChunk_1.ReversibleChunk.registerChunk();
    };
    GridMaterial.getBasicUniforms = function () {
        return three_1.UniformsUtils.merge([
            ShaderPhongMaterial_1.ShaderPhongMaterial.getBasicUniforms(),
            ReversibleChunk_1.ReversibleChunk.getUniform(),
            MaskMapChunk_1.MaskMapChunk.getUniform()
        ]);
    };
    GridMaterial.prototype.initDefaultSetting = function (parameters) {
        _super.prototype.initDefaultSetting.call(this, parameters);
        if (parameters.transparent == null) {
            this.transparent = true;
        }
    };
    return GridMaterial;
}(ShaderPhongMaterial_1.ShaderPhongMaterial));
exports.GridMaterial = GridMaterial;
