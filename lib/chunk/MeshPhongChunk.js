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
/**
 * MeshPhongMaterialと同等の機能を備えたShaderMaterialを実装するために必要なGLSLコードを格納したクラス。
 */
var MeshPhongChunk = /** @class */ (function (_super) {
    __extends(MeshPhongChunk, _super);
    function MeshPhongChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshPhongChunk.registerChunk = function () {
        MeshPhongUniformChunk.registerChunk();
        MeshPhongDiffuseColorChunk.registerChunk();
        MeshPhongSwitchingAlphaMapChunk.registerChunk();
        MeshPositionVaryingChunk.registerChunk();
        MeshPositionVertexChunk.registerChunk();
    };
    MeshPhongChunk.getDefines = function () {
        return {
            USE_MESH_POSITION: false
        };
    };
    return MeshPhongChunk;
}(GLSLChunk_1.GLSLChunk));
exports.MeshPhongChunk = MeshPhongChunk;
var MeshPhongUniformChunk = /** @class */ (function (_super) {
    __extends(MeshPhongUniformChunk, _super);
    function MeshPhongUniformChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshPhongUniformChunk.getChunkName = function () {
        return "mesh_phong_uniform";
    };
    MeshPhongUniformChunk.getChunk = function () {
        return "\n      uniform vec3 diffuse;\n      uniform vec3 emissive;\n      uniform vec3 specular;\n      uniform float shininess;\n      uniform float opacity;\n      uniform bool hasAlphaMap;\n      uniform sampler2D alphaMap;\n    ";
    };
    return MeshPhongUniformChunk;
}(GLSLChunk_1.GLSLChunk));
var MeshPhongDiffuseColorChunk = /** @class */ (function (_super) {
    __extends(MeshPhongDiffuseColorChunk, _super);
    function MeshPhongDiffuseColorChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshPhongDiffuseColorChunk.getChunkName = function () {
        return "mesh_phong_diffuse_color";
    };
    MeshPhongDiffuseColorChunk.getChunk = function () {
        return "\n      vec4 diffuseColor = vec4( diffuse, opacity );\n      ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n      vec3 totalEmissiveRadiance = emissive;\n    ";
    };
    return MeshPhongDiffuseColorChunk;
}(GLSLChunk_1.GLSLChunk));
var MeshPhongSwitchingAlphaMapChunk = /** @class */ (function (_super) {
    __extends(MeshPhongSwitchingAlphaMapChunk, _super);
    function MeshPhongSwitchingAlphaMapChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshPhongSwitchingAlphaMapChunk.getChunkName = function () {
        return "mesh_phong_switching_alpha_map";
    };
    MeshPhongSwitchingAlphaMapChunk.getChunk = function () {
        return "\n      if( hasAlphaMap ){\n        diffuseColor.a *= texture2D( alphaMap, mapUV ).g;\n      }\n    ";
    };
    return MeshPhongSwitchingAlphaMapChunk;
}(GLSLChunk_1.GLSLChunk));
var MeshPositionVaryingChunk = /** @class */ (function (_super) {
    __extends(MeshPositionVaryingChunk, _super);
    function MeshPositionVaryingChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshPositionVaryingChunk.getChunkName = function () {
        return "mesh_position_varying";
    };
    MeshPositionVaryingChunk.getChunk = function () {
        return "\n    #ifdef USE_MESH_POSITION\n    varying vec3 meshPosition;\n    #endif\n    ";
    };
    return MeshPositionVaryingChunk;
}(GLSLChunk_1.GLSLChunk));
var MeshPositionVertexChunk = /** @class */ (function (_super) {
    __extends(MeshPositionVertexChunk, _super);
    function MeshPositionVertexChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshPositionVertexChunk.getChunkName = function () {
        return "mesh_position_vertex";
    };
    MeshPositionVertexChunk.getChunk = function () {
        return "\n    #ifdef USE_MESH_POSITION\n    meshPosition = position;\n    #endif\n    ";
    };
    return MeshPositionVertexChunk;
}(GLSLChunk_1.GLSLChunk));
