import{o as F,ay as j,aU as R,a1 as V,a as L,f as P,cY as T,cX as $,aC as A,dR as G,fn as Y,J as M,ft as Q,gK as Z,d0 as I,gT as J}from"./main-CF9Cdcsk.js";import{h as B,b as U}from"./date-Cqvy-TgA-DIf-QFLz.js";import{O as z}from"./projection-BA9M1R7d-BGah-PNx.js";import{a as H}from"./json-BI97KiBB-Ce5cWfI2.js";import{i as K,c as W}from"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import{I as X}from"./FeatureStore-Co2V0sVE-BCAHB4F9.js";import{f as ee}from"./queryUtils-Brxu6254-CQ55Rb40.js";import{Z as te}from"./QueryEngine-CH5uUhZK-DuU0nsJD.js";import{N as ie}from"./number-eRKYXfX9-BiQUGTK2.js";import{f as ne,d as re}from"./clientSideDefaults-BqqayPct-DE24do3u.js";import{o as _}from"./FieldsIndex-HmzMbJQG-DDJEzunB.js";import"./projectBuffer-CvCBvJ6W-D3ES9b1H.js";import"./featureConversionUtils-D6hFQ4Af-B-mOwxSe.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./BoundsStore--N6o1xkF-DcWIOv9B.js";import"./PooledRBush-DbfAmeLn-ashhaBTv.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./timeSupport-jPViR5jn-gtkNecuK.js";import"./optimizedFeatureQueryEngineAdapter-DFdaawxC-DWQW1lyu.js";import"./normalizeUtils-Bxmy9MNI-B0scjlT6.js";import"./normalizeUtilsCommon-CRJlkfEA-DMgO1pD4.js";import"./utils-9sQxfkoa-B2tJKLdN.js";import"./utils-Bq23Xwmj-BGnXTX3O.js";import"./LRUCache-C3erQTWv-DowSaNmQ.js";import"./WhereClause-DxwoyBMS-ycxnmE45.js";import"./TimeOnly-DSMefxKy-MtOWawM6.js";import"./UnknownTimeZone-C--TOcPG-CYrmNPix.js";import"./fieldType-CD2CL2hr-CKA59cC_.js";import"./QueryEngineCapabilities-Gr588n9t-DjYb9CEb.js";import"./quantizationUtils-bJy1cRwp-5D59F7Rj.js";import"./utils-HtkT8Fn3-C0oRZNs_.js";import"./TimeExtent-Cn0Jofqr-OY-iPXBs.js";import"./heatmapUtils-seiMkkkR-D1zEoODI.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./utils-DyydRFHu-BtMnoo6G.js";import"./Basemap-BEqqSTw9-B7pQxDGB.js";import"./loadAll-e978YItg-DPGjuBqk.js";import"./PortalItem-CctGdnxF-oCikpPW-.js";import"./writeUtils-D5qlLkwk-IB_NmGFy.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-1P3ND5w1.js";import"./utils-tNxq3jkf-BIikaign.js";import"./ClassBreaksDefinition-bYRgYgPp-DGwi0G__.js";import"./Scheduler-B7UX7Wr5-Cg8X3BzO.js";import"./signal-CETehA7D-DRMNvqg4.js";import"./capabilities-Cjn77swe-Y9lFlGVh.js";function oe(o,i,e){i=I(i)?.toLowerCase(),e=I(e)?.toLowerCase();const t=o.map(s=>s.toLowerCase()),n=i?o[t.indexOf(i)]:null,a=e?o[t.indexOf(e)]:null;return{longitudeFieldName:n||o[t.indexOf(ae.find(s=>t.includes(s)))],latitudeFieldName:a||o[t.indexOf(se.find(s=>t.includes(s)))]}}const se=["lat","lat83","latitude","latitude83","latdecdeg","lat_dd","y","ycenter","point_y"],ae=["lon","lng","lng83","long","long83","longitude","longitude83","longdecdeg","long_dd","x","xcenter","point_x"],b=/^\s*"([\S\s]*)"\s*$/,E=/""/g,S=`
`,le=[","," ",";","|","	"];function*O(o,i,e){let t=0;for(;t<=o.length;){const n=o.indexOf(i,t),a=o.slice(t,n>-1?n:void 0);t+=a.length+i.length,e&&!a.trim()||(yield a)}}function C(o){const i=o.includes(`\r
`)?`\r
`:S;return O(o,i,!0)}function q(o,i){return O(o,i,!1)}function ce(o,i,e){o=o.trim(),i=i?.trim();const t=[],n=Array.from(new Set([e?.delimiter,...le])).filter(s=>s!=null);for(const s of n){const l=N(o,s).length,c=N(i,s).length??l;l>1&&t.push({weight:Math.min(l,c),delimiter:s})}const a=t.sort(({weight:s},{weight:l})=>l-s).map(({delimiter:s})=>s);for(const s of a){const l=k(o,s).names,c=oe(l,e?.longitudeField,e?.latitudeField);if(c.longitudeFieldName&&c.latitudeFieldName)return{delimiter:s,locationInfo:c}}return{delimiter:a[0],locationInfo:null}}function*v(o,i,e,t=()=>Object.create(null)){const n=C(o);n.next();let a="",s="",l=0,c=t(),d=0;e:for(const y of n){const f=q(y,e);for(const p of f)if(a+=s+p,s="",l+=D(p),l%2==0){if(l>0){const h=b.exec(a);if(!h){c=t(),d=0,a="",l=0;continue e}c[i[d]]=h[1].replaceAll(E,'"'),d++}else c[i[d]]=a,d++;a="",l=0}else s=e;l===0?(yield c,c=t(),d=0):s=S}}function k(o,i){const e=N(o,i).filter(n=>n!=null),t=e.map(n=>I(n));for(let n=t.length-1;n>=0;n--)t[n]||(t.splice(n,1),e.splice(n,1));return{names:t,aliases:e}}function N(o,i){if(!o?.length)return[];const e=[];let t="",n="",a=0;const s=q(o,i);for(const l of s)if(t+=n+l,n="",a+=D(l),a%2==0){if(a>0){const c=b.exec(t);c&&e.push(c[1].replaceAll(E,'"'))}else e.push(t);t="",a=0}else n=i;return e}function D(o){let i=0,e=0;for(e=o.indexOf('"',e);e>=0;)i++,e=o.indexOf('"',e+1);return i}function ue(o,i,e,t,n){const a=[],s=v(o,e,i),l=[];for(const c of s){if(l.length===10)break;l.push(c)}for(let c=0;c<e.length;c++){const d=e[c],y=t[c];if(d===n.longitudeFieldName||d===n.latitudeFieldName)a.push({name:d,type:"esriFieldTypeDouble",alias:y});else{let f;switch(de(l.map(p=>p[d]))){case"integer":f="esriFieldTypeInteger";break;case"double":f="esriFieldTypeDouble";break;case"date":f="esriFieldTypeDate";break;default:f="esriFieldTypeString"}a.push({name:d,type:f,alias:y,length:J(f)})}}return a}function de(o){if(!o.length)return"string";const i=/[^+\-.,0-9]/;return o.map(e=>{if(e!==""){if(!i.test(e)){let t=w(e);if(!isNaN(t))return/[.,]/.test(e)||!Number.isInteger(t)||t>214783647||t<-214783648?"double":"integer";if(e.includes("E")&&(t=Number(e),!Number.isNaN(t)||e.includes(",")&&(e=e.replace(",","."),t=Number(e),!Number.isNaN(t))))return"double"}return U(e)?"date":"string"}}).reduce((e,t)=>e===void 0?t:t===void 0?e:e===t?t:e==="string"||t==="string"?"string":e==="double"||t==="double"?"double":void 0)}const w=function(){const o=ie(),i=new RegExp("^"+o.regexp+"$"),e=new RegExp("["+o.group+"\\s\\xa0]","g"),t=o.factor;return n=>{const a=i.exec(n);if(o.factor=t,!a)return NaN;let s=a[1];if(!a[1]){if(!a[2])return NaN;s=a[2],o.factor*=-1}return s=s.replace(e,"").replace(o.decimal,"."),+s*o.factor}}();function me(o){return JSON.parse(JSON.stringify(o))}const fe=re("esriGeometryPoint"),pe=["csv"],he=[0,0];class ye{constructor(i,e){this.x=i,this.y=e}}class mt{constructor(){this._queryEngine=null,this._snapshotFeatures=async i=>{const e=await this._fetch(i);return this._createFeatures(e)}}destroy(){this._queryEngine?.destroy(),this._queryEngine=null}async load(i,e={}){this._loadOptions=i;const[t]=await Promise.all([this._fetch(e.signal),this._checkProjection(i?.parsingOptions?.spatialReference)]),n=ge(t,i);this._locationInfo=n.locationInfo,this._delimiter=n.delimiter,this._queryEngine=this._createQueryEngine(n);const a=await this._createFeatures(t);this._queryEngine.featureStore.addMany(a);const{fullExtent:s,timeExtent:l}=await this._queryEngine.fetchRecomputedExtents();if(n.layerDefinition.extent=s,l){const{start:c,end:d}=l;n.layerDefinition.timeInfo.timeExtent=[c,d]}return n}async applyEdits(){throw new F("csv-layer:editing-not-supported","applyEdits() is not supported on CSVLayer")}async queryFeatures(i={},e={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQuery(i,e.signal)}async queryFeatureCount(i={},e={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForCount(i,e.signal)}async queryObjectIds(i={},e={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForIds(i,e.signal)}async queryExtent(i={},e={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForExtent(i,e.signal)}async querySnapping(i,e={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForSnapping(i,e.signal)}async refresh(i){this._loadOptions.customParameters=i,this._snapshotTask?.abort(),this._snapshotTask=j(this._snapshotFeatures),this._snapshotTask.promise.then(n=>{this._queryEngine.featureStore.clear(),n&&this._queryEngine.featureStore.addMany(n)},n=>{this._queryEngine.featureStore.clear(),R(n)||V.getLogger("esri.layers.CSVLayer").error(new F("csv-layer:refresh","An error occurred during refresh",{error:n}))}),await this._waitSnapshotComplete();const{fullExtent:e,timeExtent:t}=await this._queryEngine.fetchRecomputedExtents();return{extent:e,timeExtent:t}}async _waitSnapshotComplete(){if(this._snapshotTask&&!this._snapshotTask.finished){try{await this._snapshotTask.promise}catch{}return this._waitSnapshotComplete()}}async _fetch(i){const{url:e,customParameters:t}=this._loadOptions;if(!e)throw new F("csv-layer:invalid-source","url not defined");const n=L(e);return(await P(n.path,{query:{...n.query,...t},responseType:"text",signal:i})).data}_createQueryEngine(i){const{objectIdField:e,fields:t,extent:n,timeInfo:a}=i.layerDefinition,s=new X({geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1});return new te({fieldsIndex:_.fromLayerJSON({fields:t,dateFieldsTimeReference:{timeZoneIANA:T}}),geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1,timeInfo:a,objectIdField:e,spatialReference:n.spatialReference||{wkid:4326},featureStore:s})}async _createFeatures(i){const{latitudeFieldName:e,longitudeFieldName:t}=this._locationInfo,{objectIdField:n,fieldsIndex:a,spatialReference:s}=this._queryEngine;let l=[];const c=[],d=a.fields.filter(r=>r.name!==n).map(r=>r.name);let y=0;const f={};for(const r of a.fields)if(r.type!=="esriFieldTypeOID"&&r.type!=="esriFieldTypeGlobalID"){const u=$(r);u!==void 0&&(f[r.name]=u)}const p=v(i,d,this._delimiter,ne(f,n));for(const r of p){const u=this._parseCoordinateValue(r[e]),g=this._parseCoordinateValue(r[t]);if(g!=null&&u!=null&&!isNaN(u)&&!isNaN(g)){r[e]=u,r[t]=g;for(const m in r)if(m!==e&&m!==t)if(a.isDateField(m))r[m]=B(r[m]);else if(a.isNumericField(m)){const x=w(r[m]);isNaN(x)?r[m]=null:r[m]=x}else r[m]!=null&&(r[m]=me(r[m]));r[n]=y,y++,l.push(new ye(g,u)),c.push(r)}}if(!A({wkid:4326},s))if(G(s))for(const r of l)[r.x,r.y]=Y(r.x,r.y,he);else l=z(H,l,M.WGS84,s,null,null);const h=[];for(let r=0;r<l.length;r++){const{x:u,y:g}=l[r],m=c[r];m[n]=r+1,h.push(new K(new W([],[u,g]),m,null,m[n]))}return h}_parseCoordinateValue(i){if(i==null||i==="")return null;let e=w(i);return(isNaN(e)||Math.abs(e)>181)&&(e=parseFloat(i)),e}async _checkProjection(i){try{await ee(Q,i)}catch{throw new F("csv-layer:projection-not-supported","Projection not supported")}}}function ge(o,i){const e=i.parsingOptions||{},t={delimiter:e.delimiter,layerDefinition:null,locationInfo:{latitudeFieldName:e.latitudeField,longitudeFieldName:e.longitudeField}},n=t.layerDefinition={name:Z(i.url,pe)||"csv",dateFieldsTimeReference:{timeZoneIANA:T},drawingInfo:fe,geometryType:"esriGeometryPoint",objectIdField:null,fields:[],timeInfo:e.timeInfo,extent:{xmin:Number.POSITIVE_INFINITY,ymin:Number.POSITIVE_INFINITY,xmax:Number.NEGATIVE_INFINITY,ymax:Number.NEGATIVE_INFINITY,spatialReference:e.spatialReference||{wkid:4326}}},a=C(o),s=a.next().value?.trim(),l=a.next().value?.trim();if(!s)throw new F("csv-layer:empty-csv","CSV is empty",{csv:o});const{delimiter:c,locationInfo:d}=ce(s,l,e);if(!c)throw new F("csv-layer:invalid-delimiter","Unable to detect the delimiter from CSV",{firstLine:s,secondLine:l,parsingOptions:e});if(!d)throw new F("csv-layer:location-fields-not-found","Unable to identify latitude and longitude fields from the CSV file",{firstLine:s,secondLine:l,parsingOptions:e});t.locationInfo=d,t.delimiter=c;const{names:y,aliases:f}=k(s,c),p=ue(o,t.delimiter,y,f,t.locationInfo);if(e.fields?.length){const r=new _(e.fields);for(const u of p){const g=r.get(u.name);g&&Object.assign(u,g)}}if(!p.some(r=>r.type==="esriFieldTypeOID"&&(n.objectIdField=r.name,!0))){const r={name:"__OBJECTID",alias:"__OBJECTID",type:"esriFieldTypeOID",editable:!1,nullable:!1};n.objectIdField=r.name,p.unshift(r)}n.fields=p;const h=new _(n.fields);if(t.locationInfo&&(t.locationInfo.latitudeFieldName=h.get(t.locationInfo.latitudeFieldName).name,t.locationInfo.longitudeFieldName=h.get(t.locationInfo.longitudeFieldName).name),n.timeInfo){const r=n.timeInfo;if(r.startTimeField){const u=h.get(r.startTimeField);u?(r.startTimeField=u.name,u.type="esriFieldTypeDate"):r.startTimeField=null}if(r.endTimeField){const u=h.get(r.endTimeField);u?(r.endTimeField=u.name,u.type="esriFieldTypeDate"):r.endTimeField=null}if(r.trackIdField){const u=h.get(r.trackIdField);r.trackIdField=u?u.name:null}r.startTimeField||r.endTimeField||(n.timeInfo=null)}return t}export{mt as default};
