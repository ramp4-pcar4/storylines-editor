import{o as f,f as m}from"./main-DG3mLaAJ.js";import{y as p,a as u,n as c}from"./utils-9sQxfkoa-DrZxAeRz.js";async function g(i,t,r,s){if(!t)throw new f("post:missing-guid","guid for version is missing");const o=p(i),e=r.toJSON(),n=u(o.query,{query:c({...e,f:"json"}),...s,method:"post"});t.startsWith("{")&&(t=t.slice(1,-1));const a=`${o.path}/versions/${t}/deleteForwardEdits`,{data:d}=await m(a,n);return d}export{g as deleteForwardEdits};
