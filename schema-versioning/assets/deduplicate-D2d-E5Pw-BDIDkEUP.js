import{hb as v}from"./main-BeHOkNcW.js";import{h as z,w as O}from"./Indices-DEr2HrWx-BiKa1p_i.js";function B(o,n,c){const r=Array.isArray(o),e=r?o.length/n:o.byteLength/(4*n),y=r?o:new Uint32Array(o,0,e*n),A=c?.minReduction??0,s=c?.originalIndices||null,q=s?s.length:0,f=c?.componentOffsets||null;let b=0;if(f)for(let t=0;t<f.length-1;t++){const u=f[t+1]-f[t];u>b&&(b=u)}else b=e;const w=Math.floor(1.1*b)+1;(a==null||a.length<2*w)&&(a=new Uint32Array(v(2*w)));for(let t=0;t<2*w;t++)a[t]=0;let i=0;const m=!!f&&!!s,U=m?q:e;let h=z(e);const p=new Uint32Array(q),$=1.96;let C=A!==0?Math.ceil(4*$*$/(A*A)*A*(1-A)):U,d=1,I=f?f[1]:U;for(let t=0;t<U;t++){if(t===C){const l=1-i/t;if(l+$*Math.sqrt(l*(1-l)/t)<A)return null;C*=2}if(t===I){for(let l=0;l<2*w;l++)a[l]=0;if(s)for(let l=f[d-1];l<f[d];l++)p[l]=h[s[l]];I=f[++d]}const u=m?s[t]:t,L=u*n,k=K(y,L,n);let g=k%w,x=i;for(;a[2*g+1]!==0;){if(a[2*g]===k){const l=a[2*g+1]-1;if(E(y,L,l*n,n)){x=h[l];break}}g++,g>=w&&(g-=w)}x===i&&(a[2*g]=k,a[2*g+1]=u+1,i++),h[u]=x}if(A!==0&&1-i/e<A)return null;if(m){for(let t=f[d-1];t<p.length;t++)p[t]=h[s[t]];h=O(p)}const M=r?new Array(i):new Uint32Array(i*n);i=0;for(let t=0;t<U;t++)h[t]===i&&(F(y,(m?s[t]:t)*n,M,i*n,n),i++);if(s&&!m){const t=new Uint32Array(q);for(let u=0;u<t.length;u++)t[u]=h[s[u]];h=O(t)}return{buffer:Array.isArray(M)?M:M.buffer,indices:h,uniqueCount:i}}function E(o,n,c,r){for(let e=0;e<r;e++)if(o[n+e]!==o[c+e])return!1;return!0}function F(o,n,c,r,e){for(let y=0;y<e;y++)c[r+y]=o[n+y]}function K(o,n,c){let r=0;for(let e=0;e<c;e++)r=o[n+e]+r|0,r=r+(r<<11)+(r>>>2)|0;return r>>>0}let a=null;export{B as v};
