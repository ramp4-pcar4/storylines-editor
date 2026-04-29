import{y as e}from"./mathUtils-DUZju9LU-Cenp4rzR.js";import{S as t}from"./vec2-BNGcJ5FZ-DcnE9Iss.js";import{r as n}from"./vec3f64-CG5ySZkG-Dj7yz7Fz.js";import{A as r,C as i,D as a,f as o,k as s,n as c,s as l,y as u}from"./vec3-D0JSMCWt-DxhzA4EA.js";import{r as d}from"./vec4-DtLpLkJR-NX0lHSHq.js";import{n as f}from"./vec2f64-D8dbcrKD-CDxkoLcj.js";import{n as p}from"./vec4f64-DFGee9an-D35VCg20.js";import{C as m,n as h}from"./plane-Bmb6IkzK-TUihpGXM.js";import{d as g}from"./lineSegment-7kalB-6z-BKf0TwHl.js";import{t as _}from"./ShaderBuilder-aUMFb5cS-QIZt__97.js";import{t as v}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as y}from"./Float3PassUniform-BEhcqx4m-lPGwfhIL.js";import{t as b}from"./FloatPassUniform-gHcGW-mi-DcUQ2f5D.js";import{t as x}from"./Float4PassUniform-R_rVPKlL-DaKCoBr0.js";import{t as S}from"./Float3BindUniform-Cmo9nXvW-D9TopQkY.js";import{t as C}from"./FloatBindUniform-avAg5yxD-BlJbJU9Q.js";import{t as w}from"./ScreenSpacePass.glsl-EDYRj6we-B7ahdqzD.js";import{t as T}from"./Float2PassUniform-oNPLRE_S-DRiZTdeh.js";import{t as E}from"./Laserline.glsl-DJ6uX_Kq-Dt2B40Ny.js";var D=e(6);function O(e){let t=new _;t.include(w),t.include(E,e);let n=t.fragment;if(e.lineVerticalPlaneEnabled||e.heightManifoldEnabled)if(n.uniforms.add(new b(`maxPixelDistance`,(t,n)=>e.heightManifoldEnabled?2*n.camera.computeScreenPixelSizeAt(t.heightManifoldTarget):2*n.camera.computeScreenPixelSizeAt(t.lineVerticalPlaneSegment.origin))),n.code.add(v`float planeDistancePixels(vec4 plane, vec3 pos) {
float dist = dot(plane.xyz, pos) + plane.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`),e.spherical){let e=(e,t,n)=>l(e,t.heightManifoldTarget,n.camera.viewMatrix),t=(e,t)=>l(e,[0,0,0],t.camera.viewMatrix);n.uniforms.add(new x(`heightManifoldOrigin`,(n,i)=>(e(I,n,i),t(z,i),r(z,z,I),o(L,z),L[3]=s(z),L)),new S(`globalOrigin`,e=>t(I,e)),new b(`cosSphericalAngleThreshold`,(e,t)=>1-Math.max(2,u(t.camera.eye,e.heightManifoldTarget)*t.camera.perRenderPixelRatio)/s(e.heightManifoldTarget))),n.code.add(v`float globeDistancePixels(float posInGlobalOriginLength) {
float dist = abs(posInGlobalOriginLength - heightManifoldOrigin.w);
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}
float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
vec3 posInGlobalOriginNorm = normalize(globalOrigin - pos);
float cosAngle = dot(posInGlobalOriginNorm, heightManifoldOrigin.xyz);
vec3 posInGlobalOrigin = globalOrigin - pos;
float posInGlobalOriginLength = length(posInGlobalOrigin);
float sphericalDistance = globeDistancePixels(posInGlobalOriginLength);
float planarDistance = planeDistancePixels(heightPlane, pos);
return cosAngle < cosSphericalAngleThreshold ? sphericalDistance : planarDistance;
}`)}else n.code.add(v`float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
return planeDistancePixels(heightPlane, pos);
}`);if(e.pointDistanceEnabled&&(n.uniforms.add(new b(`maxPixelDistance`,(e,t)=>2*t.camera.computeScreenPixelSizeAt(e.pointDistanceTarget))),n.code.add(v`float sphereDistancePixels(vec4 sphere, vec3 pos) {
float dist = distance(sphere.xyz, pos) - sphere.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`)),e.intersectsLineEnabled&&n.uniforms.add(new C(`perScreenPixelRatio`,e=>e.camera.perScreenPixelRatio)).code.add(v`float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {
float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);
return abs(dist) - radius;
}`),(e.lineVerticalPlaneEnabled||e.intersectsLineEnabled)&&n.code.add(v`bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {
vec3 dir = end - start;
float t2 = dot(dir, pos - start);
float l2 = dot(dir, dir);
return t2 >= 0.0 && t2 <= l2;
}`),n.main.add(v`vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
fragColor = vec4(0.0);
return;
}
vec4 color = vec4(0.0);`),e.heightManifoldEnabled){n.uniforms.add(new T(`angleCutoff`,e=>k(e)),new x(`heightPlane`,(e,t)=>P(e.heightManifoldTarget,e.renderCoordsHelper.worldUpAtPosition(e.heightManifoldTarget,I),t.camera.viewMatrix)));let t=e.spherical?v`normalize(globalOrigin - pos)`:v`heightPlane.xyz`;n.main.add(v`
      vec2 angleCutoffAdjusted = angleCutoff - angleCutoffAdjust;
      // Fade out laserlines on flat surfaces
      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoffAdjusted.x, angleCutoffAdjusted.y, abs(dot(normal, ${t})));
      vec4 heightManifoldColor = laserlineProfile(heightManifoldDistancePixels(heightPlane, pos));
      color = max(color, heightManifoldColor * heightManifoldAlpha);`)}return e.pointDistanceEnabled&&(n.uniforms.add(new T(`angleCutoff`,e=>k(e)),new x(`pointDistanceSphere`,(e,t)=>A(e,t))),n.main.add(v`float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);
vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);
float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));
color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);`)),e.lineVerticalPlaneEnabled&&(n.uniforms.add(new T(`angleCutoff`,e=>k(e)),new x(`lineVerticalPlane`,(e,t)=>j(e,t)),new y(`lineVerticalStart`,(e,t)=>M(e,t)),new y(`lineVerticalEnd`,(e,t)=>N(e,t))),n.main.add(v`if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {
float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);
vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);
float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));
color = max(color, lineVerticalColor * lineVerticalAlpha);
}`)),e.intersectsLineEnabled&&(n.uniforms.add(new T(`angleCutoff`,e=>k(e)),new y(`intersectsLineStart`,(e,t)=>l(I,e.lineStartWorld,t.camera.viewMatrix)),new y(`intersectsLineEnd`,(e,t)=>l(I,e.lineEndWorld,t.camera.viewMatrix)),new y(`intersectsLineDirection`,(e,t)=>(i(L,e.intersectsLineSegment.vector),L[3]=0,o(I,d(L,L,t.camera.viewMatrix)))),new b(`intersectsLineRadius`,e=>e.intersectsLineRadius)),n.main.add(v`if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {
float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);
vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);
float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));
color = max(color, intersectsLineColor * intersectsLineAlpha);
}`)),n.main.add(v`fragColor = laserlineOutput(color * depthDiscontinuityAlpha);`),t}function k(n){return t(F,Math.cos(n.angleCutoff),Math.cos(Math.max(0,n.angleCutoff-e(2))))}function A(e,t){return l(H,e.pointDistanceOrigin,t.camera.viewMatrix),H[3]=u(e.pointDistanceOrigin,e.pointDistanceTarget),H}function j(e,t){let n=g(e.lineVerticalPlaneSegment,.5,I),r=c(I,e.renderCoordsHelper.worldUpAtPosition(n,R),o(z,e.lineVerticalPlaneSegment.vector));return o(r,r),P(e.lineVerticalPlaneSegment.origin,r,t.camera.viewMatrix)}function M(e,t){let n=i(I,e.lineVerticalPlaneSegment.origin);return e.renderCoordsHelper.setAltitude(n,0),l(n,n,t.camera.viewMatrix)}function N(e,t){let n=a(I,e.lineVerticalPlaneSegment.origin,e.lineVerticalPlaneSegment.vector);return e.renderCoordsHelper.setAltitude(n,0),l(n,n,t.camera.viewMatrix)}function P(e,t,n){return l(B,e,n),i(L,t),L[3]=0,d(L,L,n),h(B,L,V)}var F=f(),I=n(),L=p(),R=n(),z=n(),B=n(),V=m(),H=p(),U=Object.freeze(Object.defineProperty({__proto__:null,build:O,defaultAngleCutoff:D},Symbol.toStringTag,{value:`Module`}));export{O as n,U as r,D as t};