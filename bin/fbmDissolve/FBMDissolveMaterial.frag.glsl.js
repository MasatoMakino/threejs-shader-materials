export default () => {
    return `
#define PHONG

#include <mesh_phong_uniform>

//varying
varying vec2 uvPosition; 
#include <mesh_position_varying>
uniform float tiles;  
uniform float progress;
uniform vec3 edgeColor;
uniform float edgeWeight;
uniform float hashLoop;
uniform float amp;

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

// Based On Dave_Hoskins 
// https://www.shadertoy.com/view/4dlGW2

float hash(in vec2 p, in float hashLoop)
{
    p = mod(p, hashLoop);
    return fract(
        sin(
            dot(p, vec2(27.16898, 38.90563))
        ) * 5151.5473453
    );
}

float noise(in vec2 p, in float hashLoop)
{
    p *= hashLoop;
    vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);

    p = floor(p);
    float a = hash(p, hashLoop);
    float b = hash(p + vec2(1.0, 0.0), hashLoop);
    float c = hash(p + vec2(0.0, 1.0), hashLoop);
    float d = hash(p + vec2(1.0, 1.0), hashLoop);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Based On Dave_Hoskins 
// https://www.shadertoy.com/view/4dlGW2

#define NUM_OCTAVES 3

float fbm(in vec2 p)
{
    float v = 0.0;
    
    p = mod(p, hashLoop);
    float a = amp;
    float hashLoopVal = hashLoop;
    
    for (int i = 0; i < NUM_OCTAVES; i++){
        v += noise(p, hashLoopVal) * a;
        a *= .5;
        hashLoopVal *= 2.0;
    }
    return v;
}

void main()
{
    #include <clipping_planes_fragment>
    #include <mesh_phong_diffuse_color>
    #include <logdepthbuf_fragment>
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
