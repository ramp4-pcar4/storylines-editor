const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./layersLoader-CYI-LpLl-BuN3bswr.js","./main-8gcLRx1v.js","./main-BI1Cc2qD.css","./arcgisLayerUrl-HNYh8jvG-DwlkVRWY.js","./fetchService-DbaKmJhP-Dic41xyX.js","./portalLayers-Bh9bAhk4-BE6n2ffx.js","./associatedFeatureServiceUtils-Bu76-Sxs-BwgGOS6N.js","./PortalItem-CctGdnxF-CePmfc6n.js","./portalItemUtils-B8bw6SAG-st604wb_.js","./projection-BA9M1R7d-Di6ZS0V1.js","./projectBuffer-CvCBvJ6W-BesdUF9o.js","./layersCreator-CW56kDKc-DCJtrX00.js","./styleUtils-ChrJTYIw-CVY3sFLZ.js","./jsonContext-BA8GHqVk-BtwbWRlq.js"])))=>i.map(i=>d[i]);
import{v as l,S as d,a0 as w,ac as _,i as U,aA as E,_ as H,$ as b,aU as $,a1 as F,W as n,C as L,dr as T,ds as k,V as m,r as y,k as I,b6 as x,f as D,dt as O,Q as S,o as B}from"./main-8gcLRx1v.js";import f from"./PortalItem-CctGdnxF-CePmfc6n.js";import{m as v}from"./portalItemUtils-B8bw6SAG-st604wb_.js";const V=P=>{let a=class extends P{constructor(){super(...arguments),this.resourceReferences={portalItem:null,paths:[]},this.userHasEditingPrivileges=!0,this.userHasFullEditingPrivileges=!1,this.userHasUpdateItemPrivileges=!1}destroy(){this.portalItem=E(this.portalItem),this.resourceReferences.portalItem=null,this.resourceReferences.paths.length=0}set portalItem(r){r!==this._get("portalItem")&&(this.removeOrigin("portal-item"),this._set("portalItem",r))}readPortalItem(r,e,t){if(e.itemId)return new f({id:e.itemId,portal:t?.portal})}writePortalItem(r,e){r?.id&&(e.itemId=r.id)}async loadFromPortal(r,e){if(this.portalItem?.id)try{const{load:t}=await H(()=>import("./layersLoader-CYI-LpLl-BuN3bswr.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]),import.meta.url);return b(e),await t({instance:this,supportedTypes:r.supportedTypes,validateItem:r.validateItem,supportsData:r.supportsData,layerModuleTypeMap:r.layerModuleTypeMap},e)}catch(t){throw $(t)||F.getLogger(this).warn(`Failed to load layer (${this.title}, ${this.id}) portal item (${this.portalItem.id})
  ${t}`),t}}async finishLoadEditablePortalLayer(r){this._set("userHasEditingPrivileges",await this._fetchUserHasEditingPrivileges(r).catch(e=>(n(e),!0)))}async setUserPrivileges(r,e){if(!L.userPrivilegesApplied)return this.finishLoadEditablePortalLayer(e);if(this.url)try{const{features:{edit:t,fullEdit:i},content:{updateItem:s}}=await this._fetchUserPrivileges(r,e);this._set("userHasEditingPrivileges",t),this._set("userHasFullEditingPrivileges",i),this._set("userHasUpdateItemPrivileges",s)}catch(t){n(t)}}async _fetchUserPrivileges(r,e){let t=this.portalItem;if(!r||!t||!t.loaded||t.sourceUrl)return this._fetchFallbackUserPrivileges(e);const i=r===t.id;if(i&&t.portal.user)return v(t);let s,p;if(i)s=t.portal.url;else try{s=await T(this.url,e)}catch(o){n(o)}if(!s||!k(s,t.portal.url))return this._fetchFallbackUserPrivileges(e);try{const o=e!=null?e.signal:null;p=await m?.getCredential(`${s}/sharing`,{prompt:!1,signal:o})}catch(o){n(o)}const c=!0,u=!1,g=!1;if(!p)return{features:{edit:c,fullEdit:u},content:{updateItem:g}};try{if(i?await t.reload():(t=new f({id:r,portal:{url:s}}),await t.load(e)),t.portal.user)return v(t)}catch(o){n(o)}return{features:{edit:c,fullEdit:u},content:{updateItem:g}}}async _fetchFallbackUserPrivileges(r){let e=!0;try{e=await this._fetchUserHasEditingPrivileges(r)}catch(t){n(t)}return{features:{edit:e,fullEdit:!1},content:{updateItem:!1}}}async _fetchUserHasEditingPrivileges(r){const e=this.url?m?.findCredential(this.url):null;if(!e)return!0;const t=h.credential===e?h.user:await this._fetchEditingUser(r);return h.credential=e,h.user=t,t?.privileges==null||t.privileges.includes("features:user:edit")}async _fetchEditingUser(r){const e=this.portalItem?.portal?.user;if(e)return e;const t=m?.findServerInfo(this.url??"");if(!t?.owningSystemUrl)return null;const i=`${t.owningSystemUrl}/sharing/rest`,s=y.getDefault();if(s&&s.loaded&&I(s.restUrl)===I(i))return s.user;const p=`${i}/community/self`,c=r!=null?r.signal:null,u=await x(D(p,{authMode:"no-prompt",query:{f:"json"},signal:c}));return u.ok?O.fromJSON(u.value.data):null}read(r,e){e&&(e.layer=this),super.read(r,e)}write(r,e){const t=e?.portal,i=this.portalItem?.id&&(this.portalItem.portal||y.getDefault());return t&&i&&!S(i.restUrl,t.restUrl)?(e.messages&&e.messages.push(new B("layer:cross-portal",`The layer '${this.title} (${this.id})' cannot be persisted because it refers to an item on a different portal than the one being saved to. To save, set layer.portalItem to null or save to the same portal as the item associated with the layer`,{layer:this})),null):super.write(r,{...e,layer:this})}};return l([d({type:f})],a.prototype,"portalItem",null),l([w("web-document","portalItem",["itemId"])],a.prototype,"readPortalItem",null),l([_("web-document","portalItem",{itemId:{type:String}})],a.prototype,"writePortalItem",null),l([d({clonable:!1})],a.prototype,"resourceReferences",void 0),l([d({type:Boolean,readOnly:!0})],a.prototype,"userHasEditingPrivileges",void 0),l([d({type:Boolean,readOnly:!0})],a.prototype,"userHasFullEditingPrivileges",void 0),l([d({type:Boolean,readOnly:!0})],a.prototype,"userHasUpdateItemPrivileges",void 0),a=l([U("esri.layers.mixins.PortalLayer")],a),a},h={credential:null,user:null};export{V as C};
