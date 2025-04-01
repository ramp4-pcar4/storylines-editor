import{n as f,O as m}from"./main-DzfxInI5.js";import{y as u}from"./utils-9sQxfkoa-DAS0bk5F.js";import{w as _,J as p}from"./query-DFW9-NG_-Qe1Y09O5.js";import{b as l}from"./Query-BrwMGK8U-agtWjP-r.js";import{o as y}from"./projection-BA9M1R7d-Dosm3bk0.js";import{D as P,n as C}from"./featureConversionUtils-D6hFQ4Af-DsJC4rXl.js";import"./FeatureSet-BkVNthuN-BUNJL3yv.js";async function k(o,t,e){const r=u(o),s=await _(r,l.from(t),{...e}),n=s.data.extent;return!n||isNaN(n.xmin)||isNaN(n.ymin)||isNaN(n.xmax)||isNaN(n.ymax)?{count:s.data.count,extent:null}:{count:s.data.count,extent:f.fromJSON(n)}}function g(o,t){return t}function h(o,t,e,r){switch(e){case 0:return i(o,t+r,0);case 1:return o.originPosition==="lowerLeft"?i(o,t+r,1):v(o,t+r,1)}}function d(o,t,e,r){return e===2?i(o,t,2):h(o,t,e,r)}function G(o,t,e,r){return e===2?t===0?0:i(o,t,3):h(o,t,e,r)}function x(o,t,e,r){return e===3?t===0?0:i(o,t,3):d(o,t,e,r)}function i({translate:o,scale:t},e,r){return o[r]+e*t[r]}function v({translate:o,scale:t},e,r){return o[r]-e*t[r]}class M{constructor(t){this._options=t,this.geometryTypes=["esriGeometryPoint","esriGeometryMultipoint","esriGeometryPolyline","esriGeometryPolygon"],this._previousCoordinate=[0,0],this._transform=null,this._applyTransform=g,this._lengths=[],this._currentLengthIndex=0,this._toAddInCurrentPath=0,this._vertexDimension=0,this._mValueOffset=null,this._coordinateBuffer=null,this._coordinateBufferPtr=0,this._attributesConstructor=class{}}createFeatureResult(){return{fields:[],features:[]}}finishFeatureResult(t){if(this._options.applyTransform&&(t.transform=null),this._attributesConstructor=class{},this._coordinateBuffer=null,this._lengths.length=0,!t.hasZ)return;const e=y(t.geometryType,this._options.sourceSpatialReference,t.spatialReference);if(e!=null)for(const r of t.features)e(r.geometry)}createSpatialReference(){return{}}addField(t,e){const r=t.fields;m(r),r.push(e);const s=r.map(n=>n.name);this._attributesConstructor=function(){for(const n of s)this[n]=null}}addFeature(t,e){t.features.push(e)}prepareFeatures(t){switch(this._transform=t.transform,this._options.applyTransform&&t.transform&&(this._applyTransform=this._deriveApplyTransform(t)),this._mValueOffset=null,this._vertexDimension=2,t.hasZ&&this._vertexDimension++,t.hasM&&(this._mValueOffset=this._vertexDimension,this._vertexDimension++),t.geometryType){case"esriGeometryPoint":this.addCoordinate=(e,r,s)=>this.addCoordinatePoint(e,r,s),this.createGeometry=e=>this.createPointGeometry(e);break;case"esriGeometryPolygon":this.addCoordinate=(e,r,s)=>this._addCoordinatePolygon(e,r,s),this.createGeometry=e=>this._createPolygonGeometry(e);break;case"esriGeometryPolyline":this.addCoordinate=(e,r,s)=>this._addCoordinatePolyline(e,r,s),this.createGeometry=e=>this._createPolylineGeometry(e);break;case"esriGeometryMultipoint":this.addCoordinate=(e,r,s)=>this._addCoordinateMultipoint(e,r,s),this.createGeometry=e=>this._createMultipointGeometry(e)}}createFeature(){return this._lengths.length=0,this._currentLengthIndex=0,this._previousCoordinate[0]=0,this._previousCoordinate[1]=0,this._coordinateBuffer=null,this._coordinateBufferPtr=0,{attributes:new this._attributesConstructor}}allocateCoordinates(){}addLength(t,e,r){this._lengths.length===0&&(this._toAddInCurrentPath=e),this._lengths.push(e)}addQueryGeometry(t,e){const{queryGeometry:r,queryGeometryType:s}=e,n=P(r.clone(),r,!1,!1,this._transform),a=C(n,s,!1,!1);t.queryGeometryType=s,t.queryGeometry={...a}}createPointGeometry(t){const e={x:0,y:0,spatialReference:t.spatialReference};return t.hasZ&&(e.z=0),t.hasM&&(e.m=0),e}addCoordinatePoint(t,e,r){const s=this._transform;switch(e=this._applyTransform(s,e,r,0),r){case 0:t.x=e;break;case 1:t.y=e;break;case 2:"z"in t?t.z=e:t.m=e;break;case 3:t.m=e}}_transformPathLikeValue(t,e){let r=0;e<=1&&(r=this._previousCoordinate[e],this._previousCoordinate[e]+=t);const s=this._transform;return this._mValueOffset!==null&&t===0&&e>0&&!(e%this._mValueOffset)?0:this._applyTransform(s,t,e,r)}_addCoordinatePolyline(t,e,r){this._dehydratedAddPointsCoordinate(t.paths,e,r)}_addCoordinatePolygon(t,e,r){this._dehydratedAddPointsCoordinate(t.rings,e,r)}_addCoordinateMultipoint(t,e,r){r===0&&t.points.push([]);const s=this._transformPathLikeValue(e,r);t.points[t.points.length-1].push(s)}_createPolygonGeometry(t){return{rings:[[]],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}}_createPolylineGeometry(t){return{paths:[[]],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}}_createMultipointGeometry(t){return{points:[],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}}_dehydratedAddPointsCoordinate(t,e,r){r===0&&this._toAddInCurrentPath--==0&&(t.push([]),this._toAddInCurrentPath=this._lengths[++this._currentLengthIndex]-1,this._previousCoordinate[0]=0,this._previousCoordinate[1]=0);const s=this._transformPathLikeValue(e,r),n=t[t.length-1];r===0&&(this._coordinateBufferPtr=0,this._coordinateBuffer=new Array(this._vertexDimension),n.push(this._coordinateBuffer)),this._coordinateBuffer[this._coordinateBufferPtr++]=s}_deriveApplyTransform(t){const{hasZ:e,hasM:r}=t;return e&&r?x:e?d:r?G:h}}async function N(o,t,e){const r=u(o),s={...e},n=l.from(t),a=!n.quantizationParameters,{data:c}=await p(r,n,new M({sourceSpatialReference:n.sourceSpatialReference,applyTransform:a}),s);return c}export{N as T,k as g};
