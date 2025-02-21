import{v as f,bz as p,i as u,n as a,w as S}from"./main-DeZqmqPk.js";import{s as d}from"./projection-BA9M1R7d-BtbzAhyR.js";import{D as i,w as y,y as x,k as h,f as O,A as N,M as J,v,R as w}from"./dataUtils-BkPy4R3C-DNiGqvsJ.js";import{d as k,V as B,t as P,S as b}from"./RasterSymbolizer-BVys6HkM-DRhtu7Xk.js";import{h as g,q as z,x as D,v as T}from"./PolynomialTransform-C3nWCu0l-DfA9dDDz.js";import{$ as R,L as F,K as G}from"./rasterProjectionHelper-Calp0o_1-BGzDcd4E.js";import"./projectBuffer-CvCBvJ6W-qBsxM2mD.js";import"./_commonjsHelpers-BITg13Vk-KnjfkSck.js";import"./colorUtils-Cthpxcks-D5qcMJ82.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./colorRamps-q0bZVhs2-aLwto34y.js";import"./Field-C6hA1tZj-C7DinTol.js";import"./fieldType-CD2CL2hr-D-XRGi4V.js";var m;let l=m=class extends z{constructor(){super(...arguments),this.type="identity"}clone(){return new m}};f([p({IdentityXform:"identity"})],l.prototype,"type",void 0),l=m=f([u("esri.layers.support.rasterTransforms.IdentityTransform")],l);const I=l,A={GCSShiftXform:D,IdentityXform:I,PolynomialXform:T};function j(n){if(!n?.type)return null;const r=A[n?.type];if(r){const t=new r;return t.read(n),t}return null}class _{convertVectorFieldData(r){const t=i.fromJSON(r.pixelBlock),s=y(t,r.type);return Promise.resolve(s!=null?s.toJSON():null)}computeStatisticsHistograms(r){const t=i.fromJSON(r.pixelBlock),s=k(t);return Promise.resolve(s)}async decode(r){const t=await B(r.data,r.options);return t&&t.toJSON()}symbolize(r){r.pixelBlock=i.fromJSON(r.pixelBlock),r.extent=r.extent?a.fromJSON(r.extent):null;const t=this.symbolizer.symbolize(r);return Promise.resolve(t!=null?t.toJSON():null)}async updateSymbolizer(r){this.symbolizer=P.fromJSON(r.symbolizerJSON),r.histograms&&this.symbolizer?.rendererJSON.type==="rasterStretch"&&(this.symbolizer.rendererJSON.histograms=r.histograms)}async updateRasterFunction(r){this.rasterFunction=g(r.rasterFunctionJSON)}async process(r){const t=this.rasterFunction.process({extent:a.fromJSON(r.extent),primaryPixelBlocks:r.primaryPixelBlocks.map(s=>s!=null?i.fromJSON(s):null),primaryPixelSizes:r.primaryPixelSizes?.map(s=>s!=null?S.fromJSON(s):null),primaryRasterIds:r.primaryRasterIds});return t!=null?t.toJSON():null}stretch(r){const t=this.symbolizer.simpleStretch(i.fromJSON(r.srcPixelBlock),r.stretchParams);return Promise.resolve(t?.toJSON())}estimateStatisticsHistograms(r){const t=b(i.fromJSON(r.srcPixelBlock));return Promise.resolve(t)}split(r){const t=x(i.fromJSON(r.srcPixelBlock),r.tileSize,r.maximumPyramidLevel??0,r.useBilinear===!1);return t&&t.forEach((s,e)=>{t.set(e,s?.toJSON())}),Promise.resolve(t)}clipTile(r){const t=i.fromJSON(r.pixelBlock),s=h({...r,pixelBlock:t});return Promise.resolve(s?.toJSON())}async mosaicAndTransform(r){const t=r.srcPixelBlocks.map(c=>c?new i(c):null),s=O(t,r.srcMosaicSize,{blockWidths:r.blockWidths,alignmentInfo:r.alignmentInfo,clipOffset:r.clipOffset,clipSize:r.clipSize});let e,o=s;return r.coefs&&(o=N(s,r.destDimension,r.coefs,r.sampleSpacing,r.interpolation)),r.projectDirections&&r.gcsGrid&&(e=J(r.destDimension,r.gcsGrid),o=v(o,r.isUV?"vector-uv":"vector-magdir",e)),{pixelBlock:o?.toJSON(),localNorthDirections:e}}async createFlowMesh(r,t){const s={data:new Float32Array(r.flowData.buffer),mask:new Uint8Array(r.flowData.maskBuffer),width:r.flowData.width,height:r.flowData.height},{vertexData:e,indexData:o}=await w(r.meshType,r.simulationSettings,s,t.signal);return{result:{vertexBuffer:e.buffer,indexBuffer:o.buffer},transferList:[e.buffer,o.buffer]}}async getProjectionOffsetGrid(r){const t=a.fromJSON(r.projectedExtent),s=a.fromJSON(r.srcBufferExtent);let e=null;r.datumTransformationSteps&&(e=new d({steps:r.datumTransformationSteps})),(r.includeGCSGrid||R(t.spatialReference,s.spatialReference,e))&&await F();const o=r.rasterTransform?j(r.rasterTransform):null;return G({...r,projectedExtent:t,srcBufferExtent:s,datumTransformation:e,rasterTransform:o})}}export{_ as default};
