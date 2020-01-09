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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
var HalftoneGridMaterial_frag_glsl_1 = __importDefault(require("./HalftoneGridMaterial.frag.glsl"));
var ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
var WavyGridMaterial_1 = require("../WavyGridMaterial");
/**
 * MaskMapをハーフトーン分解するマテリアル
 */
var HalftoneGridMaterial = /** @class */ (function (_super) {
    __extends(HalftoneGridMaterial, _super);
    function HalftoneGridMaterial(parameters) {
        return _super.call(this, ShaderPhongMaterial_vert_glsl_1.default(), HalftoneGridMaterial_frag_glsl_1.default(), parameters) || this;
    }
    Object.defineProperty(HalftoneGridMaterial.prototype, "radius", {
        get: function () {
            return this.uniforms.radius.value;
        },
        set: function (value) {
            this.uniforms.radius.value = value;
        },
        enumerable: true,
        configurable: true
    });
    HalftoneGridMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            WavyGridMaterial_1.WavyGridMaterial.getBasicUniforms(),
            {
                radius: { value: 0.75 }
            }
        ]);
    };
    return HalftoneGridMaterial;
}(WavyGridMaterial_1.WavyGridMaterial));
exports.HalftoneGridMaterial = HalftoneGridMaterial;
