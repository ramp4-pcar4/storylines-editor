import{v as r,S as s,i as a}from"./main-B-qqJ5ov.js";function n(i){return"portalItem"in i}const l=i=>{let e=class extends i{get apiKey(){return this._isOverridden("apiKey")?this._get("apiKey"):n(this)?this.portalItem?.apiKey:null}set apiKey(t){t!=null?this._override("apiKey",t):(this._clearOverride("apiKey"),this.clear("apiKey","user"))}};return r([s({type:String})],e.prototype,"apiKey",null),e=r([a("esri.layers.mixins.APIKeyMixin")],e),e};export{l as n};
