import{bP as l}from"./main-Cs_aiUdl.js";function s(n,r,i){return r.flatten(({sublayers:e})=>e).length!==n.length?!0:!!n.some(e=>e.originIdOf("minScale")>i||e.originIdOf("maxScale")>i||e.originIdOf("renderer")>i||e.originIdOf("labelingInfo")>i||e.originIdOf("opacity")>i||e.originIdOf("labelsVisible")>i||e.originIdOf("source")>i)||!f(n,r)}function c(n,r,i){return!!n.some(e=>{const o=e.source,t=!o||o.type==="map-layer"&&o.mapLayerId===e.id&&(o.gdbVersion==null||o.gdbVersion===i);return e.commitProperty("renderer"),e.commitProperty("labelingInfo"),e.commitProperty("opacity"),e.commitProperty("labelsVisible"),!t||e.originIdOf("renderer")>l.SERVICE||e.originIdOf("labelingInfo")>l.SERVICE||e.originIdOf("opacity")>l.SERVICE||e.originIdOf("labelsVisible")>l.SERVICE})||!f(n,r)}function f(n,r){if(!n?.length||r==null)return!0;const i=r.slice().reverse().flatten(({sublayers:t})=>t&&t.toArray().reverse()).map(t=>t.id).toArray();if(n.length>i.length)return!1;let e=0;const o=i.length;for(const{id:t}of n){for(;e<o&&i[e]!==t;)e++;if(e>=o)return!1}return!0}function g(n){return!!n&&n.some(r=>r.minScale!=null||r.layerDefinition?.minScale!=null)}export{g as c,s as f,c as s};
