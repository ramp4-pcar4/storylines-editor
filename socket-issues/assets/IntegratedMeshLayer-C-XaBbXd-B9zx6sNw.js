import{v as i,S as s,l as _,ac as I,i as h,bA as L,ag as x,a as R,f as b,ai as N,a4 as M,W as $,o as m,a1 as v,a0 as A,e as D,b0 as J,P as j,av as E}from"./main-8gcLRx1v.js";import{m as P}from"./MultiOriginJSONSupport-DKRh9P6w-B19_G15B.js";import{C as c}from"./persistable-C6RBwzJi-C7u2LH5t.js";import{D as U}from"./Layer-ChoECxvZ-DWOKTqkR.js";import{n as V}from"./APIKeyMixin-BUMSx9ny-CUOsfqIo.js";import{a as K}from"./ArcGISService-BYA-y6X6-BZXqdoL2.js";import{i as C}from"./CustomParametersMixin-vdKsTHer-DSDDBlZ9.js";import{E as k}from"./OperationalLayer-B5IXiMa2-CJXHaibP.js";import{C as z}from"./PortalLayer-CElnYuSQ-ibhbyszK.js";import{S as F}from"./ScaleRangeLayer-Bz0DcnvM-Dtg34uoM.js";import{W as G,f as S}from"./SceneService-BZqGtWmG-CnAw0kHC.js";import{$ as W}from"./commonProperties-BtIqvFU_-CVWnJ3rF.js";import{y as q,o as H,d as Y,m as B}from"./I3SLayerDefinitions-CwLXCKtU-DxDNR9Pd.js";import{J as Q,a as X}from"./projection-BA9M1R7d-Di6ZS0V1.js";import{k as w,R as Z,j as ee}from"./elevationInfoUtils-mOZsPH2J-BllBbb2N.js";import"./MD5-CHHr-oed-SuyrCYQ0.js";import"./multiOriginJSONSupportUtils-DGETddQl-BrWaY9_8.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./resourceExtension-CdQvIDKV-0OG-Pe_5.js";import"./TimeExtent-Cn0Jofqr-OedIfvbi.js";import"./arcgisLayerUrl-HNYh8jvG-DwlkVRWY.js";import"./PortalItem-CctGdnxF-CePmfc6n.js";import"./portalItemUtils-B8bw6SAG-st604wb_.js";import"./originUtils-BLsWtgV9-B4sclfuf.js";import"./HeightModelInfo-C5vFqzyF-BR7po63-.js";import"./jsonContext-BA8GHqVk-BtwbWRlq.js";import"./resourceUtils-BmW6QqlX-DiqvFM5l.js";import"./resourceUtils-rTM6Iemx-D9JrUO0E.js";import"./saveUtils-CIYk-dsQ-Bk0Wdr5p.js";import"./ElevationInfo-yv2-9tj6-LlKwjcnF.js";import"./lengthUtils-DKpMe5qR-y_E_gMwN.js";import"./projectBuffer-CvCBvJ6W-BesdUF9o.js";var f;let n=f=class extends D{constructor(e){super(e),this.geometry=null,this.type="clip"}writeGeometry(e,t,r,a){if(a.layer?.spatialReference&&!a.layer.spatialReference.equals(this.geometry.spatialReference)){if(!Q(e.spatialReference,a.layer.spatialReference))return void(a?.messages&&a.messages.push(new J("scenemodification:unsupported","Scene modifications with incompatible spatial references are not supported",{modification:this,spatialReference:a.layer.spatialReference,context:a})));const l=new _;X(e,l,a.layer.spatialReference),t[r]=l.toJSON(a)}else t[r]=e.toJSON(a);delete t[r].spatialReference}clone(){return new f({geometry:j(this.geometry),type:this.type})}};i([s({type:_}),c()],n.prototype,"geometry",void 0),i([I(["web-scene","portal-item"],"geometry")],n.prototype,"writeGeometry",null),i([s({type:["clip","mask","replace"],nonNullable:!0}),c()],n.prototype,"type",void 0),n=f=i([h("esri.layers.support.SceneModification")],n);const d=n;var p;let y=p=class extends L(x.ofType(d)){constructor(e){super(e),this.url=null}clone(){return new p({url:this.url,items:this.items.map(e=>e.clone())})}toJSON(e){return this.toArray().map(t=>t.toJSON(e)).filter(t=>!!t.geometry)}static fromJSON(e,t){const r=new p;for(const a of e)r.add(d.fromJSON(a,t));return r}static async fromUrl(e,t,r){const a={url:R(e),origin:"service"},l=await b(e,{responseType:"json",signal:r?.signal}),O=t.toJSON(),u=[];for(const g of l.data)u.push(d.fromJSON({...g,geometry:{...g.geometry,spatialReference:O}},a));return new p({url:e,items:u})}};i([s({type:String})],y.prototype,"url",void 0),y=p=i([h("esri.layers.support.SceneModifications")],y);const T=y;let o=class extends G(K(k(z(F(P(C(V(U)))))))){constructor(...e){super(...e),this.geometryType="mesh",this.operationalLayerType="IntegratedMeshLayer",this.type="integrated-mesh",this.nodePages=null,this.materialDefinitions=null,this.textureSetDefinitions=null,this.geometryDefinitions=null,this.serviceUpdateTimeStamp=null,this.profile="mesh-pyramids",this.modifications=null,this._modificationsSource=null,this.path=null,this.definitionExpression=null}initialize(){this.addHandles(N(()=>this.modifications,"after-changes",()=>this.modifications=this.modifications,E))}normalizeCtorArgs(e,t){return typeof e=="string"?{url:e,...t}:e}readModifications(e,t,r){this._modificationsSource={url:M(e,r),context:r}}set elevationInfo(e){this._set("elevationInfo",e),this._validateElevationInfo()}async load(e){return this.addResolvingPromise(this._doLoad(e)),this}async _doLoad(e){const t=e?.signal;try{await this.loadFromPortal({supportedTypes:["Scene Service"]},e)}catch(r){$(r)}if(await this._fetchService(t),this._modificationsSource!=null){const r=await T.fromUrl(this._modificationsSource.url,this.spatialReference,e);this.setAtOrigin("modifications",r,this._modificationsSource.context.origin),this._modificationsSource=null}await this._fetchIndexAndUpdateExtent(this.nodePages,t)}beforeSave(){if(this._modificationsSource!=null)return this.load().then(()=>{},()=>{})}async saveAs(e,t){return this._debouncedSaveOperations(S.SAVE_AS,{...t,getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"integrated-mesh"},e)}async save(){const e={getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"integrated-mesh"};return this._debouncedSaveOperations(S.SAVE,e)}validateLayer(e){if(e.layerType&&e.layerType!=="IntegratedMesh")throw new m("integrated-mesh-layer:layer-type-not-supported","IntegratedMeshLayer does not support this layer type",{layerType:e.layerType});if(isNaN(this.version.major)||isNaN(this.version.minor))throw new m("layer:service-version-not-supported","Service version is not supported.",{serviceVersion:this.version.versionString,supportedVersions:"1.x"});if(this.version.major>1)throw new m("layer:service-version-too-new","Service version is too new.",{serviceVersion:this.version.versionString,supportedVersions:"1.x"})}_getTypeKeywords(){return["IntegratedMeshLayer"]}_validateElevationInfo(){const e=this.elevationInfo,t="Integrated mesh layers";w(v.getLogger(this),Z(t,"absolute-height",e)),w(v.getLogger(this),ee(t,e))}};i([s({type:String,readOnly:!0})],o.prototype,"geometryType",void 0),i([s({type:["show","hide"]})],o.prototype,"listMode",void 0),i([s({type:["IntegratedMeshLayer"]})],o.prototype,"operationalLayerType",void 0),i([s({json:{read:!1},readOnly:!0})],o.prototype,"type",void 0),i([s({type:q,readOnly:!0})],o.prototype,"nodePages",void 0),i([s({type:[H],readOnly:!0})],o.prototype,"materialDefinitions",void 0),i([s({type:[Y],readOnly:!0})],o.prototype,"textureSetDefinitions",void 0),i([s({type:[B],readOnly:!0})],o.prototype,"geometryDefinitions",void 0),i([s({readOnly:!0})],o.prototype,"serviceUpdateTimeStamp",void 0),i([s({type:T}),c({origins:["web-scene","portal-item"],type:"resource",prefix:"modifications"})],o.prototype,"modifications",void 0),i([A(["web-scene","portal-item"],"modifications")],o.prototype,"readModifications",null),i([s(W)],o.prototype,"elevationInfo",null),i([s({type:String,json:{origins:{"web-scene":{read:!0,write:!0},"portal-item":{read:!0,write:!0}},read:!1}})],o.prototype,"path",void 0),o=i([h("esri.layers.IntegratedMeshLayer")],o);const De=o;export{De as default};
