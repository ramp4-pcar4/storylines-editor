import{o as l}from"./main-PWjwnDMV.js";async function d(t){const s=[];for(const o of t.allLayers)if("beforeSave"in o&&typeof o.beforeSave=="function"){const e=o.beforeSave();e&&s.push(e)}await Promise.allSettled(s)}const i=new Set(["layer:unsupported","property:unsupported","symbol:unsupported","symbol-layer:unsupported","url:unsupported"]);function f(t,s,o){let e=(t.messages??[]).filter(({type:r})=>r==="error").map(({name:r,message:a,details:p})=>new l(r,a,p));if(t.blockedRelativeUrls&&(e=e.concat(t.blockedRelativeUrls.map(r=>new l("url:unsupported",`Relative url '${r}' is not supported`)))),o){const{ignoreUnsupported:r,supplementalUnsupportedErrors:a=[],requiredPropertyChecksDisabled:p}=o;r&&(e=e.filter(({name:n})=>!(i.has(n)||a.includes(n)))),p&&(e=e.filter(n=>n.name!=="web-document-write:property-required"))}if(e.length>0)throw new l(s.errorName,"Failed to save due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:e})}export{f as d,d as i};
