import{t as e}from"./mat3f64-H1VyAOlk-bQ0TRl5x.js";import{r as t}from"./vec3f64-CG5ySZkG-Dj7yz7Fz.js";import{n,t as r}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as i}from"./Uniform-Dp2mgLmf-sDlmDzvo.js";import{t as a}from"./NoParameters-DvFAVXX5-CiYgpw4s.js";import{t as o}from"./FloatBindUniform-avAg5yxD-BlJbJU9Q.js";import{t as s}from"./Float2BindUniform-DpaMSVXH-DpUFM4Fg.js";function c(e){e.varyings.add(`linearDepth`,`float`,{invariant:!0})}function l(e,t){t&&c(e),e.vertex.code.add(r`
    void forwardLinearDepth(float _linearDepth) { ${n(t,`linearDepth = _linearDepth;`)} }
  `)}function u({code:e,uniforms:t},n){t.add(new o(`dpDummy`,()=>1)),e.add(r`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 hiD = hiA + hiB;
vec3 loD = loA + loB;
return  dpDummy * hiD + loD;
}`)}var d=class extends i{constructor(e,t,n){super(e,`mat3`,2,(r,i,a)=>r.setUniformMatrix3fv(e,t(i,a),n))}},f=class extends a{constructor(){super(...arguments),this.transformWorldFromViewTH=t(),this.transformWorldFromViewTL=t(),this.transformViewFromCameraRelativeRS=e()}},p=class extends a{constructor(){super(...arguments),this.transformWorldFromModelRS=e(),this.transformWorldFromModelTH=t(),this.transformWorldFromModelTL=t()}};function m(e){e.vertex.uniforms.add(new s(`nearFar`,e=>e.camera.nearFar))}function h(e){e.vertex.code.add(r`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function g(e){h(e),e.vertex.code.add(r`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = calculateLinearDepth(nearFar,eye.z);
return proj * eye;
}`),e.vertex.code.add(r`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}export{m as a,l as i,f as n,p as o,g as r,u as s,d as t};