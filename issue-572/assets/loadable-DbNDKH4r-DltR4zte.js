import{c as a,n as i}from"./themeUtils-YjM7iIiX-CeOOgDDc.js";const t=new WeakMap,r=new WeakMap;function s(e){r.set(e,new Promise(n=>t.set(e,n)))}function f(e){t.get(e)()}function o(e){return r.get(e)}async function u(e){if(await o(e),!!a())return i(e),new Promise(n=>requestAnimationFrame(()=>n()))}export{u as f,s as o,f as r};
