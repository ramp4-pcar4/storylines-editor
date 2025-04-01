import{el as f,o}from"./main-DzfxInI5.js";import{c as u,a as i}from"./parser-DyDJ-rlI-B5RyhicL.js";function $(t,n,e){try{return p(t)}catch(a){e?.messages?.push(a)}return null}function y(t,n,e,a){try{const s=l(t);f(e,s,n)}catch(s){a.messages&&a.messages.push(s)}}function l(t){const n=u(t);return n?i(n)?n.map(e=>e.toJSON()):n.map(({scale:e,effects:a})=>({scale:e,value:a.map(s=>s.toJSON())})):null}function p(t){if(!t||t.length===0)return null;if(m(t)){const n=[];for(const e of t)n.push({scale:e.scale,value:c(e.value)});return n}return c(t)}function m(t){const n=t[0];return!!n&&"scale"in n}function c(t){if(!t?.length)return"";const n=[];for(const e of t){let a=[];switch(e.type){case"grayscale":case"sepia":case"saturate":case"invert":case"brightness":case"contrast":case"opacity":a=[r(e,"amount")];break;case"blur":a=[r(e,"radius","pt")];break;case"hue-rotate":a=[r(e,"angle","deg")];break;case"drop-shadow":a=[r(e,"xoffset","pt"),r(e,"yoffset","pt"),r(e,"blurRadius","pt"),h(e,"color")];break;case"bloom":a=[r(e,"strength"),r(e,"radius","pt"),r(e,"threshold")]}const s=`${e.type}(${a.filter(Boolean).join(" ")})`;u(s),n.push(s)}return n.join(" ")}function r(t,n,e){if(t[n]==null)throw new o("effect:missing-parameter",`Missing parameter '${n}' in ${t.type} effect`,{effect:t});return e?t[n]+e:""+t[n]}function h(t,n){if(t[n]==null)throw new o("effect:missing-parameter",`Missing parameter '${n}' in ${t.type} effect`,{effect:t});const e=t[n];return`rgba(${e[0]||0}, ${e[1]||0}, ${e[2]||0}, ${e[3]/255||0})`}export{$ as l,y as p};
