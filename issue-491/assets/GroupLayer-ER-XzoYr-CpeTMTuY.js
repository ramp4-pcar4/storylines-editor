const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./groupLayerUtils-D-25JsA_-B2aoE5SQ.js","./utils-BVWK2jiA-DYafkooj.js","./main-ljaACljU.js","./main-qqG83dUV.css","./originUtils-BLsWtgV9-B4sclfuf.js","./multiOriginJSONSupportUtils-DGETddQl-BrWaY9_8.js","./PortalItem-CctGdnxF-CqupN-im.js","./jsonContext-BA8GHqVk-Dj1GiKLb.js","./portalItemUtils-B8bw6SAG-BoMVBZRI.js","./projection-BA9M1R7d-BS7P1XGe.js","./projectBuffer-CvCBvJ6W-De1B3yto.js","./saveUtils-CIYk-dsQ-DaSHynWQ.js","./resourceUtils-BmW6QqlX-LoIA_pDR.js","./uuid-Dj9mdEVg-BaKSCiyT.js","./resourceUtils-rTM6Iemx-Nh9UFb8L.js"])))=>i.map(i=>d[i]);
import{bp as u,ah as d,bP as b,W as v,bU as c,v as s,S as l,ac as h,a0 as f,ax as _,ai as w,av as m,i as g,_ as L,a1 as I}from"./main-ljaACljU.js";import{f as O}from"./CollectionFlattener-DkHuHn5E-BtjL-h2l.js";import{y as S}from"./loadAll-e978YItg-Bi1AEo4v.js";import{m as E}from"./MultiOriginJSONSupport-DKRh9P6w-AdGGmzNF.js";import{D as P}from"./Layer-ChoECxvZ-B44SEYeM.js";import{u as V}from"./BlendLayer-D1WkSmwP-D86TPnRO.js";import{E as A}from"./OperationalLayer-B5IXiMa2-CwdMCef-.js";import{C as M}from"./PortalLayer-CElnYuSQ-wTSbMNpD.js";import{S as x}from"./ScaleRangeLayer-Bz0DcnvM-C3psa0M2.js";import{p as C}from"./fetchService-DbaKmJhP-DrEp4B03.js";import R from"./PortalItem-CctGdnxF-CqupN-im.js";import{x as T,L as $,g as G}from"./TablesMixin-C8RojhYs-IbmU1hv4.js";import{E as p}from"./interfaces-Cwm0pihk-Ptzy6gTd.js";import{i as F}from"./saveUtils-CIYk-dsQ-DaSHynWQ.js";import{y as H}from"./writeUtils-D5qlLkwk-DlOfGBX9.js";import"./TimeExtent-Cn0Jofqr-Ck50QJvn.js";import"./jsonUtils-wIllKWI4-CFKQFPGe.js";import"./parser-DyDJ-rlI-6nhVKEIP.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-C1VO5ErA.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./commonProperties-BtIqvFU_-BQFU32qs.js";import"./ElevationInfo-yv2-9tj6-DjzGBbEp.js";import"./lengthUtils-DKpMe5qR-B2xsskko.js";import"./portalItemUtils-B8bw6SAG-BoMVBZRI.js";import"./projection-BA9M1R7d-BS7P1XGe.js";import"./projectBuffer-CvCBvJ6W-De1B3yto.js";const j=Symbol("WebScene");let r=class extends V(x(A(M(T($(E(P))))))){constructor(e){super(e),this.allLayers=new O({getCollections:()=>[this.layers],getChildrenFunction:i=>"layers"in i?i.layers:null}),this.allTables=G(this),this.fullExtent=void 0,this.operationalLayerType="GroupLayer",this.spatialReference=void 0,this.type="group",this._debouncedSaveOperations=u(async(i,t,o)=>{const{save:a,saveAs:n}=await L(()=>import("./groupLayerUtils-D-25JsA_-B2aoE5SQ.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]),import.meta.url);switch(i){case p.SAVE:return a(this,t);case p.SAVE_AS:return n(this,o,t)}})}initialize(){this._enforceVisibility(this.visibilityMode,this.visible),this.addHandles([d(()=>{let e=this.parent;for(;e&&"parent"in e&&e.parent;)e=e.parent;return e&&j in e},e=>{const i="prevent-adding-tables";this.removeHandles(i),e&&(this.tables.removeAll(),this.addHandles(w(()=>this.tables,"before-add",t=>{t.preventDefault(),I.getLogger(this).errorOnce("tables","tables in group layers in a webscene are not supported. Please move the tables from the group layer to the webscene if you want to persist them.")}),i))},_),d(()=>this.visible,this._onVisibilityChange.bind(this),m)])}destroy(){this.allLayers.destroy(),this.allTables.destroy()}get sourceIsPortalItem(){return this.portalItem&&this.originIdOf("portalItem")===b.USER}_writeLayers(e,i,t,o){const a=[];if(!e)return a;e.forEach(n=>{const y=H(n,o.webmap?o.webmap.getLayerJSONFromResourceInfo(n):null,o);y?.layerType&&a.push(y)}),i.layers=a}set portalItem(e){this._set("portalItem",e)}readPortalItem(e,i,t){const{itemId:o,layerType:a}=i;if(a==="GroupLayer"&&o)return new R({id:o,portal:t?.portal})}writePortalItem(e,i){e?.id&&(i.itemId=e.id)}set visibilityMode(e){const i=this._get("visibilityMode")!==e;this._set("visibilityMode",e),i&&this._enforceVisibility(e,this.visible)}async beforeSave(){return F(this)}load(e){const i=this.loadFromPortal({supportedTypes:["Feature Service","Feature Collection","Group Layer","Scene Service"],layerModuleTypeMap:C},e).catch(t=>{if(v(t),this.sourceIsPortalItem)throw t});return this.addResolvingPromise(i),Promise.resolve(this)}async loadAll(){return S(this,e=>{e(this.layers,this.tables)})}async save(e){return this._debouncedSaveOperations(p.SAVE,e)}async saveAs(e,i){return this._debouncedSaveOperations(p.SAVE_AS,i,e)}layerAdded(e){e.visible&&this.visibilityMode==="exclusive"?this._turnOffOtherLayers(e):this.visibilityMode==="inherited"&&(e.visible=this.visible),this.hasHandles(e.uid)?console.error(`Layer read to Grouplayer: uid=${e.uid}`):this.addHandles(d(()=>e.visible,i=>this._onChildVisibilityChange(e,i),m),e.uid)}layerRemoved(e){this.removeHandles(e.uid),this._enforceVisibility(this.visibilityMode,this.visible)}_turnOffOtherLayers(e){this.layers.forEach(i=>{i!==e&&(i.visible=!1)})}_enforceVisibility(e,i){if(!c(this).initialized)return;const t=this.layers;let o=t.find(a=>a.visible);switch(e){case"exclusive":t.length&&!o&&(o=t.at(0),o.visible=!0),this._turnOffOtherLayers(o);break;case"inherited":t.forEach(a=>{a.visible=i})}}_onVisibilityChange(e){this.visibilityMode==="inherited"&&this.layers.forEach(i=>{i.visible=e})}_onChildVisibilityChange(e,i){switch(this.visibilityMode){case"exclusive":i?this._turnOffOtherLayers(e):this._isAnyLayerVisible()||(e.visible=!0);break;case"inherited":e.visible=this.visible}}_isAnyLayerVisible(){return this.layers.some(e=>e.visible)}};s([l({readOnly:!0,dependsOn:[]})],r.prototype,"allLayers",void 0),s([l({readOnly:!0})],r.prototype,"allTables",void 0),s([l({json:{read:!0,write:!0}})],r.prototype,"blendMode",void 0),s([l()],r.prototype,"fullExtent",void 0),s([l({readOnly:!0})],r.prototype,"sourceIsPortalItem",null),s([l({json:{read:!1,write:{ignoreOrigin:!0}}})],r.prototype,"layers",void 0),s([h("layers")],r.prototype,"_writeLayers",null),s([l({type:["GroupLayer"]})],r.prototype,"operationalLayerType",void 0),s([l({json:{origins:{"web-map":{read:!1,write:{overridePolicy(e,i,t){return{enabled:e?.type==="Group Layer"&&t?.initiator!==this}}}},"web-scene":{read:!1,write:!1}}}})],r.prototype,"portalItem",null),s([f("web-map","portalItem",["itemId"])],r.prototype,"readPortalItem",null),s([h("web-map","portalItem",{itemId:{type:String}})],r.prototype,"writePortalItem",null),s([l()],r.prototype,"spatialReference",void 0),s([l({json:{read:!1},readOnly:!0,value:"group"})],r.prototype,"type",void 0),s([l({type:["independent","inherited","exclusive"],value:"independent",json:{write:!0,origins:{"web-map":{type:["independent","exclusive"],write:(e,i,t)=>{e!=="inherited"&&(i[t]=e)}}}}})],r.prototype,"visibilityMode",null),r=s([g("esri.layers.GroupLayer")],r);const me=r;export{me as default};
