import{v as s,S as i,i as l,bG as d,e as S,bM as n,bK as f,f as y}from"./main-Dph3xG49.js";import{y as g,a as R}from"./utils-9sQxfkoa-CRVoznqM.js";import{f as w}from"./utils-Bq23Xwmj-DPjy7Vnb.js";let e=class extends S{constructor(o){super(o),this.geometries=[],this.outSpatialReference=null,this.transformation=null,this.transformForward=null}toJSON(){const o=this.geometries.map(a=>a.toJSON()),t=this.geometries[0],r={};return r.outSR=n(this.outSpatialReference),r.inSR=n(t.spatialReference),r.geometries=JSON.stringify({geometryType:f(t),geometries:o}),this.transformation&&(r.transformation=this.transformation.wkid||JSON.stringify(this.transformation)),this.transformForward!=null&&(r.transformForward=this.transformForward),r}};s([i()],e.prototype,"geometries",void 0),s([i({json:{read:{source:"outSR"}}})],e.prototype,"outSpatialReference",void 0),s([i()],e.prototype,"transformation",void 0),s([i()],e.prototype,"transformForward",void 0),e=s([l("esri.rest.support.ProjectParameters")],e);const O=e,j=d(O);async function N(o,t,r){t=j(t);const a=g(o),m={...a.query,f:"json",...t.toJSON()},p=t.outSpatialReference,u=f(t.geometries[0]),c=R(m,r);return y(a.path+"/project",c).then(({data:{geometries:h}})=>w(h,u,p))}export{O as f,N as j};
