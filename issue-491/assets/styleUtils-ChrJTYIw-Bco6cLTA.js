import{b6 as o,$ as a,b0 as g}from"./main-ljaACljU.js";async function c(r,e,i){const n=r&&r.getAtOrigin&&r.getAtOrigin("renderer",e.origin);if(n&&n.type==="unique-value"&&n.styleOrigin){const t=await o(n.populateFromStyle());if(a(i),t.ok===!1){const s=t.error;e?.messages&&e.messages.push(new g("renderer:style-reference",`Failed to create unique value renderer from style reference: ${s.message}`,{error:s,context:e})),r.clear("renderer",e?.origin)}}}export{c as g};
