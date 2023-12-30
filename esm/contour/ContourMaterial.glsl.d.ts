/**
 * 等高線状にテクスチャをマッピングするシェーダー
 * @see : https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshphong.glsl.js
 */
export declare const fragment = "\n#define PHONG\n\n#include <mesh_phong_uniform>\nvarying vec2 uvPosition;\n#include <mesh_position_varying>\n\nuniform float bottom;\nuniform float top;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n    #include <clipping_planes_fragment>\n  \n    #include <mesh_phong_diffuse_color>\n    \n    #include <logdepthbuf_fragment>\n\n    #include <__ShaderMaterial__map_fragment_begin_chunk>\n    #ifdef USE_MAP\n      float mapY = ( meshPosition.y - bottom ) / ( top - bottom );\n      vec4 texelColor = texture2D( map, vec2(0.5, mapY) );\n      diffuseColor *= texelColor;\n    #endif\n\n    #include <color_fragment>\n    #include <mesh_phong_switching_alpha_map>\n    // #include <alphamap_fragment>\n    #include <alphatest_fragment>\n    #include <alphahash_fragment>\n    #include <specularmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <emissivemap_fragment>\n\n    // accumulation\n    #include <lights_phong_fragment>\n    #include <lights_fragment_begin>\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n\n    // modulation\n    #include <aomap_fragment>\n\n    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n    \n    #include <envmap_fragment>\n    #include <opaque_fragment>\n    #include <tonemapping_fragment>\n    #include <colorspace_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n\n}";
//# sourceMappingURL=ContourMaterial.glsl.d.ts.map