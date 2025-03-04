const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ElevationQuery-qAsmERYh-DGi6BfqC.js","./main-BLGVPR4E.js","./main-Dy4rT7Ar.css","./projection-BA9M1R7d-CgK5UJhM.js","./projectBuffer-CvCBvJ6W-R_bfgxmt.js","./TileKey-B_6qmYK--BtZdR-Xy.js","./layersCreator-CW56kDKc-Cl8lPDCw.js","./portalLayers-Bh9bAhk4-xynG_cNV.js","./associatedFeatureServiceUtils-Bu76-Sxs-B_byUNfB.js","./arcgisLayerUrl-HNYh8jvG-Bkt9HWex.js","./PortalItem-CctGdnxF-QcTINXmb.js","./fetchService-DbaKmJhP-BT3OFF0M.js","./portalItemUtils-B8bw6SAG-COhj1JbH.js","./styleUtils-ChrJTYIw-BJycyZP5.js"])))=>i.map(i=>d[i]);
import{v as s,bz as B,i as C,bA as N,aB as P,ag as D,aU as G,a1 as m,aA as f,am as U,o as R,_ as b,$ as w,P as E,S as n,ac as M,bB as T,bC as V,bD as z,ar as J,I as Q,j as W,ad as S,e as Z,bE as q,bF as H,C as K,bG as F,ah as k,ax as X,a2 as Y}from"./main-BLGVPR4E.js";import{F as c,s as A}from"./Basemap-BEqqSTw9-DGMQ-wru.js";import{o as ee}from"./compilerUtils-CV1QYWI8-B_s0Ccxq.js";import{y as te}from"./loadAll-e978YItg-D2d64dtN.js";import{f as $}from"./CollectionFlattener-DkHuHn5E-BAwWOWEy.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-Dm1NL7Y1.js";import{x as re,L as ae,g as se}from"./TablesMixin-C8RojhYs-ptRz7Z2U.js";import"./PortalItem-CctGdnxF-QcTINXmb.js";import"./writeUtils-D5qlLkwk-ka5gnM98.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./Layer-ChoECxvZ-D0ycW4ZB.js";import"./TimeExtent-Cn0Jofqr-ChwuHnBa.js";var _;let h=_=class extends Z{constructor(e){super(e),this.type="none"}clone(){return new _({type:this.type})}};s([B({none:"none",stayAbove:"stay-above"})],h.prototype,"type",void 0),h=_=s([C("esri.ground.NavigationConstraint")],h);var I;let d=I=class extends N(P){constructor(e){super(e),this.opacity=1,this.surfaceColor=null,this.navigationConstraint=null,this.layers=new D;const t=r=>{r.parent&&r.parent!==this&&"remove"in r.parent&&r.parent.remove(r),r.parent=this,r.type!=="elevation"&&r.type!=="base-elevation"&&m.getLogger(this).error(`Layer '${r.title}, id:${r.id}' of type '${r.type}' is not supported as a ground layer and will therefore be ignored. Only layers of type 'elevation' are supported.`)},a=r=>{r.parent=null};this.addHandles([this.layers.on("after-add",r=>t(r.item)),this.layers.on("after-remove",r=>a(r.item))])}initialize(){this.when().catch(e=>{G(e)||m.getLogger(this).error("#load()","Failed to load ground",e)}),this.resourceInfo&&this.read(this.resourceInfo.data,this.resourceInfo.context)}destroy(){const e=this.layers.removeAll();for(const t of e)f(t);this.layers.destroy()}normalizeCtorArgs(e){return e&&"resourceInfo"in e&&(this._set("resourceInfo",e.resourceInfo),delete(e={...e}).resourceInfo),e}set layers(e){this._set("layers",U(e,this._get("layers")))}writeLayers(e,t,a,r){const i=[];e&&(r={...r,layerContainerType:"ground"},e.forEach(l=>{if("write"in l){const p={};ee(l)().write(p,r)&&i.push(p)}else r?.messages&&r.messages.push(new R("layer:unsupported",`Layers (${l.title}, ${l.id}) of type '${l.declaredClass}' cannot be persisted in the ground`,{layer:l}))})),t.layers=i}load(e){return this.addResolvingPromise(this._loadFromSource(e)),Promise.resolve(this)}loadAll(){return te(this,e=>{e(this.layers)})}async queryElevation(e,t){await this.load({signal:t?.signal});const{ElevationQuery:a}=await b(()=>import("./ElevationQuery-qAsmERYh-DGi6BfqC.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);w(t);const r=new a,i=this.layers.filter(O).toArray();return r.queryAll(i,e,t)}async createElevationSampler(e,t){await this.load({signal:t?.signal});const{ElevationQuery:a}=await b(()=>import("./ElevationQuery-qAsmERYh-DGi6BfqC.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);w(t);const r=new a,i=this.layers.filter(O).toArray();return r.createSamplerAll(i,e,t)}clone(){const e={opacity:this.opacity,surfaceColor:E(this.surfaceColor),navigationConstraint:E(this.navigationConstraint),layers:this.layers.slice()};return this.loaded&&(e.loadStatus="loaded"),new I({resourceInfo:this.resourceInfo}).set(e)}read(e,t){this.resourceInfo||this._set("resourceInfo",{data:e,context:t}),super.read(e,t)}_loadFromSource(e){const t=this.resourceInfo;return t?this._loadLayersFromJSON(t.data,t.context,e):Promise.resolve()}async _loadLayersFromJSON(e,t,a){const r=t?.origin||"web-scene",i=t?.portal||null,l=t?.url||null,{populateOperationalLayers:p}=await b(async()=>{const{populateOperationalLayers:v}=await import("./layersCreator-CW56kDKc-Cl8lPDCw.js");return{populateOperationalLayers:v}},__vite__mapDeps([6,1,2,7,8,9,10,11,12,3,4,13]),import.meta.url);w(a);const y=[];if(e.layers&&Array.isArray(e.layers)){const v={context:{origin:r,url:l,portal:i,layerContainerType:"ground"},defaultLayerType:"ArcGISTiledElevationServiceLayer"};y.push(p(this.layers,e.layers,v))}await Promise.allSettled(y)}};function oe(e){return e&&"createElevationSampler"in e}function O(e){return e.type==="elevation"||oe(e)}s([n({json:{read:!1}})],d.prototype,"layers",null),s([M("layers")],d.prototype,"writeLayers",null),s([n({readOnly:!0})],d.prototype,"resourceInfo",void 0),s([n({type:Number,nonNullable:!0,range:{min:0,max:1},json:{type:T,read:{reader:V,source:"transparency"},write:{writer:(e,t)=>{t.transparency=z(e)},target:"transparency"}}})],d.prototype,"opacity",void 0),s([n({type:J,json:{type:[T],write:(e,t)=>{t.surfaceColor=e.toJSON().slice(0,3)}}})],d.prototype,"surfaceColor",void 0),s([n({type:h,json:{write:!0}})],d.prototype,"navigationConstraint",void 0),d=I=s([C("esri.Ground")],d);const g=d,u=new WeakMap;function j(e){return!e.destroyed&&(u.has(e)||e.addHandles([k(()=>{const t=e.parent;return!(!t||!("type"in t))&&(t.type==="catalog-dynamic-group"||j(t))},t=>u.set(e,t),X),Y(()=>u.delete(e))]),u.get(e))}function ne(e){return typeof e=="object"&&e!=null&&"loaded"in e&&e.loaded===!0&&"type"in e}function ie(e){return!(!ne(e)||!q(e)?.operations?.supportsEditing||"editingEnabled"in e&&!H(e)||j(e))}const L=()=>m.getLogger("esri.support.basemapUtils");function le(){return{}}function de(e){for(const t in e){const a=e[t];f(a),delete e[t]}}function pe(e,t){let a;if(typeof e=="string"){const r=e in A,i=!r&&e.includes("/");if(!r&&!i){if(K.apiKey)L().warn(`Unable to find basemap definition for: ${e}. See available styles at https://developers.arcgis.com/rest/basemap-styles/`);else{const l=Object.entries(A).filter(([p,y])=>y.classic||y.is3d).map(([p])=>`"${p}"`).sort().join(", ");L().warn(`Unable to find basemap definition for: ${e}. Try one of these: ${l}`)}return null}t&&(a=t[e]),a||(a=r?c.fromId(e):new c({style:{id:e}}),t&&(t[e]=a))}else a=F(c,e);return a?.destroyed&&(L().warn("The provided basemap is already destroyed",{basemap:a}),a=null),a}const x={"world-elevation":{id:"worldElevation",url:"//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",layerType:"ArcGISTiledElevationServiceLayer"},"world-topobathymetry":{id:"worldTopoBathymetry",url:"//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/TopoBathy3D/ImageServer",layerType:"ArcGISTiledElevationServiceLayer"}};function ye(e){let t=null;if(typeof e=="string")if(e in x){const a=x[e];t=new g({resourceInfo:{data:{layers:[a]}}})}else m.getLogger("esri.support.groundUtils").warn(`Unable to find ground definition for: ${e}. Try "world-elevation"`);else t=F(g,e);return t}let o=class extends re(ae(Q.EventedMixin(W))){constructor(e){super(e),this.allLayers=new $({getCollections:()=>[this.basemap?.baseLayers,this.ground?.layers,this.layers,this.basemap?.referenceLayers],getChildrenFunction:t=>"layers"in t?t.layers:null}),this.allTables=se(this),this.basemap=null,this.editableLayers=new $({getCollections:()=>[this.allLayers],itemFilterFunction:ie}),this.ground=new g,this._basemapCache=le()}destroy(){de(this._basemapCache),this._basemapCache=null,this.allLayers.destroy(),this.allTables.destroy(),this.editableLayers.destroy(),this.basemap=f(this.basemap),f(this.ground),this._set("ground",null)}castBasemap(e){return pe(e,this._basemapCache)}castGround(e){return ye(e)??this._get("ground")}findLayerById(e){return this.allLayers.find(t=>t.id===e)}findTableById(e){return this.allTables.find(t=>t.id===e)}};s([n({readOnly:!0,dependsOn:[]})],o.prototype,"allLayers",void 0),s([n({readOnly:!0})],o.prototype,"allTables",void 0),s([n({type:c,json:{read:{source:"baseMap"},write:{target:"baseMap"}}})],o.prototype,"basemap",void 0),s([S("basemap")],o.prototype,"castBasemap",null),s([n({readOnly:!0})],o.prototype,"editableLayers",void 0),s([n({type:g,nonNullable:!0})],o.prototype,"ground",void 0),s([S("ground")],o.prototype,"castGround",null),s([n()],o.prototype,"undoRedo",void 0),o=s([C("esri.Map")],o);const Ee=o;export{Ee as default};
