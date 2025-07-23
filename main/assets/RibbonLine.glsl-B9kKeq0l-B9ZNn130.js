import{v as S,gh as We,cE as x,a as Wt,b0 as Xe,d7 as Vt,aC as Bt,ct as Ie,a8 as bt,jT as ae,go as kt,am as $t,H as Ht}from"./main-D7vwjMDX.js";import{Y as Jt,Z as $,g as Ge,A as H,P as xe,T as Gt,_ as Q,r as he,y as qe,N as Pe,b as Zt}from"./vec32-BuqRmYBM-ClpcRCNx.js";import{m as Yt,o as Qt,y as Xt,e as qt}from"./vec4f64-CjUMzAyX-DPYbdAom.js";import{o as Ve}from"./projection-m8vi7Cxv-CyI2jDkU.js";import{M as Kt}from"./orientedBoundingBox-CTsjUkMw-DKqgIYPp.js";import{g as T,aj as ei,f as ti,Z as ii,c as Y,a5 as ri,aV as ni,a4 as ai,b as si,_ as Ze,u as Ye,ad as oi,ae as li,O as ci,w as ue,p as Be,b7 as yt,aT as Qe,b8 as di,b9 as pi,i as Ot,o as Et,n as At,af as Te,ba as Ke,m as hi,a8 as ui,e as fi,F as mi,Y as k,Q as ne,y as ke,aX as vi,b5 as gi,aQ as Si,K as Ti,R as _i,k as et,aE as bi,aF as yi,aG as Oi,U as Ei,aH as tt,aI as it,aJ as Ai,a_ as Ri,bb as rt,bc as xi,bd as Ci,be as Di,bf as Li}from"./VerticalOffset.glsl-BtVaDxLq-BHFQttp7.js";import{k as $e,B as nt,h as Ii}from"./mat4-BFStKTjU-WrlKAspo.js";import{a as Pi,n as Re}from"./mat4f64-BaJwL7tQ-k0uMm8LY.js";import{U as at,S as wi}from"./sphere-Cj20syUS-D26RDXx7.js";import{Q as De,I as Ni,K as _e,O as V,E as st}from"./plane-B_adY3_o-CH2S3dla.js";import{g as Ui,Q as be,F as we,M as ot}from"./renderState-DlSSrLcZ-Du_EmLq6.js";import{V as zi,n as Fi,a as ji}from"./InterleavedLayout-DcHoXu73-B1G6wAyg.js";import{T as h,O as Mi}from"./VertexAttribute-DFC3a3eR-BhmQtMsu.js";import{V as Wi,d as Vi,C as Bi,N as Rt}from"./HUDVisibility.glsl-Bl7zdrV0-_xgrtWWf.js";import{I as ki,g as ye}from"./Octree-Kk-G5P_T-DvO8LPfE.js";import{d as $i}from"./vec2-BnynUbeJ-CKtGJQAy.js";import{M as xt,R as Hi,Q as Ne,V as Ji}from"./lineSegment-BJNfNZM5-BgDHtF2v.js";import{o as se,i as Gi,h as pe,e as Zi,d as lt,f as Yi}from"./ShaderOutput-C_OqLoo1-jp3zUBgm.js";import{T as ct,f as Oe}from"./enums-DBi1-Mm2-CUS1pvQe.js";import{p as Qi}from"./computeTranslationToOriginAndRotation-DwwrTl3S-qooqBPGL.js";import{b as Xi,j as qi}from"./ElevationInfo-DkWlof50-CKiKbD2K.js";import{h as Ki}from"./hydratedFeatures-BDT5zTGB-D1Msl1E0.js";import{e as p,u as er}from"./glsl-o28TenZV-B0eZUNn3.js";import"./BindType-CKbZk6AG-Bqvzo9NX.js";import"./floatRGBA-YJlz5IlR-Bl6TELuT.js";import"./Texture-DXSFJsEu-02_Cw8VC.js";import{y as tr}from"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec2f64-CEUyUoff-BBc0aQ6D.js";import{w as ir}from"./ShaderBuilder-BkQM64Qp-Bst--WWS.js";class An{constructor(t,i=null,r=0){this.array=t,this.spatialReference=i,this.offset=r}}function Ct(e){return"array"in e}function Ee(e,t,i="ground"){if(Rt(t))return e.getElevation(t.x,t.y,t.z||0,t.spatialReference,i);if(Ct(t)){let r=t.offset;return e.getElevation(t.array[r++],t.array[r++],t.array[r]||0,t.spatialReference??e.spatialReference,i)}return e.getElevation(t[0],t[1],t[2]||0,e.spatialReference,i)}let rr=class extends yt{get geometries(){return this._geometries}get transformation(){return this._transformation??Pi}set transformation(e){this._transformation=$e(this._transformation??Re(),e),this._invalidateBoundingVolume(),this._emit("transformationChanged",this)}get shaderTransformation(){return this._shaderTransformation}set shaderTransformation(e){this._shaderTransformation=e?$e(this._shaderTransformation??Re(),e):null,this._invalidateBoundingVolume(),this._emit("shaderTransformationChanged",this)}get effectiveTransformation(){return this.shaderTransformation??this.transformation}constructor(e={}){super(),this.type=Qe.Object,this._shaderTransformation=null,this._parentLayer=null,this._visible=!0,this.castShadow=e.castShadow??!0,this.usesVerticalDistanceToGround=e.usesVerticalDistanceToGround??!1,this.graphicUid=e.graphicUid,this.layerUid=e.layerUid,e.isElevationSource&&(this.lastValidElevationBB=new Dt),this._geometries=e.geometries?Array.from(e.geometries):new Array}dispose(){this._geometries.length=0}get parentLayer(){return this._parentLayer}set parentLayer(e){zi(this._parentLayer==null||e==null,"Object3D can only be added to a single Layer"),this._parentLayer=e}addGeometry(e){e.visible=this._visible,this._geometries.push(e),this._emit("geometryAdded",{object:this,geometry:e}),this._invalidateBoundingVolume()}removeGeometry(e){const t=this._geometries.splice(e,1)[0];t&&(this._emit("geometryRemoved",{object:this,geometry:t}),this._invalidateBoundingVolume())}removeAllGeometries(){for(;this._geometries.length>0;)this.removeGeometry(0)}geometryVertexAttributeUpdated(e,t,i=!1){this._emit("attributesChanged",{object:this,geometry:e,attribute:t,sync:i}),Mi(t)&&this._invalidateBoundingVolume()}get visible(){return this._visible}set visible(e){if(this._visible!==e){this._visible=e;for(const t of this._geometries)t.visible=this._visible;this._emit("visibilityChanged",this)}}maskOccludee(){const e=new di;for(const t of this._geometries)t.occludees=Wi(t.occludees,e);return this._emit("occlusionChanged",this),e}removeOcclude(e){for(const t of this._geometries)t.occludees=Vi(t.occludees,e);this._emit("occlusionChanged",this)}highlight(e){const t=new pi(e);for(const i of this._geometries)i.addHighlight(t);return this._emit("highlightChanged",this),t}removeHighlight(e){for(const t of this._geometries)t.removeHighlight(e);this._emit("highlightChanged",this)}removeStateID(e){e.channel===Ui.Highlight?this.removeHighlight(e):this.removeOcclude(e)}getCombinedStaticTransformation(e,t){return nt(t,this.transformation,e.transformation)}getCombinedShaderTransformation(e,t=Re()){return nt(t,this.effectiveTransformation,e.transformation)}get boundingVolumeWorldSpace(){return this._bvWorldSpace||(this._bvWorldSpace=this._bvWorldSpace||new dt,this._validateBoundingVolume(this._bvWorldSpace,fe.WorldSpace)),this._bvWorldSpace}get boundingVolumeObjectSpace(){return this._bvObjectSpace||(this._bvObjectSpace=this._bvObjectSpace||new dt,this._validateBoundingVolume(this._bvObjectSpace,fe.ObjectSpace)),this._bvObjectSpace}_validateBoundingVolume(e,t){const i=t===fe.ObjectSpace;for(const r of this._geometries){const n=r.boundingInfo;n&&nr(n,e,i?r.transformation:this.getCombinedShaderTransformation(r))}Jt(at(e.bounds),e.min,e.max,.5);for(const r of this._geometries){const n=r.boundingInfo;if(n==null)continue;const a=i?r.transformation:this.getCombinedShaderTransformation(r),l=Ni(a);$(pt,n.center,a);const o=Ge(pt,at(e.bounds)),s=n.radius*l;e.bounds[3]=Math.max(e.bounds[3],o+s)}}_invalidateBoundingVolume(){const e=this._bvWorldSpace?.bounds;this._bvObjectSpace=this._bvWorldSpace=void 0,this._parentLayer&&e&&this._parentLayer.notifyObjectBBChanged(this,e)}_emit(e,t){this._parentLayer&&this._parentLayer.events.emit(e,t)}get test(){}};class Dt{constructor(){this.min=We(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this.max=We(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE)}isEmpty(){return this.max[0]<this.min[0]&&this.max[1]<this.min[1]&&this.max[2]<this.min[2]}}class dt extends Dt{constructor(){super(...arguments),this.bounds=wi()}}function nr(e,t,i){const r=e.bbMin,n=e.bbMax;if(Ii(i)){const a=H(ar,i[12],i[13],i[14]);xe(F,r,a),xe(M,n,a);for(let l=0;l<3;++l)t.min[l]=Math.min(t.min[l],F[l]),t.max[l]=Math.max(t.max[l],M[l])}else if($(F,r,i),Gt(r,n))for(let a=0;a<3;++a)t.min[a]=Math.min(t.min[a],F[a]),t.max[a]=Math.max(t.max[a],F[a]);else{$(M,n,i);for(let a=0;a<3;++a)t.min[a]=Math.min(t.min[a],F[a],M[a]),t.max[a]=Math.max(t.max[a],F[a],M[a]);for(let a=0;a<3;++a){Q(F,r),Q(M,n),F[a]=n[a],M[a]=r[a],$(F,F,i),$(M,M,i);for(let l=0;l<3;++l)t.min[l]=Math.min(t.min[l],F[l],M[l]),t.max[l]=Math.max(t.max[l],F[l],M[l])}}}const ar=x(),F=x(),M=x(),pt=x();var fe;(function(e){e[e.WorldSpace=0]="WorldSpace",e[e.ObjectSpace=1]="ObjectSpace"})(fe||(fe={}));var Ce;(function(e){e[e.ASYNC=0]="ASYNC",e[e.SYNC=1]="SYNC"})(Ce||(Ce={}));const sr=["layerObjectAdded","layerObjectRemoved","layerObjectsAdded","layerObjectsRemoved","transformationChanged","shaderTransformationChanged","visibilityChanged","occlusionChanged","highlightChanged","geometryAdded","geometryRemoved","attributesChanged"];let or=class extends yt{constructor(e,t,i=""){super(),this.stage=e,this.apiLayerUid=i,this.type=Qe.Layer,this.events=new Wt,this.visible=!0,this.sliceable=!1,this._objectsAdded=new Xe,this._handles=new Vt,this._objects=new Xe,this._pickable=!0,this.visible=t?.visible??!0,this._pickable=t?.pickable??!0,this.updatePolicy=t?.updatePolicy??Ce.ASYNC,this._disableOctree=t?.disableOctree??!1,e.add(this);for(const r of sr)this._handles.add(this.events.on(r,n=>e.handleEvent(r,n)))}destroy(){this._handles.size&&(this._handles.destroy(),this.stage.remove(this),this.invalidateSpatialQueryAccelerator())}get objects(){return this._objects}set pickable(e){this._pickable=e}get pickable(){return this._pickable&&this.visible}add(e){this._objects.push(e),e.parentLayer=this,this.events.emit("layerObjectAdded",{layer:this,object:e}),this._octree!=null&&this._objectsAdded.push(e)}remove(e){this._objects.removeUnordered(e)&&(e.parentLayer=null,this.events.emit("layerObjectRemoved",{layer:this,object:e}),this._octree!=null&&(this._objectsAdded.removeUnordered(e)||this._octree.remove([e])))}addMany(e){this._objects.pushArray(e);for(const t of e)t.parentLayer=this;this.events.emit("layerObjectsAdded",{layer:this,objects:e}),this._octree!=null&&this._objectsAdded.pushArray(e)}removeMany(e){const t=new Array;if(this._objects.removeUnorderedMany(e,e.length,t),t.length!==0){for(const i of t)i.parentLayer=null;if(this.events.emit("layerObjectsRemoved",{layer:this,objects:t}),this._octree!=null){for(let i=0;i<t.length;)this._objectsAdded.removeUnordered(t[i])?(t[i]=t[t.length-1],t.length-=1):++i;this._octree.remove(t)}}}sync(){this.updatePolicy!==Ce.SYNC&&this.stage.syncLayer(this.id)}notifyObjectBBChanged(e,t){this._octree==null||this._objectsAdded.includes(e)||this._octree.update(e,t)}getSpatialQueryAccelerator(){return this._octree==null&&this._objects.length>50&&!this._disableOctree?(this._octree=new ki(e=>e.boundingVolumeWorldSpace.bounds),this._octree.add(this._objects.data,this._objects.length)):this._octree!=null&&this._objectsAdded.length>0&&(this._octree.add(this._objectsAdded.data,this._objectsAdded.length),this._objectsAdded.clear()),this._octree}invalidateSpatialQueryAccelerator(){this._octree=Bt(this._octree),this._objectsAdded.clear()}};var te,me;(function(e){e[e.Draped=0]="Draped",e[e.Screen=1]="Screen",e[e.World=2]="World",e[e.COUNT=3]="COUNT"})(te||(te={})),function(e){e[e.Center=0]="Center",e[e.Tip=1]="Tip",e[e.COUNT=2]="COUNT"}(me||(me={}));let j=class extends Ot{constructor(){super(...arguments),this.space=te.Screen,this.anchor=me.Center,this.occluder=!1,this.writeDepth=!1,this.hideOnShortSegments=!1,this.hasCap=!1,this.hasTip=!1,this.vvSize=!1,this.vvColor=!1,this.vvOpacity=!1,this.hasOccludees=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.textureCoordinateType=Et.None,this.emissionSource=At.None,this.discardInvisibleFragments=!0,this.occlusionPass=!1,this.hasVvInstancing=!0,this.hasSliceTranslatedView=!0,this.objectAndLayerIdColorInstanced=!1}get draped(){return this.space===te.Draped}};S([T({count:te.COUNT})],j.prototype,"space",void 0),S([T({count:me.COUNT})],j.prototype,"anchor",void 0),S([T()],j.prototype,"occluder",void 0),S([T()],j.prototype,"writeDepth",void 0),S([T()],j.prototype,"hideOnShortSegments",void 0),S([T()],j.prototype,"hasCap",void 0),S([T()],j.prototype,"hasTip",void 0),S([T()],j.prototype,"vvSize",void 0),S([T()],j.prototype,"vvColor",void 0),S([T()],j.prototype,"vvOpacity",void 0),S([T()],j.prototype,"hasOccludees",void 0),S([T()],j.prototype,"terrainDepthTest",void 0),S([T()],j.prototype,"cullAboveTerrain",void 0);const ht=8;function lr(e,t){const i=e.vertex;i.uniforms.add(new Y("intrinsicWidth",r=>r.width)),t.vvSize?(e.attributes.add(h.SIZEFEATUREATTRIBUTE,"float"),i.uniforms.add(new Te("vvSizeMinSize",r=>r.vvSize.minSize),new Te("vvSizeMaxSize",r=>r.vvSize.maxSize),new Te("vvSizeOffset",r=>r.vvSize.offset),new Te("vvSizeFactor",r=>r.vvSize.factor)),i.code.add(p`float getSize() {
return intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;
}`)):(e.attributes.add(h.SIZE,"float"),i.code.add(p`float getSize(){
return intrinsicWidth * size;
}`)),t.vvOpacity?(e.attributes.add(h.OPACITYFEATUREATTRIBUTE,"float"),i.constants.add("vvOpacityNumber","int",8),i.uniforms.add(new Ke("vvOpacityValues",r=>r.vvOpacity.values,ht),new Ke("vvOpacityOpacities",r=>r.vvOpacity.opacityValues,ht)),i.code.add(p`float interpolateOpacity( float value ){
if (value <= vvOpacityValues[0]) {
return vvOpacityOpacities[0];
}
for (int i = 1; i < vvOpacityNumber; ++i) {
if (vvOpacityValues[i] >= value) {
float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
}
}
return vvOpacityOpacities[vvOpacityNumber - 1];
}
vec4 applyOpacity( vec4 color ){
return vec4(color.xyz, interpolateOpacity(opacityFeatureAttribute));
}`)):i.code.add(p`vec4 applyOpacity( vec4 color ){
return color;
}`),t.vvColor?(e.include(hi,t),e.attributes.add(h.COLORFEATUREATTRIBUTE,"float"),i.code.add(p`vec4 getColor(){
return applyOpacity(interpolateVVColor(colorFeatureAttribute));
}`)):(e.attributes.add(h.COLOR,"vec4"),i.code.add(p`vec4 getColor(){
return applyOpacity(color);
}`))}function Lt(e){return e.pattern.map(t=>Math.round(t*e.pixelRatio))}function cr(e){if(e==null)return 1;const t=Lt(e);return Math.floor(t.reduce((i,r)=>i+r))}function dr(e){return Lt(e).reduce((t,i)=>Math.max(t,i))}function pr(e){return e==null?Yt:e.length===4?e:tr(hr,e[0],e[1],e[2],1)}const hr=Qt();function ur(e,t){if(!t.stippleEnabled)return void e.fragment.code.add(p`float getStippleAlpha() { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);const i=!(t.draped&&t.stipplePreferContinuous),{vertex:r,fragment:n}=e;n.include(Bi),t.draped||(ui(r,t),r.uniforms.add(new Ye("worldToScreenPerDistanceRatio",({camera:a})=>1/a.perScreenPixelRatio)).code.add(p`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add("vStippleDistance","float"),e.varyings.add("vStippleDistanceLimits","vec2"),e.varyings.add("vStipplePatternStretch","float"),r.code.add(p`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${p.float(mr)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),r.code.add(p`vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {`),r.code.add(p`
    if (segmentLengthPseudoScreen >= ${i?"patternLength":"1e4"}) {
  `),Ze(r),r.code.add(p`float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
float segmentLengthScreenRounded = flooredRepetitions * patternLength;
float stretch = repetitions / flooredRepetitions;
vStipplePatternStretch = max(0.75, stretch);
return vec2(0.0, segmentLengthScreenRounded);
}
return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
}`),n.uniforms.add(new fi("stipplePatternTexture",a=>a.stippleTexture),new Y("stipplePatternSDFNormalizer",a=>fr(a.stipplePattern)),new Y("stipplePatternPixelSizeInv",a=>1/It(a))),t.stippleOffColorEnabled&&n.uniforms.add(new Be("stippleOffColor",a=>pr(a.stippleOffColor))),n.code.add(p`float getStippleSDF(out bool isClamped) {
float stippleDistanceClamped = clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y);
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = stippleDistanceClamped * gl_FragCoord.w * stipplePatternPixelSizeInv * vLineSizeInv;
u = fract(u);
float encodedSDF = rgbaTofloat(texture(stipplePatternTexture, vec2(u, 0.5)));
float sdf = (encodedSDF * 2.0 - 1.0) * stipplePatternSDFNormalizer;
return (sdf - 0.5) * vStipplePatternStretch + 0.5;
}
float getStippleSDF() {
bool ignored;
return getStippleSDF(ignored);
}
float getStippleAlpha() {
bool isClamped;
float stippleSDF = getStippleSDF(isClamped);
float antiAliasedResult = clamp(stippleSDF * vLineWidth + 0.5, 0.0, 1.0);
return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
}`),n.code.add(p`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${er(!t.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${t.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `)}function fr(e){return e?(Math.floor(.5*(dr(e)-1))+.5)/e.pixelRatio:1}function It(e){const t=e.stipplePattern;return t?cr(e.stipplePattern)/t.pixelRatio:1}const mr=.4,Pt=64,vr=Pt/2,gr=vr/5,Sr=Pt/gr,Rn=.25;function Tr(e,t){const i=e.vertex;Ze(i),i.uniforms.get("markerScale")==null&&i.constants.add("markerScale","float",1),i.constants.add("markerSizePerLineWidth","float",Sr).code.add(p`float getLineWidth() {
return max(getSize(), 1.0) * pixelRatio;
}
float getScreenMarkerSize() {
return markerSizePerLineWidth * markerScale * getLineWidth();
}`),t.space===te.World&&(i.constants.add("maxSegmentLengthFraction","float",.45),i.uniforms.add(new Ye("perRenderPixelRatio",r=>r.camera.perRenderPixelRatio)),i.code.add(p`bool areWorldMarkersHidden(vec4 pos, vec4 other) {
vec3 midPoint = mix(pos.xyz, other.xyz, 0.5);
float distanceToCamera = length(midPoint);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
float worldMarkerSize = getScreenMarkerSize() * screenToWorldRatio;
float segmentLen = length(pos.xyz - other.xyz);
return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
}
float getWorldMarkerSize(vec4 pos) {
float distanceToCamera = length(pos.xyz);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
return getScreenMarkerSize() * screenToWorldRatio;
}`))}var ie;(function(e){e[e.BUTT=0]="BUTT",e[e.SQUARE=1]="SQUARE",e[e.ROUND=2]="ROUND",e[e.COUNT=3]="COUNT"})(ie||(ie={}));let E=class extends Ot{constructor(){super(...arguments),this.capType=ie.BUTT,this.hasPolygonOffset=!1,this.writeDepth=!1,this.draped=!1,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stipplePreferContinuous=!0,this.roundJoins=!1,this.applyMarkerOffset=!1,this.vvSize=!1,this.vvColor=!1,this.vvOpacity=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.hasOccludees=!1,this.occluder=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.wireframe=!1,this.discardInvisibleFragments=!1,this.objectAndLayerIdColorInstanced=!1,this.textureCoordinateType=Et.None,this.emissionSource=At.None,this.occlusionPass=!1,this.hasVvInstancing=!0,this.hasSliceTranslatedView=!0}};S([T({count:ie.COUNT})],E.prototype,"capType",void 0),S([T()],E.prototype,"hasPolygonOffset",void 0),S([T()],E.prototype,"writeDepth",void 0),S([T()],E.prototype,"draped",void 0),S([T()],E.prototype,"stippleEnabled",void 0),S([T()],E.prototype,"stippleOffColorEnabled",void 0),S([T()],E.prototype,"stipplePreferContinuous",void 0),S([T()],E.prototype,"roundJoins",void 0),S([T()],E.prototype,"applyMarkerOffset",void 0),S([T()],E.prototype,"vvSize",void 0),S([T()],E.prototype,"vvColor",void 0),S([T()],E.prototype,"vvOpacity",void 0),S([T()],E.prototype,"falloffEnabled",void 0),S([T()],E.prototype,"innerColorEnabled",void 0),S([T()],E.prototype,"hasOccludees",void 0),S([T()],E.prototype,"occluder",void 0),S([T()],E.prototype,"terrainDepthTest",void 0),S([T()],E.prototype,"cullAboveTerrain",void 0),S([T()],E.prototype,"wireframe",void 0),S([T()],E.prototype,"discardInvisibleFragments",void 0),S([T()],E.prototype,"objectAndLayerIdColorInstanced",void 0);const ve=1;function wt(e){const t=new ir,{attributes:i,varyings:r,vertex:n,fragment:a}=t,{applyMarkerOffset:l,draped:o,output:s,capType:c,stippleEnabled:d,falloffEnabled:v,roundJoins:f,wireframe:u,innerColorEnabled:O}=e;t.include(ei),t.include(lr,e),t.include(ur,e),t.include(ti,e),t.include(ii,e);const y=l&&!o;y&&(n.uniforms.add(new Y("markerScale",m=>m.markerScale)),t.include(Tr,{space:te.World})),ri(n,e),n.uniforms.add(new ni("inverseProjectionMatrix",m=>m.camera.inverseProjectionMatrix),new ai("nearFar",m=>m.camera.nearFar),new Y("miterLimit",m=>m.join!=="miter"?0:m.miterLimit),new si("viewport",m=>m.camera.fullViewport)),n.constants.add("LARGE_HALF_FLOAT","float",65500),i.add(h.POSITION,"vec3"),i.add(h.PREVPOSITION,"vec3"),i.add(h.NEXTPOSITION,"vec3"),i.add(h.SUBDIVISIONFACTOR,"float"),i.add(h.UV0,"vec2"),r.add("vColor","vec4"),r.add("vpos","vec3"),r.add("vLineDistance","float"),r.add("vLineWidth","float");const C=d;C&&r.add("vLineSizeInv","float");const A=c===ie.ROUND,b=d&&A,U=v||b;U&&r.add("vLineDistanceNorm","float"),A&&(r.add("vSegmentSDF","float"),r.add("vReverseSegmentSDF","float")),n.code.add(p`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),n.code.add(p`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),n.code.add(p`void clipAndTransform(inout vec4 pos, inout vec4 prev, inout vec4 next, in bool isStartVertex) {
float vnp = nearFar[0] * 0.99;
if(pos.z > -nearFar[0]) {
if (!isStartVertex) {
if(prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if(next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
forwardViewPosDepth(pos.xyz);
pos = projectAndScale(pos);
next = projectAndScale(next);
prev = projectAndScale(prev);
}`),Ze(n),n.constants.add("aaWidth","float",d?0:1).main.add(p`
    // unpack values from uv0.y
    bool isStartVertex = abs(abs(uv0.y)-3.0) == 1.0;

    float coverage = 1.0;

    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      bool isJoin = abs(uv0.y) < 3.0;
      float lineSize = getSize();

      if (lineSize < 1.0) {
        coverage = lineSize; // convert sub-pixel coverage to alpha
        lineSize = 1.0;
      }
      lineSize += aaWidth;

      float lineWidth = lineSize * pixelRatio;
      vLineWidth = lineWidth;
      ${C?p`vLineSizeInv = 1.0 / lineSize;`:""}

      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);
  `),y&&n.main.add(p`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos, other);
if(!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos) * 0.5;
}`),n.main.add(p`clipAndTransform(pos, prev, next, isStartVertex);
vec2 left = (pos.xy - prev.xy);
vec2 right = (next.xy - pos.xy);
float leftLen = length(left);
float rightLen = length(right);`),(d||A)&&n.main.add(p`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${A?p`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),n.main.add(p`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * uv0.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),f?n.main.add(p`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${d?p`min(1.0, subdivisionFactor * ${p.float((ve+2)/(ve+1))})`:p`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(uv0.y) * factor * rotationAngle);
      `):n.main.add(p`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);const _=c!==ie.BUTT;return n.main.add(p`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${_?p`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),n.main.add(p`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(uv0.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = sign(uv0.y) * pos.w;

    vLineDistance =  lineWidth * lineDistNorm;
    ${U?p`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),A&&n.main.add(p`vec2 segmentDir = normalize(segment);
vSegmentSDF = (isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir) * pos.w) ;
vReverseSegmentSDF = (isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir) * pos.w);`),d&&(o?n.uniforms.add(new Ye("worldToScreenRatio",m=>1/m.screenToPCSRatio)):n.main.add(p`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),n.main.add(p`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),o?n.main.add(p`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = uv0.x * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):n.main.add(p`float startPseudoScreen = mix(uv0.x, uv0.x - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),n.uniforms.add(new Y("stipplePatternPixelSize",m=>It(m))),n.main.add(p`float patternLength = lineSize * stipplePatternPixelSize;
vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);
if (segmentLengthScreenDouble >= 0.001) {
vec2 stippleDisplacement = pos.xy - segmentOrigin;
float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);
vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
}
vStippleDistanceLimits *= pos.w;
vStippleDistance *= pos.w;
vStippleDistanceLimits = isJoin ?
vStippleDistanceLimits :
isStartVertex ?
vec2(-1e34, vStippleDistanceLimits.y) :
vec2(vStippleDistanceLimits.x, 1e34);`)),n.main.add(p`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a *= coverage;

      ${u&&!o?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),t.fragment.include(oi,e),t.include(li,e),a.include(ci),a.main.add(p`discardBySlice(vpos);
discardByTerrainDepth();`),u?a.main.add(p`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(A&&a.main.add(p`
        float sdf = min(vSegmentSDF, vReverseSegmentSDF);
        vec2 fragmentPosition = vec2(
          min(sdf, 0.0),
          vLineDistance
        ) * gl_FragCoord.w;

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${p.float(ue)}) {
          discard;
        }
      `),b?a.main.add(p`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        vLineDistanceNorm * gl_FragCoord.w
      );
      float stippleRadius = length(stipplePosition * vLineWidth);
      float stippleCapSDF = (stippleRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${p.float(ue)}, stippleCoverage);
      `):a.main.add(p`float stippleAlpha = getStippleAlpha();`),s!==se.ObjectAndLayerIdColor&&a.main.add(p`discardByStippleAlpha(stippleAlpha, ${p.float(ue)});`),a.uniforms.add(new Be("intrinsicColor",m=>m.color)),a.main.add(p`vec4 color = intrinsicColor * vColor;`),O&&(a.uniforms.add(new Be("innerColor",m=>m.innerColor??m.color),new Y("innerWidth",(m,I)=>m.innerWidth*I.camera.pixelRatio)),a.main.add(p`float distToInner = abs(vLineDistance * gl_FragCoord.w) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`)),a.main.add(p`vec4 finalColor = blendStipple(color, stippleAlpha);`),v&&(a.uniforms.add(new Y("falloff",m=>m.falloff)),a.main.add(p`finalColor.a *= pow(max(0.0, 1.0 - abs(vLineDistanceNorm * gl_FragCoord.w)), falloff);`)),d||a.main.add(p`float featherStartDistance = max(vLineWidth - 2.0, 0.0);
float value = abs(vLineDistance) * gl_FragCoord.w;
float feather = (value - featherStartDistance) / (vLineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`)),a.main.add(p`outputColorHighlightOID(finalColor, vpos);`),t}const _r=Object.freeze(Object.defineProperty({__proto__:null,build:wt,ribbonlineNumRoundJoinSubdivisions:ve},Symbol.toStringTag,{value:"Module"}));let br=class extends Ti{constructor(e,t){super(e,t,new _i(_r,()=>Promise.resolve().then(()=>Zr)),Nt),this.primitiveType=t.wireframe?ct.LINES:ct.TRIANGLE_STRIP}_makePipelineState(e,t){const{oitPass:i,output:r,hasOccludees:n,hasPolygonOffset:a}=e,l=i===et.NONE,o=i===et.FrontFace;return be({blending:pe(r)?bi(i):null,depthTest:{func:yi(i)},depthWrite:Oi(e),drawBuffers:r===se.Depth?{buffers:[Oe.NONE]}:Ei(i,r),colorWrite:we,stencilWrite:n?tt:null,stencilTest:n?t?it:Ai:null,polygonOffset:l||o?a?ut:null:Ri})}initializePipeline(e){if(e.occluder){const t=e.hasPolygonOffset?ut:null;this._occluderPipelineTransparent=be({blending:ot,polygonOffset:t,depthTest:rt,depthWrite:null,colorWrite:we,stencilWrite:null,stencilTest:xi,drawBuffers:e.output===se.Depth?{buffers:[Oe.NONE]}:null}),this._occluderPipelineOpaque=be({blending:ot,polygonOffset:t,depthTest:rt,depthWrite:null,colorWrite:we,stencilWrite:Ci,stencilTest:Di,drawBuffers:e.output===se.Depth?{buffers:[Oe.NONE]}:null}),this._occluderPipelineMaskWrite=be({blending:null,polygonOffset:t,depthTest:Li,depthWrite:null,colorWrite:null,stencilWrite:tt,stencilTest:it,drawBuffers:e.output===se.Depth?{buffers:[Oe.NONE]}:null})}return this._occludeePipeline=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){if(e)return this._occludeePipeline;switch(t){case k.TRANSPARENT_OCCLUDER_MATERIAL:return this._occluderPipelineTransparent??super.getPipeline();case k.OCCLUDER_MATERIAL:return this._occluderPipelineOpaque??super.getPipeline();default:return this._occluderPipelineMaskWrite??super.getPipeline()}}};const ut={factor:0,units:-4},Nt=new Map([[h.POSITION,0],[h.PREVPOSITION,1],[h.NEXTPOSITION,2],[h.SUBDIVISIONFACTOR,3],[h.UV0,4],[h.COLOR,5],[h.COLORFEATUREATTRIBUTE,5],[h.SIZE,6],[h.SIZEFEATUREATTRIBUTE,6],[h.OPACITYFEATUREATTRIBUTE,7],[h.OBJECTANDLAYERIDCOLOR,8]]);var z;(function(e){e[e.LEFT_JOIN_START=-2]="LEFT_JOIN_START",e[e.LEFT_JOIN_END=-1]="LEFT_JOIN_END",e[e.LEFT_CAP_START=-4]="LEFT_CAP_START",e[e.LEFT_CAP_END=-5]="LEFT_CAP_END",e[e.RIGHT_JOIN_START=2]="RIGHT_JOIN_START",e[e.RIGHT_JOIN_END=1]="RIGHT_JOIN_END",e[e.RIGHT_CAP_START=4]="RIGHT_CAP_START",e[e.RIGHT_CAP_END=5]="RIGHT_CAP_END"})(z||(z={}));class yr extends mi{constructor(t){super(t,Er),this._configuration=new E,this.vertexAttributeLocations=Nt,this.produces=new Map([[k.OPAQUE_MATERIAL,i=>Gi(i)||pe(i)&&this.parameters.renderOccluded===ne.OccludeAndTransparentStencil],[k.OPAQUE_MATERIAL_WITHOUT_NORMALS,i=>Zi(i)],[k.OCCLUDER_MATERIAL,i=>lt(i)&&this.parameters.renderOccluded===ne.OccludeAndTransparentStencil],[k.TRANSPARENT_OCCLUDER_MATERIAL,i=>lt(i)&&this.parameters.renderOccluded===ne.OccludeAndTransparentStencil],[k.TRANSPARENT_MATERIAL,i=>pe(i)&&this.parameters.writeDepth&&this.parameters.renderOccluded!==ne.OccludeAndTransparentStencil],[k.TRANSPARENT_MATERIAL_WITHOUT_DEPTH,i=>pe(i)&&!this.parameters.writeDepth&&this.parameters.renderOccluded!==ne.OccludeAndTransparentStencil],[k.DRAPED_MATERIAL,i=>Yi(i)]])}getConfiguration(t,i){this._configuration.output=t,this._configuration.oitPass=i.oitPass,this._configuration.draped=i.slot===k.DRAPED_MATERIAL;const r=this.parameters.stipplePattern!=null&&t!==se.Highlight;return this._configuration.stippleEnabled=r,this._configuration.stippleOffColorEnabled=r&&this.parameters.stippleOffColor!=null,this._configuration.stipplePreferContinuous=r&&this.parameters.stipplePreferContinuous,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.roundJoins=this.parameters.join==="round",this._configuration.capType=this.parameters.cap,this._configuration.applyMarkerOffset=this.parameters.markerParameters!=null&&Rr(this.parameters.markerParameters),this._configuration.hasPolygonOffset=this.parameters.hasPolygonOffset,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.vvOpacity=!!this.parameters.vvOpacity,this._configuration.innerColorEnabled=this.parameters.innerWidth>0&&this.parameters.innerColor!=null,this._configuration.falloffEnabled=this.parameters.falloff>0,this._configuration.hasOccludees=i.hasOccludees,this._configuration.occluder=this.parameters.renderOccluded===ne.OccludeAndTransparentStencil,this._configuration.terrainDepthTest=i.terrainDepthTest&&pe(t),this._configuration.cullAboveTerrain=i.cullAboveTerrain,this._configuration.wireframe=this.parameters.wireframe,this._configuration}get visible(){return this.parameters.color[3]>=ue||this.parameters.stipplePattern!=null&&(this.parameters.stippleOffColor?.[3]??0)>ue}intersectDraped({attributes:t,screenToWorldRatio:i},r,n,a,l,o){if(!n.options.selectionMode)return;const s=t.get(h.SIZE);let c=this.parameters.width;if(this.parameters.vvSize){const A=t.get(h.SIZEFEATUREATTRIBUTE).data[0];c*=Ie(this.parameters.vvSize.offset[0]+A*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else s&&(c*=s.data[0]);const d=a[0],v=a[1],f=(c/2+4)*i;let u=Number.MAX_VALUE,O=0;const y=t.get(h.POSITION).data,C=He(this.parameters,t)?y.length-2:y.length-5;for(let A=0;A<C;A+=3){const b=y[A],U=y[A+1],_=(A+3)%y.length,m=d-b,I=v-U,g=y[_]-b,Z=y[_+1]-U,L=Ie((g*m+Z*I)/(g*g+Z*Z),0,1),re=g*L-m,P=Z*L-I,X=re*re+P*P;X<u&&(u=X,O=A/3)}u<f*f&&l(o.dist,o.normal,O,!1)}intersect(t,i,r,n,a,l){if(!r.options.selectionMode||!t.visible)return;if(!Fi(i))return void bt.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial").error("intersection assumes a translation-only matrix");const o=t.attributes,s=o.get(h.POSITION).data;let c=this.parameters.width;if(this.parameters.vvSize){const b=o.get(h.SIZEFEATUREATTRIBUTE).data[0];c*=Ie(this.parameters.vvSize.offset[0]+b*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else o.has(h.SIZE)&&(c*=o.get(h.SIZE).data[0]);const d=r.camera,v=xr;$i(v,r.point);const f=c*d.pixelRatio/2+4*d.pixelRatio;H(de[0],v[0]-f,v[1]+f,0),H(de[1],v[0]+f,v[1]+f,0),H(de[2],v[0]+f,v[1]-f,0),H(de[3],v[0]-f,v[1]-f,0);for(let b=0;b<4;b++)if(!d.unprojectFromRenderScreen(de[b],G[b]))return;_e(d.eye,G[0],G[1],ze),_e(d.eye,G[1],G[2],Fe),_e(d.eye,G[2],G[3],je),_e(d.eye,G[3],G[0],Me);let u=Number.MAX_VALUE,O=0;const y=He(this.parameters,o)?s.length-2:s.length-5;for(let b=0;b<y;b+=3){w[0]=s[b]+i[12],w[1]=s[b+1]+i[13],w[2]=s[b+2]+i[14];const U=(b+3)%s.length;if(N[0]=s[U]+i[12],N[1]=s[U+1]+i[13],N[2]=s[U+2]+i[14],V(ze,w)<0&&V(ze,N)<0||V(Fe,w)<0&&V(Fe,N)<0||V(je,w)<0&&V(je,N)<0||V(Me,w)<0&&V(Me,N)<0)continue;if(d.projectToRenderScreen(w,K),d.projectToRenderScreen(N,ee),K[2]<0&&ee[2]>0){he(B,w,N);const m=d.frustum,I=-V(m[ye.NEAR],w)/qe(B,st(m[ye.NEAR]));Pe(B,B,I),xe(w,w,B),d.projectToRenderScreen(w,K)}else if(K[2]>0&&ee[2]<0){he(B,N,w);const m=d.frustum,I=-V(m[ye.NEAR],N)/qe(B,st(m[ye.NEAR]));Pe(B,B,I),xe(N,N,B),d.projectToRenderScreen(N,ee)}else if(K[2]<0&&ee[2]<0)continue;K[2]=0,ee[2]=0;const _=Hi(Ne(K,ee,vt),v);_<u&&(u=_,Q(ft,w),Q(mt,N),O=b/3)}const C=r.rayBegin,A=r.rayEnd;if(u<f*f){let b=Number.MAX_VALUE;if(Ji(Ne(ft,mt,vt),Ne(C,A,Cr),q)){he(q,q,C);const U=Zt(q);Pe(q,q,1/U),b=U/Ge(C,A)}l(b,q,O,!1)}}get _layout(){const t=ji().vec3f(h.POSITION).vec3f(h.PREVPOSITION).vec3f(h.NEXTPOSITION).f32(h.SUBDIVISIONFACTOR).vec2f(h.UV0);return this.parameters.vvSize?t.f32(h.SIZEFEATUREATTRIBUTE):t.f32(h.SIZE),this.parameters.vvColor?t.f32(h.COLORFEATUREATTRIBUTE):t.vec4f(h.COLOR),this.parameters.vvOpacity&&t.f32(h.OPACITYFEATUREATTRIBUTE),ke()&&t.vec4u8(h.OBJECTANDLAYERIDCOLOR),t}createBufferWriter(){return new Ar(this._layout,this.parameters)}createGLMaterial(t){return new Or(t)}validateParameters(t){t.join!=="miter"&&(t.miterLimit=0),t.markerParameters!=null&&(t.markerScale=t.markerParameters.width/t.width)}}class Or extends vi{constructor(){super(...arguments),this._stipplePattern=null}dispose(){super.dispose(),this._stippleTextures.release(this._stipplePattern),this._stipplePattern=null}beginSlot(t){const i=this._material.parameters.stipplePattern;return this._stipplePattern!==i&&(this._material.setParameters({stippleTexture:this._stippleTextures.swap(i,this._stipplePattern)}),this._stipplePattern=i),this.getTechnique(br,t)}}class Er extends gi{constructor(){super(...arguments),this.width=0,this.color=Xt,this.join="miter",this.cap=ie.BUTT,this.miterLimit=5,this.writeDepth=!0,this.hasPolygonOffset=!1,this.stippleTexture=null,this.stipplePreferContinuous=!0,this.markerParameters=null,this.markerScale=1,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.isClosed=!1,this.falloff=0,this.innerWidth=0,this.wireframe=!1}get transparent(){return this.color[3]<1||this.stipplePattern!=null&&(this.stippleOffColor?.[3]??0)<1}}class Ar{constructor(t,i){this.vertexBufferLayout=t,this._parameters=i,this.numJoinSubdivisions=0;const r=i.stipplePattern?1:0;switch(this._parameters.join){case"miter":case"bevel":this.numJoinSubdivisions=r;break;case"round":this.numJoinSubdivisions=ve+r}}_isClosed(t){return He(this._parameters,t)}allocate(t){return this.vertexBufferLayout.createBuffer(t)}elementCount(t){const i=t.get(h.POSITION).indices.length/2+1,r=this._isClosed(t);let n=r?2:2*2;return n+=((r?i:i-1)-(r?0:1))*(2*this.numJoinSubdivisions+4),n+=2,this._parameters.wireframe&&(n=2+4*(n-2)),n}write(t,i,r,n,a,l){const o=Dr,s=Lr,c=Ir,d=r.get(h.POSITION),v=d.indices,f=d.data.length/3,u=r.get(h.DISTANCETOSTART)?.data;v&&v.length!==2*(f-1)&&console.warn("RibbonLineMaterial does not support indices");const O=r.get(h.SIZEFEATUREATTRIBUTE)?.data[0]??r.get(h.SIZE)?.data[0]??1;let y=[1,1,1,1],C=0;const A=this.vertexBufferLayout.fields.has(h.COLORFEATUREATTRIBUTE);A?C=r.get(h.COLORFEATUREATTRIBUTE).data[0]:r.has(h.COLOR)&&(y=r.get(h.COLOR).data);const b=this.vertexBufferLayout.fields.has(h.OPACITYFEATUREATTRIBUTE),U=b?r.get(h.OPACITYFEATUREATTRIBUTE).data[0]:0,_=new Float32Array(a.buffer),m=ke()?new Uint8Array(a.buffer):null,I=this.vertexBufferLayout.stride/4;let g=l*I;const Z=g;let L=0;const re=u?(R,W,J)=>L=u[J]:(R,W,J)=>L+=Ge(R,W),P=(R,W,J,ce,ge,jt,Mt)=>{if(_[g++]=W[0],_[g++]=W[1],_[g++]=W[2],_[g++]=R[0],_[g++]=R[1],_[g++]=R[2],_[g++]=J[0],_[g++]=J[1],_[g++]=J[2],_[g++]=ce,_[g++]=Mt,_[g++]=ge,_[g++]=O,A)_[g++]=C;else{const Se=Math.min(4*jt,y.length-4);_[g++]=y[Se],_[g++]=y[Se+1],_[g++]=y[Se+2],_[g++]=y[Se+3]}b&&(_[g++]=U),ke()&&(n&&(m[4*g]=n[0],m[4*g+1]=n[1],m[4*g+2]=n[2],m[4*g+3]=n[3]),g++)};g+=I,H(s,d.data[0],d.data[1],d.data[2]),t&&$(s,s,t);const X=this._isClosed(r);if(X){const R=d.data.length-3;H(o,d.data[R],d.data[R+1],d.data[R+2]),t&&$(o,o,t)}else H(c,d.data[3],d.data[4],d.data[5]),t&&$(c,c,t),P(s,s,c,1,z.LEFT_CAP_START,0,0),P(s,s,c,1,z.RIGHT_CAP_START,0,0),Q(o,s),Q(s,c);const Le=X?0:1,le=X?f:f-1;for(let R=Le;R<le;R++){const W=(R+1)%f*3;H(c,d.data[W],d.data[W+1],d.data[W+2]),t&&$(c,c,t),re(o,s,R),P(o,s,c,0,z.LEFT_JOIN_END,R,L),P(o,s,c,0,z.RIGHT_JOIN_END,R,L);const J=this.numJoinSubdivisions;for(let ce=0;ce<J;++ce){const ge=(ce+1)/(J+1);P(o,s,c,ge,z.LEFT_JOIN_END,R,L),P(o,s,c,ge,z.RIGHT_JOIN_END,R,L)}P(o,s,c,1,z.LEFT_JOIN_START,R,L),P(o,s,c,1,z.RIGHT_JOIN_START,R,L),Q(o,s),Q(s,c)}X?(H(c,d.data[3],d.data[4],d.data[5]),t&&$(c,c,t),L=re(o,s,le),P(o,s,c,0,z.LEFT_JOIN_END,Le,L),P(o,s,c,0,z.RIGHT_JOIN_END,Le,L)):(L=re(o,s,le),P(o,s,s,0,z.LEFT_CAP_END,le,L),P(o,s,s,0,z.RIGHT_CAP_END,le,L)),Ue(_,Z+I,_,Z,I),g=Ue(_,g-I,_,g,I),this._parameters.wireframe&&this._addWireframeVertices(a,Z,g,I)}_addWireframeVertices(t,i,r,n){const a=new Float32Array(t.buffer,r*Float32Array.BYTES_PER_ELEMENT),l=new Float32Array(t.buffer,i*Float32Array.BYTES_PER_ELEMENT,r-i);let o=0;const s=c=>o=Ue(l,c,a,o,n);for(let c=0;c<l.length-1;c+=2*n)s(c),s(c+2*n),s(c+1*n),s(c+2*n),s(c+1*n),s(c+3*n)}}function Ue(e,t,i,r,n){for(let a=0;a<n;a++)i[r++]=e[t++];return r}function He(e,t){return e.isClosed?t.get(h.POSITION).indices.length>2:!1}function Rr(e){return e.anchor===me.Tip&&e.hideOnShortSegments&&e.placement==="begin-end"&&e.worldSpace}const w=x(),N=x(),B=x(),q=x(),xr=x(),K=ae(),ee=ae(),ft=x(),mt=x(),vt=xt(),Cr=xt(),Dr=x(),Lr=x(),Ir=x(),de=[ae(),ae(),ae(),ae()],G=[x(),x(),x(),x()],ze=De(),Fe=De(),je=De(),Me=De();var gt,St,Tt;(function(e){e[e.RasterImage=0]="RasterImage",e[e.Features=1]="Features"})(gt||(gt={})),function(e){e[e.MapLayer=0]="MapLayer",e[e.ViewLayer=1]="ViewLayer",e[e.Outline=2]="Outline",e[e.SnappingHint=3]="SnappingHint"}(St||(St={})),function(e){e[e.WithRasterImage=0]="WithRasterImage",e[e.WithoutRasterImage=1]="WithoutRasterImage"}(Tt||(Tt={}));let Pr=class{constructor(e,t){this.vec3=e,this.id=t}};function _t(e,t,i,r){return new Pr(We(e,t,i),r)}class xn{constructor(t){this._originSR=t,this._rootOriginId="root/"+kt(),this._origins=new Map,this._objects=new Map,this._gridSize=5e5}getOrigin(t){const i=this._origins.get(this._rootOriginId);if(i==null){const d=_t(t[0]+Math.random()-.5,t[1]+Math.random()-.5,t[2]+Math.random()-.5,this._rootOriginId);return this._origins.set(this._rootOriginId,d),d}const r=this._gridSize,n=Math.round(t[0]/r),a=Math.round(t[1]/r),l=Math.round(t[2]/r),o=`${n}/${a}/${l}`;let s=this._origins.get(o);const c=.5*r;if(he(D,t,i.vec3),D[0]=Math.abs(D[0]),D[1]=Math.abs(D[1]),D[2]=Math.abs(D[2]),D[0]<c&&D[1]<c&&D[2]<c){if(s){const d=Math.max(...D);if(he(D,t,s.vec3),D[0]=Math.abs(D[0]),D[1]=Math.abs(D[1]),D[2]=Math.abs(D[2]),Math.max(...D)<d)return s}return i}return s||(s=_t(n*r,a*r,l*r,o),this._origins.set(o,s)),s}_drawOriginBox(t,i=qt(1,1,0,1)){const r=window.view,n=r._stage,a=i.toString();if(!this._objects.has(a)){this._material=new yr({width:2,color:i}),n.add(this._material);const u=new or(n,{pickable:!1}),O=new rr({castShadow:!1});n.add(O),u.add(O),this._objects.set(a,O)}const l=this._objects.get(a),o=[0,1,5,4,0,2,1,7,6,2,0,1,3,7,5,4,6,2,0],s=o.length,c=new Array(3*s),d=new Array,v=.5*this._gridSize;for(let u=0;u<s;u++)c[3*u]=t[0]+(1&o[u]?v:-v),c[3*u+1]=t[1]+(2&o[u]?v:-v),c[3*u+2]=t[2]+(4&o[u]?v:-v),u>0&&d.push(u-1,u);Ve(c,this._originSR,0,c,r.renderSpatialReference,0,s);const f=new Si(this._material,[[h.POSITION,new Kt(c,d,3,!0)]],null,Qe.Line);n.add(f),l.addGeometry(f)}get test(){}}const D=x();function Cn(e,t,i,r,n,a,l,o,s,c,d){const v=Wr[d.mode];let f,u,O=0;if(Ve(e,t,i,r,s.spatialReference,n,o))return v?.requiresAlignment(d)?(O=v.applyElevationAlignmentBuffer(r,n,a,l,o,s,c,d),f=a,u=l):(f=r,u=n),Ve(f,s.spatialReference,u,a,c.spatialReference,l,o)?O:void 0}function Ut(e,t,i,r,n){const a=(Rt(e)?e.z:Ct(e)?e.array[e.offset+2]:e[2])||0;switch(i.mode){case"on-the-ground":{const l=Ee(t,e,"ground")??0;return n.verticalDistanceToGround=0,n.sampledElevation=l,void(n.z=l)}case"relative-to-ground":{const l=Ee(t,e,"ground")??0,o=i.geometryZWithOffset(a,r);return n.verticalDistanceToGround=o,n.sampledElevation=l,void(n.z=o+l)}case"relative-to-scene":{const l=Ee(t,e,"scene")??0,o=i.geometryZWithOffset(a,r);return n.verticalDistanceToGround=o,n.sampledElevation=l,void(n.z=o+l)}case"absolute-height":{const l=i.geometryZWithOffset(a,r),o=Ee(t,e,"ground")??0;return n.verticalDistanceToGround=l-o,n.sampledElevation=o,void(n.z=l)}default:return void(n.z=0)}}function Dn(e,t,i,r){return Ut(e,t,i,r,oe),oe.z}function Ln(e,t,i){return t==="on-the-ground"&&i==="on-the-ground"?e.staysOnTheGround:t===i||t!=="on-the-ground"&&i!=="on-the-ground"?t==null||i==null?e.definedChanged:Je.UPDATE:e.onTheGroundChanged}function In(e){return e==="relative-to-ground"||e==="relative-to-scene"}function Pn(e){return e!=="absolute-height"}function wn(e,t,i,r,n){Ut(t,i,n,r,oe),wr(e,oe.verticalDistanceToGround);const a=oe.sampledElevation,l=$e(Vr,e.transformation);return Ae[0]=t.x,Ae[1]=t.y,Ae[2]=oe.z,Qi(t.spatialReference,Ae,l,r.spatialReference)?e.transformation=l:console.warn("Could not locate symbol object properly, it might be misplaced"),a}function wr(e,t){for(let i=0;i<e.geometries.length;++i){const r=e.geometries[i].getMutableAttribute(h.CENTEROFFSETANDDISTANCE);r&&r.data[3]!==t&&(r.data[3]=t,e.geometryVertexAttributeUpdated(e.geometries[i],h.CENTEROFFSETANDDISTANCE))}}function Nr(e,t,i,r,n,a){let l=0;const o=a.spatialReference;t*=3,r*=3;for(let s=0;s<n;++s){const c=e[t],d=e[t+1],v=e[t+2],f=a.getElevation(c,d,v,o,"ground")??0;l+=f,i[r]=c,i[r+1]=d,i[r+2]=f,t+=3,r+=3}return l/n}function Ur(e,t,i,r,n,a,l,o){let s=0;const c=o.calculateOffsetRenderUnits(l),d=o.featureExpressionInfoContext,v=a.spatialReference;t*=3,r*=3;for(let f=0;f<n;++f){const u=e[t],O=e[t+1],y=e[t+2],C=a.getElevation(u,O,y,v,"ground")??0;s+=C,i[r]=u,i[r+1]=O,i[r+2]=d==null?y+C+c:C+c,t+=3,r+=3}return s/n}function zr(e,t,i,r,n,a,l,o){let s=0;const c=o.calculateOffsetRenderUnits(l),d=o.featureExpressionInfoContext,v=a.spatialReference;t*=3,r*=3;for(let f=0;f<n;++f){const u=e[t],O=e[t+1],y=e[t+2],C=a.getElevation(u,O,y,v,"scene")??0;s+=C,i[r]=u,i[r+1]=O,i[r+2]=d==null?y+C+c:C+c,t+=3,r+=3}return s/n}function Fr(e){const t=e.meterUnitOffset,i=e.featureExpressionInfoContext;return t!==0||i!=null}function jr(e,t,i,r,n,a,l,o){const s=o.calculateOffsetRenderUnits(l),c=o.featureExpressionInfoContext;t*=3,r*=3;for(let d=0;d<n;++d){const v=e[t],f=e[t+1],u=e[t+2];i[r]=v,i[r+1]=f,i[r+2]=c==null?u+s:s,t+=3,r+=3}return 0}class Mr{constructor(){this.verticalDistanceToGround=0,this.sampledElevation=0,this.z=0}}var Je;(function(e){e[e.NONE=0]="NONE",e[e.UPDATE=1]="UPDATE",e[e.RECREATE=2]="RECREATE"})(Je||(Je={}));const Wr={"absolute-height":{applyElevationAlignmentBuffer:jr,requiresAlignment:Fr},"on-the-ground":{applyElevationAlignmentBuffer:Nr,requiresAlignment:()=>!0},"relative-to-ground":{applyElevationAlignmentBuffer:Ur,requiresAlignment:()=>!0},"relative-to-scene":{applyElevationAlignmentBuffer:zr,requiresAlignment:()=>!0}},Vr=Re(),oe=new Mr,Ae=x(),Br=()=>bt.getLogger("esri.views.3d.layers.graphics.featureExpressionInfoUtils");function kr(e){return{cachedResult:e.cachedResult,arcade:e.arcade?{func:e.arcade.func,context:e.arcade.modules.arcadeUtils.createExecContext(null,{sr:e.arcade.context.spatialReference}),modules:e.arcade.modules}:null}}async function Nn(e,t,i,r){const n=e?.expression;if(typeof n!="string")return null;const a=Gr(n);if(a!=null)return{cachedResult:a};const l=await $t();Ht(i);const o=l.arcadeUtils,s=o.createSyntaxTree(n);return o.dependsOnView(s)?(r?.error("Expressions containing '$view' are not supported on ElevationInfo"),{cachedResult:0}):{arcade:{func:o.createFunction(s),context:o.createExecContext(null,{sr:t}),modules:l}}}function $r(e,t,i){return e.arcadeUtils.createFeature(t.attributes,t.geometry,i)}function Hr(e,t){if(e!=null&&!zt(e)){if(!t||!e.arcade)return void Br().errorOncePerTick("Arcade support required but not provided");const i=t;i._geometry&&(i._geometry=Ki(i._geometry)),e.arcade.modules.arcadeUtils.updateExecContext(e.arcade.context,t)}}function Jr(e){if(e!=null){if(zt(e))return e.cachedResult;const t=e.arcade;let i=t?.modules.arcadeUtils.executeFunction(t.func,t.context);return typeof i!="number"&&(e.cachedResult=0,i=0),i}return 0}function Un(e,t=!1){let i=e?.featureExpressionInfo;const r=i?.expression;return t||r==="0"||(i=null),i??null}const zn={cachedResult:0};function zt(e){return e.cachedResult!=null}function Gr(e){return e==="0"?0:null}class Ft{constructor(){this._meterUnitOffset=0,this._renderUnitOffset=0,this._unit="meters",this._metersPerElevationInfoUnit=1,this._featureExpressionInfoContext=null,this.centerPointInElevationSR=null,this.mode=null}get featureExpressionInfoContext(){return this._featureExpressionInfoContext}get meterUnitOffset(){return this._meterUnitOffset}get unit(){return this._unit}set unit(t){this._unit=t,this._metersPerElevationInfoUnit=Xi(t)}get requiresSampledElevationInfo(){return this.mode!=="absolute-height"}reset(){this.mode=null,this._meterUnitOffset=0,this._renderUnitOffset=0,this._featureExpressionInfoContext=null,this.unit="meters"}set offsetMeters(t){this._meterUnitOffset=t,this._renderUnitOffset=0}set offsetElevationInfoUnits(t){this._meterUnitOffset=t*this._metersPerElevationInfoUnit,this._renderUnitOffset=0}addOffsetRenderUnits(t){this._renderUnitOffset+=t}geometryZWithOffset(t,i){const r=this.calculateOffsetRenderUnits(i);return this.featureExpressionInfoContext!=null?r:t+r}calculateOffsetRenderUnits(t){let i=this._meterUnitOffset;const r=this.featureExpressionInfoContext;return r!=null&&(i+=Jr(r)*this._metersPerElevationInfoUnit),i/t.unitInMeters+this._renderUnitOffset}setFromElevationInfo(t){this.mode=t.mode,this.unit=qi(t.unit)?t.unit:"meters",this.offsetElevationInfoUnits=t.offset??0}updateFeatureExpressionInfoContext(t,i,r){if(t==null)return void(this._featureExpressionInfoContext=null);const n=t?.arcade;n&&i!=null&&r!=null?(this._featureExpressionInfoContext=kr(t),Hr(this._featureExpressionInfoContext,$r(n.modules,i,r))):this._featureExpressionInfoContext=t}static fromElevationInfo(t){const i=new Ft;return t!=null&&i.setFromElevationInfo(t),i}}const Zr=Object.freeze(Object.defineProperty({__proto__:null,build:wt,ribbonlineNumRoundJoinSubdivisions:ve},Symbol.toStringTag,{value:"Module"}));export{rr as A,Ln as B,or as D,Mr as G,wn as H,lr as I,Hr as J,St as K,Cn as M,vr as N,gt as Q,Rn as R,Tr as U,Dn as V,yr as W,te as X,xn as a,zn as b,Je as c,In as d,Tt as e,Ee as f,Nn as g,$r as h,Ut as i,Pn as j,wr as k,Pt as l,ie as m,Un as n,me as o,Ft as r,_t as t,An as u,Ce as v,j as z};
