import{n as e,t}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as n}from"./Texture2DBindUniform-BjIiNL3v-DEktPz6m.js";import{t as r}from"./ReadDepth.glsl-DNR_DJR2-TOafqjrr.js";function i(i,{occlusionPass:a,terrainDepthTest:o,cullAboveTerrain:s}){let{vertex:c,fragment:l,varyings:u}=i;if(!o)return c.code.add(`void forwardViewPosDepth(vec3 pos) {}`),void l.code.add(`${a?`bool`:`void`} discardByTerrainDepth() { ${e(a,`return false;`)}}`);u.add(`viewPosDepth`,`float`,{invariant:!0}),c.code.add(`void forwardViewPosDepth(vec3 pos) {
    viewPosDepth = pos.z;
  }`),l.include(r),l.uniforms.add(new n(`terrainDepthTexture`,e=>e.terrainDepth?.attachment)).code.add(t`
    ${a?`bool`:`void`} discardByTerrainDepth() {
      float depth = texelFetch(terrainDepthTexture, ivec2(gl_FragCoord.xy), 0).r;
      float linearDepth = linearizeDepth(depth);
      ${a?`return viewPosDepth < linearDepth && depth < 1.0;`:`if(viewPosDepth ${s?`>`:`<=`} linearDepth) discard;`}
    }`)}export{i as t};