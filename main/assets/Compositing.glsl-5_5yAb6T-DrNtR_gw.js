import{t as e}from"./ShaderBuilder-aUMFb5cS-QIZt__97.js";import{n as t,t as n}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as r}from"./FloatPassUniform-gHcGW-mi-DcUQ2f5D.js";import{t as i}from"./Texture2DPassUniform-RVTT2Sjh-CghdmKcr.js";import{t as a}from"./NoParameters-DvFAVXX5-CiYgpw4s.js";import{t as o}from"./Float2BindUniform-DpaMSVXH-DpUFM4Fg.js";import{t as s}from"./ReadDepth.glsl-DNR_DJR2-TOafqjrr.js";import{t as c}from"./ScreenSpacePass.glsl-EDYRj6we-B7ahdqzD.js";function l(e){e.code.add(n`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 floatToRgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}`),e.code.add(n`const vec4 RGBA_TO_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgbaToFloat(vec4 rgba) {
return dot(rgba, RGBA_TO_FLOAT_FACTORS);
}`)}var u=class extends a{constructor(){super(...arguments),this.opacity=1}};function d(a){let u=new e,{blendEmissive:d,blitMode:f,hasOpacityFactor:p}=a;u.include(c),u.fragment.uniforms.add(new i(`tex`,e=>e.texture)),p&&u.fragment.uniforms.add(new r(`opacity`,e=>e.opacity));let m=f===3;return m&&(u.fragment.uniforms.add(new o(`nearFar`,e=>e.camera.nearFar)),u.fragment.include(s),u.fragment.include(l)),d&&(u.outputs.add(`fragColor`,`vec4`,0),u.outputs.add(`fragEmission`,`vec4`,1)),u.fragment.main.add(n`
    ${m?n`
          float normalizedLinearDepth = (-linearDepthFromTexture(tex, uv) - nearFar[0]) / (nearFar[1] - nearFar[0]);
          fragColor = floatToRgba(normalizedLinearDepth);`:n`
          fragColor = texture(tex, uv) ${p?`* opacity`:``};`}
    ${t(d,`fragEmission = vec4(0.0, 0.0, 0.0, fragColor.a);`)}`),u}var f=Object.freeze(Object.defineProperty({__proto__:null,CompositingPassParameters:u,build:d},Symbol.toStringTag,{value:`Module`}));export{f as n,u as r,d as t};