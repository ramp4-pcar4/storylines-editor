import{I as k,bA as L,ai as f,ah as y,av as p,aw as v,n as d,bG as _,ag as m,v as r,S as l,jH as F,a0 as h,i as c,J as g,gK as O,W as j,ac as M,aB as I}from"./main-YbCtmqIL.js";import{f as R}from"./CollectionFlattener-DkHuHn5E-C5da7wW6.js";import{m as T}from"./MultiOriginJSONSupport-DKRh9P6w-B7ajNpN-.js";import{D as C}from"./Layer-ChoECxvZ-BJD8T8c3.js";import{u as N}from"./BlendLayer-D1WkSmwP-DwnCecQ-.js";import{E as K}from"./OperationalLayer-B5IXiMa2-CbTb9D92.js";import{C as P}from"./PortalLayer-CElnYuSQ-CFiTDo4v.js";import{T as A}from"./RefreshableLayer-a8BQ58Xh-CMCFYe0T.js";import{S as J}from"./ScaleRangeLayer-Bz0DcnvM-DEN7Cg80.js";import{Z as W}from"./commonProperties-BtIqvFU_-BSw_5_uB.js";import{G as $,N as S,j as w,T as E}from"./kmlUtils-C5oIEoOy-DRVPEViK.js";import"./TimeExtent-Cn0Jofqr-BAId6ErU.js";import"./jsonUtils-wIllKWI4-t5R2NYrq.js";import"./parser-DyDJ-rlI-DZU0Ag-H.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-BSzsvZjb.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./PortalItem-CctGdnxF-CSNfUncK.js";import"./portalItemUtils-B8bw6SAG-Cs_YrdZM.js";import"./projection-BA9M1R7d-eP4tAA5p.js";import"./projectBuffer-CvCBvJ6W-Cf0LWf3a.js";import"./ElevationInfo-yv2-9tj6-DJSwdCPw.js";import"./lengthUtils-DKpMe5qR-JrkNDdaz.js";import"./jsonUtils-C64Zfu7c-Czf6EUuN.js";import"./UniqueValueRenderer-fS5V0Ej1-B4VTfTFP.js";import"./RendererLegendOptions-K3md58-X-B2ip1bvM.js";import"./diffUtils-Cz3Fi8Xb-BBbkwuvd.js";import"./colorRamps-q0bZVhs2-BUnxXS2D.js";import"./sizeVariableUtils-t52KcLLi-D0hbQF8b.js";import"./visualVariableUtils-D3kZJRyn-F28x3z4G.js";import"./compilerUtils-CV1QYWI8-aeoqh0pb.js";import"./styleUtils-BtpNqZyT-BGCTFNcj.js";import"./LRUCache-C3erQTWv-Bk81Y5s1.js";import"./Version-CoKzbupV-CwXAAAz-.js";import"./FieldsIndex-HmzMbJQG-BIhL5jnM.js";import"./UnknownTimeZone-C--TOcPG-D05etHke.js";import"./OverrideHelper-DWRbVlj1-DK_z5K0U.js";import"./colorUtils-Cthpxcks-QGjoSbaH.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./utils-SPbpQbmm-B_KNfTyC.js";import"./enums-CpSG_SL3-BMD3Tb1v.js";import"./quantizationUtils-bJy1cRwp-nKjf7ARA.js";import"./heatmapUtils-seiMkkkR-Dzh4e35I.js";import"./FeatureSet-BkVNthuN-DjNHjQbm.js";import"./Field-C6hA1tZj-CGLgMBgo.js";import"./fieldType-CD2CL2hr-CUmnXuIg.js";var u;let a=u=class extends k.EventedMixin(L(I)){constructor(...t){super(...t),this.description=null,this.fullExtent=null,this.id=null,this.networkLink=null,this.parent=null,this.sublayers=null,this.title=null,this.sourceJSON=null,this.layer=null,this.addHandles([f(()=>this.sublayers,"after-add",({item:e})=>{e.parent=this,e.layer=this.layer},p),f(()=>this.sublayers,"after-remove",({item:e})=>{e.layer=e.parent=null},p),y(()=>this.sublayers,(e,i)=>{if(i)for(const s of i)s.layer=s.parent=null;if(e)for(const s of e)s.parent=this,s.layer=this.layer},p),y(()=>this.layer,e=>{if(this.sublayers)for(const i of this.sublayers)i.layer=e},p)])}initialize(){v(()=>this.networkLink).then(()=>v(()=>this.visible===!0)).then(()=>this.load())}load(t){if(!this.networkLink||this.networkLink.viewFormat)return;const e=t!=null?t.signal:null,i=this._fetchService(this._get("networkLink")?.href??"",e).then(s=>{const n=$(s.sublayers);this.fullExtent=d.fromJSON(n),this.sourceJSON=s;const b=_(m.ofType(u),S(u,s));this.sublayers?this.sublayers.addMany(b):this.sublayers=b,this.layer?.emit("sublayer-update"),this.layer&&this.layer.notifyChange("visibleSublayers")});return this.addResolvingPromise(i),Promise.resolve(this)}get visible(){return this._get("visible")}set visible(t){this._get("visible")!==t&&(this._set("visible",t),this.layer&&this.layer.notifyChange("visibleSublayers"))}readVisible(t,e){return!!e.visibility}_fetchService(t,e){return w(t,this.layer.outSpatialReference,this.layer.refreshInterval,e).then(i=>E(i.data))}};r([l()],a.prototype,"description",void 0),r([l({type:d})],a.prototype,"fullExtent",void 0),r([l()],a.prototype,"id",void 0),r([l({readOnly:!0,value:null})],a.prototype,"networkLink",void 0),r([l({json:{write:{allowNull:!0}}})],a.prototype,"parent",void 0),r([l({type:m.ofType(a),json:{write:{allowNull:!0}}})],a.prototype,"sublayers",void 0),r([l({value:null,json:{read:{source:"name",reader:t=>F(t)}}})],a.prototype,"title",void 0),r([l({value:!0})],a.prototype,"visible",null),r([h("visible",["visibility"])],a.prototype,"readVisible",null),r([l()],a.prototype,"sourceJSON",void 0),r([l()],a.prototype,"layer",void 0),a=u=r([c("esri.layers.support.KMLSublayer")],a);const x=a,z=["kml","xml"];let o=class extends N(A(J(K(P(T(C)))))){constructor(...t){super(...t),this._visibleFolders=[],this.allSublayers=new R({getCollections:()=>[this.sublayers],getChildrenFunction:e=>e.sublayers}),this.outSpatialReference=g.WGS84,this.path=null,this.legendEnabled=!1,this.operationalLayerType="KML",this.sublayers=null,this.type="kml",this.url=null}initialize(){this.addHandles([y(()=>this.sublayers,(t,e)=>{e&&e.forEach(i=>{i.parent=null,i.layer=null}),t&&t.forEach(i=>{i.parent=this,i.layer=this})},p),this.on("sublayer-update",()=>this.notifyChange("fullExtent"))])}normalizeCtorArgs(t,e){return typeof t=="string"?{url:t,...e}:t}readSublayersFromItemOrWebMap(t,e){this._visibleFolders=e.visibleFolders}readSublayers(t,e,i){return S(x,e,i,this._visibleFolders)}writeSublayers(t,e){const i=[],s=t.toArray();for(;s.length;){const n=s[0];n.networkLink||(n.visible&&i.push(n.id),n.sublayers&&s.push(...n.sublayers.toArray())),s.shift()}e.visibleFolders=i}get title(){const t=this._get("title");return t&&this.originOf("title")!=="defaults"?t:this.url?O(this.url,z)||"KML":t}set title(t){this._set("title",t)}get visibleSublayers(){const t=this.sublayers,e=[],i=s=>{s.visible&&(e.push(s),s.sublayers&&s.sublayers.forEach(i))};return t&&t.forEach(i),e}get fullExtent(){return this._recomputeFullExtent()}load(t){const e=t!=null?t.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["KML"],supportsData:!1},t).catch(j).then(()=>this._fetchService(e))),Promise.resolve(this)}destroy(){super.destroy(),this.allSublayers.destroy()}async _fetchService(t){const e=await Promise.resolve().then(()=>this.resourceInfo?{ssl:!1,data:this.resourceInfo}:w(this.url??"",this.outSpatialReference,this.refreshInterval,t)),i=E(e.data);i&&this.read(i,{origin:"service"})}_recomputeFullExtent(){let t=null;this.extent!=null&&(t=this.extent.clone());const e=i=>{if(i.sublayers)for(const s of i.sublayers.items)e(s),s.visible&&s.fullExtent&&(t!=null?t.union(s.fullExtent):t=s.fullExtent.clone())};return e(this),t}};r([l({readOnly:!0})],o.prototype,"allSublayers",void 0),r([l({type:g})],o.prototype,"outSpatialReference",void 0),r([l({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],o.prototype,"path",void 0),r([l({readOnly:!0,json:{read:!1,write:!1}})],o.prototype,"legendEnabled",void 0),r([l({type:["show","hide","hide-children"]})],o.prototype,"listMode",void 0),r([l({type:["KML"]})],o.prototype,"operationalLayerType",void 0),r([l({})],o.prototype,"resourceInfo",void 0),r([l({type:m.ofType(x),json:{write:{ignoreOrigin:!0}}})],o.prototype,"sublayers",void 0),r([h(["web-map","portal-item"],"sublayers",["visibleFolders"])],o.prototype,"readSublayersFromItemOrWebMap",null),r([h("service","sublayers",["sublayers"])],o.prototype,"readSublayers",null),r([M("sublayers")],o.prototype,"writeSublayers",null),r([l({readOnly:!0,json:{read:!1}})],o.prototype,"type",void 0),r([l({json:{origins:{"web-map":{read:{source:"title"}}},write:{ignoreOrigin:!0}}})],o.prototype,"title",null),r([l(W)],o.prototype,"url",void 0),r([l({readOnly:!0})],o.prototype,"visibleSublayers",null),r([l({type:d})],o.prototype,"extent",void 0),r([l()],o.prototype,"fullExtent",null),o=r([c("esri.layers.KMLLayer")],o);const Kt=o;export{Kt as default};
