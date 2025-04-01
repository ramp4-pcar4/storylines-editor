const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./geometryEngineJSON-CGn_tfx8-D3N6SheD.js","./geometryEngineBase-DueYg7ux-CCeespPx.js","./_commonjsHelpers-BITg13Vk-KnjfkSck.js","./json-BI97KiBB-Ce5cWfI2.js"])))=>i.map(i=>d[i]);
import{c$ as Ze,al as ce,aA as je,by as E,P as J,aC as V,g as he,o as A,$ as $e,gW as Be,gX as ke,gU as He,gY as Le,p as W,aY as U,gZ as Je,fr as Ue,cS as de,cN as Ye,g_ as Ke,bh as We,cT as fe,gM as ie,gN as ae,eN as X,c_ as be,_ as Xe,g$ as et,fq as me,h0 as tt,h1 as st,ex as Ee,h2 as it}from"./main-DzfxInI5.js";import{Y as at}from"./projection-BA9M1R7d-Dosm3bk0.js";import{B as pe}from"./normalizeUtils-Bxmy9MNI-RkpwzxoG.js";import{z as rt}from"./featureConversionUtils-D6hFQ4Af-DsJC4rXl.js";import{b as ye}from"./LRUCache-C3erQTWv-CV8PPFVS.js";import{Z as nt}from"./WhereClause-DxwoyBMS-BE-WSOLe.js";import{i as ge}from"./fieldType-CD2CL2hr-BHcILNXd.js";import{T as ot,r as Z,g as O,G as lt,d as Ve,a as j,e as ee,S as ze}from"./timeSupport-jPViR5jn-CFudQMeC.js";import{p as N,v as ut,f as re,h as D,D as xe,C as ct}from"./queryUtils-Brxu6254-Dd3YIbdd.js";import{t as ht}from"./QueryEngineCapabilities-Gr588n9t-DjYb9CEb.js";import{z as _e}from"./quantizationUtils-bJy1cRwp-BkANmTCE.js";import{C as dt}from"./utils-HtkT8Fn3-BVLVYony.js";import{l as Fe,N as we,s as ft,c as mt,m as pt,E as yt,h as gt,V as xt,k as _t,M as Ft,x as te,f as wt,D as St}from"./utils-tNxq3jkf-DmXuKufQ.js";import{o as It}from"./FieldsIndex-HmzMbJQG-ChGyLJWN.js";import{p as Se}from"./Scheduler-B7UX7Wr5-Dqlf0M4_.js";let Tt=class{constructor(n,e){this._cache=new ye(n),this._invalidCache=new ye(e)}get(n,e){const t=`${e.uid}:${n}`,s=this._cache.get(t);if(s)return s;if(this._invalidCache.get(t)!=null)return null;try{const i=nt.create(n,{fieldsIndex:e});return this._cache.put(t,i),i}catch(i){return this._invalidCache.put(t,i),null}}getError(n,e){const t=`${e.uid}:${n}`;return this._invalidCache.get(t)??null}};const Ce=new Tt(50,500),$="unsupported-query",Me=" as ",De=new Set(["esriFieldTypeOID","esriFieldTypeSmallInteger","esriFieldTypeBigInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeLong"]),qe=new Set(["esriFieldTypeDate","esriFieldTypeDateOnly","esriFieldTypeTimeOnly","esriFieldTypeTimestampOffset"]),Rt=new Set(["esriFieldTypeString","esriFieldTypeGUID","esriFieldTypeGlobalID",...De,...qe]);function ne(n,e,t={}){const s=q(e,n);if(!s){const a=Ce.getError(e,n);throw new A($,"invalid SQL expression",{expression:e,error:a})}const i=t.expressionName||"expression";if(t.validateStandardized&&!s.isStandardized)throw new A($,`${i} is not standard`,{expression:e});if(t.validateAggregate&&!s.isAggregate)throw new A($,`${i} does not contain a valid aggregate function`,{expression:e});return s.fieldNames}function vt(n,e,t,s){if(!t)return!0;const i="where clause";return C(n,e,ne(n,t,{validateStandardized:!0,expressionName:i}),{expressionName:i,query:s}),!0}function At(n,e,t,s,i){if(!t)return!0;const a="having clause",r=ne(n,t,{validateAggregate:!0,expressionName:a});if(C(n,e,r,{expressionName:a,query:i}),!q(t,n)?.getExpressions().every(o=>{const{aggregateType:l,field:u}=o,c=n.get(u)?.name;return s.some(h=>{const{onStatisticField:d,statisticType:m}=h;return n.get(d)?.name===c&&m.toLowerCase().trim()===l})}))throw new A($,"expressions in having clause should also exist in outStatistics",{having:t});return!0}function q(n,e){return n?Ce.get(n,e):null}function Qe(n){return/\((.*?)\)/.test(n)?n:n.split(Me)[0]}function bt(n){return n.split(Me)[1]}function C(n,e,t,s={}){const i=new Map;if(Et(i,n,e,s.allowedFieldTypes??Rt,t),i.size){const a=s.expressionName??"expression";throw new A($,`${a} contains invalid or missing fields`,{errors:Array.from(i.values()),query:s.query})}}function Et(n,e,t,s,i){const a=i.includes("*")?[...t,...i.filter(r=>r!=="*")]:i;for(const r of a)if(e.get(r))Ie(n,e,t,s,r);else try{const o=ne(e,Qe(r),{validateStandardized:!0});for(const l of o)Ie(n,e,t,s,l)}catch(o){n.set(r,{type:"expression-error",expression:r,error:o})}}function Ie(n,e,t,s,i){const a=e.get(i);a?t.has(a.name)?s!=="all"&&s?.has(a.type)===!1&&n.set(i,{type:"invalid-type",fieldName:a.name,fieldType:ge.fromJSON(a.type),allowedFieldTypes:Array.from(s,r=>ge.fromJSON(r))}):n.set(i,{type:"missing-field",fieldName:a.name}):n.set(i,{type:"invalid-field",fieldName:i})}const Vt=5;let zt=class{constructor(){this._storage=new Map,this._purgeInterval=Vt,this._sweep=()=>{if(this._timer=void 0,!this._storage)return;const n=1e3*this._purgeInterval,e=performance.now()-n;for(const[t,s]of this._storage){if(!(s.time<e))return void(this._storage.size>0&&(this._timer=setTimeout(this._sweep,n)));this._storage.delete(t)}}}destroy(){this._storage?.clear(),this._storage=null,clearTimeout(this._timer)}get size(){return this._storage?.size??0}put(n,e){this._storage?.set(n,new Mt(e)),this._scheduleSweep()}get(n){if(!this._storage)return;const e=this._storage?.get(n);return e?(this._storage?.delete(n),e.time=performance.now(),this._storage?.set(n,e),e.items):void 0}clear(){this._storage?.clear()}_scheduleSweep(){this._storage&&(this._timer??=setTimeout(this._sweep,1e3*this._purgeInterval))}},Ct=0;class Mt{constructor(e){this.items=e,this.time=performance.now(),this.id=Ct++}}let L=class{constructor(n,e,t){this._fieldDataCache=new Map,this._returnDistinctMap=new Map,this.returnDistinctValues=n.returnDistinctValues??!1,this.fieldsIndex=t,this.featureAdapter=e;const s=n.outFields;if(s&&!s.includes("*")){this.outFields=s;let i=0;for(const a of s){const r=Qe(a),o=this.fieldsIndex.get(r),l=o?null:q(r,t),u=o?o.name:bt(a)||"FIELD_EXP_"+i++;this._fieldDataCache.set(a,{alias:u,clause:l})}}}countDistinctValues(n){return this.returnDistinctValues?(n.forEach(e=>this.getAttributes(e)),this._returnDistinctMap.size):n.length}getAttributes(n){const e=this._processAttributesForOutFields(n);return this._processAttributesForDistinctValues(e)}getFieldValue(n,e,t){const s=t?t.name:e;let i=null;return this._fieldDataCache.has(s)?i=this._fieldDataCache.get(s)?.clause:t||(i=q(e,this.fieldsIndex),this._fieldDataCache.set(s,{alias:s,clause:i})),t?this.featureAdapter.getAttribute(n,s):i?.calculateValue(n,this.featureAdapter)}getDataValues(n,e,t=!0){const s=e.normalizationType,i=e.normalizationTotal,a=this.fieldsIndex.get(e.field),r=ie(a)||ae(a),o=be(a);return n.map(l=>{let u=e.field&&this.getFieldValue(l,e.field,this.fieldsIndex.get(e.field));if(e.field2?(u=`${te(u)}${e.fieldDelimiter}${te(this.getFieldValue(l,e.field2,this.fieldsIndex.get(e.field2)))}`,e.field3&&(u=`${u}${e.fieldDelimiter}${te(this.getFieldValue(l,e.field3,this.fieldsIndex.get(e.field3)))}`)):typeof u=="string"&&t&&(r?u=u?new Date(u).getTime():null:o&&(u=u?dt(u):null)),s&&Number.isFinite(u)){const c=s==="field"&&e.normalizationField?this.getFieldValue(l,e.normalizationField,this.fieldsIndex.get(e.normalizationField)):null;u=wt(u,s,c,i)}return u})}async getExpressionValues(n,e,t,s,i){const{arcadeUtils:a}=await Ee(),r=a.hasGeometryOperations(e);r&&await a.enableGeometryOperations();const o=a.createFunction(e),l=a.getViewInfo(t),u={fields:this.fieldsIndex.fields};return n.map(c=>{const h={attributes:this.featureAdapter.getAttributes(c),layer:u,geometry:r?{...j(s.geometryType,s.hasZ,s.hasM,this.featureAdapter.getGeometry(c)),spatialReference:t?.spatialReference}:null},d=a.createExecContext(h,l,i);return a.executeFunction(o,d)})}validateItem(n,e){return this._fieldDataCache.has(e)||this._fieldDataCache.set(e,{alias:e,clause:q(e,this.fieldsIndex)}),this._fieldDataCache.get(e)?.clause?.testFeature(n,this.featureAdapter)??!1}validateItems(n,e){return this._fieldDataCache.has(e)||this._fieldDataCache.set(e,{alias:e,clause:q(e,this.fieldsIndex)}),this._fieldDataCache.get(e)?.clause?.testSet(n,this.featureAdapter)??!1}_processAttributesForOutFields(n){const e=this.outFields;if(!e?.length)return this.featureAdapter.getAttributes(n);const t={};for(const s of e){const{alias:i,clause:a}=this._fieldDataCache.get(s);t[i]=a?a.calculateValue(n,this.featureAdapter):this.featureAdapter.getAttribute(n,i)}return t}_processAttributesForDistinctValues(n){if(n==null||!this.returnDistinctValues)return n;const e=this.outFields,t=[];if(e)for(const a of e){const{alias:r}=this._fieldDataCache.get(a);t.push(n[r])}else for(const a in n)t.push(n[a]);const s=`${(e||["*"]).join(",")}=${t.join(",")}`;let i=this._returnDistinctMap.get(s)||0;return this._returnDistinctMap.set(s,++i),i>1?null:n}};function Te(n,e,t){return{objectId:n,target:e,distance:t,type:"vertex"}}function Dt(n,e,t,s,i,a=!1){return{objectId:n,target:e,distance:t,type:"edge",start:s,end:i,draped:a}}class v{constructor(e,t,s){this.items=e,this.query=t,this.geometryType=s.geometryType,this.hasM=s.hasM,this.hasZ=s.hasZ,this.fieldsIndex=s.fieldsIndex,this.objectIdField=s.objectIdField,this.spatialReference=s.spatialReference,this.featureAdapter=s.featureAdapter}get size(){return this.items.length}createQueryResponseForCount(){const e=new L(this.query,this.featureAdapter,this.fieldsIndex);if(!this.query.outStatistics)return e.countDistinctValues(this.items);const{groupByFieldsForStatistics:t,having:s,outStatistics:i}=this.query;if(!t?.length)return 1;const a=new Map,r=new Map,o=new Set;for(const l of i){const{statisticType:u}=l,c=u!=="exceedslimit"?l.onStatisticField:void 0;if(!r.has(c)){const d=[];for(const m of t){const y=this._getAttributeValues(e,m,a);d.push(y)}r.set(c,this._calculateUniqueValues(d,e.returnDistinctValues))}const h=r.get(c);for(const d in h){const{data:m,items:y}=h[d],f=m.join(",");s&&!e.validateItems(y,s)||o.add(f)}}return o.size}async createQueryResponse(){let e;if(this.query.outStatistics?e=this.query.outStatistics.some(t=>t.statisticType==="exceedslimit")?this._createExceedsLimitQueryResponse(this.query):await this._createStatisticsQueryResponse(this.query):e=this._createFeatureQueryResponse(this.query),this.query.returnQueryGeometry){const t=this.query.geometry;U(this.query.outSR)&&!V(t.spatialReference,this.query.outSR)?e.queryGeometry=Z({spatialReference:this.query.outSR,...D(t,t.spatialReference,this.query.outSR)}):e.queryGeometry=Z({spatialReference:this.query.outSR,...t})}return e}createSnappingResponse(e,t){const s=this.featureAdapter,i=Re(this.hasZ,this.hasM),{point:a,mode:r}=e,o=typeof e.distance=="number"?e.distance:e.distance.x,l=typeof e.distance=="number"?e.distance:e.distance.y,u={candidates:[]},c=this.geometryType==="esriGeometryPolygon",h=this._getPointCreator(r,this.spatialReference,t),d=new ve(null,0),m=new ve(null,0),y={x:0,y:0,z:0};for(const f of this.items){const w=s.getGeometry(f);if(w==null)continue;const{coords:_,lengths:I}=w;if(d.coords=_,m.coords=_,e.returnEdge){let S=0;for(let g=0;g<I.length;g++){const p=I[g];for(let F=0;F<p;F++,S+=i){const x=d;if(x.coordsIndex=S,F!==p-1){const T=m;T.coordsIndex=S+i;const R=y;qt(y,a,x,T);const M=(a.x-R.x)/o,B=(a.y-R.y)/l,b=M*M+B*B;b<=1&&u.candidates.push(Dt(s.getObjectId(f),h(R),Math.sqrt(b),h(x),h(T)))}}}}if(e.vertexMode!=="none"){const S=c?_.length-i:_.length;if(e.vertexMode==="all")for(let g=0;g<S;g+=i){const p=d;p.coordsIndex=g;const F=(a.x-p.x)/o,x=(a.y-p.y)/l,T=F*F+x*x;T<=1&&u.candidates.push(Te(s.getObjectId(f),h(p),Math.sqrt(T)))}else if(e.vertexMode==="ends"){const g=[0];c||g.push(_.length-i);for(const p of g){const F=d;F.coordsIndex=p;const x=(a.x-F.x)/o,T=(a.y-F.y)/l,R=x*x+T*T;R<=1&&u.candidates.push(Te(s.getObjectId(f),h(F),Math.sqrt(R)))}}}}return u.candidates.sort((f,w)=>f.distance-w.distance),u}_getPointCreator(e,t,s){const i=s==null||V(t,s)?o=>o:o=>D(o,t,s),{hasZ:a}=this,r=0;return e==="3d"?a?({x:o,y:l,z:u})=>i({x:o,y:l,z:u}):({x:o,y:l})=>i({x:o,y:l,z:r}):({x:o,y:l})=>i({x:o,y:l})}async createSummaryStatisticsResponse(e){const{field:t,valueExpression:s,normalizationField:i,normalizationType:a,normalizationTotal:r,minValue:o,maxValue:l,scale:u,timeZone:c,outStatisticTypes:h}=e,d=this.fieldsIndex.get(t),m=fe(d)||ie(d)||ae(d),y=await this._getDataValues({field:t,valueExpression:s,normalizationField:i,normalizationType:a,normalizationTotal:r,scale:u,timeZone:c}),f=St({normalizationType:a,normalizationField:i,minValue:o,maxValue:l}),w={value:.5,fieldType:d?.type},_=X(d)?Fe({values:y,supportsNullCount:f,percentileParams:w,outStatisticTypes:h}):we({values:y,minValue:o,maxValue:l,useSampleStdDev:!a,supportsNullCount:f,percentileParams:w,outStatisticTypes:h});return ft(_,h,m)}async createUniqueValuesResponse(e){const{field:t,valueExpression:s,domains:i,returnAllCodedValues:a,scale:r,timeZone:o}=e,l=await this._getDataValues({field:t,field2:e.field2,field3:e.field3,fieldDelimiter:e.fieldDelimiter,valueExpression:s,scale:r,timeZone:o},!1),u=mt(l);return pt(u,i,a,e.fieldDelimiter)}async createClassBreaksResponse(e){const{field:t,valueExpression:s,normalizationField:i,normalizationType:a,normalizationTotal:r,classificationMethod:o,standardDeviationInterval:l,minValue:u,maxValue:c,numClasses:h,scale:d,timeZone:m}=e,y=await this._getDataValues({field:t,valueExpression:s,normalizationField:i,normalizationType:a,normalizationTotal:r,scale:d,timeZone:m}),f=yt(y,{field:t,normalizationField:i,normalizationType:a,normalizationTotal:r,classificationMethod:o,standardDeviationInterval:l,minValue:u,maxValue:c,numClasses:h});return gt(f,o)}async createHistogramResponse(e){const{field:t,valueExpression:s,normalizationField:i,normalizationType:a,normalizationTotal:r,classificationMethod:o,standardDeviationInterval:l,minValue:u,maxValue:c,numBins:h,scale:d,timeZone:m}=e,y=await this._getDataValues({field:t,valueExpression:s,normalizationField:i,normalizationType:a,normalizationTotal:r,scale:d,timeZone:m});return xt(y,{field:t,normalizationField:i,normalizationType:a,normalizationTotal:r,classificationMethod:o,standardDeviationInterval:l,minValue:u,maxValue:c,numBins:h})}_sortFeatures(e,t,s){if(e.length>1&&t?.length)for(const i of t.reverse()){const a=i.split(" "),r=a[0],o=this.fieldsIndex.get(r),l=!!a[1]&&a[1].toLowerCase()==="desc",u=_t(o?.type,l);e.sort((c,h)=>{const d=s(c,r,o),m=s(h,r,o);return u(d,m)})}}_createFeatureQueryResponse(e){const t=this.items,{geometryType:s,hasM:i,hasZ:a,objectIdField:r,spatialReference:o}=this,{outFields:l,outSR:u,quantizationParameters:c,resultRecordCount:h,resultOffset:d,returnZ:m,returnM:y}=e,f=h!=null&&t.length>(d||0)+h,w=l&&(l.includes("*")?[...this.fieldsIndex.fields]:l.map(_=>this.fieldsIndex.get(_)));return{exceededTransferLimit:f,features:this._createFeatures(e,t),fields:w,geometryType:s,hasM:i&&y,hasZ:a&&m,objectIdFieldName:r,spatialReference:Z(u||o),transform:c&&_e(c)||null}}_createFeatures(e,t){const s=new L(e,this.featureAdapter,this.fieldsIndex),{hasM:i,hasZ:a}=this,{orderByFields:r,quantizationParameters:o,returnGeometry:l,returnCentroid:u,maxAllowableOffset:c,resultOffset:h,resultRecordCount:d,returnZ:m=!1,returnM:y=!1}=e,f=a&&m,w=i&&y;let _=[],I=0;const S=[...t];if(this._sortFeatures(S,r,(p,F,x)=>s.getFieldValue(p,F,x)),this.geometryType&&(l||u)){const p=_e(o)??void 0,F=this.geometryType==="esriGeometryPolygon"||this.geometryType==="esriGeometryPolyline";if(l&&!u)for(const x of S){const T=this.featureAdapter.getGeometry(x),R={attributes:s.getAttributes(x),geometry:j(this.geometryType,this.hasZ,this.hasM,T,c,p,f,w)};F&&T&&!R.geometry&&(R.centroid=ee(this,this.featureAdapter.getCentroid(x,this),p)),_[I++]=R}else if(!l&&u)for(const x of S)_[I++]={attributes:s.getAttributes(x),centroid:ee(this,this.featureAdapter.getCentroid(x,this),p)};else for(const x of S)_[I++]={attributes:s.getAttributes(x),centroid:ee(this,this.featureAdapter.getCentroid(x,this),p),geometry:j(this.geometryType,this.hasZ,this.hasM,this.featureAdapter.getGeometry(x),c,p,f,w)}}else for(const p of S){const F=s.getAttributes(p);F&&(_[I++]={attributes:F})}const g=h||0;if(d!=null){const p=g+d;_=_.slice(g,Math.min(_.length,p))}return _}_createExceedsLimitQueryResponse(e){let t=!1,s=Number.POSITIVE_INFINITY,i=Number.POSITIVE_INFINITY,a=Number.POSITIVE_INFINITY;for(const r of e.outStatistics??[])if(r.statisticType==="exceedslimit"){s=r.maxPointCount!=null?r.maxPointCount:Number.POSITIVE_INFINITY,i=r.maxRecordCount!=null?r.maxRecordCount:Number.POSITIVE_INFINITY,a=r.maxVertexCount!=null?r.maxVertexCount:Number.POSITIVE_INFINITY;break}if(this.geometryType==="esriGeometryPoint")t=this.items.length>s;else if(this.items.length>i)t=!0;else{const r=Re(this.hasZ,this.hasM),o=this.featureAdapter;t=this.items.reduce((l,u)=>{const c=o.getGeometry(u);return l+(c!=null&&c.coords.length||0)},0)/r>a}return{fields:[{name:"exceedslimit",type:"esriFieldTypeInteger",alias:"exceedslimit",sqlType:"sqlTypeInteger",domain:null,defaultValue:null}],features:[{attributes:{exceedslimit:Number(t)}}]}}async _createStatisticsQueryResponse(e){const t={attributes:{}},s=[],i=new Map,a=new Map,r=new Map,o=new Map,l=new L(e,this.featureAdapter,this.fieldsIndex),u=e.outStatistics,{groupByFieldsForStatistics:c,having:h,orderByFields:d,resultRecordCount:m}=e,y=c?.length,f=!!y,w=f?c[0]:null,_=f&&!this.fieldsIndex.get(w);for(const S of u??[]){const{outStatisticFieldName:g,statisticType:p}=S,F=S,x=p!=="exceedslimit"?S.onStatisticField:void 0,T=p==="percentile_disc"||p==="percentile_cont",R=p==="EnvelopeAggregate"||p==="CentroidAggregate"||p==="ConvexHullAggregate",M=f&&y===1&&(x===w||_)&&p==="count";if(f){if(!r.has(x)){const k=[];for(const K of c){const H=this._getAttributeValues(l,K,i);k.push(H)}r.set(x,this._calculateUniqueValues(k,!R&&l.returnDistinctValues))}const b=r.get(x);if(!b)continue;const Y=Object.keys(b);for(const k of Y){const{count:K,data:H,items:oe,itemPositions:Pe}=b[k],le=H.join(",");if(!h||l.validateItems(oe,h)){const Q=o.get(le)||{attributes:{}};if(R){Q.aggregateGeometries||(Q.aggregateGeometries={});const{aggregateGeometries:z,outStatisticFieldName:G}=await this._getAggregateGeometry(F,oe);Q.aggregateGeometries[G]=z}else{let z=null;if(M)z=K;else{const G=this._getAttributeValues(l,x,i),ue=Pe.map(Oe=>G[Oe]);z=T&&"statisticParameters"in F?this._getPercentileValue(F,ue):this._getStatisticValue(F,ue,null,l.returnDistinctValues)}Q.attributes[g]=z}let Ge=0;c.forEach((z,G)=>Q.attributes[this.fieldsIndex.get(z)?z:"EXPR_"+ ++Ge]=H[G]),o.set(le,Q)}}}else if(R){t.aggregateGeometries||(t.aggregateGeometries={});const{aggregateGeometries:b,outStatisticFieldName:Y}=await this._getAggregateGeometry(F,this.items);t.aggregateGeometries[Y]=b}else{const b=this._getAttributeValues(l,x,i);t.attributes[g]=T&&"statisticParameters"in F?this._getPercentileValue(F,b):this._getStatisticValue(F,b,a,l.returnDistinctValues)}const B=p!=="min"&&p!=="max"||!X(this.fieldsIndex.get(x))&&!this._isAnyDateField(x)?null:this.fieldsIndex.get(x)?.type;s.push({name:g,alias:g,type:B||"esriFieldTypeDouble"})}const I=f?Array.from(o.values()):[t];return this._sortFeatures(I,d,(S,g)=>S.attributes[g]),m&&(I.length=Math.min(m,I.length)),{fields:s,features:I}}_isAnyDateField(e){const t=this.fieldsIndex.get(e);return fe(t)||ie(t)||ae(t)||be(t)}async _getAggregateGeometry(e,t){const{convexHull:s,union:i}=await Xe(()=>import("./geometryEngineJSON-CGn_tfx8-D3N6SheD.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(f=>f.g),{statisticType:a,outStatisticFieldName:r}=e,{featureAdapter:o,spatialReference:l,geometryType:u,hasZ:c,hasM:h}=this,d=t.map(f=>j(u,c,h,o.getGeometry(f))),m=s(l,d,!0)[0],y={aggregateGeometries:null,outStatisticFieldName:null};if(a==="EnvelopeAggregate"){const f=m?et(m):me(i(l,d));y.aggregateGeometries={...f,spatialReference:l},y.outStatisticFieldName=r||"extent"}else if(a==="CentroidAggregate"){const f=m?tt(m):st(me(i(l,d)));y.aggregateGeometries={x:f[0],y:f[1],spatialReference:l},y.outStatisticFieldName=r||"centroid"}else a==="ConvexHullAggregate"&&(y.aggregateGeometries=m,y.outStatisticFieldName=r||"convexHull");return y}_getStatisticValue(e,t,s,i){const{onStatisticField:a,statisticType:r}=e;let o=null;return o=s?.has(a)?s.get(a):X(this.fieldsIndex.get(a))||this._isAnyDateField(a)?Fe({values:t,returnDistinct:i}):we({values:i?[...new Set(t)]:t,minValue:null,maxValue:null,useSampleStdDev:!0}),s&&s.set(a,o),o[r==="var"?"variance":r]}_getPercentileValue(e,t){const{onStatisticField:s,statisticParameters:i,statisticType:a}=e,{value:r,orderBy:o}=i,l=this.fieldsIndex.get(s);return Ft(t,{value:r,orderBy:o,fieldType:l?.type,isDiscrete:a==="percentile_disc"})}_getAttributeValues(e,t,s){if(s.has(t))return s.get(t);const i=this.fieldsIndex.get(t),a=this.items.map(r=>e.getFieldValue(r,t,i));return s.set(t,a),a}_calculateUniqueValues(e,t){const s={},i=this.items,a=i.length;for(let r=0;r<a;r++){const o=i[r],l=[];for(const c of e)l.push(c[r]);const u=l.join(",");s[u]==null?s[u]={count:1,data:l,items:[o],itemPositions:[r]}:(t||s[u].count++,s[u].items.push(o),s[u].itemPositions.push(r))}return s}async _getDataValues(e,t=!0){const s=new L(this.query,this.featureAdapter,this.fieldsIndex),{valueExpression:i,scale:a,timeZone:r}=e;return i?s.getExpressionValues(this.items,i,{viewingMode:"map",scale:a,spatialReference:this.query.outSR||this.spatialReference},{geometryType:this.geometryType,hasZ:this.hasZ,hasM:this.hasM},r):s.getDataValues(this.items,J(e),t)}}function qt(n,e,t,s){const i=s.x-t.x,a=s.y-t.y,r=i*i+a*a,o=(e.x-t.x)*i+(e.y-t.y)*a,l=Math.min(1,Math.max(0,o/r));n.x=t.x+i*l,n.y=t.y+a*l}function Re(n,e){return n?e?4:3:e?3:2}class ve{constructor(e,t){this.coords=e,this.coordsIndex=t}get x(){return this.coords[this.coordsIndex]}get y(){return this.coords[this.coordsIndex+1]}get z(){return this.coords[this.coordsIndex+2]}}const P="unsupported-query";async function Ae(n,{fieldsIndex:e,geometryType:t,spatialReference:s,availableFields:i}){if((n.distance??0)<0||n.geometryPrecision!=null||n.multipatchOption&&n.multipatchOption!=="xyFootprint"||n.pixelSize||n.relationParam||n.text)throw new A(P,"Unsupported query options",{query:n});return Ne(e,i,n),Nt(e,i,n),Promise.all([ze(n,t,s),re(s,n.outSR)]).then(()=>n)}function Ne(n,e,t){const{outFields:s,orderByFields:i,returnDistinctValues:a,outStatistics:r}=t,o=r?r.map(l=>l.outStatisticFieldName&&l.outStatisticFieldName.toLowerCase()).filter(Boolean):[];if(i&&i.length>0){const l=" asc",u=" desc",c=i.map(h=>{const d=h.toLowerCase();return d.includes(l)?d.split(l)[0]:d.includes(u)?d.split(u)[0]:h}).filter(h=>!o.includes(h));C(n,e,c,{expressionName:"orderByFields",query:t})}if(s&&s.length>0)C(n,e,s,{expressionName:"outFields",query:t,allowedFieldTypes:"all"});else if(a)throw new A(P,"outFields should be specified for returnDistinctValues",{query:t});vt(n,e,t.where,t)}const Qt=new Set([...De,...qe]);function Nt(n,e,t){const{outStatistics:s,groupByFieldsForStatistics:i,having:a}=t,r=i?.length,o=s?.length;if(a){if(!r||!o)throw new A(P,"outStatistics and groupByFieldsForStatistics should be specified with having",{query:t});At(n,e,a,s,t)}if(o){if(!Ot(s))return;const l=s.map(u=>u.onStatisticField).filter(Boolean);C(n,e,l,{expressionName:"onStatisticFields",query:t}),r&&C(n,e,i,{expressionName:"groupByFieldsForStatistics",query:t});for(const u of s){const{onStatisticField:c,statisticType:h}=u;if((h==="percentile_disc"||h==="percentile_cont")&&"statisticParameters"in u){const{statisticParameters:d}=u;if(!d)throw new A(P,"statisticParameters should be set for percentile type",{definition:u,query:t})}else n.get(c)&&h!=="count"&&h!=="min"&&h!=="max"&&C(n,e,[c],{expressionName:`outStatistics with '${h}' statistic type`,allowedFieldTypes:Qt,query:t})}}}async function Pt(n,e,{fieldsIndex:t,geometryType:s,spatialReference:i,availableFields:a}){if((n.distance??0)<0||n.geometryPrecision!=null||n.multipatchOption||n.pixelSize||n.relationParam||n.text||n.outStatistics||n.groupByFieldsForStatistics||n.having||n.orderByFields)throw new A(P,"Unsupported query options",{query:n});return Ne(t,a,n),Promise.all([Gt(t,a,e,n),ze(n,s,i),re(i,n.outSR)]).then(()=>n)}async function Gt(n,e,t,s){let i=[];if(t.valueExpression){const{arcadeUtils:a}=await Ee();i=a.extractFieldNames(t.valueExpression)}if(t.field&&i.push(t.field),t.field2&&i.push(t.field2),t.field3&&i.push(t.field3),t.normalizationField&&i.push(t.normalizationField),!i.length&&!t.valueExpression)throw new A(P,"field or valueExpression is required",{params:t});C(n,e,i,{expressionName:"statistics",query:s})}function Ot(n){return n!=null&&n.every(e=>e.statisticType!=="exceedslimit")}const Zt="unsupported-query";class is{constructor(e){this._cache=new zt,this._changeHandle=null,this.capabilities={query:ht},this.geometryType=e.geometryType,this.hasM=!!e.hasM,this.hasZ=!!e.hasZ,this.objectIdField=e.objectIdField,this.spatialReference=e.spatialReference,this.definitionExpression=e.definitionExpression,this.featureStore=e.featureStore,this.aggregateAdapter=e.aggregateAdapter,this._changeHandle=this.featureStore.events.on("changed",()=>this.clearCache()),this.timeInfo=e.timeInfo,this.fieldsIndex=Ze(e.fieldsIndex)?e.fieldsIndex:It.fromJSON(e.fieldsIndex),!e.availableFields||e.availableFields.length===1&&e.availableFields[0]==="*"?this.availableFields=new Set(this.fieldsIndex.fields.map(t=>t.name)):this.availableFields=new Set(e.availableFields.map(t=>this.fieldsIndex.get(t)?.name).filter(t=>t!=null)),e.scheduler&&e.priority&&(this._frameTask=e.scheduler.registerTask(e.priority))}destroy(){this._frameTask=ce(this._frameTask),this.clearCache(),je(this._cache),this._changeHandle=ce(this._changeHandle)}get featureAdapter(){return this.featureStore.featureAdapter}clearCache(){this._cache.clear(),this._allFeaturesPromise=null,this._timeExtentPromise=null,this._fullExtentPromise=null}async executeQuery(e,t){const s=E(t);try{return await(await this._executeQuery(e,{},s)).createQueryResponse()}catch(i){if(i!==N)throw i;return new v([],e,this).createQueryResponse()}}async executeQueryForCount(e={},t){const s=E(t);try{return(await this._executeQuery(e,{returnGeometry:!1,returnCentroid:!1,outSR:null},s)).createQueryResponseForCount()}catch(i){if(i!==N)throw i;return 0}}async executeQueryForExtent(e,t){const s=E(t),i=e.outSR;try{const a=await this._executeQuery(e,{returnGeometry:!0,returnCentroid:!1,outSR:null},s),r=a.size;return r?{count:r,extent:await this._getBounds(a.items,a.spatialReference,i||this.spatialReference)}:{count:0,extent:null}}catch(a){if(a===N)return{count:0,extent:null};throw a}}async executeQueryForIds(e,t){return this.executeQueryForIdSet(e,t).then(s=>Array.from(s))}async executeQueryForIdSet(e,t){const s=E(t);try{const i=await this._executeQuery(e,{returnGeometry:!0,returnCentroid:!1,outSR:null},s),a=i.items,r=new Set;return await this._reschedule(()=>{for(const o of a)r.add(i.featureAdapter.getObjectId(o))},s),r}catch(i){if(i===N)return new Set;throw i}}async executeQueryForSnapping(e,t){const s=E(t),{point:i,distance:a,returnEdge:r,vertexMode:o}=e;if(!r&&o==="none")return{candidates:[]};let l=J(e.query);l=await this._schedule(()=>ut(l,this.definitionExpression,this.spatialReference),s),l=await this._reschedule(()=>Ae(l,{availableFields:this.availableFields,fieldsIndex:this.fieldsIndex,geometryType:this.geometryType,spatialReference:this.spatialReference}),s);const u=!V(i.spatialReference,this.spatialReference);u&&await re(i.spatialReference,this.spatialReference);const c=typeof a=="number"?a:a.x,h=typeof a=="number"?a:a.y,d={xmin:i.x-c,xmax:i.x+c,ymin:i.y-h,ymax:i.y+h,spatialReference:i.spatialReference},m=u?D(d,this.spatialReference):d;if(!m)return{candidates:[]};const y=(await pe(he(i),null,{signal:s}))[0],f=(await pe(he(m),null,{signal:s}))[0];if(y==null||f==null)return{candidates:[]};const w=new v(await this._reschedule(()=>this._searchFeatures(se(f.toJSON())),s),l,this);await this._reschedule(()=>this._executeObjectIdsQuery(w),s),await this._reschedule(()=>this._executeTimeQuery(w),s),await this._reschedule(()=>this._executeAttributesQuery(w),s),await this._reschedule(()=>this._executeGeometryQueryForSnapping(w,s),s);const _=y.toJSON(),I=u?D(_,this.spatialReference):_,S=u?Math.max(m.xmax-m.xmin,m.ymax-m.ymin)/2:a;return w.createSnappingResponse({...e,point:I,distance:S},i.spatialReference)}async executeQueryForLatestObservations(e,t){const s=E(t);if(!this.timeInfo?.trackIdField)throw new A(Zt,"Missing timeInfo or timeInfo.trackIdField",{query:e,timeInfo:this.timeInfo});try{const i=await this._executeQuery(e,{},s);return await this._reschedule(()=>this._filterLatest(i),s),await i.createQueryResponse()}catch(i){if(i!==N)throw i;return new v([],e,this).createQueryResponse()}}async executeQueryForSummaryStatistics(e={},t,s){const i=E(s),{field:a,normalizationField:r,valueExpression:o}=t;return(await this._executeQueryForStatistics(e,{field:a,normalizationField:r,valueExpression:o},i)).createSummaryStatisticsResponse(t)}async executeQueryForUniqueValues(e={},t,s){const i=E(s),{field:a,field2:r,field3:o,valueExpression:l}=t;return(await this._executeQueryForStatistics(e,{field:a,field2:r,field3:o,valueExpression:l},i)).createUniqueValuesResponse(t)}async executeQueryForClassBreaks(e={},t,s){const i=E(s),{field:a,normalizationField:r,valueExpression:o}=t;return(await this._executeQueryForStatistics(e,{field:a,normalizationField:r,valueExpression:o},i)).createClassBreaksResponse(t)}async executeQueryForHistogram(e={},t,s){const i=E(s),{field:a,normalizationField:r,valueExpression:o}=t;return(await this._executeQueryForStatistics(e,{field:a,normalizationField:r,valueExpression:o},i)).createHistogramResponse(t)}async fetchRecomputedExtents(e){const t=E(e);this._timeExtentPromise||=ot(this.timeInfo,this.featureStore);const[s,i]=await Promise.all([this._getFullExtent(),this._timeExtentPromise]);return $e(t),{fullExtent:s,timeExtent:i}}async _getBounds(e,t,s){const i=Be(He(),ke);await this.featureStore.forEachBounds(e,o=>Le(i,o));const a={xmin:i[0],ymin:i[1],xmax:i[3],ymax:i[4],spatialReference:Z(this.spatialReference)};this.hasZ&&isFinite(i[2])&&isFinite(i[5])&&(a.zmin=i[2],a.zmax=i[5],a.hasZ=!0);const r=D(a,t,s);if(r.spatialReference=Z(s),r.xmax-r.xmin==0){const o=W(r.spatialReference);r.xmin-=o,r.xmax+=o}if(r.ymax-r.ymin==0){const o=W(r.spatialReference);r.ymin-=o,r.ymax+=o}if(this.hasZ&&r.zmin!=null&&r.zmax!=null&&r.zmax-r.zmin==0){const o=W(r.spatialReference);r.zmin-=o,r.zmax+=o}return r}_getFullExtent(){return this._fullExtentPromise||="getFullExtent"in this.featureStore&&this.featureStore.getFullExtent?Promise.resolve(this.featureStore.getFullExtent(this.spatialReference)):this._getAllFeatures().then(e=>this._getBounds(e,this.spatialReference,this.spatialReference)),this._fullExtentPromise}async _schedule(e,t){return this._frameTask!=null?this._frameTask.schedule(e,t):e(Se)}async _reschedule(e,t){return this._frameTask!=null?this._frameTask.reschedule(e,t):e(Se)}async _getAllFeaturesQueryEngineResult(e){return new v(await this._getAllFeatures(),e,this)}async _getAllFeatures(){if(this._allFeaturesPromise==null){const s=[];this._allFeaturesPromise=(async()=>{await this.featureStore.forEach(i=>s.push(i))})().then(()=>s)}const e=this._allFeaturesPromise,t=await e;return e===this._allFeaturesPromise?t.slice():this._getAllFeatures()}async _executeQuery(e,t,s){e=J(e),e=await this._schedule(()=>xe(e,this.definitionExpression,this.spatialReference),s),e=await this._reschedule(()=>Ae(e,{availableFields:this.availableFields,fieldsIndex:this.fieldsIndex,geometryType:this.geometryType,spatialReference:this.spatialReference}),s),e={...e,...t};const i=await this._reschedule(()=>this._executeSceneFilterQuery(e,s),s),a=await this._reschedule(()=>this._executeGeometryQuery(e,i,s),s);return await this._reschedule(()=>this._executeAggregateIdsQuery(a),s),await this._reschedule(()=>this._executeObjectIdsQuery(a),s),await this._reschedule(()=>this._executeTimeQuery(a),s),await this._reschedule(()=>this._executeAttributesQuery(a),s),a}async _executeSceneFilterQuery(e,t){if(e.sceneFilter==null)return null;const{outSR:s,returnGeometry:i,returnCentroid:a}=e,r=this.featureStore.featureSpatialReference,o=e.sceneFilter.geometry,l=r==null||V(r,o.spatialReference)?o:D(o,r);if(!l)return null;const u=i||a,c=U(s)&&!V(this.spatialReference,s)&&u?async f=>this._project(f,s):f=>f,h=this.featureAdapter,d=await this._reschedule(()=>this._searchFeatures(se(l)),t);if(e.sceneFilter.spatialRelationship==="disjoint"){if(!d.length)return null;const f=new Set;for(const I of d)f.add(h.getObjectId(I));const w=await this._reschedule(()=>this._getAllFeatures(),t),_=await this._reschedule(async()=>{const I=await O("esriSpatialRelDisjoint",l,this.geometryType,this.hasZ,this.hasM),S=p=>!f.has(h.getObjectId(p))||I(h.getGeometry(p)),g=await this._runSpatialFilter(w,S,t);return new v(g,e,this)},t);return c(_)}if(!d.length)return new v([],e,this);if(this._canExecuteSinglePass(l,e))return c(new v(d,e,this));const m=await O("esriSpatialRelContains",l,this.geometryType,this.hasZ,this.hasM),y=await this._runSpatialFilter(d,f=>m(h.getGeometry(f)),t);return c(new v(y,e,this))}async _executeGeometryQuery(e,t,s){if(t!=null&&t.items.length===0)return t;e=t!=null?t.query:e;const{geometry:i,outSR:a,spatialRel:r,returnGeometry:o,returnCentroid:l}=e,u=this.featureStore.featureSpatialReference,c=!i||u==null||V(u,i.spatialReference)?i:D(i,u),h=o||l,d=U(a)&&!V(this.spatialReference,a),m=t==null?this._getCacheKey(e):null,y=m?this._cache.get(m):null;if(y!=null)return new v(y,e,this);const f=async g=>(d&&h&&await this._project(g,a),m&&this._cache.put(m,g.items),g);if(!c)return f(t??await this._getAllFeaturesQueryEngineResult(e));const w=this.featureAdapter;let _=await this._reschedule(()=>this._searchFeatures(se(i)),s);if(r==="esriSpatialRelDisjoint"){if(!_.length)return f(t??await this._getAllFeaturesQueryEngineResult(e));const g=new Set;for(const x of _)g.add(w.getObjectId(x));const p=t!=null?t.items:await this._reschedule(()=>this._getAllFeatures(),s),F=await this._reschedule(async()=>{const x=await O(r,c,this.geometryType,this.hasZ,this.hasM),T=M=>!g.has(w.getObjectId(M))||x(w.getGeometry(M)),R=await this._runSpatialFilter(p,T,s);return new v(R,e,this)},s);return f(F)}if(t!=null){const g=new it;_=_.filter(p=>Je(t.items,p,t.items.length,g)>=0)}if(!_.length){const g=new v([],e,this);return m&&this._cache.put(m,g.items),g}if(this._canExecuteSinglePass(c,e))return f(new v(_,e,this));const I=await O(r,c,this.geometryType,this.hasZ,this.hasM),S=await this._runSpatialFilter(_,g=>I(w.getGeometry(g)),s);return f(new v(S,e,this))}async _executeGeometryQueryForSnapping(e,t){const{query:s}=e,{spatialRel:i}=s;if(!e?.items?.length||!s.geometry||!i)return;const a=await O(i,s.geometry,this.geometryType,this.hasZ,this.hasM),r=await this._runSpatialFilter(e.items,o=>a(o.geometry),t);e.items=r}_executeAggregateIdsQuery(e){if(e.items.length===0||!e.query.aggregateIds?.length||this.aggregateAdapter==null)return;const t=new Set;for(const i of e.query.aggregateIds)this.aggregateAdapter.getFeatureObjectIds(i).forEach(a=>t.add(a));const s=this.featureAdapter.getObjectId;e.items=e.items.filter(i=>t.has(s(i)))}_executeObjectIdsQuery(e){if(e.items.length===0||!e.query.objectIds?.length)return;const t=new Set(e.query.objectIds),s=this.featureAdapter.getObjectId;e.items=e.items.filter(i=>t.has(s(i)))}_executeTimeQuery(e){if(e.items.length===0)return;const t=lt(this.timeInfo,e.query.timeExtent,this.featureAdapter);t!=null&&(e.items=e.items.filter(t))}_executeAttributesQuery(e){if(e.items.length===0)return;const t=q(e.query.where,this.fieldsIndex);if(t){if(!t.isStandardized)throw new TypeError("Where clause is not standardized");e.items=e.items.filter(s=>t.testFeature(s,this.featureAdapter))}}async _runSpatialFilter(e,t,s){if(!t)return e;if(this._frameTask==null)return e.filter(o=>t(o));let i=0;const a=new Array,r=async o=>{for(;i<e.length;){const l=e[i++];t(l)&&(a.push(l),o.madeProgress()),o.done&&await this._reschedule(u=>r(u),s)}};return this._reschedule(o=>r(o),s).then(()=>a)}_filterLatest(e){const{trackIdField:t,startTimeField:s,endTimeField:i}=this.timeInfo,a=i||s,r=new Map,o=this.featureAdapter.getAttribute;for(const l of e.items){const u=o(l,t),c=o(l,a),h=r.get(u);(!h||c>o(h,a))&&r.set(u,l)}e.items=Array.from(r.values())}_getCacheKey(e){const{geometry:t,spatialRel:s,returnGeometry:i,returnCentroid:a,outSR:r,resultType:o,cacheHint:l}=e;if(o!=="tile"&&!l)return null;const u=i||a;return U(r)&&!V(this.spatialReference,r)&&u?JSON.stringify([t,s,r]):JSON.stringify([t,s])}_canExecuteSinglePass(e,t){const{spatialRel:s}=t;return Ve(e)&&(s==="esriSpatialRelEnvelopeIntersects"||this.geometryType==="esriGeometryPoint"&&(s==="esriSpatialRelIntersects"||s==="esriSpatialRelContains"))}async _project(e,t){if(!t||V(this.spatialReference,t))return e;const s=this.featureAdapter;let i;try{const r=await this._getFullExtent();i=at(this.spatialReference,t,r)}catch{}const a=await ct(e.items.map(r=>j(this.geometryType,this.hasZ,this.hasM,s.getGeometry(r))),this.spatialReference,t,i);return e.items=a.map((r,o)=>s.cloneWithGeometry(e.items[o],rt(r,this.hasZ,this.hasM))),e}async _searchFeatures(e){const t=new Set;await Promise.all(e.map(i=>this.featureStore.forEachInBounds(i,a=>t.add(a))));const s=Array.from(t.values());return t.clear(),s}async _executeQueryForStatistics(e,t,s){e=J(e);try{e=await this._schedule(()=>xe(e,this.definitionExpression,this.spatialReference),s),e=await this._reschedule(()=>Pt(e,t,{availableFields:this.availableFields,fieldsIndex:this.fieldsIndex,geometryType:this.geometryType,spatialReference:this.spatialReference}),s);const i=await this._reschedule(()=>this._executeSceneFilterQuery(e,s),s),a=await this._reschedule(()=>this._executeGeometryQuery(e,i,s),s);return await this._reschedule(()=>this._executeAggregateIdsQuery(a),s),await this._reschedule(()=>this._executeObjectIdsQuery(a),s),await this._reschedule(()=>this._executeTimeQuery(a),s),await this._reschedule(()=>this._executeAttributesQuery(a),s),a}catch(i){if(i!==N)throw i;return new v([],e,this)}}}function se(n){if(Ve(n)){if(Ue(n))return[de(Math.min(n.xmin,n.xmax),Math.min(n.ymin,n.ymax),Math.max(n.xmin,n.xmax),Math.max(n.ymin,n.ymax))];if(Ye(n))return n.rings.map(e=>de(Math.min(e[0][0],e[2][0]),Math.min(e[0][1],e[2][1]),Math.max(e[0][0],e[2][0]),Math.max(e[0][1],e[2][1])))}return[Ke(We(),n)]}export{is as Z};
