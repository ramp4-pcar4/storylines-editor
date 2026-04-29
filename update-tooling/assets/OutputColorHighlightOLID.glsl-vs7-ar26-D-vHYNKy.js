import{n as e,t}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{c as n,f as r}from"./Emissions.glsl-C1fRgyHC-BKFlnvac.js";import{a as i,n as a,r as o}from"./AlphaCutoff-lGKpUdxr-Dq_Xw974.js";function s(s,c){s.include(i,c),s.include(r,c),s.fragment.include(o);let{output:l,oitPass:u,hasEmission:d,discardInvisibleFragments:f,oitPremultipliedAlpha:p,snowCover:m}=c,h=l===9,g=n(l)&&u===1,_=n(l)&&u===2,v=n(l)&&u!==1,y=0;(v||g)&&s.outputs.add(`fragColor`,`vec4`,y++),d&&s.outputs.add(`fragEmission`,`vec4`,y++),g&&s.outputs.add(`fragAlpha`,`float`,y++),s.fragment.code.add(t`
    void outputColorHighlightOLID(vec4 finalColor, vec3 emissiveSymbolColor ${e(m,`, float snow`)}) {
      ${e(h,`finalColor.a = 1.0;`)}
      ${e(f,`if (finalColor.a < ${t.float(a)}) { discard; }`)}

      ${e(g,`${e(p,`fragColor = finalColor;`,`fragColor = premultiplyAlpha(finalColor);`)}\n           fragAlpha = finalColor.a;`)}
      ${e(_&&p&&f,`finalColor.rgb /= finalColor.a;`)}
      ${e(v,`fragColor = finalColor;`)}
      ${e(d,`fragEmission = ${e(m,`mix(finalColor.a * getEmissions(emissiveSymbolColor), vec4(0.0), snow);`,`finalColor.a * getEmissions(emissiveSymbolColor);`)}`)}
      calculateOcclusionAndOutputHighlight();
      ${e(h,`outputObjectAndLayerIdColor();`)}
    }
  `)}export{s as t};