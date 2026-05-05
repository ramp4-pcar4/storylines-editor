import{S as e}from"./vec2-BNGcJ5FZ-DcnE9Iss.js";import{n as t}from"./vec2f64-D8dbcrKD-CDxkoLcj.js";import{t as n}from"./ShaderBuilder-aUMFb5cS-QIZt__97.js";import{t as r}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as i}from"./Gamma.glsl-3nSDeBy7-CPfFsjWI.js";import{t as a}from"./FloatPassUniform-gHcGW-mi-DcUQ2f5D.js";import{t as o}from"./Texture2DPassUniform-RVTT2Sjh-CghdmKcr.js";import{t as s}from"./FloatBindUniform-avAg5yxD-BlJbJU9Q.js";import{t as c}from"./Float2BindUniform-DpaMSVXH-DpUFM4Fg.js";import{t as l}from"./ReadDepth.glsl-DNR_DJR2-TOafqjrr.js";import{t as u}from"./ScreenSpacePass.glsl-EDYRj6we-B7ahdqzD.js";import{t as d}from"./CameraSpace.glsl-DhKWVhj4-D_yg_UDb.js";import{t as f}from"./Float2PassUniform-oNPLRE_S-DRiZTdeh.js";var p=16;function m(){let t=new n,m=t.fragment;return t.include(u),t.include(d),m.include(l),m.include(i),m.uniforms.add(new s(`radius`,e=>h(e.camera))).code.add(r`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),m.code.add(r`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),t.outputs.add(`fragOcclusion`,`float`),m.uniforms.add(new o(`normalMap`,e=>e.normalTexture),new o(`depthMap`,e=>e.depthTexture),new a(`projScale`,e=>e.projScale),new o(`rnm`,e=>e.noiseTexture),new f(`rnmScale`,(t,n)=>e(g,n.camera.fullWidth/t.noiseTexture.descriptor.width,n.camera.fullHeight/t.noiseTexture.descriptor.height)),new a(`intensity`,e=>e.intensity),new c(`screenSize`,t=>e(g,t.camera.fullWidth,t.camera.fullHeight))).main.add(r`
    float depth = depthFromTexture(depthMap, uv);

    // Early out if depth is out of range, such as in the sky
    if (depth >= 1.0 || depth <= 0.0) {
      fragOcclusion = 1.0;
      return;
    }

    // get the normal of current fragment
    ivec2 iuv = ivec2(uv * vec2(textureSize(normalMap, 0)));
    vec4 norm4 = texelFetch(normalMap, iuv, 0);
    if(norm4.a != 1.0) {
      fragOcclusion = 1.0;
      return;
    }
    vec3 norm = normalize(norm4.xyz * 2.0 - 1.0);

    float currentPixelDepth = linearizeDepth(depth);
    vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

    float sum = 0.0;
    vec3 tapPixelPos;

    vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

    // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
    // bug or deviation from CE somewhere else?
    float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

    for(int i = 0; i < ${r.int(p)}; ++i) {
      vec2 unitOffset = reflect(sphere[i], fres).xy;
      vec2 offset = vec2(-unitOffset * radius * ps);

      // don't use current or very nearby samples
      if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
        continue;
      }

      vec2 tc = vec2(gl_FragCoord.xy + offset);
      if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
      vec2 tcTap = tc / screenSize;
      float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap);

      tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

      sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
    }

    // output the result
    float A = max(1.0 - sum * intensity / float(${r.int(p)}), 0.0);

    // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
    A = (pow(A, 0.2) + 1.2 * pow(A, 4.0)) * INV_GAMMA;

    fragOcclusion = A;
  `),t}function h(e){return Math.max(10,20*e.computeScreenPixelSizeAtDist(Math.abs(4*e.relativeElevation)))}var g=t(),_=Object.freeze(Object.defineProperty({__proto__:null,build:m,getRadius:h},Symbol.toStringTag,{value:`Module`}));export{h as n,m as r,_ as t};