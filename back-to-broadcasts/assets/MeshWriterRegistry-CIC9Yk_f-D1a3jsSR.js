import{D as P,K as xe,J as ve,Z as te,u as D,G as z,_ as Pe}from"./UpdateTracking2D-Du_WIf4G-uGtVjFpJ.js";import{f4 as R,aq as B,P as Me,o as be,hE as we,a1 as Ie,ar as Se}from"./main-Cs_aiUdl.js";import{K as $}from"./definitions-DJSdSb77-DkoRHaVx.js";import{I as ke,O as Ae,y as Le,F as de,$ as ze,Q as De,b as Ee,M as Re,k as Te,X as Be,a as Fe,m as Ge,c as Oe,R as me,J as N,g as Ce,d as We,C as E}from"./PieChartMeshWriter-C5yLDFwp-B_PU9Xyf.js";import{I as S}from"./enums-DBi1-Mm2-CUS1pvQe.js";import{s as je,l as Z,i as se}from"./Tile-D75RMC64-C9lj-Ovu.js";import{m as k,T as ie,j as q,b as Ve,v as ne}from"./vec2-tHZ6OaOy-xCj1obDt.js";import{e as re}from"./vec2f32-CVhmN3Me-DxoqVD7C.js";import{o as A}from"./vec2f64-CeODonrJ-CkkJCdRC.js";import{R as Ne,n as ae}from"./featureConversionUtils-D6hFQ4Af-fr8pAOas.js";import{c as Y}from"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import{T as oe,h as Ze}from"./LabelMetric-BeluzH3o-Dga8ucQD.js";import{e as F}from"./constants-Bqe1QJ4u-F8oTIn7N.js";import{r as fe,i as qe}from"./grouping-RwmXkHDc-Dq2_AbHb.js";import{T as Ye}from"./AttributeStore-DjyP9U7y-DEHOPrV4.js";let Qe=class extends We{};function Xe(n){const{sprite:e,isMapAligned:t,colorLocked:i,scaleSymbolsProportionally:s,isStroke:r}=n;let a=0;return t&&(a|=E(D.bitset.isMapAligned)),i&&(a|=E(D.bitset.colorLocked)),e.sdf&&(a|=E(D.bitset.isSDF)),s&&(a|=E(D.bitset.scaleSymbolsProportionally)),r&&(a|=E(D.bitset.isStroke)),a}let $e=class extends Qe{get vertexSpec(){return{createComputedParams:n=>{let{pixelDimensions:e,texelDimensions:t,baseSize:i,referenceSize:s,strokeWidth:r,sizeRatio:a}=n;e||(e=n.sprite.sdf?[0,0]:[n.sprite.width,n.sprite.height]),t||(t=n.sprite.sdf?[0,0]:e),i=R(i),s=R(s),r=R(r);const o=(n.sprite.sdfDecodeCoeff??1)*a;return{...n,pixelDimensions:e,texelDimensions:t,baseSize:i,referenceSize:s,strokeWidth:r,sdfDecodeCoeff:o}},optionalAttributes:{zoomRange:{type:S.SHORT,count:2,packPrecisionFactor:$,pack:({scaleInfo:n},{tileInfo:e})=>me(n,e)}},attributes:{id:{type:S.UNSIGNED_BYTE,count:3,pack:"id"},bitset:{type:S.UNSIGNED_BYTE,count:1,pack:Xe},pos:{type:S.SHORT,count:2,pack:"position",packPrecisionFactor:1},offset:{type:S.FLOAT,count:2,packAlternating:{count:4,pack:n=>{const e=n.texelDimensions;return[[-.5*e[0],-.5*e[1]],[.5*e[0],-.5*e[1]],[-.5*e[0],.5*e[1]],[.5*e[0],.5*e[1]]]}}},uv:{type:S.SHORT,count:2,packPrecisionFactor:1,packAlternating:{count:4,packTessellation:({texXmax:n,texXmin:e,texYmax:t,texYmin:i})=>[[e,i],[n,i],[e,t],[n,t]]}},animationPointerAndBaseSizeAndReferenceSize:{type:S.UNSIGNED_SHORT,count:4,packPrecisionFactor:1,pack:({animations:n,baseSize:e,referenceSize:t})=>[n.dataColumn,n.dataRow,e,t]},sizing:{type:S.UNSIGNED_SHORT,count:4,packPrecisionFactor:8,pack:({strokeWidth:n,pixelDimensions:e,baseSize:t,sprite:i,sizeRatio:s})=>{const r=Math.max(t*i.width/i.height,t),a=i.sdfDecodeCoeff*r*s;return[e[0],e[1],n,a]}},angle:{type:S.BYTE,count:1,packTessellation:({angle:n})=>n}}}}_write(n,e){const t=this.evaluatedMeshParams.sprite,{textureBinding:i}=t;n.recordStart(this.instanceId,this.attributeLayout,i);const s=e.getDisplayId();if(e.geometryType==="esriGeometryPolygon"){const r=e.readCentroidForDisplay();if(!r)return;const[a,o]=r.coords;this._writeQuad(n,s,a,o)}else if(e.geometryType==="esriGeometryPoint"){const r=e.readXForDisplay(),a=e.readYForDisplay();this._writeQuad(n,s,r,a)}else{const r=e.readGeometryForDisplay();if(r){const{angleToLine:a}=this.evaluatedMeshParams;if(a){let o=!0,c=null,d=null;r.forEachVertex((l,u)=>{if(c!=null&&d!=null){const h=Math.atan2(u-d,l-c)/Pe;o&&(this._writeQuad(n,s,c,d,h),o=!1),this._writeQuad(n,s,l,u,h)}c=l,d=u})}else r.forEachVertex((o,c)=>{this._writeQuad(n,s,o,c)})}}n.recordEnd()}_writeQuad(n,e,t,i,s=0){const r=this.evaluatedMeshParams.sprite,{rect:a}=r,o=a.x+2,c=a.y+2,d=a.x+a.width-2,l=a.y+a.height-2,u=n.vertexCount();n.recordBounds(t,i,64,64);const h={texXmin:o,texYmin:c,texXmax:d,texYmax:l,angle:s};for(let _=0;_<4;_++)this._writeVertex(n,e,t,i,h);n.indexEnsureSize(6),n.indexWrite(u),n.indexWrite(u+1),n.indexWrite(u+2),n.indexWrite(u+1),n.indexWrite(u+3),n.indexWrite(u+2)}};function ce(n,e,t){return n[0]=e[0]-t[0],n[1]=e[1]-t[1],n}function pe(n,e){return Math.sqrt(n*n+e*e)}function le(n){const e=pe(n[0],n[1]);n[0]/=e,n[1]/=e}function He(n,e){return pe(n[0]-e[0],n[1]-e[1])}function Je(n,e){return n[e+1]}function _e(n){return n.length-1}function Ue(n){let e=0;for(let t=0;t<_e(n);t++)e+=Ke(n,t);return e}function Ke(n,e,t=1){let[i,s]=Je(n,e);return[i,s]=[Math.round(i),Math.round(s)],Math.sqrt(i*i+s*s)*t}let et=class H{constructor(e,t,i,s,r){this._segments=e,this._index=t,this._distance=i,this._xStart=s,this._yStart=r,this._done=!1}static create(e){return new H(e,0,0,e[0][0],e[0][1])}clone(){return new H(this._segments,this._index,this._distance,this.xStart,this.yStart)}equals(e){return this._index===e._index||e._index===this._index-1&&(this._distance===0||e._distance===1)||e._index===this._index+1&&(this._distance===1||e._distance===0)}leq(e){return this._index<e._index||this._index===e._index&&this._distance<=e._distance}geq(e){return this._index>e._index||this._index===e._index&&this._distance>=e._distance}get _segment(){return this._segments[this._index+1]}get angle(){const e=this.dy,t=(0*e+-1*-this.dx)/(1*this.length);let i=Math.acos(t);return e>0&&(i=2*Math.PI-i),i}get xStart(){return this._xStart}get yStart(){return this._yStart}get x(){return this.xStart+this.distance*this.dx}get y(){return this.yStart+this.distance*this.dy}get dx(){return this._segment[0]}get dy(){return this._segment[1]}get xMidpoint(){return this.xStart+.5*this.dx}get yMidpoint(){return this.yStart+.5*this.dy}get xEnd(){return this.xStart+this.dx}get yEnd(){return this.yStart+this.dy}get length(){const{dx:e,dy:t}=this;return Math.sqrt(e*e+t*t)}get remainingLength(){return this.length*(1-this._distance)}get backwardLength(){return this.length*this._distance}get distance(){return this._distance}get done(){return this._done}hasPrev(){return this._index-1>=0}hasNext(){return this._index+1<_e(this._segments)}next(){return this.hasNext()?(this._xStart+=this.dx,this._yStart+=this.dy,this._distance=0,this._index+=1,this):null}prev(){return this.hasPrev()?(this._index-=1,this._xStart-=this.dx,this._yStart-=this.dy,this._distance=1,this):(this._done=!0,null)}_seekBackwards(e,t){const i=this.backwardLength;if(e<=i)return this._distance=(i-e)/this.length,this;let s=this.backwardLength;for(;this.prev();){if(s+this.length>e)return this._seekBackwards(e-s);s+=this.length}return this._distance=0,t?this:null}seek(e,t=!1){if(e<0)return this._seekBackwards(Math.abs(e),t);if(e<=this.remainingLength)return this._distance=(this.backwardLength+e)/this.length,this;let i=this.remainingLength;for(;this.next();){if(i+this.length>e)return this.seek(e-i,t);i+=this.length}return this._distance=1,t?this:null}};function Q(n,e,t,i=!0){const s=Ue(n),r=et.create(n),a=s/2;if(!i)return r.seek(a),void(Math.abs(r.x)<F&&Math.abs(r.y)<F&&t(r.clone(),0,a+0*e,s));const o=Math.max((s-e)/2,0),c=Math.floor(o/e),d=a-c*e;r.seek(d);for(let l=-c;l<=c;l++)Math.abs(r.x)<F&&Math.abs(r.y)<F&&t(r.clone(),l,a+l*e,s),r.seek(e)}function X(n,e){const t=e;for(let i=0;i<n.length;i++){let s=n[i];tt(s,t);const r=[];r.push(s[0]);for(let a=1;a<s.length;a++){const[o,c]=s[a-1],[d,l]=s[a],u=d-o,h=l-c;r.push([u,h])}n[i]=r,s=r}return n}function tt(n,e){if(e<=0)return;const t=n.length;if(t<3)return;const i=[];let s=0;i.push(0);for(let l=1;l<t;l++)s+=He(n[l],n[l-1]),i.push(s);e=Math.min(e,.2*s);const r=[];r.push(n[0][0]),r.push(n[0][1]);const a=n[t-1][0],o=n[t-1][1],c=ce([0,0],n[0],n[1]);le(c),n[0][0]+=e*c[0],n[0][1]+=e*c[1],ce(c,n[t-1],n[t-2]),le(c),n[t-1][0]+=e*c[0],n[t-1][1]+=e*c[1];for(let l=1;l<t;l++)i[l]+=e;i[t-1]+=e;const d=.5*e;for(let l=1;l<t-1;l++){let u=0,h=0,_=0;for(let f=l-1;f>=0&&!(i[f+1]<i[l]-d);f--){const m=d+i[f+1]-i[l],p=i[f+1]-i[f],g=i[l]-i[f]<d?1:m/p;if(Math.abs(g)<1e-6)break;const y=g*g,v=g*m-.5*y*p,M=g*p/e,x=n[f+1],I=n[f][0]-x[0],b=n[f][1]-x[1];u+=M/v*(x[0]*g*m+.5*y*(m*I-p*x[0])-y*g*p*I/3),h+=M/v*(x[1]*g*m+.5*y*(m*b-p*x[1])-y*g*p*b/3),_+=M}for(let f=l+1;f<t&&!(i[f-1]>i[l]+d);f++){const m=d-i[f-1]+i[l],p=i[f]-i[f-1],g=i[f]-i[l]<d?1:m/p;if(Math.abs(g)<1e-6)break;const y=g*g,v=g*m-.5*y*p,M=g*p/e,x=n[f-1],I=n[f][0]-x[0],b=n[f][1]-x[1];u+=M/v*(x[0]*g*m+.5*y*(m*I-p*x[0])-y*g*p*I/3),h+=M/v*(x[1]*g*m+.5*y*(m*b-p*x[1])-y*g*p*b/3),_+=M}r.push(u/_),r.push(h/_)}r.push(a),r.push(o);for(let l=0,u=0;l<t;l++)n[l][0]=r[u++],n[l][1]=r[u++]}const G=1,L=0,st=128,it=we(n=>{let e=0;if(n===0)return 1/0;for(;!(n%2);)e++,n/=2;return e});class nt extends de{constructor(){super(...arguments),this._zoomLevel=0}_write(e,t,i,s){if(this._zoomLevel=s||0,i!=null)throw new Error("InternalError: EffectGeometry not support for LabelMeshWriter");switch(t.geometryType){case"esriGeometryPoint":{const r=t.readXForDisplay(),a=t.readYForDisplay();this._writePoint(e,r,a,t);break}case"esriGeometryEnvelope":case"esriGeometryPolygon":case"esriGeometryMultipoint":{const r=t.readCentroidForDisplay();if(!r)return;const[a,o]=r.coords;this._writePoint(e,a,o,t);break}case"esriGeometryPolyline":this._writeLines(e,t)}}_createLineLabelMetric(e,t,i,s){const r=te(e),a=this.evaluatedMeshParams.horizontalAlignment==="right"?-1:1,o=this.evaluatedMeshParams.verticalAlignment==="bottom"?-1:1,c=this.evaluatedMeshParams.scaleInfo?.maxScale??0,d=this.evaluatedMeshParams.scaleInfo?.minScale??0;return new oe(r,t,i,a,o,c,d,s??null)}_writePoint(e,t,i,s){const r=this._getShaping();if(!r)return;const a=s.getDisplayId(),o=xe(this.evaluatedMeshParams.horizontalAlignment),c=ve(this.evaluatedMeshParams.verticalAlignment),d=this.evaluatedMeshParams.scaleInfo?.maxScale??0,l=this.evaluatedMeshParams.scaleInfo?.minScale??0,u=te(s.getDisplayId()),h=this._getPointReferenceBounds()||{offsetX:0,offsetY:0,size:0};e.metricStart(new oe(u,t,i,o,c,d,l,h)),this._writeGlyphs(e,a,t,i,r,0,h),e.metricBoxWrite(r.boundsT),e.metricEnd()}_getPointReferenceBounds(){if(!this._references)return null;for(const e of this._references){const t=e.getBoundsInfo();if(t)return t}return null}_writeLines(e,t){const{scaleInfo:i,verticalAlignment:s}=this.evaluatedMeshParams,r=this.evaluatedMeshParams.repeatLabelDistance||128,a=this._getShaping("middle");if(!a)return;const o=(d,l,u,h)=>this._placeSubdivGlyphs(d,l,u,h),c=(a.bounds.width+r)/(1<<G);this._current={out:e,id:t.getDisplayId(),shaping:a,zoomRange:me(i,this.getTileInfo()),referenceBounds:this._getPointReferenceBounds()||{offsetX:0,offsetY:0,size:0},offsetDirection:null},this._verticalPlacement=s==="bottom"?"above":s==="top"?"below":null,this._verticalPlacement?this._writeAboveAndBelowAlong(t,o,c):this._writeCenterAlong(t,o,c)}_writeAboveAndBelowAlong(e,t,i){const{repeatLabel:s}=this.evaluatedMeshParams,{shaping:r}=this._current,a=r.bounds.halfHeight,o=e.readGeometryForDisplay();if(!o)return;const c=new Y;Ne(c,o,!1,!1,"esriGeometryPolyline",1);const d=he(new Y,c,a),l=he(new Y,c,-a),u=ae(l,"esriGeometryPolyline",!1,!1),h=ae(d,"esriGeometryPolyline",!1,!1),_=X(h.paths,r.bounds.width),f=X(u.paths,r.bounds.width);this._current.offsetDirection="above";for(const m of _)Q(m,i,t,!!s);this._current.offsetDirection="below";for(const m of f)Q(m,i,t,!!s)}_writeCenterAlong(e,t,i){const{repeatLabel:s}=this.evaluatedMeshParams,{shaping:r}=this._current,a=X(e.readLegacyGeometryForDisplay().paths,r.bounds.width);for(const o of a)Q(o,i,t,!!s)}_placeSubdivGlyphs(e,t,i,s){const{allowOverrun:r,labelPosition:a,repeatLabelDistance:o}=this.evaluatedMeshParams,c=this._current.zoomRange[0],d=it(t),l=this._current.shaping.bounds.width/(1<<G),u=Math.sqrt(o||st)/(1<<G),h=Math.min(i,s-i),_=this._current.shaping.isMultiline?N:Math.log2(h/(u+l/2)),f=t===0?_:Math.min(d,_),m=Math.max(c,this._zoomLevel+G-f),p=this._zoomLevel-m,g=this._current.shaping.bounds.width/2*2**p;this._current.shaping.isMultiline?t===0&&this._placeStraight(e,m):r&&p<0?this._placeStraightAlong(e,c):a==="parallel"?this._placeStraightAlong(e,m):a==="curved"&&this._placeCurved(e,m,g)}_placeStraight(e,t){const{out:i,id:s,shaping:r,referenceBounds:a}=this._current,{x:o,y:c}=e;i.metricStart(this._createLineLabelMetric(s,o,c)),i.metricBoxWrite(r.boundsT);const d=e.angle*(180/Math.PI)%360,l=(e.angle*(180/Math.PI)+180)%360;this._writeGlyphs(i,s,o,c,r,0,a,{clipAngle:d,mapAligned:!0,isLineLabel:!0,minZoom:t}),this._writeGlyphs(i,s,o,c,r,0,a,{clipAngle:l,mapAligned:!0,isLineLabel:!0,minZoom:t}),i.metricEnd()}_placeCurved(e,t,i){const{out:s,id:r}=this._current;s.metricStart(this._createLineLabelMetric(r,e.x,e.y));const a=e.clone(),o=e.angle*(180/Math.PI)%360,c=(e.angle*(180/Math.PI)+180)%360;this._verticalPlacement&&this._verticalPlacement!==this._current.offsetDirection||(this._placeFirst(a,t,1,o),this._placeBack(e,a,t,i,1,o),this._placeForward(e,a,t,i,1,o)),this._verticalPlacement&&this._verticalPlacement===this._current.offsetDirection||(this._placeFirst(a,t,0,c),this._placeBack(e,a,t,i,0,c),this._placeForward(e,a,t,i,0,c)),s.metricEnd()}_placeStraightAlong(e,t){const{out:i,id:s,shaping:r,zoomRange:a,referenceBounds:o}=this._current,{boxBorderLineColor:c,boxBackgroundColor:d}=this.evaluatedMeshParams,l=e.clone(),u=e.angle*(180/Math.PI)%360,h=(e.angle*(180/Math.PI)+180)%360,_=r.glyphs.length>0&&!(!c&&!d);if(i.metricStart(this._createLineLabelMetric(s,e.x,e.y)),_){const f=Math.max(t,a[0],0),m=Math.min(N,a[1]),p=je(Z(),-e.angle),g={minZoom:f,maxZoom:m,clipAngle:u,mapAligned:!0,isLineLabel:!0},y=R(this.evaluatedMeshParams.offsetX),v=R(this.evaluatedMeshParams.offsetY);if(!this._verticalPlacement||this._verticalPlacement===this._current.offsetDirection){const M=re(y,-1*v),[x,I]=r.shapeBackground(se(Z(),p,M));i.recordStart(this.instanceId,this.attributeLayout,r.glyphs[0].textureBinding);const b=2*Math.max(x.width,x.height);i.recordBounds(e.x+x.x,e.y+x.y,b,b),this._writeTextBox(i,s,e.x,e.y,I,o,g),i.recordEnd()}if(!this._verticalPlacement||this._verticalPlacement!==this._current.offsetDirection){const M=re(y,v),[x,I]=r.shapeBackground(se(Z(),p,M));g.clipAngle=h,i.recordStart(this.instanceId,this.attributeLayout,r.glyphs[0].textureBinding);const b=2*Math.max(x.width,x.height);i.recordBounds(e.x+x.x,e.y+x.y,b,b),this._writeTextBox(i,s,e.x,e.y,I,o,g),i.recordEnd()}}this._verticalPlacement&&this._verticalPlacement!==this._current.offsetDirection||this._placeFirst(l,t,1,u,!0),this._verticalPlacement&&this._verticalPlacement===this._current.offsetDirection||this._placeFirst(l,t,0,h,!0),i.metricEnd()}_placeBack(e,t,i,s,r,a){const o=e.clone();let c=e.backwardLength+L;for(;o.prev()&&!(c>=s);)this._placeOnSegment(o,t,c,i,-1,r,a),c+=o.length+L}_placeForward(e,t,i,s,r,a){const o=e.clone();let c=e.remainingLength+L;for(;o.next()&&!(c>=s);)this._placeOnSegment(o,t,c,i,1,r,a),c+=o.length+L}_placeFirst(e,t,i,s,r=!1){const{out:a,id:o,shaping:c,zoomRange:d,referenceBounds:l}=this._current,u=c.glyphs;for(const h of u){const _=h.x>c.bounds.x?i:1-i,f=_*e.remainingLength+(1-_)*e.backwardLength,m=Math.abs(h.x+h.width/2-c.bounds.x),p=Math.max(0,this._zoomLevel+Math.log2(m/(f+L))),g=Math.max(t,r?0:p);h.maxZoom=Math.min(d[1],N),h.angle=e.angle+(1-i)*Math.PI,h.minZoom=Math.max(d[0],g),this._writeLineGlyph(a,o,e.x,e.y,c.bounds,h,s,l,!0),(i||this._current.offsetDirection)&&this._isVisible(h.minZoom,h.maxZoom)&&a.metricBoxWrite(h.bounds)}}_placeOnSegment(e,t,i,s,r,a,o){const{out:c,id:d,shaping:l,referenceBounds:u}=this._current,h=l.glyphs,_=e.dx/e.length,f=e.dy/e.length,m={x:e.x+i*-r*_,y:e.y+i*-r*f};for(const p of h){const g=p.x>l.bounds.x?a:1-a;if(!(g&&r===1||!g&&r===-1))continue;const y=Math.abs(p.x+p.width/2-l.bounds.x),v=Math.max(0,this._zoomLevel+Math.log2(y/i)-.1),M=Math.max(s,this._zoomLevel+Math.log2(y/(i+e.length+L)));v!==0&&(p.angle=e.angle+(1-a)*Math.PI,p.minZoom=M,p.maxZoom=v,this._writeLineGlyph(c,d,m.x,m.y,l.bounds,p,o,u,!0),(a||this._current.offsetDirection)&&this._isVisible(p.minZoom,p.maxZoom)&&c.metricBoxWrite(p.bounds))}}_writeLineGlyph(e,t,i,s,r,a,o,c,d){const l=i+r.x,u=s+r.y,h=2*(this.evaluatedMeshParams.minPixelBuffer?this.evaluatedMeshParams.minPixelBuffer/this._textMeshTransformProps.fontSize:1),_=Math.max(r.width,r.height)*h;e.recordStart(this.instanceId,this.attributeLayout,a.textureBinding),e.recordBounds(l,u,_,_);const{texcoords:f,offsets:m}=a,{fontSize:p,haloSize:g,outlineSize:y}=this._textMeshTransformProps;this._writeQuad(e,t,i,s,{texcoords:f,offsets:m,fontSize:p,haloSize:g,outlineSize:y,color:Ce(this.evaluatedMeshParams.color),isBackground:!1,referenceBounds:c,minZoom:Math.max(this._current.zoomRange[0],a.minZoom),maxZoom:Math.min(this._current.zoomRange[1],a.maxZoom),clipAngle:o,mapAligned:d,isLineLabel:!0}),e.recordEnd()}_isVisible(e,t){const i=Math.floor(this._zoomLevel*$)/$;return e<=i&&i<=t}}function he(n,e,t){const{coords:i,lengths:s}=e,r=A(),a=A(),o=A(),c=A(),d=A(),l=A(),u=2;let h=0;for(let _=0;_<s.length;_++){const f=s[_];for(let m=0;m<f;m++){const p=u*(m+h-1),g=u*(m+h),y=u*(m+h+1);m>0?k(r,i[p],i[p+1]):k(r,0,0),k(a,i[g],i[g+1]),m<f-1?k(o,i[y],i[y+1]):k(o,0,0),m===0?k(c,0,0):(ie(c,a,r),q(c,c),k(c,c[1],-c[0])),m===f-1?k(d,0,0):(ie(d,o,a),q(d,d),k(d,d[1],-d[0])),Ve(l,c,d),q(l,l);const v=l[0]*d[0]+l[1]*d[1];v!==0&&ne(l,l,v),ne(l,l,t),n.coords.push(a[0]+l[0],a[1]+l[1])}n.lengths.push(f),h+=f}return n}function j(n){return n instanceof V?n:typeof n=="object"&&"type"in n?ot[n.type].hydrate(n):new T(n)}class V{constructor(e){this.inputs=e}encode(){const e=[];for(const t of this.inputs)e.push(...t.encode());return e.push(...this.instructions),e}}let T=class extends V{constructor(n){super([]),this.value=n}simplify(){return this}get instructions(){if(Array.isArray(this.value)){const[n,e,t,i]=this.value;return i!=null?z.vector4.encode([n,e||0,t||0,i]):z.vector3.encode([n,e||0,t||0])}return z.scalar.encode(this.value)}},rt=class J extends V{constructor(e,t){super([t]),this._config=e,this._parent=t}static hydrate(e){return new J(e,j(e.parent))}simplify(){if(this._config.relativeTranslation||this._config.absoluteScale)return this;const e=this._parent.simplify();if(!(e instanceof T))return this;const[t,i,s,r]=e.value,a=this._config.translation.from[0],o=this._config.translation.from[1],c=this._config.rotation.from,d=this._config.scale.from;if(a===this._config.translation.to[0]&&o===this._config.translation.to[1]&&c===this._config.rotation.to&&d===this._config.scale.to){const l=s+c,u=r*d,h=Math.sin(s),_=Math.cos(s);return new T([_*r*a-h*r*o+t,h*r*a+_*r*o+i,l,u])}return new J(this._config,e)}get instructions(){return z.animatedTransform.encode(this._config)}},at=class U extends V{constructor(e,t){super([t]),this._config=e,this._parent=t}static hydrate(e){return new U(e,j(e.parent))}simplify(){const e=this._parent.simplify();if(!(e instanceof T))return this;const[t,i,s,r]=e.value,a=this._config.color.from[0],o=this._config.color.from[1],c=this._config.color.from[2];let d=this._config.color.from[3];const l=this._config.opacity.from;return a===this._config.color.to[0]&&o===this._config.color.to[1]&&c===this._config.color.to[2]&&d===this._config.color.to[3]&&l===this._config.opacity.to?(d*=l,new T([t*a,i*o,s*c,r*d])):new U(this._config,e)}get instructions(){return z.animatedColor.encode(this._config)}};const ot={AnimatedTransform:rt,AnimatedColor:at};function ct(n){return ge(n.map(e=>w(e)).map(e=>j(e).simplify()))}function lt(n){const e=[];return e.push(n.transform),e.push(n.fromColor),e.push(n.toColor),e.push(n.colorMix),e.push(n.toOpacity),e.push(n.opacityMix),e}function ge(n){const e=[],t=[];let i=0;for(const s of n){const r=[...s.encode(),...z.ret.encode()];e.push([i+n.length,0,0,0]),t.push(...r),i+=r.length}return[...e,...t]}async function K(n,e){const t=n;let i;if(typeof t=="number"||typeof t=="string"||typeof t=="boolean")i=t;else if(Array.isArray(t))i=await Promise.all(t.map(s=>K(s,e)));else if(typeof t=="object")if("valueExpressionInfo"in t){const{valueExpressionInfo:s}=t,{expression:r}=s;i={...t,computed:await e.createComputedField({expression:r})}}else{i={};for(const s in t)i[s]=await K(t[s],e)}return i}function w(n,e,t){function i(a){if(!("computed"in a))return a;let o=a.computed.readWithDefault(e,t,[255*a.defaultValue[0],255*a.defaultValue[1],255*a.defaultValue[2],a.defaultValue[3]]);if(typeof o=="string"){const c=Se.fromString(o);c&&(o=[c.r,c.g,c.b,c.a])}return o}const s=n;let r;if(typeof s=="number"||typeof s=="string"||typeof s=="boolean")r=s;else if(Array.isArray(s))r=s.map(a=>w(a,e,t));else if(typeof s=="object")if("type"in s&&s.type!=null&&s.type==="Process")switch(s.op){case"ArcadeColor":{const a=w(s.value,e,t);O(Array.isArray(a)&&a.length===4),r=[a[0]/255,a[1]/255,a[2]/255,a[3]]}break;case"Transparency":{const a=w(s.value,e,t);O(typeof a=="number"),r=1-a/100}break;case"Divide":{const a=w(s.left,e,t);O(typeof a=="number");const o=w(s.right,e,t);O(typeof o=="number"),r=a/o}break;case"Random":{const a=w(s.seed,e,t),o=w(s.min,e,t),c=w(s.max,e,t),d=e.getObjectId(),l=fe(d||0);r=o+qe(l,a)*(c-o)}}else if("computed"in s)r=i(s);else{r={};for(const a in s)r[a]=w(s[a],e,t)}return r}function O(n){if(!n)throw new Error("Assertion failed.")}class ht extends Ye{constructor(e){super(),this._value=e}resize(e){}read(e,t){return this._value}readWithDefault(e,t,i){return this._value}referencesScale(){return!1}referencesGeometry(){return!1}}const ut=()=>Ie.getLogger("esri.views.2d.engine.webgl.shaderGraph.techniques.mesh.MeshWriterInputEvaluator");async function C(n,e,t=!1){const{defaultValue:i,valueExpressionInfo:s,value:r}=e;if(s){const{expression:a}=s,o=await n.createComputedField({expression:a},t);return o?{...e,computed:o,defaultValue:i}:null}return{...e,computed:new ht(r),defaultValue:i}}async function ue(n,e){const{valueExpressionInfo:t}=e,{expression:i}=t,s=await n.createComputedField({expression:i});return s?{...e,computed:s}:null}function ye(n){return typeof n=="object"&&n!=null&&(!(!("valueExpressionInfo"in n)||!n.valueExpressionInfo)||"type"in n&&n.type==="Process"&&"op"in n&&n.op==="Random")}function W(n){if(Array.isArray(n)){for(const e of n)if(W(e))return!0}if(typeof n=="object"){if(ye(n))return!0;for(const e in n)if(W(n[e]))return!0}return!1}class ee{static async create(e,t,i){const s={},r=new Map,a=new Map,o=new Map,c=new Map,d=new Map,l=new Map;for(const u in i){const h=i[u];if(h!=null&&typeof h=="object")if(Array.isArray(h)){if(typeof h[0]=="object")throw new Error(`InternalError: Cannot handle ${u}. Nested array params are not supported`);s[u]=h}else if("valueExpressionInfo"in h){if(h.value){s[u]=h.value;continue}const _=await ue(e,h);if(!_){s[u]=h.defaultValue;continue}r.set(u,_),s[u]=null}else switch(h.type){case"cim-effect-infos":if(h.effectInfos.some(_=>_.overrides.length)){a.set(u,{effects:await Promise.all(h.effectInfos.map(async _=>{const f=_.overrides.map(m=>C(e,m));return{effect:_.effect,compiledOverrides:(await Promise.all(f)).filter(B)}}))});break}s[u]=h.effectInfos.map(_=>_.effect);break;case"cim-marker-placement-param":h.overrides.length&&o.set(u,{placementInfo:h,compiledOverrides:(await Promise.all(h.overrides.map(_=>C(e,_)))).filter(B)}),s[u]=h.placement;break;case"text-rasterization-param":{if(h.overrides.length){const f=h.overrides.map(m=>C(e,m,h.useLegacyLabelEvaluationRules));c.set(u,{compiledOverrides:(await Promise.all(f)).filter(B),rasterizationParam:h,objectIdToResourceId:new Map});continue}const _={type:"cim-rasterization-info",resource:h.resource};s[u]=await t.fetchResourceImmediate(_)??null;break}case"sprite-rasterization-param":{if(h.overrides.length){const f=h.overrides.map(m=>C(e,m));c.set(u,{compiledOverrides:(await Promise.all(f)).filter(B),rasterizationParam:h,objectIdToResourceId:new Map});continue}if(h.resource.type==="animated"){c.set(u,{compiledOverrides:[],rasterizationParam:h,objectIdToResourceId:new Map});continue}const _={type:"cim-rasterization-info",resource:h.resource};s[u]=await t.fetchResourceImmediate(_)??null;break}case"cim-marker-transform-param":{const{params:_}=h;if(W(_)){const f={compiledMarkerInfos:[]};await Promise.all(_.map(async m=>{const p={props:{}};for(const g in m)if(ye(m[g])){const y=await ue(e,m[g]);p.compiledExpressionMap||(p.compiledExpressionMap=new Map);const v=p.compiledExpressionMap;y&&v.set(g,y)}else p.props[g]=m[g];f.compiledMarkerInfos.push(p)})),d.set(u,f)}else s[u]={type:"cim-marker-transform-info",infos:_};break}case"animation-params":{const{params:_}=h,f=lt(_);if(W(f)){const m=await Promise.all(f.map(p=>K(p,e)));l.set(u,{params:m,propertyIdToResourceId:new Map,key:u})}else{const m=ct(f),p=await t.fetchResourceImmediate({type:"animation-info",resource:m});p!=null&&p.type==="sprite"&&(s[u]={dataRow:p.rect.y,dataColumn:p.rect.x})}break}default:s[u]=h}else s[u]=h}return new ee(i,s,r,a,o,c,d,l)}constructor(e,t,i,s,r,a,o,c){this.inputMeshParams=e,this._resolvedMeshParams=t,this._dynamicProperties=i,this._dynamicEffectProperties=s,this._dynamicPlacementProperties=r,this._dynamicAsyncProperties=a,this._dynamicTransformProperties=o,this._dynamicAsyncAnimations=c,this.evaluator=d=>d}get hasDynamicProperties(){return!!(this._dynamicProperties.size||this._dynamicAsyncProperties.size||this._dynamicEffectProperties.size||this._dynamicTransformProperties.size||this._dynamicPlacementProperties.size||this._dynamicAsyncAnimations.size)}get evaluatedMeshParams(){return this._evaluatedMeshParams||(this._evaluatedMeshParams=this.evaluator(this._resolvedMeshParams)),this._evaluatedMeshParams}enqueueRequest(e,t,i){for(const s of this._dynamicAsyncProperties.values()){const r=Me(s.rasterizationParam.resource);s.rasterizationParam.resource.type==="animated"&&s.rasterizationParam.resource.randomizeStartTime&&(r.primitiveName="__RESERVED__PRIMITIVE__NAME__",r.startGroup=fe(t.getObjectId()||0));for(const{primitiveName:o,propertyName:c,computed:d,defaultValue:l,valueExpressionInfo:u}of s.compiledOverrides)try{const h=s.rasterizationParam.resource.type==="animated"?r.primitiveName:o;Ze(r,h,c,d,t,i,l)}catch(h){ut().errorOnce(new be("invalid-arcade-expression",`Encountered an error when evaluating the arcade expression '${u?.expression}' (primitive: '${o}', property: '${c}')`,h))}const a=e.enqueueRequest({type:"cim-rasterization-info",resource:r});s.objectIdToResourceId.set(t.getObjectId(),a)}for(const s of this._dynamicAsyncAnimations.values()){const r=s.params.map(c=>w(c,t,i)).map(j).map(c=>c.simplify()),a=ge(r),o=e.enqueueRequest({type:"animation-info",resource:a});s.propertyIdToResourceId.set(t.getObjectId()+"."+s.key,o)}}evaluateMeshParams(e,t,i){for(const[s,r]of this._dynamicProperties.entries())this._resolvedMeshParams[s]=r.computed.readWithDefault(t,i,r.defaultValue);for(const[s,r]of this._dynamicPlacementProperties.entries())for(const{computed:a,defaultValue:o,propertyName:c}of r.compiledOverrides){const d=a.readWithDefault(t,i,o);r.placementInfo.placement[c]=d,this._resolvedMeshParams[s]=r.placementInfo.placement}for(const[s,r]of this._dynamicEffectProperties.entries())for(const a of r.effects){for(const{computed:o,defaultValue:c,propertyName:d}of a.compiledOverrides){const l=o.readWithDefault(t,i,c);a.effect[d]=l}this._resolvedMeshParams[s]=r.effects.map(o=>o.effect)}for(const[s,r]of this._dynamicTransformProperties.entries()){const a={type:"cim-marker-transform-info",infos:[]};for(const o of r.compiledMarkerInfos){const c={...o.props};if(o.compiledExpressionMap)for(const[d,l]of o.compiledExpressionMap){const u=l.computed.readWithDefault(t,i,l.defaultValue);c[d]=typeof u=="number"||typeof u=="boolean"?u:l.defaultValue}a.infos.push(c)}this._resolvedMeshParams[s]=a}for(const[s,r]of this._dynamicAsyncProperties.entries()){const a=r.objectIdToResourceId.get(t.getObjectId());if(a==null)continue;const o=e.getResource(a);this._resolvedMeshParams[s]=o}for(const[s,r]of this._dynamicAsyncAnimations.entries()){const a=r.propertyIdToResourceId.get(t.getObjectId()+"."+s);if(a==null)continue;const o=e.getResource(a);this._resolvedMeshParams[s]={dataRow:o.rect.y,dataColumn:o.rect.x}}return this._evaluatedMeshParams=this.evaluator(this._resolvedMeshParams),this.evaluatedMeshParams}}class kt{async createMeshWriter(e,t,i,s){const r=this._getMeshWriter(s.techniqueType),a=await ee.create(e,t,s.inputParams),o=new r(s.id,a,s.optionalAttributes,i);return await o.loadDependencies(),o}_getMeshWriter(e){switch(e){case P.Fill:return Oe;case P.DotDensity:return Ge;case P.ComplexFill:return Fe;case P.PatternFill:return Be;case P.OutlineFill:return Te;case P.PatternOutlineFill:return Re;case P.ComplexOutlineFill:return Ee;case P.Marker:return De;case P.PieChart:return ze;case P.Text:return de;case P.Line:return Le;case P.TexturedLine:return Ae;case P.Heatmap:return ke;case P.Label:return nt;case P.AnimatedMarker:return $e;default:throw new Error("Internal Error: Mesh writer not in the registry")}}}export{kt as d,ht as g};
