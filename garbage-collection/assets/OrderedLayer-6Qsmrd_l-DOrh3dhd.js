import{v as s,S as l,i as a,el as f}from"./main-DG3mLaAJ.js";import{p as d}from"./OrderByInfo-GD2XnU8e-CtRuWcO_.js";function u(e,r,t){if(!e)return null;const i=e.find(o=>!!o.field);if(!i)return null;const n=new d;return n.read(i,t),[n]}function c(e,r,t,i){const n=e.find(o=>!!o.field);n&&f(t,[n.toJSON()],r)}const p={type:[d],json:{origins:{"web-scene":{write:!1,read:!1}},name:"layerDefinition.orderBy",read:{reader:u},write:{writer:c}}},w=e=>{let r=class extends e{constructor(){super(...arguments),this.orderBy=null}};return s([l(p)],r.prototype,"orderBy",void 0),r=s([a("esri.layers.mixins.OrderedLayer")],r),r};export{p as d,w as p};
