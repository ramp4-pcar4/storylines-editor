import{gL as G,aG as z,w as A,c_ as J,ex as L,J as O,f4 as P}from"./main-gpNb-fIA.js";import{h as C}from"./TimeExtent-Cn0Jofqr-DB46E7PV.js";import{k as V}from"./quantizationUtils-bJy1cRwp-C9BOenHK.js";import{A as _,M as D}from"./heatmapUtils-seiMkkkR-CQRnB0IM.js";import{b as R}from"./utils-DyydRFHu-D4V4VDXx.js";import{x as T,f as S}from"./utils-tNxq3jkf-DteIK76-.js";let f=null;const U=/^(?<hh>([0-1][0-9])|([2][0-3])):(?<mm>[0-5][0-9])(:(?<ss>[0-5][0-9]))?([.](?<ms>\d+))?$/;function Y(t,e,a){return t.x<0?t.x+=e:t.x>a&&(t.x-=e),t}function B(t,e,a,r){const o=G(a)?z(a):null,m=o?Math.round((o.valid[1]-o.valid[0])/e.scale[0]):null;return t.map(i=>{const s=new A(i.geometry);return V(e,s,s),i.geometry=o?Y(s,m??0,r[0]):s,i})}function H(t,e=18,a,r,o){const m=new Float64Array(r*o);e=Math.round(P(e));let i=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY;const N=D(a);for(const{geometry:p,attributes:g}of t){const{x:w,y:u}=p,I=Math.max(0,w-e),$=Math.max(0,u-e),F=Math.min(o,u+e),M=Math.min(r,w+e),h=+N(g);for(let c=$;c<F;c++)for(let d=I;d<M;d++){const y=c*r+d,b=_(d-w,c-u,e)*h,l=m[y]+=b;i=Math.min(i,l),s=Math.max(s,l)}}return{min:i,max:s}}function Z(t){const e=U.exec(t);if(!e)return null;const{hh:a,mm:r,ss:o,ms:m}=e.groups;return Number(a)*C.hours+Number(r)*C.minutes+Number(o)*C.seconds+Number(m||0)}async function K(t,e,a=!0){if(!e)return[];const{field:r,field2:o,field3:m,fieldDelimiter:i,fieldInfos:s,timeZone:N}=t,p=r&&s?.find(l=>l.name.toLowerCase()===r.toLowerCase()),g=!!p&&J(p),w=!!p&&R(p),u=t.valueExpression,I=t.normalizationType,$=t.normalizationField,F=t.normalizationTotal,M=[],h=t.viewInfoParams;let c=null,d=null;if(u){if(!f){const{arcadeUtils:l}=await L();f=l}f.hasGeometryOperations(u)&&await f.enableGeometryOperations(),c=f.createFunction(u),d=h?f.getViewInfo({viewingMode:h.viewingMode,scale:h.scale,spatialReference:new O(h.spatialReference)}):null}const y=t.fieldInfos,b=!(e[0]&&"declaredClass"in e[0]&&e[0].declaredClass==="esri.Graphic")&&y?{fields:y}:null;return e.forEach(l=>{const x=l.attributes;let n;if(u){const v=b?{...l,layer:b}:l,E=f.createExecContext(v,d,N);n=f.executeFunction(c,E)}else x&&(n=x[r],o?(n=`${T(n)}${i}${T(x[o])}`,m&&(n=`${n}${i}${T(x[m])}`)):typeof n=="string"&&a&&(w?n=n?new Date(n).getTime():null:g&&(n=n?Z(n):null)));if(I&&typeof n=="number"&&isFinite(n)){const v=x&&parseFloat(x[$]);n=S(n,I,v,F)}M.push(n)}),M}export{Z as C,B as Q,H as W,K as X};
