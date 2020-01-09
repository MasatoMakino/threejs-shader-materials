"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderLib/sprite_frag.glsl.js
 */
exports.default = (function () {
    // language=GLSL
    return "\n\nuniform float rimStrength;\nuniform float bottomStrength;\nuniform vec3 rimColor;\nuniform vec3 skyColor;\n\nuniform float rimCenter;\nuniform float rimRange;\n\n#include <sprite_fragment_uniform_chunk>\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\n    vec3 color = diffuse;\n    #include <clipping_planes_fragment>\n    #include <sprite_diffuse_color_chunk>\n\t#include <logdepthbuf_fragment>\n\t\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n\t\n\tfloat bottom = 0.0;\t\n\t#ifdef USE_MAP\n      bottom = 1.0 - texture2D( map, vUv ).g;\n      bottom *= bottomStrength;\n    #endif\n    \n    float rim = 0.0;\n    #ifdef USE_MAP\n      float a = texture2D( map, vUv ).a ;\n      float edge = \n          smoothstep( rimCenter-rimRange, rimCenter, a )\n        - smoothstep( rimCenter, rimCenter+rimRange, a );\n    #endif\n    \n    outgoingLight = mix( diffuse, skyColor, bottom);\n    outgoingLight += rimColor * edge * rimStrength;\n    \n    gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n    \n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n";
});
