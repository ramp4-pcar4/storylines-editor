const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./deleteForwardEdits-BHWvOnK8-BP_AwKRJ.js","./main-gpNb-fIA.js","./main-DDePfy-e.css","./utils-9sQxfkoa-Cu9SoasQ.js","./DeleteForwardEditsParameters-C-_YAZEH-D0XP3dIo.js"])))=>i.map(i=>d[i]);
import{I as R,v as E,S as L,i as k,f as P,_ as w,b as T,P as m}from"./main-gpNb-fIA.js";import{c as x}from"./uuid-Dj9mdEVg-BaKSCiyT.js";const D=x(),j=new Map,V=new Map;async function O(e,r,d){if(!e||!d)return!1;if(!r)return!0;const s=new URL(e).host;let i=j.get(s);if(!i){const t=e.replace(/\/FeatureServer/i,"/VersionManagementServer").replace(/\/\d*$/,"");i=(await P(t,{responseType:"json",query:{f:"json"}})).data.defaultVersionName}return i===r}async function z(e,r,d=!1){if(!e||!r)return!0;const s=e.replace(/\/FeatureServer/i,"/VersionManagementServer").replace(/\/\d*$/,""),i=V.get(s)?.entries();if(i){for(const[t,o]of i)if(o.name===r){const a=!o.stack?.hasForwardEdits();if(!a&&d){const[{deleteForwardEdits:u},{default:h}]=await Promise.all([w(()=>import("./deleteForwardEdits-BHWvOnK8-BP_AwKRJ.js"),__vite__mapDeps([0,1,2,3]),import.meta.url),w(()=>import("./DeleteForwardEditsParameters-C-_YAZEH-D0XP3dIo.js"),__vite__mapDeps([4,1,2]),import.meta.url)]),c=await u(s,t,new h({sessionId:D,moment:o.moment}));return c.success&&o.stack?.clearForwardEdits(),c.success}return a}}return!0}function $(e,r){if(!e)return!1;const d=e.replace(/\/FeatureServer/i,"/VersionManagementServer").replace(/\/\d*$/,""),s=V.get(d)?.entries();if(s){for(const[i,t]of s)if(t.name===r)return t.lockType==="edit"}return!1}const I=new R.EventEmitter;function N(e){return I.on("apply-edits",new WeakRef(e))}function W(e){return I.on("update-moment",new WeakRef(e))}function C(e,r,d=null,s=!1){const i=T();return s=r==null||s,I.emit("apply-edits",{serviceUrl:e,layerId:r,gdbVersion:d,mayReceiveServiceEdits:s,result:i.promise}),i}const A=Symbol();function G(e){return e!=null&&typeof e=="object"&&A in e}function p(e){return e!=null&&typeof e=="object"&&"gdbVersion"in e}function g(e,r,d){const s=new URL(e).host,i=j.get(s),t=o=>!o||o===i;return t(r)&&t(d)||r===d}const J=e=>{var r;let d=class extends e{constructor(...s){super(...s),this[r]=!0,this._applyEditsHandler=i=>{const{serviceUrl:t,layerId:o,gdbVersion:a,mayReceiveServiceEdits:u,result:h}=i,c=t===this.url,f=o!=null&&this.layerId!=null&&o===this.layerId,S=p(this),H=p(this)&&g(t,a,this.gdbVersion);if(!c||S&&!H||!f&&!u)return;const U=h.then(n=>{if(this.lastEditsEventDate=new Date,f&&(n.addedFeatures.length||n.updatedFeatures.length||n.deletedFeatures.length||n.addedAttachments.length||n.updatedAttachments.length||n.deletedAttachments.length))return this.emit("edits",m(n)),n;const M=n.editedFeatures?.find(({layerId:F})=>F===this.layerId);if(M){const{adds:F,updates:y,deletes:v}=M.editedFeatures,_={edits:null,addedAttachments:[],deletedAttachments:[],updatedAttachments:[],addedFeatures:F?F.map(({attributes:l})=>({objectId:this.objectIdField&&l[this.objectIdField],globalId:this.globalIdField&&l[this.globalIdField]})):[],deletedFeatures:v?v.map(({attributes:l})=>({objectId:this.objectIdField&&l[this.objectIdField],globalId:this.globalIdField&&l[this.globalIdField]})):[],updatedFeatures:y?y.map(({current:{attributes:l}})=>({objectId:this.objectIdField&&l[this.objectIdField],globalId:this.globalIdField&&l[this.globalIdField]})):[],editedFeatures:m(n.editedFeatures),exceededTransferLimit:!1,historicMoment:m(n.historicMoment)};return this.emit("edits",_),_}const b={edits:null,addedAttachments:[],deletedAttachments:[],updatedAttachments:[],addedFeatures:[],deletedFeatures:[],updatedFeatures:[],editedFeatures:m(n.editedFeatures),exceededTransferLimit:!1,historicMoment:m(n.historicMoment)};return"historicMoment"in this&&this._shouldUpdateHistoricMoment(t,a,b.historicMoment)&&this.emit("edits",b),b}).then(n=>("historicMoment"in this&&this._shouldUpdateHistoricMoment(t,a,n.historicMoment)&&(this.historicMoment=n.historicMoment),n));this.emit("apply-edits",{result:U})},this._updateMomentHandler=i=>{const{serviceUrl:t,gdbVersion:o,moment:a}=i,u=t===this.url,h=p(this),c=p(this)&&g(t,o,this.gdbVersion),f=p(this)&&!g(t,this.gdbVersion,null);u&&h&&c&&f&&"historicMoment"in this&&this.historicMoment!==a&&(this.historicMoment=a)},this.when().then(()=>{this.addHandles(N(this._applyEditsHandler)),"historicMoment"in this&&this.addHandles(W(this._updateMomentHandler))},()=>{})}_shouldUpdateHistoricMoment(s,i,t){return"historicMoment"in this&&this.historicMoment!==t&&$(s,i)}};return r=A,E([L()],d.prototype,"lastEditsEventDate",void 0),d=E([k("esri.layers.mixins.EditBusLayer")],d),d};export{G as B,J as C,$ as H,O as P,z as W,D as j,C as z};
