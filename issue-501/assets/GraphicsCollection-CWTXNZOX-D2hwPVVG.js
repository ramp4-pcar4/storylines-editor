import{v as r,S as p,i as a,ea as w,bi as l,bG as y,ag as o,eb as _,am as c}from"./main-BLGVPR4E.js";let s=class extends o{constructor(e){super(e),this.addHandles([this.on("before-add",t=>{t.item==null&&t.preventDefault()}),this.on("after-add",t=>this._own(t.item)),this.on("after-remove",t=>this._release(t.item))])}get owner(){return this._get("owner")}set owner(e){e!==this._get("owner")&&(this._releaseAll(),this._set("owner",e),this._ownAll())}_ownAll(){for(const e of this.items)this._own(e)}_releaseAll(){for(const e of this.items)this._release(e)}_createNewInstance(e){return this.itemType?new(o.ofType(this.itemType.Type))(e):new o(e)}};function u(e,t){return{type:e,cast:_,set(h){const n=c(h,this._get(t),e);n.owner=this,this._set(t,n)}}}r([p()],s.prototype,"owner",null),s=r([a("esri.core.support.OwningCollection")],s);let i=class extends s{_own(e){e.layer&&"remove"in e.layer&&e.layer!==this.owner&&e.layer.remove(e),e.layer=this.owner}_release(e){e.layer===this.owner&&(e.layer=null)}};r([w({Type:l,ensureType:y(l)})],i.prototype,"itemType",void 0),i=r([a("esri.support.GraphicsCollection")],i);export{i as o,s,u};
