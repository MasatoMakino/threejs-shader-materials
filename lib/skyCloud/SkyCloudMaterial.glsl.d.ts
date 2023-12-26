/**
 * 平面上に雲模様を描画するシェーダー
 *
 * @see : https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshphong.glsl.js
 */
export declare const fragment = "\n#define PHONG\n\n#include <mesh_phong_uniform>\n\n//varying\nvarying vec2 uvPosition;\n#include <mesh_position_varying>\n\n//user settings\n#include <time_animation_uniform_chunk>\nuniform float scale;\nuniform float cloudVolume;\nuniform float cloudTransformSpeed;\nuniform vec3 skyColor;\nuniform float cloudBottomVolume;\nuniform float cloudBottomSaturation;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// <https://www.shadertoy.com/view/4dS3Wd>\n// <https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83>\n// By Morgan McGuire @morgan3d, http://graphicscodex.com\n// Reuse permitted under the BSD license.\nfloat hash(vec2 p)\n{\n  return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));\n}\n\n/**\n * Based on Morgan McGuire @morgan3d\n * https://www.shadertoy.com/view/4dS3Wd\n */ \nfloat noise (in vec2 _st) {\n    vec2 i = floor(_st);\n    vec2 f = fract(_st);\n\n    // Four corners in 2D of a tile\n    float a = hash(i);\n    float b = hash(i + vec2(1.0, 0.0));\n    float c = hash(i + vec2(0.0, 1.0));\n    float d = hash(i + vec2(1.0, 1.0));\n\n    vec2 u = f * f * (3.0 - 2.0 * f);\n\n    return mix(a, b, u.x) +\n            (c - a)* u.y * (1.0 - u.x) +\n            (d - b) * u.x * u.y;\n}\n\n#define NUM_OCTAVES 7\n\nfloat fbm ( in vec2 _st) {\n    float v = 0.0;\n    float a = 0.5;\n    vec2 shift = vec2(100.0);\n    // Rotate to reduce axial bias\n    mat2 rot = mat2(cos(0.5), sin(0.5),\n                    -sin(0.5), cos(0.50));\n    for (int i = 0; i < NUM_OCTAVES; ++i) {\n        v += a * noise(_st);\n        _st = rot * _st * 2.0 + shift;\n        a *= 0.5;\n    }\n    return v;\n}\n\nvoid main() {\n    #include <clipping_planes_fragment>\n  \n    #include <mesh_phong_diffuse_color>\n    \n    #include <logdepthbuf_fragment>\n    #include <__ShaderMaterial__map_fragment_begin_chunk>\n    #include <map_fragment>\n    #include <color_fragment>\n    \n    vec2 st = uvPosition * scale;\n    st += time;\n\n    vec2 q = vec2(0.);\n    q.x = fbm( st + time);\n    q.y = fbm( st + vec2(1.0));\n\n    vec2 r = vec2(0.0);\n    r.x = fbm( st + q + vec2(1.7,9.2)+ 0.15*time * cloudTransformSpeed);\n    r.y = fbm( st + q + vec2(8.3,2.8)+ 0.126*time * cloudTransformSpeed);\n    float f = fbm(st+r);\n\n    vec3 cloudColor = diffuseColor.rgb;\n    \n    float volume;\n    float alpha = 0.0;\n    volume = (f*f)*cloudVolume*0.03;\n    alpha += volume;\n    volume = (f*f*f*f*f)*cloudVolume;\n    alpha += volume;\n    alpha = clamp(alpha,0.0,1.0);\n    \n    cloudColor = mix(cloudColor,\n                skyColor*cloudBottomSaturation,\n                clamp(volume*cloudBottomVolume,0.0,1.0));\n\n    diffuseColor.rgb = cloudColor;\n    diffuseColor.a *= alpha;\n    \n    #include <mesh_phong_switching_alpha_map>\n    // #include <alphamap_fragment>\n    #include <alphatest_fragment>\n    #include <specularmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <emissivemap_fragment>\n    // accumulation\n    #include <lights_phong_fragment>\n    #include <lights_fragment_begin>\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n    // modulation\n    #include <aomap_fragment>\n    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n    #include <envmap_fragment>\n    #include <output_fragment>\n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n}";
//# sourceMappingURL=SkyCloudMaterial.glsl.d.ts.map