import{dn as q,a2 as ut,ao as dt,gJ as ft,dh as pt,v as y,aq as ht}from"./main-D8UjLOIQ.js";import{a as gt}from"./floatRGBA-DRFmbkvz-CxBD2kJ3.js";import{a as Fe,o as fe,f as Se,m as mt,r as vt}from"./vec4f64-DD-nkcCV-CSNWKRqG.js";import{d as St,m as Z,u as xt,f as Ge,k as Ye,x as B,g as Ct,Y as Ot,K as bt,_ as Pt,z as At,A as Tt,q as yt,o as zt,H as Et,V as Ft,W as Rt,S as It,v as Re,h as Ie,p as wt,D as Dt,r as we,N as _t,C as $t,s as oe,w as Mt,B as Lt,F as jt,n as Nt,I as Ut,P as Bt,U as Vt,y as qt,Q as De,R as ge,O as _e,Z as $e,t as Ht,$ as Gt,b as Yt,c as Zt,a as kt,a0 as Wt,a1 as Xt,a2 as Qt,a3 as Kt,a4 as z}from"./OutputColorHighlightOID.glsl-BdXTjs7_-CKA6PhQ5.js";import{T as Me,L as Jt,U as Le}from"./enums-wEDHPbCF-Cf76M5_x.js";import{P as Ze}from"./mat3-DOnW3DjW-C3hbW9XY.js";import{n as ke}from"./mat3f64-BnNZDR5l-Bz3OL2oI.js";import{z as We}from"./mat4-OOmHNWi7-Bnj6TIOE.js";import{n as eo}from"./mat4f64-xsZDPPj0-Dq35B4BL.js";import{d as to,m as Te,z as oo}from"./vec2-BnynUbeJ-Bdx0nwES.js";import{r as Xe,o as ye}from"./vec2f64-CkowXrDb-3zFQ3LNH.js";import{A as le,Y as k,l as xe,r as Qe,L as V,_ as H,b as ae,g as Ke,P as ze,k as io,Z as ao,y as ro}from"./vec32-Cj8pVsU0-BmYyqgTW.js";import{c as so,U as no,T as je,E as lo,x as co,L as Ne}from"./BufferView-wDxx79o3-CaImLZVj.js";import{e as uo}from"./InterleavedLayout-C2YUDwKf-DGaiAF6f.js";import{u as me,h as Je,o as U}from"./ShaderOutput-CUn9tpiG-CW1Nc608.js";import{F as fo,b as po,s as ho,S as go,j as et}from"./dehydratedFeatureUtils-OR1UjA48-eHH97TFs.js";import{T as d}from"./VertexAttribute-hUz6pozM-Bx3V-z96.js";import{K as mo,D as vo,m as So,N as xo}from"./renderState-BM-MCKUz-CZGNA7AS.js";import{e as f,u as F}from"./glsl-Z5uYj8ka-BRgh2Cgo.js";import{n as Co}from"./BindType-CKbZk6AG-Bqvzo9NX.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import{v as Oo}from"./ShaderBuilder-CU5v4tk1-qD9qPa-X.js";let bo=class extends Qt{constructor(e,t){super(e,"vec4",Co.Draw,(o,i,a)=>o.setUniform4fv(e,t(i,a)))}};const Ee=128,Y=.5,xi=Se(Y/2,Y/2,1-Y/2,1-Y/2);function Ci(e){return e==="cross"||e==="x"}function Oi(e,t=Ee,o=t*Y,i=0){const{data:a,parameters:s}=Po(e,t,o,i);return new Kt(a,s)}function Po(e,t=Ee,o=t*Y,i=0){return{data:Ao(e,t,o,i),parameters:{mipmap:!1,wrap:{s:Le.CLAMP_TO_EDGE,t:Le.CLAMP_TO_EDGE},width:t,height:t,components:4,noUnpackFlip:!0,reloadable:!0}}}function Ao(e,t=Ee,o=t*Y,i=0){switch(e){case"circle":default:return To(t,o);case"square":return yo(t,o);case"cross":return Eo(t,o,i);case"x":return Fo(t,o,i);case"kite":return zo(t,o);case"triangle":return Ro(t,o);case"arrow":return Io(t,o)}}function To(e,t){const o=e/2-.5;return se(e,it(o,o,t/2))}function yo(e,t){return tt(e,t,!1)}function zo(e,t){return tt(e,t,!0)}function Eo(e,t,o=0){return ot(e,t,!1,o)}function Fo(e,t,o=0){return ot(e,t,!0,o)}function Ro(e,t){return se(e,at(e/2,t,t/2))}function Io(e,t){const o=t,i=t/2,a=e/2,s=.8*o,r=it(a,(e-t)/2-s,Math.sqrt(s*s+i*i)),c=at(a,o,i);return se(e,(l,n)=>Math.max(c(l,n),-r(l,n)))}function tt(e,t,o){return o&&(t/=Math.SQRT2),se(e,(i,a)=>{let s=i-.5*e+.25,r=.5*e-a-.75;if(o){const c=(s+r)/Math.SQRT2;r=(r-s)/Math.SQRT2,s=c}return Math.max(Math.abs(s),Math.abs(r))-.5*t})}function ot(e,t,o,i=0){t-=i,o&&(t*=Math.SQRT2);const a=.5*t;return se(e,(s,r)=>{let c,l=s-.5*e,n=.5*e-r-1;if(o){const p=(l+n)/Math.SQRT2;n=(n-l)/Math.SQRT2,l=p}return l=Math.abs(l),n=Math.abs(n),c=l>n?l>a?Math.sqrt((l-a)*(l-a)+n*n):n:n>a?Math.sqrt(l*l+(n-a)*(n-a)):l,c-=i/2,c})}function it(e,t,o){return(i,a)=>{const s=i-e,r=a-t;return Math.sqrt(s*s+r*r)-o}}function at(e,t,o){const i=Math.sqrt(t*t+o*o);return(a,s)=>{const r=Math.abs(a-e)-o,c=s-e+t/2+.75,l=(t*r+o*c)/i,n=-c;return Math.max(l,n)}}function se(e,t){const o=new Uint8Array(4*e*e);for(let i=0;i<e;i++)for(let a=0;a<e;a++){const s=a+e*i;let r=t(a,i);r=r/e+.5,gt(r,o,4*s)}return o}function wo(e){return e instanceof Float32Array&&e.length>=16}function Do(e){return Array.isArray(e)&&e.length>=16}function _o(e){return wo(e)||Do(e)}class $o{constructor(){this.factor=new Ue,this.factorAlignment=new Ue}}class Ue{constructor(){this.scale=0,this.factor=0,this.minScaleFactor=0}}function Mo(e,t){const{vertex:o,fragment:i}=e;e.include(Xt,t),o.include(et),o.main.add(f`vec4 posProjCenter;
if (dot(position, position) > 0.0) {
ProjectHUDAux projectAux;
vec4 posProj = projectPositionHUD(projectAux);
posProjCenter = alignToPixelCenter(posProj, viewport.zw);
forwardViewPosDepth(projectAux.posView);
vec3 vpos = projectAux.posModel;
if (rejectBySlice(vpos)) {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
} else {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
gl_Position = posProjCenter;
gl_PointSize = 1.0;`),i.main.add(f`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function rt(e){const t=new Oo,{signedDistanceFieldEnabled:o,occlusionTestEnabled:i,horizonCullingEnabled:a,pixelSnappingEnabled:s,hasScreenSizePerspective:r,debugDrawLabelBorder:c,vvSize:l,vvColor:n,hasRotation:p,occludedFragmentFade:v,sampleSignedDistanceFieldTexelCenter:g}=e;t.include(po,e),t.vertex.include(jt,e);const{occlusionPass:A,output:I,oitPass:T}=e;if(A)return t.include(Mo,e),t;const{vertex:x,fragment:O}=t;t.include(Nt),t.include(Ut,e),t.include(Bt,e),i&&t.include(ho),O.include(go),O.include(Vt),t.varyings.add("vcolor","vec4"),t.varyings.add("vtc","vec2"),t.varyings.add("vsize","vec2");const b=I===U.Highlight,w=b&&i;w&&t.varyings.add("voccluded","float"),x.uniforms.add(new qt("viewport",u=>u.camera.fullViewport),new De("screenOffset",(u,M)=>Te(ce,2*u.screenOffset[0]*M.camera.pixelRatio,2*u.screenOffset[1]*M.camera.pixelRatio)),new De("anchorPosition",u=>X(u)),new ge("materialColor",u=>u.color),new _e("materialRotation",u=>u.rotation),new $e("tex",u=>u.texture)),Ht(x),o&&(x.uniforms.add(new ge("outlineColor",u=>u.outlineColor)),O.uniforms.add(new ge("outlineColor",u=>Be(u)?u.outlineColor:mt),new _e("outlineSize",u=>Be(u)?u.outlineSize:0))),a&&x.uniforms.add(new bo("pointDistanceSphere",(u,M)=>{const $=M.camera.eye,_=u.origin;return vt(_[0]-$[0],_[1]-$[1],_[2]-$[2],pt.radius)})),s&&x.include(et),r&&(Gt(x),Yt(x)),c&&t.varyings.add("debugBorderCoords","vec4"),t.attributes.add(d.UVI,"vec2"),t.attributes.add(d.COLOR,"vec4"),t.attributes.add(d.SIZE,"vec2"),t.attributes.add(d.ROTATION,"float"),(l||n)&&t.attributes.add(d.FEATUREATTRIBUTE,"vec4"),x.code.add(a?f`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:f`bool behindHorizon(vec3 posModel) { return false; }`),x.main.add(f`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    if (behindHorizon(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    vec2 inputSize;
    ${F(r,f`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,f`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${F(l,f`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${F(i,f`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${F(c,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${F(w,f`voccluded = visible ? 0.0 : 1.0;`)}
  `);const R=f`
      vec2 uvi1 = vec2(uvi.x < 0.0 ? 1.0 : 0.0, uvi.y < 0.0 ? 1.0 : 0.0);
      vec2 uv = abs(uvi + uvi1);
      vec2 texSize = vec2(textureSize(tex, 0));
      uv.x = uv.x >= ${Ve} ? 1.0 : uv.x / texSize.x;
      uv.y = uv.y >= ${Ve} ? 1.0 : uv.y / texSize.y;
      quadOffset.xy = (uvi1 - anchorPosition) * 2.0 * combinedSize;

      ${F(p,f`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,S=s?o?f`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:f`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:f`posProj += quadOffset;`;x.main.add(f`
    ${R}
    ${n?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${F(I===U.ObjectAndLayerIdColor,f`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${f.float(B)};
    ${F(o,`alphaDiscard = alphaDiscard && outlineColor.a < ${f.float(B)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${S}
      gl_Position = posProj;
    }

    vtc = uv;

    ${F(c,f`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),O.uniforms.add(new $e("tex",u=>u.texture)),v&&!b&&O.uniforms.add(new Zt("depthMap",u=>u.mainDepth),new kt("occludedOpacity",u=>u.hudOccludedFragmentOpacity));const j=c?f`(isBorder > 0.0 ? 0.0 : ${f.float(B)})`:f.float(B),D=f`
    ${F(c,f`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${F(g,f`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${o?f`
      vec4 fillPixelColor = vcolor;

      // Get distance and map it into [-0.5, 0.5]
      float d = rgbaTofloat(texture(tex, samplePos)) - 0.5;

      // Distance in output units (i.e. pixels)
      float dist = d * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - dist, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(dist) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${j} ||
          fillPixelColor.a + outlinePixelColor.a < ${f.float(B)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${F(!b,f`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${j}) {
          discard;
        }

        ${F(!b,f`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-dist/vsize.x*2.0, 0.0, 1.0), clamp(dist/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:f`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${j}) {
            discard;
          }
          ${F(!b,f`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${F(v&&!b,f`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${F(!b&&c,f`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(I){case U.Color:case U.ColorEmission:t.outputs.add("fragColor","vec4",0),I===U.ColorEmission&&t.outputs.add("fragEmission","vec4",1),T===oe.ColorAlpha&&t.outputs.add("fragAlpha","float",I===U.ColorEmission?2:1),O.main.add(f`
        ${D}
        ${F(T===oe.FrontFace,f`fragColor.rgb /= fragColor.a;`)}
        ${F(I===U.ColorEmission,f`fragEmission = vec4(0.0);`)}
        ${F(T===oe.ColorAlpha,f`fragAlpha = fragColor.a;`)}`);break;case U.ObjectAndLayerIdColor:O.main.add(f`
        ${D}
        outputObjectAndLayerIdColor();`);break;case U.Highlight:t.include(Wt,e),O.main.add(f`
        ${D}
        outputHighlight(${F(w,f`voccluded == 1.0`,f`false`)});`)}return t}function Be(e){return e.outlineColor[3]>0&&e.outlineSize>0}function X(e){return e.textureIsSignedDistanceField?Lo(e.anchorPosition,e.distanceFieldBoundingBox,ce):to(ce,e.anchorPosition),ce}function Lo(e,t,o){Te(o,e[0]*(t[2]-t[0])+t[0],e[1]*(t[3]-t[1])+t[1])}const ce=ye(),re=32e3,Ve=f.float(re),jo=Object.freeze(Object.defineProperty({__proto__:null,build:rt,calculateAnchorPosition:X,fullUV:re},Symbol.toStringTag,{value:"Module"}));class No extends _t{constructor(t,o){super(t,o,new $t(jo,()=>Promise.resolve().then(()=>Xo))),this.primitiveType=o.occlusionPass?Me.POINTS:Me.TRIANGLES}initializePipeline(t){const{oitPass:o,hasPolygonOffset:i,draped:a,output:s,depthTestEnabled:r,occlusionPass:c}=t,l=o===oe.NONE,n=o===oe.ColorAlpha,p=s===U.Highlight,v=r&&!a&&!n&&!c&&!p;return mo({blending:Je(s)?l?vo:Lt(o):null,depthTest:r&&!a?{func:Jt.LEQUAL}:null,depthWrite:v?xo:null,drawBuffers:Mt(o,s),colorWrite:So,polygonOffset:i?Uo:null})}}const Uo={factor:0,units:-4};class P extends bt{constructor(t){super(),this.spherical=t,this.screenCenterOffsetUnitsEnabled=!1,this.occlusionTestEnabled=!0,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.vvSize=!1,this.vvColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.hasPolygonOffset=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.occludedFragmentFade=!1,this.objectAndLayerIdColorInstanced=!1,this.horizonCullingEnabled=!0,this.isFocused=!0,this.textureCoordinateType=Pt.None,this.emissionSource=At.None,this.discardInvisibleFragments=!0,this.hasVvInstancing=!1,this.snowCover=!1}}y([z()],P.prototype,"screenCenterOffsetUnitsEnabled",void 0),y([z()],P.prototype,"occlusionTestEnabled",void 0),y([z()],P.prototype,"signedDistanceFieldEnabled",void 0),y([z()],P.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),y([z()],P.prototype,"vvSize",void 0),y([z()],P.prototype,"vvColor",void 0),y([z()],P.prototype,"hasVerticalOffset",void 0),y([z()],P.prototype,"hasScreenSizePerspective",void 0),y([z()],P.prototype,"hasRotation",void 0),y([z()],P.prototype,"debugDrawLabelBorder",void 0),y([z()],P.prototype,"hasPolygonOffset",void 0),y([z()],P.prototype,"depthTestEnabled",void 0),y([z()],P.prototype,"pixelSnappingEnabled",void 0),y([z()],P.prototype,"draped",void 0),y([z()],P.prototype,"terrainDepthTest",void 0),y([z()],P.prototype,"cullAboveTerrain",void 0),y([z()],P.prototype,"occlusionPass",void 0),y([z()],P.prototype,"occludedFragmentFade",void 0),y([z()],P.prototype,"objectAndLayerIdColorInstanced",void 0),y([z()],P.prototype,"horizonCullingEnabled",void 0),y([z()],P.prototype,"isFocused",void 0);let bi=class extends St{constructor(e,t){super(e,Zo),this.produces=new Map([[Z.HUD_MATERIAL,o=>me(o)&&!this.parameters.drawAsLabel],[Z.LABEL_MATERIAL,o=>me(o)&&this.parameters.drawAsLabel],[Z.OCCLUSION_PIXELS,()=>this.parameters.occlusionTest],[Z.DRAPED_MATERIAL,o=>this.parameters.draped&&me(o)]]),this._visible=!0,this._configuration=new P(t)}getConfiguration(e,t){const o=this.parameters.draped;return super.getConfiguration(e,t,this._configuration),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasVerticalOffset=!!this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration.screenCenterOffsetUnitsEnabled=this.parameters.centerOffsetUnits==="screen",this._configuration.hasPolygonOffset=this.parameters.polygonOffset,this._configuration.draped=o,this._configuration.occlusionTestEnabled=this.parameters.occlusionTest,this._configuration.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,this._configuration.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,this._configuration.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,this._configuration.hasRotation=this.parameters.hasRotation,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.occlusionPass=t.slot===Z.OCCLUSION_PIXELS,this._configuration.occludedFragmentFade=!o&&this.parameters.occludedFragmentFade,this._configuration.horizonCullingEnabled=this.parameters.horizonCullingEnabled,this._configuration.isFocused=this.parameters.isFocused,this._configuration.depthTestEnabled=this.parameters.depthEnabled||t.slot===Z.OCCLUSION_PIXELS,Je(e)&&(this._configuration.debugDrawLabelBorder=!!xt.LABELS_SHOW_BORDER),this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest,this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}intersect(e,t,o,i,a,s){const{options:{selectionMode:r,hud:c,excludeLabels:l},point:n,camera:p}=o,{parameters:v}=this;if(!r||!c||l&&v.isLabel||!e.visible||!n||!p)return;const g=e.attributes.get(d.FEATUREATTRIBUTE),A=g==null?null:Fe(g.data,be),{scaleX:I,scaleY:T}=Pe(A,v,p.pixelRatio);Ze(ue,t),e.attributes.has(d.FEATUREATTRIBUTE)&&qo(ue);const x=e.attributes.get(d.POSITION),O=e.attributes.get(d.SIZE),b=e.attributes.get(d.NORMAL),w=e.attributes.get(d.ROTATION),R=e.attributes.get(d.CENTEROFFSETANDDISTANCE);so(x.size>=3);const S=X(v),j=this.parameters.centerOffsetUnits==="screen";for(let D=0;D<x.data.length/x.size;D++){const u=D*x.size;le(h,x.data[u],x.data[u+1],x.data[u+2]),k(h,h,t),k(h,h,p.viewMatrix);const M=D*R.size;if(le(C,R.data[M],R.data[M+1],R.data[M+2]),!j&&(h[0]+=C[0],h[1]+=C[1],C[2]!==0)){const _=C[2];xe(C,h),Qe(h,h,V(C,C,_))}const $=D*b.size;if(le(G,b.data[$],b.data[$+1],b.data[$+2]),Ce(G,ue,p,ie),Ae(this.parameters,h,ie,p,W),p.applyProjection(h,m),m[0]>-1){j&&(C[0]||C[1])&&(m[0]+=C[0]*p.pixelRatio,C[1]!==0&&(m[1]+=Ge(C[1],W.factorAlignment)*p.pixelRatio),p.unapplyProjection(m,h)),m[0]+=this.parameters.screenOffset[0]*p.pixelRatio,m[1]+=this.parameters.screenOffset[1]*p.pixelRatio,m[0]=Math.floor(m[0]),m[1]=Math.floor(m[1]);const _=D*O.size;E[0]=O.data[_],E[1]=O.data[_+1],Ye(E,W.factor,E);const Q=lt*p.pixelRatio;let K=0;v.textureIsSignedDistanceField&&(K=Math.min(v.outlineSize,.5*E[0])*p.pixelRatio/2),E[0]*=I,E[1]*=T;const pe=D*w.size,he=v.rotation+w.data[pe];if(Oe(n,m[0],m[1],E,Q,K,he,v,S)){const J=o.ray;if(k(de,h,We(nt,p.viewMatrix)),m[0]=n[0],m[1]=n[1],p.unprojectFromRenderScreen(m,h)){const N=q();H(N,J.direction);const ee=1/ae(N);V(N,N,ee),s(Ke(J.origin,h)*ee,N,-1,de)}}}}}intersectDraped(e,t,o,i,a){const s=e.attributes.get(d.POSITION),r=e.attributes.get(d.SIZE),c=e.attributes.get(d.ROTATION),l=this.parameters,n=X(l),p=e.attributes.get(d.FEATUREATTRIBUTE),v=p==null?null:Fe(p.data,be),{scaleX:g,scaleY:A}=Pe(v,l,e.screenToWorldRatio),I=Go*e.screenToWorldRatio;for(let T=0;T<s.data.length/s.size;T++){const x=T*s.size,O=s.data[x],b=s.data[x+1],w=T*r.size;E[0]=r.data[w],E[1]=r.data[w+1];let R=0;l.textureIsSignedDistanceField&&(R=Math.min(l.outlineSize,.5*E[0])*e.screenToWorldRatio/2),E[0]*=g,E[1]*=A;const S=T*c.size,j=l.rotation+c.data[S];Oe(o,O,b,E,I,R,j,l,n)&&i(a.distance,a.normal,-1)}}createBufferWriter(){return new Wo}applyShaderOffsetsView(e,t,o,i,a,s,r){const c=Ce(t,o,a,ie);return this._applyVerticalGroundOffsetView(e,c,a,r),Ae(this.parameters,r,c,a,s),this._applyPolygonOffsetView(r,c,i[3],a,r),this._applyCenterOffsetView(r,i,r),r}applyShaderOffsetsNDC(e,t,o,i,a){return this._applyCenterOffsetNDC(e,t,o,i),a!=null&&H(a,i),this._applyPolygonOffsetNDC(i,t,o,i),i}_applyPolygonOffsetView(e,t,o,i,a){const s=i.aboveGround?1:-1;let r=Math.sign(o);r===0&&(r=s);const c=s*r;if(this.parameters.shaderPolygonOffset<=0)return H(a,e);const l=ut(Math.abs(t.cosAngle),.01,1),n=1-Math.sqrt(1-l*l)/l/i.viewport[2];return V(a,e,c>0?n:1/n),a}_applyVerticalGroundOffsetView(e,t,o,i){const a=ae(e),s=o.aboveGround?1:-1,r=o.computeRenderPixelSizeAtDist(a)*fo,c=V(h,t.normal,s*r);return ze(i,e,c),i}_applyCenterOffsetView(e,t,o){const i=this.parameters.centerOffsetUnits!=="screen";return o!==e&&H(o,e),i&&(o[0]+=t[0],o[1]+=t[1],t[2]&&(xe(G,o),io(o,o,V(G,G,t[2])))),o}_applyCenterOffsetNDC(e,t,o,i){const a=this.parameters.centerOffsetUnits!=="screen";return i!==e&&H(i,e),a||(i[0]+=t[0]/o.fullWidth*2,i[1]+=t[1]/o.fullHeight*2),i}_applyPolygonOffsetNDC(e,t,o,i){const a=this.parameters.shaderPolygonOffset;if(e!==i&&H(i,e),a){const s=o.aboveGround?1:-1,r=s*Math.sign(t[3]);i[2]-=(r||s)*a}return i}set visible(e){this._visible=e}get visible(){const{color:e,outlineSize:t,outlineColor:o}=this.parameters,i=e[3]>=B||t>=B&&o[3]>=B;return this._visible&&i}createGLMaterial(e){return new Bo(e)}calculateRelativeScreenBounds(e,t,o=dt()){return Vo(this.parameters,e,t,o),o[2]=o[0]+e[0],o[3]=o[1]+e[1],o}};class Bo extends Dt{constructor(t){super({...t,...t.material.parameters})}beginSlot(t){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(No,t)}}function Vo(e,t,o,i){i[0]=e.anchorPosition[0]*-t[0]+e.screenOffset[0]*o,i[1]=e.anchorPosition[1]*-t[1]+e.screenOffset[1]*o}function Ce(e,t,o,i){return _o(t)&&(t=Ze(Ho,t)),ao(i.normal,e,t),k(i.normal,i.normal,o.viewInverseTransposeMatrix),i.cosAngle=ro(st,Yo),i}function qo(e){const t=e[0],o=e[1],i=e[2],a=e[3],s=e[4],r=e[5],c=e[6],l=e[7],n=e[8],p=1/Math.sqrt(t*t+o*o+i*i),v=1/Math.sqrt(a*a+s*s+r*r),g=1/Math.sqrt(c*c+l*l+n*n);return e[0]=t*p,e[1]=o*p,e[2]=i*p,e[3]=a*v,e[4]=s*v,e[5]=r*v,e[6]=c*g,e[7]=l*g,e[8]=n*g,e}function Oe(e,t,o,i,a,s,r,c,l){let n=t-a-i[0]*l[0],p=n+i[0]+2*a,v=o-a-i[1]*l[1],g=v+i[1]+2*a;const A=c.distanceFieldBoundingBox;return c.textureIsSignedDistanceField&&A!=null&&(n+=i[0]*A[0],v+=i[1]*A[1],p-=i[0]*(1-A[2]),g-=i[1]*(1-A[3]),n-=s,p+=s,v-=s,g+=s),Te(qe,t,o),oo(te,e,qe,ht(r)),te[0]>n&&te[0]<p&&te[1]>v&&te[1]<g}const W=new $o,h=q(),G=q(),m=fe(),st=q(),de=q(),te=ye(),qe=ye(),ue=ke(),Ho=ke(),nt=eo(),ne=fe(),C=q(),ve=q(),be=fe(),ie={normal:st,cosAngle:0},lt=1,Go=2,E=Xe(0,0),L=6,Yo=ft(0,0,1);class Zo extends Ct{constructor(){super(...arguments),this.renderOccluded=Ot.Occlude,this.isDecoration=!1,this.color=Se(1,1,1,1),this.polygonOffset=!1,this.anchorPosition=Xe(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=Se(1,1,1,1),this.outlineSize=0,this.distanceFieldBoundingBox=fe(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.occlusionTest=!0,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!1,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.isFocused=!0,this.focusStyle="bright",this.draped=!1,this.isLabel=!1}}const ct=uo().vec3f(d.POSITION).vec3f(d.NORMAL).vec2i16(d.UVI).vec4u8(d.COLOR).vec2f(d.SIZE).f32(d.ROTATION).vec4f(d.CENTEROFFSETANDDISTANCE).vec4f(d.FEATUREATTRIBUTE),ko=ct.clone().vec4u8(d.OLIDCOLOR);class Wo{constructor(){this.vertexBufferLayout=zt()?ko:ct}elementCount(t){return t.get(d.POSITION).indices.length*L}write(t,o,i,a,s,r){const{position:c,normal:l,uvi:n,color:p,size:v,rotation:g,centerOffsetAndDistance:A,featureAttribute:I}=s;Et(i.get(d.POSITION),t,c,r,L),Ft(i.get(d.NORMAL),o,l,r,L);const T=i.get(d.UVI)?.data;let x=0,O=0,b=-1-re,w=-1-re;T&&T.length>=4&&(x=T[0],O=T[1],b=-1-T[2],w=-1-T[3]);let R=i.get(d.POSITION).indices.length,S=r;for(let u=0;u<R;++u)n.set(S,0,x),n.set(S,1,O),S++,n.set(S,0,b),n.set(S,1,O),S++,n.set(S,0,b),n.set(S,1,w),S++,n.set(S,0,b),n.set(S,1,w),S++,n.set(S,0,x),n.set(S,1,w),S++,n.set(S,0,x),n.set(S,1,O),S++;Rt(i.get(d.COLOR),4,p,r,L);const{data:j,indices:D}=i.get(d.SIZE);R=D.length,S=r;for(let u=0;u<R;++u){const M=j[2*D[u]],$=j[2*D[u]+1];for(let _=0;_<L;++_)v.set(S,0,M),v.set(S,1,$),S++}if(It(i.get(d.ROTATION),g,r,L),i.get(d.CENTEROFFSETANDDISTANCE)?Re(i.get(d.CENTEROFFSETANDDISTANCE),A,r,L):Ie(A,r,R*L),i.get(d.FEATUREATTRIBUTE)?Re(i.get(d.FEATUREATTRIBUTE),I,r,L):Ie(I,r,R*L),a!=null){const u=i.get(d.POSITION)?.indices;if(u){const M=u.length,$=s.getField(d.OLIDCOLOR,no);wt(a,$,M,r,L)}}return{numVerticesPerItem:L,numItems:R}}intersect(t,o,i,a,s,r,c){const{options:{selectionMode:l,hud:n,excludeLabels:p},point:v,camera:g}=a;if(!l||!n||p&&o.isLabel||!v)return;const A=this.vertexBufferLayout.createView(t),I=A.getField(d.POSITION,je),T=A.getField(d.NORMAL,je),x=A.getField(d.ROTATION,lo),O=A.getField(d.SIZE,co),b=A.getField(d.FEATUREATTRIBUTE,Ne),w=A.getField(d.CENTEROFFSETANDDISTANCE,Ne),R=o.centerOffsetUnits==="screen",S=X(o);if(I==null||T==null||x==null||O==null||w==null||g==null)return;const j=b==null?null:b.getVec(0,be),{scaleX:D,scaleY:u}=Pe(j,o,g.pixelRatio),M=I.count/L;for(let $=0;$<M;$++){const _=$*L;if(I.getVec(_,h),i!=null&&ze(h,h,i),k(h,h,g.viewMatrix),w.getVec(_,ne),le(C,ne[0],ne[1],ne[2]),!R&&(h[0]+=C[0],h[1]+=C[1],C[2]!==0)){const Q=C[2];xe(C,h),Qe(h,h,V(C,C,Q))}if(T.getVec(_,G),Ce(G,ue,g,ie),Ae(o,h,ie,g,W),g.applyProjection(h,m),m[0]>-1){R&&(C[0]||C[1])&&(m[0]+=C[0]*g.pixelRatio,C[1]!==0&&(m[1]+=Ge(C[1],W.factorAlignment)*g.pixelRatio),g.unapplyProjection(m,h)),m[0]+=o.screenOffset[0]*g.pixelRatio,m[1]+=o.screenOffset[1]*g.pixelRatio,m[0]=Math.floor(m[0]),m[1]=Math.floor(m[1]),O.getVec(_,E),Ye(E,W.factor,E);const Q=lt*g.pixelRatio;let K=0;o.textureIsSignedDistanceField&&(K=Math.min(o.outlineSize,.5*E[0])*g.pixelRatio/2),E[0]*=D,E[1]*=u;const pe=x.get(_),he=o.rotation+pe;if(Oe(v,m[0],m[1],E,Q,K,he,o,S)){const J=a.ray;if(k(de,h,We(nt,g.viewMatrix)),m[0]=v[0],m[1]=v[1],g.unprojectFromRenderScreen(m,h)){const N=q();H(N,J.direction);const ee=1/ae(N);V(N,N,ee),c(Ke(J.origin,h)*ee,N,$,de)}}}}}}function Pe(e,t,o){return e==null||t.vvSize==null?{scaleX:o,scaleY:o}:(Tt(ve,t,e),{scaleX:ve[0]*o,scaleY:ve[1]*o})}function Ae(e,t,o,i,a){if(!e.verticalOffset?.screenLength)return e.screenSizePerspective||e.screenSizePerspectiveAlignment?He(e,a,ae(t),o.cosAngle):(a.factor.scale=1,a.factorAlignment.scale=1),t;const s=ae(t),r=e.screenSizePerspectiveAlignment??e.screenSizePerspective,c=yt(i,s,e.verticalOffset,o.cosAngle,r);return He(e,a,s,o.cosAngle),V(o.normal,o.normal,c),ze(t,t,o.normal)}function He(e,t,o,i){e.screenSizePerspective!=null?we(i,o,e.screenSizePerspective,t.factor):(t.factor.scale=1,t.factor.factor=0,t.factor.minScaleFactor=0),e.screenSizePerspectiveAlignment!=null?we(i,o,e.screenSizePerspectiveAlignment,t.factorAlignment):(t.factorAlignment.factor=t.factor.factor,t.factorAlignment.scale=t.factor.scale,t.factorAlignment.minScaleFactor=t.factor.minScaleFactor)}const Xo=Object.freeze(Object.defineProperty({__proto__:null,build:rt,calculateAnchorPosition:X,fullUV:re},Symbol.toStringTag,{value:"Module"}));export{Ci as A,bi as H,xi as P,Po as Z,Y as a,Ee as c,Oi as z};
