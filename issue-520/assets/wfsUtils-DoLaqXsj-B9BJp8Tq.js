import{f as b,ic as M,o as c,id as $,s as x,ie as C,bg as T,J as P,aC as D,bW as V,n as j,ft as L,gT as h}from"./main-CsB5uMDq.js";import{N as O,K as Y}from"./projection-BA9M1R7d-BZkWNCXI.js";import{h as W}from"./geojson-CNt_qtQf-DiTKRzNT.js";import{l as F,t as g}from"./xmlUtils-TLuV3CJ7-Cs2DGP6C.js";import{b as X}from"./arcgisLayerUrl-HNYh8jvG-ClwPRpia.js";import{y as f}from"./Field-C6hA1tZj-Dg_62fKc.js";const S="xlink:href",y="2.0.0",E="__esri_wfs_id__",q="wfs-layer:getWFSLayerTypeInfo-error",z="wfs-layer:empty-service",A="wfs-layer:feature-type-not-found",_="wfs-layer:geojson-not-supported",H="wfs-layer:kvp-encoding-not-supported",J="wfs-layer:malformed-json",N="wfs-layer:unknown-geometry-type",Q="wfs-layer:unknown-field-type",K="wfs-layer:unsupported-spatial-reference",B="wfs-layer:unsupported-wfs-version";async function xe(n,t){const e=Z((await b(n,{responseType:"text",query:{SERVICE:"WFS",REQUEST:"GetCapabilities",VERSION:y,...t?.customParameters},signal:t?.signal})).data);return ne(n,e),e}function Z(n){const t=v(n);de(t),I(t);const e=t.firstElementChild,r=M(re(e));return{operations:te(e),get featureTypes(){return Array.from(r())},readFeatureTypes:r}}const ee=["json","application/json","geojson","application/json; subtype=geojson","application/geo+json"];function R(n){for(const t of ee){const e=n.findIndex(r=>r.toLowerCase()===t);if(e>=0)return n[e]}return null}function te(n){let t=!1;const e={GetCapabilities:{url:""},DescribeFeatureType:{url:""},GetFeature:{url:"",outputFormat:null,supportsPagination:!1}},r=[],s=[];if(F(n,{OperationsMetadata:{Parameter:a=>{if(a.getAttribute("name")==="outputFormat")return{AllowedValues:{Value:({textContent:o})=>{o&&r.push(o)}}}},Operation:a=>{switch(a.getAttribute("name")){case"GetCapabilities":return{DCP:{HTTP:{Get:o=>{e.GetCapabilities.url=o.getAttribute(S)}}}};case"DescribeFeatureType":return{DCP:{HTTP:{Get:o=>{e.DescribeFeatureType.url=o.getAttribute(S)}}}};case"GetFeature":return{DCP:{HTTP:{Get:o=>{e.GetFeature.url=o.getAttribute(S)}}},Parameter:o=>{if(o.getAttribute("name")==="outputFormat")return{AllowedValues:{Value:({textContent:i})=>{i&&s.push(i)}}}}}}},Constraint:a=>{switch(a.getAttribute("name")){case"KVPEncoding":return{DefaultValue:o=>{t=o.textContent.toLowerCase()==="true"}};case"ImplementsResultPaging":return{DefaultValue:o=>{e.GetFeature.supportsPagination=o.textContent.toLowerCase()==="true"}}}}}}),e.GetFeature.outputFormat=R(s)??R(r),!t)throw new c(H,"WFS service doesn't support key/value pair (KVP) encoding");if(e.GetFeature.outputFormat==null)throw new c(_,"WFS service doesn't support GeoJSON output format");return e}function ne(n,t){$(n)&&(x(n,t.operations.DescribeFeatureType.url,!0)&&(t.operations.DescribeFeatureType.url=C(t.operations.DescribeFeatureType.url)),x(n,t.operations.GetFeature.url,!0)&&(t.operations.GetFeature.url=C(t.operations.GetFeature.url)))}function k(n){const t=parseInt(n.textContent?.match(/(?<wkid>\d+$)/i)?.groups?.wkid??"",10);if(!Number.isNaN(t))return t}function re(n){return g(n,{FeatureTypeList:{FeatureType:t=>{const e={typeName:"undefined:undefined",name:"",title:"",description:"",extent:null,namespacePrefix:"",namespaceUri:"",defaultSpatialReference:4326,supportedSpatialReferences:[]},r=new Set;return F(t,{Name:s=>{const{name:a,prefix:o}=w(s.textContent);e.typeName=`${o}:${a}`,e.name=a,e.namespacePrefix=o,e.namespaceUri=s.lookupNamespaceURI(o)},Abstract:s=>{e.description=s.textContent},Title:s=>{e.title=s.textContent},WGS84BoundingBox:s=>{e.extent=j.fromJSON(ae(s))},DefaultCRS:s=>{const a=k(s);a&&(e.defaultSpatialReference=a,r.add(a))},OtherCRS:s=>{const a=k(s);a&&r.add(a)}}),e.title||(e.title=e.name),r.add(4326),e.supportedSpatialReferences.push(...r),e}}})}function ae(n){let t,e,r,s;for(const a of n.children)switch(a.localName){case"LowerCorner":[t,e]=a.textContent.split(" ").map(o=>Number.parseFloat(o));break;case"UpperCorner":[r,s]=a.textContent.split(" ").map(o=>Number.parseFloat(o))}return{xmin:t,ymin:e,xmax:r,ymax:s,spatialReference:L}}function se(n,t,e){return T(n,r=>e?r.name===t&&r.namespaceUri===e:r.typeName===t||r.name===t)}async function Ce(n,t,e,r={}){const{featureType:s,extent:a}=await oe(n,t,e,r),{spatialReference:o}=ge(n.operations.GetFeature.url,s,r.spatialReference),{fields:i,geometryType:u,swapXY:p,objectIdField:l,geometryField:m}=await ie(n,s,o,r);return{url:n.operations.GetCapabilities.url,name:s.name,namespaceUri:s.namespaceUri,fields:i,geometryField:m,geometryType:u,objectIdField:l,spatialReference:r.spatialReference??new P({wkid:s.defaultSpatialReference}),extent:a,swapXY:p,wfsCapabilities:n,customParameters:r.customParameters}}async function oe(n,t,e,r={}){const s=n.readFeatureTypes(),a=t?se(s,t,e):s.next().value,{spatialReference:o=new P({wkid:a?.defaultSpatialReference})}=r;if(a==null)throw t?new c(A,`The type '${t}' could not be found in the service`):new c(z,"The service is empty");let i=a.extent;if(i&&!D(i.spatialReference,o))try{await O(i.spatialReference,o,void 0,r),i=Y(i,o)}catch{throw new c(K,"Projection not supported")}return{extent:i,spatialReference:o,featureType:a}}async function ie(n,t,e,r={}){const{typeName:s}=t,[a,o]=await Promise.allSettled([le(n.operations.DescribeFeatureType.url,s,r),pe(n,s,e,r)]),i=d=>new c(q,`An error occurred while getting info about the feature type '${s}'`,{error:d});if(a.status==="rejected")throw i(a.reason);if(o.status==="rejected")throw i(o.reason);const{fields:u,errors:p}=a.value??{},l=a.value?.geometryType||o.value?.geometryType,m=o.value?.swapXY??!1;if(l==null)throw new c(N,`The geometry type could not be determined for type '${s}`,{typeName:s,geometryType:l,fields:u,errors:p});return{...ue(u??[]),geometryType:l,swapXY:m}}function ue(n){const t=n.find(r=>r.type==="geometry");let e=n.find(r=>r.type==="oid");return n=n.filter(r=>r.type!=="geometry"),e||(e=new f({name:E,type:"oid",alias:E}),n.unshift(e)),{geometryField:t?.name??null,objectIdField:e.name,fields:n}}async function pe(n,t,e,r={}){let s,a=!1;const[o,i]=await Promise.all([ye(n.operations.GetFeature.url,t,e,n.operations.GetFeature.outputFormat,{...r,count:1}),b(n.operations.GetFeature.url,{responseType:"text",query:G(t,e,void 0,{...r,count:1}),signal:r?.signal})]),u=o.type==="FeatureCollection"&&o.features[0]?.geometry;if(u){let p;switch(s=V.fromJSON(W(u.type)),u.type){case"Point":p=u.coordinates;break;case"LineString":case"MultiPoint":p=u.coordinates[0];break;case"MultiLineString":case"Polygon":p=u.coordinates[0][0];break;case"MultiPolygon":p=u.coordinates[0][0][0]}const l=/<[^>]*pos[^>]*> *(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/.exec(i.data);if(l){const m=p[0].toFixed(3),d=p[1].toFixed(3),U=parseFloat(l[1]).toFixed(3);m===parseFloat(l[2]).toFixed(3)&&d===U&&(a=!0)}}return{geometryType:s,swapXY:a}}async function le(n,t,e){return ce(t,(await b(n,{responseType:"text",query:{SERVICE:"WFS",REQUEST:"DescribeFeatureType",VERSION:y,TYPENAME:t,TYPENAMES:t,...e?.customParameters},signal:e?.signal})).data)}function ce(n,t){const{name:e}=w(n),r=v(t);I(r);const s=T(g(r.firstElementChild,{element:a=>a}),a=>a.getAttribute("name")===e);if(s!=null){const a=s.getAttribute("type"),o=a?T(g(r.firstElementChild,{complexType:i=>i}),i=>i.getAttribute("name")===w(a).name):T(g(s,{complexType:i=>i}),()=>!0);if(o)return fe(o)}throw new c(A,`Type '${n}' not found in document`,{document:new XMLSerializer().serializeToString(r)})}const me=new Set(["objectid","fid"]);function fe(n){const t=[],e=[];let r;const s=g(n,{complexContent:{extension:{sequence:{element:a=>a}}}});for(const a of s){const o=a.getAttribute("name");if(!o)continue;let i,u;if(a.hasAttribute("type")?i=w(a.getAttribute("type")).name:F(a,{simpleType:{restriction:m=>(i=w(m.getAttribute("base")).name,{maxLength:d=>{u=+d.getAttribute("value")}})}}),!i)continue;const p=a.getAttribute("nillable")==="true";let l=!1;switch(i.toLowerCase()){case"integer":case"nonpositiveinteger":case"negativeinteger":case"long":case"int":case"short":case"byte":case"nonnegativeinteger":case"unsignedlong":case"unsignedint":case"unsignedshort":case"unsignedbyte":case"positiveinteger":e.push(new f({name:o,alias:o,type:"integer",nullable:p,length:h("integer")}));break;case"float":case"double":case"decimal":e.push(new f({name:o,alias:o,type:"double",nullable:p,length:h("double")}));break;case"boolean":case"string":case"gyearmonth":case"gyear":case"gmonthday":case"gday":case"gmonth":case"anyuri":case"qname":case"notation":case"normalizedstring":case"token":case"language":case"idrefs":case"entities":case"nmtoken":case"nmtokens":case"name":case"ncname":case"id":case"idref":case"entity":case"duration":case"time":e.push(new f({name:o,alias:o,type:"string",nullable:p,length:u??h("string")}));break;case"datetime":case"date":e.push(new f({name:o,alias:o,type:"date",nullable:p,length:u??h("date")}));break;case"pointpropertytype":r="point",l=!0;break;case"multipointpropertytype":r="multipoint",l=!0;break;case"curvepropertytype":case"multicurvepropertytype":case"multilinestringpropertytype":r="polyline",l=!0;break;case"surfacepropertytype":case"multisurfacepropertytype":case"multipolygonpropertytype":r="polygon",l=!0;break;case"geometrypropertytype":case"multigeometrypropertytype":l=!0,t.push(new c(N,`geometry type '${i}' is not supported`,{type:new XMLSerializer().serializeToString(n)}));break;default:t.push(new c(Q,`Unknown field type '${i}'`,{type:new XMLSerializer().serializeToString(n)}))}l&&e.push(new f({name:o,alias:o,type:"geometry",nullable:p}))}for(const a of e)if(a.type==="integer"&&!a.nullable&&me.has(a.name.toLowerCase())){a.type="oid";break}return{geometryType:r,fields:e,errors:t}}async function ye(n,t,e,r,s){let{data:a}=await b(n,{responseType:"text",query:G(t,e,r,s),signal:s?.signal});a=a.replaceAll(/": +(-?\d+),(\d+)(,)?/g,'": $1.$2$3');try{return JSON.parse(a)}catch(o){throw new c(J,"Error while parsing the response",{response:a,error:o})}}function G(n,t,e,r){const s=typeof t=="number"?t:t.wkid;return{SERVICE:"WFS",REQUEST:"GetFeature",VERSION:y,TYPENAMES:n,OUTPUTFORMAT:e,SRSNAME:"EPSG:"+s,STARTINDEX:r?.startIndex,COUNT:r?.count,...r?.customParameters}}async function Ee(n,t,e){const r=await b(n,{responseType:"text",query:{SERVICE:"WFS",REQUEST:"GetFeature",VERSION:y,TYPENAMES:t,RESULTTYPE:"hits",...e?.customParameters},signal:e?.signal}),s=/numberMatched=["'](?<numberMatched>\d+)["']/gi.exec(r.data);if(s?.groups)return+s.groups.numberMatched}function v(n){return new DOMParser().parseFromString(n.trim(),"text/xml")}function w(n){const[t,e]=n.split(":");return{prefix:e?t:"",name:e??t}}function de(n){const t=n.firstElementChild?.getAttribute("version");if(t&&t!==y)throw new c(B,`Unsupported WFS version ${t}. Supported version: ${y}`)}function I(n){let t="",e="";if(F(n.firstElementChild,{Exception:r=>(t=r.getAttribute("exceptionCode"),{ExceptionText:s=>{e=s.textContent}})}),t)throw new c(`wfs-layer:${t}`,e)}function ge(n,t,e){const r={wkid:t.defaultSpatialReference},s=e?.wkid!=null?{wkid:e.wkid}:r;return{spatialReference:s,getFeatureSpatialReference:X(n)||s.wkid&&t.supportedSpatialReferences.includes(s.wkid)?{wkid:s.wkid}:{wkid:t.defaultSpatialReference}}}export{ue as G,ye as I,ge as V,Ee as b,Ce as c,xe as r,se as v,E as x};
