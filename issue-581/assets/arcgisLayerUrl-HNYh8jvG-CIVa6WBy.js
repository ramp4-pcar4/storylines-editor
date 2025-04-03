import{a,dH as m,dI as o,dJ as c,du as y,bX as S}from"./main-DpxXUdv2.js";const v={mapserver:"MapServer",imageserver:"ImageServer",featureserver:"FeatureServer",knowledgegraphserver:"KnowledgeGraphServer",sceneserver:"SceneServer",streamserver:"StreamServer",vectortileserver:"VectorTileServer","3dtilesserver":"3DTilesServer",videoserver:"VideoServer"},d=Object.values(v),p=new RegExp(`^((?:https?:)?\\/\\/\\S+?\\/rest\\/services\\/(.+?)\\/(${d.join("|")}))(?:\\/(?:layers\\/)?(\\d+))?`,"i"),w=new RegExp(`^((?:https?:)?\\/\\/\\S+?\\/([^/\\n]+)\\/(${d.join("|")}))(?:\\/(?:layers\\/)?(\\d+))?`,"i"),g=/(.*?)\/(?:layers\/)?(\d+)\/?$/i;function C(r){return p.test(r)}function f(r){if(r==null)return null;const e=a(r),t=e?.path.match(p)||e?.path.match(w);if(!t)return null;const[,s,n,l,u]=t,i=n.indexOf("/");return{title:h(i!==-1?n.slice(i+1):n),serverType:v[l.toLowerCase()],sublayer:u!=null&&u!==""?parseInt(u,10):null,url:{path:s}}}function I(r){const e=a(r).path.match(g);return e?{serviceUrl:e[1],sublayerId:Number(e[2])}:null}function h(r){return(r=r.replaceAll(/\s*[/_]+\s*/g," "))[0].toUpperCase()+r.slice(1)}function L(r,e){const t=[];if(r){const s=f(r);s!=null&&s.title&&t.push(s.title)}if(e){const s=h(e);t.push(s)}if(t.length===2){if(t[0].toLowerCase().includes(t[1].toLowerCase()))return t[0];if(t[1].toLowerCase().includes(t[0].toLowerCase()))return t[1]}return t.join(" - ")}function j(r){let e=m(r,!0);return!!e&&(e=e.toLowerCase(),e.endsWith(".arcgis.com")&&(e.startsWith("services")||e.startsWith("tiles")||e.startsWith("features")))}function x(r,e){return r&&o(c(r,e))}function U(r){let{url:e}=r;if(!e)return{url:e};e=c(e,r.logger);const t=a(e),s=f(t.path);let n;if(s!=null)s.sublayer!=null&&r.layer.layerId==null&&(n=s.sublayer),e=s.url.path;else if(r.nonStandardUrlAllowed){const l=I(t.path);l!=null&&(e=l.serviceUrl,n=l.sublayerId)}return{url:o(e),layerId:n}}function T(r,e,t,s,n){y(e,s,"url",n),s.url&&r.layerId!=null&&(s.url=S(s.url,t,r.layerId.toString()))}function W(r){if(!r)return!1;const e=r.toLowerCase(),t=e.includes("/services/"),s=e.includes("/mapserver/wmsserver"),n=e.includes("/imageserver/wmsserver"),l=e.includes("/wmsserver");return t&&(s||n||l)}export{L as I,j as L,T,W as U,C as b,f as i,x as j,I as m,h as o,U as x};
