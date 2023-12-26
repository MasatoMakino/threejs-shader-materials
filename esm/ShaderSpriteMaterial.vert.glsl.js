/**
 * https://raw.githubusercontent.com/mrdoob/three.js/dev/src/renderers/shaders/ShaderLib/sprite_vert.glsl.js
 */
export default () => {
    // language=GLSL
    return /* GLSL */ `
#include <sprite_vertex_uniform_chunk>
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
	#include <uv_vertex>
	#include <sprite_mv_position_chunk>

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}
`;
};
