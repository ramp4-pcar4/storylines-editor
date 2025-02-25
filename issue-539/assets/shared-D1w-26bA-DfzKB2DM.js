import{r as F,O as T,m as g}from"./TimeOnly-DSMefxKy-CvOCfZpK.js";import{F as G,n as S}from"./main-Ce-R8kMh.js";import{y as I}from"./Field-C6hA1tZj-Cl1VA4uk.js";var c,m;function N(e){return I.fromJSON(e.toJSON())}function P(e){return e.toJSON?e.toJSON():e}function x(e){return e instanceof Date}function w(e){return e instanceof G}function k(e){return e instanceof F}function J(e){return e instanceof T}function h(e){return e instanceof g}function B(e){if(e==null)return null;if(typeof e=="number")return e;switch(e.toLowerCase()){case"meters":case"meter":return 109404;case"miles":case"mile":return 109439;case"kilometers":case"kilometer":case"km":return 109414}return null}function E(e){if(e==null)return null;switch(e.type){case"polygon":case"multipoint":case"polyline":return e.extent;case"point":return new S({xmin:e.x,ymin:e.y,xmax:e.x,ymax:e.y,spatialReference:e.spatialReference});case"extent":return e}return null}function L(e){if(e==null)return null;if(typeof e=="number"||typeof e=="number")return e;switch(e.toLowerCase()){case"meters":case"meter":return 9001;case"miles":case"mile":return 9093;case"kilometers":case"kilometer":case"km":return 9036}return null}(function(e){e[e.Standardised=0]="Standardised",e[e.StandardisedNoInterval=1]="StandardisedNoInterval",e[e.SqlServer=2]="SqlServer",e[e.Oracle=3]="Oracle",e[e.Postgres=4]="Postgres",e[e.PGDB=5]="PGDB",e[e.FILEGDB=6]="FILEGDB",e[e.NotEvaluated=7]="NotEvaluated"})(c||(c={})),function(e){e[e.InFeatureSet=0]="InFeatureSet",e[e.NotInFeatureSet=1]="NotInFeatureSet",e[e.Unknown=2]="Unknown"}(m||(m={}));const M=1e3,R={point:"point",polygon:"polygon",polyline:"polyline",multipoint:"multipoint",extent:"extent",esriGeometryPoint:"point",esriGeometryPolygon:"polygon",esriGeometryPolyline:"polyline",esriGeometryMultipoint:"multipoint",esriGeometryEnvelope:"extent",envelope:"extent"},U={point:"esriGeometryPoint",polygon:"esriGeometryPolygon",polyline:"esriGeometryPolyline",multipoint:"esriGeometryMultipoint",extent:"esriGeometryEnvelope",esriGeometryPoint:"esriGeometryPoint",esriGeometryPolygon:"esriGeometryPolygon",esriGeometryPolyline:"esriGeometryPolyline",esriGeometryMultipoint:"esriGeometryMultipoint",esriGeometryEnvelope:"esriGeometryEnvelope",envelope:"esriGeometryEnvelope"},j={"small-integer":"esriFieldTypeSmallInteger",integer:"esriFieldTypeInteger",long:"esriFieldTypeLong",single:"esriFieldTypeSingle",double:"esriFieldTypeDouble",string:"esriFieldTypeString",date:"esriFieldTypeDate","date-only":"esriFieldTypeDateOnly","time-only":"esriFieldTypeTimeOnly","timestamp-offset":"esriFieldTypeTimestampOffset",oid:"esriFieldTypeOID",geometry:"esriFieldTypeGeometry",blob:"esriFieldTypeBlob",raster:"esriFieldTypeRaster",guid:"esriFieldTypeGUID","global-id":"esriFieldTypeGlobalID",xml:"esriFieldTypeXML","big-integer":"esriFieldTypeBigInteger",esriFieldTypeSmallInteger:"esriFieldTypeSmallInteger",esriFieldTypeInteger:"esriFieldTypeInteger",esriFieldTypeLong:"esriFieldTypeLong",esriFieldTypeSingle:"esriFieldTypeSingle",esriFieldTypeDouble:"esriFieldTypeDouble",esriFieldTypeString:"esriFieldTypeString",esriFieldTypeDate:"esriFieldTypeDate",esriFieldTypeDateOnly:"esriFieldTypeDateOnly",esriFieldTypeTimeOnly:"esriFieldTypeTimeOnly",esriFieldTypeTimestampOffset:"esriFieldTypeTimestampOffset",esriFieldTypeOID:"esriFieldTypeOID",esriFieldTypeGeometry:"esriFieldTypeGeometry",esriFieldTypeBlob:"esriFieldTypeBlob",esriFieldTypeRaster:"esriFieldTypeRaster",esriFieldTypeGUID:"esriFieldTypeGUID",esriFieldTypeGlobalID:"esriFieldTypeGlobalID",esriFieldTypeXML:"esriFieldTypeXML",esriFieldTypeBigInteger:"esriFieldTypeBigInteger"};function _(e){return e===void 0?"":e=(e=(e=e.replace(/\/featureserver\/[0-9]*/i,"/FeatureServer")).replace(/\/mapserver\/[0-9]*/i,"/MapServer")).split("?")[0]}function C(e,n){n||(n={}),typeof n=="function"&&(n={cmp:n});const d=typeof n.cycles=="boolean"&&n.cycles,f=n.cmp&&(y=n.cmp,function(l){return function(i,t){const r={key:i,value:l[i]},s={key:t,value:l[t]};return y(r,s)}});var y;const o=[];return function l(i){if(i?.toJSON&&typeof i.toJSON=="function"&&(i=i.toJSON()),i===void 0)return;if(typeof i=="number")return isFinite(i)?""+i:"null";if(typeof i!="object")return JSON.stringify(i);let t,r;if(Array.isArray(i)){for(r="[",t=0;t<i.length;t++)t&&(r+=","),r+=l(i[t])||"null";return r+"]"}if(i===null)return"null";if(o.includes(i)){if(d)return JSON.stringify("__cycle__");throw new TypeError("Converting circular structure to JSON")}const s=o.push(i)-1,p=Object.keys(i).sort(f?.(i));for(r="",t=0;t<p.length;t++){const u=p[t],a=l(i[u]);a&&(r&&(r+=","),r+=JSON.stringify(u)+":"+a)}return o.splice(s,1),"{"+r+"}"}(e)}function O(e){switch(e.type){case"catalog":case"csv":case"feature":case"geojson":case"oriented-imagery":case"subtype-group":case"wfs":return!0;default:return!1}}function X(e){switch(e.type){case"catalog-footprint":case"subtype-sublayer":return!0;default:return O(e)}}export{M as B,x as D,L as E,N as I,E as J,R as L,j as M,w as N,k as P,_ as R,C as U,c as a,P as b,O as d,U as h,X as j,B as k,h as w,J as x,m as y};
