import{bX as f,o as m,gF as v,f as b}from"./main-CJueYQxD.js";async function F(e,t={},s){await e.load(s);const r=f(e.itemUrl,"resources"),{start:c=1,num:d=10,sortOrder:l="asc",sortField:u="resource"}=t,i={query:{start:c,num:d,sortOrder:l,sortField:u,token:e.apiKey},signal:s?.signal},a=await e.portal.request(r,i);return{total:a.total,nextStart:a.nextStart,resources:a.resources.map(({created:n,size:p,resource:o})=>({created:new Date(n),size:p,resource:e.resourceFromPath(o)}))}}async function I(e,t,s,r){const c=new Map;for(const{resource:l,content:u,compress:i,access:a}of t){if(!l.hasPath())throw new m(`portal-item-resource-${s}:invalid-path`,"Resource does not have a valid path");const[n,p]=h(l.path),o=`${n}/${i??""}/${a??""}`;c.has(o)||c.set(o,{prefix:n,compress:i,access:a,files:[]}),c.get(o).files.push({fileName:p,content:u})}await e.load(r);const d=f(e.userItemUrl,s==="add"?"addResources":"updateResources");for(const{prefix:l,compress:u,access:i,files:a}of c.values())for(let n=0;n<a.length;n+=25){const p=a.slice(n,n+25),o=new FormData;l&&l!=="."&&o.append("resourcesPrefix",l),u&&o.append("compress","true"),i&&o.append("access",i);let g=0;for(const{fileName:w,content:y}of p)o.append("file"+ ++g,y,w);o.append("f","json"),await e.portal.request(d,{method:"post",body:o,signal:r?.signal})}}async function P(e,t,s){if(!t.hasPath())throw new m("portal-item-resources-remove:invalid-path","Resource does not have a valid path");await e.load(s);const r=f(e.userItemUrl,"removeResources");await e.portal.request(r,{method:"post",query:{resource:t.path},signal:s?.signal}),t.portalItem=null}async function O(e,t){await e.load(t);const s=f(e.userItemUrl,"removeResources");return e.portal.request(s,{method:"post",query:{deleteAll:!0},signal:t?.signal})}function h(e){const t=e.lastIndexOf("/");return t===-1?[".",e]:[e.slice(0,t),e.slice(t+1)]}function x(e){const[t,s]=R(e),[r,c]=h(t);return[r,c,s]}function R(e){const t=v(e);return t==null?[e,""]:[e.slice(0,e.length-t.length-1),`.${t}`]}async function U(e){return e.type==="blob"?e.blob:e.type==="json"?new Blob([e.jsonString],{type:"application/json"}):(await b(e.url,{responseType:"blob"})).data}function $(e,t){if(!e.hasPath())return null;const[s,,r]=x(e.path);return e.portalItem.resourceFromPath(f(s,t+r))}export{I as addOrUpdateResources,U as contentToBlob,F as fetchResources,$ as getSiblingOfSameTypeI,O as removeAllResources,P as removeResource,x as splitPrefixFileNameAndExtension};
