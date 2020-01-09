"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderLib/sprite_frag.glsl.js
 */
exports.default = (function () {
    // language=GLSL
    return "\n#include <sprite_fragment_uniform_chunk>\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n    #include <clipping_planes_fragment>\n    #include <sprite_diffuse_color_chunk>\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n    outgoingLight = diffuseColor.rgb;\n    gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";
});
