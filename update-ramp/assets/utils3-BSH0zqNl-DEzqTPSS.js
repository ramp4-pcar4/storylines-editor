import{c as s}from"./themeUtils-YjM7iIiX-E5hk16ug.js";const n="calcite-list",o="calcite-list-item-group",i="calcite-list-item";function u(c){return Array.from(c.assignedElements({flatten:!0}).filter(e=>e.matches(n)))}function f(c){const e=c.assignedElements({flatten:!0}),r=e.filter(t=>t?.matches(o)).map(t=>Array.from(t.querySelectorAll(i))).reduce((t,l)=>[...t,...l],[]),a=e.filter(t=>t?.matches(i));return[...e.filter(t=>t?.matches(n)).map(t=>Array.from(t.querySelectorAll(i))).reduce((t,l)=>[...t,...l],[]),...r,...a]}function h(c){c.forEach(e=>{e.setPosition=c.indexOf(e)+1,e.setSize=c.length})}function p(c,e=!1){if(!s())return 0;const r=e?"ancestor::calcite-list-item | ancestor::calcite-list-item-group":"ancestor::calcite-list-item";return document.evaluate(r,c,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength}export{h as f,p as h,f as m,u};
