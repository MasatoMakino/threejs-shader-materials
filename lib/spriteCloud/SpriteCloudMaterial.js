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
var three_2 = require("three");
var ShaderSpriteMaterial_1 = require("../ShaderSpriteMaterial");
var SpriteCloudMaterial_frag_glsl_1 = __importDefault(require("./SpriteCloudMaterial.frag.glsl"));
var SpriteCloudMaterial = /** @class */ (function (_super) {
    __extends(SpriteCloudMaterial, _super);
    function SpriteCloudMaterial(parameters) {
        return _super.call(this, null, SpriteCloudMaterial_frag_glsl_1.default(), parameters) || this;
    }
    /**
     * uniformsを初期化する。
     */
    SpriteCloudMaterial.prototype.initUniforms = function () {
        _super.prototype.initUniforms.call(this);
        this.uniforms = three_1.UniformsUtils.merge([
            this.uniforms,
            {
                rimStrength: { value: 0.2 },
                bottomStrength: { value: 0.75 },
                rimColor: { value: new three_2.Color(0xffffff) },
                skyColor: { value: new three_2.Color(0xcccccc) },
                rimCenter: { value: 0.6 },
                rimRange: { value: 0.15 }
            }
        ]);
    };
    SpriteCloudMaterial.prototype.initDefaultSetting = function (parameters) {
        _super.prototype.initDefaultSetting.call(this, parameters);
    };
    Object.defineProperty(SpriteCloudMaterial.prototype, "rimCenter", {
        get: function () {
            return this.uniforms.rimCenter.value;
        },
        set: function (value) {
            this.uniforms.rimCenter.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteCloudMaterial.prototype, "rimRange", {
        get: function () {
            return this.uniforms.rimRange.value;
        },
        set: function (value) {
            this.uniforms.rimRange.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteCloudMaterial.prototype, "rimStrength", {
        get: function () {
            return this.uniforms.rimStrength.value;
        },
        set: function (value) {
            this.uniforms.rimStrength.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteCloudMaterial.prototype, "bottomStrength", {
        get: function () {
            return this.uniforms.bottomStrength.value;
        },
        set: function (value) {
            this.uniforms.bottomStrength.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteCloudMaterial.prototype, "rimColor", {
        get: function () {
            return this.uniforms.rimColor.value;
        },
        set: function (value) {
            this.uniforms.rimColor.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteCloudMaterial.prototype, "skyColor", {
        get: function () {
            return this.uniforms.skyColor.value;
        },
        set: function (value) {
            this.uniforms.skyColor.value = value;
        },
        enumerable: true,
        configurable: true
    });
    return SpriteCloudMaterial;
}(ShaderSpriteMaterial_1.ShaderSpriteMaterial));
exports.SpriteCloudMaterial = SpriteCloudMaterial;
