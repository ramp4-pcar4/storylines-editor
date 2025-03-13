import{o as c,r as j,W as u,f,V as D}from"./main-DG3mLaAJ.js";import{i as v}from"./arcgisLayerUrl-HNYh8jvG-DGm_j-gZ.js";import w from"./PortalItem-CctGdnxF-aUW3UNX1.js";async function x(e,n){const t=v(e);if(!t)throw new c("invalid-url","Invalid scene service url");const r={...n,sceneServerUrl:t.url.path,layerId:t.sublayer??void 0};if(r.sceneLayerItem??=await A(r),r.sceneLayerItem==null)return p(r.sceneServerUrl.replace("/SceneServer","/FeatureServer"),r);const a=await K(r);if(!a?.url)throw new c("related-service-not-found","Could not find feature service through portal item relationship");r.featureServiceItem=a;const s=await p(a.url,r);return s.portalItem=a,s}async function A(e){const n=(await h(e)).serviceItemId;if(!n)return null;const t=new w({id:n,apiKey:e.apiKey}),r=await b(e);r!=null&&(t.portal=new j({url:r}));try{return await t.load({signal:e.signal})}catch(a){return u(a),null}}async function h(e){if(e.rootDocument)return e.rootDocument;const n={query:{f:"json",...e.customParameters,token:e.apiKey},responseType:"json",signal:e.signal};try{const t=await f(e.sceneServerUrl,n);e.rootDocument=t.data}catch{e.rootDocument={}}return e.rootDocument}async function b(e){const n=D?.findServerInfo(e.sceneServerUrl);if(n?.owningSystemUrl)return n.owningSystemUrl;const t=e.sceneServerUrl.replace(/(.*\/rest)\/.*/i,"$1")+"/info";try{const r=(await f(t,{query:{f:"json"},responseType:"json",signal:e.signal})).data.owningSystemUrl;if(r)return r}catch(r){u(r)}return null}async function p(e,n){const t=v(e);if(!t)throw new c("invalid-feature-service-url","Invalid feature service url");const r=t.url.path,a=n.layerId;if(a==null)return{serverUrl:r};const s=h(n),y=n.featureServiceItem?await n.featureServiceItem.fetchData("json"):null,g=(y?.layers?.[0]||y?.tables?.[0])?.customParameters,d=o=>{const U={query:{f:"json",...g},responseType:"json",authMode:o,signal:n.signal};return f(r,U)},S=d("anonymous").catch(()=>d("no-prompt")),[m,I]=await Promise.all([S,s]),l=I?.layers,i=m.data&&m.data.layers;if(!Array.isArray(i))throw new Error("expected layers array");if(Array.isArray(l)){for(let o=0;o<Math.min(l.length,i.length);o++)if(l[o].id===a)return{serverUrl:r,layerId:i[o].id}}else if(a!=null&&a<i.length)return{serverUrl:r,layerId:i[a].id};throw new Error("could not find matching associated sublayer")}async function K({sceneLayerItem:e,signal:n}){if(!e)return null;try{const t=(await e.fetchRelatedItems({relationshipType:"Service2Service",direction:"reverse"},{signal:n})).find(a=>a.type==="Feature Service")||null;if(!t)return null;const r=new w({portal:t.portal,id:t.id});return await r.load(),r}catch(t){return u(t),null}}export{x as b};
