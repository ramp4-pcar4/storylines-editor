import"./main-Ce-R8kMh.js";function C(n){return n?{originPosition:n.originPosition==="upper-left"?"upperLeft":n.originPosition==="lower-left"?"lowerLeft":n.originPosition,scale:n.tolerance?[n.tolerance,n.tolerance,1,1]:[1,1,1,1],translate:n.extent!=null?[n.extent.xmin,n.extent.ymax,n.extent.zmin??0,n.extent.mmin??0]:[0,0,0,0]}:null}function z(n){return n.originPosition==="lowerLeft"&&n.scale.length===4&&n.translate.length===4}function x(n){if(z(n))return n;const{originPosition:r,scale:t,translate:o}=n,e=t[0]??1,l=t[1]??1;return{originPosition:"lowerLeft",scale:[e,r==="lowerLeft"?l:-l,t[2]??1,t[3]??1],translate:[o[0]??0,o[1]??0,o[2]??0,o[3]??0]}}function Z({scale:n,translate:r},t){return Math.round((t-r[0])/n[0])}function A({scale:n,translate:r},t){return Math.round((t-r[1])/n[1])}function d({scale:n,translate:r},t){return Math.round(((t??0)-r[2])/n[2])}function b({scale:n,translate:r},t){return t?Math.round((t-r[3])/n[3]):0}function P({scale:n,translate:r},t){return t*n[0]+r[0]}function p({scale:n,translate:r},t){return t*n[1]+r[1]}function w({scale:n,translate:r},t){return(t??0)*n[2]+r[2]}function m({scale:n,translate:r},t){return t?t*n[3]+r[3]:0}function y(n,r){return n&&r?v:n&&!r?k:!n&&r?q:j}const j=(n,r)=>{const t=new Array(r.length);if(!r.length)return t;const o=r[0];let e=P(n,o[0]),l=p(n,o[1]);t[0]=[e,l];const{scale:i,originPosition:a}=n,u=i[0],c=a==="lowerLeft"?i[1]:-i[1];for(let s=1;s<r.length;s++){const[f,h]=r[s];e+=u*f,l+=c*h,t[s]=[e,l]}return t},k=(n,r)=>{const t=new Array(r.length);if(!r.length)return t;const o=r[0];let e=P(n,o[0]),l=p(n,o[1]);t[0]=[e,l,w(n,o[2])];const{scale:i,originPosition:a}=n,u=i[0],c=a==="lowerLeft"?i[1]:-i[1];for(let s=1;s<r.length;s++){const[f,h,g]=r[s];e+=u*f,l+=c*h,t[s]=[e,l,w(n,g)]}return t},q=(n,r)=>{const t=new Array(r.length);if(!r.length)return t;const o=r[0];let e=P(n,o[0]),l=p(n,o[1]);t[0]=[e,l,m(n,o[2])];const{scale:i,originPosition:a}=n,u=i[0],c=a==="lowerLeft"?i[1]:-i[1];for(let s=1;s<r.length;s++){const[f,h,g]=r[s];e+=u*f,l+=c*h,t[s]=[e,l,m(n,g)]}return t},v=(n,r)=>{const t=new Array(r.length);if(!r.length)return t;const o=r[0];let e=P(n,o[0]),l=p(n,o[1]);t[0]=[e,l,w(n,o[2]),m(n,o[3])];const{scale:i,originPosition:a}=n,u=i[0],c=a==="lowerLeft"?i[1]:-i[1];for(let s=1;s<r.length;s++){const[f,h,g,L]=r[s];e+=u*f,l+=c*h,t[s]=[e,l,w(n,g),m(n,L)]}return t};function M(n,r,t){const o=new Array(t.length);for(let e=0;e<t.length;e++)o[e]=r(n,t[e]);return o}function D(n,r,t){const o=x(n);return r.x=Z(o,t.x),r.y=A(o,t.y),t.z!=null&&(r.z=d(o,t.z)),t.m!=null&&(r.m=b(o,t.m)),r}function F(n,r,t,o=t?.hasZ??!1,e=t?.hasM??!1){if(t!=null){const l=x(n);r.points=y(o,e)(l,t.points),r.hasZ=o,r.hasM=e}return r}function H(n,r,t,o=t?.z!=null,e=t?.m!=null){if(t==null)return r;const l=x(n);return r.x=P(l,t.x),r.y=p(l,t.y),o&&(r.z=w(l,t.z)),e&&(r.m=m(l,t.m)),r}function T(n,r,t,o=t?.hasZ??!1,e=t?.hasM??!1){if(t!=null){const l=x(n);r.rings=M(l,y(o,e),t.rings),r.hasZ=o,r.hasM=e}return r}function E(n,r,t,o=t?.hasZ??!1,e=t?.hasM??!1){if(t!=null){const l=x(n);r.paths=M(l,y(o,e),t.paths),r.hasZ=o,r.hasM=e}return r}export{T as F,E as T,x as g,D as k,F as q,H as v,C as z};
