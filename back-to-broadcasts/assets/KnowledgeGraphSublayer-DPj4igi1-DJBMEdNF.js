const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./lclayout-CcimkDVq-BWqQJHW2.js","./_commonjsHelpers-BITg13Vk-KnjfkSck.js"])))=>i.map(i=>d[i]);
import{v as d,S as c,i as he,bW as G,bT as Ve,J as We,n as ne,em as ze,ft as F,l as Ge,m as Ze,w as Ke,P as C,bL as Xe,ac as et,_ as tt,bw as it,o as q,f as nt,an as j,j as rt,a1 as X,eM as ge,bP as ot,g as at}from"./main-Cs_aiUdl.js";import{N as ue,K as ie}from"./projection-BA9M1R7d-BWvhhUoV.js";import{z as st}from"./featureConversionUtils-D6hFQ4Af-fr8pAOas.js";import{i as Te}from"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./GraphicsLayer-DfeGaYc1-Bu8_5hFH.js";import{M as U,r as Ue,W as lt}from"./knowledgeGraphService-DOJz0fzA-B8gnSWAX.js";import{j as P}from"./Relationship-Db9GUmYx-D9XEafBR.js";import{b as Q}from"./Query-BrwMGK8U-DQSiC4Cc.js";import"./UniqueValueRenderer-fS5V0Ej1-CuFWc17F.js";import{t as le,m as pt}from"./jsonUtils-C64Zfu7c-DzeAe2ck.js";import{m as dt}from"./MultiOriginJSONSupport-DKRh9P6w-CaE7FhuM.js";import{d as yt}from"./workers-PiCjreoO-CplQWBwY.js";import{D as ut}from"./Layer-ChoECxvZ-CC9CEywo.js";import{I as ct}from"./FeatureStore-Co2V0sVE-wWBL8X6f.js";import{Z as mt}from"./QueryEngine-CH5uUhZK-Kz6pMtPf.js";import{$ as ht,d as pe}from"./clientSideDefaults-BqqayPct-Fj3B1bU3.js";import{f as ft}from"./fieldProperties-Bq26w7gt-VX-s88oZ.js";import{u as gt,o as Tt,a as bt}from"./BlendLayer-D1WkSmwP-DzwPMEXS.js";import{l as wt,s as Et}from"./FeatureEffectLayer-Cro89IEC-Y7P3K6I3.js";import{v as It,X as Nt}from"./FeatureReductionLayer-BTZjL0_Z-BIhULVQY.js";import{p as Lt,d as Dt}from"./OrderedLayer-6Qsmrd_l-Deec0p4j.js";import{T as _t}from"./RefreshableLayer-a8BQ58Xh-DFNmLCPQ.js";import{S as Mt}from"./ScaleRangeLayer-Bz0DcnvM-BWENS0jQ.js";import{x as Rt,m as St}from"./TemporalLayer-CpOrN_w9-DlkS456I.js";import{Y as vt,_ as Ct,n as kt,t as At,E as Ot,X as xt}from"./commonProperties-BtIqvFU_-C4b2YdyL.js";import{y as ee}from"./Field-C6hA1tZj-CMbYZi9Y.js";import{C as jt,q as Ft}from"./labelingInfo-DGVNul26-C8bSG2Ob.js";import{w as qt}from"./TimeInfo-w_HB2CsF-B7dClWrP.js";import{O as $t}from"./FeatureSet-BkVNthuN-XY-Ge2px.js";import{w as Pt}from"./popupUtils-B0uZcXX0-Dmvoe7_m.js";const x="ESRI__ID",ce="ESRI__OriginID",me="ESRI__DestID",Qe="ESRI__LayoutGeometry",be="ESRI__AggregationCount",z="LC.ESRI__IsSpatial",Bt={initializeLayersFromClientData:async(e,t)=>{if(t||(t=[...e.layers,...e.tables].map(o=>o.graphTypeName)),t?.length===0)return;const n=new Map;for(const o of t)n.set(o,we(e,o));const i=await lt(e.dataManager.knowledgeGraph,Array.from(n.values()));for(const o of[...e.layers,...e.tables]){const r=o.objectType.name;if(r===null)continue;const s=i.get(we(e,r));if(s){const p=JSON.parse(s);p===null||typeof p!="object"||p.hasOwnProperty("showLabels")||(p.showLabels=!1),o.read(p,{origin:"service"})}}}},we=(e,t)=>e.type==="knowledge-graph"?`${t}/Map`:`${t}/LinkChart/LinkChartSubLayer`;async function Mi(e,t){return Bt.initializeLayersFromClientData(e,t)}let de=class B{constructor(){this._featureLookup=new Map}static getInstance(){return B.instance||(B.instance=new B),B.instance}static resetInstance(){B.instance&&(B.instance=null)}deleteFromStore(t){t.forEach(n=>{this._featureLookup.delete(n)})}readFromStoreByList(t){const n=[];return t.forEach(i=>{const o=this.readFromStoreById(i);o&&n.push(o)}),n}readFromStoreById(t){return this._featureLookup.get(t)??null}writeToStore(t,n,i){const o=[];return t.forEach(r=>{if(!r?.id)return;r.properties||(r.properties=[]);let s,p=null;if(i&&r.properties[i]&&(p=st(r.properties[i])),"originId"in r&&"destinationId"in r&&(r.properties[ce]=r.originId,r.properties[me]=r.destinationId),r.properties[n]=r.id,r.id&&this._featureLookup.has(r.id)&&this._featureLookup.get(r.id).attributes){const a=this._featureLookup.get(r.id),l=JSON.parse(JSON.stringify(Object.assign(a.attributes,r.properties)));i&&r.properties[i]&&(l[i]=at(r.properties[i])),s=new Te(p?JSON.parse(JSON.stringify(p)):a?.geometry?JSON.parse(JSON.stringify(a.geometry)):null,l,null,r.properties[n])}else s=new Te(p?JSON.parse(JSON.stringify(p)):null,r.properties,null,r.properties[n]);this._featureLookup.set(`${r.typeName?`${r.typeName}__${r.id}`:r.id}`,s),o.push(s)}),o}},ye,E=null;function Ri(){return ye||(ye=tt(()=>import("./lclayout-CcimkDVq-BWqQJHW2.js"),__vite__mapDeps([0,1]),import.meta.url).then(e=>e.l).then(({default:e})=>e({locateFile:t=>it(`esri/libs/linkchartlayout/${t}`)})).then(e=>{Gt(e)}),ye)}function Gt(e){E=e}var Ee,Ie,Z,K;function Ut(e){const t=Object.keys(Z).filter(i=>isNaN(parseInt(i,10))).indexOf(e.timeDirection),n=Object.keys(K).filter(i=>isNaN(parseInt(i,10))).indexOf(e.eventsTicksVisualization);return{timeDirection:{value:t>-1?t:Z.right},timeBannerUTCOffsetInMinutes:e.timeBannerUTCOffsetInMinutes,eventsTicksVisualization:{value:n>-1?n:K.startAndEnd},showDurationLineForNonZeroDurationEntityEvents:e.showDurationLineForNonZeroDurationEntityEvents,durationLineWidth:e.durationLineWidth,entityPositionAtDurationRatio:e.entityPositionAtDurationRatio,showNonZeroDurationIntervalBounds:e.showNonZeroDurationIntervalBounds,separateTimeOverlaps:e.separateTimeOverlaps,separateTimelineOverlaps:e.separateTimelineOverlaps,moveFirstBends:e.moveFirstBends,secondBendRatio:e.secondBendRatio,lineSeparationMultiplier:e.lineSeparationMultiplier,spaceSeparatedLinesEvenly:e.spaceSeparatedLinesEvenly,useBezierCurves:e.useBezierCurves,separatedLineShapeRatio:e.separatedLineShapeRatio}}function $(e,t,n,i,o,r){const s=n.length,p=o.length,a=Float64Array.BYTES_PER_ELEMENT,l=Uint32Array.BYTES_PER_ELEMENT,h=Uint8Array.BYTES_PER_ELEMENT,g=16,y=g+s*(h+2*a)+p*(2*l),b=E._malloc(y);try{const T=b+g-b%g,u=T+s*a,D=u+s*a,L=D+p*l,w=L+p*l,N=()=>[E.HEAPF64.subarray(T>>3,(T>>3)+s),E.HEAPF64.subarray(u>>3,(u>>3)+s),E.HEAPU32.subarray(D>>2,(D>>2)+p),E.HEAPU32.subarray(L>>2,(L>>2)+p),E.HEAPU8.subarray(w,w+s)],[_,I,m,M,R]=N();_.set(n),I.set(i),m.set(o),M.set(r),R.set(t);let S=e(s,w,T,u,p,D,L),A=null,v=null;if(S){const oe=E.getLayoutLinksTypes(),ae=E.getLayoutLinksVerticesEndIndices(),se=E.getLayoutLinksVertices(),fe=E.countLayoutLinksVertices();!p||oe&&ae?fe&&!se?S=!1:(A={types:new Uint8Array(E.HEAPU8.subarray(oe,oe+p)),vertexEndIndex:new Uint32Array(E.HEAPU32.subarray(ae>>2,(ae>>2)+p)),vertices:new Float64Array(E.HEAPF64.subarray(se>>3,(se>>3)+2*fe))},v=E.getAuxiliaryGraphicElements()):S=!1}const[J,Y,V,re,Ye]=N();return n.set(J),i.set(Y),o.set(V),r.set(re),t.set(Ye),{success:S,links:A,graphics:v}}finally{E._free(b),E.cleanupLayout()}}(function(e){e[e.None=0]="None",e[e.IsMovable=1]="IsMovable",e[e.IsGeographic=2]="IsGeographic",e[e.IsRoot=4]="IsRoot",e[e.IsOld=8]="IsOld"})(Ee||(Ee={})),function(e){e[e.Regular=0]="Regular",e[e.Curved=1]="Curved",e[e.Recursive=2]="Recursive"}(Ie||(Ie={})),function(e){e[e.right=0]="right",e[e.left=1]="left",e[e.top=2]="top",e[e.bottom=3]="bottom"}(Z||(Z={})),function(e){e[e.none=0]="none",e[e.startOnly=1]="startOnly",e[e.startAndEnd=2]="startAndEnd"}(K||(K={}));const Ne=2,Le=1,De=-1;var _e,Me,Re,Se,ve,Ce,ke,Ae,Oe;(function(e){function t(){return E.getMinIdealEdgeLength()}function n(i,o,r,s,p,a=Ne,l=Le,h=De){return $((g,y,b,T,u,D,L)=>E.applyForceDirectedLayout(g,y,b,T,u,D,L,a,l,h),i,o,r,s,p)}e.getMinIdealEdgeLength=t,e.apply=n})(_e||(_e={})),function(e){function t(n,i,o,r,s,p=Ne,a=Le,l=De){return $((h,g,y,b,T,u,D)=>E.applyCommunityLayout(h,g,y,b,T,u,D,p,a,l),n,i,o,r,s)}e.apply=t}(Me||(Me={})),function(e){function t(n,i,o,r,s){return $(E.applySimpleLayout,n,i,o,r,s)}e.apply=t}(Re||(Re={})),function(e){function t(n,i,o,r,s){return $(E.applyHierarchicalLayout,n,i,o,r,s)}e.apply=t}(Se||(Se={})),function(e){function t(n,i,o,r,s){return $(E.applyRadialTreeLayout,n,i,o,r,s)}e.apply=t}(ve||(ve={})),function(e){function t(n,i,o,r,s){return $(E.applySmartTreeLayout,n,i,o,r,s)}e.apply=t}(Ce||(Ce={})),function(e){function t(n,i,o,r,s,p,a,l,h,g,y){const b={timeDirection:Z.right,timeBannerUTCOffsetInMinutes:0,eventsTicksVisualization:K.startAndEnd,showDurationLineForNonZeroDurationEntityEvents:!0,durationLineWidth:5,entityPositionAtDurationRatio:1,showNonZeroDurationIntervalBounds:!1,separateTimeOverlaps:!0,separateTimelineOverlaps:!0,moveFirstBends:!0,secondBendRatio:.3,lineSeparationMultiplier:1,spaceSeparatedLinesEvenly:!1,useBezierCurves:!1,separatedLineShapeRatio:0};return $((T,u,D,L,w,N,_)=>{if(r.length!==T||s.length!==T||l.length!==w||h.length!==w)return!1;const I=Float64Array.BYTES_PER_ELEMENT,m=16,M=E._malloc(m+T*I),R=E._malloc(m+T*I),S=E._malloc(m+w*I),A=E._malloc(m+w*I),v=M+m-M%m,J=R+m-R%m,Y=S+m-S%m,V=A+m-A%m;try{E.HEAPF64.subarray(v>>3,(v>>3)+T).set(r),E.HEAPF64.subarray(J>>3,(J>>3)+T).set(s),E.HEAPF64.subarray(Y>>3,(Y>>3)+w).set(l),E.HEAPF64.subarray(V>>3,(V>>3)+w).set(h);const re=Ut(Object.assign(b,y));return E.applyChronologicalLayout(T,u,D,L,v,J,w,N,_,Y,V,g,re)}finally{E._free(M),E._free(R),E._free(S),E._free(A)}},n,i,o,p,a)}e.apply=t}(ke||(ke={})),function(e){e[e.Undirected=0]="Undirected",e[e.Directed=1]="Directed",e[e.Reversed=2]="Reversed"}(Ae||(Ae={})),function(e){e[e.ByCC_Raw=0]="ByCC_Raw",e[e.ByCC_NormalizeGlobally=1]="ByCC_NormalizeGlobally",e[e.ByCC_NormalizeByCC=2]="ByCC_NormalizeByCC"}(Oe||(Oe={}));var te;(function(e){e.ELEMENTUID="ELEMENTUID",e.TYPENAME="TYPENAME"})(te||(te={})),te.ELEMENTUID,te.TYPENAME;var xe,je;(function(e){e[e.ELEMENTUID=0]="ELEMENTUID",e[e.TYPENAME=1]="TYPENAME"})(xe||(xe={})),function(e){e[e.ELEMENTUID=0]="ELEMENTUID",e[e.TYPENAME=1]="TYPENAME",e[e.FROMUID=2]="FROMUID",e[e.TOUID=3]="TOUID"}(je||(je={}));var Fe,qe,$e,H;(function(e){e[e.featureResult=0]="featureResult",e[e.countResult=1]="countResult",e[e.idsResult=2]="idsResult"})(Fe||(Fe={})),function(e){e[e.upperLeft=0]="upperLeft",e[e.lowerLeft=1]="lowerLeft"}(qe||(qe={})),function(e){e[e.sqlTypeBigInt=0]="sqlTypeBigInt",e[e.sqlTypeBinary=1]="sqlTypeBinary",e[e.sqlTypeBit=2]="sqlTypeBit",e[e.sqlTypeChar=3]="sqlTypeChar",e[e.sqlTypeDate=4]="sqlTypeDate",e[e.sqlTypeDecimal=5]="sqlTypeDecimal",e[e.sqlTypeDouble=6]="sqlTypeDouble",e[e.sqlTypeFloat=7]="sqlTypeFloat",e[e.sqlTypeGeometry=8]="sqlTypeGeometry",e[e.sqlTypeGUID=9]="sqlTypeGUID",e[e.sqlTypeInteger=10]="sqlTypeInteger",e[e.sqlTypeLongNVarchar=11]="sqlTypeLongNVarchar",e[e.sqlTypeLongVarbinary=12]="sqlTypeLongVarbinary",e[e.sqlTypeLongVarchar=13]="sqlTypeLongVarchar",e[e.sqlTypeNChar=14]="sqlTypeNChar",e[e.sqlTypeNVarChar=15]="sqlTypeNVarChar",e[e.sqlTypeOther=16]="sqlTypeOther",e[e.sqlTypeReal=17]="sqlTypeReal",e[e.sqlTypeSmallInt=18]="sqlTypeSmallInt",e[e.sqlTypeSqlXml=19]="sqlTypeSqlXml",e[e.sqlTypeTime=20]="sqlTypeTime",e[e.sqlTypeTimestamp=21]="sqlTypeTimestamp",e[e.sqlTypeTimestamp2=22]="sqlTypeTimestamp2",e[e.sqlTypeTinyInt=23]="sqlTypeTinyInt",e[e.sqlTypeVarbinary=24]="sqlTypeVarbinary",e[e.sqlTypeVarchar=25]="sqlTypeVarchar"}($e||($e={})),function(e){e[e.OID_ARRAY=0]="OID_ARRAY",e[e.GLOBALID_ARRAY=1]="GLOBALID_ARRAY",e[e.STRING_ARRAY=2]="STRING_ARRAY",e[e.IDENTIFIER_ARRAY=3]="IDENTIFIER_ARRAY"}(H||(H={}));function Qt(e){if(!e.spatialReference.isWGS84)throw new q("knowledge-graph:layer-support-utils","The extentToInBoundsRings function only supports WGS84 spatial references.");return e.clone().normalize().map(t=>[[t.xmin,t.ymin],[t.xmin,t.ymax],[t.xmax,t.ymax],[t.xmax,t.ymin],[t.xmin,t.ymin]])}async function Si(e,t){const n=[],i=new Map,o=[];if(t.dataModel?.relationshipTypes)for(const r of t.dataModel.relationshipTypes)r.name&&i.set(r.name,[]);for(const r of e)i.has(r.typeName)&&i.get(r.typeName)?.push(r.id);for(const[r,s]of i){if(s.length<1)continue;const p=new P({openCypherQuery:`MATCH (n)-[r:${r}]->(m) WHERE id(r) in $ids RETURN id(n), labels(n)[0], id(m), labels(m)[0]`,bindParameters:{ids:s}});o.push(U(t,p).then(async a=>{const l=a.resultRowsStream.getReader();for(;;){const{done:h,value:g}=await l.read();if(h)break;for(const y of g)n.push({id:y[0],typeName:y[1]}),n.push({id:y[2],typeName:y[3]})}}))}return await Promise.all(o),n}async function vi(e,t){t??=!1;const n={generateAllSublayers:t,namedTypeDefinitions:new Map};return await Jt(e).then(i=>{Vt(i,n)}),n}async function Ci(e){const t=await Ue(),n=new t.MapOfObjectIdentifierSets;Ht(n,t,e);const i=new t.MapOfObjectIdentifierSetsEncoder;try{i.set_map_of_identifier_sets(n),i.encode();const o=i.get_encoding_result();if(o.error.error_code!==0)throw new q("knowledge-graph:layer-support-utils",o.error.error_message);const r=structuredClone(o.get_byte_buffer());return i.delete(),r}finally{n.delete()}}function Ht(e,t,n){for(const[i,o]of n.namedTypeDefinitions){if(!o.members||o.useAllData)continue;const r=o.members.keys();let s=!1,p=!0;const a=new t.ObjectIdArray,l=new t.StringArray,h=new t.GlobalIdArray,g=new t.IdentifierArray,y=new t.ObjectIdentifierSet;for(const b of r)p&&(s=!isNaN(Number(b)),p=!1),s?a.add_objectid(Number(b)):(l.add_string(b),h.add_globalid(b)),g.add_identifier(b);y.set_oid_array(a),y.set_string_array(l),y.set_globalid_array(h),y.set_identifier_array(g),a.delete(),l.delete(),h.delete(),g.delete(),e.put_identifier_set(i,y),y.delete()}return e}async function Jt(e){const t=await nt(e,{responseType:"array-buffer"}),n=await t.data;return Yt(new Uint8Array(n))}async function Yt(e){const t=new(await Ue()).MapOfObjectIdentifierSetsDecoder,n=t.decode(new Uint8Array(e)),i=new Map;if(n.error_code!==0)throw new q("knowledge-graph:layer-support-utils",n.error_message);const o=t.get_map_of_identifier_sets(),r=o.keys,s=r.size();for(let p=0;p<s;p++){const a=r.get(p),l=o.query_identifier_set(a),h=[];if(l.id_array_type.value===H.GLOBALID_ARRAY){const g=l.get_globalid_array(),y=g.count();for(let b=0;b<y;b++)h.push(g.get_globalid_at(b))}else if(l.id_array_type.value===H.IDENTIFIER_ARRAY){const g=l.get_identifier_array(),y=g.count();for(let b=0;b<y;b++)h.push(g.get_identifier_at(b).toString())}else if(l.id_array_type.value===H.STRING_ARRAY){const g=l.get_string_array(),y=g.count();for(let b=0;b<y;b++)h.push(g.get_string_at(b))}else{if(l.id_array_type.value!==H.OID_ARRAY)throw new q("knowledge-graph:layer-support-utils","Tried to encode an unexpected ID Array type.");{const g=l.get_oid_array(),y=g.count();for(let b=0;b<y;b++)h.push(g.get_objectid_at(b).toString())}}i.set(a,h)}return t.delete(),i}function Vt(e,t){for(const[n,i]of e){const o=j(t.namedTypeDefinitions,n,()=>({useAllData:!1,members:new Map}));for(const r of i)o.members.has(r)||o.members.set(r,{id:r})}return t}let O=class extends rt{constructor(e){super(e),this._processingCacheUpdatesLookup=new Map,this.knowledgeGraph=null,this.inclusionModeDefinition={generateAllSublayers:!0,namedTypeDefinitions:new Map},this.entityTypeNames=new Set,this.relationshipTypeNames=new Set,this.geographicLookup=new Map,this.sublayerCaches=new Map,this.nodeConnectionsLookup=new Map,this.relationshipConnectionsLookup=new Map,this.memberIdTypeLookup=new Map;const t=new Map;e.knowledgeGraph.dataModel.entityTypes?.forEach(n=>{n.name&&(t.set(n.name,"entity"),this._processingCacheUpdatesLookup.set(n.name,[]),e.inclusionModeDefinition&&!e.inclusionModeDefinition?.generateAllSublayers||this.entityTypeNames.add(n.name),n.properties?.forEach(i=>{i.geometryType&&i.geometryType!=="esriGeometryNull"&&this.geographicLookup.set(n.name,{name:i.name??"",geometryType:i.geometryType})}))}),e.knowledgeGraph.dataModel.relationshipTypes?.forEach(n=>{n.name&&(t.set(n.name,"relationship"),this._processingCacheUpdatesLookup.set(n.name,[]),e.inclusionModeDefinition&&!e.inclusionModeDefinition?.generateAllSublayers||this.relationshipTypeNames.add(n.name),n.properties?.forEach(i=>{i.geometryType&&i.geometryType!=="esriGeometryNull"&&this.geographicLookup.set(n.name,{name:i.name??"",geometryType:i.geometryType})}))}),e.inclusionModeDefinition?.namedTypeDefinitions.forEach((n,i)=>{if(t.get(i)==="entity")this.entityTypeNames.add(i);else{if(t.get(i)!=="relationship")return X.getLogger(this).warn(`A named type, ${i}, was in the inclusion list that wasn't in the data model and will be removed`),void e.inclusionModeDefinition?.namedTypeDefinitions.delete(i);this.relationshipTypeNames.add(i)}const o=new Map;n.members?.forEach(r=>{j(this.memberIdTypeLookup,r.id,()=>new Set).add(i);const s=this.getById(r.id);s&&o.set(r.id,s)}),this.sublayerCaches.set(i,o)})}addToLayer(e){e.forEach(({typeName:t,id:n})=>{if(!this.inclusionModeDefinition)throw new q("knowledge-graph:layer-data-manager","You cannot add to a layer's exclusion list if it was not created with an exclusion list originally");if(this.inclusionModeDefinition.namedTypeDefinitions.has(t)){if(this.inclusionModeDefinition.namedTypeDefinitions.has(t)){const i=this.inclusionModeDefinition.namedTypeDefinitions.get(t);i.members||(i.members=new Map),i.members.set(n,{id:n}),j(this.memberIdTypeLookup,n,()=>new Set).add(t)}}else{const i=new Map;i.set(n,{id:n}),this.inclusionModeDefinition.namedTypeDefinitions.set(t,{useAllData:!1,members:i}),j(this.memberIdTypeLookup,n,()=>new Set).add(t)}})}getById(e){return de.getInstance().readFromStoreById(e)}async getData(e,t,n){if(t.objectType.name&&this.inclusionModeDefinition?.namedTypeDefinitions&&this.inclusionModeDefinition.namedTypeDefinitions.size>0&&!this.inclusionModeDefinition.namedTypeDefinitions.has(t.objectType.name))return[];let i;if(i=e||new Q({where:"1=1",outFields:["*"]}),t.parentCompositeLayer.type==="link-chart"){const o=t.parentCompositeLayer,r=this._processingCacheUpdatesLookup.get(t.objectType.name??""),s=i.outFields;s&&s.length===1&&s[0]===x&&i.where==="1=1"||await Promise.all(r??[]);const p=this.sublayerCaches.has(t.objectType.name??"")?Array.from(this.sublayerCaches.get(t.objectType.name)?.values()):[],a=[];return p.forEach(l=>{if(this.relationshipTypeNames.has(t.objectType.name)){l.geometry=o.relationshipLinkChartDiagramLookup.get(l.attributes[t.objectIdField]);const h=this.memberIdTypeLookup.get(l.attributes[ce]),g=this.memberIdTypeLookup.get(l.attributes[me]),y=this._isEndEntitySpatial(h,l,ce),b=this._isEndEntitySpatial(g,l,me);l.attributes[z]=Number(y&&b)}else{l.geometry=o.entityLinkChartDiagramLookup.get(l.attributes[t.objectIdField]);const h=this.geographicLookup.get(t.objectType.name);h&&l.attributes[h.name]?l.attributes[z]=1:l.attributes[z]=0}l.attributes[Qe]=l.geometry,a.push(l)}),a}return this.retrieveDataFromService(i,t,n)}async getConnectedRecordIds(e,t){const n=[];let i="";const o=[],r=new Map;if(e.forEach(h=>{if(this.memberIdTypeLookup.has(h))for(const g of this.memberIdTypeLookup.get(h)){if(!this.entityTypeNames.has(g))return;r.has(g)?r.get(g)?.push(h):r.set(g,[h])}}),t&&t?.length!==0){for(const h of t)i=i+h+"|";i=i.slice(0,-1)}const s={};let p="",a=-1;for(const[h,g]of r){a++,a!==0&&(p+=" UNION ");const y=`${h}_ids`;s[y]=g,p+=t&&t?.length!==0?`MATCH (n:${h}) WHERE id(n) IN $${y} WITH n MATCH (n)-[r:${i}]-(m) RETURN id(r), type(r), id(m), labels(m)[0]`:`MATCH (n:${h}) WHERE id(n) IN $${y} WITH n MATCH (n)-[r]-(m) RETURN id(r), type(r), id(m), labels(m)[0]`}if(!p)return n;const l=new Promise(h=>{(async()=>{const g=(await U(this.knowledgeGraph,new P({openCypherQuery:p,bindParameters:s}))).resultRowsStream.getReader();try{for(;;){const{done:y,value:b}=await g.read();if(y)break;for(let T=0;T<b.length;T++){const u=b[T];n.push({id:u[0],typeName:u[1]}),n.push({id:u[2],typeName:u[3]})}}}catch(y){if(y.name!=="AbortError")throw y;X.getLogger(this).info("Request aborted as expected")}})().then(()=>{h()})});return o.push(l),this.refreshCacheContent(),await Promise.all(o),n}async getRelationshipsBetweenNodes(e,t){const n=[],i="MATCH (n)-[r]->(m) WHERE id(n) IN $nodeIds AND id(m) in $nodeIds AND NOT id(r) IN $relationshipExclusionIds return id(r), type(r)",o=(await U(this.knowledgeGraph,new P({openCypherQuery:i,bindParameters:{nodeIds:e,relationshipExclusionIds:t}}))).resultRowsStream.getReader();try{for(;;){const{done:r,value:s}=await o.read();if(r)break;for(let p=0;p<s.length;p++){const a=s[p];n.push({id:a[0],typeName:a[1]})}}}catch(r){if(r.name!=="AbortError")throw r;X.getLogger(this).info("Request aborted as expected")}return n}async getRelationshipsFromNodes(e,t,n){const i=[],o="MATCH (n)-[r]-(m) WHERE id(n) IN $targetEntityIds AND id(m) in $possibleConnectionEntityIds AND NOT id(r) IN $relationshipExclusionIds return id(r), type(r)",r=(await U(this.knowledgeGraph,new P({openCypherQuery:o,bindParameters:{targetEntityIds:e,possibleConnectionEntityIds:t,relationshipExclusionIds:n}}))).resultRowsStream.getReader();try{for(;;){const{done:s,value:p}=await r.read();if(s)break;for(let a=0;a<p.length;a++){const l=p[a];i.push({id:l[0],typeName:l[1]})}}}catch(s){if(s.name!=="AbortError")throw s;X.getLogger(this).info("Request aborted as expected")}return i}async refreshCacheContent(e,t,n,i=!0){const o=de.getInstance(),r=[],s=new Map,p=new Map;this.knowledgeGraph.dataModel.entityTypes?.forEach(a=>{a.name&&p.set(a.name,a)}),this.knowledgeGraph.dataModel.relationshipTypes?.forEach(a=>{a.name&&p.set(a.name,a)}),e||this.inclusionModeDefinition?e?e.forEach(a=>{if(this.memberIdTypeLookup.has(a))for(const l of this.memberIdTypeLookup.get(a))s.has(l)?s.get(l)?.push(a):s.set(l,[a])}):this.inclusionModeDefinition?.namedTypeDefinitions?.forEach((a,l)=>{a.useAllData?s.set(l,null):a.members&&a.members.forEach(h=>{s.has(l)&&s.get(l)!==null?s.get(l)?.push(h.id):s.set(l,[h.id])})}):(this.knowledgeGraph.dataModel.entityTypes?.forEach(a=>{a.name&&s.set(a.name,null)}),this.knowledgeGraph.dataModel.entityTypes?.forEach(a=>{a.name&&s.set(a.name,null)}));for(const[a,l]of s){const h=new Promise(g=>{(async()=>{const y=new Set,b=[];let T,u="",D=!1;if(t||p.get(a)?.properties?.forEach(w=>{w.name&&y.add(w.name)}),n&&this.geographicLookup.has(a)){const w=this.geographicLookup.get(a)?.name;w&&y.add(w)}if(this.entityTypeNames.has(a))u=`MATCH (n:${a}) ${l?"WHERE id(n) IN $ids ":""}return ID(n)`,y.forEach(w=>{u+=`, n.${w}`,b.push(w)});else{if(!this.relationshipTypeNames.has(a))throw new q("knowledge-graph:layer-data-manager",`The graph type of ${a} could not be determined. Was this type set in the KG data model and inclusion definition?`);D=!0,u=`MATCH ()-[n:${a}]->() ${l?"WHERE id(n) IN $ids ":""}return ID(n), id(startNode(n)), id(endNode(n))`,y.forEach(w=>{u+=`, n.${w}`,b.push(w)})}T=new P(l?{openCypherQuery:u,bindParameters:{ids:l}}:{openCypherQuery:u});const L=(await U(this.knowledgeGraph,T)).resultRowsStream.getReader();for(;;){const{done:w,value:N}=await L.read();if(w)break;const _=[];for(let M=0;M<N.length;M++){const R=N[M];let S=0,A=0;const v={properties:{}};for(v.id=R[S],S++,A++,D&&(v.originId=R[S],S++,A++,v.destinationId=R[S],S++,A++,j(this.nodeConnectionsLookup,v.originId,()=>new Set).add(v.id),j(this.nodeConnectionsLookup,v.destinationId,()=>new Set).add(v.id),j(this.relationshipConnectionsLookup,v.id,()=>[v.originId,v.destinationId]));S<R.length;S++)v.properties[b[S-A]]=R[S];_.push(v)}const I=o.writeToStore(_,x,this.geographicLookup.get(a)?.name);this.sublayerCaches.has(a)||this.sublayerCaches.set(a,new Map),i&&!this.inclusionModeDefinition?.namedTypeDefinitions.has(a)&&this.inclusionModeDefinition?.namedTypeDefinitions.set(a,{useAllData:!1,members:new Map}),i&&!this.inclusionModeDefinition?.namedTypeDefinitions.get(a).members&&(this.inclusionModeDefinition.namedTypeDefinitions.get(a).members=new Map);const m=this.sublayerCaches.get(a);I.forEach(M=>{m?.set(M.attributes[x],M),i&&!this.inclusionModeDefinition?.namedTypeDefinitions.get(a).members.has(M.attributes[x])&&(this.inclusionModeDefinition?.namedTypeDefinitions.get(a).members.set(M.attributes[x],{id:M.attributes[x]}),j(this.memberIdTypeLookup,M.attributes[x],()=>new Set).add(a))})}})().then(()=>{g(null)})});r.push(h),this._processingCacheUpdatesLookup.get(a)?.push(h)}await Promise.all(r)}removeFromLayer(e){const t=new Set,n=new Set(e.map(i=>i.id));for(const i of e)t.add(i.typeName),this.memberIdTypeLookup.get(i.id)?.size===1?this.memberIdTypeLookup.delete(i.id):this.memberIdTypeLookup.get(i.id)?.delete(i.typeName),this.inclusionModeDefinition?.namedTypeDefinitions.forEach((o,r)=>{r===i.typeName&&o.members?.has(i.id)&&o.members.delete(i.id)});t.forEach(i=>{this.sublayerCaches.get(i)?.forEach((o,r)=>{n.has(r)&&this.sublayerCaches.get(i)?.delete(r)})})}async retrieveDataFromService(e,t,n){const i=de.getInstance(),o=new Set,r=[];let s,p="",a=[];const l=t.graphType==="relationship",h=this.inclusionModeDefinition?.namedTypeDefinitions?.get(t.objectType.name)?.useAllData,g=t.parentCompositeLayer.sublayerIdsCache.get(t.objectType.name);let y=!h&&g?Array.from(g).sort():null;if(this.inclusionModeDefinition?.namedTypeDefinitions?.get(t.objectType.name)?.useAllData)this.inclusionModeDefinition?.namedTypeDefinitions?.get(t.objectType.name)?.useAllData&&e.objectIds!=null&&(y=e.objectIds);else if(e.objectIds!=null&&y&&y.length>0){const T=e.objectIds;e.objectIds=y.filter(u=>T.includes(u))}else if(e.objectIds!=null)y=e.objectIds;else{if(this.inclusionModeDefinition?.namedTypeDefinitions.has(t.objectType.name)&&(!this.inclusionModeDefinition.namedTypeDefinitions.get(t.objectType.name)?.members||this.inclusionModeDefinition.namedTypeDefinitions.get(t.objectType.name)?.members?.size<1))return e.objectIds=[],[];e.objectIds=y}if(e.outFields!=null){const T=e.outFields;T.includes("*")?t.fields.forEach(u=>{o.add(u.name)}):T.forEach(u=>{u!==x&&u!==t.geometryFieldName&&o.add(u)})}if(e.geometry!=null){const T=e.geometry;let u;const D=t.parentCompositeLayer.dataManager.knowledgeGraph.serviceDefinition,L=D?.spatialReference,w=D?.serviceCapabilities?.geometryCapabilities;let N=w?.geometryMaxBoundingRectangleSizeX,_=w?.geometryMaxBoundingRectangleSizeY;if(T.type==="point"){let I=T;I.spatialReference?.isWGS84||(await ue(I.spatialReference,F),I=ie(I,F)),u=new ne({spatialReference:F,xmin:I.x-1e-4,ymin:I.y-1e-4,xmax:I.x+1e-4,ymax:I.y+1e-4})}else T?.extent?.spatialReference&&!T.spatialReference?.isWGS84?(await ue(T.extent.spatialReference,F),u=ie(T.extent,F)):u=T.extent;if(N&&_&&L){if(L.wkid!==4326){const I=new ne({spatialReference:L,xmax:N,ymax:_}),m=ie(I,F);N=m.xmax,_=m.ymax}if(u.xmax-u.xmin>N)throw new q("knowledge-graph:layer-data-manager",`Extent x bounds should be within ${N}° latitude, limit exceeded`);if(u.ymax-u.ymin>_)throw new q("knowledge-graph:layer-data-manager",`Extent y bounds should be within ${_}° longitude, limit exceeded`)}if(e.where!=null&&e.where!=="1=1"){const I=await ge(e.where.toUpperCase(),t.fieldsIndex);t.fields.forEach(m=>{I.fieldNames.includes(m.name)&&o.add(m.name)})}p=l?`Match ()-[n:${t.objectType.name}]->() WHERE esri.graph.ST_Intersects($param_filter_geom, n.${t.geometryFieldName}) return ID(n), id(startNode(r)), id(endNode(r))`:`Match (n:${t.objectType.name}) WHERE esri.graph.ST_Intersects($param_filter_geom, n.${t.geometryFieldName}) return ID(n)`,t.geometryFieldName&&o.add(t.geometryFieldName),o.forEach(I=>{p+=`, n.${I}`,r.push(I)}),s=new P({openCypherQuery:p,bindParameters:{param_filter_geom:new Ge({rings:Qt(u)})}})}else{let T="";if(e.where!=null&&e.where!=="1=1"){const L=await ge(e.where,t.fieldsIndex);t.fields.forEach(m=>{L.fieldNames.includes(m.name)&&o.add(m.name)});const w=new Set(["column-reference","string","number","binary-expression"]),N=new Set(["=","<","<=","<>",">",">=","AND","OR","LIKE"]);let _=!1;const I=m=>{if(m.type==="column-reference")return`n.${m.column}`;if(m.type==="string")return`'${m.value}'`;if(m.type==="number")return`${m.value}`;if(m.type==="binary-expression"&&w.has(m.left.type)&&w.has(m.right.type)&&N.has(m.operator))return`${I(m.left)} ${m.operator} ${I(m.right)}`;if(m.type==="binary-expression"&&m.operator==="LIKE"){let M="";if(m.left.type==="function"&&m.left.args.value[0].type==="column-reference")M+=`lower(n.${m.left.args.value[0].column})`;else{if(m.left.type!=="column-reference")return _=!0,"";M+=`lower(n.${m.left.column})`}if(M+=" CONTAINS (",m.right.type!=="string")return _=!0,"";{let R=m.right.value;R.charAt(0)==="%"&&(R=R.slice(1)),R.charAt(R.length-1)==="%"&&(R=R.slice(0,-1)),M+=`'${R.toLowerCase()}')`}return M}return _=!0,""};T=I(L.parseTree),_&&(T="")}let u="";u=l?`Match ()-[n:${t.objectType.name}]->()`:`Match (n:${t.objectType.name})`;let D=!1;y&&(D=!0,u+=" WHERE ID(n) IN $ids"),T&&(u+=D?" AND":" WHERE",u+=` ${T}`),u+=" return ID(n)",l&&(u+=", id(startNode(n)), id(endNode(n))"),e.returnGeometry&&t.geometryFieldName&&o.add(t.geometryFieldName),o.forEach(L=>{u+=`, n.${L}`,r.push(L)}),s=new P(y?{openCypherQuery:u,bindParameters:{ids:y}}:{openCypherQuery:u})}const b=(await U(t.parentCompositeLayer.dataManager.knowledgeGraph,s,n)).resultRowsStream.getReader();for(;;){const{done:T,value:u}=await b.read();if(T)break;const D=[];for(let L=0;L<u.length;L++){const w=u[L];let N=0,_=0;const I={properties:{}};for(I.id=w[N],N++,_++,l&&(I.originId=w[N],N++,_++,I.destinationId=w[N],N++,_++);N<w.length;N++)I.properties[r[N-_]]=w[N];D.push(I)}a=a.concat(i.writeToStore(D,x,t.parentCompositeLayer.dataManager.geographicLookup.get(t.objectType.name)?.name))}return a}_isEndEntitySpatial(e,t,n){for(const i of e??[])if(this.entityTypeNames.has(i)){const o=this.geographicLookup.get(i),r=o&&this.sublayerCaches.get(i)?.get(t.attributes[n]);if(o&&r?.attributes[o.name])return!0}return!1}};d([c()],O.prototype,"knowledgeGraph",void 0),d([c()],O.prototype,"inclusionModeDefinition",void 0),d([c()],O.prototype,"entityTypeNames",void 0),d([c()],O.prototype,"relationshipTypeNames",void 0),d([c()],O.prototype,"geographicLookup",void 0),d([c()],O.prototype,"sublayerCaches",void 0),d([c()],O.prototype,"nodeConnectionsLookup",void 0),d([c()],O.prototype,"relationshipConnectionsLookup",void 0),d([c()],O.prototype,"memberIdTypeLookup",void 0),O=d([he("esri.layers.knowledgeGraph.KnowledgeGraphLayerDataManager")],O);const Pe=ft(),Wt=e=>{let t=class extends e{constructor(){super(...arguments),this.fields=[],this.fieldsIndex=null}};return d([c(Pe.fields)],t.prototype,"fields",void 0),d([c(Pe.fieldsIndex)],t.prototype,"fieldsIndex",void 0),t=d([he("esri.layers.knowledgeGraph.KnowledgeGraphSublayerBase")],t),t};function k(e){if(!e.json)return e;e.json.write=Be(e.json.write);const t=e.json.origins;if(!t)return e;let n;for(n in t){const i=t[n];i&&(i.write=Be(i.write))}return e}function Be(e){return typeof e=="object"&&e?(e.enabled!==!1&&(e.overridePolicy=zt(e)),e):e===!0?W():e}function zt(e){const{target:t,writer:n,overridePolicy:i,...o}=e;return function(r,s){const p=He.call(this,r,s);return p.enabled?{...o,...p}:p}}function W(){return{overridePolicy:He}}function He(e,t){const n=!!this.geometryType;let i={enabled:n};return n&&(i={...i,...Je.call(this,e,t)}),i}function Je(e,t){return{ignoreOrigin:this.originIdOf(t)>ot.DEFAULTS}}let f=class extends Wt(It(wt(gt(Lt(Rt(Mt(_t(dt(ut))))))))){constructor(e){super(e),this.blendMode="normal",this.capabilities=ht(!1,!1),this.charts=null,this.definitionExpression=null,this.displayField="",this.effect=null,this.elevationInfo=null,this.featureEffect=null,this.graphType=null,this.labelsVisible=!0,this.labelingInfo=null,this.layerType=null,this.legendEnabled=!0,this.maxScale=0,this.minScale=0,this.objectIdField=x,this.objectType=null,this.opacity=1,this.orderBy=null,this.parent=null,this.parentCompositeLayer=null,this.persistenceEnabled=!0,this.popupEnabled=!0,this.popupTemplate=null,this.refreshInterval=0,this.source={openPorts:()=>this.load().then(()=>{const t=new MessageChannel;return new yt(t.port1,{channel:t,client:{queryFeatures:(n,i={})=>{const o=Q.fromJSON(n);return this.queryFeaturesJSON(o,i)}}}),[t.port2]})},this.type="knowledge-graph-sublayer",this.useViewTime=!0,this.visible=!0}get defaultPopupTemplate(){return this.createPopupTemplate()}set featureReduction(e){const t=this._normalizeFeatureReduction(e);this._set("featureReduction",t)}get fields(){const e=[];return this.objectType?.properties?.forEach(t=>{const n=t.fieldType==="esriFieldTypeOID"?"esriFieldTypeInteger":t.fieldType;e.push(ee.fromJSON({name:t.name,type:n,alias:t.alias,defaultValue:t.defaultValue,editable:t.editable,nullable:t.nullable}))}),e.push(ee.fromJSON({name:this.objectIdField,type:"esriFieldTypeString",alias:this.objectIdField,editable:!1}),ee.fromJSON({name:be,type:"esriFieldTypeInteger",alias:be,editable:!1}),ee.fromJSON({name:z,type:"esriFieldTypeInteger",alias:z,editable:!1})),e}get geometryType(){if(this.parentCompositeLayer?.type==="link-chart")return this.graphType==="relationship"?"polyline":"point";const e=this.parentCompositeLayer?.dataManager.geographicLookup.get(this.objectType?.name),t=e?.geometryType;return t&&t!=="esriGeometryNull"?G.fromJSON(t):null}get geometryFieldName(){return this.parentCompositeLayer?.type==="link-chart"?Qe:this.parentCompositeLayer?.dataManager.geographicLookup.get(this.objectType?.name)?.name??null}get graphTypeName(){return this.objectType?.name}get hasM(){const e=this.parentCompositeLayer?.dataManager.geographicLookup.get(this.objectType?.name),t=e?.name;return(t?this.objectType?.properties?.[t]:null)?.hasM??!1}get hasZ(){const e=this.parentCompositeLayer?.dataManager.geographicLookup.get(this.objectType?.name),t=e?.name;return(t?this.objectType?.properties?.[t]:null)?.hasZ??!1}set renderer(e){Ve(e,this.fieldsIndex),this._set("renderer",e)}get renderer(){return this._isOverridden("renderer")?this._get("renderer"):this.parentCompositeLayer?.type==="link-chart"?this.graphType==="relationship"?le(pe(G.toJSON("polyline")).renderer):le(pe(G.toJSON("point")).renderer):le(pe(G.toJSON(this.geometryType)).renderer)}get spatialReference(){return this.parentCompositeLayer?.dataManager?.knowledgeGraph?.dataModel?.spatialReference??We.WGS84}set timeInfo(e){this._set("timeInfo",e)}get title(){return this._isOverridden("title")?this._get("title"):this.graphTypeName}set title(e){this._set("title",e)}writeTitle(e,t){t.title=e??"Layer"}createPopupTemplate(e){return Pt(this,e)}createQuery(){return new Q({where:"1=1",outFields:["*"]})}getField(e){for(let t=0;t<this.fields.length;t++)if(this.fields[t].name===e)return this.fields[t];return null}getFieldDomain(e,t){return null}async queryFeatures(e,t){const{resolvedQuery:n,queryEngine:i}=await this._setupQueryObjects(e),o=$t.fromJSON(await i.executeQuery(n.toJSON(),t?.signal));return o.features.forEach(r=>{r.sourceLayer=this}),o}async queryFeaturesJSON(e,t){const{resolvedQuery:n,queryEngine:i}=await this._setupQueryObjects(e);return await i.executeQuery(n.toJSON(),t?.signal)}async queryFeatureCount(e,t){const{resolvedQuery:n,queryEngine:i}=await this._setupQueryObjects(e);return i.executeQueryForCount(n.toJSON(),t?.signal)}async queryExtent(e={},t){const n={...e,returnGeometry:!0},{resolvedQuery:i,queryEngine:o}=await this._setupQueryObjects(n),r=await o.executeQueryForExtent(i.toJSON(),t?.signal);let s;return s=r.extent?.xmin!=null&&r.extent?.xmax!=null&&r.extent?.ymin!=null&&r.extent?.ymax!=null?new ne(r.extent):new ne,{count:r.count,extent:s}}async queryObjectIds(e,t){const n=Q.from(e);let i;if(this.parentCompositeLayer.type==="link-chart"&&this._cachedQueryEngine)i=this._cachedQueryEngine;else{const o=await this.parentCompositeLayer.dataManager.getData(n,this,t);i=this.loadQueryEngine(o)}return i.executeQueryForIds(n.toJSON(),t?.signal)}loadQueryEngine(e){const t=new ct({geometryType:G.toJSON(this.geometryType),hasM:this.hasM,hasZ:this.hasZ}),n=new mt({fieldsIndex:this.fieldsIndex.toJSON(),geometryType:G.toJSON(this.geometryType),hasM:this.hasM,hasZ:this.hasZ,objectIdField:this.objectIdField,spatialReference:this.spatialReference.toJSON(),timeInfo:this.timeInfo?.toJSON(),featureStore:t});return n.featureStore.addMany(e),n}async refreshCachedQueryEngine(){const e=await this.parentCompositeLayer.dataManager.getData(new Q({where:"1=1",outFields:[x]}),this);this._cachedQueryEngine=this.loadQueryEngine(e)}load(e){return this.addResolvingPromise(this.parent.load(e).then(()=>{ze(this.timeInfo,this.fieldsIndex)})),Promise.resolve(this)}async _setupQueryObjects(e,t){const n=Q.from(e),i=n.geometry;let o;if(i&&!i.spatialReference?.isWGS84&&(await ue(i.spatialReference,F),n.geometry=ie(i instanceof Ge||i instanceof Ze||i instanceof Ke?i:i.extent,F)),this.parentCompositeLayer.type==="link-chart"&&this._cachedQueryEngine)o=this._cachedQueryEngine;else{const r=await this.parentCompositeLayer.dataManager.getData(n,this,t);o=this.loadQueryEngine(r)}return{resolvedQuery:n,queryEngine:o}}};d([c(k(C(Tt)))],f.prototype,"blendMode",void 0),d([c()],f.prototype,"capabilities",void 0),d([c({json:{origins:{"web-scene":{write:!1}},write:W()}})],f.prototype,"charts",void 0),d([c({readOnly:!0})],f.prototype,"defaultPopupTemplate",null),d([c({type:String,json:{origins:{service:{read:!1}},name:"layerDefinition.definitionExpression",write:{ignoreOrigin:!0}}})],f.prototype,"definitionExpression",void 0),d([c()],f.prototype,"displayField",void 0),d([c(k(C(bt)))],f.prototype,"effect",void 0),d([c()],f.prototype,"elevationInfo",void 0),d([c(k(C(Et)))],f.prototype,"featureEffect",void 0),d([c(k(C(Nt)))],f.prototype,"featureReduction",null),d([c()],f.prototype,"fields",null),d([c()],f.prototype,"geometryType",null),d([c()],f.prototype,"geometryFieldName",null),d([c({type:["entity","relationship"],nonNullable:!0,json:{write:{isRequired:!0,ignoreOrigin:!0}}})],f.prototype,"graphType",void 0),d([c({type:String,nonNullable:!0,json:{write:{isRequired:!0,ignoreOrigin:!0}}})],f.prototype,"graphTypeName",null),d([c()],f.prototype,"hasM",null),d([c()],f.prototype,"hasZ",null),d([c({type:String,json:{origins:{service:{read:!1},"portal-item":{read:!1}},write:{ignoreOrigin:!0}}})],f.prototype,"id",void 0),d([c(k(C(vt)))],f.prototype,"labelsVisible",void 0),d([c({type:[jt],json:{name:"layerDefinition.drawingInfo.labelingInfo",read:Ft,write:W()}})],f.prototype,"labelingInfo",void 0),d([c({readOnly:!0,json:{read:!1,write:{writer(e,t){switch(this.parentCompositeLayer.type){case"link-chart":t.layerType="LinkChartSubLayer";break;case"knowledge-graph":t.layerType=this.geometryType?"KnowledgeGraphSubLayer":"KnowledgeGraphSubTable"}},isRequired:!0,ignoreOrigin:!0,writerEnsuresNonNull:!0}}})],f.prototype,"layerType",void 0),d([c(k(C(Ct)))],f.prototype,"legendEnabled",void 0),d([c(k(C(kt)))],f.prototype,"maxScale",void 0),d([c(k(C(At)))],f.prototype,"minScale",void 0),d([c()],f.prototype,"objectIdField",void 0),d([c()],f.prototype,"objectType",void 0),d([c(k(C(Ot)))],f.prototype,"opacity",void 0),d([c(k(C(Dt)))],f.prototype,"orderBy",void 0),d([c({clonable:!1})],f.prototype,"parent",void 0),d([c()],f.prototype,"parentCompositeLayer",void 0),d([c(k(C(xt)))],f.prototype,"popupEnabled",void 0),d([c({type:Xe,json:{name:"popupInfo",write:{ignoreOrigin:!0}}})],f.prototype,"popupTemplate",void 0),d([c({type:Number,json:{write:{overridePolicy:Je}}})],f.prototype,"refreshInterval",void 0),d([c({types:pt,json:{name:"layerDefinition.drawingInfo.renderer",write:W()}})],f.prototype,"renderer",null),d([c()],f.prototype,"source",void 0),d([c()],f.prototype,"spatialReference",null),d([c({type:qt,json:{name:"layerDefinition.timeInfo",write:!0,origins:{"web-document":{name:"layerDefinition.timeInfo",read:!0,write:!0},"portal-item":{name:"layerDefinition.timeInfo",read:!0,write:!0}}}})],f.prototype,"timeInfo",null),d([c({type:String,json:{write:{isRequired:!0,ignoreOrigin:!0,writerEnsuresNonNull:!0}}})],f.prototype,"title",null),d([et("title")],f.prototype,"writeTitle",null),d([c({json:{read:!1}})],f.prototype,"type",void 0),d([c(k(C(St)))],f.prototype,"useViewTime",void 0),d([c({type:Boolean,json:{name:"visibility",write:W()}})],f.prototype,"visible",void 0),f=d([he("esri.layers.knowledgeGraph.KnowledgeGraphSublayer")],f);const ki=f;export{O as A,Mi as B,Ce as D,Me as E,Re as I,Si as J,ve as L,ke as M,Se as N,Ri as P,Ee as T,vi as V,Ci as Y,Ie as b,be as f,x as k,Qe as m,ce as n,de as o,me as r,ki as t,_e as w};
