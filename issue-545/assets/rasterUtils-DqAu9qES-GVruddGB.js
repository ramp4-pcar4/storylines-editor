import{s as E}from"./vec2f64-CeODonrJ-CkkJCdRC.js";import{B as C,F as A,M as _,G as T,c as s,U as M}from"./enums-DBi1-Mm2-CUS1pvQe.js";import{H as h,V as O}from"./Texture-BCt2hphT-Bu1bvE3D.js";function w(e,t,n="nearest",i=!1){const r=!(i&&t.pixelType==="u8"),u=r?A.FLOAT:A.UNSIGNED_BYTE,a=t.pixels==null||t.pixels.length===0?null:r?t.getAsRGBAFloat():t.getAsRGBA(),f=e.capabilities.textureFloatLinear,o=new h;return o.width=t.width,o.height=t.height,o.internalFormat=r?C.RGBA32F:M.RGBA,o.samplingMode=!f||n!=="bilinear"&&n!=="cubic"?_.NEAREST:_.LINEAR,o.dataType=u,o.wrapMode=T.CLAMP_TO_EDGE,new O(e,o,a)}function L(e,t){const{spacing:n,offsets:i,coefficients:r,size:[u,a]}=t,f=n[0]>1,o=new h;o.width=f?4*u:u,o.height=a,o.internalFormat=C.RGBA32F,o.dataType=A.FLOAT,o.samplingMode=_.NEAREST,o.wrapMode=T.CLAMP_TO_EDGE;const l=new Float32Array(f?u*a*16:2*i.length);if(f&&r!=null)for(let c=0,m=0;c<r.length;c++)l[m++]=r[c],c%3==2&&(l[m++]=1);else for(let c=0;c<a;c++)for(let m=0;m<u;m++){const g=4*(c*u+m),p=2*(m*a+c);l[g]=i[p],l[g+1]=i[p+1],l[g+3]=i[p]===-1?0:1}return new O(e,o,l)}function x(e,t){const n=new h;return n.internalFormat=M.RGBA,n.width=t.length/4,n.height=1,n.samplingMode=_.NEAREST,n.wrapMode=T.CLAMP_TO_EDGE,new O(e,n,t)}function V(e,t,n,i=1,r=!0){return{u_flipY:r,u_applyTransform:!!e,u_opacity:i,u_transformSpacing:e?e.spacing:E,u_transformGridSize:e?e.size:E,u_targetImageSize:t,u_srcImageSize:n}}function G(e,t){return{u_colormapOffset:t||0,u_colormapMaxIndex:e?e.length/4-1:0}}function k(e,t){return{u_scale:e,u_offset:t}}function N(e){return{u_bandCount:e.bandCount,u_minOutput:e.outMin,u_maxOutput:e.outMax,u_minCutOff:e.minCutOff,u_maxCutOff:e.maxCutOff,u_factor:e.factor,u_useGamma:e.useGamma,u_gamma:e.gamma,u_gammaCorrection:e.gammaCorrection}}function v(e){return{u_hillshadeType:e.hillshadeType,u_sinZcosAs:e.sinZcosAs,u_sinZsinAs:e.sinZsinAs,u_cosZs:e.cosZs,u_weights:e.weights,u_factor:e.factor,u_minValue:e.minValue,u_maxValue:e.maxValue}}function B(e,t){const n=e.gl,i=t.glName,r=new Map;if(i==null)return r;const u=n.getProgramParameter(i,n.ACTIVE_UNIFORMS);let a;for(let f=0;f<u;f++)a=n.getActiveUniform(i,f),a&&r.set(a.name,{location:n.getUniformLocation(i,a.name),info:a});return r}function I(e,t,n){Object.keys(n).forEach(i=>{const r=t.get(i)||t.get(i+"[0]");r&&U(e,i,n[i],r)})}function R(e,t,n,i){n.length===i.length&&(i.some(r=>r==null)||n.some(r=>r==null)||n.forEach((r,u)=>{t.setUniform1i(r,u),e.bindTexture(i[u],u)}))}function U(e,t,n,i){if(i===null||n==null)return!1;const{info:r}=i;switch(r.type){case s.FLOAT:r.size>1?e.setUniform1fv(t,n):e.setUniform1f(t,n);break;case s.FLOAT_VEC2:e.setUniform2fv(t,n);break;case s.FLOAT_VEC3:e.setUniform3fv(t,n);break;case s.FLOAT_VEC4:e.setUniform4fv(t,n);break;case s.FLOAT_MAT3:e.setUniformMatrix3fv(t,n);break;case s.FLOAT_MAT4:e.setUniformMatrix4fv(t,n);break;case s.INT:r.size>1?e.setUniform1iv(t,n):e.setUniform1i(t,n);break;case s.BOOL:e.setUniform1i(t,n?1:0);break;case s.INT_VEC2:case s.BOOL_VEC2:e.setUniform2iv(t,n);break;case s.INT_VEC3:case s.BOOL_VEC3:e.setUniform3iv(t,n);break;case s.INT_VEC4:case s.BOOL_VEC4:e.setUniform4iv(t,n);break;default:return!1}return!0}export{k as F,v as G,w as L,L as M,R as N,x as U,B as V,V as b,I as k,G as w,N as x};
