(()=>{"use strict";var e,n={375:(e,n,i)=>{var t=i(753);class a{static getChunkName(){return""}static getChunk(){return""}static getDefines(){return{}}static registerChunk(){t.vxI&&null==t.vxI[this.getChunkName()]&&(t.vxI[this.getChunkName()]=this.getChunk())}static getUniform(){return{}}}class r extends a{static registerChunk(){s.registerChunk(),u.registerChunk()}static getDefines(){return{USE_EXPANSION:!1}}static getUniform(){return{expansionStrength:{value:0}}}}class s extends a{static getChunkName(){return"__expansion_uniform_chunk"}static getChunk(){return"\n    #ifdef USE_EXPANSION\n      uniform float expansionStrength;\n    #endif\n    "}}class u extends a{static getChunkName(){return"__expansion_vertex_chunk"}static getChunk(){return"\n    #ifdef USE_EXPANSION\n      transformed += normal * expansionStrength;\n    #endif\n    "}}class l extends a{static registerChunk(){super.registerChunk(),o.registerChunk()}}class o extends a{static getChunkName(){return"hex_grid_function_chunk"}static getChunk(){return"\n    /**\n     * ヘックスの縁までの距離を取得する。\n     */\n    float hexDist(vec2 p)\n    {\n        p = abs(p);\n        float d = dot(p, normalize(vec2(1.0, 1.73)));\n        return max(d, p.x);\n    }\n    \n    /**\n     * uv座標からヘックス固有のxy座標とIDを取得する\n     *\n     * x : ヘックスの中心点からの回転角\n     * y : ヘックスの縁までの距離\n     * zw : ヘックスのID\n     */\n    vec4 hexCoords(vec2 uv)\n    {\n        vec2 r = vec2(1.0, 1.73);\n        vec2 h = r * 0.5;\n        vec2 a = mod(uv, r) - h;\n        vec2 b = mod(uv - h, r) - h;\n    \n        vec2 gv = length(a) < length(b) ? a : b;\n        vec2 id = uv - gv;\n    \n        float x = atan(gv.x, gv.y);\n        float y = 0.5 - hexDist(gv);\n    \n        return vec4(x, y, id);\n    }\n    "}}var c,d=i(710);class m extends a{static registerChunk(){super.registerChunk(),g.registerChunk(),h.registerChunk(),p.registerChunk()}static getUniform(){return d.LlO.merge([super.getUniform(),{hasMap:{value:!1},map:{value:null}}])}static getMap(e){return e.uniforms.map.value}static setMap(e,n){e.uniforms.map.value=n,e.uniforms.hasMap.value=null!=n}}class g extends a{static getChunkName(){return"map_uniform_chunk"}static getChunk(){return"\n      uniform bool hasMap;\n      uniform sampler2D map;\n    "}}class h extends a{static getChunkName(){return"map_fragment_chunk"}static getChunk(){return"\n      if( hasMap ){\n        vec4 texelColor = texture2D( map, mapUV );\n        diffuseColor *= texelColor;\n      }\n    "}}class p extends a{static getChunkName(){return"__ShaderMaterial__map_fragment_begin_chunk"}static getChunk(){return"\n      vec2 mapUV = uvPosition;\n    "}}class f extends a{static registerChunk(){_.registerChunk(),v.registerChunk()}static getUniform(){return{division:{value:32},divisionScaleX:{value:1}}}}class _ extends a{static getChunkName(){return"repeat_pattern_uniform_chunk"}static getChunk(){return"\n      uniform float division;\n      uniform float divisionScaleX;\n    "}}class v extends a{static getChunkName(){return"repeat_pattern_fragment_chunk"}static getChunk(){return"\n      vec2 uv =\n        uvPosition\n        * vec2( division * divisionScaleX, division);\n    "}}class k extends f{static registerChunk(){super.registerChunk(),C.registerChunk(),x.registerChunk()}static getUniform(){return d.LlO.merge([super.getUniform(),{hasMaskTexture:{value:!1},maskTexture:{value:null}}])}static getMaskTexture(e){return e.uniforms.maskTexture.value}static setMaskTexture(e,n){e.uniforms.maskTexture.value=n,e.uniforms.hasMaskTexture.value=null!=n}}class C extends a{static getChunkName(){return"mask_map_uniform_chunk"}static getChunk(){return"\n      uniform bool hasMaskTexture;\n      uniform sampler2D maskTexture;\n    "}}class x extends a{static getChunkName(){return"mask_map_fragment_chunk"}static getChunk(){return"\n      float mask = 1.0;\n      if( hasMaskTexture ){\n        vec2 uVm = id / vec2( division * divisionScaleX, division);\n        mask = texture2D( maskTexture, uVm ).g;\n      }\n    "}}class M extends a{static registerChunk(){y.registerChunk(),U.registerChunk(),S.registerChunk(),b.registerChunk(),w.registerChunk()}static getDefines(){return{USE_MESH_POSITION:!1}}}class y extends a{static getChunkName(){return"mesh_phong_uniform"}static getChunk(){return"\n      uniform vec3 diffuse;\n      uniform vec3 emissive;\n      uniform vec3 specular;\n      uniform float shininess;\n      uniform float opacity;\n      uniform bool hasAlphaMap;\n      uniform sampler2D alphaMap;\n    "}}class U extends a{static getChunkName(){return"mesh_phong_diffuse_color"}static getChunk(){return"\n    vec4 diffuseColor = vec4( diffuse, opacity );\n    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n    vec3 totalEmissiveRadiance = emissive;\n    "}}class S extends a{static getChunkName(){return"mesh_phong_switching_alpha_map"}static getChunk(){return"\n      if( hasAlphaMap ){\n        diffuseColor.a *= texture2D( alphaMap, mapUV ).g;\n      }\n    "}}class b extends a{static getChunkName(){return"mesh_position_varying"}static getChunk(){return"\n    #ifdef USE_MESH_POSITION\n    varying vec3 meshPosition;\n    #endif\n    "}}class w extends a{static getChunkName(){return"mesh_position_vertex"}static getChunk(){return"\n    #ifdef USE_MESH_POSITION\n    meshPosition = position;\n    #endif\n    "}}class E extends a{static registerChunk(){I.registerChunk()}static getUniform(){return{isReversed:{value:!1}}}}class I extends a{static getChunkName(){return"reversible_uniform_chunk"}static getChunk(){return"\n      uniform bool isReversed;\n    "}}class N extends a{static registerChunk(){O.registerChunk(),G.registerChunk()}static getDefines(){return{USE_SURFACE_NORMAL:!1}}static getUniform(){return{}}}class O extends a{static getChunkName(){return"surface_normal_varying_chunk"}static getChunk(){return"\n    #ifdef USE_SURFACE_NORMAL\n      varying vec3 surfaceNormal;\n    #endif\n    "}}class G extends a{static getChunkName(){return"surface_normal_vertex_chunk"}static getChunk(){return"\n    #ifdef USE_SURFACE_NORMAL\n      surfaceNormal = normalize( transformedNormal );\n    #endif\n    "}}!function(e){e[e.vertical=4]="vertical",e[e.horizontal=3]="horizontal",e[e.radial=5]="radial"}(c||(c={}));class P extends d.BKk{constructor(e,n,i){super(i),this._opacity=1,i??={},e??="\n#define PHONG\n\nvarying vec3 vViewPosition;\n\n//added by threejs-shader-materials\nvarying vec2 uvPosition;\n#include <mesh_position_varying>\n#include <surface_normal_varying_chunk>\n#include <__expansion_uniform_chunk>\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n    #include <mesh_position_vertex>\n    uvPosition = uv;\n\n    #include <uv_vertex>\n    #include <color_vertex>\n    #include <morphcolor_vertex>\n    #include <batching_vertex>\n    \n    #include <beginnormal_vertex>\n    #include <morphnormal_vertex>\n    #include <skinbase_vertex>\n    #include <skinnormal_vertex>\n    #include <defaultnormal_vertex>\n    \n    #include <surface_normal_vertex_chunk>\n\n    #include <normal_vertex>\n    \n    #include <begin_vertex>\n    \n    #include <__expansion_vertex_chunk>\n    \n    #include <morphtarget_vertex>\n    #include <skinning_vertex>\n    #include <displacementmap_vertex>\n    #include <project_vertex>\n    #include <logdepthbuf_vertex>\n    #include <clipping_planes_vertex>\n    \n    vViewPosition = - mvPosition.xyz;\n\n    #include <worldpos_vertex>\n    #include <envmap_vertex>\n    #include <shadowmap_vertex>\n    #include <fog_vertex>\n\n}",n??="\n#define PHONG\n\n#include <mesh_phong_uniform>\n\n//added by threejs-shader-materials\n#include <mesh_position_varying>\nvarying vec2 uvPosition;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n    #include <clipping_planes_fragment>\n    \n    #include <mesh_phong_diffuse_color>\n    \n    #include <logdepthbuf_fragment>\n    #include <__ShaderMaterial__map_fragment_begin_chunk>\n    #include <map_fragment>\n    #include <color_fragment>\n    // #include <alphamap_fragment>\n    #include <mesh_phong_switching_alpha_map>\n    #include <alphatest_fragment>\n    #include <alphahash_fragment>\n    #include <specularmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <emissivemap_fragment>\n\n    // accumulation\n    #include <lights_phong_fragment>\n    #include <lights_fragment_begin>\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n\n    // modulation\n    #include <aomap_fragment>\n\n    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n    \n    #include <envmap_fragment>\n    #include <opaque_fragment>\n    #include <tonemapping_fragment>\n    #include <colorspace_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n\n}",this.initChunks(),this.initUniforms(),this.initDefines(),this.vertexShader=e,this.fragmentShader=n,this.initDefaultSetting(i)}static getBasicUniforms(){return d.LlO.merge([t.fCn.common,t.fCn.specularmap,t.fCn.envmap,t.fCn.aomap,t.fCn.lightmap,t.fCn.emissivemap,t.fCn.bumpmap,t.fCn.normalmap,t.fCn.displacementmap,t.fCn.gradientmap,t.fCn.fog,t.fCn.lights,{emissive:{value:new d.Q1f(0)},specular:{value:new d.Q1f(1118481)},shininess:{value:30},hasAlphaMap:{value:!1}},N.getUniform(),r.getUniform(),m.getUniform()])}initChunks(){M.registerChunk(),N.registerChunk(),r.registerChunk(),m.registerChunk()}initUniforms(){this.uniforms=d.LlO.merge([P.getBasicUniforms(),r.getUniform(),{}])}initDefines(){this.defines=Object.assign({},M.getDefines(),N.getDefines(),r.getDefines(),this.defines)}initDefaultSetting(e){this.uniformOpacity=this._opacity,this.lights=!0,null==e?.transparent&&(this.transparent=!0)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get opacity(){return this.uniformOpacity}get uniformOpacity(){return this._opacity}set opacity(e){this.uniformOpacity=e}set uniformOpacity(e){this._opacity=e,this.uniforms?.opacity&&(this.uniforms.opacity.value=e)}get emissive(){return this.uniforms.emissive.value}set emissive(e){this.uniforms.emissive.value=e}get map(){return m.getMap(this)}set map(e){m.setMap(this,e),this.onSetMap(e)}onSetMap(e){}get alphaMap(){return this.uniforms.alphaMap.value}set alphaMap(e){this.uniforms.alphaMap.value=e,this.uniforms.hasAlphaMap.value=null!=e,this.onSetAlphaMap(e)}onSetAlphaMap(e){}startGlow(){this.alphaTest=0,this.depthWrite=!1,this.blending=d.EZo}}d.BKk,d.BKk,d.BKk;class D extends P{get division(){return this.uniforms.division.value}set division(e){this.uniforms.division.value=e}get divisionScaleX(){return this.uniforms.divisionScaleX.value}set divisionScaleX(e){this.uniforms.divisionScaleX.value=e}get isReversed(){return this.uniforms.isReversed.value}set isReversed(e){this.uniforms.isReversed.value=e}get maskTexture(){return k.getMaskTexture(this)}set maskTexture(e){k.setMaskTexture(this,e)}initChunks(){super.initChunks(),k.registerChunk(),E.registerChunk()}static getBasicUniforms(){return d.LlO.merge([P.getBasicUniforms(),E.getUniform(),k.getUniform(),f.getUniform()])}}var A=i(603);class L extends D{get progress(){return this.uniforms.progress.value}set progress(e){this.uniforms.progress.value=e}get delay(){return this.uniforms.delay.value}set delay(e){this.uniforms.delay.value=e}get isAscending(){return this.uniforms.isAscending.value}set isAscending(e){this.uniforms.isAscending.value=e}get gridWeight(){return this.uniforms.gridWeight.value}set gridWeight(e){this.uniforms.gridWeight.value=e}get gridEmissive(){return this.uniforms.gridEmissive.value}set gridEmissive(e){this.uniforms.gridEmissive.value=e}get gridEmissiveWeight(){return this.uniforms.gridEmissiveWeight.value}set gridEmissiveWeight(e){this.uniforms.gridEmissiveWeight.value=e}constructor(e){super(null,"\n#define PHONG\n\n#include <mesh_phong_uniform>\nvarying vec2 uvPosition;\n#include <mesh_position_varying>\n\n//user settings\n#include <repeat_pattern_uniform_chunk>\n#include <mask_map_uniform_chunk>\n#include <reversible_uniform_chunk>\nuniform float progress;\nuniform float delay;\nuniform float gridWeight;\nuniform bool isAscending;\n\nuniform vec3 gridEmissive;\nuniform float gridEmissiveWeight;\n#include <hex_grid_function_chunk>\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nfloat reverse( float val, bool isReversed){\n  return isReversed ? 1.0 - val : val;\n}\nvoid main() {\n    #include <clipping_planes_fragment>\n  \n    #include <mesh_phong_diffuse_color>\n    \n    #include <logdepthbuf_fragment>\n    #include <__ShaderMaterial__map_fragment_begin_chunk>\n    #include <map_fragment>\n    #include <color_fragment>\n\n    #include <repeat_pattern_fragment_chunk>    \n    vec4 hc = hexCoords( uv );\n    vec2 id = hc.zw;\n\n    #include <mask_map_fragment_chunk>\n  \n    float range = 1.0 - delay;\n    float rateY = isAscending \n      ? ( division-id.y ) / division\n      : id.y  / division;\n  \n    float currentProgress = progress - (rateY * delay);\n    currentProgress /= range;\n    currentProgress = clamp( currentProgress, 0.0, 1.0);\n  \n    float w = gridWeight + currentProgress / 2.0 + (1.0 - mask);\n    w = clamp( w, 0.0, 1.0);\n    float margin = clamp ( w * 0.33, 0.00, 0.02 );\n  \n    float gridLine = smoothstep(w, w + margin, hc.y);\n    gridLine =  reverse ( gridLine , isReversed);\n    diffuseColor.a *= gridLine ;\n    \n    float emmesiveWeight = currentProgress / 2.0 * gridEmissiveWeight;\n    emmesiveWeight =  reverse ( emmesiveWeight, isReversed );\n    float emissiveVal = smoothstep(emmesiveWeight, emmesiveWeight + margin, hc.y);\n    emissiveVal = 1.0 - emissiveVal;\n    diffuseColor.rgb += gridEmissive * emissiveVal;\n\n    #include <mesh_phong_switching_alpha_map>\n\n    // #include <alphamap_fragment>\n    #include <alphatest_fragment>\n    #include <alphahash_fragment>\n    #include <specularmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <emissivemap_fragment>\n\n    // accumulation\n    #include <lights_phong_fragment>\n    #include <lights_fragment_begin>\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n\n    // modulation\n    #include <aomap_fragment>\n\n    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n    \n    #include <envmap_fragment>\n    #include <opaque_fragment>\n    #include <tonemapping_fragment>\n    #include <colorspace_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n    \n}",e)}initUniforms(){this.uniforms=d.LlO.merge([D.getBasicUniforms(),{progress:{value:0},delay:{value:.8},gridWeight:{value:0},isAscending:{value:!0},gridEmissive:{value:new d.Q1f(0)},gridEmissiveWeight:{value:2.5}}])}initChunks(){super.initChunks(),l.registerChunk()}}class R{static initColorGUI(e,n,i="color"){const t={},a=n[i];return t[i]=a.getHex(),e.addColor(t,i).onChange((e=>{a.setHex(e)})),t}static initColorNodeGUI(e,n,i="color"){const t={},a=n[i];return t[i]=a.value.getHex(),e.addColor(t,i).onChange((e=>{a.value.setHex(e)})),t}static initBasicMaterialGUI(e,n,i="Material"){const t=e.addFolder(i);return this.initMaterialFolder(t,n),t.open(),t}static initMaterialGUI(e,n,i="Material"){const t=this.initBasicMaterialGUI(e,n,i);this.initColorGUI(t,n,"emissive")}static initMaterialFolder(e,n,i=!1){this.initColorGUI(e,n),e.add(n,"transparent");const t=i?"opacity":"uniformOpacity";e.add(n,t,0,1)}static initSpriteMaterialGUI(e,n,i="Material"){const t=e.addFolder(i);this.initMaterialFolder(t,n),t.open()}static initGridMaterialGUI(e,n){this.initMaterialGUI(e,n);const i={mask:"",alphaMap:""},t=e.addFolder("WavyGridMaterial");return t.add(n,"isReversed"),t.add(n,"division",2,256).step(1),t.add(n,"divisionScaleX",0,4).step(1),t.add(i,"mask",{none:"",earth:"./textures/landmask.png"}).onChange((e=>{n.maskTexture=""===e?null:(new d.Tap).load(e)})),t.add(i,"alphaMap",{none:"",earth:"./textures/landmask.png"}).onChange((e=>{n.alphaMap=""===e?null:(new d.Tap).load(e)})),t.open(),t}static initWavyMaterialGUI(e,n){const i=this.initGridMaterialGUI(e,n).addFolder("WavyAnimation");i.add(n,"isAnimate"),i.add(n,"speed",-2,2),i.add(n,"waveFrequency",0,1),i.add(n,"wavePow",0,4),i.add(n,"direction",{horizontal:c.horizontal,vertical:c.vertical,radial:c.radial}),i.add(n,"raisedBottom",0,1),i.open()}static initAnimationGUI(e,n,i="Animation"){const t=e.addFolder(i);t.add(n,"isAnimate"),t.add(n,"speed",-2,2),t.open()}static initRimGUI(e,n,i="Rim Effect Material"){const t=e.addFolder(i);R.initColorGUI(t,n,"rimColor"),t.add(n,"rimStrength",0,4).step(.01),t.add(n,"rimPow",0,4).step(.01),R.initColorGUI(t,n,"insideColor"),t.add(n,"insideStrength",0,4).step(.01),t.add(n,"insidePow",0,8).step(.01),t.open()}static initExpansionGUI(e,n,i="ExpansionMaterial"){const t=e.addFolder("ExpansionMaterial");t.add(n,"expansionStrength",-12,12).step(.01),t.open()}static initFBMTilingGUI(e,n,i="FBM Tiling"){const t=e.addFolder("FBM Tiling");t.add(n,"tiles",1,8).step(1),t.add(n,"hashLoop",2,16).step(1),t.add(n,"amp",0,2).step(.01),t.open()}static initSkyGUI(e,n,i,t){const a={turbidity:10,rayleigh:.15,mieCoefficient:.005,mieDirectionalG:.8,inclination:.07,azimuth:.25,exposure:.75},r=4e5;function s(){const e=n.material.uniforms;e.turbidity.value=a.turbidity,e.rayleigh.value=a.rayleigh,e.mieCoefficient.value=a.mieCoefficient,e.mieDirectionalG.value=a.mieDirectionalG;const s=Math.PI*(a.inclination-.5),u=2*Math.PI*(a.azimuth-.5);i.position.x=r*Math.cos(u),i.position.y=r*Math.sin(u)*Math.sin(s),i.position.z=r*Math.sin(u)*Math.cos(s),e.sunPosition.value.copy(i.position),t.toneMappingExposure=a.exposure}s();const u=e.addFolder("Sky");u.add(a,"turbidity",1,20,.1).onChange(s),u.add(a,"rayleigh",0,4,.001).onChange(s),u.add(a,"mieCoefficient",0,.1,.001).onChange(s),u.add(a,"mieDirectionalG",0,1,.001).onChange(s),u.add(a,"inclination",0,1,1e-4).onChange(s),u.add(a,"azimuth",0,1,1e-4).onChange(s),u.add(a,"exposure",0,1,1e-4).onChange(s),u.open()}}var W=i(580),T=i(785);class F{static initScene(){return new d.Z58}static initLight(e){const n=new d.$p8(16777215,Math.PI);return e.add(n),n}static initCamera(e,n,i,t=400){const a=new d.ubm(45,n/i,1,t);return a.position.set(0,0,100),a.updateMatrixWorld(!1),e.add(a),a}static initControl(e,n){let i;null!=n&&(i=n.domElement);const t=new W.N(e,i);return t.update(),t}static initRenderer(e,n,i=0,a=!0){const r=new t.JeP({antialias:a});return r.setClearColor(new d.Q1f(i)),r.setSize(e,n),r.setPixelRatio(window.devicePixelRatio),r.domElement.style.backgroundColor="#"+i.toString(16).padStart(6,"0"),document.body.appendChild(r.domElement),console.log("three.js revision: ",d.sPf),r}static initHelper(e){const n=new d.IzY(30);e.add(n)}static initSky(e,n,i){i.toneMapping=d.FV;const t=new d.eaF(new d.Gu$(2e4,16,8),new d.V9B({color:16777215}));t.position.y=-7e5,t.visible=!1,e.add(t);const a=new T.m;a.scale.setScalar(45e3),e.add(a),R.initSkyGUI(n,a,t,i)}}var j=i(638);class B{constructor(){const e=F.initScene();e.fog=new d.jUj(0,80,160),F.initLight(e);const n=F.initCamera(e,640,480),i=F.initRenderer(640,480);F.initControl(n,i),F.initHelper(e);const t=this.initObject(e);A.w.on("tick",(t=>{i.render(e,n)})),this.initGUI(t)}initObject(e){const n=new d.HiM(16777215,2e3);n.position.set(10,20,30),e.add(n);const i=new d.F1l(n);e.add(i);const t=new d.Gu$(10,64,64),a=new L({fog:void 0!==e.fog});a.color=new d.Q1f(4473924),a.delay=.8,a.gridEmissive=new d.Q1f(10092441);const r=new d.eaF(t,a);return e.add(r),a}initGUI(e){const n=new j.Ay;R.initGridMaterialGUI(n,e),this.initGUIMaterial(n,e)}initGUIMaterial(e,n){const i=e.addFolder("HexDissolveMaterial");i.add(n,"progress",0,1).step(.01),i.add(n,"delay",0,1).step(.01),i.add(n,"gridWeight",0,.5).step(.01),i.add(n,"isAscending"),R.initColorGUI(i,n,"gridEmissive"),i.add(n,"gridEmissiveWeight",0,3).step(.01),i.open()}}window.onload=()=>{new B}}},i={};function t(e){var a=i[e];if(void 0!==a)return a.exports;var r=i[e]={exports:{}};return n[e](r,r.exports,t),r.exports}t.m=n,e=[],t.O=(n,i,a,r)=>{if(!i){var s=1/0;for(c=0;c<e.length;c++){for(var[i,a,r]=e[c],u=!0,l=0;l<i.length;l++)(!1&r||s>=r)&&Object.keys(t.O).every((e=>t.O[e](i[l])))?i.splice(l--,1):(u=!1,r<s&&(s=r));if(u){e.splice(c--,1);var o=a();void 0!==o&&(n=o)}}return n}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[i,a,r]},t.d=(e,n)=>{for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.j=652,(()=>{var e={652:0};t.O.j=n=>0===e[n];var n=(n,i)=>{var a,r,[s,u,l]=i,o=0;if(s.some((n=>0!==e[n]))){for(a in u)t.o(u,a)&&(t.m[a]=u[a]);if(l)var c=l(t)}for(n&&n(i);o<s.length;o++)r=s[o],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(c)},i=self.webpackChunk_masatomakino_threejs_shader_materials=self.webpackChunk_masatomakino_threejs_shader_materials||[];i.forEach(n.bind(null,0)),i.push=n.bind(null,i.push.bind(i))})();var a=t.O(void 0,[121],(()=>t(375)));a=t.O(a)})();