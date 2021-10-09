export default () => {
  // language=GLSL
  return `
#define PHONG

#include <mesh_phong_uniform>
varying vec2 uvPosition;
#include <mesh_position_varying>

#include <tiling_fbm_uniform_chunk>
#include <time_animation_uniform_chunk>

uniform float strength;
uniform float bloom;

#include <surface_normal_varying_chunk>
uniform float rimStrength;
uniform float rimPow;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
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

#include <tiling_fbm_function_chunk>

void main()
{
    #include <clipping_planes_fragment>
  
    #include <mesh_phong_diffuse_color>
    
    #include <logdepthbuf_fragment>
    #include <__ShaderMaterial__map_fragment_begin_chunk>
    #include <map_fragment>
    #include <color_fragment>
    
    vec2 uv = uvPosition;
    float uVy = uv.y;
    uv *= tiles;

    vec2 q = vec2(0.0);
    q.x = fbm( uv + vec2(1.7,9.2) +.16  * time );
    q.y = fbm( uv + vec2(8.3,2.8) +.356 * time );

    float fbmVal = fbm(uv + q);
    fbmVal += 1.0-(uVy * 1.0 );
    fbmVal *= 1.0-uVy;
    
    vec3 viewDir = normalize(vViewPosition);    
    float rimGlow = 1.0 - max(0.0, dot(surfaceNormal, viewDir));
    rimGlow = pow(rimGlow, rimPow) * rimStrength;
    rimGlow = clamp( rimGlow, 0.0, 1.0);
    fbmVal *= 1.0-rimGlow;
    
    vec3 color = diffuseColor.rgb;
    
    float st = 1.0 - strength;
    float bri = smoothstep( max( st - 0.4, 0.0 ), st, fbmVal );
    
    float blm = 1.0 - bloom;
    float bloomVal = smoothstep( blm - 0.4, blm, fbmVal );
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
}`;
};
