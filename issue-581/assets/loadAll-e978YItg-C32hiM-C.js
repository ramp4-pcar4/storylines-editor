import{dd as c,ag as e,aB as f,b6 as u}from"./main-DpxXUdv2.js";async function p(n,t){return await n.load(),d(n,t)}async function d(n,t){const i=[],l=(...o)=>{for(const a of o)a!=null&&(Array.isArray(a)?l(...a):e.isCollection(a)?a.forEach(s=>l(s)):f.isLoadable(a)&&i.push(a))};t(l);let r=null;if(await c(i,async o=>{const a=await u(y(o)?o.loadAll():o.load());a.ok!==!1||r||(r=a)}),r)throw r.error;return n}function y(n){return"loadAll"in n&&typeof n.loadAll=="function"}export{d as s,p as y};
