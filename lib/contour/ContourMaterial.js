"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContourMaterial = void 0;
const ShaderPhongMaterial_1 = require("../ShaderPhongMaterial");
const ShaderPhongMaterial_glsl_1 = require("../ShaderPhongMaterial.glsl");
const ContourMaterial_glsl_1 = require("./ContourMaterial.glsl");
const three_1 = require("three");
/**
 * テクスチャを等高線状にマップするマテリアル。
 * マッピング以外の機能はMeshPhongMaterialに準じる。
 */
class ContourMaterial extends ShaderPhongMaterial_1.ShaderPhongMaterial {
    get map() {
        return this._map;
    }
    loadMap(url, geo) {
        this._map = new three_1.TextureLoader().load(url, (texture) => {
            if (this.uniforms && this.uniforms.map) {
                this.uniforms.map.value = texture;
            }
        });
        geo.computeBoundingBox();
        this.uniforms.top.value = geo.boundingBox.max.y;
        this.uniforms.bottom.value = geo.boundingBox.min.y;
    }
    constructor(parameters) {
        super(ShaderPhongMaterial_glsl_1.vertex, ContourMaterial_glsl_1.fragment, parameters);
    }
    initDefines() {
        super.initDefines();
        this.defines.USE_MESH_POSITION = true;
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            ShaderPhongMaterial_1.ShaderPhongMaterial.getBasicUniforms(),
            {
                top: { value: 1.0 },
                bottom: { value: -1.0 },
            },
        ]);
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
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
    }
}
exports.ContourMaterial = ContourMaterial;
