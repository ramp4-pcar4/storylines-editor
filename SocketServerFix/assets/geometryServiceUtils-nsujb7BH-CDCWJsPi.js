import{C as a,o as i,r as s}from"./main-BH3u4lL3.js";import{f,j as m}from"./project-DQKhruav-DzpHGqKH.js";import"./utils-9sQxfkoa-BJL_ZQ2r.js";import"./utils-Bq23Xwmj-Cic61Y5e.js";async function g(e=null,n){if(a.geometryServiceUrl)return a.geometryServiceUrl;if(!e)throw new i("internal:geometry-service-url-not-configured");let r;r="portal"in e?e.portal||s.getDefault():e,await r.load({signal:n});const t=r.helperServices?.geometry?.url;if(!t)throw new i("internal:geometry-service-url-not-configured");return t}async function v(e,n,r=null,t){const l=await g(r,t),c=new f({geometries:[e],outSpatialReference:n}),o=await m(l,c,{signal:t});if(o&&Array.isArray(o)&&o.length===1)return o[0];throw new i("internal:geometry-service-projection-failed")}export{g as getGeometryServiceURL,v as projectGeometry};
