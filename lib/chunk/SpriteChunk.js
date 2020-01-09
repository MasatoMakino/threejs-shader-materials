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
var three_1 = require("three");
var three_2 = require("three");
/**
 * SpriteMaterialと同等の機能を備えたShaderMaterialを実装するために必要なGLSLコードを格納したクラス。
 */
var SpriteChunk = /** @class */ (function (_super) {
    __extends(SpriteChunk, _super);
    function SpriteChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpriteChunk.registerChunk = function () {
        SpriteVertexUniformChunk.registerChunk();
        SpriteFragmentUniformChunk.registerChunk();
        SpriteDiffuseColorChunk.registerChunk();
        SpriteMVPositionChunk.registerChunk();
    };
    SpriteChunk.getDefines = function () {
        return {
            USE_SIZEATTENUATION: true
        };
    };
    SpriteChunk.getUniform = function () {
        //TODO : PR, UniformsLib.sprite in UniformsLib.d.ts
        return three_1.UniformsUtils.merge([
            three_2.UniformsLib.sprite,
            three_2.UniformsLib.fog,
            three_2.UniformsLib.lights
        ]);
    };
    return SpriteChunk;
}(GLSLChunk_1.GLSLChunk));
exports.SpriteChunk = SpriteChunk;
var SpriteVertexUniformChunk = /** @class */ (function (_super) {
    __extends(SpriteVertexUniformChunk, _super);
    function SpriteVertexUniformChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpriteVertexUniformChunk.getChunkName = function () {
        return "sprite_vertex_uniform_chunk";
    };
    SpriteVertexUniformChunk.getChunk = function () {
        return "\n      uniform float rotation;\n      uniform vec2 center;\n    ";
    };
    return SpriteVertexUniformChunk;
}(GLSLChunk_1.GLSLChunk));
var SpriteFragmentUniformChunk = /** @class */ (function (_super) {
    __extends(SpriteFragmentUniformChunk, _super);
    function SpriteFragmentUniformChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpriteFragmentUniformChunk.getChunkName = function () {
        return "sprite_fragment_uniform_chunk";
    };
    SpriteFragmentUniformChunk.getChunk = function () {
        return "\n      uniform vec3 diffuse;\n      uniform float opacity;\n    ";
    };
    return SpriteFragmentUniformChunk;
}(GLSLChunk_1.GLSLChunk));
var SpriteDiffuseColorChunk = /** @class */ (function (_super) {
    __extends(SpriteDiffuseColorChunk, _super);
    function SpriteDiffuseColorChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpriteDiffuseColorChunk.getChunkName = function () {
        return "sprite_diffuse_color_chunk";
    };
    SpriteDiffuseColorChunk.getChunk = function () {
        return "\n      vec3 outgoingLight = vec3( 0.0 );\n      vec4 diffuseColor = vec4( diffuse, opacity );\n    ";
    };
    return SpriteDiffuseColorChunk;
}(GLSLChunk_1.GLSLChunk));
var SpriteMVPositionChunk = /** @class */ (function (_super) {
    __extends(SpriteMVPositionChunk, _super);
    function SpriteMVPositionChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpriteMVPositionChunk.getChunkName = function () {
        return "sprite_mv_position_chunk";
    };
    SpriteMVPositionChunk.getChunk = function () {
        return "\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n    ";
    };
    return SpriteMVPositionChunk;
}(GLSLChunk_1.GLSLChunk));
