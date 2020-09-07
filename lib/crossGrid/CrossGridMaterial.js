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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossGridMaterial = void 0;
var three_1 = require("three");
var CrossGridMaterial_frag_glsl_1 = __importDefault(require("./CrossGridMaterial.frag.glsl"));
var ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
var WavyGridMaterial_1 = require("../WavyGridMaterial");
/**
 * 十字線を正方形グリッドの中心に描画するマテリアル。
 */
var CrossGridMaterial = /** @class */ (function (_super) {
    __extends(CrossGridMaterial, _super);
    function CrossGridMaterial(parameters) {
        return _super.call(this, ShaderPhongMaterial_vert_glsl_1.default(), CrossGridMaterial_frag_glsl_1.default(), parameters) || this;
    }
    Object.defineProperty(CrossGridMaterial.prototype, "gridWeight", {
        /**
         * グリッド線の太さ
         * 0.0で線なし、0.5でグリッド面なしになる。
         */
        get: function () {
            return this.uniforms.gridWeight.value;
        },
        set: function (value) {
            this.uniforms.gridWeight.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CrossGridMaterial.prototype, "radius", {
        get: function () {
            return this.uniforms.radius.value;
        },
        set: function (value) {
            this.uniforms.radius.value = value;
        },
        enumerable: false,
        configurable: true
    });
    CrossGridMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            WavyGridMaterial_1.WavyGridMaterial.getBasicUniforms(),
            {
                gridWeight: { value: 0.03 },
                radius: { value: 0.15 }
            }
        ]);
    };
    return CrossGridMaterial;
}(WavyGridMaterial_1.WavyGridMaterial));
exports.CrossGridMaterial = CrossGridMaterial;
