import{ar as l}from"./main-Dph3xG49.js";import{e as y,r as f,t as k,N as M,T as b}from"./utils-SPbpQbmm-D7LRZl3p.js";function S(e){const o=[];return s(y(e),o),o.length?new l(b(o[0])):null}function s(e,o){if(!e)return;let a;a=e.type==="CIMTextSymbol"?e.symbol:e;const c=e.type==="CIMPolygonSymbol";if(a?.symbolLayers){for(const r of a.symbolLayers)if(!(r.colorLocked||c&&(f(r)||k(r)&&r.markerPlacement&&M(r.markerPlacement))))switch(r.type){case"CIMPictureMarker":case"CIMPictureStroke":case"CIMPictureFill":r.tintColor&&m(o,r.tintColor);break;case"CIMVectorMarker":r.markerGraphics?.forEach(t=>{s(t.symbol,o)});break;case"CIMSolidStroke":case"CIMSolidFill":m(o,r.color);break;case"CIMHatchFill":s(r.lineSymbol,o)}}}function m(e,o){for(const a of e)if(a.join(".")===o.join("."))return;e.push(o)}function p(e,o,a){o instanceof l||(o=new l(o));const c=y(e);c&&i(c,o)}function i(e,o,a){if(!e)return;let c;c=e.type==="CIMTextSymbol"?e.symbol:e;const r=c?.type==="CIMPolygonSymbol";if(c?.symbolLayers)for(const t of c.symbolLayers){if(t.colorLocked||r&&(f(t)||k(t)&&t.markerPlacement&&M(t.markerPlacement)))continue;const n=o.toArray();switch(t.type){case"CIMPictureMarker":case"CIMPictureStroke":case"CIMPictureFill":t.tintColor=n;break;case"CIMVectorMarker":t.markerGraphics?.forEach(C=>{i(C.symbol,o)});break;case"CIMSolidStroke":case"CIMSolidFill":t.color=n;break;case"CIMHatchFill":i(t.lineSymbol,o)}}}export{S as I,p as u};
