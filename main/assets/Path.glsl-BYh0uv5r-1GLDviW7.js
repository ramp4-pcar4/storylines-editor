import{o as e}from"./vec2f64-D8dbcrKD-CDxkoLcj.js";import{t}from"./ShaderBuilder-aUMFb5cS-QIZt__97.js";import{n,t as r}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as i}from"./Float3PassUniform-BEhcqx4m-lPGwfhIL.js";import{t as a}from"./FloatPassUniform-gHcGW-mi-DcUQ2f5D.js";import{c as o}from"./Emissions.glsl-C1fRgyHC-BKFlnvac.js";import{a as s,r as c,t as l}from"./AlphaCutoff-lGKpUdxr-Dq_Xw974.js";import{t as u}from"./ObjectAndLayerIdColor.glsl-C3sEfoJy-CPOXfzlg.js";import{t as d}from"./Float4PassUniform-R_rVPKlL-DaKCoBr0.js";import{c as f,d as p,u as m}from"./FloatsPassUniform-VyaOZV1--CcYVB0L4.js";import{i as h,n as g,t as _}from"./View.glsl-YsNDLcX0-C6VXtJe6.js";import{t as v}from"./TerrainDepthTest.glsl-DZ7tKbZj-D4tuDHez.js";import{t as y}from"./OutputColorHighlightOLID.glsl-vs7-ar26-D-vHYNKy.js";import{a as b,r as x}from"./Transform.glsl-B8LYsJdc-ChhjZx_e.js";import{a as S,n as C}from"./ReadShadowMap.glsl-B3ui5m-b-DFG3lRjr.js";import{t as w}from"./Float2PassUniform-oNPLRE_S-DRiZTdeh.js";import{c as T,d as E,i as D,l as O,n as k,t as A,u as j}from"./SnowCover.glsl-C23wZ4DV-CXIoyzbD.js";import{t as M}from"./Normals.glsl-BBG8Tr27-C2PesDyh.js";import{t as N}from"./NormalUtils.glsl-CWSzXXL2-E1BbnO13.js";var P=8;function F(e,t){let{attributes:o,vertex:s}=e;o.add(`position`,`vec3`),o.add(`profileVertexAndNormal`,`vec4`),o.add(`profileAuxData`,`vec3`),o.add(`profileRight`,`vec2`),o.add(`profileUp`,`vec2`),s.code.add(r`bool isCapVertex() {
return profileAuxData.z == 1.0;
}`),s.uniforms.add(new w(`size`,e=>e.size));let{hasVVSize:c,hasVVColor:l,hasVVOpacity:u}=t;c?(o.add(`sizeFeatureAttribute`,`float`),s.uniforms.add(new i(`vvSizeMinSize`,e=>e.vvSize.minSize),new i(`vvSizeMaxSize`,e=>e.vvSize.maxSize),new i(`vvSizeOffset`,e=>e.vvSize.offset),new i(`vvSizeFactor`,e=>e.vvSize.factor),new i(`vvSizeFallback`,e=>e.vvSize.fallback)),s.code.add(r`vec2 getSize() {
float value = sizeFeatureAttribute;
if (isnan(value)) {
return vvSizeFallback.xz;
}
return size * clamp(vvSizeOffset + value * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).xz;
}`)):s.code.add(r`vec2 getSize(){
return size;
}`),u?(o.add(`opacityFeatureAttribute`,`float`),s.constants.add(`vvOpacityNumber`,`int`,P),s.uniforms.add(new f(`vvOpacityValues`,P,e=>e.vvOpacity.values),new f(`vvOpacityOpacities`,P,e=>e.vvOpacity.opacityValues),new a(`vvOpacityFallback`,e=>e.vvOpacity.fallback,{supportsNaN:!0})),s.code.add(r`
    vec4 applyOpacity(vec4 color) {
      // if we encounter NaN in the color it means the color is in the fallback case where the symbol color
      // is not defined and there is no valid color visual variable override. In this case just return a fully
      // transparent color
      if (isnan(color.r)) {
        return vec4(0);
      }

      float value = opacityFeatureAttribute;

      if (isnan(value)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${n(l,`color`,`vec4(color.rgb, vvOpacityFallback)`)};
      }

      if (value <= vvOpacityValues[0]) {
        return vec4(color.rgb, vvOpacityOpacities[0]);
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return vec4(color.rgb, mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f));
        }
      }

      return vec4( color.rgb, vvOpacityOpacities[vvOpacityNumber - 1]);
    }
    `)):s.code.add(r`vec4 applyOpacity(vec4 color){
return color;
}`),l?(o.add(`colorFeatureAttribute`,`float`),s.constants.add(`vvColorNumber`,`int`,8),s.uniforms.add(new f(`vvColorValues`,8,e=>e.vvColor.values),new m(`vvColorColors`,8,e=>e.vvColor.colors),new d(`vvColorFallback`,e=>e.vvColor.fallback)),s.code.add(r`vec4 getColor() {
float value = colorFeatureAttribute;
if (isnan(value)) {
return applyOpacity(vvColorFallback);
}
if (value <= vvColorValues[0]) {
return applyOpacity(vvColorColors[0]);
}
for (int i = 1; i < vvColorNumber; ++i) {
if (vvColorValues[i] >= value) {
float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
return applyOpacity(mix(vvColorColors[i-1], vvColorColors[i], f));
}
}
return applyOpacity(vvColorColors[vvColorNumber - 1]);
}`)):s.code.add(r`vec4 getColor(){
return applyOpacity(vec4(1, 1, 1, 1));
}`),s.code.add(r`vec3 decompressAxis(vec2 axis) {
float z = 1.0 - abs(axis.x) - abs(axis.y);
return normalize(vec3(axis + sign(axis) * min(z, 0.0), z));
}
vec3 calculateVPos() {
vec2 size = getSize();
vec3 origin = position;
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec2 profileVertex = profileVertexAndNormal.xy * size;`),s.code.add(r`if(isCapVertex()) {
float positionOffsetAlongProfilePlaneNormal = profileAuxData.x * size[0];
vec3 forward = cross(up, right);
vec3 offset = right * profileVertex.x + up * profileVertex.y + forward * positionOffsetAlongProfilePlaneNormal;
return origin + offset;
}
vec2 rotationRight = vec2(profileAuxData.x, profileAuxData.y);
float maxDistance = length(rotationRight);`),s.code.add(r`rotationRight = maxDistance > 0.0 ? normalize(rotationRight) : vec2(0, 0);
float rx = dot(profileVertex, rotationRight);
if (abs(rx) > maxDistance) {
vec2 rotationUp = vec2(-rotationRight.y, rotationRight.x);
float ry = dot(profileVertex, rotationUp);
profileVertex = rotationRight * maxDistance * sign(rx) + rotationUp * ry;
}
vec3 offset = right * profileVertex.x + up * profileVertex.y;
return origin + offset;
}`),s.code.add(r`vec3 localNormal() {
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec3 normal = right * profileVertexAndNormal.z + up * profileVertexAndNormal.w;
if(isCapVertex()) {
vec3 forward = cross(up, right);
normal += forward * profileAuxData.y;
}
return normal;
}`)}var I=class extends p{constructor(){super(...arguments),this.size=e(1,1)}};function L(e){let d=new t,{vertex:f,fragment:p,varyings:m}=d;g(f,e),m.add(`vpos`,`vec3`,{invariant:!0}),d.include(F,e);let{output:w,spherical:P,pbrMode:I,snowCover:L}=e;switch((o(w)||w===9)&&(d.include(x),d.include(C,e),d.include(u,e),d.include(v,e),m.add(`vnormal`,`vec3`),m.add(`vcolor`,`vec4`),f.main.add(r`vpos = calculateVPos();
vnormal = normalize(localNormal());
forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);
forwardObjectAndLayerIdColor();
vcolor = getColor();
forwardLinearDepthToReadShadowMap();`)),w){case 0:d.include(O,e),p.include(E,e),p.include(T,e),d.include(M,e),p.include(l,e),d.include(y,e),_(p,e),D(p),A(p),p.uniforms.add(f.uniforms.get(`localOrigin`),new i(`ambient`,e=>e.ambient),new i(`diffuse`,e=>e.diffuse),new a(`opacity`,e=>e.opacity)),p.include(c),p.include(j,e),S(p),p.main.add(r`
        discardBySlice(vpos);
        discardByTerrainDepth();

        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        shadingParams.normalView = vnormal;
        vec3 normal = shadingNormal(shadingParams);
        float ssao = evaluateAmbientOcclusionInverse();

        vec3 posWorld = vpos + localOrigin;
        vec3 normalGround = ${P?`normalize(posWorld);`:`vec3(0.0, 0.0, 1.0);`}

        vec3 albedo = vcolor.rgb * max(ambient, diffuse); // combine the old material parameters into a single one
        float combinedOpacity = vcolor.a * opacity;

        ${n(L,r`float snow = getSnow(normal, normalGround);
                 albedo = mix(albedo, vec3(1), snow);
                 ssao = mix(ssao, 1.0, snow);`)}

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        float shadow = readShadow(additionalAmbientScale, vpos);

        ${n(I===2,`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];\n           ${n(L,`mrr = applySnowToMRR(mrr, snow);`)}`)}

        vec3 shadedColor = ${I===2?`evaluateSceneLightingPBR(normal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);`:`evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        vec4 finalColor = vec4(shadedColor, combinedOpacity);
        outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${n(L,`, snow`)});`);break;case 1:d.include(x),f.main.add(r`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),d.fragment.include(l,e),p.main.add(r`discardBySlice(vpos);`);break;case 3:case 4:case 5:case 6:d.include(x),b(d),m.add(`depth`,`float`),f.main.add(r`vpos = calculateVPos();
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);`),d.fragment.include(l,e),d.include(k,e),p.main.add(r`discardBySlice(vpos);
outputDepth(depth);`);break;case 9:d.fragment.include(l,e),p.main.add(r`discardBySlice(vpos);
outputObjectAndLayerIdColor();`);break;case 2:d.include(x),d.include(N,e),h(f),m.add(`vnormal`,`vec3`),f.main.add(r`vpos = calculateVPos();
vnormal = normalize((viewNormal * vec4(localNormal(), 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);`),d.fragment.include(l,e),p.main.add(r`discardBySlice(vpos);
vec3 normal = normalize(vnormal);
if (gl_FrontFacing == false) normal = -normal;
fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case 8:d.include(x),d.include(N,e),m.add(`vnormal`,`vec3`),f.main.add(r`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),d.fragment.include(l,e),d.include(s,e),p.main.add(r`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`)}return d}var R=Object.freeze(Object.defineProperty({__proto__:null,build:L},Symbol.toStringTag,{value:`Module`}));export{L as n,R as r,I as t};