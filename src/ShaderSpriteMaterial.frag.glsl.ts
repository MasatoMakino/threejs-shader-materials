/**
 * https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderLib/sprite_frag.glsl.js
 */
export default () => {
  // language=GLSL
  return `
#include <sprite_fragment_uniform_chunk>
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
    #include <clipping_planes_fragment>
    #include <sprite_diffuse_color_chunk>

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphatest_fragment>
    outgoingLight = diffuseColor.rgb;
    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}
`;
};
