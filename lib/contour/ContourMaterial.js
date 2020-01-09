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
var ShaderPhongMaterial_1 = require("../ShaderPhongMaterial");
var ContourMaterial_frag_glsl_1 = __importDefault(require("./ContourMaterial.frag.glsl"));
var ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
/**
 * テクスチャを等高線状にマップするマテリアル。
 * マッピング以外の機能はMeshPhongMaterialに準じる。
 */
var ContourMaterial = /** @class */ (function (_super) {
    __extends(ContourMaterial, _super);
    function ContourMaterial(parameters) {
        return _super.call(this, ShaderPhongMaterial_vert_glsl_1.default(), ContourMaterial_frag_glsl_1.default(), parameters) || this;
    }
    Object.defineProperty(ContourMaterial.prototype, "map", {
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    ContourMaterial.prototype.loadMap = function (url, geo) {
        var _this = this;
        this._map = new three_1.TextureLoader().load(url, function (texture) {
            if (_this.uniforms && _this.uniforms.map) {
                _this.uniforms.map.value = texture;
            }
        });
        geo.computeBoundingBox();
        this.uniforms.top.value = geo.boundingBox.max.y;
        this.uniforms.bottom.value = geo.boundingBox.min.y;
    };
    ContourMaterial.prototype.initDefines = function () {
        _super.prototype.initDefines.call(this);
        this.defines.USE_MESH_POSITION = true;
    };
    ContourMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            ShaderPhongMaterial_1.ShaderPhongMaterial.getBasicUniforms(),
            {
                top: { value: 1.0 },
                bottom: { value: -1.0 }
            }
        ]);
    };
    ContourMaterial.prototype.initDefaultSetting = function (parameters) {
        _super.prototype.initDefaultSetting.call(this, parameters);
        if (parameters.transparent == null) {
            this.transparent = true;
        }
        else {
            this.transparent = parameters.transparent;
        }
        if (this.transparent && parameters.alphaTest == null) {
            this.alphaTest = 0.5;
        }
        if (parameters.side == null) {
            this.side = three_1.DoubleSide;
        }
        else {
            this.side = parameters.side;
        }
    };
    return ContourMaterial;
}(ShaderPhongMaterial_1.ShaderPhongMaterial));
exports.ContourMaterial = ContourMaterial;
