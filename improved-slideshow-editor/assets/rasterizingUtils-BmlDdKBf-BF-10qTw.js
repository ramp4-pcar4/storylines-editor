import{l as v}from"./floatRGBA-4pIJN00G-DmqjfVo9.js";import{iW as y}from"./main-Csa2lEpO.js";import{t as F,c as A,o as C}from"./constants-Bqe1QJ4u-F8oTIn7N.js";const D=a=>a==="vertical"||a==="horizontal"||a==="cross"||a==="esriSFSCross"||a==="esriSFSVertical"||a==="esriSFSHorizontal";function $(a,d,M){const i=d.style,h=y(Math.ceil(M)),t=D(i)?8*h:16*h,o=2*h;a.width=t,a.height=t;const e=a.getContext("2d");e.strokeStyle="#ffffff",e.lineWidth=h,e.beginPath(),i!=="vertical"&&i!=="cross"&&i!=="esriSFSCross"&&i!=="esriSFSVertical"||(e.moveTo(t/2,-o),e.lineTo(t/2,t+o)),i!=="horizontal"&&i!=="cross"&&i!=="esriSFSCross"&&i!=="esriSFSHorizontal"||(e.moveTo(-o,t/2),e.lineTo(t+o,t/2)),i!=="backward-diagonal"&&i!=="diagonal-cross"&&i!=="esriSFSDiagonalCross"&&i!=="esriSFSBackwardDiagonal"||(e.moveTo(-o,-o),e.lineTo(t+o,t+o),e.moveTo(t-o,-o),e.lineTo(t+o,o),e.moveTo(-o,t-o),e.lineTo(o,t+o)),i!=="forward-diagonal"&&i!=="diagonal-cross"&&i!=="esriSFSForwardDiagonal"&&i!=="esriSFSDiagonalCross"||(e.moveTo(t+o,-o),e.lineTo(-o,t+o),e.moveTo(o,-o),e.lineTo(-o,o),e.moveTo(t+o,t-o),e.lineTo(t-o,t+o)),e.stroke();const m=e.getImageData(0,0,a.width,a.height),s=new Uint8Array(m.data);let c;for(let n=0;n<s.length;n+=4)c=s[n+3]/255,s[n]=s[n]*c,s[n+1]=s[n+1]*c,s[n+2]=s[n+2]*c;return[s,a.width,a.height,h]}function p(a){a.length%2==1&&(a=[...a,...a]);const d=a.reduce((n,l)=>n+l,0),M=Math.round(d*F),i=1,h=new Float32Array(M*i);let t=0,o=0,e=.5,m=!0;for(const n of a){for(t=o,o+=n*F;e<=o;){const l=e-.5,r=Math.min(Math.abs(e-t),Math.abs(e-o));h[l]=m?-r:r,e++}m=!m}const s=h.length,c=new Uint8Array(4*s);for(let n=0;n<s;++n){const l=h[n]/F;v(l/A*.5+.5,c,4*n)}return[c,M,i]}function U(a,d){a==null&&(a=[]);const M=d==="Butt",i=d==="Square",h=!M&&!i;a.length%2==1&&(a=[...a,...a]);const t=C,o=2*t;let e=0;for(const f of a)e+=f;const m=Math.round(e*t),s=new Float32Array(m*o),c=.5*t;let n=0,l=0,r=.5,T=!0;for(const f of a){for(n=l,l+=f*t;r<=l;){let g=.5;for(;g<o;){const x=(g-.5)*m+r-.5,S=h?(g-t)*(g-t):Math.abs(g-t);s[x]=T?M?Math.max(Math.max(n+c-r,S),Math.max(r-l+c,S)):S:h?Math.min((r-n)*(r-n)+S,(r-l)*(r-l)+S):i?Math.min(Math.max(r-n,S),Math.max(l-r,S)):Math.min(Math.max(r-n+c,S),Math.max(l+c-r,S)),g++}r++}T=!T}const u=s.length,w=new Uint8Array(4*u);for(let f=0;f<u;++f){const g=(h?Math.sqrt(s[f]):s[f])/t;v(g,w,4*f)}return[w,m,o]}export{p as D,U as k,$ as z};
