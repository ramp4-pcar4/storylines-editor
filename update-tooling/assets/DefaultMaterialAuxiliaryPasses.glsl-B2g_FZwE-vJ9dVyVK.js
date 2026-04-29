import{n as e}from"./mat3-CvJM__c0-C1uZKbSd.js";import{t}from"./mat3f64-H1VyAOlk-bQ0TRl5x.js";import{r as n}from"./vec3f64-CG5ySZkG-Dj7yz7Fz.js";import{r}from"./mat4f64-B3SVWMa--Ci8MEpDu.js";import{v as i}from"./vec3-D0JSMCWt-DxhzA4EA.js";import{n as a}from"./vec4f64-DFGee9an-D35VCg20.js";import{n as o,t as s}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as c}from"./FloatPassUniform-gHcGW-mi-DcUQ2f5D.js";import{t as l}from"./Texture2DPassUniform-RVTT2Sjh-CghdmKcr.js";import{r as u}from"./Emissions.glsl-C1fRgyHC-BKFlnvac.js";import"./NoParameters-DvFAVXX5-CiYgpw4s.js";import{a as d,n as f,t as p}from"./AlphaCutoff-lGKpUdxr-Dq_Xw974.js";import{t as m}from"./ObjectAndLayerIdColor.glsl-C3sEfoJy-CPOXfzlg.js";import{a as h,i as g,o as _,r as v,t as y}from"./VisualVariables.glsl-CLB2wooA-BcMLhAld.js";import{t as b}from"./Float3BindUniform-Cmo9nXvW-D9TopQkY.js";import{i as x,n as S}from"./View.glsl-YsNDLcX0-C6VXtJe6.js";import{a as C,n as w,o as T,r as E,s as D,t as O}from"./Transform.glsl-B8LYsJdc-ChhjZx_e.js";import{a as k,i as A,t as j}from"./MaterialUtil-Fmbx5pLm-Cpg5QGbH.js";import{t as M}from"./Matrix4PassUniform-Cye5MaJy-BkEGuWn8.js";import{t as N}from"./IntegerPassUniform-EGe6J__S-BV9yqNAU.js";import{n as P}from"./SnowCover.glsl-C23wZ4DV-CXIoyzbD.js";function F(e,t){switch(e.fragment.code.add(s`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`),t.normalType){case 1:e.attributes.add(`normalCompressed`,`vec2`),e.vertex.code.add(s`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case 0:e.attributes.add(`normal`,`vec3`),e.vertex.code.add(s`vec3 normalModel() {
return normal;
}`);break;default:t.normalType;case 2:case 3:}}function I(e,t){let{vertex:n,varyings:r}=e;switch(t.normalType){case 0:case 1:{e.include(F,t),r.add(`vNormalWorld`,`vec3`),r.add(`vNormalView`,`vec3`),n.uniforms.add(new _(`transformNormalViewFromGlobal`,e=>e.transformNormalViewFromGlobal));let{hasModelRotationScale:i}=t;i&&n.uniforms.add(new O(`transformNormalGlobalFromModel`,e=>e.transformNormalGlobalFromModel)),n.code.add(s`
        void forwardNormal() {
          vNormalWorld = ${o(i,s`transformNormalGlobalFromModel * `)} normalModel();
          vNormalView = transformNormalViewFromGlobal * vNormalWorld;
        }
      `);break}case 2:e.vertex.code.add(s`void forwardNormal() {}`);break;default:t.normalType;case 3:}}var L=class extends w{constructor(){super(...arguments),this.transformNormalViewFromGlobal=t()}},R=class extends T{constructor(){super(...arguments),this.transformNormalGlobalFromModel=t(),this.toMapSpace=a()}};function z(e){e.vertex.code.add(s`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}function B(e,t){t.instancedColor?(e.attributes.add(`instanceColor`,`vec4`),e.vertex.include(v),e.vertex.include(g),e.vertex.include(y),e.vertex.code.add(s`
      MaskedColor applyInstanceColor(MaskedColor color) {
        return multiplyMaskedColors( color, createMaskedFromUInt8NaNColor(${`instanceColor`}));
      }
    `)):e.vertex.code.add(s`MaskedColor applyInstanceColor(MaskedColor color) {
return color;
}`)}var V=t();function H(t,n){let{hasModelTransformation:a,instancedDoublePrecision:o,instanced:c,output:l,hasVertexTangents:u}=n;a&&(t.vertex.uniforms.add(new M(`model`,e=>e.modelTransformation??r)),t.vertex.uniforms.add(new _(`normalLocalOriginFromModel`,t=>(e(V,t.modelTransformation??r),V)))),c&&o&&(t.attributes.add(`instanceModelOriginHi`,`vec3`),t.attributes.add(`instanceModelOriginLo`,`vec3`),t.attributes.add(`instanceModel`,`mat3`),t.attributes.add(`instanceModelNormal`,`mat3`));let d=t.vertex;o&&(d.include(D,n),d.uniforms.add(new b(`viewOriginHi`,e=>A(i(U,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),U)),new b(`viewOriginLo`,e=>j(i(U,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),U)))),d.code.add(s`
    vec3 getVertexInLocalOriginSpace() {
      return ${a?o?`(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz`:`(model * localPosition()).xyz`:o?`instanceModel * localPosition().xyz`:`localPosition().xyz`};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${o?s`
          // Issue: (should be resolved now with invariant position) https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -instanceModelOriginHi, -instanceModelOriginLo);
          return _pos - originDelta;`:`return vpos;`}
    }
    `),d.code.add(s`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${a?o?`normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)`:`normalLocalOriginFromModel * _normal.xyz`:o?`instanceModelNormal * _normal.xyz`:`_normal.xyz`});
    }
    `),l===2&&(x(d),d.code.add(s`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${a?o?`vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)`:`vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)`:o?`vec4(instanceModelNormal * _normal.xyz, 1.0)`:`_normal`}).xyz);
    }
    `)),u&&d.code.add(s`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${a?o?`return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);`:`return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);`:o?`return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);`:`return _tangent;`}
    }`)}var U=n();function W(e,t){e.varyings.add(`colorMixMode`,`int`),e.varyings.add(`opacityMixMode`,`int`),e.vertex.uniforms.add(new N(`symbolColorMixMode`,e=>k[e.colorMixMode])),t.hasSymbolColors?(e.vertex.include(v),e.vertex.include(g),e.vertex.include(y),e.attributes.add(`symbolColor`,`vec4`),e.vertex.code.add(s`
    MaskedColor applySymbolColor(MaskedColor color) {
      return multiplyMaskedColors(color, createMaskedFromUInt8NaNColor(${`symbolColor`}));
    }
  `)):e.vertex.code.add(s`MaskedColor applySymbolColor(MaskedColor color) {
return color;
}`),e.vertex.code.add(s`
    void forwardColorMixMode(bvec4 mask) {
      colorMixMode = mask.r ? ${s.int(k.ignore)} : symbolColorMixMode;
      opacityMixMode = mask.a ? ${s.int(k.ignore)} : symbolColorMixMode;
    }
  `)}function G(e,t){K(e,t,new c(`textureAlphaCutoff`,e=>e.textureAlphaCutoff))}function K(e,t,n){let r=e.fragment,i=t.alphaDiscardMode,a=i===0;i!==2&&i!==3||r.uniforms.add(n),r.code.add(s`
    void discardOrAdjustAlpha(inout vec4 color) {
      ${i===1?`color.a = 1.0;`:`if (color.a < ${a?s.float(f):`textureAlphaCutoff`}) {\n              discard;\n             } ${o(i===2,`else { color.a = 1.0; }`)}`}
    }
  `)}function q(e,t){let{vertex:n,fragment:r,varyings:i}=e,{hasColorTexture:a,alphaDiscardMode:c}=t,f=a&&c!==1,{output:g,normalType:_,hasColorTextureTransform:v}=t;switch(g){case 1:S(n,t),e.include(E),r.include(p,t),e.include(u,t),f&&r.uniforms.add(new l(`tex`,e=>e.texture)),n.main.add(s`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),e.include(G,t),r.main.add(s`
        discardBySlice(vpos);
        ${o(f,s`vec4 texColor = texture(tex, ${v?`colorUV`:`vuv0`});
                discardOrAdjustAlpha(texColor);`)}`);break;case 3:case 4:case 5:case 6:case 9:S(n,t),e.include(E),e.include(u,t),e.include(h,t),e.include(P,t),r.include(p,t),e.include(m,t),C(e),i.add(`depth`,`float`,{invariant:!0}),f&&r.uniforms.add(new l(`tex`,e=>e.texture)),n.main.add(s`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),e.include(G,t),r.main.add(s`
        discardBySlice(vpos);
        ${o(f,s`vec4 texColor = texture(tex, ${v?`colorUV`:`vuv0`});
               discardOrAdjustAlpha(texColor);`)}
        ${g===9?s`outputObjectAndLayerIdColor();`:s`outputDepth(depth);`}`);break;case 2:{S(n,t),e.include(E),e.include(F,t),e.include(I,t),e.include(u,t),e.include(h,t),f&&r.uniforms.add(new l(`tex`,e=>e.texture)),_===2&&i.add(`vPositionView`,`vec3`,{invariant:!0});let a=_===0||_===1;n.main.add(s`
        vpos = getVertexInLocalOriginSpace();
        ${a?s`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:s`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();`),r.include(p,t),e.include(G,t),r.main.add(s`
        discardBySlice(vpos);
        ${o(f,s`vec4 texColor = texture(tex, ${v?`colorUV`:`vuv0`});
                discardOrAdjustAlpha(texColor);`)}

        ${_===2?s`vec3 normal = screenDerivativeNormal(vPositionView);`:s`vec3 normal = normalize(vNormalWorld);
                    if (gl_FrontFacing == false){
                      normal = -normal;
                    }`}
        fragColor = vec4(0.5 + 0.5 * normal, 1.0);`);break}case 8:S(n,t),e.include(E),e.include(u,t),e.include(h,t),f&&r.uniforms.add(new l(`tex`,e=>e.texture)),n.main.add(s`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),r.include(p,t),e.include(G,t),e.include(d,t),r.main.add(s`
        discardBySlice(vpos);
        ${o(f,s`vec4 texColor = texture(tex, ${v?`colorUV`:`vuv0`});
                discardOrAdjustAlpha(texColor);`)}
        calculateOcclusionAndOutputHighlight();`)}}export{I as a,W as c,H as i,q as l,F as n,L as o,G as r,R as s,B as t,z as u};