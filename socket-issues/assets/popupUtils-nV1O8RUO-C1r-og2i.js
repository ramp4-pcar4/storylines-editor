import{j1 as r,eQ as c}from"./main-8gcLRx1v.js";async function m(e,d=e.popupTemplate){if(d==null)return[];const s=await d.getRequiredFields(e.fieldsIndex),{lastEditInfoEnabled:i}=d,{objectIdField:p,typeIdField:n,globalIdField:u,relationships:a}=e;if(s.includes("*"))return["*"];const o=i?r(e):[],l=c(e.fieldsIndex,[...s,...o]);return n&&l.push(n),l&&p&&e.fieldsIndex?.has(p)&&!l.includes(p)&&l.push(p),l&&u&&e.fieldsIndex?.has(u)&&!l.includes(u)&&l.push(u),a&&a.forEach(f=>{const{keyField:t}=f;l&&t&&e.fieldsIndex?.has(t)&&!l.includes(t)&&l.push(t)}),l}function I(e,d){return e.popupTemplate?e.popupTemplate:d!=null&&d.defaultPopupTemplateEnabled&&e.defaultPopupTemplate!=null?e.defaultPopupTemplate:null}export{m as h,I as m};
