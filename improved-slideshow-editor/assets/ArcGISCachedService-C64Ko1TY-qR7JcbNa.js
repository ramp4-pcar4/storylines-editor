import{v as l,S as i,a0 as m,J as v,i as S}from"./main-Csa2lEpO.js";import{V as d}from"./TileInfo-CWIRDhZl-CLaVNuDO.js";import{c as x}from"./TileInfoTilemapCache-D1SExPij-TpMhtNLj.js";import{f as I}from"./TilemapCache-CRRxws77-DFJ-exxJ.js";const g=y=>{let e=class extends y{constructor(){super(...arguments),this.copyright=null,this.minScale=0,this.maxScale=0,this.spatialReference=null,this.tileInfo=null,this.tilemapCache=null}destroy(){this.tilemapCache?.destroy?.()}readMinScale(s,t){return t.minLOD!=null&&t.maxLOD!=null?s:0}readMaxScale(s,t){return t.minLOD!=null&&t.maxLOD!=null?s:0}get supportsBlankTile(){return this.version>=10.2}readTilemapCache(s,t,f){const h=t.capabilities?.includes("Tilemap");let{minLOD:r,maxLOD:a,minScale:p,maxScale:c}=t;if(r==null&&a==null&&p!==0&&c!==0){const o=n=>Math.round(1e4*n)/1e4;p=o(p||t.tileInfo.lods[0].scale),c=o(c||t.tileInfo.lods[t.tileInfo.lods.length-1].scale);for(const n of t.tileInfo.lods){const u=o(n.scale);r=u>=p?n.level:r,a=u>=c?n.level:a}}if(h)return new I({layer:this,minLOD:r,maxLOD:a});if(t.tileInfo){const o=new d;return o.read(t.tileInfo,f),new x(o,r,a)}return null}};return l([i({json:{read:{source:"copyrightText"}}})],e.prototype,"copyright",void 0),l([i()],e.prototype,"minScale",void 0),l([m("service","minScale")],e.prototype,"readMinScale",null),l([i()],e.prototype,"maxScale",void 0),l([m("service","maxScale")],e.prototype,"readMaxScale",null),l([i({type:v})],e.prototype,"spatialReference",void 0),l([i({readOnly:!0})],e.prototype,"supportsBlankTile",null),l([i({type:d})],e.prototype,"tileInfo",void 0),l([i()],e.prototype,"tilemapCache",void 0),l([m("service","tilemapCache",["capabilities","tileInfo"])],e.prototype,"readTilemapCache",null),l([i()],e.prototype,"version",void 0),e=l([S("esri.layers.mixins.ArcGISCachedService")],e),e};export{g as O};
