"use strict";
/**
 * ライトに影響を受けない、ソリッドな切断面をもつマテリアル
 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolidClippingMaterial = void 0;
var index_1 = require("../index");
var three_1 = require("three");
var SolidClippingMaterial_frag_glsl_1 = __importDefault(require("./SolidClippingMaterial.frag.glsl"));
var three_2 = require("three");
var SolidClippingMaterial = /** @class */ (function (_super) {
    __extends(SolidClippingMaterial, _super);
    function SolidClippingMaterial(parameters) {
        return _super.call(this, null, SolidClippingMaterial_frag_glsl_1.default(), parameters) || this;
    }
    Object.defineProperty(SolidClippingMaterial.prototype, "cutSectionColor", {
        get: function () {
            return this.uniforms.cutSectionColor.value;
        },
        set: function (value) {
            this.uniforms.cutSectionColor.value = value;
        },
        enumerable: false,
        configurable: true
    });
    SolidClippingMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            index_1.ShaderPhongMaterial.getBasicUniforms(),
            {
                cutSectionColor: { value: new three_1.Color(1.0, 1.0, 1.0) }
            }
        ]);
    };
    SolidClippingMaterial.prototype.initDefaultSetting = function (parameters) {
        _super.prototype.initDefaultSetting.call(this, parameters);
        this.clipping = true;
        this.side = three_2.DoubleSide;
    };
    return SolidClippingMaterial;
}(index_1.ShaderPhongMaterial));
exports.SolidClippingMaterial = SolidClippingMaterial;
