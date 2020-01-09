"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://raw.githubusercontent.com/mrdoob/three.js/dev/src/renderers/shaders/ShaderLib/sprite_vert.glsl.js
 */
exports.default = (function () {
    // language=GLSL
    return "\n#include <sprite_vertex_uniform_chunk>\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\t#include <uv_vertex>\n\t#include <sprite_mv_position_chunk>\n\n\tgl_Position = projectionMatrix * mvPosition;\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n";
});
