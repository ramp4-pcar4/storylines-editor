import{n as e}from"./vec4f64-DFGee9an-D35VCg20.js";import{t}from"./ShaderBuilder-aUMFb5cS-QIZt__97.js";import{n,t as r}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as i}from"./Float3PassUniform-BEhcqx4m-lPGwfhIL.js";import{t as a}from"./FloatPassUniform-gHcGW-mi-DcUQ2f5D.js";import{r as o,t as s}from"./AlphaCutoff-lGKpUdxr-Dq_Xw974.js";import{t as c}from"./Float4PassUniform-R_rVPKlL-DaKCoBr0.js";import{t as l}from"./FloatBindUniform-avAg5yxD-BlJbJU9Q.js";import{i as u,n as d,t as f}from"./View.glsl-YsNDLcX0-C6VXtJe6.js";import{t as p}from"./TerrainDepthTest.glsl-DZ7tKbZj-D4tuDHez.js";import{t as m}from"./OutputColorHighlightOLID.glsl-vs7-ar26-D-vHYNKy.js";import{r as h}from"./Transform.glsl-B8LYsJdc-ChhjZx_e.js";function g(e,t){if(!t.screenSizeEnabled)return;let n=e.vertex;f(n,t),n.uniforms.add(new l(`perScreenPixelRatio`,e=>e.camera.perScreenPixelRatio),new a(`screenSizeScale`,e=>e.screenSizeScale)).code.add(r`float computeRenderPixelSizeAt( vec3 pWorld ){
vec3 viewForward = - vec3(view[0][2], view[1][2], view[2][2]);
float viewDirectionDistance = abs(dot(viewForward, pWorld - cameraPosition));
return viewDirectionDistance * perScreenPixelRatio;
}
vec3 screenSizeScaling(vec3 position, vec3 anchor){
return position * screenSizeScale * computeRenderPixelSizeAt(anchor) + anchor;
}`)}function _(e){let a=new t;a.include(h),a.include(g,e),a.fragment.include(s,e),a.include(m,e),a.include(p,e);let{vertex:l,fragment:f}=a;return f.include(o),d(l,e),f.uniforms.add(new c(`uColor`,e=>e.color)),a.attributes.add(`position`,`vec3`),a.varyings.add(`vWorldPosition`,`vec3`),e.screenSizeEnabled&&a.attributes.add(`offset`,`vec3`),e.shadingEnabled&&(u(l),a.attributes.add(`normal`,`vec3`),a.varyings.add(`vViewNormal`,`vec3`),f.uniforms.add(new i(`shadingDirection`,e=>e.shadingDirection)),f.uniforms.add(new c(`shadedColor`,e=>v(e.shadingTint,e.color)))),l.main.add(r`
    vWorldPosition = ${e.screenSizeEnabled?r`screenSizeScaling(offset, position)`:r`position`};
    ${n(e.shadingEnabled,r`vec3 worldNormal = normal;
           vViewNormal = (viewNormal * vec4(worldNormal, 1)).xyz;`)}
    forwardViewPosDepth((view * vec4(vWorldPosition, 1.0)).xyz);
    gl_Position = transformPosition(proj, view, vWorldPosition);
  `),f.main.add(r`
      discardBySlice(vWorldPosition);
      discardByTerrainDepth();
      ${e.shadingEnabled?r`vec3 viewNormalNorm = normalize(vViewNormal);
             float shadingFactor = 1.0 - clamp(-dot(viewNormalNorm, shadingDirection), 0.0, 1.0);
             vec4 finalColor = mix(uColor, shadedColor, shadingFactor);`:r`vec4 finalColor = uColor;`}
      outputColorHighlightOLID(applySlice(finalColor, vWorldPosition), finalColor.rgb);`),a}function v(e,t){let n=1-e[3],r=e[3]+t[3]*n;return r===0?(y[3]=r,y):(y[0]=(e[0]*e[3]+t[0]*t[3]*n)/r,y[1]=(e[1]*e[3]+t[1]*t[3]*n)/r,y[2]=(e[2]*e[3]+t[2]*t[3]*n)/r,y[3]=t[3],y)}var y=e(),b=Object.freeze(Object.defineProperty({__proto__:null,build:_},Symbol.toStringTag,{value:`Module`}));export{b as n,_ as t};