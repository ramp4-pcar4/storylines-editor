import{cF as l,N as d,cG as a,cH as u,a1 as p}from"./main-ljaACljU.js";const m=()=>p.getLogger("esri.intl.substitute");function y(e,n,s={}){const{format:t={}}=s;return l(e,r=>g(r,n,t))}function g(e,n,s){let t,r;const o=e.indexOf(":");if(o===-1?t=e.trim():(t=e.slice(0,o).trim(),r=e.slice(o+1).trim()),!t)return"";const i=d(t,n);if(i==null)return"";const f=(r?s?.[r]:null)??s?.[t];return f?b(i,f):r?w(i,r):c(i)}function b(e,n){switch(n.type){case"date":return u(e,n.intlOptions);case"number":return a(e,n.intlOptions);default:return m().warn("missing format descriptor for key {key}"),c(e)}}function w(e,n){switch(n.toLowerCase()){case"dateformat":return u(e);case"numberformat":return a(e);default:return m().warn(`inline format is unsupported since 4.12: ${n}`),/^(dateformat|datestring)/i.test(n)?u(e):/^numberformat/i.test(n)?a(e):c(e)}}function c(e){switch(typeof e){case"string":return e;case"number":return a(e);case"boolean":return""+e;default:return e instanceof Date?u(e):""}}export{y as b};
