export default () => {
  return `
#define PHONG

//varying
varying vec2 uvPosition; 
#include <mesh_position_varying>
#include <tiling_fbm_uniform_chunk>
uniform float progress;
uniform vec3 edgeColor;
uniform float edgeWeight;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

#include <tiling_fbm_function_chunk>

void main()
{
    #include <clipping_planes_fragment>
    #include <mesh_phong_diffuse_color>
    #include <logdepthbuf_fragment>
    #include <map_fragment>
    #include <color_fragment>
    
    vec2 uv = uvPosition * tiles;
    float uVy = uv.y;
    uv *= TILES;

    float transformSpeed = 1.9;
    vec2 q = vec2(0.0);
    q.x = fbm( uv + vec2(1.7,9.2) -.38  * time * transformSpeed);
    q.y = fbm( uv + vec2(8.3,2.8) -.126 * time * transformSpeed);

    float fbmVal = fbm(uv + q);
    fbmVal += 1.0-(uVy * 1.0 );
    fbmVal *= 1.0-uVy;
    
    vec3 color = vec3(1.0, 0.4, 0.6);
    
    //strength of fire.
    float st = 0.5;
    float bri = smoothstep( st-0.4, st, fbmVal );
    
    //bloom of fire. 
    float bloom = 0.95;
    float bloomVal = smoothstep( bloom-0.4, bloom, fbmVal );
    color += bloomVal;

    diffuseColor.rgb = color;
    diffuseColor.a *= bri;
    
    #include <mesh_phong_switching_alpha_map>
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
    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>
    #include <dithering_fragment>
}            
    `;
};
