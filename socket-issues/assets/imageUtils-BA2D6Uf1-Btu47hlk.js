const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./gif-BZzSowd2-EKD_BUDA.js","./main-8gcLRx1v.js","./main-BI1Cc2qD.css","./apng-DuERAVke-BzXoUeWt.js","./_commonjsHelpers-BITg13Vk-KnjfkSck.js"])))=>i.map(i=>d[i]);
import{_ as u,eh as d,ei as w,f,aU as p,o as y}from"./main-8gcLRx1v.js";let r=null,o=!0;function T(a,e,t){if(!a||!e)throw new Error("Cannot construct image data without dimensions");if(o)try{return new ImageData(a,e)}catch{o=!1}return m(a,e,t)}function E(a,e,t,n){if(!e||!t)throw new Error("Cannot construct image data without dimensions");if(o)try{return new ImageData(a,e,t)}catch{o=!1}const i=m(e,t,n);return i.data.set(a,0),i}function g(){return r||(r=document.createElement("canvas"),r.width=1,r.height=1),r}function m(a,e,t){return t||(t=g()),t.getContext("2d").createImageData(a,e)}async function h(a,e){const t=window.URL.createObjectURL(a);try{const{data:n}=await f(t,{...e,responseType:"image"});return n}catch(n){throw p(n)?n:new y("invalid-image",`Could not fetch requested image at ${t}`)}finally{window.URL.revokeObjectURL(t)}}async function I(a,e){const{arrayBuffer:t,mediaType:n}=await l(a,e),i=n==="image/png";if(n==="image/gif"){const{isAnimatedGIF:c,parseGif:s}=await u(()=>import("./gif-BZzSowd2-EKD_BUDA.js"),__vite__mapDeps([0,1,2]),import.meta.url);if(c(t))return s(t,e)}if(i){const{isAnimatedPNG:c,parseApng:s}=await u(()=>import("./apng-DuERAVke-BzXoUeWt.js"),__vite__mapDeps([3,4,1,2]),import.meta.url);if(c(t))return s(t,e)}return h(new Blob([t],{type:n}),e)}async function l(a,e){const t=d(a);if(t?.isBase64)return{arrayBuffer:w(t.data),mediaType:t.mediaType};const n=await f(a,{responseType:"array-buffer",...e});return{arrayBuffer:n.data,mediaType:n.getHeader?.("Content-Type")??""}}export{I as T,E as g,T as y};
