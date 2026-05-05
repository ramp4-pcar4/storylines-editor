import{T as e}from"./decorators-ZlNXPDAo-CbC_XJ4f.js";import{n as t}from"./tslib.es6-D23imAM7-0zQ7pfVa.js";import{t as n}from"./ShaderBuilder-aUMFb5cS-QIZt__97.js";import{n as r,t as i}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as a}from"./Uniform-Dp2mgLmf-sDlmDzvo.js";import{c as o,o as s,r as c,t as l}from"./AlphaCutoff-lGKpUdxr-Dq_Xw974.js";import{t as u}from"./ObjectAndLayerIdColor.glsl-C3sEfoJy-CPOXfzlg.js";import{t as d}from"./Float4PassUniform-R_rVPKlL-DaKCoBr0.js";import{t as f}from"./FloatsPassUniform-VyaOZV1--CcYVB0L4.js";import{a as p}from"./VisualVariables.glsl-CLB2wooA-BcMLhAld.js";import{t as m}from"./FloatBindUniform-avAg5yxD-BlJbJU9Q.js";import{n as h,t as g}from"./View.glsl-YsNDLcX0-C6VXtJe6.js";import{t as _}from"./TerrainDepthTest.glsl-DZ7tKbZj-D4tuDHez.js";import{t as v}from"./OutputColorHighlightOLID.glsl-vs7-ar26-D-vHYNKy.js";import{r as ee}from"./Transform.glsl-B8LYsJdc-ChhjZx_e.js";import{t as te}from"./VertexColor.glsl-DkZ0DT-i-UTbufU1-.js";import{a as y}from"./Util-CWroVKnL-Dli2v4Y9.js";import{j as b}from"./BufferView-UKZ3HTkz-MyJnIrj_.js";import{i as x}from"./InterleavedLayout-CDRPL8h0-DUuXZoEf.js";import{t as S}from"./TextureBackedBufferLayout-C7Xogp2t-C2bIFib0.js";import{t as C}from"./DefaultTechniqueConfiguration-DT4cRvWI-D-QR8iGX.js";var w=class extends C{constructor(){super(...arguments),this.cullFace=0,this.style=0,this.hasVertexColors=!1,this.polygonOffset=!1,this.hasOccludees=!1,this.enableOffset=!0,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.hasVVColor=!1,this.draped=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.writeDepth=!0,this.occlusionPass=!1,this.hasVVInstancing=!1,this.hasVVSize=!1,this.hasVVOpacity=!1,this.overlayEnabled=!1,this.snowCover=!1}};function T(e,t,n,r){return e.draped?null:e.hasVVColor?r:e.hasVertexColors?n:t}t([o({count:3})],w.prototype,`cullFace`,void 0),t([o({count:6})],w.prototype,`style`,void 0),t([o()],w.prototype,`hasVertexColors`,void 0),t([o()],w.prototype,`polygonOffset`,void 0),t([o()],w.prototype,`hasOccludees`,void 0),t([o()],w.prototype,`enableOffset`,void 0),t([o()],w.prototype,`terrainDepthTest`,void 0),t([o()],w.prototype,`cullAboveTerrain`,void 0),t([o()],w.prototype,`hasVVColor`,void 0),t([o()],w.prototype,`draped`,void 0);function E(e){let t=x().vec3f(`position`).vec4f(`uvMapSpace`);return e.draped?e.hasVVColor?t.f32(`colorFeatureAttribute`):e.hasVertexColors&&t.vec4u8(`color`,{glNormalized:!0}):t.u32(`textureElementIndex`,{integer:!0}),f()&&t.vec4u8(`olidColor`),t.freeze()}var D=[{type:`mat3f32`,name:`boundingRect`}],O=new S(D),k=new S([...D,{type:`vec4unorm8`,name:`color`}]),A=new S([...D,{type:`f32`,name:`colorFeatureAttribute`}]);function ne(e){return T(e,O,k,A)}function re(e){switch(e.elementType){case`float`:switch(e.elementCount){case 1:return i`float`;case 2:return i`vec2`;case 3:return i`vec3`;case 4:return i`vec4`;case 9:return i`mat3`;default:e.elementCount}break;case`int`:switch(e.elementCount){case 1:return i`int`;case 2:return i`ivec2`;case 3:return i`ivec3`;case 4:return i`ivec4`;case 9:throw Error(`Invalid element count 9 for type int`);default:e.elementCount}break;case`uint`:switch(e.elementCount){case 1:return i`uint`;case 2:return i`uvec2`;case 3:return i`uvec3`;case 4:return i`uvec4`;case 9:throw Error(`Invalid element count 9 for type uint`);default:e.elementCount}break;default:e.elementType}throw Error(`unsupported field`)}var j=new m(`const_NaN`,()=>NaN,{supportsNaN:!0}),M=class extends s{constructor(e){super(),this.supportNaN=e}};function N(e,t){let n=t?.supportNaN;n&&(e.uniforms.add(j),e.code.add(i`bool bitsEncodeFloat16NaN(highp uint bits) {
const highp uint nanExponent = 0x00007c00u;
highp uint exponent = bits & nanExponent;
highp uint mantissa = bits & 0x000003ffu;
return exponent == nanExponent && mantissa != 0u;
}`)),e.code.add(i`
    mediump float unpackHalf2x8(highp uint bits0, highp uint bits1) {
      highp uint halfBits = (bits1 << 8u) | bits0;
      ${r(n,i`
        if (bitsEncodeFloat16NaN(halfBits)) {
          return const_NaN;
        }`)}
      return unpackHalf2x16(halfBits).x;
    }`)}function P(e,t){let n=t?.supportNaN;n&&(e.uniforms.add(j),e.code.add(i`bool bitsEncodeFloat32NaN(highp uint bits) {
const highp uint nanExponent = 0x7f800000u;
highp uint exponent = bits & nanExponent;
highp uint mantissa = bits & 0x007fffffu;
return exponent == nanExponent && mantissa != 0u;
}`)),e.code.add(i`
    highp float unpackFloat4x8(highp uint bits0, highp uint bits1, highp uint bits2, highp uint bits3) {
      highp uint floatBits = (bits3 << 24u) |(bits2 << 16u) | (bits1 << 8u) | bits0;
      ${r(n,i`
        if (bitsEncodeFloat32NaN(floatBits)) {
          return const_NaN;
        }`)}
      return uintBitsToFloat(floatBits);
    }`)}function F(e){let{fieldType:t}=e;return`${(0,I[t])(L(e))}`}t([o()],M.prototype,`supportNaN`,void 0);var I={u8:e=>i`${e[0]}`,unorm8:e=>i`float(${e[0]})/255.0`,vec4unorm8:e=>i`vec4(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})/255.0`,f16:b?e=>i`unpackHalf2x8(${`${e[0]}, ${e[1]}`})`:e=>i`unpackFloat4x8(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})`,f32:e=>i`unpackFloat4x8(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})`,vec4u8:e=>i`uvec4(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})`,mat3f32:e=>i`mat3(${e.reduce((e,t)=>{let n=e.at(-1);return n==null||n.length>=4?e.push([t]):n.push(t),e},[]).map(e=>i`unpackFloat4x8(${`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`})`).join(`,
`)})`};function L(e){let{startTexel:t,byteOffset:n,texelByteStride:r,byteSize:a}=e,o=t,s=n%r,c=[];for(let e=0;e<a;++e){let e=i`texel${i.int(o)}.${R[s]}`;c.push(e),++s,s>=r&&(s=0,++o)}return c}var R=[`x`,`y`,`z`,`w`],z=new M(!0),B=new M(!1),V=class{constructor(t){this.moduleId=e(),this.namespace=`_tbb_${this.moduleId}_`;let{itemIndexAttribute:n,bufferUniform:r,layout:i}=t,a=t.fieldFilter??(()=>!0),o=t.enableNaNSupport?z:B;this.TextureBackedBufferModule=(e,t)=>H(this.namespace,e,t,n,r,i,a,o),this.getTextureAttribute=U(this.namespace)}};function H(e,t,n,r,a,o,s,c){let{vertex:l}=t;l.include(P,c),l.include(N,c);let u=`${e}tbbStride`,d=`${e}TextureBackedBufferItemData`,f=`${e}fetchTextureBackedBufferItemData`,p=W(e);for(let e of[u,d,f,p])y(e.length<1024,`Identifiers do not have a valid length`);l.constants.add(u,`uint`,o.texelStride),l.uniforms.add(a);let m=[];for(let e of o.fields.values())s(e.name,n)&&m.push(e);if(m.length===0)return;let h=[];for(let e=0;e<o.texelStride;++e)h.push(!1);for(let e of m)for(let t=0;t<e.numTexels;++t)h[e.startTexel+t]=!0;l.code.add(i`
  struct ${d} {`);for(let e of m)l.code.add(i`\t${re(e)} ${e.name};`);l.code.add(i`};`),l.code.add(i`
  ${d} ${f}(highp uint itemIndex) {
    ${d} itemData;
    highp uint index = itemIndex * ${u};
    highp uint rowWidth = uint(textureSize(${a.name}, 0).x);
    int coordX = int(index % rowWidth);
    int coordY = int(index / rowWidth);
  `);for(let e=0;e<h.length;++e)!1!==h[e]&&l.code.add(i`lowp uvec4 texel${i.int(e)} = texelFetch(${a.name}, ivec2(coordX + ${i.int(e)}, coordY), 0);`);for(let e of m)l.code.add(i`itemData.${e.name} = ${F(e)};`);l.code.add(i`return itemData;
}`),l.code.add(i`${d} ${p};`),l.main.add(i`${p} = ${f}(${r});`)}function U(e){let t=W(e);return e=>i`${t}.${e}`}function W(e){return`${e}ItemData`}var G=new class extends a{constructor(e,t){super(e,`usampler2D`,2,(n,r,i)=>n.bindTexture(e,t(r,i)))}}(`componentTextureBuffer`,e=>e.textureBuffer),K=new V({layout:O,itemIndexAttribute:`textureElementIndex`,bufferUniform:G}),q=new V({layout:k,itemIndexAttribute:`textureElementIndex`,bufferUniform:G}),J=new V({layout:A,itemIndexAttribute:`textureElementIndex`,bufferUniform:G,enableNaNSupport:!0});function Y(e){return T(e,K,q,J)}var X=.70710678118,Z=X,ie=.08715574274,Q=10,ae=1;function $(e){let t=Y(e),a=t!=null,o=new n;a&&o.include(t.TextureBackedBufferModule,e);let{vertex:s,fragment:f,attributes:y,varyings:b}=o,x=e.output===8;h(s,e),o.include(ee);let S=``;a?(e.hasVVColor&&(S=t.getTextureAttribute(`colorFeatureAttribute`)),e.hasVertexColors?(o.varyings.add(`vColor`,`vec4`),o.vertex.code.add(i`void forwardVertexColor() { vColor = ${t.getTextureAttribute(`color`)}; }`)):o.vertex.code.add(i`void forwardVertexColor() {}`),y.add(`textureElementIndex`,`uint`)):(o.include(te,e),e.hasVVColor&&(y.add(`colorFeatureAttribute`,`float`),S=`colorFeatureAttribute`)),o.include(p,e),o.include(u,e),o.fragment.include(l,e),o.include(v,e),o.include(_,e),e.draped&&s.uniforms.add(new m(`worldToScreenRatio`,e=>1/e.screenToPCSRatio)),y.add(`position`,`vec3`),y.add(`uvMapSpace`,`vec4`),e.hasVertexColors||b.add(`vColor`,`vec4`),b.add(`vpos`,`vec3`,{invariant:!0}),b.add(`vuv`,`vec2`),s.uniforms.add(new d(`uColor`,e=>e.color));let C=e.style===3||e.style===4||e.style===5;return C&&s.code.add(i`
      const mat2 rotate45 = mat2(${i.float(X)}, ${i.float(-Z)},
                                 ${i.float(Z)}, ${i.float(X)});
    `),!e.draped&&a&&(g(s,e),s.uniforms.add(new m(`worldToScreenPerDistanceRatio`,e=>1/e.camera.perScreenPixelRatio)),s.code.add(i`vec3 projectPointToLineSegment(vec3 center, vec3 halfVector, vec3 point) {
float projectedLength = dot(halfVector, point - center) / dot(halfVector, halfVector);
return center + halfVector * clamp(projectedLength, -1.0, 1.0);
}`),s.code.add(i`vec3 intersectRayPlane(vec3 rayDir, vec3 rayOrigin, vec3 planeNormal, vec3 planePoint) {
float d = dot(planeNormal, planePoint);
float t = (d - dot(planeNormal, rayOrigin)) / dot(planeNormal, rayDir);
return rayOrigin + t * rayDir;
}`),s.code.add(i`
      float boundingRectDistanceToCamera() {
        vec3 center = ${t.getTextureAttribute(`boundingRect`)}[0];
        vec3 halfU = ${t.getTextureAttribute(`boundingRect`)}[1];
        vec3 halfV = ${t.getTextureAttribute(`boundingRect`)}[2];
        vec3 n = normalize(cross(halfU, halfV));

        vec3 viewDir = - vec3(view[0][2], view[1][2], view[2][2]);

        float viewAngle = dot(viewDir, n);
        float minViewAngle = ${i.float(ie)};

        if (abs(viewAngle) < minViewAngle) {
          // view direction is (almost) parallel to plane -> clamp it to min angle
          float normalComponent = sign(viewAngle) * minViewAngle - viewAngle;
          viewDir = normalize(viewDir + normalComponent * n);
        }

        // intersect view direction with infinite plane that contains bounding rect
        vec3 planeProjected = intersectRayPlane(viewDir, cameraPosition, n, center);

        // clip to bounds by projecting to u and v line segments individually
        vec3 uProjected = projectPointToLineSegment(center, halfU, planeProjected);
        vec3 vProjected = projectPointToLineSegment(center, halfV, planeProjected);

        // use to calculate the closest point to camera on bounding rect
        vec3 closestPoint = uProjected + vProjected - center;

        return length(closestPoint - cameraPosition);
      }
    `)),s.code.add(i`
    vec2 scaledUV() {
      vec2 uv = uvMapSpace.xy ${r(C,` * rotate45`)};
      vec2 uvCellOrigin = uvMapSpace.zw ${r(C,` * rotate45`)};

      ${r(!e.draped,i`float distanceToCamera = boundingRectDistanceToCamera();
               float worldToScreenRatio = worldToScreenPerDistanceRatio / distanceToCamera;`)}

      // Logarithmically discretize ratio to avoid jittering
      float step = 0.1;
      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);

      vec2 uvOffset = mod(uvCellOrigin * discreteWorldToScreenRatio, ${i.float(Q)});
      return uvOffset + (uv * discreteWorldToScreenRatio);
    }
  `),s.main.add(i`
    vuv = scaledUV();
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardVertexColor();
    forwardObjectAndLayerIdColor();
    ${e.hasVertexColors?`vColor *= uColor;`:e.hasVVColor?i`vColor = uColor * interpolateVVColor(${S});`:`vColor = uColor;`}
    gl_Position = transformPosition(proj, view, vpos);
  `),f.include(c),e.draped&&f.uniforms.add(new m(`texelSize`,e=>1/e.camera.pixelRatio)),x||(f.code.add(i`
      const float lineWidth = ${i.float(ae)};
      const float spacing = ${i.float(Q)};
      const float spacingINV = ${i.float(1/Q)};

      float coverage(float p, float txlSize) {
        p = mod(p, spacing);

        float halfTxlSize = txlSize / 2.0;

        float start = p - halfTxlSize;
        float end = p + halfTxlSize;

        float coverage = (ceil(end * spacingINV) - floor(start * spacingINV)) * lineWidth;
        coverage -= min(lineWidth, mod(start, spacing));
        coverage -= max(lineWidth - mod(end, spacing), 0.0);

        return coverage / txlSize;
      }
    `),e.draped||f.code.add(i`const int maxSamples = 5;
float sampleAA(float p) {
vec2 dxdy = abs(vec2(dFdx(p), dFdy(p)));
float fwidth = dxdy.x + dxdy.y;
ivec2 samples = 1 + ivec2(clamp(dxdy, 0.0, float(maxSamples - 1)));
vec2 invSamples = 1.0 / vec2(samples);
float accumulator = 0.0;
for (int j = 0; j < maxSamples; j++) {
if(j >= samples.y) {
break;
}
for (int i = 0; i < maxSamples; i++) {
if(i >= samples.x) {
break;
}
vec2 step = vec2(i,j) * invSamples - 0.5;
accumulator += coverage(p + step.x * dxdy.x + step.y * dxdy.y, fwidth);
}
}
accumulator /= float(samples.x * samples.y);
return accumulator;
}`)),f.main.add(i`
    discardBySlice(vpos);
    discardByTerrainDepth();
    vec4 color = vColor;
    ${r(!x,i`color.a *= ${oe(e)};`)}
    outputColorHighlightOLID(applySlice(color, vpos), color.rgb);
  `),o}function oe(e){function t(t){return e.draped?i`coverage(vuv.${t}, texelSize)`:i`sampleAA(vuv.${t})`}switch(e.style){case 3:case 0:return t(`y`);case 4:case 1:return t(`x`);case 5:case 2:return i`1.0 - (1.0 - ${t(`x`)}) * (1.0 - ${t(`y`)})`;default:return`0.0`}}var se=Object.freeze(Object.defineProperty({__proto__:null,build:$},Symbol.toStringTag,{value:`Module`}));export{w as a,se as i,E as n,ne as r,$ as t};