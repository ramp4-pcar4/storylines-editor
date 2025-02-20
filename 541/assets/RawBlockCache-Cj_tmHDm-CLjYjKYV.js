import{w as Q}from"./main-B-qqJ5ov.js";import{o as E,W as G,Q as K}from"./rasterProjectionHelper-Calp0o_1-DzHEzUt2.js";class L{constructor(n=15e3,e=5e3){this._timer=null,this._cachedBlocks=new Map,this._size=-1,this._duration=n,this._interval=Math.min(n,e)}decreaseRefCount(n,e){const t=n+"/"+e,r=this._cachedBlocks;if(r.has(t)){const l=r.get(t);return l.refCount--,l.refCount<=0&&(r.delete(t),l.controller&&l.controller.abort()),l.refCount}return 0}getBlock(n,e){const t=n+"/"+e,r=this._cachedBlocks;if(r.has(t)){const l=r.get(t);return l.ts=Date.now(),l.refCount++,r.delete(t),r.set(t,l),l.block}return null}putBlock(n,e,t,r){const l=this._cachedBlocks,c=n+"/"+e;if(l.has(c)){const i=l.get(c);i.ts=Date.now(),i.refCount++}else l.set(c,{block:t,ts:Date.now(),refCount:1,controller:r});this._trim(),this._updateTimer()}deleteBlock(n,e){const t=this._cachedBlocks,r=n+"/"+e;t.has(r)&&t.delete(r)}updateMaxSize(n){this._size=n,this._trim()}empty(){this._cachedBlocks.clear(),this._clearTimer()}getCurrentSize(){return this._cachedBlocks.size}_updateTimer(){if(this._timer!=null)return;const n=this._cachedBlocks;this._timer=setInterval(()=>{const e=Array.from(n),t=Date.now();for(let r=0;r<e.length&&e[r][1].ts<=t-this._duration;r++)n.delete(e[r][0]);n.size===0&&this._clearTimer()},this._interval)}_trim(){const n=this._cachedBlocks;if(this._size===-1||this._size>=n.size)return;const e=Array.from(n);for(let t=0;t<e.length-this._size;t++)n.delete(e[t][0])}_clearTimer(){this._timer!=null&&(clearInterval(this._timer),this._timer=null)}}const u=new Map,h=new L;function V(o,n){return n==null?o:`${o}?sliceId=${n}`}function X(o,n){const e={extent:null,rasterInfo:n,cache:new Map},t=u.get(o);return t?(t.push(e),t.length-1):(u.set(o,[e]),0)}function Y(o,n){const e=u.get(o);e&&(e[n]=null,e.some(t=>t!=null)||u.delete(o))}function Z(o,n,e){const t=u.get(o);if(!t)return n==null?h.decreaseRefCount(o,e):0;if(n==null||t[n]==null)return h.decreaseRefCount(o,e);const r=t[n]?.cache,l=r?.get(e);if(r&&l){if(l.refCount--,l.refCount===0){r.delete(e);for(let c=0;c<t.length;c++)t[c]?.cache.delete(e);l.controller&&l.controller.abort()}return l.refCount}return 0}function q(o,n,e){const t=u.get(o);if(!t)return n==null?h.getBlock(o,e):null;if(n==null||t[n]==null){for(let l=0;l<t.length;l++){const c=t[l]?.cache.get(e);if(c)return c.refCount++,c.block}return h.getBlock(o,e)}const r=t[n]?.cache.get(e);if(r)return r.refCount++,r.block;for(let l=0;l<t.length;l++){if(l===n||!t[l])continue;const c=t[l]?.cache,i=c?.get(e);if(c&&i)return i.refCount++,c.set(e,i),i.block}return null}function F(o,n,e,t,r=null){const l=u.get(o);if(!l)return void(n==null&&h.putBlock(o,e,t,r));if(n==null||l[n]==null)return void h.putBlock(o,e,t,r);const c={refCount:1,block:t,isResolved:!1,isRejected:!1,controller:r};t.then(()=>c.isResolved=!0).catch(()=>c.isRejected=!0),l[n]?.cache.set(e,c)}function J(o,n,e){const t=u.get(o);t?n!=null&&t[n]!=null?t[n]?.cache.delete(e):h.deleteBlock(o,e):n==null&&h.deleteBlock(o,e)}function O(o,n){const e=u.get(o);return e?e[n]??null:null}function N(o,n,e,t,r,l,c=null){const i=O(o,n);if(!i)return;const f=i.extent,{cache:k,rasterInfo:y}=i;if(f&&f.xmin===e.xmin&&f.xmax===e.xmax&&f.ymin===e.ymin&&f.ymax===e.ymax)return;t=t??0;const M=e.clone().normalize(),{spatialReference:R,transform:v}=y,w=new Set;for(let d=0;d<M.length;d++){const a=M[d];if(a.xmax-a.xmin<=t||a.ymax-a.ymin<=t)continue;let s=E(a,R,c);v!=null&&(s=v.inverseTransform(s));const T=new Q({x:t,y:t,spatialReference:a.spatialReference});if(r==null&&!(r=G(T,R,a,c)))return;const{pyramidLevel:p,pyramidResolution:x,excessiveReading:$}=K(r,y,l||"closest");if($)return;const{storageInfo:m}=y,{origin:z}=m,_={x:Math.max(0,Math.floor((s.xmin-z.x)/x.x)),y:Math.max(0,Math.floor((z.y-s.ymax)/x.y))},D=Math.ceil((s.xmax-s.xmin)/x.x-.1),W=Math.ceil((s.ymax-s.ymin)/x.y-.1),b=p>0?m.pyramidBlockWidth:m.blockWidth,I=p>0?m.pyramidBlockHeight:m.blockHeight,g=1,j=Math.max(0,Math.floor(_.x/b)-g),S=Math.max(0,Math.floor(_.y/I)-g),A=Math.floor((_.x+D-1)/b)+g,H=Math.floor((_.y+W-1)/I)+g;for(let B=S;B<=H;B++)for(let C=j;C<=A;C++)w.add(`${p}/${B}/${C}`)}k.forEach((d,a)=>{if(!w.has(a)){const s=k.get(a);(s==null||s.isResolved||s.isRejected)&&k.delete(a)}}),i.extent={xmin:e.xmin,ymin:e.ymin,xmax:e.xmax,ymax:e.ymax}}export{V as K,X as O,Y as P,Z as Q,q as U,F as V,J as X,N as Z};
