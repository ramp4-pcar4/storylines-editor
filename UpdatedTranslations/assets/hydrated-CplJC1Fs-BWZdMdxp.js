import{w as r,l as c,m as h,G as x,n as m}from"./main-YbCtmqIL.js";const P={convertToGEGeometry:p,exportPoint:g,exportPolygon:l,exportPolyline:u,exportMultipoint:f,exportExtent:M};function p(e,t){if(t==null)return null;let a="cache"in t?t.cache._geVersion:void 0;return a==null&&(a=e.convertJSONToGeometry(t),"cache"in t&&(t.cache._geVersion=a)),a}function g(e,t,a){const o=e.hasZ(t),n=e.hasM(t),s=new r({x:e.getPointX(t),y:e.getPointY(t),spatialReference:a});return o&&(s.z=e.getPointZ(t)),n&&(s.m=e.getPointM(t)),s.cache._geVersion=t,s}function l(e,t,a){const o=new c({rings:e.exportPaths(t),hasZ:e.hasZ(t),hasM:e.hasM(t),spatialReference:a});return o.cache._geVersion=t,o}function u(e,t,a){const o=new h({paths:e.exportPaths(t),hasZ:e.hasZ(t),hasM:e.hasM(t),spatialReference:a});return o.cache._geVersion=t,o}function f(e,t,a){const o=new x({hasZ:e.hasZ(t),hasM:e.hasM(t),points:e.exportPoints(t),spatialReference:a});return o.cache._geVersion=t,o}function M(e,t,a){const o=e.hasZ(t),n=e.hasM(t),s=new m({xmin:e.getXMin(t),ymin:e.getYMin(t),xmax:e.getXMax(t),ymax:e.getYMax(t),spatialReference:a});if(o){const i=e.getZExtent(t);s.zmin=i.vmin,s.zmax=i.vmax}if(n){const i=e.getMExtent(t);s.mmin=i.vmin,s.mmax=i.vmax}return s.cache._geVersion=t,s}export{P as hydratedAdapter};
