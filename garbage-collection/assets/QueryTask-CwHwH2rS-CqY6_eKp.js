const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./meshFeatureSet-zeR2pNmE-CHSOXGFq.js","./main-DG3mLaAJ.js","./main-DFriZ8Be.css","./Mesh-DLzjDUIO-B6O4q0jt.js","./MeshTransform-C--IG09w-Rz5z2HHE.js","./mat4-DX7gBViE-BZBxR3aK.js","./common-CYWrYyJl-E8-sukrT.js","./mat4f64-Dn1WEGBx-C99QVUMW.js","./quat-BODLR7mS-BpuRlbkM.js","./mat3f64-Dh9_zhFu-BIT-k8Dm.js","./quatf64-C16JxGFv-BKWK1F8U.js","./vec32-D9GsKZ1t-Djh33dLb.js","./vec42-D8CJyqHG-DnfLTeQH.js","./imageUtils-BA2D6Uf1-Dxn05oW0.js","./MeshVertexAttributes-CbNpPur2-BZuAiy82.js","./MeshLocalVertexSpace-BqgocsoS-DFlNc8qD.js","./meshVertexSpaceUtils-B4l_Zo0M-Dc6NBqPz.js","./earcut-XDcq3zAf-BcwyrT7l.js","./Indices-DEr2HrWx-CSH5hAhn.js","./plane-Dt8R0KeE-9bwTjF2p.js","./vec2f64-CeODonrJ-CkkJCdRC.js","./vec4f64-hf2nxvhQ-CaAr8PTM.js","./deduplicate-D2d-E5Pw-vc-W2Xdu.js","./projectPointToVector-B2UUY9SE-CchSqyrw.js","./projection-BA9M1R7d-z_v9rydW.js","./projectBuffer-CvCBvJ6W-Bgqhcv9s.js","./vertexSpaceConversion-CiKaVq_u-Cs-wokJT.js","./mat3-CC4Foazl-BWjyqE2v.js","./spatialReferenceEllipsoidUtils-DUrKTvup-FCQOW1Bg.js","./computeTranslationToOriginAndRotation-wF0y9WQG-C0CYmZqR.js","./vec3-BazNroeq-CsUZqKyX.js","./BufferView-PQoE3GL7-BhCV9xAv.js","./vec2-tHZ6OaOy-xCj1obDt.js","./vec4-DWDdg1fj-CR4gZ1zI.js","./External-D_wl4XAw-CmHDMXz7.js","./infoFor3D-DIuYZyyK-BtH19JJ7.js","./FeatureSet-BkVNthuN-Biv0zYCm.js","./Field-C6hA1tZj-BI4PyXEL.js","./fieldType-CD2CL2hr-C2L6t0qI.js","./meshFeatureAttributes-BwKR5odo-BUG_Unyo.js","./RelationshipQuery-DJsz3K0U-Cui4WX9g.js","./Query-BrwMGK8U-D3hMec0J.js","./TimeExtent-Cn0Jofqr-CXXyyOXZ.js","./executeRelationshipQuery-BlX9_g4g-Bsrk0g71.js","./utils-9sQxfkoa-DrZxAeRz.js","./query-DFW9-NG_-DUU2nZvp.js","./normalizeUtils-Bxmy9MNI-DxEiUxhj.js","./normalizeUtilsCommon-CRJlkfEA-CfTP17Tn.js","./utils-Bq23Xwmj-DqpSFwwr.js","./pbfQueryUtils-F4ZE8-K8-Caj79m_g.js","./pbf-D-y3_eZO-DAV_QcpQ.js","./OptimizedFeature-EIithYlr-Cq64mIT3.js","./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js","./queryZScale-BiYV6Pr6-Cj2IWVRP.js","./queryAttachments-Bgvu3RnK-CHV24CM1.js","./AttachmentInfo-D9RFO8W2-BI-KtaYB.js","./executeBinsQuery-26-59HNS-EpGEesTp.js","./BinsQuery-DjwQZqB8-BcM1kVuM.js","./queryUtils-Brxu6254-Ci6LVgWb.js","./json-BI97KiBB-Ce5cWfI2.js","./executeTopFeaturesQuery-CjTd36wS-CEMp2HW3.js","./queryTopFeatures-IbhAPJlP-B_EYBAUA.js","./TopFeaturesQuery-Ckj_IYM7-OE3hQuIG.js","./executeForTopIds-BWxBZygF-CEJE3Cmr.js","./executeForTopExtents-3NOTiZTn-CdInaL_P.js","./executeForTopCount-Dx1gCDe1-pNq1oqui.js"])))=>i.map(i=>d[i]);
import{v as u,S as c,i as R,j as E,a as V,K as v,a_ as l,_ as a,o as d,aC as I}from"./main-DG3mLaAJ.js";import{f as T,C as w}from"./infoFor3D-DIuYZyyK-BtH19JJ7.js";import{K as f,b as A}from"./Query-BrwMGK8U-D3hMec0J.js";import{y as Q}from"./utils-9sQxfkoa-DrZxAeRz.js";import{i as j,e as P}from"./executeForIds-Z1gkLduF-BIMSuWir.js";import{T as q,g as L}from"./executeQueryPBF-o8010HS9-D85rb5JW.js";import{s as C}from"./executeQueryJSON-CcHnccia-D0atda2y.js";import{O as z}from"./FeatureSet-BkVNthuN-Biv0zYCm.js";let i=class extends E{constructor(e){super(e),this.dynamicDataSource=null,this.fieldsIndex=null,this.gdbVersion=null,this.infoFor3D=null,this.pbfSupported=!1,this.queryAttachmentsSupported=!1,this.sourceSpatialReference=null,this.url=null}get parsedUrl(){return V(this.url)}async execute(e,t){const r=await this.executeJSON(e,t);return this.featureSetFromJSON(e,r,t)}async executeJSON(e,t){const r=this._normalizeQuery(e),s=e.outStatistics?.[0]!=null,n=v("featurelayer-pbf-statistics"),o=!s||n;let p;if(this.pbfSupported&&o)try{p=await q(this.url,r,t)}catch(m){if(m.name!=="query:parsing-pbf")throw m;this.pbfSupported=!1}return this.pbfSupported&&o||(p=await C(this.url,r,t)),this._normalizeFields(p.fields),p}async featureSetFromJSON(e,t,r){if(!this._queryIs3DObjectFormat(e)||this.infoFor3D==null||!t.features)return z.fromJSON(t);const{meshFeatureSetFromJSON:s}=await l(a(()=>import("./meshFeatureSet-zeR2pNmE-CHSOXGFq.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]),import.meta.url),r);return s(e,this.infoFor3D,t)}executeForCount(e,t){return j(this.url,this._normalizeQuery(e),t)}executeForExtent(e,t){return L(this.url,this._normalizeQuery(e),t)}executeForIds(e,t){return P(this.url,this._normalizeQuery(e),t)}async executeRelationshipQuery(e,t){const[{default:r},{executeRelationshipQuery:s}]=await l(Promise.all([a(()=>import("./RelationshipQuery-DJsz3K0U-Cui4WX9g.js"),__vite__mapDeps([40,1,2,41,37,38,42]),import.meta.url).then(n=>n.R),a(()=>import("./executeRelationshipQuery-BlX9_g4g-Bsrk0g71.js"),__vite__mapDeps([43,44,1,2,45,46,47,48,49,50,51,52,53,24,25,36,37,38,40,41,42]),import.meta.url)]),t);return e=r.from(e),(this.gdbVersion||this.dynamicDataSource)&&((e=e.clone()).gdbVersion=e.gdbVersion||this.gdbVersion,e.dynamicDataSource=e.dynamicDataSource||this.dynamicDataSource),s(this.url,e,t)}async executeRelationshipQueryForCount(e,t){const[{default:r},{executeRelationshipQueryForCount:s}]=await l(Promise.all([a(()=>import("./RelationshipQuery-DJsz3K0U-Cui4WX9g.js"),__vite__mapDeps([40,1,2,41,37,38,42]),import.meta.url).then(n=>n.R),a(()=>import("./executeRelationshipQuery-BlX9_g4g-Bsrk0g71.js"),__vite__mapDeps([43,44,1,2,45,46,47,48,49,50,51,52,53,24,25,36,37,38,40,41,42]),import.meta.url)]),t);return e=r.from(e),(this.gdbVersion||this.dynamicDataSource)&&((e=e.clone()).gdbVersion=e.gdbVersion||this.gdbVersion,e.dynamicDataSource=e.dynamicDataSource||this.dynamicDataSource),s(this.url,e,t)}async executeAttachmentQuery(e,t){const{executeAttachmentQuery:r,fetchAttachments:s,processAttachmentQueryResult:n}=await l(a(()=>import("./queryAttachments-Bgvu3RnK-CHV24CM1.js"),__vite__mapDeps([54,1,2,45,46,47,44,48,49,50,51,52,53,24,25,55]),import.meta.url),t),o=Q(this.url);return n(o,await(this.queryAttachmentsSupported?r(o,e,t):s(o,e,t)))}async executeBinsQuery(e,t){const{executeBinsQuery:r}=await l(a(()=>import("./executeBinsQuery-26-59HNS-EpGEesTp.js"),__vite__mapDeps([56,44,1,2,46,47,48,45,49,50,51,52,53,24,25,57,58,59,41,37,38,42,36]),import.meta.url),t);return r(this.parsedUrl,e,t)}async executeTopFeaturesQuery(e,t){const{executeTopFeaturesQuery:r}=await l(a(()=>import("./executeTopFeaturesQuery-CjTd36wS-CEMp2HW3.js"),__vite__mapDeps([60,44,1,2,61,46,47,48,45,49,50,51,52,53,24,25,36,37,38,62,42]),import.meta.url),t);return r(this.parsedUrl,e,this.sourceSpatialReference,t)}async executeForTopIds(e,t){const{executeForTopIds:r}=await l(a(()=>import("./executeForTopIds-BWxBZygF-CEJE3Cmr.js"),__vite__mapDeps([63,44,1,2,61,46,47,48,45,49,50,51,52,53,24,25,62,42]),import.meta.url),t);return r(this.parsedUrl,e,t)}async executeForTopExtents(e,t){const{executeForTopExtents:r}=await l(a(()=>import("./executeForTopExtents-3NOTiZTn-CdInaL_P.js"),__vite__mapDeps([64,1,2,44,61,46,47,48,45,49,50,51,52,53,24,25,62,42]),import.meta.url),t);return r(this.parsedUrl,e,t)}async executeForTopCount(e,t){const{executeForTopCount:r}=await l(a(()=>import("./executeForTopCount-Dx1gCDe1-pNq1oqui.js"),__vite__mapDeps([65,44,1,2,61,46,47,48,45,49,50,51,52,53,24,25,62,42]),import.meta.url),t);return r(this.parsedUrl,e,t)}_normalizeQuery(e){let t=A.from(e);t.sourceSpatialReference=t.sourceSpatialReference||this.sourceSpatialReference,(this.gdbVersion||this.dynamicDataSource)&&(t=t===e?t.clone():t,t.gdbVersion=e.gdbVersion||this.gdbVersion,t.dynamicDataSource=e.dynamicDataSource?f.from(e.dynamicDataSource):this.dynamicDataSource);const{infoFor3D:r}=this;if(r!=null&&this._queryIs3DObjectFormat(e)){t=t===e?t.clone():t,t.formatOf3DObjects=null;const s=T(r),n=w(r);for(const o of r.queryFormats){if(o===s){t.formatOf3DObjects=o;break}o!==n||t.formatOf3DObjects||(t.formatOf3DObjects=o)}if(!t.formatOf3DObjects)throw new d("query:unsupported-3d-query-formats","Could not find any supported 3D object query format. Only supported formats are 3D_glb and 3D_gltf");if(t.outSpatialReference&&!I(t.outSpatialReference,this.sourceSpatialReference))throw new d("query:unsupported-out-spatial-reference","3D object feature services do not support projection of geometries");if(t.outFields==null||!t.outFields.includes("*")){t=t===e?t.clone():t,t.outFields==null&&(t.outFields=[]);const{originX:o,originY:p,originZ:m,translationX:h,translationY:y,translationZ:_,scaleX:S,scaleY:D,scaleZ:F,rotationX:O,rotationY:b,rotationZ:x,rotationDeg:g}=r.transformFieldRoles;t.outFields.push(o,p,m,h,y,_,S,D,F,O,b,x,g)}}return t}_normalizeFields(e){if(this.fieldsIndex!=null&&e!=null)for(const t of e){const r=this.fieldsIndex.get(t.name);r&&Object.assign(t,r.toJSON())}}_queryIs3DObjectFormat(e){return this.infoFor3D!=null&&e.returnGeometry===!0&&e.multipatchOption!=="xyFootprint"&&!e.outStatistics}};u([c({type:f})],i.prototype,"dynamicDataSource",void 0),u([c()],i.prototype,"fieldsIndex",void 0),u([c()],i.prototype,"gdbVersion",void 0),u([c()],i.prototype,"infoFor3D",void 0),u([c({readOnly:!0})],i.prototype,"parsedUrl",null),u([c()],i.prototype,"pbfSupported",void 0),u([c()],i.prototype,"queryAttachmentsSupported",void 0),u([c()],i.prototype,"sourceSpatialReference",void 0),u([c({type:String})],i.prototype,"url",void 0),i=u([R("esri.layers.graphics.sources.support.QueryTask")],i);const B=i;export{B as C};
