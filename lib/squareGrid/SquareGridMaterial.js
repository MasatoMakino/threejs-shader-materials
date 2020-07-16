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
exports.SquareGridMaterial = void 0;
var three_1 = require("three");
var SquareGridMaterial_frag_glsl_1 = __importDefault(require("./SquareGridMaterial.frag.glsl"));
var ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
var WavyGridMaterial_1 = require("../WavyGridMaterial");
/**
 * 四角形グリッドマテリアル
 */
var SquareGridMaterial = /** @class */ (function (_super) {
    __extends(SquareGridMaterial, _super);
    function SquareGridMaterial(parameters) {
        return _super.call(this, ShaderPhongMaterial_vert_glsl_1.default(), SquareGridMaterial_frag_glsl_1.default(), parameters) || this;
    }
    Object.defineProperty(SquareGridMaterial.prototype, "gridWeight", {
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
    SquareGridMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            WavyGridMaterial_1.WavyGridMaterial.getBasicUniforms(),
            {
                gridWeight: { value: 0.03 }
            }
        ]);
    };
    return SquareGridMaterial;
}(WavyGridMaterial_1.WavyGridMaterial));
exports.SquareGridMaterial = SquareGridMaterial;
