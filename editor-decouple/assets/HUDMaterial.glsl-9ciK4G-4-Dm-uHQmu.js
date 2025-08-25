import{v as y,dh as ut,J as dt,b9 as pt,ay as ft,du as q,gL as ht}from"./main-ChKuQKYp.js";import{a as gt}from"./floatRGBA-DRFmbkvz-BIenP1di.js";import{m as mt,r as vt,f as Se,a as Fe,o as pe}from"./vec4f64-DD-nkcCV-CSNWKRqG.js";import{q as St,n as xt,d as Ct,f as Ot,U as bt,y as Pt,g as Re,_ as ge,O as Ie,h as we,t as At,o as Tt,b as yt,x as B,c as zt,a as Et,k as Ft,m as oe,p as z,D as Rt,r as It,K as wt,s as Dt,z as _t,v as $t,w as Mt,A as Z,u as Lt,B as Ge,C as Ye,F as jt,H as Nt,Y as Ut,I as Bt,N as Vt,V as qt,W as Ht,S as Gt,P as De,Q as _e,R as Yt,Z as Zt,$ as kt,a0 as $e,a1 as Wt,a2 as Xt,a3 as Qt,a4 as Kt}from"./OutputColorHighlightOID.glsl-BdXTjs7_-BMQEqH8g.js";import{U as Me,T as Le,L as Jt}from"./enums-wEDHPbCF-Cf76M5_x.js";import{P as Ze}from"./mat3-DOnW3DjW-C3hbW9XY.js";import{n as ke}from"./mat3f64-BnNZDR5l-Bz3OL2oI.js";import{z as We}from"./mat4-OOmHNWi7-CRxw8n_D.js";import{n as eo}from"./mat4f64-xsZDPPj0-Dq35B4BL.js";import{m as Te,d as to,z as oo}from"./vec2-BnynUbeJ-CKtGJQAy.js";import{o as ye,r as Xe}from"./vec2f64-CkowXrDb-3zFQ3LNH.js";import{A as le,Y as k,l as xe,r as Qe,L as V,_ as H,b as re,g as Ke,P as ze,k as io,Z as ro,y as ao}from"./vec32-Cj8pVsU0-DZ4gXEA7.js";import{c as so,U as no,T as je,E as lo,x as co,L as Ne}from"./BufferView-wDxx79o3-CY0R_-IX.js";import{e as uo}from"./InterleavedLayout-C2YUDwKf-DQ4QBY7C.js";import{o as U,u as me,h as Je}from"./ShaderOutput-CUn9tpiG-CW1Nc608.js";import{b as po,s as fo,S as ho,j as et,F as go}from"./dehydratedFeatureUtils-OR1UjA48-CMYoAlcZ.js";import{T as d}from"./VertexAttribute-hUz6pozM-Bx3V-z96.js";import{K as mo,D as vo,N as So,m as xo}from"./renderState-BM-MCKUz-CkGIEsl7.js";import{e as p,u as F}from"./glsl-Z5uYj8ka-BRgh2Cgo.js";import{n as Co}from"./BindType-CKbZk6AG-Bqvzo9NX.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import{v as Oo}from"./ShaderBuilder-CU5v4tk1-DN2dafJ9.js";let bo=class extends Rt{constructor(e,t){super(e,"vec4",Co.Draw,(o,i,r)=>o.setUniform4fv(e,t(i,r)))}};const Ee=128,Y=.5,xi=Se(Y/2,Y/2,1-Y/2,1-Y/2);function Ci(e){return e==="cross"||e==="x"}function Oi(e,t=Ee,o=t*Y,i=0){const{data:r,parameters:s}=Po(e,t,o,i);return new $t(r,s)}function Po(e,t=Ee,o=t*Y,i=0){return{data:Ao(e,t,o,i),parameters:{mipmap:!1,wrap:{s:Me.CLAMP_TO_EDGE,t:Me.CLAMP_TO_EDGE},width:t,height:t,components:4,noUnpackFlip:!0,reloadable:!0}}}function Ao(e,t=Ee,o=t*Y,i=0){switch(e){case"circle":default:return To(t,o);case"square":return yo(t,o);case"cross":return Eo(t,o,i);case"x":return Fo(t,o,i);case"kite":return zo(t,o);case"triangle":return Ro(t,o);case"arrow":return Io(t,o)}}function To(e,t){const o=e/2-.5;return se(e,it(o,o,t/2))}function yo(e,t){return tt(e,t,!1)}function zo(e,t){return tt(e,t,!0)}function Eo(e,t,o=0){return ot(e,t,!1,o)}function Fo(e,t,o=0){return ot(e,t,!0,o)}function Ro(e,t){return se(e,rt(e/2,t,t/2))}function Io(e,t){const o=t,i=t/2,r=e/2,s=.8*o,a=it(r,(e-t)/2-s,Math.sqrt(s*s+i*i)),c=rt(r,o,i);return se(e,(l,n)=>Math.max(c(l,n),-a(l,n)))}function tt(e,t,o){return o&&(t/=Math.SQRT2),se(e,(i,r)=>{let s=i-.5*e+.25,a=.5*e-r-.75;if(o){const c=(s+a)/Math.SQRT2;a=(a-s)/Math.SQRT2,s=c}return Math.max(Math.abs(s),Math.abs(a))-.5*t})}function ot(e,t,o,i=0){t-=i,o&&(t*=Math.SQRT2);const r=.5*t;return se(e,(s,a)=>{let c,l=s-.5*e,n=.5*e-a-1;if(o){const f=(l+n)/Math.SQRT2;n=(n-l)/Math.SQRT2,l=f}return l=Math.abs(l),n=Math.abs(n),c=l>n?l>r?Math.sqrt((l-r)*(l-r)+n*n):n:n>r?Math.sqrt(l*l+(n-r)*(n-r)):l,c-=i/2,c})}function it(e,t,o){return(i,r)=>{const s=i-e,a=r-t;return Math.sqrt(s*s+a*a)-o}}function rt(e,t,o){const i=Math.sqrt(t*t+o*o);return(r,s)=>{const a=Math.abs(r-e)-o,c=s-e+t/2+.75,l=(t*a+o*c)/i,n=-c;return Math.max(l,n)}}function se(e,t){const o=new Uint8Array(4*e*e);for(let i=0;i<e;i++)for(let r=0;r<e;r++){const s=r+e*i;let a=t(r,i);a=a/e+.5,gt(a,o,4*s)}return o}function wo(e){return e instanceof Float32Array&&e.length>=16}function Do(e){return Array.isArray(e)&&e.length>=16}function _o(e){return wo(e)||Do(e)}class $o{constructor(){this.factor=new Ue,this.factorAlignment=new Ue}}class Ue{constructor(){this.scale=0,this.factor=0,this.minScaleFactor=0}}function Mo(e,t){const{vertex:o,fragment:i}=e;e.include(It,t),o.include(et),o.main.add(p`vec4 posProjCenter;
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
gl_PointSize = 1.0;`),i.main.add(p`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function at(e){const t=new Oo,{signedDistanceFieldEnabled:o,occlusionTestEnabled:i,horizonCullingEnabled:r,pixelSnappingEnabled:s,hasScreenSizePerspective:a,debugDrawLabelBorder:c,vvSize:l,vvColor:n,hasRotation:f,occludedFragmentFade:v,sampleSignedDistanceFieldTexelCenter:g}=e;t.include(po,e),t.vertex.include(St,e);const{occlusionPass:A,output:I,oitPass:T}=e;if(A)return t.include(Mo,e),t;const{vertex:x,fragment:O}=t;t.include(xt),t.include(Ct,e),t.include(Ot,e),i&&t.include(fo),O.include(ho),O.include(bt),t.varyings.add("vcolor","vec4"),t.varyings.add("vtc","vec2"),t.varyings.add("vsize","vec2");const b=I===U.Highlight,w=b&&i;w&&t.varyings.add("voccluded","float"),x.uniforms.add(new Pt("viewport",u=>u.camera.fullViewport),new Re("screenOffset",(u,M)=>Te(ce,2*u.screenOffset[0]*M.camera.pixelRatio,2*u.screenOffset[1]*M.camera.pixelRatio)),new Re("anchorPosition",u=>X(u)),new ge("materialColor",u=>u.color),new Ie("materialRotation",u=>u.rotation),new we("tex",u=>u.texture)),At(x),o&&(x.uniforms.add(new ge("outlineColor",u=>u.outlineColor)),O.uniforms.add(new ge("outlineColor",u=>Be(u)?u.outlineColor:mt),new Ie("outlineSize",u=>Be(u)?u.outlineSize:0))),r&&x.uniforms.add(new bo("pointDistanceSphere",(u,M)=>{const $=M.camera.eye,_=u.origin;return vt(_[0]-$[0],_[1]-$[1],_[2]-$[2],ut.radius)})),s&&x.include(et),a&&(Tt(x),yt(x)),c&&t.varyings.add("debugBorderCoords","vec4"),t.attributes.add(d.UVI,"vec2"),t.attributes.add(d.COLOR,"vec4"),t.attributes.add(d.SIZE,"vec2"),t.attributes.add(d.ROTATION,"float"),(l||n)&&t.attributes.add(d.FEATUREATTRIBUTE,"vec4"),x.code.add(r?p`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:p`bool behindHorizon(vec3 posModel) { return false; }`),x.main.add(p`
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
    ${F(a,p`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,p`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${F(l,p`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${F(i,p`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${F(c,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${F(w,p`voccluded = visible ? 0.0 : 1.0;`)}
  `);const R=p`
      vec2 uvi1 = vec2(uvi.x < 0.0 ? 1.0 : 0.0, uvi.y < 0.0 ? 1.0 : 0.0);
      vec2 uv = abs(uvi + uvi1);
      vec2 texSize = vec2(textureSize(tex, 0));
      uv.x = uv.x >= ${Ve} ? 1.0 : uv.x / texSize.x;
      uv.y = uv.y >= ${Ve} ? 1.0 : uv.y / texSize.y;
      quadOffset.xy = (uvi1 - anchorPosition) * 2.0 * combinedSize;

      ${F(f,p`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,S=s?o?p`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:p`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:p`posProj += quadOffset;`;x.main.add(p`
    ${R}
    ${n?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${F(I===U.ObjectAndLayerIdColor,p`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${p.float(B)};
    ${F(o,`alphaDiscard = alphaDiscard && outlineColor.a < ${p.float(B)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${S}
      gl_Position = posProj;
    }

    vtc = uv;

    ${F(c,p`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),O.uniforms.add(new we("tex",u=>u.texture)),v&&!b&&O.uniforms.add(new zt("depthMap",u=>u.mainDepth),new Et("occludedOpacity",u=>u.hudOccludedFragmentOpacity));const j=c?p`(isBorder > 0.0 ? 0.0 : ${p.float(B)})`:p.float(B),D=p`
    ${F(c,p`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${F(g,p`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${o?p`
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
          fillPixelColor.a + outlinePixelColor.a < ${p.float(B)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${F(!b,p`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${j}) {
          discard;
        }

        ${F(!b,p`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-dist/vsize.x*2.0, 0.0, 1.0), clamp(dist/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:p`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${j}) {
            discard;
          }
          ${F(!b,p`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${F(v&&!b,p`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${F(!b&&c,p`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(I){case U.Color:case U.ColorEmission:t.outputs.add("fragColor","vec4",0),I===U.ColorEmission&&t.outputs.add("fragEmission","vec4",1),T===oe.ColorAlpha&&t.outputs.add("fragAlpha","float",I===U.ColorEmission?2:1),O.main.add(p`
        ${D}
        ${F(T===oe.FrontFace,p`fragColor.rgb /= fragColor.a;`)}
        ${F(I===U.ColorEmission,p`fragEmission = vec4(0.0);`)}
        ${F(T===oe.ColorAlpha,p`fragAlpha = fragColor.a;`)}`);break;case U.ObjectAndLayerIdColor:O.main.add(p`
        ${D}
        outputObjectAndLayerIdColor();`);break;case U.Highlight:t.include(Ft,e),O.main.add(p`
        ${D}
        outputHighlight(${F(w,p`voccluded == 1.0`,p`false`)});`)}return t}function Be(e){return e.outlineColor[3]>0&&e.outlineSize>0}function X(e){return e.textureIsSignedDistanceField?Lo(e.anchorPosition,e.distanceFieldBoundingBox,ce):to(ce,e.anchorPosition),ce}function Lo(e,t,o){Te(o,e[0]*(t[2]-t[0])+t[0],e[1]*(t[3]-t[1])+t[1])}const ce=ye(),ae=32e3,Ve=p.float(ae),jo=Object.freeze(Object.defineProperty({__proto__:null,build:at,calculateAnchorPosition:X,fullUV:ae},Symbol.toStringTag,{value:"Module"}));class No extends Wt{constructor(t,o){super(t,o,new Xt(jo,()=>Promise.resolve().then(()=>Xo))),this.primitiveType=o.occlusionPass?Le.POINTS:Le.TRIANGLES}initializePipeline(t){const{oitPass:o,hasPolygonOffset:i,draped:r,output:s,depthTestEnabled:a,occlusionPass:c}=t,l=o===oe.NONE,n=o===oe.ColorAlpha,f=s===U.Highlight,v=a&&!r&&!n&&!c&&!f;return mo({blending:Je(s)?l?vo:Qt(o):null,depthTest:a&&!r?{func:Jt.LEQUAL}:null,depthWrite:v?So:null,drawBuffers:Kt(o,s),colorWrite:xo,polygonOffset:i?Uo:null})}}const Uo={factor:0,units:-4};class P extends wt{constructor(t){super(),this.spherical=t,this.screenCenterOffsetUnitsEnabled=!1,this.occlusionTestEnabled=!0,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.vvSize=!1,this.vvColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.hasPolygonOffset=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.occludedFragmentFade=!1,this.objectAndLayerIdColorInstanced=!1,this.horizonCullingEnabled=!0,this.isFocused=!0,this.textureCoordinateType=Dt.None,this.emissionSource=_t.None,this.discardInvisibleFragments=!0,this.hasVvInstancing=!1,this.snowCover=!1}}y([z()],P.prototype,"screenCenterOffsetUnitsEnabled",void 0),y([z()],P.prototype,"occlusionTestEnabled",void 0),y([z()],P.prototype,"signedDistanceFieldEnabled",void 0),y([z()],P.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),y([z()],P.prototype,"vvSize",void 0),y([z()],P.prototype,"vvColor",void 0),y([z()],P.prototype,"hasVerticalOffset",void 0),y([z()],P.prototype,"hasScreenSizePerspective",void 0),y([z()],P.prototype,"hasRotation",void 0),y([z()],P.prototype,"debugDrawLabelBorder",void 0),y([z()],P.prototype,"hasPolygonOffset",void 0),y([z()],P.prototype,"depthTestEnabled",void 0),y([z()],P.prototype,"pixelSnappingEnabled",void 0),y([z()],P.prototype,"draped",void 0),y([z()],P.prototype,"terrainDepthTest",void 0),y([z()],P.prototype,"cullAboveTerrain",void 0),y([z()],P.prototype,"occlusionPass",void 0),y([z()],P.prototype,"occludedFragmentFade",void 0),y([z()],P.prototype,"objectAndLayerIdColorInstanced",void 0),y([z()],P.prototype,"horizonCullingEnabled",void 0),y([z()],P.prototype,"isFocused",void 0);let bi=class extends Mt{constructor(e,t){super(e,Zo),this.produces=new Map([[Z.HUD_MATERIAL,o=>me(o)&&!this.parameters.drawAsLabel],[Z.LABEL_MATERIAL,o=>me(o)&&this.parameters.drawAsLabel],[Z.OCCLUSION_PIXELS,()=>this.parameters.occlusionTest],[Z.DRAPED_MATERIAL,o=>this.parameters.draped&&me(o)]]),this._visible=!0,this._configuration=new P(t)}getConfiguration(e,t){const o=this.parameters.draped;return super.getConfiguration(e,t,this._configuration),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasVerticalOffset=!!this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration.screenCenterOffsetUnitsEnabled=this.parameters.centerOffsetUnits==="screen",this._configuration.hasPolygonOffset=this.parameters.polygonOffset,this._configuration.draped=o,this._configuration.occlusionTestEnabled=this.parameters.occlusionTest,this._configuration.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,this._configuration.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,this._configuration.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,this._configuration.hasRotation=this.parameters.hasRotation,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.occlusionPass=t.slot===Z.OCCLUSION_PIXELS,this._configuration.occludedFragmentFade=!o&&this.parameters.occludedFragmentFade,this._configuration.horizonCullingEnabled=this.parameters.horizonCullingEnabled,this._configuration.isFocused=this.parameters.isFocused,this._configuration.depthTestEnabled=this.parameters.depthEnabled||t.slot===Z.OCCLUSION_PIXELS,Je(e)&&(this._configuration.debugDrawLabelBorder=!!Lt.LABELS_SHOW_BORDER),this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest,this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}intersect(e,t,o,i,r,s){const{options:{selectionMode:a,hud:c,excludeLabels:l},point:n,camera:f}=o,{parameters:v}=this;if(!a||!c||l&&v.isLabel||!e.visible||!n||!f)return;const g=e.attributes.get(d.FEATUREATTRIBUTE),A=g==null?null:Fe(g.data,be),{scaleX:I,scaleY:T}=Pe(A,v,f.pixelRatio);Ze(ue,t),e.attributes.has(d.FEATUREATTRIBUTE)&&qo(ue);const x=e.attributes.get(d.POSITION),O=e.attributes.get(d.SIZE),b=e.attributes.get(d.NORMAL),w=e.attributes.get(d.ROTATION),R=e.attributes.get(d.CENTEROFFSETANDDISTANCE);so(x.size>=3);const S=X(v),j=this.parameters.centerOffsetUnits==="screen";for(let D=0;D<x.data.length/x.size;D++){const u=D*x.size;le(h,x.data[u],x.data[u+1],x.data[u+2]),k(h,h,t),k(h,h,f.viewMatrix);const M=D*R.size;if(le(C,R.data[M],R.data[M+1],R.data[M+2]),!j&&(h[0]+=C[0],h[1]+=C[1],C[2]!==0)){const _=C[2];xe(C,h),Qe(h,h,V(C,C,_))}const $=D*b.size;if(le(G,b.data[$],b.data[$+1],b.data[$+2]),Ce(G,ue,f,ie),Ae(this.parameters,h,ie,f,W),f.applyProjection(h,m),m[0]>-1){j&&(C[0]||C[1])&&(m[0]+=C[0]*f.pixelRatio,C[1]!==0&&(m[1]+=Ge(C[1],W.factorAlignment)*f.pixelRatio),f.unapplyProjection(m,h)),m[0]+=this.parameters.screenOffset[0]*f.pixelRatio,m[1]+=this.parameters.screenOffset[1]*f.pixelRatio,m[0]=Math.floor(m[0]),m[1]=Math.floor(m[1]);const _=D*O.size;E[0]=O.data[_],E[1]=O.data[_+1],Ye(E,W.factor,E);const Q=lt*f.pixelRatio;let K=0;v.textureIsSignedDistanceField&&(K=Math.min(v.outlineSize,.5*E[0])*f.pixelRatio/2),E[0]*=I,E[1]*=T;const fe=D*w.size,he=v.rotation+w.data[fe];if(Oe(n,m[0],m[1],E,Q,K,he,v,S)){const J=o.ray;if(k(de,h,We(nt,f.viewMatrix)),m[0]=n[0],m[1]=n[1],f.unprojectFromRenderScreen(m,h)){const N=q();H(N,J.direction);const ee=1/re(N);V(N,N,ee),s(Ke(J.origin,h)*ee,N,-1,de)}}}}}intersectDraped(e,t,o,i,r){const s=e.attributes.get(d.POSITION),a=e.attributes.get(d.SIZE),c=e.attributes.get(d.ROTATION),l=this.parameters,n=X(l),f=e.attributes.get(d.FEATUREATTRIBUTE),v=f==null?null:Fe(f.data,be),{scaleX:g,scaleY:A}=Pe(v,l,e.screenToWorldRatio),I=Go*e.screenToWorldRatio;for(let T=0;T<s.data.length/s.size;T++){const x=T*s.size,O=s.data[x],b=s.data[x+1],w=T*a.size;E[0]=a.data[w],E[1]=a.data[w+1];let R=0;l.textureIsSignedDistanceField&&(R=Math.min(l.outlineSize,.5*E[0])*e.screenToWorldRatio/2),E[0]*=g,E[1]*=A;const S=T*c.size,j=l.rotation+c.data[S];Oe(o,O,b,E,I,R,j,l,n)&&i(r.distance,r.normal,-1)}}createBufferWriter(){return new Wo}applyShaderOffsetsView(e,t,o,i,r,s,a){const c=Ce(t,o,r,ie);return this._applyVerticalGroundOffsetView(e,c,r,a),Ae(this.parameters,a,c,r,s),this._applyPolygonOffsetView(a,c,i[3],r,a),this._applyCenterOffsetView(a,i,a),a}applyShaderOffsetsNDC(e,t,o,i,r){return this._applyCenterOffsetNDC(e,t,o,i),r!=null&&H(r,i),this._applyPolygonOffsetNDC(i,t,o,i),i}_applyPolygonOffsetView(e,t,o,i,r){const s=i.aboveGround?1:-1;let a=Math.sign(o);a===0&&(a=s);const c=s*a;if(this.parameters.shaderPolygonOffset<=0)return H(r,e);const l=dt(Math.abs(t.cosAngle),.01,1),n=1-Math.sqrt(1-l*l)/l/i.viewport[2];return V(r,e,c>0?n:1/n),r}_applyVerticalGroundOffsetView(e,t,o,i){const r=re(e),s=o.aboveGround?1:-1,a=o.computeRenderPixelSizeAtDist(r)*go,c=V(h,t.normal,s*a);return ze(i,e,c),i}_applyCenterOffsetView(e,t,o){const i=this.parameters.centerOffsetUnits!=="screen";return o!==e&&H(o,e),i&&(o[0]+=t[0],o[1]+=t[1],t[2]&&(xe(G,o),io(o,o,V(G,G,t[2])))),o}_applyCenterOffsetNDC(e,t,o,i){const r=this.parameters.centerOffsetUnits!=="screen";return i!==e&&H(i,e),r||(i[0]+=t[0]/o.fullWidth*2,i[1]+=t[1]/o.fullHeight*2),i}_applyPolygonOffsetNDC(e,t,o,i){const r=this.parameters.shaderPolygonOffset;if(e!==i&&H(i,e),r){const s=o.aboveGround?1:-1,a=s*Math.sign(t[3]);i[2]-=(a||s)*r}return i}set visible(e){this._visible=e}get visible(){const{color:e,outlineSize:t,outlineColor:o}=this.parameters,i=e[3]>=B||t>=B&&o[3]>=B;return this._visible&&i}createGLMaterial(e){return new Bo(e)}calculateRelativeScreenBounds(e,t,o=pt()){return Vo(this.parameters,e,t,o),o[2]=o[0]+e[0],o[3]=o[1]+e[1],o}};class Bo extends jt{constructor(t){super({...t,...t.material.parameters})}beginSlot(t){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(No,t)}}function Vo(e,t,o,i){i[0]=e.anchorPosition[0]*-t[0]+e.screenOffset[0]*o,i[1]=e.anchorPosition[1]*-t[1]+e.screenOffset[1]*o}function Ce(e,t,o,i){return _o(t)&&(t=Ze(Ho,t)),ro(i.normal,e,t),k(i.normal,i.normal,o.viewInverseTransposeMatrix),i.cosAngle=ao(st,Yo),i}function qo(e){const t=e[0],o=e[1],i=e[2],r=e[3],s=e[4],a=e[5],c=e[6],l=e[7],n=e[8],f=1/Math.sqrt(t*t+o*o+i*i),v=1/Math.sqrt(r*r+s*s+a*a),g=1/Math.sqrt(c*c+l*l+n*n);return e[0]=t*f,e[1]=o*f,e[2]=i*f,e[3]=r*v,e[4]=s*v,e[5]=a*v,e[6]=c*g,e[7]=l*g,e[8]=n*g,e}function Oe(e,t,o,i,r,s,a,c,l){let n=t-r-i[0]*l[0],f=n+i[0]+2*r,v=o-r-i[1]*l[1],g=v+i[1]+2*r;const A=c.distanceFieldBoundingBox;return c.textureIsSignedDistanceField&&A!=null&&(n+=i[0]*A[0],v+=i[1]*A[1],f-=i[0]*(1-A[2]),g-=i[1]*(1-A[3]),n-=s,f+=s,v-=s,g+=s),Te(qe,t,o),oo(te,e,qe,ft(a)),te[0]>n&&te[0]<f&&te[1]>v&&te[1]<g}const W=new $o,h=q(),G=q(),m=pe(),st=q(),de=q(),te=ye(),qe=ye(),ue=ke(),Ho=ke(),nt=eo(),ne=pe(),C=q(),ve=q(),be=pe(),ie={normal:st,cosAngle:0},lt=1,Go=2,E=Xe(0,0),L=6,Yo=ht(0,0,1);class Zo extends Nt{constructor(){super(...arguments),this.renderOccluded=Ut.Occlude,this.isDecoration=!1,this.color=Se(1,1,1,1),this.polygonOffset=!1,this.anchorPosition=Xe(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=Se(1,1,1,1),this.outlineSize=0,this.distanceFieldBoundingBox=pe(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.occlusionTest=!0,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!1,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.isFocused=!0,this.focusStyle="bright",this.draped=!1,this.isLabel=!1}}const ct=uo().vec3f(d.POSITION).vec3f(d.NORMAL).vec2i16(d.UVI).vec4u8(d.COLOR).vec2f(d.SIZE).f32(d.ROTATION).vec4f(d.CENTEROFFSETANDDISTANCE).vec4f(d.FEATUREATTRIBUTE),ko=ct.clone().vec4u8(d.OLIDCOLOR);class Wo{constructor(){this.vertexBufferLayout=Bt()?ko:ct}elementCount(t){return t.get(d.POSITION).indices.length*L}write(t,o,i,r,s,a){const{position:c,normal:l,uvi:n,color:f,size:v,rotation:g,centerOffsetAndDistance:A,featureAttribute:I}=s;Vt(i.get(d.POSITION),t,c,a,L),qt(i.get(d.NORMAL),o,l,a,L);const T=i.get(d.UVI)?.data;let x=0,O=0,b=-1-ae,w=-1-ae;T&&T.length>=4&&(x=T[0],O=T[1],b=-1-T[2],w=-1-T[3]);let R=i.get(d.POSITION).indices.length,S=a;for(let u=0;u<R;++u)n.set(S,0,x),n.set(S,1,O),S++,n.set(S,0,b),n.set(S,1,O),S++,n.set(S,0,b),n.set(S,1,w),S++,n.set(S,0,b),n.set(S,1,w),S++,n.set(S,0,x),n.set(S,1,w),S++,n.set(S,0,x),n.set(S,1,O),S++;Ht(i.get(d.COLOR),4,f,a,L);const{data:j,indices:D}=i.get(d.SIZE);R=D.length,S=a;for(let u=0;u<R;++u){const M=j[2*D[u]],$=j[2*D[u]+1];for(let _=0;_<L;++_)v.set(S,0,M),v.set(S,1,$),S++}if(Gt(i.get(d.ROTATION),g,a,L),i.get(d.CENTEROFFSETANDDISTANCE)?De(i.get(d.CENTEROFFSETANDDISTANCE),A,a,L):_e(A,a,R*L),i.get(d.FEATUREATTRIBUTE)?De(i.get(d.FEATUREATTRIBUTE),I,a,L):_e(I,a,R*L),r!=null){const u=i.get(d.POSITION)?.indices;if(u){const M=u.length,$=s.getField(d.OLIDCOLOR,no);Yt(r,$,M,a,L)}}return{numVerticesPerItem:L,numItems:R}}intersect(t,o,i,r,s,a,c){const{options:{selectionMode:l,hud:n,excludeLabels:f},point:v,camera:g}=r;if(!l||!n||f&&o.isLabel||!v)return;const A=this.vertexBufferLayout.createView(t),I=A.getField(d.POSITION,je),T=A.getField(d.NORMAL,je),x=A.getField(d.ROTATION,lo),O=A.getField(d.SIZE,co),b=A.getField(d.FEATUREATTRIBUTE,Ne),w=A.getField(d.CENTEROFFSETANDDISTANCE,Ne),R=o.centerOffsetUnits==="screen",S=X(o);if(I==null||T==null||x==null||O==null||w==null||g==null)return;const j=b==null?null:b.getVec(0,be),{scaleX:D,scaleY:u}=Pe(j,o,g.pixelRatio),M=I.count/L;for(let $=0;$<M;$++){const _=$*L;if(I.getVec(_,h),i!=null&&ze(h,h,i),k(h,h,g.viewMatrix),w.getVec(_,ne),le(C,ne[0],ne[1],ne[2]),!R&&(h[0]+=C[0],h[1]+=C[1],C[2]!==0)){const Q=C[2];xe(C,h),Qe(h,h,V(C,C,Q))}if(T.getVec(_,G),Ce(G,ue,g,ie),Ae(o,h,ie,g,W),g.applyProjection(h,m),m[0]>-1){R&&(C[0]||C[1])&&(m[0]+=C[0]*g.pixelRatio,C[1]!==0&&(m[1]+=Ge(C[1],W.factorAlignment)*g.pixelRatio),g.unapplyProjection(m,h)),m[0]+=o.screenOffset[0]*g.pixelRatio,m[1]+=o.screenOffset[1]*g.pixelRatio,m[0]=Math.floor(m[0]),m[1]=Math.floor(m[1]),O.getVec(_,E),Ye(E,W.factor,E);const Q=lt*g.pixelRatio;let K=0;o.textureIsSignedDistanceField&&(K=Math.min(o.outlineSize,.5*E[0])*g.pixelRatio/2),E[0]*=D,E[1]*=u;const fe=x.get(_),he=o.rotation+fe;if(Oe(v,m[0],m[1],E,Q,K,he,o,S)){const J=r.ray;if(k(de,h,We(nt,g.viewMatrix)),m[0]=v[0],m[1]=v[1],g.unprojectFromRenderScreen(m,h)){const N=q();H(N,J.direction);const ee=1/re(N);V(N,N,ee),c(Ke(J.origin,h)*ee,N,$,de)}}}}}}function Pe(e,t,o){return e==null||t.vvSize==null?{scaleX:o,scaleY:o}:(Zt(ve,t,e),{scaleX:ve[0]*o,scaleY:ve[1]*o})}function Ae(e,t,o,i,r){if(!e.verticalOffset?.screenLength)return e.screenSizePerspective||e.screenSizePerspectiveAlignment?He(e,r,re(t),o.cosAngle):(r.factor.scale=1,r.factorAlignment.scale=1),t;const s=re(t),a=e.screenSizePerspectiveAlignment??e.screenSizePerspective,c=kt(i,s,e.verticalOffset,o.cosAngle,a);return He(e,r,s,o.cosAngle),V(o.normal,o.normal,c),ze(t,t,o.normal)}function He(e,t,o,i){e.screenSizePerspective!=null?$e(i,o,e.screenSizePerspective,t.factor):(t.factor.scale=1,t.factor.factor=0,t.factor.minScaleFactor=0),e.screenSizePerspectiveAlignment!=null?$e(i,o,e.screenSizePerspectiveAlignment,t.factorAlignment):(t.factorAlignment.factor=t.factor.factor,t.factorAlignment.scale=t.factor.scale,t.factorAlignment.minScaleFactor=t.factor.minScaleFactor)}const Xo=Object.freeze(Object.defineProperty({__proto__:null,build:at,calculateAnchorPosition:X,fullUV:ae},Symbol.toStringTag,{value:"Module"}));export{Ci as A,bi as H,xi as P,Po as Z,Y as a,Ee as c,Oi as z};
