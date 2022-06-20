/**
 * Cellular Noise Fragment Shader
 */
export default () => {
    // language=GLSL
    return `
#define PHONG

#include <mesh_phong_uniform>
varying vec2 uvPosition;
#include <mesh_position_varying>

uniform float grid;
uniform float divisionScaleX;
#include <time_animation_uniform_chunk>

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

vec2 rand2D(vec2 p, vec2 scale) {
    p = mod(p, scale);
    const float a = 12.9898, b = 78.233, c = 43758.5453;
    const float a2 = 26.7, b2 = 14.879;
    
    highp float dt = dot(p, vec2(a, b)), sn = mod(dt, PI);
    highp float dt2 = dot(p, vec2(a2, b2)), sn2 = mod(dt2, PI);
    return fract(sin(vec2(dt, dt2)) * c);
}

/*!
 * Cellular Noise
 *
 * The inherits function is :
 * Author : patriciogv
 * see https://thebookofshaders.com/12/
 * LICENSE : https://github.com/patriciogonzalezvivo/thebookofshaders/issues/235
 */
float cellularNoise(vec2 uv, float grid, float divisionScaleX, float time){
  
    vec2 scale = grid * vec2 ( divisionScaleX, 1.0 );
    uv *= scale;
    
    vec2 i_uv = floor(uv);
    vec2 f_uv = fract(uv);
    
    float minDist = 1.;
    
    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = rand2D(i_uv + neighbor, scale);
            
            point = 0.5 + 0.5 * sin(time + PI2 * point);
            
            vec2 diff = neighbor + point - f_uv;
            float dist = length(diff);
            
            minDist = min(minDist, dist);
        }
    }
    
    return minDist;
}

void main() {
    #include <clipping_planes_fragment>
  
    #include <mesh_phong_diffuse_color>
    
    #include <logdepthbuf_fragment>
    #include <__ShaderMaterial__map_fragment_begin_chunk>
    #include <map_fragment>
    #include <color_fragment>

    float dist = cellularNoise( mapUV, grid, divisionScaleX, time );
    diffuseColor.rgb *= dist;
    diffuseColor.a *= dist;
    
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
