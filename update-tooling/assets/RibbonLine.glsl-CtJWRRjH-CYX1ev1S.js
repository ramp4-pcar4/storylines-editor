import{n as e}from"./time-CZDdoUVM-_OBNPi3d.js";import{S as t}from"./vec2-BNGcJ5FZ-DcnE9Iss.js";import{i as n}from"./uuid-KPvt78tX-DA_JDUfK.js";import{l as r}from"./vec4-DtLpLkJR-NX0lHSHq.js";import{n as i}from"./vec2f64-D8dbcrKD-CDxkoLcj.js";import{n as a,t as o}from"./vec4f64-DFGee9an-D35VCg20.js";import"./enums-BXIvOhb7-Bd1WqIoI.js";import"./Texture-SkviwCZk-Ch3Vvn-g.js";import{t as s}from"./ShaderBuilder-aUMFb5cS-QIZt__97.js";import{n as c,t as l}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as u}from"./FloatPassUniform-gHcGW-mi-DcUQ2f5D.js";import{t as d}from"./Texture2DPassUniform-RVTT2Sjh-CghdmKcr.js";import{n as f,r as p,t as m}from"./AlphaCutoff-lGKpUdxr-Dq_Xw974.js";import{t as h}from"./ObjectAndLayerIdColor.glsl-C3sEfoJy-CPOXfzlg.js";import{t as g}from"./Float4PassUniform-R_rVPKlL-DaKCoBr0.js";import{t as _}from"./FloatBindUniform-avAg5yxD-BlJbJU9Q.js";import{t as v}from"./Matrix4BindUniform-gJm9vWnt-Bgv0CXyk.js";import{n as ee,r as y,t as b}from"./View.glsl-YsNDLcX0-C6VXtJe6.js";import{t as x}from"./Float2BindUniform-DpaMSVXH-DpUFM4Fg.js";import{t as S}from"./TerrainDepthTest.glsl-DZ7tKbZj-D4tuDHez.js";import{t as C}from"./OutputColorHighlightOLID.glsl-vs7-ar26-D-vHYNKy.js";import{t as w}from"./MixExternalColor.glsl-67xddAS3-DJFKuBZV.js";import{t as T}from"./PiUtils.glsl-E150IKCl-OUl2tba3.js";import{t as E}from"./Float4BindUniform-BljimXR4-kSURy96v.js";import{t as D}from"./Float2PassUniform-oNPLRE_S-DRiZTdeh.js";import{i as O,o as k,s as A,t as j}from"./MarkerSizing.glsl-D6DTpnXO-BLaniL7H.js";import{t as M}from"./PositionOutsideClipSpace-I4C860lT-DdHnwDih.js";var N={dash:[4,3],dot:[1,3],"long-dash":[8,3],"short-dash":[4,1],"short-dot":[1,1]},P={dash:N.dash,"dash-dot":[...N.dash,...N.dot],dot:N.dot,"long-dash":N[`long-dash`],"long-dash-dot":[...N[`long-dash`],...N.dot],"long-dash-dot-dot":[...N[`long-dash`],...N.dot,...N.dot],none:null,"short-dash":N[`short-dash`],"short-dash-dot":[...N[`short-dash`],...N[`short-dot`]],"short-dash-dot-dot":[...N[`short-dash`],...N[`short-dot`],...N[`short-dot`]],"short-dot":N[`short-dot`],solid:null},F=8,I=class{constructor(e,t,r){this.image=e,this.width=t,this.length=r,this.uuid=n()}};function L(e){return e!=null&&`image`in e}function R(e,t){return e==null?e:{pattern:e.slice(),pixelRatio:t}}function z(e){return{pattern:[e,e],pixelRatio:2}}function B(e){switch(e?.type){case`style`:return V(e.style);case`image`:return new I(e.image,e.width,e.length);case void 0:case null:return null}return null}function V(e){return e==null?null:R(P[e],F)}function H(e){return e.pattern.map(t=>Math.round(t*e.pixelRatio))}function U(e){if(e==null)return 1;let t=H(e);return Math.floor(t.reduce((e,t)=>e+t))}function W(e){return e==null?o:e.length===4?e:r(G,e[0],e[1],e[2],1)}var G=a();function K(e,t){if(!t.stippleEnabled)return void e.fragment.code.add(l`float getStippleAlpha(float lineWidth) { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);let n=!(t.draped&&t.stipplePreferContinuous),{vertex:r,fragment:i}=e;t.draped||(b(r,t),r.uniforms.add(new _(`worldToScreenPerDistanceRatio`,({camera:e})=>1/e.perScreenPixelRatio)).code.add(l`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add(`vStippleDistance`,`float`),e.varyings.add(`vStippleDistanceLimits`,`vec2`),e.varyings.add(`vStipplePatternStretch`,`float`),r.code.add(l`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${l.float(J)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),y(r),r.code.add(l`
    vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {

      // First check if the segment is long enough to support fully screen space patterns.
      // Force sparse mode for segments that are very large in screen space even if it is not allowed,
      // to avoid imprecision from calculating with large floats.
      if (segmentLengthPseudoScreen >= ${n?`patternLength`:`1e4`}) {
        // Round the screen length to get an integer number of pattern repetitions (minimum 1).
        float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
        float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
        float segmentLengthScreenRounded = flooredRepetitions * patternLength;

        float stretch = repetitions / flooredRepetitions;

        // We need to impose a lower bound on the stretch factor to prevent the dots from merging together when there is only 1 repetition.
        // 0.75 is the lowest possible stretch value for flooredRepetitions > 1, so it makes sense as lower bound.
        vStipplePatternStretch = max(0.75, stretch);

        return vec2(0.0, segmentLengthScreenRounded);
      }
      return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
    }
  `),i.uniforms.add(new d(`stipplePatternTexture`,e=>e.stippleTexture),new u(`stipplePatternPixelSizeInv`,e=>1/q(e))),t.stippleOffColorEnabled&&i.uniforms.add(new g(`stippleOffColor`,e=>W(e.stippleOffColor))),e.include(j),t.worldSizedImagePattern?(e.varyings.add(`vStippleV`,`float`),e.fragment.include(w),i.code.add(l`vec4 getStippleColor(out bool isClamped) {
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = vStippleDistance * stipplePatternPixelSizeInv;
float v = vStippleV == -1.0 ? 0.5 : vStippleV;
return texture(stipplePatternTexture, vec2(u, v));
}
vec4 getStippleColor() {
bool ignored;
return getStippleColor(ignored);
}
float getStippleSDF() {
vec4 color = getStippleColor();
return color.a == 0.0 ? -0.5 : 0.5;
}
float getStippleAlpha(float lineWidth) {
return getStippleColor().a;
}
vec4 blendStipple(vec4 color, float stippleAlpha) {
vec4 stippleColor = getStippleColor();
int mixMode  = 1;
vec3 col = mixExternalColor(color.rgb, vec3(1.0), stippleColor.rgb, mixMode);
float opacity = mixExternalOpacity(color.a, 1.0, stippleColor.a, mixMode);
return vec4(col, opacity);
}`)):i.code.add(l`
    float getStippleSDF(out bool isClamped) {
      float stippleDistanceClamped = noPerspectiveRead(clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y));
      float lineSizeInv = noPerspectiveRead(vLineSizeInv);

      vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
      isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;

      float u = stippleDistanceClamped * stipplePatternPixelSizeInv * lineSizeInv;
      u = fract(u);

      float sdf = texture(stipplePatternTexture, vec2(u, 0.5)).r;

      return (sdf - 0.5) * vStipplePatternStretch + 0.5;
    }

    float getStippleSDF() {
      bool ignored;
      return getStippleSDF(ignored);
    }

    float getStippleAlpha(float lineWidth) {
      bool isClamped;
      float stippleSDF = getStippleSDF(isClamped);
      float antiAliasedResult = clamp(stippleSDF * lineWidth + 0.5, 0.0, 1.0);
      return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${t.stippleOffColorEnabled?`mix(color, stippleOffColor, stippleAlpha)`:`vec4(color.rgb, color.a * stippleAlpha)`};
    }
  `),i.code.add(l`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${c(!t.stippleOffColorEnabled,`if (stippleAlpha < threshold) { discard; }`)}
    }
  `)}function q(e){let t=e.stipplePattern;return L(t)?t.length:t?U(t)/t.pixelRatio:1}var J=.4,Y=e(1),X=e(1);function Z(e,n){let{hasAnimation:r,animation:i}=n;if(!r)return;let{attributes:a,varyings:o,vertex:s,fragment:c}=e;a.add(`timeStamps`,`vec4`),o.add(`vTimeStamp`,`float`),o.add(`vFirstTime`,`float`),o.add(`vLastTime`,`float`),o.add(`vTransitionType`,`float`),s.main.add(l`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;
vTransitionType = timeStamps.w;`),i===3&&c.constants.add(`decayRate`,`float`,2.3),c.code.add(l`
    float getTrailOpacity(float x) {
      if (x < 0.0) {
        return 0.0;
      }

      ${Q(i)}
    }`),c.uniforms.add(new u(`timeElapsed`,e=>e.timeElapsed),new u(`trailLength`,e=>e.trailLength),new u(`speed`,e=>e.animationSpeed),new D(`startEndTime`,e=>t(te,e.startTime,e.endTime))),c.constants.add(`fadeInTime`,`float`,X),c.constants.add(`fadeOutTime`,`float`,Y),c.constants.add(`incomingTransition`,`int`,0),c.constants.add(`outgoingTransition`,`int`,2),c.code.add(l`float fadeIn(float x) {
return smoothstep(0.0, fadeInTime, x);
}
float fadeOut(float x) {
return isinf(fadeOutTime) ? 1.0 : smoothstep(fadeOutTime, 0.0, x);
}
void updateAlphaIf(inout float alpha, bool condition, float newAlpha) {
alpha = condition ? min(alpha, newAlpha) : alpha;
}
vec4 animate(vec4 color) {
float startTime = startEndTime[0];
float endTime = startEndTime[1];
float totalTime = vLastTime - vFirstTime;
float actualFadeOutTime = min(fadeOutTime * speed, trailLength);
float longStreamlineThreshold = (fadeInTime + 1.0) * speed + actualFadeOutTime;
bool longStreamline = totalTime > longStreamlineThreshold;
float totalTimeWithFadeOut = longStreamline && actualFadeOutTime != trailLength ? totalTime : totalTime + actualFadeOutTime;
float fadeOutStartTime = longStreamline ? totalTime - actualFadeOutTime : totalTime;
float originTime =  -vFirstTime;
float actualEndTime = int(vTransitionType) == outgoingTransition ? min(endTime, startTime + vLastTime / speed) : endTime;
vec4 animatedColor = color;
if (speed == 0.0) {
float alpha = getTrailOpacity((totalTimeWithFadeOut - (vTimeStamp - vFirstTime)) / trailLength);
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
animatedColor.a *= alpha;
return animatedColor;
}
float relativeStartTime = mod(startTime, totalTimeWithFadeOut);
float shiftedTimeElapsed = timeElapsed - relativeStartTime + originTime;
float headRelativeToFirst = mod(shiftedTimeElapsed * speed, totalTimeWithFadeOut);
float vRelativeToHead = headRelativeToFirst - originTime - vTimeStamp;
float vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
if (startTime > timeElapsed) {
return vec4(0.0);
}
float alpha = getTrailOpacity(vRelativeToHead / trailLength);
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, int(vTransitionType) != incomingTransition, step(startTime, vAbsoluteTime));
updateAlphaIf(alpha, headRelativeToFirst > fadeOutStartTime, fadeOut((headRelativeToFirst - fadeOutStartTime) / speed));
alpha *= fadeIn(vTimeStamp - vFirstTime);
animatedColor.a *= alpha;
return animatedColor;
}`)}function Q(e){switch(e){case 2:return`return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;`;case 3:return`float cutOff = exp(-decayRate);
        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);`;default:return`return 1.0;`}}var te=i(),ne=1;function $(e){let t=new s,{attributes:n,varyings:r,vertex:i,fragment:a}=t,{applyMarkerOffset:o,draped:d,output:b,capType:w,stippleEnabled:D,falloffEnabled:N,roundJoins:P,wireframe:F,innerColorEnabled:I,hasAnimation:L,hasScreenSizePerspective:R,worldSizedImagePattern:z}=e;a.include(T),t.include(A,e),t.include(K,e),t.include(h,e),t.include(S,e),t.include(Z,e);let B=o&&!d;B&&(i.uniforms.add(new u(`markerScale`,e=>e.markerScale)),t.include(k,{space:2,hasScreenSizePerspective:R})),ee(i,e),i.uniforms.add(new v(`inverseProjectionMatrix`,e=>e.camera.inverseProjectionMatrix),new x(`nearFar`,e=>e.camera.nearFar),new u(`miterLimit`,e=>e.join===`miter`?e.miterLimit:0),new E(`viewport`,e=>e.camera.fullViewport)),i.constants.add(`LARGE_HALF_FLOAT`,`float`,65500),n.add(`position`,`vec3`),n.add(`previousDelta`,`vec4`),n.add(`nextDelta`,`vec4`),n.add(`lineParameters`,`vec2`),n.add(`u0`,`float`),r.add(`vColor`,`vec4`),r.add(`vpos`,`vec3`,{invariant:!0}),r.add(`vLineDistance`,`float`),r.add(`vLineWidth`,`float`);let V=D;V&&r.add(`vLineSizeInv`,`float`);let H=w===2,U=D&&H,W=N||U;W&&r.add(`vLineDistanceNorm`,`float`),H&&(r.add(`vSegmentSDF`,`float`),r.add(`vReverseSegmentSDF`,`float`)),i.code.add(l`vec2 perpendicular(vec2 v) {
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
}`),i.code.add(l`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),i.code.add(l`void clip(
inout vec4 pos,
inout vec4 prev,
inout vec4 next,
bool isStartVertex
) {
float vnp = nearFar[0] * 0.99;
if (pos.z > -nearFar[0]) {
if (!isStartVertex) {
if (prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if (next.z < -nearFar[0]) {
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
}`),y(i),i.constants.add(`aaWidth`,`float`,+!D).main.add(l`
    // unpack values from vertex type
    bool isStartVertex = abs(abs(lineParameters.y) - 3.0) == 1.0;
    vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
    vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;

    float coverage = 1.0;

    // Check for special value of lineParameters.y which is used by the Renderer when graphics are removed before the
    // VBO is recompacted. If this is the case, then we just project outside of clip space.
    if (lineParameters.y == 0.0) {
      gl_Position = ${M};
    }
    else {
      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);

      bool isJoin = abs(lineParameters.y) < 3.0;
  `),B&&i.main.add(l`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos.xyz, other.xyz);
if (!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos.xyz) * 0.5;
}`),t.include(O),i.main.add(l`
      clip(pos, prev, next, isStartVertex);

      vec3 clippedPos = pos.xyz;
      vec3 clippedCenter = mix(pos.xyz, isStartVertex ? next.xyz : prev.xyz, 0.5);

      forwardViewPosDepth(pos.xyz);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);

      vec2 left = (pos.xy - prev.xy);
      vec2 right = (next.xy - pos.xy);

      float leftLen = length(left);
      float rightLen = length(right);

      float lineSize = getSize(${c(R,`clippedPos`)});
      ${c(D&&R,`float patternLineSize = getSize(clippedCenter);`)}
      ${c(D&&!R,`float patternLineSize = lineSize;`)}

      ${c(z,l`
          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio * worldToScreenRatio;
          if (lineWidth < 1.0) {
            coverage = lineWidth;
            lineWidth = 1.0;
          }
        `,l`
          if (lineSize < 1.0) {
            coverage = lineSize; // convert sub-pixel coverage to alpha
            lineSize = 1.0;
          }

          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio;
        `)}

      vLineWidth = noPerspectiveWrite(lineWidth, pos.w);
      ${V?l`vLineSizeInv = noPerspectiveWrite(1.0 / lineSize, pos.w);`:``}
  `),(D||H)&&i.main.add(l`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${H?l`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:``}
    `),i.main.add(l`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
float subdivisionFactor = lineParameters.x;
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),P?i.main.add(l`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${D?l`min(1.0, subdivisionFactor * ${l.float(3/2)})`:l`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):i.main.add(l`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);let G=w!==0;return i.main.add(l`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${G?l`capDisplacementDir = isStartVertex ? -right : left;`:``}
    }
  `),i.main.add(l`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(lineParameters.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = noPerspectiveWrite(sign(lineParameters.y), pos.w);

    vLineDistance = lineWidth * lineDistNorm;
    ${W?l`vLineDistanceNorm = lineDistNorm;`:``}

    pos.xy += dpos;
  `),H&&i.main.add(l`vec2 segmentDir = normalize(segment);
vSegmentSDF = noPerspectiveWrite((isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir)), pos.w);
vReverseSegmentSDF = noPerspectiveWrite((isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir)), pos.w);`),D&&(d?i.uniforms.add(new _(`worldToScreenRatio`,e=>1/e.screenToPCSRatio)):i.main.add(l`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),i.main.add(l`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),d?i.main.add(l`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):i.main.add(l`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),i.uniforms.add(new u(`stipplePatternPixelSize`,e=>q(e))),i.main.add(l`
      float patternLength = patternLineSize * stipplePatternPixelSize;

      ${c(z,l`
          float uu = mix(u0, u0 - segmentLengthRender, isEndVertex);
          vStippleDistanceLimits = vec2(uu, uu + segmentLengthRender);
          vStipplePatternStretch = 1.0;

          // The v-coordinate used in case of an image pattern.
          bool isLeft = sign(lineParameters.y) < 0.0;
          vStippleV = isLeft ? 0.0 : 1.0;
        `,l`
          // Compute the coordinates at both start and end of the line segment, because we need both to clamp to in the
          // fragment shader
          vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
        `)}

      vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);

      // Adjust the coordinate to the displaced position (the pattern is shortened/overextended on the in/outside of
      // joins)
      if (segmentLengthScreenDouble >= 0.001) {
        // Project the actual vertex position onto the line segment. Note that the resulting factor is within [0..1]
        // at the original vertex positions, and slightly outside of that range at the displaced positions
        vec2 stippleDisplacement = pos.xy - segmentOrigin;
        float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);

        // Apply this offset to the actual vertex coordinate (can be screen or pseudo-screen space)
        vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
      }

      // Cancel out perspective correct interpolation because we want this length the really represent the screen
      // distance
      vStippleDistanceLimits = noPerspectiveWrite(vStippleDistanceLimits, pos.w);
      vStippleDistance = noPerspectiveWrite(vStippleDistance, pos.w);

      // Disable stipple distance limits on caps
      vStippleDistanceLimits = isJoin ?
                                 vStippleDistanceLimits :
                                 isStartVertex ?
                                  vec2(-1e34, vStippleDistanceLimits.y) :
                                  vec2(vStippleDistanceLimits.x, 1e34);
    `)),i.main.add(l`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a = noPerspectiveWrite(vColor.a * coverage, pos.w);

      ${F&&!d?`pos.z -= 0.001 * pos.w;`:``}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),t.fragment.include(m,e),t.include(C,e),a.include(p),a.main.add(l`discardBySlice(vpos);
discardByTerrainDepth();`),t.include(j),a.main.add(l`
    float lineWidth = noPerspectiveRead(vLineWidth);
    float lineDistance = noPerspectiveRead(vLineDistance);
    ${c(W,l`float lineDistanceNorm = noPerspectiveRead(vLineDistanceNorm);`)}
  `),F?a.main.add(l`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(H&&a.main.add(l`
        float sdf = noPerspectiveRead(min(vSegmentSDF, vReverseSegmentSDF));
        vec2 fragmentPosition = vec2(min(sdf, 0.0), lineDistance);

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${l.float(.003913894324853229)}) {
          discard;
        }
      `),U?a.main.add(l`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        lineDistanceNorm
      );
      float stippleRadius = length(stipplePosition * lineWidth);
      float stippleCapSDF = (stippleRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${l.float(f)}, stippleCoverage);
      `):a.main.add(l`float stippleAlpha = getStippleAlpha(lineWidth);`),b!==9&&a.main.add(l`discardByStippleAlpha(stippleAlpha, ${l.float(.003913894324853229)});`),t.include(j),a.uniforms.add(new g(`intrinsicColor`,e=>e.color)).main.add(l`vec4 color = intrinsicColor * vColor;
color.a = noPerspectiveRead(color.a);`),I&&a.uniforms.add(new g(`innerColor`,e=>e.innerColor??e.color),new u(`innerWidth`,(e,t)=>e.innerWidth*t.camera.pixelRatio)).main.add(l`float distToInner = abs(lineDistance) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`),a.main.add(l`vec4 finalColor = blendStipple(color, stippleAlpha);`),N&&(a.uniforms.add(new u(`falloff`,e=>e.falloff)),a.main.add(l`finalColor.a *= pow(max(0.0, 1.0 - abs(lineDistanceNorm)), falloff);`)),D||a.main.add(l`float featherStartDistance = max(lineWidth - 2.0, 0.0);
float value = abs(lineDistance);
float feather = (value - featherStartDistance) / (lineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`),L&&a.main.add(l`
        finalColor = animate(finalColor);

        ${c(b!==9,l`
            if (finalColor.a <= ${l.float(.003913894324853229)}) {
              discard;
            }`)}
      `)),a.main.add(l`outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`),t}var re=Object.freeze(Object.defineProperty({__proto__:null,build:$,ribbonlineNumRoundJoinSubdivisions:1},Symbol.toStringTag,{value:`Module`}));export{re as a,ne as i,B as n,z as o,L as r,$ as t};