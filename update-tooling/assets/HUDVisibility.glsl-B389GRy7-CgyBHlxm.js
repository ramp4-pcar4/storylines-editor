import{t as e}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t}from"./FloatPassUniform-gHcGW-mi-DcUQ2f5D.js";import{t as n}from"./Texture2DBindUniform-BjIiNL3v-DEktPz6m.js";import{t as r}from"./FloatBindUniform-avAg5yxD-BlJbJU9Q.js";import{i,n as a,r as o,t as s}from"./View.glsl-YsNDLcX0-C6VXtJe6.js";import{n as c,r as l}from"./ScreenSizePerspective.glsl-Dmu3eZ8--fMM2WvJs.js";import{n as u}from"./VerticalOffset.glsl-BXr3ZmRy-l7y3rMnK.js";import{t as d}from"./BooleanBindUniform-Dh7KRyL2-Dn8MGzTT.js";import{t as f}from"./Float4BindUniform-BljimXR4-kSURy96v.js";var p=.5;function m(n,d){n.include(c),n.attributes.add(`position`,`vec3`),n.attributes.add(`normal`,`vec3`),n.attributes.add(`centerOffsetAndDistance`,`vec4`);let p=n.vertex;a(p,d),s(p,d),p.uniforms.add(new f(`viewport`,e=>e.camera.fullViewport),new t(`polygonOffset`,e=>e.shaderPolygonOffset),new r(`aboveGround`,e=>e.camera.aboveGround?1:-1)),d.hasVerticalOffset&&u(p),p.code.add(e`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),p.code.add(e`
    float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
      float pointGroundSign = ${d.terrainDepthTest?e.float(0):e`sign(pointGroundDistance)`};
      if (pointGroundSign == 0.0) {
        pointGroundSign = aboveGround;
      }

      // aboveGround is -1 if camera is below ground, 1 if above ground
      // groundRelative is 1 if both camera and symbol are on the same side of the ground, -1 otherwise
      float groundRelative = aboveGround * pointGroundSign;

      // view angle dependent part of polygon offset emulation: we take the absolute value because the sign that is
      // dropped is instead introduced using the ground-relative position of the symbol and the camera
      if (polygonOffset > .0) {
        float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
        float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
        float factor = (1.0 - tanAlpha / viewport[2]);

        // same side of the terrain
        if (groundRelative > 0.0) {
          posView *= factor;
        }
        // opposite sides of the terrain
        else {
          posView /= factor;
        }
      }

      return groundRelative;
    }
  `),d.draped&&!d.hasVerticalOffset||i(p),d.draped||(p.uniforms.add(new r(`perDistancePixelRatio`,e=>Math.tan(e.camera.fovY/2)/(e.camera.fullViewport[2]/2))),p.code.add(e`
      void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
        float distanceToCamera = length(posView);

        // Compute offset in world units for a half pixel shift
        float pixelOffset = distanceToCamera * perDistancePixelRatio * ${e.float(.5)};

        // Apply offset along normal in the direction away from the ground surface
        vec3 modelOffset = normalModel * aboveGround * pixelOffset;

        // Apply the same offset also on the view space position
        vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

        posModel += modelOffset;
        posView += viewOffset;
      }
    `)),d.screenCenterOffsetUnitsEnabled&&o(p),d.hasScreenSizePerspective&&l(p),p.code.add(e`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      vec3 centerOffset = centerOffsetAndDistance.xyz;
      float pointGroundDistance = centerOffsetAndDistance.w;

      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${d.draped?``:`applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);`}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${d.hasScreenSizePerspective&&(d.hasVerticalOffset||d.screenCenterOffsetUnitsEnabled)?`vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);`:``}

      ${d.hasVerticalOffset?d.hasScreenSizePerspective?`float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);`:`float verticalOffsetScreenHeight = verticalOffset.x;`:``}

      ${d.hasVerticalOffset?e`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:``}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${d.screenCenterOffsetUnitsEnabled?``:e`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${d.screenCenterOffsetUnitsEnabled?d.hasScreenSizePerspective?`float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);`:`float centerOffsetY = centerOffset.y;`:``}

      ${d.screenCenterOffsetUnitsEnabled?`posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;`:``}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}function h(t){t.uniforms.add(new d(`alignPixelEnabled`,e=>e.alignPixelEnabled)),t.code.add(e`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),t.code.add(e`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}function g(t){t.vertex.uniforms.add(new r(`renderTransparentlyOccludedHUD`,e=>e.hudRenderStyle===0?1:e.hudRenderStyle===1?0:.75),new f(`viewport`,e=>e.camera.fullViewport),new n(`hudVisibilityTexture`,e=>e.hudVisibility?.getTexture())),t.vertex.include(h),t.vertex.code.add(e`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}export{p as i,h as n,m as r,g as t};