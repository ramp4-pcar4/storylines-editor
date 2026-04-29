import{S as e,b as t}from"./vec2-BNGcJ5FZ-DcnE9Iss.js";import{n}from"./vec2f64-D8dbcrKD-CDxkoLcj.js";import{t as r}from"./vec4f64-DFGee9an-D35VCg20.js";import{t as i}from"./ShaderBuilder-aUMFb5cS-QIZt__97.js";import{n as a,t as o}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as s}from"./FloatPassUniform-gHcGW-mi-DcUQ2f5D.js";import{t as c}from"./Texture2DPassUniform-RVTT2Sjh-CghdmKcr.js";import{t as l}from"./Texture2DBindUniform-BjIiNL3v-DEktPz6m.js";import{a as u,n as d,r as f,s as ee}from"./AlphaCutoff-lGKpUdxr-Dq_Xw974.js";import{t as p}from"./ObjectAndLayerIdColor.glsl-C3sEfoJy-CPOXfzlg.js";import{t as m}from"./Float4PassUniform-R_rVPKlL-DaKCoBr0.js";import{a as h}from"./VisualVariables.glsl-CLB2wooA-BcMLhAld.js";import{r as g}from"./View.glsl-YsNDLcX0-C6VXtJe6.js";import{t as te}from"./ReadDepth.glsl-DNR_DJR2-TOafqjrr.js";import{t as _}from"./TerrainDepthTest.glsl-DZ7tKbZj-D4tuDHez.js";import{n as v,r as y,t as b}from"./ScreenSizePerspective.glsl-Dmu3eZ8--fMM2WvJs.js";import{t as x}from"./Float4BindUniform-BljimXR4-kSURy96v.js";import{t as S}from"./Float2PassUniform-oNPLRE_S-DRiZTdeh.js";import{t as C}from"./PositionOutsideClipSpace-I4C860lT-DdHnwDih.js";import{n as w,r as T,t as E}from"./HUDVisibility.glsl-B389GRy7-CgyBHlxm.js";function D(e,t){let{vertex:n,fragment:r}=e;e.include(_,t),n.include(w),n.main.add(o`vec4 posProjCenter;
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
gl_PointSize = 1.0;`),r.main.add(o`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function O(t){let n=new i;if(n.include(T,t),n.vertex.include(ee,t),t.occlusionPass)return n.include(D,t),n;let{output:_,oitPass:O,hasOcclusionTexture:M,signedDistanceFieldEnabled:P,useVisibilityPixel:I,pixelSnappingEnabled:L,hasEmission:R,hasScreenSizePerspective:z,debugDrawLabelBorder:B,hasVVSize:V,hasVVColor:H,hasRotation:U,occludedFragmentFade:W,sampleSignedDistanceFieldTexelCenter:G}=t;n.include(v),n.include(h,t),n.include(p,t),I&&n.include(E);let{vertex:K,fragment:q}=n;q.include(f),n.varyings.add(`vcolor`,`vec4`),n.varyings.add(`vtc`,`vec2`),n.varyings.add(`vsize`,`vec2`);let J=_===8,Y=J&&I;Y&&n.varyings.add(`voccluded`,`float`),K.uniforms.add(new x(`viewport`,e=>e.camera.fullViewport),new S(`screenOffset`,(t,n)=>e(j,2*t.screenOffset[0]*n.camera.pixelRatio,2*t.screenOffset[1]*n.camera.pixelRatio)),new S(`anchorPosition`,e=>A(e)),new m(`materialColor`,({color:e})=>e),new s(`materialRotation`,e=>e.rotation),new c(`tex`,e=>e.texture)),g(K),P&&(K.uniforms.add(new m(`outlineColor`,e=>e.outlineColor)),q.uniforms.add(new m(`outlineColor`,e=>k(e)?e.outlineColor:r),new s(`outlineSize`,e=>k(e)?e.outlineSize:0))),L&&K.include(w),z&&(b(K),y(K)),B&&n.varyings.add(`debugBorderCoords`,`vec4`),n.attributes.add(`uv0`,`vec2`),n.attributes.add(`uvi`,`vec4`),n.attributes.add(`color`,`vec4`),n.attributes.add(`size`,`vec2`),n.attributes.add(`rotation`,`float`),(V||H)&&n.attributes.add(`featureAttribute`,`vec4`),K.main.add(o`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      gl_Position = ${C};
      return;
    }

    vec2 inputSize;
    ${a(z,o`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,o`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${a(V,o`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${a(I,o`
        bool visible = testHUDVisibility(posProj);
        if (!visible) {
          vtc = vec2(0.0);
          ${a(B,`debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);`)}
          return;
        }
      `)}
    ${a(Y,o`voccluded = visible ? 0.0 : 1.0;`)}
  `);let X=o`
    vec2 uv = mix(uvi.xy, uvi.zw, bvec2(uv0));
    vec2 texSize = vec2(textureSize(tex, 0));
    uv = mix(vec2(1.0), uv / texSize, lessThan(uv, vec2(${F})));
    quadOffset.xy = (uv0 - anchorPosition) * 2.0 * combinedSize;

    ${a(U,o`
        float angle = radians(materialRotation + rotation);
        float cosAngle = cos(angle);
        float sinAngle = sin(angle);
        mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

        quadOffset.xy = rotate * quadOffset.xy;
      `)}

    quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,Z=L?P?o`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:o`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:o`posProj += quadOffset;`;K.main.add(o`
    ${X}
    ${H?`vcolor = interpolateVVColor(featureAttribute.y) * materialColor;`:`vcolor = color * materialColor;`}

    ${a(_===9,o`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${o.float(d)};
    ${a(P,`alphaDiscard = alphaDiscard && outlineColor.a < ${o.float(d)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${Z}
      gl_Position = posProj;
    }

    vtc = uv;

    ${a(B,o`debugBorderCoords = vec4(uv0, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),q.uniforms.add(new c(`tex`,e=>e.texture)),W&&!J&&(q.include(te),q.uniforms.add(new l(`depthMap`,e=>e.mainDepth),new s(`occludedOpacity`,e=>e.occludedFragmentOpacity?.value??1))),M&&q.uniforms.add(new l(`texOcclusion`,e=>e.hudOcclusion?.attachment));let Q=B?o`(isBorder > 0.0 ? 0.0 : ${o.float(d)})`:o.float(d),$=o`
    ${a(B,o`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${a(G,o`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${P?o`
      vec4 fillPixelColor = vcolor;

      // Get distance in output units (i.e. pixels)

      float sdf = texture(tex, samplePos).r;
      float pixelDistance = sdf * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - pixelDistance, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(pixelDistance) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${Q} ||
          fillPixelColor.a + outlinePixelColor.a < ${o.float(d)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
                              vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${a(!J,o`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${Q}) {
          discard;
        }

        ${a(!J,o`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-pixelDistance/vsize.x*2.0, 0.0, 1.0), clamp(pixelDistance/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:o`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${Q}) {
            discard;
          }
          ${a(!J,o`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${a(W&&!J,o`
        float zSample = -linearizeDepth(texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x);
        float zFragment = -linearizeDepth(gl_FragCoord.z);
        if (zSample < ${o.float(1-N)} * zFragment) {
          fragColor *= occludedOpacity;
        }
      `)}
    ${a(M,o`fragColor *= texelFetch(texOcclusion, ivec2(gl_FragCoord.xy), 0).r;`)}

    ${a(!J&&B,o`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}

    ${a(O===2,o`
    if (fragColor.a < ${o.float(d)}) {
      discard;
    }`)}
  `;switch(_){case 0:n.outputs.add(`fragColor`,`vec4`,0),R&&n.outputs.add(`fragEmission`,`vec4`,1),O===1&&n.outputs.add(`fragAlpha`,`float`,R?2:1),q.main.add(o`
        ${$}
        // Unlike other materials, the fragment shader outputs premultiplied colors.
        // Disable this for front face rendering for correct OIT compositing.
        ${a(O===2,o`fragColor.rgb /= fragColor.a;`)}
        ${a(R,o`fragEmission = vec4(0.0);`)}
        ${a(O===1,o`fragAlpha = fragColor.a;`)}`);break;case 9:q.main.add(o`
        ${$}
        outputObjectAndLayerIdColor();`);break;case 8:n.include(u,t),q.main.add(o`
        ${$}
        outputHighlight(${a(Y,o`voccluded == 1.0`,o`false`)});`)}return n}function k(e){return e.outlineColor[3]>0&&e.outlineSize>0}function A(e){return e.textureIsSignedDistanceField?M(e.anchorPosition,e.distanceFieldBoundingBox,j):t(j,e.anchorPosition),j}var j=n();function M(t,n,r){e(r,t[0]*(n[2]-n[0])+n[0],t[1]*(n[3]-n[1])+n[1])}var N=.08,P=32e3,F=o.float(P),I=Object.freeze(Object.defineProperty({__proto__:null,build:O,calculateAnchorPosition:A,fullUV:P},Symbol.toStringTag,{value:`Module`}));export{P as i,I as n,O as r,A as t};