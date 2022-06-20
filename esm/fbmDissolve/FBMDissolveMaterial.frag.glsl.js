export default () => {
    // language=GLSL
    return `
#define PHONG

#include <mesh_phong_uniform>
varying vec2 uvPosition;
#include <mesh_position_varying>

#include <tiling_fbm_uniform_chunk>
uniform float progress;
uniform vec3 edgeColor;
uniform float edgeWeight;
#include <tiling_fbm_function_chunk>

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
// #include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
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
void main()
{
    #include <clipping_planes_fragment>
  
    #include <mesh_phong_diffuse_color>
    
    #include <logdepthbuf_fragment>
    #include <__ShaderMaterial__map_fragment_begin_chunk>
    #include <map_fragment>
    #include <color_fragment>
    
    vec2 uv = uvPosition * tiles;

    float fbmVal = fbm(uv);
    float bri = 1.0 - smoothstep( progress-0.01, progress, fbmVal );

    float edge = 
          smoothstep( progress-edgeWeight, progress, fbmVal )
        - smoothstep( progress, progress+edgeWeight, fbmVal );
    edge = clamp( edge, 0.0, 1.0 );

    vec3 col = diffuseColor.rgb;
    col += edgeColor * edge;

    diffuseColor.rgb = col;
    diffuseColor.a *= bri;
    
    #include <mesh_phong_switching_alpha_map>

    // #include <alphamap_fragment>
    #include <alphatest_fragment>
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
    #include <output_fragment>
    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>
    #include <dithering_fragment>
}`;
};
