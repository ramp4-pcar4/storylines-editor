import{v as l,S as s,i as R,j as S,gH as p,l as k,dU as D}from"./main-CF9Cdcsk.js";import{V as G}from"./projection-BA9M1R7d-BGah-PNx.js";import{G as H}from"./normalizeUtilsSync-CBU7m8rm-CaLG_e4c.js";import{V as g,E as y,w as z,Q as d}from"./mat3-CC4Foazl-BWjyqE2v.js";import{n as m}from"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import{m as a}from"./vec2-tHZ6OaOy-xCj1obDt.js";import{_ as x,Z as h}from"./vec32-D9GsKZ1t-ClFZ45DM.js";let e=class extends S{constructor(o){super(o)}get bounds(){const o=this.coords;return o?.extent==null?null:p(o.extent)}get coords(){const o=this.element.georeference?.coords;return G(o,this.spatialReference).geometry}get normalizedCoords(){return k.fromJSON(H(this.coords))}get normalizedBounds(){const o=this.normalizedCoords!=null?this.normalizedCoords.extent:null;return o!=null?p(o):null}};l([s()],e.prototype,"spatialReference",void 0),l([s()],e.prototype,"element",void 0),l([s()],e.prototype,"bounds",null),l([s()],e.prototype,"coords",null),l([s()],e.prototype,"normalizedCoords",null),l([s()],e.prototype,"normalizedBounds",null),e=l([R("esri.layers.support.MediaElementView")],e);const t=D(),i=m(),u=m(),c=m();function _(o,r,n){return x(t,r[0],r[1],1),h(t,t,g(i,n)),t[2]===0?a(o,t[0],t[1]):a(o,t[0]/t[2],t[1]/t[2])}function $(o,r,n){return f(u,r[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7]),f(c,n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7]),y(o,z(u,u),c),o[8]!==0&&(o[0]/=o[8],o[1]/=o[8],o[2]/=o[8],o[3]/=o[8],o[4]/=o[8],o[5]/=o[8],o[6]/=o[8],o[7]/=o[8],o[8]/=o[8]),o}function f(o,r,n,v,C,j,B,V,b){d(o,r,v,j,n,C,B,1,1,1),x(t,V,b,1),z(i,o);const[w,E,M]=h(t,t,g(i,i));return d(i,w,0,0,0,E,0,0,0,M),y(o,i,o)}export{_ as K,$ as M,e as o};
