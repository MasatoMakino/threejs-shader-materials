"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderLib/meshphong_vert.glsl.js
 */
exports.default = () => {
    // language=GLSL
    return `
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

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
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

#include <tiling_fbm_function_chunk>

void main() {
    #include <mesh_position_vertex>
    uvPosition = uv;

    #include <uv_vertex>
    #include <uv2_vertex>
    #include <color_vertex>
    
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
};
