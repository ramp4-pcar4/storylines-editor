import{ar as h,f5 as w,P,f6 as A}from"./main-BS_S-e9u.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";function E(t){return"r"in t&&"g"in t&&"b"in t}function x(t){return"h"in t&&"s"in t&&"v"in t}function k(t){return"l"in t&&"a"in t&&"b"in t}function y(t){return"l"in t&&"c"in t&&"h"in t}function I(t){return"x"in t&&"y"in t&&"z"in t}const j=[[.4124,.3576,.1805],[.2126,.7152,.0722],[.0193,.1192,.9505]],q=[[3.2406,-1.5372,-.4986],[-.9689,1.8758,.0415],[.0557,-.204,1.057]];function z(t,r){const e=[];let n,o;if(t[0].length!==r.length)throw new Error("dimensions do not match");const u=t.length,a=t[0].length;let c=0;for(n=0;n<u;n++){for(c=0,o=0;o<a;o++)c+=t[n][o]*r[o];e.push(c)}return e}function v(t){const r=[t.r/255,t.g/255,t.b/255].map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4),e=z(j,r);return{x:100*e[0],y:100*e[1],z:100*e[2]}}function M(t){const r=z(q,[t.x/100,t.y/100,t.z/100]).map(e=>{const n=e<=.0031308?12.92*e:1.055*e**.4166666666666667-.055;return Math.min(1,Math.max(n,0))});return{r:Math.round(255*r[0]),g:Math.round(255*r[1]),b:Math.round(255*r[2])}}function H(t){const r=[t.x/95.047,t.y/100,t.z/108.883].map(e=>e>.008856451679035631?e**.3333333333333333:7.787037037037035*e+.13793103448275862);return{l:116*r[1]-16,a:500*(r[0]-r[1]),b:200*(r[1]-r[2])}}function L(t){const r=t.l,e=[(r+16)/116+t.a/500,(r+16)/116,(r+16)/116-t.b/200].map(n=>n>6/29?n**3:3*(6/29)**2*(n-4/29));return{x:95.047*e[0],y:100*e[1],z:108.883*e[2]}}function B(t){const r=t.l,e=t.a,n=t.b,o=Math.sqrt(e*e+n*n);let u=Math.atan2(n,e);return u=u>0?u:u+2*Math.PI,{l:r,c:o,h:u}}function C(t){const r=t.l,e=t.c,n=t.h;return{l:r,a:e*Math.cos(n),b:e*Math.sin(n)}}function D(t){return H(v(t))}function F(t){return M(L(t))}function G(t){return B(H(v(t)))}function O(t){return M(L(C(t)))}function Q(t){const r=t.r,e=t.g,n=t.b,o=Math.max(r,e,n),u=o-Math.min(r,e,n);let a=o,c=u===0?0:o===r?(e-n)/u%6:o===e?(n-r)/u+2:(r-e)/u+4,i=u===0?0:u/a;return c<0&&(c+=6),c*=60,i*=100,a*=100/255,{h:c,s:i,v:a}}function R(t){const r=(t.h+360)%360/60,e=t.s/100,n=t.v/100*255,o=n*e,u=o*(1-Math.abs(r%2-1));let a;switch(Math.floor(r)){case 0:a={r:o,g:u,b:0};break;case 1:a={r:u,g:o,b:0};break;case 2:a={r:0,g:o,b:u};break;case 3:a={r:0,g:u,b:o};break;case 4:a={r:u,g:0,b:o};break;case 5:case 6:a={r:o,g:0,b:u};break;default:a={r:0,g:0,b:0}}return a.r=Math.round(a.r+n-o),a.g=Math.round(a.g+n-o),a.b=Math.round(a.b+n-o),a}function m(t){return E(t)?t:y(t)?O(t):k(t)?F(t):I(t)?M(t):x(t)?R(t):t}function Y(t){return x(t)?t:Q(m(t))}function _(t){return k(t)?t:D(m(t))}function $(t){return y(t)?t:G(m(t))}function S(t,r){const{r:e,g:n,b:o}=t;return .2126*e+.7152*n+.0722*o}var b;function J(t,r=b.High){return S(t)>r?new h([0,0,0,t.a]):new h([255,255,255,t.a])}function K(t,r,e={}){if(t.length===0||r<=0)return[];if((t=t.map(n=>typeof n=="string"?new h(n):n)).length===1||r===1){const n=[],o=t[0];for(let u=0;u<r;u++)n.push(o.clone());return n}if(e.shuffle&&(t=w(P(t),e.seed)),t.length>=r){const n=[],o=(t.length-1)/(r-1);for(let u=0;u<r;u++){const a=Math.round(u*o);n.push(t[a].clone())}return n}return T(t,r,e)}function T(t,r,e={}){const n=[],o=t.length-1,u=Math.ceil((r-t.length)/o);t:for(let a=0;a<o;a++){const c=t[a],i=t[a+1];for(let s=1;s<=u;s++){const f=s/(u+1);if(n.push(U(c,i,f,e)),n.length+t.length===r)break t}}return[...t.map(a=>a.clone()),...w(n,e.seed??1)]}(function(t){t[t.Low=160]="Low",t[t.High=225]="High"})(b||(b={}));const g=(t,r)=>{const e=Math.floor(10*r())-5;return Math.min(255,Math.max(0,t+e))};function U(t,r,e,n={}){const o=t.r,u=t.g,a=t.b,c=r.r,i=r.g,s=r.b,f=Math.round(o+(c-o)*e),d=Math.round(u+(i-u)*e),p=Math.round(a+(s-a)*e);if(!n.offset)return new h([f,d,p]);const l=A(n.seed);return new h([g(f,l),g(d,l),g(p,l)])}export{Y as S,_ as T,$ as U,J as W,K as X,m as l,E as x};
