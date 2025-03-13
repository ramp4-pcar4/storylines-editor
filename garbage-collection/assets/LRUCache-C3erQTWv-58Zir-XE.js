import{dD as d}from"./main-DG3mLaAJ.js";const c=-3,f=c-1;var n;(function(_){_[_.ALL=0]="ALL",_[_.SOME=1]="SOME"})(n||(n={}));class g{get size(){return this._size}constructor(i=10485760){this._maxSize=i,this._db=new Map,this._size=0,this._hit=0,this._miss=0,this._removeFuncs=new d,this._users=new d}destroy(){this.clearAll(),this._removeFuncs.clear(),this._users.clear(),this._db=null}register(i){this._users.push(i)}deregister(i){this._users.removeUnordered(i)}registerRemoveFunc(i,t){this._removeFuncs.push([i,t])}deregisterRemoveFunc(i){this._removeFuncs.filterInPlace(t=>t[0]!==i)}get maxSize(){return this._maxSize}set maxSize(i){this._maxSize=Math.max(i,-1),this._checkSize()}getSize(i,t){return this._db.get(i.id+t)?.size??0}put(i,t,e,r,h){t=i.id+t;const s=this._db.get(t);if(s&&(this._size-=s.size,i.size-=s.size,this._db.delete(t),s.entry!==e&&this._notifyRemove(t,s.entry,s.size,n.ALL)),r>this._maxSize)return void this._notifyRemove(t,e,r,n.ALL);if(e===void 0)return void console.warn("Refusing to cache undefined entry ");if(!r||r<0)return console.warn(`Refusing to cache entry with size ${r} for key ${t}`),void this._notifyRemove(t,e,0,n.ALL);const o=1+Math.max(h,f)-c;this._db.set(t,new S(e,r,o)),this._size+=r,i.size+=r,this._checkSize()}updateSize(i,t,e,r){t=i.id+t;const h=this._db.get(t);if(h&&h.entry===e){for(this._size-=h.size,i.size-=h.size;r>this._maxSize;){const s=this._notifyRemove(t,e,r,n.SOME);if(!(s!=null&&s>0))return void this._db.delete(t);r=s}h.size=r,this._size+=r,i.size+=r,this._checkSize()}}pop(i,t){t=i.id+t;const e=this._db.get(t);if(e)return this._size-=e.size,i.size-=e.size,this._db.delete(t),++this._hit,e.entry;++this._miss}get(i,t){t=i.id+t;const e=this._db.get(t);if(e!==void 0)return this._db.delete(t),e.lives=e.lifetime,this._db.set(t,e),++this._hit,e.entry;++this._miss}peek(i,t){const e=this._db.get(i.id+t);return e?++this._hit:++this._miss,e?.entry}get performanceInfo(){const i={Size:Math.round(this._size/1048576)+"/"+Math.round(this._maxSize/1048576)+"MB","Hit rate":Math.round(100*this._getHitRate())+"%",Entries:this._db.size.toString()},t={},e=new Array;this._db.forEach((s,o)=>{const a=s.lifetime;e[a]=(e[a]||0)+s.size,this._users.forAll(u=>{const{id:m,name:z}=u;if(o.startsWith(m)){const l=t[z]||0;t[z]=l+s.size}})});const r={};this._users.forAll(s=>{const o=s.name;if("hitRate"in s&&typeof s.hitRate=="number"&&!isNaN(s.hitRate)&&s.hitRate>0){const a=t[o]||0;t[o]=a,r[o]=Math.round(100*s.hitRate)+"%"}else r[o]="0%"});const h=Object.keys(t);h.sort((s,o)=>t[o]-t[s]),h.forEach(s=>i[s]=Math.round(t[s]/2**20)+"MB / "+r[s]);for(let s=e.length-1;s>=0;--s){const o=e[s];o&&(i["Priority "+(s+c-1)]=Math.round(o/this._size*100)+"%")}return i}resetStats(){this._hit=this._miss=0,this._users.forAll(i=>i.resetHitRate())}clear(i){const t=i.id;this._db.forEach((e,r)=>{r.startsWith(t)&&(this._size-=e.size,this._db.delete(r),this._notifyRemove(r,e.entry,e.size,n.ALL))}),i.size=0}clearAll(){this._db.forEach((i,t)=>this._notifyRemove(t,i.entry,i.size,n.ALL)),this._users.forAll(i=>i.size=0),this._size=0,this._db.clear()}_getHitRate(){return this._hit/(this._hit+this._miss)}_notifyRemove(i,t,e,r){let h;return this._removeFuncs.some(s=>{if(i.startsWith(s[0])){const o=s[1](t,r,e);return typeof o=="number"&&(h=o),!0}return!1}),h}_checkSize(){this._users.forAll(i=>this._checkSizeLimits(i)),this._checkSizeLimits()}_checkSizeLimits(i){const t=i??this;if(t.maxSize<0||t.size<=t.maxSize)return;const e=i?.id;let r=!0;for(;r;){r=!1;for(const[h,s]of this._db)if(s.lifetime===0&&(!e||h.startsWith(e))){if(this._purgeItem(h,s,i),t.size<=.9*t.maxSize)return;r||=this._db.has(h)}}for(const[h,s]of this._db)if((!e||h.startsWith(e))&&(this._purgeItem(h,s,i),t.size<=.9*t.maxSize))return}_purgeItem(i,t,e=this._users.find(r=>i.startsWith(r.id))){if(this._db.delete(i),t.lives<=1){this._size-=t.size,e&&(e.size-=t.size);const r=this._notifyRemove(i,t.entry,t.size,n.SOME);r!=null&&r>0&&(this._size+=r,e&&(e.size+=r),t.lives=t.lifetime,t.size=r,this._db.set(i,t))}else--t.lives,this._db.set(i,t)}}class S{constructor(i,t,e){this.entry=i,this.size=t,this.lifetime=e,this.lives=e}}class v{constructor(i,t){this._storage=new g,this.id="",this.name="",this.size=0,this._storage.maxSize=i,this._storage.register(this),t&&this._storage.registerRemoveFunc("",t)}destroy(){this._storage.deregister(this),this._storage.destroy()}put(i,t,e=1){this._storage.put(this,i,t,e,1)}pop(i){return this._storage.pop(this,i)}get(i){return this._storage.get(this,i)}clear(){this._storage.clearAll()}get maxSize(){return this._storage.maxSize}set maxSize(i){this._storage.maxSize=i}resetHitRate(){}}export{v as b};
