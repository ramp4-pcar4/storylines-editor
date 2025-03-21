import{o as j,Y as q,y as ee,f as x,cY as ne,J as k,b8 as J,ft as te,a as A,a1 as ie}from"./main-DG3mLaAJ.js";import{U as ae,n as se,z as re}from"./featureConversionUtils-D6hFQ4Af-DwIiXa25.js";import{t as oe}from"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import{X as le,Y as ce,_ as ue}from"./geojson-CNt_qtQf-BzUXtSaf.js";import{d as de}from"./clientSideDefaults-BqqayPct-CsiNml2F.js";import{F as fe}from"./sourceUtils-BMeqkJ5g-CLYci_gr.js";import{o as Y}from"./FieldsIndex-HmzMbJQG-Bvj_BPrI.js";import{i as me}from"./fieldType-CD2CL2hr-C2L6t0qI.js";const G=()=>ie.getLogger("esri.layers.ogc.ogcFeatureUtils"),z="startindex",ge=new Set([z,"offset"]),U="http://www.opengis.net/def/crs/",Oe=`${U}OGC/1.3/CRS84`;var l;async function $e(e,t,n={},i=5){const{links:a}=e,o=g(a,"items",l.geojson)||g(a,"http://www.opengis.net/def/rel/ogc/1.0/items",l.geojson);if(o==null)throw new j("ogc-feature-layer:missing-items-page","Missing items url");const{apiKey:u,customParameters:d,signal:m}=n,p=q(o.href,e.landingPage.url),T={limit:i,...d,token:u},S=ee(p,T),W={accept:l.geojson},{data:v}=await x(S,{signal:m,headers:W}),N=Ie(S,i,v.links)??z;le(v);const f=ce(v,{geometryType:t.geometryType}),h=t.fields||f.fields||[],R=t.hasZ!=null?t.hasZ:f.hasZ,y=f.geometryType,w=t.objectIdField||f.objectIdFieldName||"OBJECTID";let r=t.timeInfo;const P=h.find(({name:s})=>s===w);if(P)P.editable=!1,P.nullable=!1;else{if(!f.objectIdFieldType)throw new j("ogc-feature-layer:missing-feature-id","Collection geojson require a feature id as a unique identifier");h.unshift({name:w,alias:w,type:f.objectIdFieldType==="number"?"esriFieldTypeOID":"esriFieldTypeString",editable:!1,nullable:!1})}if(w!==f.objectIdFieldName){const s=h.find(({name:c})=>c===f.objectIdFieldName);s&&(s.type="esriFieldTypeInteger")}h===f.fields&&f.unknownFields.length>0&&G().warn({name:"ogc-feature-layer:unknown-field-types",message:"Some fields types couldn't be inferred from the features and were dropped",details:{unknownFields:f.unknownFields}});for(const s of h){if(s.name==null&&(s.name=s.alias),s.alias==null&&(s.alias=s.name),s.type!=="esriFieldTypeOID"&&s.type!=="esriFieldTypeGlobalID"&&(s.editable=s.editable==null||!!s.editable,s.nullable=s.nullable==null||!!s.nullable),!s.name)throw new j("ogc-feature-layer:invalid-field-name","field name is missing",{field:s});if(!me.jsonValues.includes(s.type))throw new j("ogc-feature-layer:invalid-field-type",`invalid type for field "${s.name}"`,{field:s})}if(r){const s=new Y(h);if(r.startTimeField){const c=s.get(r.startTimeField);c?(r.startTimeField=c.name,c.type="esriFieldTypeDate"):r.startTimeField=null}if(r.endTimeField){const c=s.get(r.endTimeField);c?(r.endTimeField=c.name,c.type="esriFieldTypeDate"):r.endTimeField=null}if(r.trackIdField){const c=s.get(r.trackIdField);c?r.trackIdField=c.name:(r.trackIdField=null,G().warn({name:"ogc-feature-layer:invalid-timeInfo-trackIdField",message:"trackIdField is missing",details:{timeInfo:r}}))}r.timeReference||={timeZoneIANA:ne},r.startTimeField||r.endTimeField||(G().warn({name:"ogc-feature-layer:invalid-timeInfo",message:"startTimeField and endTimeField are missing",details:{timeInfo:r}}),r=void 0)}return{drawingInfo:y?de(y):null,extent:Fe(e),geometryType:y,fields:h,hasZ:!!R,objectIdField:w,paginationParameter:N,timeInfo:r}}async function qe(e,t={}){const{links:n,url:i}=e,a=g(n,"data",l.json)||g(n,"http://www.opengis.net/def/rel/ogc/1.0/data",l.json);if(a==null)throw new j("ogc-feature-layer:missing-collections-page","Missing collections url");const{apiKey:o,customParameters:u,signal:d}=t,m=q(a.href,i),{data:p}=await x(m,{signal:d,headers:{accept:l.json},query:{...u,token:o}});for(const T of p.collections)T.landingPage=e;return p}async function Ce(e,t={}){const{links:n,url:i}=e,a=g(n,"conformance",l.json)||g(n,"http://www.opengis.net/def/rel/ogc/1.0/conformance",l.json);if(a==null)throw new j("ogc-feature-layer:missing-conformance-page","Missing conformance url");const{apiKey:o,customParameters:u,signal:d}=t,m=q(a.href,i),{data:p}=await x(m,{signal:d,headers:{accept:l.json},query:{...u,token:o}});return p}async function Ge(e,t={}){const{apiKey:n,customParameters:i,signal:a}=t,{data:o}=await x(e,{signal:a,headers:{accept:l.json},query:{...i,token:n}});return o.url=e,o}async function We(e,t={}){const{links:n,url:i}=e,a=g(n,"service-desc",l.openapi);if(a==null)return G().warn("ogc-feature-layer:missing-openapi-page","The OGC API-Features server does not have an OpenAPI page."),null;const{apiKey:o,customParameters:u,signal:d}=t,m=q(a.href,i),{data:p}=await x(m,{signal:d,headers:{accept:l.openapi},query:{...u,token:o}});return p}function Re(e){const t=/^http:\/\/www\.opengis.net\/def\/crs\/(?<authority>.*)\/(?<version>.*)\/(?<code>.*)$/i.exec(e),n=t?.groups;if(!n)return null;const{authority:i,code:a}=n;switch(i.toLowerCase()){case"ogc":switch(a.toLowerCase()){case"crs27":return k.GCS_NAD_1927.wkid;case"crs83":return 4269;case"crs84":case"crs84h":return k.WGS84.wkid;default:return null}case"esri":case"epsg":{const o=Number.parseInt(a,10);return Number.isNaN(o)?null:o}default:return null}}async function De(e,t,n){const i=await pe(e,t,n);return ae(i)}async function pe(e,t,n){const{collection:{links:i,landingPage:{url:a}},layerDefinition:o,maxRecordCount:u,queryParameters:{apiKey:d,customParameters:m},spatialReference:p,supportedCrs:T}=e,S=g(i,"items",l.geojson)||g(i,"http://www.opengis.net/def/rel/ogc/1.0/items",l.geojson);if(S==null)throw new j("ogc-feature-layer:missing-items-page","Missing items url");const{geometry:W,num:v,start:N,timeExtent:f,where:h}=t;if(t.objectIds)throw new j("ogc-feature-layer:query-by-objectids-not-supported","Queries with object ids are not supported");const R=k.fromJSON(p),y=t.outSpatialReference??R,w=y.isWGS84?null:E(y,T),r=he(W,T),P=we(f),s=be(h),c=v??(N==null?u:10),Q=N===0?void 0:N,{fields:K,geometryType:C,hasZ:D,objectIdField:O,paginationParameter:V}=o,X=q(S.href,a),{data:L}=await x(X,{...n,query:{...m,...r,crs:w,datetime:P,query:s,limit:c,[V]:Q,token:d},headers:{accept:l.geojson}}),$=ue(L,{geometryType:C,hasZ:D,objectIdField:O}),B=$.length===c&&!!g(L.links??[],"next",l.geojson),_=new Y(K);for(const b of $){const I={};fe(_,I,b.attributes,!0);for(const M of _.fields)M.nullable&&!(M.name in I)&&(I[M.name]=null);I[O]=b.attributes[O],b.attributes=I}if(!w&&y.isWebMercator){for(const b of $)if(b.geometry!=null&&C!=null){const I=se(b.geometry,C,D,!1);I.spatialReference=k.WGS84,b.geometry=re(J(I,y))}}for(const b of $)b.objectId=b.attributes[O];const H=w||!w&&y.isWebMercator?y.toJSON():te,F=new oe;return F.exceededTransferLimit=B,F.features=$,F.fields=K,F.geometryType=C,F.hasZ=D,F.objectIdFieldName=O,F.spatialReference=H,F}function ye(e){return e!=null&&e.type==="extent"}function E(e,t){const{isWebMercator:n,wkid:i}=e;if(!i)return null;const a=n?t[3857]??t[102100]??t[102113]??t[900913]:t[e.wkid];return a?`${U}${a}`:null}function Z(e){if(e==null)return"";const{xmin:t,ymin:n,xmax:i,ymax:a}=e;return`${t},${n},${i},${a}`}function we(e){if(e==null)return null;const{start:t,end:n}=e;return`${t!=null?t.toISOString():".."}/${n!=null?n.toISOString():".."}`}function be(e){return e!=null&&e&&e!=="1=1"?e:null}function he(e,t){if(!ye(e))return null;const{spatialReference:n}=e;if(!n||n.isWGS84)return{bbox:Z(e)};const i=E(n,t);return i!=null?{bbox:Z(e),"bbox-crs":i}:n.isWebMercator?{bbox:Z(J(e,k.WGS84))}:null}function Fe(e){const t=e.extent?.spatial;if(!t)return null;const n=t.bbox[0],i=n.length===4,[a,o]=n,u=i?void 0:n[2];return{xmin:a,ymin:o,xmax:i?n[2]:n[3],ymax:i?n[3]:n[4],zmin:u,zmax:i?void 0:n[5],spatialReference:k.WGS84.toJSON()}}function g(e,t,n){return e.find(({rel:i,type:a})=>i===t&&a===n)??e.find(({rel:i,type:a})=>i===t&&!a)}function Ie(e,t,n){if(!n)return;const i=g(n,"next",l.geojson),a=A(i?.href)?.query;if(!a)return;const o=A(e).query,u=Object.keys(o??{});return Object.entries(a).filter(([d])=>!u.includes(d)).find(([d,m])=>ge.has(d.toLowerCase())&&Number.parseInt(m,10)===t)?.[0]}(function(e){e.json="application/json",e.geojson="application/geo+json",e.openapi="application/vnd.oai.openapi+json;version=3.0"})(l||(l={}));export{We as F,Ge as I,U as M,De as T,pe as _,qe as b,Ce as h,Re as j,$e as w,Oe as y};
