import{n as rt}from"./common-CYWrYyJl-E8-sukrT.js";import{ec as lt,v as b,S as F,i as at,aG as H,j as ht,aA as ct,an as ut,ed as ft,bh as W,n as mt,ba as dt,ee as pt}from"./main-Cs_aiUdl.js";import{s as L}from"./TileKey-C5IL-JBr-BdeLQOWf.js";import{f as gt,M as $}from"./vec2-tHZ6OaOy-xCj1obDt.js";import{k as _t}from"./QueueProcessor-DbfV9fLy-BmkWX0Xd.js";import{b as yt}from"./quickselect-DHTstthl-Ds_Aj0x5.js";import{a as xt}from"./Query-BrwMGK8U-DQSiC4Cc.js";function vt(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t}function Mt(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t}function wt(t,e,i,s,o,n,r){return t[0]=e,t[1]=i,t[2]=s,t[3]=o,t[4]=n,t[5]=r,t}function It(t,e){const i=e[0],s=e[1],o=e[2],n=e[3],r=e[4],l=e[5];let a=i*n-s*o;return a?(a=1/a,t[0]=n*a,t[1]=-s*a,t[2]=-o*a,t[3]=i*a,t[4]=(o*l-n*r)*a,t[5]=(s*r-i*l)*a,t):null}function St(t){return t[0]*t[3]-t[1]*t[2]}function tt(t,e,i){const s=e[0],o=e[1],n=e[2],r=e[3],l=e[4],a=e[5],h=i[0],c=i[1],f=i[2],m=i[3],_=i[4],d=i[5];return t[0]=s*h+n*c,t[1]=o*h+r*c,t[2]=s*f+n*m,t[3]=o*f+r*m,t[4]=s*_+n*d+l,t[5]=o*_+r*d+a,t}function Bt(t,e,i){const s=e[0],o=e[1],n=e[2],r=e[3],l=e[4],a=e[5],h=Math.sin(i),c=Math.cos(i);return t[0]=s*c+n*h,t[1]=o*c+r*h,t[2]=s*-h+n*c,t[3]=o*-h+r*c,t[4]=l,t[5]=a,t}function bt(t,e,i){const s=e[0],o=e[1],n=e[2],r=e[3],l=e[4],a=e[5],h=i[0],c=i[1];return t[0]=s*h,t[1]=o*h,t[2]=n*c,t[3]=r*c,t[4]=l,t[5]=a,t}function Tt(t,e,i){const s=e[0],o=e[1],n=e[2],r=e[3],l=e[4],a=e[5],h=i[0],c=i[1];return t[0]=s,t[1]=o,t[2]=n,t[3]=r,t[4]=s*h+n*c+l,t[5]=o*h+r*c+a,t}function Ct(t,e){const i=Math.sin(e),s=Math.cos(e);return t[0]=s,t[1]=i,t[2]=-i,t[3]=s,t[4]=0,t[5]=0,t}function Ft(t,e){return t[0]=e[0],t[1]=0,t[2]=0,t[3]=e[1],t[4]=0,t[5]=0,t}function zt(t,e){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=e[0],t[5]=e[1],t}function Yt(t){return"mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")"}function Xt(t){return Math.sqrt(t[0]**2+t[1]**2+t[2]**2+t[3]**2+t[4]**2+t[5]**2+1)}function Pt(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],t[3]=e[3]+i[3],t[4]=e[4]+i[4],t[5]=e[5]+i[5],t}function et(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t[3]=e[3]-i[3],t[4]=e[4]-i[4],t[5]=e[5]-i[5],t}function kt(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i,t[3]=e[3]*i,t[4]=e[4]*i,t[5]=e[5]*i,t}function Rt(t,e,i,s){return t[0]=e[0]+i[0]*s,t[1]=e[1]+i[1]*s,t[2]=e[2]+i[2]*s,t[3]=e[3]+i[3]*s,t[4]=e[4]+i[4]*s,t[5]=e[5]+i[5]*s,t}function Lt(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3]&&t[4]===e[4]&&t[5]===e[5]}function At(t,e){const i=t[0],s=t[1],o=t[2],n=t[3],r=t[4],l=t[5],a=e[0],h=e[1],c=e[2],f=e[3],m=e[4],_=e[5],d=rt();return Math.abs(i-a)<=d*Math.max(1,Math.abs(i),Math.abs(a))&&Math.abs(s-h)<=d*Math.max(1,Math.abs(s),Math.abs(h))&&Math.abs(o-c)<=d*Math.max(1,Math.abs(o),Math.abs(c))&&Math.abs(n-f)<=d*Math.max(1,Math.abs(n),Math.abs(f))&&Math.abs(r-m)<=d*Math.max(1,Math.abs(r),Math.abs(m))&&Math.abs(l-_)<=d*Math.max(1,Math.abs(l),Math.abs(_))}const Ot=tt,Vt=et;Object.freeze(Object.defineProperty({__proto__:null,add:Pt,copy:vt,determinant:St,equals:At,exactEquals:Lt,frob:Xt,fromRotation:Ct,fromScaling:Ft,fromTranslation:zt,identity:Mt,invert:It,mul:Ot,multiply:tt,multiplyScalar:kt,multiplyScalarAndAdd:Rt,rotate:Bt,scale:bt,set:wt,str:Yt,sub:Vt,subtract:et,translate:Tt},Symbol.toStringTag,{value:"Module"}));function qt(){const t=new Float32Array(6);return t[0]=1,t[3]=1,t}function Et(t){const e=new Float32Array(6);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e}function jt(t,e,i,s,o,n){const r=new Float32Array(6);return r[0]=t,r[1]=e,r[2]=i,r[3]=s,r[4]=o,r[5]=n,r}function Nt(t,e){return new Float32Array(t,e,6)}function it(t,e,i,s){const o=e[s],n=e[s+1];t[s]=i[0]*o+i[2]*n+i[4],t[s+1]=i[1]*o+i[3]*n+i[5]}function Kt(t,e,i,s=0,o=0,n=2){const r=o||e.length/n;for(let l=s;l<r;l++)it(t,e,i,l*n)}Object.freeze(Object.defineProperty({__proto__:null,clone:Et,create:qt,createView:Nt,fromValues:jt,transform:it,transformMany:Kt},Symbol.toStringTag,{value:"Module"}));function z(t,e){return[t,e]}function T(t,e,i){return t[0]=e,t[1]=i,t}function Wt(t,e,i,s,o){return t[0]=e,t[1]=i,t[2]=s,t[3]=o,t}const v=new L("0/0/0/0");let Dt=class st{static create(e,i,s=null){const o=H(e.spatialReference),n=i.origin||z(e.origin.x,e.origin.y),r=z(e.size[0]*i.resolution,e.size[1]*i.resolution),l=z(-1/0,-1/0),a=z(1/0,1/0),h=z(1/0,1/0);s!=null&&(T(l,Math.max(0,Math.floor((s.xmin-n[0])/r[0])),Math.max(0,Math.floor((n[1]-s.ymax)/r[1]))),T(a,Math.max(0,Math.floor((s.xmax-n[0])/r[0])),Math.max(0,Math.floor((n[1]-s.ymin)/r[1]))),T(h,a[0]-l[0]+1,a[1]-l[1]+1));const{cols:c,rows:f}=i;let m,_,d,y;return!s&&c&&f&&(T(l,c[0],f[0]),T(a,c[1],f[1]),T(h,c[1]-c[0]+1,f[1]-f[0]+1)),e.isWrappable?(m=z(Math.ceil(Math.round((o.valid[1]-o.valid[0])/i.resolution)/e.size[0]),h[1]),_=!0,d=o.origin,y=o.valid):(m=h,_=!1),new st(i.level,i.resolution,i.scale,n,l,a,h,r,m,_,d,y)}constructor(e,i,s,o,n,r,l,a,h,c,f,m){this.level=e,this.resolution=i,this.scale=s,this.origin=o,this.first=n,this.last=r,this.size=l,this.norm=a,this.worldSize=h,this.wrap=c,this._spatialReferenceOrigin=f,this._spatialReferenceValid=m}normalizeCol(e){if(!this.wrap)return e;const i=this.worldSize[0];return e<0?i-1-Math.abs((e+1)%i):e%i}normalizeKey(e){if(!this.wrap)return;const i=this.worldSize[0],s=e.col;s<0?(e.col=s+i,e.world-=1):s>=i&&(e.col=s-i,e.world+=1)}denormalizeCol(e,i){return this.wrap?this.worldSize[0]*i+e:e}getWorldForColumn(e){return this.wrap?Math.floor(e/this.worldSize[0]):0}getFirstColumnForWorld(e){return e*this.worldSize[0]+this.first[0]}getLastColumnForWorld(e){return e*this.worldSize[0]+this.first[0]+this.size[0]-1}getColumnForX(e){return(e-this.origin[0])/this.norm[0]}getXForColumn(e){const i=this.origin[0]+e*this.norm[0],s=this._spatialReferenceOrigin,o=this._spatialReferenceValid;return this.wrap&&s&&o?i===s[0]?o[0]:this.origin[0]===s[0]&&e===this.worldSize[0]?o[1]:i:i}getRowForY(e){return(this.origin[1]-e)/this.norm[1]}getYForRow(e){return this.origin[1]-e*this.norm[1]}getTileBounds(e,i,s=!1){v.set(i);const o=s?v.col:this.denormalizeCol(v.col,v.world),n=v.row;return Wt(e,this.getXForColumn(o),this.getYForRow(n+1),this.getXForColumn(o+1),this.getYForRow(n)),e}getTileCoords(e,i,s=!1){v.set(i);const o=s?v.col:this.denormalizeCol(v.col,v.world);return Array.isArray(e)?T(e,this.getXForColumn(o),this.getYForRow(v.row)):(e.x=this.getXForColumn(o),e.y=this.getYForRow(v.row)),e}},q=class{constructor(){this.spans=[]}acquire(t){this.lodInfo=t}release(){this.lodInfo=null,this.spans.length=0}*keys(){const t=this.lodInfo;for(const{row:e,colFrom:i,colTo:s}of this.spans)for(let o=i;o<=s;o++){const n=t.getWorldForColumn(o);yield new L(t.level,e,t.normalizeCol(o),n)}}forEach(t,e){const{spans:i,lodInfo:s}=this,{level:o}=s;if(i.length!==0)for(const{row:n,colFrom:r,colTo:l}of i)for(let a=r;a<=l;a++)t.call(e,o,n,s.normalizeCol(a),s.getWorldForColumn(a))}};q.pool=new lt(q);let E=class{constructor(t,e,i){this.row=t,this.colFrom=e,this.colTo=i}};const g=new L("0/0/0/0");let $t=class ot{static create(e,i){e[1]>i[1]&&([e,i]=[i,e]);const[s,o]=e,[n,r]=i,l=n-s,a=r-o,h=a!==0?l/a:0,c=(Math.ceil(o)-o)*h,f=(Math.floor(o)-o)*h;return new ot(s,Math.floor(o),Math.ceil(r),h,l<0?c:f,l<0?f:c,l<0?n:s,l<0?s:n)}constructor(e,i,s,o,n,r,l,a){this.x=e,this.ymin=i,this.ymax=s,this.invM=o,this.leftAdjust=n,this.rightAdjust=r,this.leftBound=l,this.rightBound=a}incrRow(){this.x+=this.invM}getLeftCol(){return Math.max(this.x+this.leftAdjust,this.leftBound)}getRightCol(){return Math.min(this.x+this.rightAdjust,this.rightBound)}};const x=[[0,0],[0,0],[0,0],[0,0]],Jt=1e-6;let re=class{constructor(t,e=null,i=t.lods[0].level,s=t.lods[t.lods.length-1].level){this.tileInfo=t,this.fullExtent=e,this.scales=[],this._infoByScale={},this._infoByLevel={};const o=t.lods.filter(r=>r.level>=i&&r.level<=s);this.minScale=o[0].scale,this.maxScale=o[o.length-1].scale;const n=this._lodInfos=o.map(r=>Dt.create(t,r,e));o.forEach((r,l)=>{this._infoByLevel[r.level]=n[l],this._infoByScale[r.scale]=n[l],this.scales[l]=r.scale},this),this._wrap=t.isWrappable}get spatialReference(){return this.tileInfo.spatialReference}getLODInfoAt(t){return this._infoByLevel[typeof t=="number"?t:t.level]}getTileBounds(t,e,i=!1){g.set(e);const s=this._infoByLevel[g.level];return s?s.getTileBounds(t,g,i):t}getTileCoords(t,e,i=!1){g.set(e);const s=this._infoByLevel[g.level];return s?s.getTileCoords(t,g,i):t}getTileCoverage(t,e=192,i=!0,s="closest"){if(!i&&(t.scale>this.minScale||t.scale<this.maxScale))return null;const o=s==="closest"?this.getClosestInfoForScale(t.scale):this.getSmallestInfoForScale(t.scale),n=q.pool.acquire(o),r=this._wrap;let l,a,h,c=1/0,f=-1/0;const m=n.spans;x[0][0]=x[0][1]=x[1][1]=x[3][0]=-e,x[1][0]=x[2][0]=t.size[0]+e,x[2][1]=x[3][1]=t.size[1]+e;for(const u of x)t.toMap(u,u),u[0]=o.getColumnForX(u[0]),u[1]=o.getRowForY(u[1]);const _=[];let d=3;for(let u=0;u<4;u++){if(x[u][1]===x[d][1]){d=u;continue}const p=$t.create(x[u],x[d]);c=Math.min(p.ymin,c),f=Math.max(p.ymax,f),_[p.ymin]===void 0&&(_[p.ymin]=[]),_[p.ymin].push(p),d=u}if(c==null||f==null||f-c>100)return null;let y=[];for(l=c;l<f;){_[l]!=null&&(y=y.concat(_[l])),a=1/0,h=-1/0;for(let u=y.length-1;u>=0;u--){const p=y[u];a=Math.min(a,p.getLeftCol()),h=Math.max(h,p.getRightCol())}if(a=Math.floor(a),h=Math.floor(h),l>=o.first[1]&&l<=o.last[1])if(r)if(o.size[0]<o.worldSize[0]){const u=Math.floor(h/o.worldSize[0]);for(let p=Math.floor(a/o.worldSize[0]);p<=u;p++)m.push(new E(l,Math.max(o.getFirstColumnForWorld(p),a),Math.min(o.getLastColumnForWorld(p),h)))}else m.push(new E(l,a,h));else a>o.last[0]||h<o.first[0]||(a=Math.max(a,o.first[0]),h=Math.min(h,o.last[0]),m.push(new E(l,a,h)));l+=1;for(let u=y.length-1;u>=0;u--){const p=y[u];p.ymax>=l?p.incrRow():y.splice(u,1)}}return n}getTileParentId(t){g.set(t);const e=this._infoByLevel[g.level],i=this._lodInfos.indexOf(e)-1;return i<0?null:(this._getTileIdAtLOD(g,this._lodInfos[i],g),g.id)}getTileResolution(t){const e=this._infoByLevel[typeof t=="object"?t.level:t];return e?e.resolution:-1}getTileScale(t){const e=this._infoByLevel[t.level];return e?e.scale:-1}intersects(t,e){g.set(e);const i=this._infoByLevel[g.level],s=t.lodInfo;if(s.resolution>i.resolution){this._getTileIdAtLOD(g,s,g);const n=s.denormalizeCol(g.col,g.world);for(const r of t.spans)if(r.row===g.row&&r.colFrom<=n&&r.colTo>=n)return!0}if(s.resolution<i.resolution){const[n,r,l,a]=t.spans.reduce((d,y)=>(d[0]=Math.min(d[0],y.row),d[1]=Math.max(d[1],y.row),d[2]=Math.min(d[2],y.colFrom),d[3]=Math.max(d[3],y.colTo),d),[1/0,-1/0,1/0,-1/0]),h=i.denormalizeCol(g.col,g.world),c=s.getColumnForX(i.getXForColumn(h)),f=s.getRowForY(i.getYForRow(g.row)),m=s.getColumnForX(i.getXForColumn(h+1))-1,_=s.getRowForY(i.getYForRow(g.row+1))-1;return!(c>a||m<l||f>r||_<n)}const o=s.denormalizeCol(g.col,g.world);return t.spans.some(n=>n.row===g.row&&n.colFrom<=o&&n.colTo>=o)}normalizeBounds(t,e,i){if(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],this._wrap){const s=H(this.tileInfo.spatialReference),o=-i*(s.valid[1]-s.valid[0]);t[0]+=o,t[2]+=o}return t}getSmallestInfoForScale(t){const e=this.scales;if(this._infoByScale[t])return this._infoByScale[t];if(t>e[0])return this._infoByScale[e[0]];for(let i=1;i<e.length-1;i++)if(t>e[i]+Jt)return this._infoByScale[e[i-1]];return this._infoByScale[e[e.length-1]]}getClosestInfoForScale(t){const e=this.scales;return this._infoByScale[t]||(t=e.reduce((i,s)=>Math.abs(s-t)<Math.abs(i-t)?s:i,e[0])),this._infoByScale[t]}scaleToLevel(t){const e=this.scales;if(this._infoByScale[t])return this._infoByScale[t].level;for(let i=e.length-1;i>=0;i--)if(t<e[i])return i===e.length-1?this._infoByScale[e[e.length-1]].level:this._infoByScale[e[i]].level+(e[i]-t)/(e[i]-e[i+1]);return this._infoByScale[e[0]].level}scaleToZoom(t){return this.tileInfo.scaleToZoom(t)}zoomToScale(t){return this.tileInfo.zoomToScale(t)}_getTileIdAtLOD(t,e,i){const s=this._infoByLevel[i.level];return t.set(i),e.resolution<s.resolution?null:(e.resolution===s.resolution||(t.level=e.level,t.col=Math.floor(i.col*s.resolution/e.resolution+.01),t.row=Math.floor(i.row*s.resolution/e.resolution+.01)),t)}};const J=[0,0];let S=class extends ht{constructor(t){super(t),this._keyToItem=new Map,this._tilesByScale=new Map,this.concurrency=6}initialize(){const{concurrency:t,process:e,scheduler:i,priority:s}=this;this._queue=new _t({concurrency:t,scheduler:i,priority:s,process:(o,n)=>{const r=this._keyToItem.get(o);return e(r,{signal:n})},peeker:o=>this._peek(o)})}destroy(){this.clear(),this._queue=ct(this._queue)}get length(){return this._queue?this._queue.length:0}abort(t){const e=typeof t=="string"?t:t.id;this._queue.abort(e)}clear(){this._queue.clear(),this._keyToItem.clear(),this._tilesByScale.clear()}has(t){return typeof t=="string"?this._keyToItem.has(t):this._keyToItem.has(t.id)}pause(){this._queue.pause()}push(t){const e=t.key.id;if(this._queue.has(e))return this._queue.get(e);const i=this._queue.push(e),s=this.tileInfoView.getTileScale(t.key),o=ut(this._tilesByScale,s,()=>new Set),n=()=>{o.delete(t.key),o.size===0&&this._tilesByScale.delete(s),this._keyToItem.delete(e)};return o.add(t.key),this._keyToItem.set(e,t),i.then(n,n),i}reset(){this._queue.reset()}resume(){this._queue.resume()}_peek(t){if(!this.state)return t.values().next().value;const e=new Set;for(const n of t)e.add(this._keyToItem.get(n).key);const i=this.state.scale;let s,o=Number.POSITIVE_INFINITY;for(const[n,r]of this._tilesByScale)if(ft(r,l=>e.has(l))){const l=Math.abs(n-i);l<o&&(s=r,o=l)}return this._getClosestTileKey(s,t).id}_getClosestTileKey(t,e){const i=this.tileInfoView,s=this.state.center;let o,n=Number.POSITIVE_INFINITY;for(const r of t)if(e.has(r.id)){i.getTileCoords(J,r);const l=gt(J,s);l<n&&(n=l,o=r)}return o}};b([F({constructOnly:!0})],S.prototype,"concurrency",void 0),b([F({constructOnly:!0})],S.prototype,"priority",void 0),b([F({constructOnly:!0})],S.prototype,"process",void 0),b([F({constructOnly:!0})],S.prototype,"scheduler",void 0),b([F()],S.prototype,"state",void 0),b([F({constructOnly:!0})],S.prototype,"tileInfoView",void 0),S=b([at("esri.views.2d.tiling.TileQueue")],S);const le=S;class Zt{constructor(e,i,s){this.maxSize=e,this._tileInfoView=i,this._removedFunc=s,this._tilePerId=new Map,this._tileKeysPerLevel=[]}clear(){this._tilePerId.clear(),this._tileKeysPerLevel=[]}has(e){return this._tilePerId.has(e)}get(e){return this._tilePerId.get(e)}pop(e){const i=this._tilePerId.get(e);if(!i)return;const s=i.key.level,o=this._tileKeysPerLevel[s];Z(this._tilePerId,e);for(let n=0;n<o.length;n++)if(o[n].id===e){o.splice(n,1);break}return i.visible=!0,i}add(e){e.visible=!1;const i=e.key,s=i.id;if(this._tilePerId.has(s))return;this._tilePerId.set(s,e);const o=i.level;this._tileKeysPerLevel[o]||(this._tileKeysPerLevel[o]=[]),this._tileKeysPerLevel[o].push(i)}prune(e,i,s){let o=this._tilePerId.size;if(o<=this.maxSize)return;let n=this._tileKeysPerLevel.length-1;for(;o>this.maxSize&&n>=0;)n!==e&&(o=this._pruneAroundCenterTile(o,i,s,n)),n--;o>this.maxSize&&(o=this._pruneAroundCenterTile(o,i,s,e))}_pruneAroundCenterTile(e,i,s,o){const n=this._tileKeysPerLevel[o];if(!n||n.length===0)return e;const{size:r,origin:l}=this._tileInfoView.tileInfo,a=s*r[0],h=s*r[1],c=[0,0],f=[0,0];for(n.sort((m,_)=>(c[0]=l.x+a*(m.col+.5),c[1]=l.y-h*(m.row+.5),f[0]=l.x+a*(_.col+.5),f[1]=l.y-h*(_.row+.5),$(c,i)-$(f,i)));n.length>0;){const m=n.pop();if(this._removeTile(m.id),--e===this.maxSize)break}return e}_removeTile(e){const i=this._tilePerId.get(e);this._removedFunc&&i&&this._removedFunc(i),Z(this._tilePerId,e)}}function Z(t,e){t.delete(e)}const C=new L(0,0,0,0),I=new Map,P=[],j=[];let ae=class{constructor(t){this._previousScale=Number.POSITIVE_INFINITY,this.cachePolicy="keep",this.coveragePolicy="closest",this.resampling=!0,this.tileIndex=new Map,this.tiles=[],this.buffer=192,this.acquireTile=t.acquireTile,this.releaseTile=t.releaseTile,this.tileInfoView=t.tileInfoView,t.resampling!=null&&(this.resampling=t.resampling),t.cachePolicy&&(this.cachePolicy=t.cachePolicy),t.coveragePolicy&&(this.coveragePolicy=t.coveragePolicy),t.buffer!=null&&(this.buffer=t.buffer),t.cacheSize&&(this._tileCache=new Zt(t.cacheSize,this.tileInfoView,e=>{this.releaseTile(e)}))}destroy(){this.tileIndex.clear()}update(t){const{resampling:e,tileIndex:i}=this,{scale:s,center:o,resolution:n}=t.state,{minScale:r,maxScale:l}=this.tileInfoView,a=!t.stationary&&s>this._previousScale;if(this._previousScale=s,!e&&(s>r||s<l))return this.tiles.length=0,void this.clear();const h=this.tileInfoView.getTileCoverage(t.state,this.buffer,this.resampling,this.coveragePolicy);if(!h)return this.tiles.length=0,void this.clear();const{spans:c,lodInfo:f}=h,{level:m}=f;this.tiles.length=0,i.forEach(u=>u.visible=!0);let _=0,d=0;if(c.length>0)for(const{row:u,colFrom:p,colTo:A}of c)for(let B=p;B<=A;B++){_++;const M=C.set(m,u,f.normalizeCol(B),f.getWorldForColumn(B)).id;let w=i.get(M);if(w)w.isReady?(I.set(M,w),d++):a||this._addParentTile(M,I);else{if(this._tileCache?.has(M)){if(w=this._tileCache.pop(M),this.tileIndex.set(M,w),w.isReady){I.set(M,w),d++;continue}}else w=this.acquireTile(C),this.tileIndex.set(M,w);a||this._addParentTile(M,I)}}const y=d===_;for(const[u,p]of i){if(I.has(u))continue;C.set(u);const A=this.tileInfoView.intersects(h,C),B=this.cachePolicy==="purge"?C.level!==m:C.level>m;!A||!a&&y?!B&&A||P.push(p):p.isReady?B&&this.cachePolicy==="purge"&&this._hasReadyAncestor(C,m)?P.push(p):j.push(p):B&&P.push(p)}for(const u of j)u.isReady&&I.set(u.key.id,u);for(const u of P)this._tileCache?this._tileCache.add(u):this.releaseTile(u),i.delete(u.key.id);for(const u of I.values())this.tiles.push(u);for(const u of i.values())I.has(u.key.id)||(u.visible=!1);this._tileCache?.prune(m,o,n),q.pool.release(h),j.length=0,P.length=0,I.clear()}clear(){const{tileIndex:t}=this;for(const e of t.values())this.releaseTile(e);t.clear()}refresh(t){for(const e of this.tileIndex.values())t(e);this._tileCache?.clear()}updateCacheSize(t){this._tileCache&&(this._tileCache.maxSize=t)}_addParentTile(t,e){let i=t,s=null;for(;i=this.tileInfoView.getTileParentId(i),i;)if(this.tileIndex.has(i)){if(s=this.tileIndex.get(i),s?.isReady){e.has(s.key.id)||e.set(s.key.id,s);break}}else if(this._tileCache?.has(i)&&(s=this._tileCache.pop(i),this.tileIndex.set(i,s),s?.isReady)){e.has(s.key.id)||e.set(s.key.id,s);break}}_hasReadyAncestor(t,e){const i=W();this.tileInfoView.getTileBounds(i,t,!0);for(const s of this.tileIndex.values())if(s.isReady&&s.key.level>=e&&s.key.level<t.level){const o=W();if(this.tileInfoView.getTileBounds(o,s.key,!0),pt(o,i))return!0}return!1}};function D(t,e){if(!(this instanceof D))return new D(t,e);this._maxEntries=Math.max(4,t||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),e&&(typeof e=="function"?this.toBBox=e:this._initFormat(e)),this.clear()}function Qt(t,e,i){if(!i)return e.indexOf(t);for(var s=0;s<e.length;s++)if(i(t,e[s]))return s;return-1}function Y(t,e){k(t,0,t.children.length,e,t)}function k(t,e,i,s,o){o||(o=X(null)),o.minX=1/0,o.minY=1/0,o.maxX=-1/0,o.maxY=-1/0;for(var n,r=e;r<i;r++)n=t.children[r],R(o,t.leaf?s(n):n);return o}function R(t,e){return t.minX=Math.min(t.minX,e.minX),t.minY=Math.min(t.minY,e.minY),t.maxX=Math.max(t.maxX,e.maxX),t.maxY=Math.max(t.maxY,e.maxY),t}function Q(t,e){return t.minX-e.minX}function G(t,e){return t.minY-e.minY}function N(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function O(t){return t.maxX-t.minX+(t.maxY-t.minY)}function Gt(t,e){return(Math.max(e.maxX,t.maxX)-Math.min(e.minX,t.minX))*(Math.max(e.maxY,t.maxY)-Math.min(e.minY,t.minY))}function Ut(t,e){var i=Math.max(t.minX,e.minX),s=Math.max(t.minY,e.minY),o=Math.min(t.maxX,e.maxX),n=Math.min(t.maxY,e.maxY);return Math.max(0,o-i)*Math.max(0,n-s)}function K(t,e){return t.minX<=e.minX&&t.minY<=e.minY&&e.maxX<=t.maxX&&e.maxY<=t.maxY}function V(t,e){return e.minX<=t.maxX&&e.minY<=t.maxY&&e.maxX>=t.minX&&e.maxY>=t.minY}function X(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function U(t,e,i,s,o){for(var n,r=[e,i];r.length;)(i=r.pop())-(e=r.pop())<=s||(n=e+Math.ceil((i-e)/s/2)*s,yt(t,n,e,i,o),r.push(e,n,n,i))}D.prototype={all:function(){return this._all(this.data,[])},search:function(t){var e=this.data,i=[],s=this.toBBox;if(!V(t,e))return i;for(var o,n,r,l,a=[];e;){for(o=0,n=e.children.length;o<n;o++)r=e.children[o],V(t,l=e.leaf?s(r):r)&&(e.leaf?i.push(r):K(t,l)?this._all(r,i):a.push(r));e=a.pop()}return i},collides:function(t){var e=this.data,i=this.toBBox;if(!V(t,e))return!1;for(var s,o,n,r,l=[];e;){for(s=0,o=e.children.length;s<o;s++)if(n=e.children[s],V(t,r=e.leaf?i(n):n)){if(e.leaf||K(t,r))return!0;l.push(n)}e=l.pop()}return!1},load:function(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(var e=0,i=t.length;e<i;e++)this.insert(t[e]);return this}var s=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===s.height)this._splitRoot(this.data,s);else{if(this.data.height<s.height){var o=this.data;this.data=s,s=o}this._insert(s,this.data.height-s.height-1,!0)}else this.data=s;return this},insert:function(t){return t!=null&&this._insert(t,this.data.height-1),this},clear:function(){return this.data=X([]),this},remove:function(t,e){if(t==null)return this;for(var i,s,o,n,r=this.data,l=this.toBBox(t),a=[],h=[];r||a.length;){if(r||(r=a.pop(),s=a[a.length-1],i=h.pop(),n=!0),r.leaf&&(o=Qt(t,r.children,e))!==-1)return r.children.splice(o,1),a.push(r),this._condense(a),this;n||r.leaf||!K(r,l)?s?(i++,r=s.children[i],n=!1):r=null:(a.push(r),h.push(i),i=0,s=r,r=r.children[0])}return this},toBBox:function(t){return t},compareMinX:Q,compareMinY:G,toJSON:function(){return this.data},fromJSON:function(t){return this.data=t,this},_all:function(t,e){for(var i=[];t;)t.leaf?e.push.apply(e,t.children):i.push.apply(i,t.children),t=i.pop();return e},_build:function(t,e,i,s){var o,n=i-e+1,r=this._maxEntries;if(n<=r)return Y(o=X(t.slice(e,i+1)),this.toBBox),o;s||(s=Math.ceil(Math.log(n)/Math.log(r)),r=Math.ceil(n/Math.pow(r,s-1))),(o=X([])).leaf=!1,o.height=s;var l,a,h,c,f=Math.ceil(n/r),m=f*Math.ceil(Math.sqrt(r));for(U(t,e,i,m,this.compareMinX),l=e;l<=i;l+=m)for(U(t,l,h=Math.min(l+m-1,i),f,this.compareMinY),a=l;a<=h;a+=f)c=Math.min(a+f-1,h),o.children.push(this._build(t,a,c,s-1));return Y(o,this.toBBox),o},_chooseSubtree:function(t,e,i,s){for(var o,n,r,l,a,h,c,f;s.push(e),!e.leaf&&s.length-1!==i;){for(c=f=1/0,o=0,n=e.children.length;o<n;o++)a=N(r=e.children[o]),(h=Gt(t,r)-a)<f?(f=h,c=a<c?a:c,l=r):h===f&&a<c&&(c=a,l=r);e=l||e.children[0]}return e},_insert:function(t,e,i){var s=this.toBBox,o=i?t:s(t),n=[],r=this._chooseSubtree(o,this.data,e,n);for(r.children.push(t),R(r,o);e>=0&&n[e].children.length>this._maxEntries;)this._split(n,e),e--;this._adjustParentBBoxes(o,n,e)},_split:function(t,e){var i=t[e],s=i.children.length,o=this._minEntries;this._chooseSplitAxis(i,o,s);var n=this._chooseSplitIndex(i,o,s),r=X(i.children.splice(n,i.children.length-n));r.height=i.height,r.leaf=i.leaf,Y(i,this.toBBox),Y(r,this.toBBox),e?t[e-1].children.push(r):this._splitRoot(i,r)},_splitRoot:function(t,e){this.data=X([t,e]),this.data.height=t.height+1,this.data.leaf=!1,Y(this.data,this.toBBox)},_chooseSplitIndex:function(t,e,i){var s,o,n,r,l,a,h,c;for(a=h=1/0,s=e;s<=i-e;s++)r=Ut(o=k(t,0,s,this.toBBox),n=k(t,s,i,this.toBBox)),l=N(o)+N(n),r<a?(a=r,c=s,h=l<h?l:h):r===a&&l<h&&(h=l,c=s);return c},_chooseSplitAxis:function(t,e,i){var s=t.leaf?this.compareMinX:Q,o=t.leaf?this.compareMinY:G;this._allDistMargin(t,e,i,s)<this._allDistMargin(t,e,i,o)&&t.children.sort(s)},_allDistMargin:function(t,e,i,s){t.children.sort(s);var o,n,r=this.toBBox,l=k(t,0,e,r),a=k(t,i-e,i,r),h=O(l)+O(a);for(o=e;o<i-e;o++)n=t.children[o],R(l,t.leaf?r(n):n),h+=O(l);for(o=i-e-1;o>=e;o--)n=t.children[o],R(a,t.leaf?r(n):n),h+=O(a);return h},_adjustParentBBoxes:function(t,e,i){for(var s=i;s>=0;s--)R(e[s],t)},_condense:function(t){for(var e,i=t.length-1;i>=0;i--)t[i].children.length===0?i>0?(e=t[i-1].children).splice(e.indexOf(t[i]),1):this.clear():Y(t[i],this.toBBox)},_initFormat:function(t){var e=["return a"," - b",";"];this.compareMinX=new Function("a","b",e.join(t[0])),this.compareMinY=new Function("a","b",e.join(t[1])),this.toBBox=new Function("a","return {minX: a"+t[0]+", minY: a"+t[1]+", maxX: a"+t[2]+", maxY: a"+t[3]+"};")}};class nt{constructor(e,i){this.key=new L(0,0,0,0),this.bounds=W(),this.objectIds=new Set,this.key.set(i);const s=e.getLODInfoAt(this.key);this.tileInfoView=e,this.tileInfoView.getTileBounds(this.bounds,this.key,!0),this.resolution=s.resolution,this.level=s.level,this.scale=s.scale,this.minScale=e.zoomToScale(s.level-1),this.maxScale=e.zoomToScale(s.level+1)}get lod(){return this.tileInfoView.getLODInfoAt(this.key)}get id(){return this.key.id}get extent(){return mt.fromBounds(this.bounds,this.tileInfoView.tileInfo.spatialReference)}get transform(){return{originPosition:"upperLeft",scale:[this.resolution,this.resolution],translate:[this.bounds[0],this.bounds[3]]}}createArcadeEvaluationOptions(e){return{$view:{scale:this.scale,timeZone:e}}}createChildTiles(){const e=this.key.getChildKeys(),i=dt.acquire();for(let s=0;s<e.length;s++)i[s]=new nt(this.tileInfoView,e[s]);return i}getQuantizationParameters(){return xt.fromJSON({mode:"view",originPosition:"upperLeft",tolerance:this.resolution,extent:{xmin:this.bounds[0],ymin:this.bounds[1],xmax:this.bounds[2],ymax:this.bounds[3],spatialReference:this.tileInfoView.tileInfo.spatialReference}})}}export{le as $,Mt as G,wt as H,tt as K,re as Q,It as U,D as V,nt as Z,ae as a,Bt as e,Kt as h,Tt as i,q as k,qt as l,zt as n,Ft as o,Ct as s,bt as t};
