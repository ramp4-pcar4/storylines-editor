import{p as q}from"./ClassBreaksDefinition-bYRgYgPp-BNedlb99.js";import{a1 as C}from"./main-CJueYQxD.js";const w=()=>C.getLogger("esri.rest.support.generateRendererUtils");function g(n,e){return Number(n.toFixed(e))}function E(n){const{normalizationTotal:e}=n;return{classBreaks:B(n),normalizationTotal:e}}function B(n){const e=n.definition,{classificationMethod:t,normalizationType:l,definedInterval:i}=e,s=e.breakCount??1,r=[];let a=n.values;if(a.length===0)return[];a=a.sort((c,d)=>c-d);const m=a[0],p=a[a.length-1];if(t==="equal-interval")if(a.length>=s){const c=(p-m)/s;let d=m;for(let o=1;o<s;o++){const u=g(m+o*c,6);r.push({minValue:d,maxValue:u,label:V(d,u,l)}),d=u}r.push({minValue:d,maxValue:p,label:V(d,p,l)})}else a.forEach(c=>{r.push({minValue:c,maxValue:c,label:V(c,c,l)})});else if(t==="natural-breaks"){const c=O(a),d=n.valueFrequency||c.valueFrequency,o=U(c.uniqueValues,d,s);let u=m;for(let f=1;f<s;f++)if(c.uniqueValues.length>f){const h=g(c.uniqueValues[o[f]],6);r.push({minValue:u,maxValue:h,label:V(u,h,l)}),u=h}r.push({minValue:u,maxValue:p,label:V(u,p,l)})}else if(t==="quantile")if(a.length>=s&&m!==p){let c=m,d=Math.ceil(a.length/s),o=0;for(let u=1;u<s;u++){let f=d+o-1;f>a.length&&(f=a.length-1),f<0&&(f=0),r.push({minValue:c,maxValue:a[f],label:V(c,a[f],l)}),c=a[f],o+=d,d=Math.ceil((a.length-o)/(s-u))}r.push({minValue:c,maxValue:p,label:V(c,p,l)})}else{let c=-1;for(let d=0;d<a.length;d++){const o=a[d];o!==c&&(c=o,r.push({minValue:c,maxValue:o,label:V(c,o,l)}),c=o)}}else if(t==="standard-deviation"){const c=P(a),d=G(a,c);if(d===0)r.push({minValue:a[0],maxValue:a[0],label:V(a[0],a[0],l)});else{const o=L(m,p,s,c,d)*d;let u=0,f=m;for(let b=s;b>=1;b--){const F=g(c-(b-.5)*o,6);r.push({minValue:f,maxValue:F,label:V(f,F,l)}),f=F,u++}let h=g(c+.5*o,6);r.push({minValue:f,maxValue:h,label:V(f,h,l)}),f=h,u++;for(let b=1;b<=s;b++)h=u===2*s?p:g(c+(b+.5)*o,6),r.push({minValue:f,maxValue:h,label:V(f,h,l)}),f=h,u++}}else if(t==="defined-interval"){if(!i)return r;const c=a[0],d=a[a.length-1],o=Math.ceil((d-c)/i);let u=c;for(let f=1;f<o;f++){const h=g(c+f*i,6);r.push({minValue:u,maxValue:h,label:V(u,h,l)}),u=h}r.push({minValue:u,maxValue:d,label:V(u,d,l)})}return r}function V(n,e,t){let l=null;return l=n===e?t&&t==="percent-of-total"?n+"%":n.toString():t&&t==="percent-of-total"?n+"% - "+e+"%":n+" - "+e,l}function O(n){const e=[],t=[];let l=Number.MIN_VALUE,i=1,s=-1;for(let r=0;r<n.length;r++){const a=n[r];a===l?(i++,t[s]=i):a!==null&&(e.push(a),l=a,i=1,t.push(i),s++)}return{uniqueValues:e,valueFrequency:t}}function U(n,e,t){const l=n.length,i=[];t>l&&(t=l);for(let r=0;r<t;r++)i.push(Math.round(r*l/t-1));i.push(l-1);let s=S(i,n,e,t);return $(s.mean,s.sdcm,i,n,e,t)&&(s=S(i,n,e,t)),i}function S(n,e,t,l){let i=[],s=[],r=[],a=0;const m=[],p=[];for(let u=0;u<l;u++){const f=v(u,n,e,t);m.push(f.sbMean),p.push(f.sbSdcm),a+=p[u]}let c,d=a,o=!0;for(;o||a<d;){o=!1,i=[];for(let u=0;u<l;u++)i.push(n[u]);for(let u=0;u<l;u++)for(let f=n[u]+1;f<=n[u+1];f++)if(c=e[f],u>0&&f!==n[u+1]&&Math.abs(c-m[u])>Math.abs(c-m[u-1]))n[u]=f;else if(u<l-1&&n[u]!==f-1&&Math.abs(c-m[u])>Math.abs(c-m[u+1])){n[u+1]=f-1;break}d=a,a=0,s=[],r=[];for(let u=0;u<l;u++){s.push(m[u]),r.push(p[u]);const f=v(u,n,e,t);m[u]=f.sbMean,p[u]=f.sbSdcm,a+=p[u]}}if(a>d){for(let u=0;u<l;u++)n[u]=i[u],m[u]=s[u],p[u]=r[u];a=d}return{mean:m,sdcm:p}}function $(n,e,t,l,i,s){let r=0,a=0,m=0,p=0,c=!0;for(let d=0;d<2&&c;d++){d===0&&(c=!1);for(let o=0;o<s-1;o++)for(;t[o+1]+1!==t[o+2];){t[o+1]=t[o+1]+1;const u=v(o,t,l,i);m=u.sbMean,r=u.sbSdcm;const f=v(o+1,t,l,i);if(p=f.sbMean,a=f.sbSdcm,!(r+a<e[o]+e[o+1])){t[o+1]=t[o+1]-1;break}e[o]=r,e[o+1]=a,n[o]=m,n[o+1]=p,c=!0}for(let o=s-1;o>0;o--)for(;t[o]!==t[o-1]+1;){t[o]=t[o]-1;const u=v(o-1,t,l,i);m=u.sbMean,r=u.sbSdcm;const f=v(o,t,l,i);if(p=f.sbMean,a=f.sbSdcm,!(r+a<e[o-1]+e[o])){t[o]=t[o]+1;break}e[o-1]=r,e[o]=a,n[o-1]=m,n[o]=p,c=!0}}return c}function L(n,e,t,l,i){let s=Math.max(l-n,e-l)/i/t;return s=s>=1?1:s>=.5?.5:.25,s}function P(n){let e=0;for(let t=0;t<n.length;t++)e+=n[t];return e/=n.length,e}function G(n,e){let t=0;for(let l=0;l<n.length;l++){const i=n[l];t+=(i-e)*(i-e)}return t/=n.length,Math.sqrt(t)}function v(n,e,t,l){let i=0,s=0;for(let m=e[n]+1;m<=e[n+1];m++){const p=l[m];i+=t[m]*p,s+=p}s<=0&&w().warn("Exception in Natural Breaks calculation");const r=i/s;let a=0;for(let m=e[n]+1;m<=e[n+1];m++)a+=l[m]*(t[m]-r)**2;return{sbMean:r,sbSdcm:a}}const A="<Null>",_="equal-interval",Y=1,Q=5,R=10,j=/\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*/gi,H=new Set(["esriFieldTypeDate","esriFieldTypeInteger","esriFieldTypeSmallInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeLong","esriFieldTypeOID","esriFieldTypeBigInteger"]),J=new Set(["esriFieldTypeTimeOnly","esriFieldTypeDateOnly"]),K=["min","max","avg","stddev","count","sum","variance","nullcount","median"];function x(n){return n==null||typeof n=="string"&&!n?A:n}function W(n){const e=n.normalizationField!=null||n.normalizationType!=null,t=n.minValue!=null||n.maxValue!=null,l=!!n.sqlExpression&&n.supportsSQLExpression;return!e&&!t&&!l}function Vn(n){const{outStatisticTypes:e}=n,t=n.returnDistinct?[...new Set(n.values)]:n.values,l=t.filter(r=>r!=null).sort(),i=l.length,s={count:i,min:l[0],max:l[i-1]};return n.supportsNullCount&&(s.nullcount=t.length-i),!n.percentileParams||e?.include?.length&&!e.include.includes("median")||e?.exclude?.length&&e.exclude.includes("median")||(s.median=N(t,n.percentileParams)),s}function X(n){const{values:e,useSampleStdDev:t,supportsNullCount:l,outStatisticTypes:i}=n;let s=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,a=null,m=null,p=null,c=null,d=0;const o=n.minValue==null?-1/0:n.minValue,u=n.maxValue==null?1/0:n.maxValue;for(const h of e)Number.isFinite(h)?h>=o&&h<=u&&(a=a===null?h:a+h,s=Math.min(s,h),r=Math.max(r,h),d++):typeof h=="string"&&d++;if(d&&a!=null){m=a/d;let h=0;for(const b of e)Number.isFinite(b)&&b>=o&&b<=u&&(h+=(b-m)**2);c=t?d>1?h/(d-1):0:d>0?h/d:0,p=Math.sqrt(c)}else s=null,r=null;const f={avg:m,count:d,max:r,min:s,stddev:p,sum:a,variance:c};return l&&(f.nullcount=e.length-d),!n.percentileParams||i?.include?.length&&!i.include.includes("median")||i?.exclude?.length&&i.exclude.includes("median")||(f.median=N(e,n.percentileParams)),f}function N(n,e){const{fieldType:t,value:l,orderBy:i,isDiscrete:s}=e,r=Z(t,i==="desc");if((n=[...n].filter(u=>u!=null).sort((u,f)=>r(u,f))).length===0)return null;if(l<=0)return n[0];if(l>=1)return n[n.length-1];const a=(n.length-1)*l,m=Math.floor(a),p=m+1,c=a%1,d=n[m],o=n[p];return p>=n.length||s||typeof d=="string"||typeof o=="string"?d:d*(1-c)+o*c}function Z(n,e){if(n){if(H.has(n))return I(e);if(J.has(n))return M(e,!1);if(n==="esriFieldTypeTimestampOffset")return tn(e);const r=M(e,!0);if(n==="esriFieldTypeString")return r;if(n==="esriFieldTypeGUID"||n==="esriFieldTypeGlobalID")return(a,m)=>r(D(a),D(m))}const t=e?1:-1,l=I(e),i=M(e,!0),s=k(e);return(r,a)=>typeof r=="number"&&typeof a=="number"?l(r,a):typeof r=="string"&&typeof a=="string"?i(r,a):s(r,a)??t}const T=(n,e)=>n==null?e==null?0:1:e==null?-1:null,y=(n,e)=>n==null?e==null?0:-1:e==null?1:null;function k(n){return n?T:y}const nn=(n,e)=>y(n,e)??(n===e?0:new Date(n).getTime()-new Date(e).getTime()),en=(n,e)=>T(n,e)??(n===e?0:new Date(e).getTime()-new Date(n).getTime());function tn(n){return n?en:nn}const ln=(n,e)=>y(n,e)??(n===e?0:n<e?-1:1),an=(n,e)=>T(n,e)??(n===e?0:n<e?1:-1);function M(n,e){if(!e)return n?an:ln;const t=k(n);return n?(l,i)=>t(l,i)??((l=l.toUpperCase())>(i=i.toUpperCase())?-1:l<i?1:0):(l,i)=>t(l,i)??((l=l.toUpperCase())<(i=i.toUpperCase())?-1:l>i?1:0)}const un=(n,e)=>T(n,e)??e-n,on=(n,e)=>y(n,e)??n-e;function I(n){return n?un:on}function D(n){return n.slice(24,36)+n.slice(19,23)+n.slice(16,18)+n.slice(14,16)+n.slice(11,13)+n.slice(9,11)+n.slice(6,8)+n.slice(4,6)+n.slice(2,4)+n.slice(0,2)}function bn(n,e,t){let l;for(l in n)e?.include?.length&&!e.include.includes(l)||e?.exclude?.length&&e.exclude.includes(l)?delete n[l]:K.includes(l)&&(Number.isFinite(n[l])||(n[l]=null));return t&&["avg","stddev","variance"].forEach(i=>{n[i]!=null&&(n[i]=Math.ceil(n[i]??0))}),n}function gn(n){const e={};for(let t of n)(t==null||typeof t=="string"&&t.trim()==="")&&(t=null),e[t]==null?e[t]={count:1,data:t}:e[t].count++;return{count:e}}function z(n){return n?.type!=="coded-value"?[]:n.codedValues.map(e=>e.code)}function vn(n,e,t,l){const i=n.count,s=[];if(t&&e){const r=[],a=z(e[0]);for(const m of a)if(e[1]){const p=z(e[1]);for(const c of p)if(e[2]){const d=z(e[2]);for(const o of d)r.push(`${x(m)}${l}${x(c)}${l}${x(o)}`)}else r.push(`${x(m)}${l}${x(c)}`)}else r.push(m);for(const m of r)i.hasOwnProperty(m)||(i[m]={data:m,count:0})}for(const r in i){const a=i[r];s.push({value:a.data,count:a.count,label:a.label})}return{uniqueValueInfos:s}}function xn(n,e,t,l){let i=null;switch(e){case"log":n!==0&&(i=Math.log(n)*Math.LOG10E);break;case"percent-of-total":Number.isFinite(l)&&l!==0&&(i=n/l*100);break;case"field":Number.isFinite(t)&&t!==0&&(i=n/t);break;case"natural-log":n>0&&(i=Math.log(n));break;case"square-root":n>0&&(i=n**.5)}return i}function rn(n,e){const t=cn({field:e.field,normalizationType:e.normalizationType,normalizationField:e.normalizationField,classificationMethod:e.classificationMethod,standardDeviationInterval:e.standardDeviationInterval,breakCount:e.numClasses||Q});return n=sn(n,e.minValue,e.maxValue),E({definition:t,values:n,normalizationTotal:e.normalizationTotal})}function sn(n,e,t){const l=e??-1/0,i=t??1/0;return n.filter(s=>Number.isFinite(s)&&s>=l&&s<=i)}function cn(n){const{breakCount:e,field:t,normalizationField:l,normalizationType:i}=n,s=n.classificationMethod||_,r=s==="standard-deviation"?n.standardDeviationInterval||Y:void 0,a=s==="defined-interval"?n.definedInterval:void 0;return new q({breakCount:e,classificationField:t,classificationMethod:s,normalizationField:i==="field"?l:void 0,normalizationType:i,standardDeviationInterval:r,definedInterval:a})}function Tn(n,e){let t=n.classBreaks;const l=t.length,i=t[0]?.minValue,s=t[l-1]?.maxValue,r=e==="standard-deviation",a=j;return t=t.map(m=>{const p=m.label,c={minValue:m.minValue,maxValue:m.maxValue,label:p};if(r&&p){const d=p.match(a),o=d?.map(u=>+u.trim())??[];o.length===2?(c.minStdDev=o[0],c.maxStdDev=o[1],o[0]<0&&o[1]>0&&(c.hasAvg=!0)):o.length===1&&(p.includes("<")?(c.minStdDev=null,c.maxStdDev=o[0]):p.includes(">")&&(c.minStdDev=o[0],c.maxStdDev=null))}return c}),{minValue:i,maxValue:s,classBreakInfos:t,normalizationTotal:n.normalizationTotal}}function yn(n,e){const t=mn(n,e);if(t.min==null&&t.max==null)return{bins:[],minValue:t.min,maxValue:t.max,normalizationTotal:e.normalizationTotal};const l=t.intervals,i=t.min??0,s=t.max??0,r=l.map((a,m)=>({minValue:l[m][0],maxValue:l[m][1],count:0}));for(const a of n)if(a!=null&&a>=i&&a<=s){const m=fn(l,a);m>-1&&r[m].count++}return{bins:r,minValue:i,maxValue:s,normalizationTotal:e.normalizationTotal}}function mn(n,e){const{field:t,classificationMethod:l,standardDeviationInterval:i,normalizationType:s,normalizationField:r,normalizationTotal:a,minValue:m,maxValue:p}=e,c=e.numBins||R;let d=null,o=null,u=null;if((!l||l==="equal-interval")&&!s){if(m!=null&&p!=null)d=m,o=p;else{const f=X({values:n,minValue:m,maxValue:p,useSampleStdDev:!s,supportsNullCount:W({normalizationType:s,normalizationField:r,minValue:m,maxValue:p})});d=f.min??null,o=f.max??null}u=dn(d??0,o??0,c)}else{const{classBreaks:f}=rn(n,{field:t,normalizationType:s,normalizationField:r,normalizationTotal:a,classificationMethod:l,standardDeviationInterval:i,minValue:m,maxValue:p,numClasses:c});d=f[0].minValue,o=f[f.length-1].maxValue,u=f.map(h=>[h.minValue,h.maxValue])}return{min:d,max:o,intervals:u}}function fn(n,e){let t=-1;for(let l=n.length-1;l>=0;l--)if(e>=n[l][0]){t=l;break}return t}function dn(n,e,t){const l=(e-n)/t,i=[];let s,r=n;for(let a=1;a<=t;a++)s=r+l,s=Number(s.toFixed(16)),i.push([r,a===t?e:s]),r=s;return i}export{W as D,rn as E,N as M,X as N,yn as V,gn as c,xn as f,Tn as h,Z as k,Vn as l,vn as m,bn as s,x};
