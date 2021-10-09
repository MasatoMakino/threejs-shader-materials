/**
 * https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderLib/meshphong_vert.glsl.js
 */
export default () => {
    // language=GLSL
    return `
#define PHONG

varying vec3 vViewPosition;
varying vec2 uvPosition;
#include <mesh_position_varying>
#include <surface_normal_varying_chunk>
#include <__expansion_uniform_chunk>

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
    #include <surface_normal_vertex_chunk>
    #include <normal_vertex>
    
    #include <begin_vertex>
    
    #include <__expansion_vertex_chunk>
    
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
