import{aQ as p,v as t,S as s,i as a,o as l}from"./main-Csa2lEpO.js";import{m as y}from"./MultiOriginJSONSupport-DKRh9P6w-KIn1s54b.js";import{D as m}from"./Layer-ChoECxvZ-V5oawm_A.js";import{C as u}from"./PortalLayer-CElnYuSQ-DOx4MKAE.js";import"./TimeExtent-Cn0Jofqr-5kMZKCzf.js";import"./PortalItem-CctGdnxF-B7FQ0L50.js";import"./portalItemUtils-B8bw6SAG-pcKXG4_c.js";import"./projection-BA9M1R7d-DQqPDCuS.js";import"./projectBuffer-CvCBvJ6W-CHC2yAAi.js";let e=class extends u(y(m)){constructor(o){super(o),this.resourceInfo=null,this.type="unknown"}initialize(){this.addResolvingPromise(new Promise((o,r)=>{p(()=>{const n=this.resourceInfo&&(this.resourceInfo.layerType||this.resourceInfo.type);let i="Unknown layer type";n&&(i+=" "+n),r(new l("layer:unknown-layer-type",i,{layerType:n}))})}))}read(o,r){super.read({resourceInfo:o},r)}write(o,r){return null}};t([s({readOnly:!0})],e.prototype,"resourceInfo",void 0),t([s({type:["show","hide"]})],e.prototype,"listMode",void 0),t([s({json:{read:!1},readOnly:!0,value:"unknown"})],e.prototype,"type",void 0),e=t([a("esri.layers.UnknownLayer")],e);const O=e;export{O as default};
