import{ag as g,bU as D,j as w}from"./main-B-qqJ5ov.js";const A=new Set(["esri.Color","esri.portal.Portal","esri.symbols.support.Symbol3DAnchorPosition2D","esri.symbols.support.Symbol3DAnchorPosition3D"]);function y(e){return e instanceof w}function b(e){return e instanceof g?Object.keys(e.items):y(e)?D(e).keys():e?Object.keys(e):[]}function p(e,n){return e instanceof g?e.items[n]:e[n]}function k(e,n){return!(!Array.isArray(e)||!Array.isArray(n))&&e.length!==n.length}function c(e){return e?e.declaredClass:null}function h(e,n){const o=e.diff;if(o&&typeof o=="function")return o(e,n);const i=b(e),f=b(n);if(i.length===0&&f.length===0)return;if(!i.length||!f.length||k(e,n))return{type:"complete",oldValue:e,newValue:n};const s=f.filter(t=>!i.includes(t)),V=i.filter(t=>!f.includes(t)),m=i.filter(t=>f.includes(t)&&p(e,t)!==p(n,t)).concat(s,V).sort(),d=c(e);if(d&&A.has(d)&&m.length)return{type:"complete",oldValue:e,newValue:n};let a;const j=y(e)&&y(n);for(const t of m){const l=p(e,t),r=p(n,t);let u;if((j||typeof l!="function"&&typeof r!="function")&&l!==r&&(l!=null||r!=null)){if(o&&o[t]&&typeof o[t]=="function")u=o[t]?.(l,r);else if(l instanceof Date&&r instanceof Date){if(l.getTime()===r.getTime())continue;u={type:"complete",oldValue:l,newValue:r}}else u=typeof l=="object"&&typeof r=="object"&&c(l)===c(r)?h(l,r):{type:"complete",oldValue:l,newValue:r};u!=null&&(a!=null?a.diff[t]=u:a={type:"partial",diff:{[t]:u}})}}return a}function S(e,n){return O(e,n)}function O(e,n){if(e==null)return!1;const o=n.split(".");let i=e;for(const f of o){if(i.type==="complete")return!0;if(i.type!=="partial")return!1;{const s=i.diff[f];if(!s)return!1;i=s}}return!0}function C(e,n){if(!e)return!1;if(e.type==="partial"){const o=Object.keys(e.diff);return o.length===1&&o[0]===n}return!1}function T(e,n){if(typeof e!="function"&&typeof n!="function"&&(e!=null||n!=null))return e==null||n==null||typeof e=="object"&&typeof n=="object"&&c(e)!==c(n)?{type:"complete",oldValue:e,newValue:n}:h(e,n)}export{C,T as P,S,O as g};
