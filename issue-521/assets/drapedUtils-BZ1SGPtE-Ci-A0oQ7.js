import{n as m,p as c}from"./main-CF9Cdcsk.js";function u(n,e){return e?"xoffset"in e&&e.xoffset?Math.max(n,Math.abs(e.xoffset)):"yoffset"in e&&e.yoffset?Math.max(n,Math.abs(e.yoffset||0)):n:n}function x(n){let e=0,r=0;for(let t=0;t<n.length;t++){const i=n[t].size;typeof i=="number"&&(e+=i,r++)}return e/r}function p(n,e){return typeof n=="number"?n:n?.stops?.length?x(n.stops):e}function M(n,e){if(!e)return n;const r=e.filter(a=>a.type==="size").map(a=>{const{maxSize:s,minSize:f}=a;return(p(s,n)+p(f,n))/2});let t=0;const i=r.length;if(i===0)return n;for(let a=0;a<i;a++)t+=r[a];const o=Math.floor(t/i);return Math.max(o,n)}function b(n){const e=n?.renderer,r=n?.pointerType,t=r==="touch"?9:6;if(!e)return t;const i="visualVariables"in e?M(t,e.visualVariables):t;if(e.type==="simple")return u(i,e.symbol);if(e.type==="unique-value"){let o=i;return e.uniqueValueInfos?.forEach(a=>{o=u(o,a.symbol)}),o}if(e.type==="class-breaks"){let o=i;return e.classBreakInfos.forEach(a=>{o=u(o,a.symbol)}),o}return e.type==="dot-density"||e.type,i}function d(n,e,r,t=new m){let i=0;if(r.type==="2d")i=e*(r.resolution??0);else if(r.type==="3d"){const h=r.overlayPixelSizeInMapUnits(n),l=r.basemapSpatialReference;i=l==null||l.equals(r.spatialReference)?e*h:c(l)/c(r.spatialReference)}const o=n.x-i,a=n.y-i,s=n.x+i,f=n.y+i,{spatialReference:y}=r;return t.xmin=Math.min(o,s),t.ymin=Math.min(a,f),t.xmax=Math.max(o,s),t.ymax=Math.max(a,f),t.spatialReference=y,t}function q(n,e,r){const t=r.toMap(n);return t==null?!1:d(t,b(),r,z).intersects(e)}const z=new m;export{d as x,b as y,q as z};
