import{aK as n,v as r,S as i,i as d,e as p}from"./main-DM2UJ-BA.js";var t;const s=new n({asc:"ascending",desc:"descending"});let e=t=class extends p{constructor(o){super(o),this.field=null,this.valueExpression=null,this.order="ascending"}clone(){return new t({field:this.field,valueExpression:this.valueExpression,order:this.order})}};r([i({type:String,json:{write:!0}})],e.prototype,"field",void 0),r([i({type:String,json:{write:!0,origins:{"web-scene":{read:!1,write:!1}}}})],e.prototype,"valueExpression",void 0),r([i({type:s.apiValues,json:{type:s.jsonValues,read:s.read,write:s.write}})],e.prototype,"order",void 0),e=t=r([d("esri.layers.support.OrderByInfo")],e);const l=e;export{l as p};
