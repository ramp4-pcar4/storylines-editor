import{v as l,i as c,bU as g,dg as N,dh as w,bO as h,bY as J,j as M,di as _,bP as u,P as d,dj as m,aR as U}from"./main-Ce-R8kMh.js";class f{constructor(){this._propertyOriginMap=new Map,this._originStores=new Array(_),this._values=new Map,this.multipleOriginsSupported=!0}clone(e){const t=new f,s=this._originStores[u.DEFAULTS];s&&s.forEach((i,r)=>{t.set(r,d(i),u.DEFAULTS)});for(let i=u.SERVICE;i<_;i++){const r=this._originStores[i];r&&r.forEach((o,n)=>{e&&e.has(n)||t.set(n,d(o),i)})}return t}get(e,t){const s=t===void 0?this._values:this._originStores[t];return s?s.get(e):void 0}keys(e){const t=e==null?this._values:this._originStores[e];return t?[...t.keys()]:[]}set(e,t,s=u.USER){let i=this._originStores[s];if(i||(i=new Map,this._originStores[s]=i),i.set(e,t),!this._values.has(e)||this._propertyOriginMap.get(e)<=s){const r=this._values.get(e);return this._values.set(e,t),this._propertyOriginMap.set(e,s),r!==t}return!1}delete(e,t=u.USER){const s=this._originStores[t];if(!s)return;const i=s.get(e);if(s.delete(e),this._values.has(e)&&this._propertyOriginMap.get(e)===t){this._values.delete(e);for(let r=t-1;r>=0;r--){const o=this._originStores[r];if(o&&o.has(e)){this._values.set(e,o.get(e)),this._propertyOriginMap.set(e,r);break}}}return i}has(e,t){const s=t===void 0?this._values:this._originStores[t];return!!s&&s.has(e)}revert(e,t){for(;t>0&&!this.has(e,t);)--t;const s=this._originStores[t],i=s?.get(e),r=this._values.get(e);return this._values.set(e,i),this._propertyOriginMap.set(e,t),r!==i}originOf(e){return this._propertyOriginMap.get(e)||u.DEFAULTS}forEach(e){this._values.forEach(e)}}const E=a=>{let e=class extends a{constructor(...t){super(...t);const s=g(this),i=s.store,r=new f;s.store=r,N(s,i,r)}read(t,s){w(this,t,s)}getAtOrigin(t,s){const i=O(this),r=h(s);if(typeof t=="string")return i.get(t,r);const o={};return t.forEach(n=>{o[n]=i.get(n,r)}),o}originOf(t){return J(this.originIdOf(t))}originIdOf(t){return O(this).originOf(t)}revert(t,s){const i=O(this),r=h(s),o=g(this);let n;n=typeof t=="string"?t==="*"?i.keys(r):[t]:t,n.forEach(p=>{o.invalidate(p),i.revert(p,r),o.commit(p)})}};return e=l([c("esri.core.ReadOnlyMultiOriginJSONSupport")],e),e};function O(a){return g(a).store}let v=class extends E(M){};v=l([c("esri.core.ReadOnlyMultiOriginJSONSupport")],v);const x=a=>{let e=class extends a{constructor(...t){super(...t)}clear(t,s="user"){return S(this).delete(t,h(s))}write(t,s){return m(this,t=t||{},s),t}setAtOrigin(t,s,i){g(this).setAtOrigin(t,s,h(i))}removeOrigin(t){const s=S(this),i=h(t),r=s.keys(i);for(const o of r)s.originOf(o)===i&&s.set(o,s.get(o,i),u.USER)}updateOrigin(t,s){const i=S(this),r=h(s),o=U(this,t);for(let n=r+1;n<_;++n)i.delete(t,n);i.set(t,o,r)}toJSON(t){return this.write({},t)}};return e=l([c("esri.core.MultiOriginJSONSupport.WriteableMultiOriginJSONSupport")],e),e.prototype.toJSON.isDefaultToJSON=!0,e};function S(a){return g(a).store}const A=a=>{let e=class extends x(E(a)){constructor(...t){super(...t)}};return e=l([c("esri.core.MultiOriginJSONSupport")],e),e};let y=class extends A(M){};y=l([c("esri.core.MultiOriginJSONSupport")],y);export{y as _,A as m};
