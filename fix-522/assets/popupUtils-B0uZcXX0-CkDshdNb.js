import{bL as u,eW as f,eX as m,eY as p,eZ as o,e_ as b,e$ as g,f0 as F,f1 as w}from"./main-gpNb-fIA.js";function Y({displayField:e,editFieldsInfo:i,fields:t,objectIdField:s,title:l},a){if(!t)return null;const n=h({editFieldsInfo:i,fields:t,objectIdField:s},a);if(!n.length)return null;const r=N({titleBase:l,fields:t,displayField:e}),c=C();return new u({title:r,content:c,fieldInfos:n})}function j(e){const{title:i,graphic:t}=e??{},{attributes:s,sourceLayer:l}=t??{},a=l&&"displayField"in l?l.displayField:null,n=a?s?.[a]:null,r=t?.getObjectId()?.toString();return i||n||r||""}const y=(e,i)=>i.visibleFieldNames?i.visibleFieldNames.has(e.name):w(e,i);function L({fields:e,ignoreFieldTypes:i,sortDisabled:t}){const s=e;return i&&(e=e.filter(l=>!i.includes(l.type))),e===s&&(e=e.slice()),t!==!0&&e.sort(I),e}function I(e,i){return e.type==="oid"?-1:i.type==="oid"?1:d(e)?-1:d(i)?1:(e.alias||e.name).toLocaleLowerCase().localeCompare((i.alias||i.name).toLocaleLowerCase())}function h(e,i){const t=i?.visibleFieldNames;return L({fields:e.fields??[],ignoreFieldTypes:i?.ignoreFieldTypes||S,sortDisabled:i?.sortDisabled}).map(s=>new f({fieldName:s.name,isEditable:m(s,e),label:s.alias,format:v(s),visible:y(s,{...e,visibleFieldNames:t})}))}function v(e){switch(e.type){case"small-integer":case"integer":case"single":return new o({digitSeparator:!0,places:0});case"double":return new o({digitSeparator:!0,places:2});case"string":return p(e.name)?new o({digitSeparator:!0,places:0}):void 0;default:return}}function C(){return[new b,new g]}function N(e){const i=F(e),{titleBase:t}=e;return i?`${t}: {${i.trim()}}`:t??""}function d(e){return(e.name&&e.name.toLowerCase())==="name"?!0:e.alias?.toLowerCase()==="name"}const S=["geometry","blob","raster","guid","xml"];export{j as L,Y as w};
