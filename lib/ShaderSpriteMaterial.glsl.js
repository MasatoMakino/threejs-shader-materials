"use strict";
/**
 * SpriteMaterialに準じたシェーダー
 *
 * @see : https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/sprite.glsl.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fragment = exports.vertex = void 0;
// language=GLSL
exports.vertex = `
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
}`;
// language=GLSL
exports.fragment = `
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
}`;
