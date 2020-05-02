/**
 * 平面上に雲模様を描画するシェーダー
 */
export default () => {
    // language=GLSL
    return `      
#define PHONG

#include <mesh_phong_uniform>

//varying
varying vec2 uvPosition;
#include <mesh_position_varying>

//user settings
#include <time_animation_uniform_chunk>
uniform float scale;
uniform float cloudVolume;
uniform float cloudTransformSpeed;
uniform vec3 skyColor;
uniform float cloudBottomVolume;
uniform float cloudBottomSaturation;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_uniform_chunk>
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


/**
 * Based on Morgan McGuire @morgan3d
 * https://www.shadertoy.com/view/4dS3Wd
 */ 
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 7

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}



void main() {
    #include <clipping_planes_fragment>
    #include <mesh_phong_diffuse_color>
    #include <logdepthbuf_fragment>
    
    #include <map_fragment_begin_chunk>
    #include <map_fragment_chunk>
    #include <color_fragment>
    
    vec2 st = uvPosition * scale;
    st += time;

    vec2 q = vec2(0.);
    q.x = fbm( st + time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm( st + q + vec2(1.7,9.2)+ 0.15*time * cloudTransformSpeed);
    r.y = fbm( st + q + vec2(8.3,2.8)+ 0.126*time * cloudTransformSpeed);
    float f = fbm(st+r);

    vec3 cloudColor = diffuseColor.rgb;
    
    float volume;
    float alpha = 0.0;
    volume = (f*f)*cloudVolume*0.03;
    alpha += volume;
    volume = (f*f*f*f*f)*cloudVolume;
    alpha += volume;
    alpha = clamp(alpha,0.0,1.0);
    
    cloudColor = mix(cloudColor,
                skyColor*cloudBottomSaturation,
                clamp(volume*cloudBottomVolume,0.0,1.0));

    diffuseColor.rgb = cloudColor;
    diffuseColor.a *= alpha;
    
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
