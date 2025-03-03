import{o as I,gT as Z,cX as $,cY as Q,bK as b,ft as M,cM as v}from"./main-YbCtmqIL.js";import{A as O,j as A,k}from"./featureConversionUtils-D6hFQ4Af-BEHp6-cv.js";import{r as C,i as P}from"./objectIdUtils-EszJVKSV-Bi133oF_.js";import{I as G}from"./FeatureStore-Co2V0sVE-_2XdZiRC.js";import{f as E,h as _}from"./queryUtils-Brxu6254-B9__kCwN.js";import{Z as W}from"./QueryEngine-CH5uUhZK-BbOlGOoK.js";import{f as z,d as H,A as L}from"./clientSideDefaults-BqqayPct-CTZj1yvc.js";import{G as Y,c as g,F as T,j,x as w}from"./sourceUtils-BMeqkJ5g-WIMoVYXw.js";import{o as D}from"./FieldsIndex-HmzMbJQG-BIhL5jnM.js";import{i as U}from"./fieldType-CD2CL2hr-CUmnXuIg.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./BoundsStore--N6o1xkF-OepQEe2u.js";import"./PooledRBush-DbfAmeLn-H3sF8UjM.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./timeSupport-jPViR5jn-BAAfeodr.js";import"./optimizedFeatureQueryEngineAdapter-DFdaawxC-DwbpDD21.js";import"./projection-BA9M1R7d-eP4tAA5p.js";import"./projectBuffer-CvCBvJ6W-Cf0LWf3a.js";import"./normalizeUtils-Bxmy9MNI-DEYA9Qie.js";import"./normalizeUtilsCommon-CRJlkfEA-C78kdtnR.js";import"./utils-9sQxfkoa-BBQMpA0M.js";import"./utils-Bq23Xwmj-0XzA1ra1.js";import"./json-BI97KiBB-Ce5cWfI2.js";import"./LRUCache-C3erQTWv-Bk81Y5s1.js";import"./WhereClause-DxwoyBMS-HMlGXlWO.js";import"./TimeOnly-DSMefxKy-CP0cJ-pX.js";import"./UnknownTimeZone-C--TOcPG-D05etHke.js";import"./QueryEngineCapabilities-Gr588n9t-DjYb9CEb.js";import"./quantizationUtils-bJy1cRwp-nKjf7ARA.js";import"./utils-HtkT8Fn3-C0MX1EEx.js";import"./TimeExtent-Cn0Jofqr-BAId6ErU.js";import"./heatmapUtils-seiMkkkR-Dzh4e35I.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./utils-DyydRFHu-DK2KnHRd.js";import"./Basemap-BEqqSTw9-CTSy8Jgh.js";import"./loadAll-e978YItg-CiCeWkU5.js";import"./PortalItem-CctGdnxF-CSNfUncK.js";import"./writeUtils-D5qlLkwk-F43J29vJ.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-BSzsvZjb.js";import"./utils-tNxq3jkf-DMMt3xUX.js";import"./ClassBreaksDefinition-bYRgYgPp-DNebhowv.js";import"./Scheduler-B7UX7Wr5-XIcthxj3.js";import"./signal-CETehA7D-Mr9fw8uE.js";import"./capabilities-Cjn77swe-Y9lFlGVh.js";import"./date-Cqvy-TgA-DIf-QFLz.js";const B=M,J={xmin:-180,ymin:-90,xmax:180,ymax:90,spatialReference:M},K={hasAttachments:!1,capabilities:"query, editing, create, delete, update",useStandardizedQueries:!0,supportsCoordinatesQuantization:!0,supportsReturningQueryGeometry:!0,advancedQueryCapabilities:{supportsQueryAttachments:!1,supportsStatistics:!0,supportsPercentileStatistics:!0,supportsReturningGeometryCentroid:!0,supportsQueryWithDistance:!0,supportsDistinct:!0,supportsReturningQueryExtent:!0,supportsReturningGeometryProperties:!1,supportsHavingClause:!0,supportsOrderBy:!0,supportsPagination:!0,supportsQueryWithResultType:!0,supportsSqlExpression:!0,supportsDisjointSpatialRel:!0,supportsQueryWithCacheHint:!0}};function N(h){return v(h)?h.z!=null:!!h.hasZ}function V(h){return v(h)?h.m!=null:!!h.hasM}class Be{constructor(){this._queryEngine=null,this._nextObjectId=null}destroy(){this._queryEngine?.destroy(),this._queryEngine=this._createDefaultAttributes=null}async load(e){const r=[],{features:a}=e,n=this._inferLayerProperties(a,e.fields),l=e.fields||[],d=e.hasM!=null?e.hasM:!!n.hasM,f=e.hasZ!=null?e.hasZ:!!n.hasZ,p=!e.spatialReference&&!n.spatialReference,u=p?B:e.spatialReference||n.spatialReference,y=p?J:null,c=e.geometryType||n.geometryType,o=!c;let t=e.objectIdField||n.objectIdField,s=e.timeInfo;const m=new D(l);if(!o&&(p&&r.push({name:"feature-layer:spatial-reference-not-found",message:"Spatial reference not provided or found in features. Defaults to WGS84"}),!c))throw new I("feature-layer:missing-property","geometryType not set and couldn't be inferred from the provided features");if(!t)throw new I("feature-layer:missing-property","objectIdField not set and couldn't be found in the provided fields");if(n.objectIdField&&t!==n.objectIdField&&(r.push({name:"feature-layer:duplicated-oid-field",message:`Provided objectIdField "${t}" doesn't match the field name "${n.objectIdField}", found in the provided fields`}),t=n.objectIdField),t&&!n.objectIdField){const i=m.get(t);i?(t=i.name,i.type="esriFieldTypeOID",i.editable=!1,i.nullable=!1):l.unshift({alias:t,name:t,type:"esriFieldTypeOID",editable:!1,nullable:!1})}for(const i of l){if(i.name==null&&(i.name=i.alias),i.alias==null&&(i.alias=i.name),!i.name)throw new I("feature-layer:invalid-field-name","field name is missing",{field:i});if(i.name===t&&(i.type="esriFieldTypeOID"),!U.jsonValues.includes(i.type))throw new I("feature-layer:invalid-field-type",`invalid type for field "${i.name}"`,{field:i});i.length==null&&(i.length=Z(i))}const F={};for(const i of l)if(i.type!=="esriFieldTypeOID"&&i.type!=="esriFieldTypeGlobalID"){const q=$(i);q!==void 0&&(F[i.name]=q)}if(s){if(s.startTimeField){const i=m.get(s.startTimeField);i?(s.startTimeField=i.name,i.type="esriFieldTypeDate"):s.startTimeField=null}if(s.endTimeField){const i=m.get(s.endTimeField);i?(s.endTimeField=i.name,i.type="esriFieldTypeDate"):s.endTimeField=null}if(s.trackIdField){const i=m.get(s.trackIdField);i?s.trackIdField=i.name:(s.trackIdField=null,r.push({name:"feature-layer:invalid-timeInfo-trackIdField",message:"trackIdField is missing",details:{timeInfo:s}}))}s.startTimeField||s.endTimeField||(r.push({name:"feature-layer:invalid-timeInfo",message:"startTimeField and endTimeField are missing or invalid",details:{timeInfo:s}}),s=null)}const x=m.dateFields.length?{timeZoneIANA:e.dateFieldsTimeZone??Q}:null;this._createDefaultAttributes=z(F,t);const R={warnings:r,featureErrors:[],layerDefinition:{...K,drawingInfo:H(c),templates:L(F),extent:y,geometryType:c,objectIdField:t,fields:l,hasZ:f,hasM:d,timeInfo:s,dateFieldsTimeReference:x},assignedObjectIds:{}};if(this._queryEngine=new W({fieldsIndex:D.fromLayerJSON({fields:l,timeInfo:s,dateFieldsTimeReference:x}),geometryType:c,hasM:d,hasZ:f,objectIdField:t,spatialReference:u,featureStore:new G({geometryType:c,hasM:d,hasZ:f}),timeInfo:s}),!a?.length)return this._nextObjectId=C,R;const S=P(t,a);return this._nextObjectId=S+1,await E(a,u),this._loadInitialFeatures(R,a)}async applyEdits(e){const{spatialReference:r,geometryType:a}=this._queryEngine;return await Promise.all([Y(r,a),E(e.adds,r),E(e.updates,r)]),this._applyEdits(e)}queryFeatures(e,r={}){return this._queryEngine.executeQuery(e,r.signal)}queryFeatureCount(e,r={}){return this._queryEngine.executeQueryForCount(e,r.signal)}queryObjectIds(e,r={}){return this._queryEngine.executeQueryForIds(e,r.signal)}queryExtent(e,r={}){return this._queryEngine.executeQueryForExtent(e,r.signal)}querySnapping(e,r={}){return this._queryEngine.executeQueryForSnapping(e,r.signal)}_inferLayerProperties(e,r){let a,n,l=null,d=null,f=null;for(const p of e){const u=p.geometry;if(u!=null&&(l||(l=b(u)),d||(d=u.spatialReference),a==null&&(a=N(u)),n==null&&(n=V(u)),l&&d&&a!=null&&n!=null))break}if(r&&r.length){let p=null;r.some(u=>{const y=u.type==="esriFieldTypeOID",c=!u.type&&u.name&&u.name.toLowerCase()==="objectid";return p=u,y||c})&&(f=p.name)}return{geometryType:l,spatialReference:d,objectIdField:f,hasM:n,hasZ:a}}async _loadInitialFeatures(e,r){const{geometryType:a,hasM:n,hasZ:l,objectIdField:d,spatialReference:f,featureStore:p,fieldsIndex:u}=this._queryEngine,y=[];for(const t of r){if(t.uid!=null&&(e.assignedObjectIds[t.uid]=-1),t.geometry&&a!==b(t.geometry)){e.featureErrors.push(g("Incorrect geometry type."));continue}const s=this._createDefaultAttributes(),m=T(u,s,t.attributes,!0);m?e.featureErrors.push(m):(this._assignObjectId(s,t.attributes,!0),t.attributes=s,t.uid!=null&&(e.assignedObjectIds[t.uid]=t.attributes[d]),t.geometry!=null&&(t.geometry=_(t.geometry,t.geometry.spatialReference,f)),y.push(t))}p.addMany(O([],y,a,l,n,d));const{fullExtent:c,timeExtent:o}=await this._queryEngine.fetchRecomputedExtents();if(e.layerDefinition.extent=c,o){const{start:t,end:s}=o;e.layerDefinition.timeInfo.timeExtent=[t,s]}return e}async _applyEdits(e){const{adds:r,updates:a,deletes:n}=e,l={addResults:[],deleteResults:[],updateResults:[],uidToObjectId:{}};if(r?.length&&this._applyAddEdits(l,r),a?.length&&this._applyUpdateEdits(l,a),n?.length){for(const p of n)l.deleteResults.push(j(p));this._queryEngine.featureStore.removeManyById(n)}const{fullExtent:d,timeExtent:f}=await this._queryEngine.fetchRecomputedExtents();return{extent:d,timeExtent:f,featureEditResults:l}}_applyAddEdits(e,r){const{addResults:a}=e,{geometryType:n,hasM:l,hasZ:d,objectIdField:f,spatialReference:p,featureStore:u,fieldsIndex:y}=this._queryEngine,c=[];for(const o of r){if(o.geometry&&n!==b(o.geometry)){a.push(g("Incorrect geometry type."));continue}const t=this._createDefaultAttributes(),s=T(y,t,o.attributes);if(s)a.push(s);else{if(this._assignObjectId(t,o.attributes),o.attributes=t,o.uid!=null){const m=o.attributes[f];e.uidToObjectId[o.uid]=m}if(o.geometry!=null){const m=o.geometry.spatialReference??p;o.geometry=_(w(o.geometry,m),m,p)}c.push(o),a.push(j(o.attributes[f]))}}u.addMany(O([],c,n,d,l,f))}_applyUpdateEdits({updateResults:e},r){const{geometryType:a,hasM:n,hasZ:l,objectIdField:d,spatialReference:f,featureStore:p,fieldsIndex:u}=this._queryEngine;for(const y of r){const{attributes:c,geometry:o}=y,t=c?.[d];if(t==null){e.push(g(`Identifier field ${d} missing`));continue}if(!p.has(t)){e.push(g(`Feature with object id ${t} missing`));continue}const s=A(p.getFeature(t),a,l,n);if(o!=null){if(a!==b(o)){e.push(g("Incorrect geometry type."));continue}const m=o.spatialReference??f;s.geometry=_(w(o,m),m,f)}if(c){const m=T(u,s.attributes,c);if(m){e.push(m);continue}}p.add(k(s,a,l,n,d)),e.push(j(t))}}_assignObjectId(e,r,a=!1){const n=this._queryEngine.objectIdField;a&&r&&isFinite(r[n])?e[n]=r[n]:e[n]=this._nextObjectId++}}export{Be as default};
