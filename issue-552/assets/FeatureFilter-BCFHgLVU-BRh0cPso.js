import{aK as y,v as i,S as s,af as R,i as w,e as S,P as r}from"./main-DM2UJ-BA.js";import{b as v}from"./Query-BrwMGK8U-DqquxPfL.js";import{k as j}from"./TimeExtent-Cn0Jofqr-BmGqEZkt.js";import"./Field-C6hA1tZj-DhO7LnmZ.js";import"./fieldType-CD2CL2hr-Dj5ZhCkQ.js";var m;const c=new y({esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelDisjoint:"disjoint",esriSpatialRelEnvelopeIntersects:"envelope-intersects",esriSpatialRelIndexIntersects:"index-intersects",esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:"relation"}),d=new y({esriSRUnit_Meter:"meters",esriSRUnit_Kilometer:"kilometers",esriSRUnit_Foot:"feet",esriSRUnit_StatuteMile:"miles",esriSRUnit_NauticalMile:"nautical-miles",esriSRUnit_USNauticalMile:"us-nautical-miles"});let e=m=class extends S{constructor(t){super(t),this.where=null,this.geometry=null,this.spatialRelationship="intersects",this.distance=void 0,this.objectIds=null,this.units=null,this.timeExtent=null}createQuery(t={}){const{where:n,geometry:o,spatialRelationship:a,timeExtent:l,objectIds:p,units:u,distance:h}=this;return new v({geometry:r(o),objectIds:r(p),spatialRelationship:a,timeExtent:r(l),where:n,units:u,distance:h,...t})}clone(){const{where:t,geometry:n,spatialRelationship:o,timeExtent:a,objectIds:l,units:p,distance:u}=this;return new m({geometry:r(n),objectIds:r(l),spatialRelationship:o,timeExtent:r(a),where:t,units:p,distance:u})}};i([s({type:String,json:{write:!0}})],e.prototype,"where",void 0),i([s({types:R,json:{write:!0}})],e.prototype,"geometry",void 0),i([s({type:c.apiValues,json:{name:"spatialRel",read:{reader:c.read},write:{allowNull:!1,writer:c.write,overridePolicy(){return{enabled:this.geometry!=null}}}}})],e.prototype,"spatialRelationship",void 0),i([s({type:Number,json:{write:{overridePolicy(t){return{enabled:t!=null&&this.geometry!=null}}}}})],e.prototype,"distance",void 0),i([s({type:[Number],json:{write:!0}})],e.prototype,"objectIds",void 0),i([s({type:d.apiValues,json:{read:d.read,write:{writer:d.write,overridePolicy(t){return{enabled:t!=null&&this.geometry!=null}}}}})],e.prototype,"units",void 0),i([s({type:j,json:{write:!0}})],e.prototype,"timeExtent",void 0),e=m=i([w("esri.layers.support.FeatureFilter")],e);const U=e;export{U as default};
