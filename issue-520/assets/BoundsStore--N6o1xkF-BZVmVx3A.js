import{K as o,h6 as h}from"./main-CsB5uMDq.js";import{N as a}from"./PooledRBush-DbfAmeLn-CzLEdhjH.js";const _=5e4,n={minX:0,minY:0,maxX:0,maxY:0};function u(d){n.minX=d[0],n.minY=d[1],n.maxX=d[2],n.maxY=d[3]}function l(d,i,s){u(i),d.search(n,s)}class B{constructor(){this._indexInvalid=!1,this._boundsToLoad=[],this._boundsById=new Map,this._idByBounds=new Map,this._index=new a(9,o("esri-csp-restrictions")?i=>({minX:i[0],minY:i[1],maxX:i[2],maxY:i[3]}):["[0]","[1]","[2]","[3]"]),this._loadIndex=()=>{if(this._indexInvalid){const i=new Array(this._idByBounds.size);let s=0;this._idByBounds.forEach((t,e)=>{i[s++]=e}),this._indexInvalid=!1,this._index.clear(),this._index.load(i)}else this._boundsToLoad.length&&(this._index.load(Array.from(new Set(this._boundsToLoad.filter(i=>this._idByBounds.has(i))))),this._boundsToLoad.length=0)}}get fullBounds(){if(!this._boundsById.size)return null;const i=h();for(const s of this._boundsById.values())s&&(i[0]=Math.min(s[0],i[0]),i[1]=Math.min(s[1],i[1]),i[2]=Math.max(s[2],i[2]),i[3]=Math.max(s[3],i[3]));return i}get valid(){return!this._indexInvalid}clear(){this._indexInvalid=!1,this._boundsToLoad.length=0,this._boundsById.clear(),this._idByBounds.clear(),this._index.clear()}delete(i){const s=this._boundsById.get(i);this._boundsById.delete(i),s&&(this._idByBounds.delete(s),this._indexInvalid||this._index.remove(s))}forEachInBounds(i,s){this._loadIndex(),l(this._index,i,t=>s(this._idByBounds.get(t)))}get(i){return this._boundsById.get(i)}has(i){return this._boundsById.has(i)}invalidateIndex(){this._indexInvalid||(this._indexInvalid=!0,this._boundsToLoad.length=0)}set(i,s){if(!this._indexInvalid){const t=this._boundsById.get(i);t&&(this._index.remove(t),this._idByBounds.delete(t))}this._boundsById.set(i,s),s&&(this._idByBounds.set(s,i),this._indexInvalid||(this._boundsToLoad.push(s),this._boundsToLoad.length>_&&this._loadIndex()))}}export{B as r};
