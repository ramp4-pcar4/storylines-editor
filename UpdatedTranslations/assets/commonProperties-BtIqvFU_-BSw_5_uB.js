import{v as n,S as i,ad as D,a0 as G,ac as O,bC as E,i as u,P as W,e as A,d3 as P,du as k,n as S,J as $}from"./main-YbCtmqIL.js";import{q}from"./ElevationInfo-yv2-9tj6-DJSwdCPw.js";const a=(e=>e)(["operational-layers","basemap","ground"]);let y=class extends A{constructor(e){super(e),this.description=null,this.label=null,this.type=null}};n([i({type:String,json:{write:!0}})],y.prototype,"description",void 0),n([i({type:String,json:{write:!0}})],y.prototype,"label",void 0),n([i()],y.prototype,"type",void 0),y=n([u("esri.tables.elements.AttributeTableElement")],y);const d=y;var f;let c=f=class extends d{constructor(e){super(e),this.displayType="auto",this.type="attachment"}clone(){return new f({description:this.description,displayType:this.displayType,label:this.label})}};n([i({type:["auto"],json:{write:!0}})],c.prototype,"displayType",void 0),n([i({type:["attachment"],readOnly:!0,json:{read:!1,write:!0}})],c.prototype,"type",void 0),c=f=n([u("esri.tables.elements.AttributeTableAttachmentElement")],c);const I=c;var g;let m=g=class extends d{constructor(e){super(e),this.fieldName=null,this.type="field"}clone(){return new g({description:this.description,fieldName:this.fieldName,label:this.label})}};n([i({type:String,json:{write:!0}})],m.prototype,"fieldName",void 0),n([i({type:String,json:{read:!1,write:!0}})],m.prototype,"type",void 0),m=g=n([u("esri.tables.elements.AttributeTableFieldElement")],m);const N=m;var v;let b=v=class extends d{constructor(e){super(e),this.relationshipId=null,this.type="relationship"}clone(){return new v({description:this.description,label:this.label,relationshipId:this.relationshipId})}};n([i({type:Number,json:{write:!0}})],b.prototype,"relationshipId",void 0),n([i({type:["relationship"],json:{read:!1,write:!0}})],b.prototype,"type",void 0),b=v=n([u("esri.tables.elements.AttributeTableRelationshipElement")],b);const C=b;function B(e){return{typesWithGroup:{base:d,key:"type",typeMap:{attachment:I,field:N,group:e,relationship:C}},typesWithoutGroup:{base:d,key:"type",typeMap:{attachment:I,field:N,relationship:C}}}}function R(e,t,r=!0){if(!e)return null;const p=r?t.typesWithGroup.typeMap:t.typesWithoutGroup.typeMap;return e.filter(o=>p[o.type]).map(o=>p[o.type].fromJSON(o))}function M(e,t,r=!0){if(!e)return null;const p=r?t.typesWithGroup.typeMap:t.typesWithoutGroup.typeMap;return e.filter(o=>p[o.type]).map(o=>o.toJSON())}function F(e,t,r=!0){return e?e.map(p=>P(r?t.typesWithGroup:t.typesWithoutGroup,p)):null}var j;let s=j=class extends d{constructor(e){super(e),this.elements=null,this.type="group"}castElements(e){return F(e,w,!1)}readElements(e,t){return R(t.attributeTableElements,w,!1)}writeElements(e,t){t.attributeTableElements=M(e,w,!1)}clone(){return new j({description:this.description,elements:W(this.elements),label:this.label})}};n([i({json:{write:!0}})],s.prototype,"elements",void 0),n([D("elements")],s.prototype,"castElements",null),n([G("elements",["attributeTableElements"])],s.prototype,"readElements",null),n([O("elements")],s.prototype,"writeElements",null),n([i({type:String,json:{read:!1,write:!0}})],s.prototype,"type",void 0),s=j=n([u("esri.tables.elements.AttributeTableGroupElement")],s);const w=B(s),K=s;var T;const h=B(K);let l=T=class extends A{constructor(e){super(e),this.elements=null,this.orderByFields=null}castElements(e){return F(e,h)}readElements(e,t){return R(t.attributeTableElements,h)}writeElements(e,t){t.attributeTableElements=M(e,h)}clone(){return new T({elements:W(this.elements),orderByFields:this.orderByFields})}};n([i({json:{write:!0}})],l.prototype,"elements",void 0),n([D("elements")],l.prototype,"castElements",null),n([G("elements",["attributeTableElements"])],l.prototype,"readElements",null),n([O("elements")],l.prototype,"writeElements",null),n([i({type:[Object],json:{write:!0}})],l.prototype,"orderByFields",void 0),l=T=n([u("esri.tables.AttributeTableTemplate")],l);const L=l,z={type:Boolean,value:!0,json:{origins:{service:{read:!1,write:!1},"web-map":{read:!1,write:!1}},name:"screenSizePerspective",write:{enabled:!0,layerContainerTypes:a}}},H={type:Boolean,value:!0,json:{name:"disablePopup",read:{reader:(e,t)=>!t.disablePopup},write:{enabled:!0,writer(e,t,r){t[r]=!e}}}},Q={type:Boolean,value:!0,nonNullable:!0,json:{name:"showLabels",write:{enabled:!0,layerContainerTypes:a}}},V={type:String,json:{origins:{"portal-item":{write:!1}},write:{isRequired:!0,ignoreOrigin:!0,writer:k}}},X={type:Boolean,value:!0,nonNullable:!0,json:{origins:{service:{read:{enabled:!1}}},name:"showLegend",write:{enabled:!0,layerContainerTypes:a}}},Y={value:null,type:q,json:{origins:{service:{name:"elevationInfo",write:!0}},name:"layerDefinition.elevationInfo",write:{enabled:!0,layerContainerTypes:a}}};function Z(e){return{type:e,readOnly:!0,json:{origins:{service:{read:!0}},read:!1}}}const J={write:{enabled:!0,layerContainerTypes:a},read:!0},x={type:Number,json:{origins:{"web-document":J,"portal-item":{write:!0}}}},ee={...x,json:{...x.json,origins:{"web-document":{...J,write:{enabled:!0,layerContainerTypes:a,target:{opacity:{type:Number},"layerDefinition.drawingInfo.transparency":{type:Number}}}}},read:{source:["layerDefinition.drawingInfo.transparency","drawingInfo.transparency"],reader:(e,t,r)=>r&&r.origin!=="service"||!t.drawingInfo||t.drawingInfo.transparency===void 0?t.layerDefinition?.drawingInfo&&t.layerDefinition.drawingInfo.transparency!==void 0?E(t.layerDefinition.drawingInfo.transparency):void 0:E(t.drawingInfo.transparency)}}},te={type:S,readOnly:!0,json:{origins:{service:{read:{source:["fullExtent","spatialReference"],reader:(e,t)=>{const r=S.fromJSON(e);return t.spatialReference!=null&&typeof t.spatialReference=="object"&&(r.spatialReference=$.fromJSON(t.spatialReference)),r}}}},read:!1}},ne={type:String,json:{origins:{service:{read:!1},"portal-item":{read:!1}}}},re={type:Number,json:{origins:{service:{write:{enabled:!1}},"web-scene":{name:"layerDefinition.minScale",write:{enabled:!0,layerContainerTypes:a}}},name:"layerDefinition.minScale",write:!0}},ie={type:Number,json:{origins:{service:{write:{enabled:!1}},"web-scene":{name:"layerDefinition.maxScale",write:{enabled:!0,layerContainerTypes:a}}},name:"layerDefinition.maxScale",write:!0}},se={json:{write:{ignoreOrigin:!0,layerContainerTypes:a},origins:{"web-map":{read:!1,write:!1}}}},ae={type:L,json:{name:"attributeTableInfo",write:!0,origins:{"web-scene":{read:!1,write:!1}}}};export{Y as $,x as E,Z as H,L as J,ee as K,te as Q,z as V,H as X,Q as Y,V as Z,X as _,ne as e,ae as i,ie as n,se as r,a as s,re as t};
