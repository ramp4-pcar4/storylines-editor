import{hc as u,dG as f}from"./main-CaWWi_jZ.js";function c(n){if(u(n)){if(n.length<f)return n}else if(n.length<f)return Array.from(n);let t=!0,e=!0;return n.some((l,A)=>(t=t&&l===0,e=e&&l===A,!t&&!e)),t?h(n.length):e?w(n.length):u(n)||n.BYTES_PER_ELEMENT!==Uint16Array.BYTES_PER_ELEMENT?y(n):n}function y(n){let t=!0;for(const e of n){if(e>=65536)return u(n)?new Uint32Array(n):n;e>=256&&(t=!1)}return t?new Uint8Array(n):new Uint16Array(n)}function g(n){return n<=f?new Array(n):n<=65536?new Uint16Array(n):new Uint32Array(n)}let r=(()=>{const n=new Uint32Array(131072);for(let t=0;t<n.length;++t)n[t]=t;return n})();const o=[0],a=(()=>{const n=new Uint16Array(65536);for(let t=0;t<n.length;++t)n[t]=t;return n})();function w(n){if(n===1)return o;if(n<f)return Array.from(new Uint16Array(a.buffer,0,n));if(n<a.length)return new Uint16Array(a.buffer,0,n);if(n>r.length){const t=Math.max(2*r.length,n);r=new Uint32Array(t);for(let e=0;e<r.length;e++)r[e]=e}return new Uint32Array(r.buffer,0,n)}let i=new Uint8Array(65536);function h(n){if(n===1)return o;if(n<f)return new Array(n).fill(0);if(n>i.length){const t=Math.max(2*i.length,n);i=new Uint8Array(t)}return new Uint8Array(i.buffer,0,n)}export{w as A,g as h,c as w};
