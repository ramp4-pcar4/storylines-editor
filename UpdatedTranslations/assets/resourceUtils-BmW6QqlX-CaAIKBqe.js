const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./resourceUtils-rTM6Iemx-m-8i0aRV.js","./main-YbCtmqIL.js","./main-Cc7Kl5Si.css"])))=>i.map(i=>d[i]);
import{_,jx as y,$ as S,o as v,iF as E}from"./main-YbCtmqIL.js";import{r as F}from"./uuid-Dj9mdEVg-BaKSCiyT.js";import{getSiblingOfSameTypeI as O,contentToBlob as m}from"./resourceUtils-rTM6Iemx-m-8i0aRV.js";async function U(s,t,r){const o=await w(s,t,r);await I(o,t,r)}async function b(s,t,r,o,a){const c=await w(r,o,a);await s.update({data:t}),await I(c,o,a)}async function w(s,t,r){if(!t?.resources)return;const o=t.portalItem===s.portalItem?new Set(s.paths):new Set;s.paths.length=0,s.portalItem=t.portalItem;const a=new Set(t.resources.toKeep.map(e=>e.resource.path)),c=new Set,f=[];a.forEach(e=>{o.delete(e),s.paths.push(e)});const p=[],h=[],u=[];for(const e of t.resources.toUpdate)if(o.delete(e.resource.path),a.has(e.resource.path)||c.has(e.resource.path)){const{resource:n,content:g,finish:d}=e,i=O(n,F());s.paths.push(i.path),p.push({resource:i,content:await m(g),compress:e.compress}),d&&u.push(()=>d(i))}else{s.paths.push(e.resource.path),h.push({resource:e.resource,content:await m(e.content),compress:e.compress});const n=e.finish;n&&u.push(()=>n(e.resource)),c.add(e.resource.path)}for(const e of t.resources.toAdd)if(s.paths.push(e.resource.path),o.has(e.resource.path))o.delete(e.resource.path);else{p.push({resource:e.resource,content:await m(e.content),compress:e.compress});const n=e.finish;n&&u.push(()=>n(e.resource))}if(p.length||h.length){const{addOrUpdateResources:e}=await _(()=>import("./resourceUtils-rTM6Iemx-m-8i0aRV.js"),__vite__mapDeps([0,1,2]),import.meta.url);await e(t.portalItem,p,"add",r),await e(t.portalItem,h,"update",r)}if(u.forEach(e=>e()),f.length===0)return o;const l=await y(f);if(S(r),l.length>0)throw new v("save:resources","Failed to save one or more resources",{errors:l});return o}async function I(s,t,r){if(!s||!t.portalItem)return;const o=[];for(const a of s){const c=t.portalItem.resourceFromPath(a);o.push(c.portalItem.removeResource(c,r))}await E(o)}export{b as F,U as T};
