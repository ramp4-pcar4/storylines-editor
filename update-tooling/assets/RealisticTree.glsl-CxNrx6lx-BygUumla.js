import{t as e}from"./ShaderBuilder-aUMFb5cS-QIZt__97.js";import{n as t,t as n}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as r}from"./Float3PassUniform-BEhcqx4m-lPGwfhIL.js";import{t as i}from"./FloatPassUniform-gHcGW-mi-DcUQ2f5D.js";import{t as a}from"./Texture2DPassUniform-RVTT2Sjh-CghdmKcr.js";import{c as o,r as s}from"./Emissions.glsl-C1fRgyHC-BKFlnvac.js";import{n as c,t as l}from"./AlphaCutoff-lGKpUdxr-Dq_Xw974.js";import{t as u}from"./Float4PassUniform-R_rVPKlL-DaKCoBr0.js";import{a as d,n as f,r as p}from"./VisualVariables.glsl-CLB2wooA-BcMLhAld.js";import{n as m,t as h}from"./View.glsl-YsNDLcX0-C6VXtJe6.js";import{t as g}from"./TerrainDepthTest.glsl-DZ7tKbZj-D4tuDHez.js";import{t as _}from"./OutputColorHighlightOLID.glsl-vs7-ar26-D-vHYNKy.js";import{r as v}from"./Transform.glsl-B8LYsJdc-ChhjZx_e.js";import{t as y}from"./VertexColor.glsl-DkZ0DT-i-UTbufU1-.js";import{a as b}from"./MaterialUtil-Fmbx5pLm-Cpg5QGbH.js";import{t as x}from"./MixExternalColor.glsl-67xddAS3-DJFKuBZV.js";import{r as S}from"./VerticalOffset.glsl-BXr3ZmRy-l7y3rMnK.js";import{a as C,d as w,n as T,r as E,t as D}from"./ReadShadowMap.glsl-B3ui5m-b-DFG3lRjr.js";import{c as O,d as k,i as A,l as j,t as ee,u as M}from"./SnowCover.glsl-C23wZ4DV-CXIoyzbD.js";import{c as N,i as P,l as F,n as I,r as L,t as R,u as z}from"./DefaultMaterialAuxiliaryPasses.glsl-B2g_FZwE-vJ9dVyVK.js";function B(B){let V=new e,{attributes:H,vertex:U,fragment:W,varyings:G}=V,{output:K,offsetBackfaces:q,pbrMode:J,snowCover:Y,spherical:X}=B,Z=J===1||J===2;if(m(U,B),H.add(`position`,`vec3`),G.add(`vpos`,`vec3`,{invariant:!0}),V.include(d,B),V.include(P,B),V.include(S,B),V.include(g,B),!o(K))return V.include(F,B),V;h(V.vertex,B),V.include(I,B),V.include(v),q&&V.include(z),G.add(`vNormalWorld`,`vec3`),G.add(`localvpos`,`vec3`,{invariant:!0}),V.include(s,B),V.include(N,B),V.include(R,B),V.include(y,B),U.include(p),U.include(f),U.uniforms.add(new u(`externalColor`,e=>e.externalColor,{supportsNaN:!0})),G.add(`vcolorExt`,`vec4`),V.include(B.instancedDoublePrecision?E:T,B),U.main.add(n`
    forwardVertexColor();

    MaskedColor maskedColorExt =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColorExt.color;
    forwardColorMixMode(maskedColorExt.mask);

    bool alphaCut = opacityMixMode != ${n.int(b.ignore)} && vcolorExt.a < ${n.float(c)};
    vpos = getVertexInLocalOriginSpace();

    localvpos = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
    vpos = addVerticalOffset(vpos, localOrigin);
    vec4 basePosition = transformPosition(proj, view, vpos);

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardLinearDepthToReadShadowMap();
    gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
    ${t(q,`offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);`,`basePosition;`)}
  `);let{hasColorTexture:Q,hasColorTextureTransform:$}=B;return W.include(k,B),W.include(O,B),V.include(L,B),W.include(l,B),V.include(_,B),h(W,B),w(W),A(W),ee(W),W.uniforms.add(U.uniforms.get(`localOrigin`),U.uniforms.get(`view`),new r(`ambient`,e=>e.ambient),new r(`diffuse`,e=>e.diffuse),new i(`opacity`,e=>e.opacity),new i(`layerOpacity`,e=>e.layerOpacity)),Q&&W.uniforms.add(new a(`tex`,e=>e.texture)),V.include(j,B),W.include(D,B),W.include(x),W.include(M,B),C(W),W.main.add(n`
      discardBySlice(vpos);
      discardByTerrainDepth();
      vec4 texColor = ${Q?`texture(tex, ${$?`colorUV`:`vuv0`})`:` vec4(1.0)`};
      ${t(Q,`${t(B.textureAlphaPremultiplied,`texColor.rgb /= texColor.a;`)}\n        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = readShadow(additionalAmbientScale, vpos);
      vec3 matColor = max(ambient, diffuse);
      ${B.hasVertexColors?n`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, opacityMixMode);`:n`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, opacityMixMode);`}

      vec3 shadingNormal = normalize(vNormalWorld);
      vec3 groundNormal = ${X?`normalize(vpos + localOrigin)`:`vec3(0.0, 0.0, 1.0)`};

      ${t(Y,`vec3 faceNormal = screenDerivativeNormal(vpos);
         float snow = getRealisticTreeSnow(faceNormal, shadingNormal, groundNormal);
         albedo = mix(albedo, vec3(1), snow);`)}

      ${n`albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}

      ${Z?n`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${t(Y,`mrr = applySnowToMRR(mrr, snow);`)}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, groundNormal, mrr, additionalAmbientIrradiance);`:n`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${t(Y,`, 1.0`)});`),V}var V=Object.freeze(Object.defineProperty({__proto__:null,build:B},Symbol.toStringTag,{value:`Module`}));export{V as n,B as t};