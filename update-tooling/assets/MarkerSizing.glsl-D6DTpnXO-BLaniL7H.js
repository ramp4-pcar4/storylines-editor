import{t as e}from"./mat4f64-B3SVWMa--Ci8MEpDu.js";import{O as t,h as n}from"./mat4-C2gx1S7R-irOVkod_.js";import{s as r}from"./vec4f64-DFGee9an-D35VCg20.js";import{f as i,p as a}from"./enums-BXIvOhb7-Bd1WqIoI.js";import"./Texture-SkviwCZk-Ch3Vvn-g.js";import{n as o,t as s}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as c}from"./Float3PassUniform-BEhcqx4m-lPGwfhIL.js";import{t as l}from"./FloatPassUniform-gHcGW-mi-DcUQ2f5D.js";import{c as u}from"./FloatsPassUniform-VyaOZV1--CcYVB0L4.js";import{a as d}from"./VisualVariables.glsl-CLB2wooA-BcMLhAld.js";import{t as f}from"./FloatBindUniform-avAg5yxD-BlJbJU9Q.js";import{a as p,r as m,t as h}from"./View.glsl-YsNDLcX0-C6VXtJe6.js";import{n as g,t as _}from"./ScreenSizePerspective.glsl-Dmu3eZ8--fMM2WvJs.js";import{n as v}from"./ManagedTexture-4JqQ6G2v-CyfRzpIY.js";var y=8;function b(e,r){let{vertex:i,attributes:a}=e;i.uniforms.add(new l(`intrinsicWidth`,e=>e.width));let{hasScreenSizePerspective:f,spherical:m}=r;f?(e.include(g,r),_(i),h(i,r),i.uniforms.add(new p(`inverseViewMatrix`,(e,r)=>t(x,n(x,r.camera.viewMatrix,e.origin)))),i.code.add(s`
      float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
        vec3 worldPos = (inverseViewMatrix * vec4(pos, 1)).xyz;
        vec3 groundUp = ${m?s`normalize(worldPos + localOrigin)`:s`vec3(0.0, 0.0, 1.0)`};
        float absCosAngle = abs(dot(groundUp, normalize(worldPos - cameraPosition)));

        return screenSizePerspectiveScaleFloat(size, absCosAngle, length(pos), screenSizePerspective);
      }
    `)):i.code.add(s`float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
return size;
}`),r.hasVVSize?(a.add(`sizeFeatureAttribute`,`float`),i.uniforms.add(new c(`vvSizeMinSize`,e=>e.vvSize.minSize),new c(`vvSizeMaxSize`,e=>e.vvSize.maxSize),new c(`vvSizeOffset`,e=>e.vvSize.offset),new c(`vvSizeFactor`,e=>e.vvSize.factor),new c(`vvSizeFallback`,e=>e.vvSize.fallback)),i.code.add(s`
    float getSize(${o(f,`vec3 pos`)}) {
      float size = isnan(sizeFeatureAttribute)
        ? vvSizeFallback.x
        : intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;

      return ${o(f,`applyLineSizeScreenSizePerspective(size, pos)`,`size`)};
    }
    `)):(a.add(`size`,`float`),i.code.add(s`
    float getSize(${o(f,`vec3 pos`)}) {
      float fullSize = intrinsicWidth * size;
      return ${o(f,`applyLineSizeScreenSizePerspective(fullSize, pos)`,`fullSize`)};
    }
    `)),r.hasVVOpacity?(a.add(`opacityFeatureAttribute`,`float`),i.constants.add(`vvOpacityNumber`,`int`,8),i.uniforms.add(new u(`vvOpacityValues`,y,e=>e.vvOpacity.values),new u(`vvOpacityOpacities`,y,e=>e.vvOpacity.opacityValues),new l(`vvOpacityFallback`,e=>e.vvOpacity.fallback,{supportsNaN:!0})),i.code.add(s`
    float interpolateOpacity(float value) {
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

    vec4 applyOpacity(vec4 color) {
      if (isnan(opacityFeatureAttribute)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${o(r.hasVVColor,`color`,`vec4(color.rgb, vvOpacityFallback)`)};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):i.code.add(s`vec4 applyOpacity(vec4 color) {
return color;
}`),r.hasVVColor?(e.include(d,r),a.add(`colorFeatureAttribute`,`float`),i.code.add(s`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(a.add(`color`,`vec4`),i.code.add(s`vec4 getColor() {
return applyOpacity(color);
}`))}var x=e();function S(e){e.vertex.code.add(`#define noPerspectiveWrite(x, w) (x * w)`)}function C(e){e.fragment.code.add(`#define noPerspectiveRead(x) (x * gl_FragCoord.w)`)}var w=.5,T=r(w/2,w/2,1-w/2,1-w/2);function E(e){return e===`cross`||e===`x`}function D(e,t=128,n=t*w,r=0){let{data:i,parameters:a}=O(e,t,n,r);return new v(i,a)}function O(e,t=128,n=t*w,r=0){return{data:k(e,t,n,r),parameters:{mipmap:!1,wrap:{s:33071,t:33071},width:t,height:t,noUnpackFlip:!0,dataType:a.FLOAT,pixelFormat:6403,internalFormat:i.R16F,reloadable:!0}}}function k(e,t=128,n=t*w,r=0){switch(e){case`circle`:default:return A(t,n);case`square`:return j(t,n);case`cross`:return N(t,n,r);case`x`:return P(t,n,r);case`kite`:return M(t,n);case`triangle`:return F(t,n);case`arrow`:return I(t,n)}}function A(e,t){let n=e/2-.5;return V(e,z(n,n,t/2))}function j(e,t){return L(e,t,!1)}function M(e,t){return L(e,t,!0)}function N(e,t,n=0){return R(e,t,!1,n)}function P(e,t,n=0){return R(e,t,!0,n)}function F(e,t){return V(e,B(e/2,t,t/2))}function I(e,t){let n=t,r=t/2,i=e/2,a=.8*n,o=z(i,(e-t)/2-a,Math.sqrt(a*a+r*r)),s=B(i,n,r);return V(e,(e,t)=>Math.max(s(e,t),-o(e,t)))}function L(e,t,n){return n&&(t/=Math.SQRT2),V(e,(r,i)=>{let a=r-.5*e+.25,o=.5*e-i-.75;if(n){let e=(a+o)/Math.SQRT2;o=(o-a)/Math.SQRT2,a=e}return Math.max(Math.abs(a),Math.abs(o))-.5*t})}function R(e,t,n,r=0){t-=r,n&&(t*=Math.SQRT2);let i=.5*t;return V(e,(t,a)=>{let o,s=t-.5*e,c=.5*e-a-1;if(n){let e=(s+c)/Math.SQRT2;c=(c-s)/Math.SQRT2,s=e}return s=Math.abs(s),c=Math.abs(c),o=s>c?s>i?Math.sqrt((s-i)*(s-i)+c*c):c:c>i?Math.sqrt(s*s+(c-i)*(c-i)):s,o-=r/2,o})}function z(e,t,n){return(r,i)=>{let a=r-e,o=i-t;return Math.sqrt(a*a+o*o)-n}}function B(e,t,n){let r=Math.sqrt(t*t+n*n);return(i,a)=>{let o=Math.abs(i-e)-n,s=a-e+t/2+.75,c=(t*o+n*s)/r,l=-s;return Math.max(c,l)}}function V(e,t){let n=new Float32Array(e*e);for(let r=0;r<e;r++)for(let i=0;i<e;i++)n[i+e*r]=t(i,r)/e;return n}function H(e,t){let n=e.vertex,r=t.hasScreenSizePerspective;m(n),n.uniforms.get(`markerScale`)??n.constants.add(`markerScale`,`float`,1),n.constants.add(`markerSizePerLineWidth`,`float`,10).code.add(s`
  float getLineWidth(${o(r,`vec3 pos`)}) {
     return max(getSize(${o(r,`pos`)}), 1.0) * pixelRatio;
  }

  float getScreenMarkerSize(float lineWidth) {
    return markerScale * markerSizePerLineWidth * lineWidth;
  }
  `),t.space===2&&(n.constants.add(`maxSegmentLengthFraction`,`float`,.45),n.uniforms.add(new f(`perRenderPixelRatio`,e=>e.camera.perRenderPixelRatio)),n.code.add(s`
  bool areWorldMarkersHidden(vec3 pos, vec3 other) {
    vec3 midPoint = mix(pos, other, 0.5);
    float distanceToCamera = length(midPoint);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    float worldMarkerSize = getScreenMarkerSize(getLineWidth(${o(r,`pos`)})) * screenToWorldRatio;
    float segmentLen = length(pos - other);
    return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
  }

  float getWorldMarkerSize(vec3 pos) {
    float distanceToCamera = length(pos);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    return getScreenMarkerSize(getLineWidth(${o(r,`pos`)})) * screenToWorldRatio;
  }
  `))}export{T as a,w as c,S as i,D as n,H as o,E as r,b as s,C as t};