import{ag as f}from"./main-BH3u4lL3.js";import{L as M,e as A}from"./portalLayers-Bh9bAhk4-7EkTicxp.js";import{p as n}from"./fetchService-DbaKmJhP-Pfb3T5gE.js";import d from"./PortalItem-CctGdnxF-CYAHXlAQ.js";import{g as b}from"./styleUtils-ChrJTYIw-CvJ3xydw.js";import"./associatedFeatureServiceUtils-Bu76-Sxs-DKvnlPbY.js";import"./arcgisLayerUrl-HNYh8jvG-Dcto2KnB.js";import"./portalItemUtils-B8bw6SAG-DAHUOxZ2.js";import"./projection-BA9M1R7d-Bngn7BFN.js";import"./projectBuffer-CvCBvJ6W-SRZZwGAf.js";function w(e){return p(e,"notes")}function v(e){return p(e,"markup")}function h(e){return p(e,"route")}function p(e,r){return!(!e.layerType||e.layerType!=="ArcGISFeatureLayer")&&e.featureCollectionType===r}async function C(e,r,y){if(!r)return;const a=r.map(t=>U(t,y)),i=await Promise.allSettled(a);for(const t of i)t.status==="rejected"||t.value&&e.add(t.value)}const F={ArcGISDimensionLayer:"DimensionLayer",ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISSceneServiceLayer:"SceneLayer",ArcGISTiledElevationServiceLayer:"ElevationLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",BuildingSceneLayer:"BuildingSceneLayer",CatalogLayer:"CatalogLayer",CSV:"CSVLayer",DefaultTileLayer:"TileLayer",GeoJSON:"GeoJSONLayer",GroupLayer:"GroupLayer",IntegratedMesh3DTilesLayer:"IntegratedMesh3DTilesLayer",IntegratedMeshLayer:"IntegratedMeshLayer",KML:"KMLLayer",LineOfSightLayer:"LineOfSightLayer",MediaLayer:"MediaLayer",OGCFeatureLayer:"OGCFeatureLayer",OrientedImageryLayer:"OrientedImageryLayer",PointCloudLayer:"PointCloudLayer",RasterDataLayer:"UnsupportedLayer",VectorTileLayer:"VectorTileLayer",ViewshedLayer:"ViewshedLayer",Voxel:"VoxelLayer",WFS:"WFSLayer",WMS:"WMSLayer",WebTiledLayer:"WebTileLayer"},W={ArcGISTiledElevationServiceLayer:"ElevationLayer",DefaultTileLayer:"ElevationLayer",RasterDataElevationLayer:"UnsupportedLayer"},O={ArcGISFeatureLayer:"FeatureLayer"},V={ArcGISImageServiceLayer:"UnsupportedLayer",ArcGISMapServiceLayer:"UnsupportedLayer",ArcGISSceneServiceLayer:"SceneLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",DefaultTileLayer:"TileLayer",OpenStreetMap:"OpenStreetMapLayer",VectorTileLayer:"VectorTileLayer",WMS:"UnsupportedLayer",WebTiledLayer:"WebTileLayer"},I={ArcGISAnnotationLayer:"UnsupportedLayer",ArcGISDimensionLayer:"UnsupportedLayer",ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISStreamLayer:"StreamLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",BingMapsAerial:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",CatalogLayer:"CatalogLayer",CSV:"CSVLayer",DefaultTileLayer:"TileLayer",GeoJSON:"GeoJSONLayer",GeoRSS:"GeoRSSLayer",GroupLayer:"GroupLayer",KML:"KMLLayer",KnowledgeGraphLayer:"KnowledgeGraphLayer",MediaLayer:"MediaLayer",OGCFeatureLayer:"OGCFeatureLayer",OrientedImageryLayer:"OrientedImageryLayer",SubtypeGroupLayer:"SubtypeGroupLayer",VectorTileLayer:"VectorTileLayer",WFS:"WFSLayer",WMS:"WMSLayer",WebTiledLayer:"WebTileLayer"},g={ArcGISFeatureLayer:"FeatureLayer",SubtypeGroupTable:"UnsupportedLayer"},m={ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",BingMapsAerial:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",DefaultTileLayer:"TileLayer",OpenStreetMap:"OpenStreetMapLayer",VectorTileLayer:"VectorTileLayer",WMS:"WMSLayer",WebTiledLayer:"WebTileLayer"},k={...I,LinkChartLayer:"LinkChartLayer"},B={...g},D={...m};async function U(e,r){return E(await x(e,r),e,r)}async function E(e,r,y){const a=new e;return a.read(r,y.context),a.type==="group"&&(r.layerType==="GroupLayer"?await K(a,r,y):u(r)?N(a,r,y.context):T(r)&&await $(a,r,y.context)),await b(a,y.context),a}async function x(e,r){const y=r.context,a=R(y);let i=e.layerType||e.type;!i&&r?.defaultLayerType&&(i=r.defaultLayerType);const t=a[i];let L=t?n[t]:n.UnknownLayer;if(u(e)){const l=y?.portal;if(e.itemId){const o=new d({id:e.itemId,portal:l});await o.load();const s=(await M(o,new A)).className||"UnknownLayer";L=n[s]}}else i==="ArcGISFeatureLayer"?w(e)||v(e)?L=n.MapNotesLayer:h(e)?L=n.RouteLayer:T(e)&&(L=n.GroupLayer):e.wmtsInfo?.url&&e.wmtsInfo.layerIdentifier?L=n.WMTSLayer:i==="WFS"&&e.wfsInfo?.version!=="2.0.0"&&(L=n.UnsupportedLayer);return L()}function T(e){return e.layerType!=="ArcGISFeatureLayer"||u(e)?!1:(e.featureCollection?.layers?.length??0)>1}function u(e){return e.type==="Feature Collection"}function R(e){let r;switch(e.origin){case"web-scene":switch(e.layerContainerType){case"basemap":r=V;break;case"ground":r=W;break;case"tables":r=O;break;default:r=F}break;case"link-chart":switch(e.layerContainerType){case"basemap":r=D;break;case"tables":r=B;break;default:r=k}break;default:switch(e.layerContainerType){case"basemap":r=m;break;case"tables":r=g;break;default:r=I}}return r}async function K(e,r,y){const a=new f,i=C(a,Array.isArray(r.layers)?r.layers:[],y);try{try{if(await i,e.type==="group")return e.layers.addMany(a),e}catch(t){e.destroy();for(const L of a)L.destroy();throw t}}catch(t){throw t}}function N(e,r,y){r.itemId&&(e.portalItem=new d({id:r.itemId,portal:y?.portal}),e.when(()=>{const a=i=>{const t=i.layerId;G(i,e,r,t,y);const L=r.featureCollection?.layers?.[t];L&&i.read(L,y)};e.layers?.forEach(a),e.tables?.forEach(a)}))}async function $(e,r,y){const a=n.FeatureLayer,i=await a(),t=r.featureCollection,L=t?.showLegend,l=t?.layers?.map((o,s)=>{const c=new i;c.read(o,y);const S={...y,ignoreDefaults:!0};return G(c,e,r,s,S),L!=null&&c.read({showLegend:L},S),c});e.layers.addMany(l??[])}function G(e,r,y,a,i){e.read({id:`${r.id}-sublayer-${a}`,visibility:y.visibleLayers?.includes(a)??!0},i)}export{K as populateGroupLayer,C as populateOperationalLayers};
