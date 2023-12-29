/**
 * Cellular Noise Fragment Shader
 *
 * @see : https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshphong.glsl.js
 */
export declare const fragment = "\n#define PHONG\n\n#include <mesh_phong_uniform>\nvarying vec2 uvPosition;\n#include <mesh_position_varying>\n\nuniform float grid;\nuniform float divisionScaleX;\n#include <time_animation_uniform_chunk>\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvec2 rand2D(vec2 p, vec2 scale) {\n    p = mod(p, scale);\n    const float a = 12.9898, b = 78.233, c = 43758.5453;\n    const float a2 = 26.7, b2 = 14.879;\n    \n    highp float dt = dot(p, vec2(a, b)), sn = mod(dt, PI);\n    highp float dt2 = dot(p, vec2(a2, b2)), sn2 = mod(dt2, PI);\n    return fract(sin(vec2(dt, dt2)) * c);\n}\n\n/*!\n * Cellular Noise\n *\n * The inherits function is :\n * Author : patriciogv\n * see https://thebookofshaders.com/12/\n * LICENSE : https://github.com/patriciogonzalezvivo/thebookofshaders/issues/235\n */\nfloat cellularNoise(vec2 uv, float grid, float divisionScaleX, float time){\n  \n    vec2 scale = grid * vec2 ( divisionScaleX, 1.0 );\n    uv *= scale;\n    \n    vec2 i_uv = floor(uv);\n    vec2 f_uv = fract(uv);\n    \n    float minDist = 1.;\n    \n    for (int y= -1; y <= 1; y++) {\n        for (int x= -1; x <= 1; x++) {\n            vec2 neighbor = vec2(float(x), float(y));\n            vec2 point = rand2D(i_uv + neighbor, scale);\n            \n            point = 0.5 + 0.5 * sin(time + PI2 * point);\n            \n            vec2 diff = neighbor + point - f_uv;\n            float dist = length(diff);\n            \n            minDist = min(minDist, dist);\n        }\n    }\n    \n    return minDist;\n}\n\nvoid main() {\n    #include <clipping_planes_fragment>\n  \n    #include <mesh_phong_diffuse_color>\n    \n    #include <logdepthbuf_fragment>\n    #include <__ShaderMaterial__map_fragment_begin_chunk>\n    #include <map_fragment>\n    #include <color_fragment>\n\n    float dist = cellularNoise( mapUV, grid, divisionScaleX, time );\n    diffuseColor.rgb *= dist;\n    diffuseColor.a *= dist;\n    \n    #include <mesh_phong_switching_alpha_map>\n\n    // #include <alphamap_fragment>\n    #include <alphatest_fragment>\n    #include <alphahash_fragment>\n    #include <specularmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <emissivemap_fragment>\n\n    // accumulation\n    #include <lights_phong_fragment>\n    #include <lights_fragment_begin>\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n\n    // modulation\n    #include <aomap_fragment>\n\n    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n    #include <envmap_fragment>\n    #include <opaque_fragment>\n    #include <tonemapping_fragment>\n    #include <colorspace_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n}";
//# sourceMappingURL=CellularNoiseMaterial.glsl.d.ts.map