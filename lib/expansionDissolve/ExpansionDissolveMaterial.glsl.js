"use strict";
/**
 * メッシュが膨張しながら消えるエフェクト
 *
 * @see : https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshphong.glsl.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fragment = exports.vertex = void 0;
// language=GLSL
exports.vertex = `
#define PHONG

varying vec3 vViewPosition;
varying vec2 uvPosition;
#include <mesh_position_varying>
#include <surface_normal_varying_chunk>
#include <__expansion_uniform_chunk>
#include <tiling_fbm_uniform_chunk>
uniform float scaleMax;
uniform float time;
uniform float progress;
varying float vFbm;
#include <tiling_fbm_function_chunk>

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
    #include <mesh_position_vertex>
    uvPosition = uv;

    #include <uv_vertex>
    #include <color_vertex>
    #include <morphcolor_vertex>
    #include <batching_vertex>

    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>
    #include <normal_vertex>

    #include <surface_normal_vertex_chunk>

    #include <begin_vertex>
    
    vec2 uvFBM = uvPosition;
    uvFBM.x = (
         uvFBM.y > 0.99 
      || uvFBM.y < 0.01
    ) 
      ? 0.5
      : uvFBM.x;
        
    vec2 q = vec2(0.0);
    q.x = fbm( uvFBM + vec2(1.7,9.2) +.16  * time );
    q.y = fbm( uvFBM + vec2(8.3,2.8) +.356 * time );

    float bottom = clamp(progress-0.5, 0.0, 0.5) *2.0;
    
    vec2 pos = uvFBM * tiles;
    float noise = fbm( pos + q ) * progress;
    vFbm = clamp( noise + bottom, 0.0, 1.0);
    vec3 vExpansion = normal * vFbm * scaleMax;
    transformed += vExpansion;
    
    #include <morphtarget_vertex>
    #include <skinning_vertex>
    #include <displacementmap_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>

    vViewPosition = - mvPosition.xyz;

    #include <worldpos_vertex>
    #include <envmap_vertex>
    #include <shadowmap_vertex>
    #include <fog_vertex>

}
`;
// language=GLSL
exports.fragment = `
#define PHONG

#include <mesh_phong_uniform>
varying vec2 uvPosition;
#include <mesh_position_varying>

varying float vFbm;
uniform float progress;
uniform vec3 dissolveColor;
uniform vec3 dissolveOutColor;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
// #include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
    #include <clipping_planes_fragment>
  
    #include <mesh_phong_diffuse_color>
    
    #include <logdepthbuf_fragment>
    #include <__ShaderMaterial__map_fragment_begin_chunk>
    #include <map_fragment>
    #include <color_fragment>
    
    diffuseColor.rgb += dissolveColor.rgb * sin(progress*PI);
    diffuseColor.rgb = mix (diffuseColor.rgb, dissolveOutColor.rgb, vFbm );
    diffuseColor.a -= vFbm;
    #include <mesh_phong_switching_alpha_map>

    // #include <alphamap_fragment>
    #include <alphatest_fragment>
    #include <alphahash_fragment>
    #include <specularmap_fragment>
    #include <normal_fragment_begin>
    #include <normal_fragment_maps>
    #include <emissivemap_fragment>

    // accumulation
    #include <lights_phong_fragment>
    #include <lights_fragment_begin>
    #include <lights_fragment_maps>
    #include <lights_fragment_end>

    // modulation
    #include <aomap_fragment>

    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
    
    #include <envmap_fragment>
    #include <opaque_fragment>
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>
    #include <dithering_fragment>
    
}`;
