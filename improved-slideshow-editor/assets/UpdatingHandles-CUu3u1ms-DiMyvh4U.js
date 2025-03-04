import{v as r,S as _,i as p,j as u,ah as o,aF as g,ai as c,av as m,a2 as h,aQ as H}from"./main-Csa2lEpO.js";let l=class extends u{constructor(){super(...arguments),this.updating=!1,this._handleId=0,this._scheduleHandleId=0,this._pendingPromises=new Set}destroy(){this.removeAll()}add(e,t,s={}){return this._installWatch(e,t,s,o)}addWhen(e,t,s={}){return this._installWatch(e,t,s,g)}addOnCollectionChange(e,t,{initial:s=!1,final:n=!1}={}){const a=++this._handleId;return this.addHandles([c(e,"after-changes",this._createSyncUpdatingCallback(),m),c(e,"change",t,{onListenerAdd:s?d=>t({added:d.toArray(),removed:[]}):void 0,onListenerRemove:n?d=>t({added:[],removed:d.toArray()}):void 0})],a),h(()=>this.removeHandles(a))}addPromise(e){if(e==null)return e;const t=++this._handleId;this.addHandles(h(()=>{this._pendingPromises.delete(e)&&(this._pendingPromises.size!==0||this.hasHandles(i)||this._set("updating",!1))}),t),this._pendingPromises.add(e),this._set("updating",!0);const s=()=>this.removeHandles(t);return e.then(s,s),e}removeAll(){this._pendingPromises.clear(),this.removeAllHandles(),this._set("updating",!1)}_installWatch(e,t,s={},n){const a=++this._handleId;s.sync||this._installSyncUpdatingWatch(e,a);const d=n(e,t,s);return this.addHandles(d,a),h(()=>this.removeHandles(a))}_installSyncUpdatingWatch(e,t){const s=this._createSyncUpdatingCallback(),n=o(e,s,{sync:!0,equals:()=>!1});return this.addHandles(n,t),n}_createSyncUpdatingCallback(){return()=>{this.removeHandles(i),++this._scheduleHandleId;const e=this._scheduleHandleId;this._get("updating")||this._set("updating",!0),this.addHandles(H(()=>{e===this._scheduleHandleId&&(this._set("updating",this._pendingPromises.size>0),this.removeHandles(i))}),i)}}};r([_({readOnly:!0})],l.prototype,"updating",void 0),l=r([p("esri.core.support.UpdatingHandles")],l);const i=-42;export{l as i};
