import{c3 as z,c2 as _,c4 as I,fw as u,c6 as $,c7 as A,fV as f,c9 as O,ca as r,cm as l,cz as v,cc as g,cd as c,cf as p,ch as M,cj as B,ck as F,c8 as L,cl as b,cn as S,cw as w,cx as H,cb as x,cy as P,cg as V,cB as Z}from"./main-YbCtmqIL.js";const j={},N={class:"border-b p-0 self-center w-2/3"};function T(m,a){return r(),l("span",N)}const k=z(j,[["render",T]]),q=_({__name:"zoom-nav",setup(m){const{t:a}=$(),t=A("iApi"),e=f(400,!0,()=>t.geo.map.zoomIn()),s=f(400,!0,()=>t.geo.map.zoomOut());return(o,i)=>{const n=O("mapnav-button");return r(),l("div",null,[v(n,{onClickFunction:p(e),tooltip:p(a)("mapnav.zoomIn")},{default:g(()=>i[0]||(i[0]=[c("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",class:"fill-current w-32 h-20"},[c("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),c("path",{d:"M0 0h24v24H0z",fill:"none"})],-1)])),_:1},8,["onClickFunction","tooltip"]),v(k),v(n,{onClickFunction:p(s),tooltip:p(a)("mapnav.zoomOut")},{default:g(()=>i[1]||(i[1]=[c("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",class:"fill-current w-32 h-20"},[c("path",{d:"M19 13H5v-2h14v2z"}),c("path",{d:"M0 0h24v24H0z",fill:"none"})],-1)])),_:1},8,["onClickFunction","tooltip"])])}}}),W={class:"mapnav absolute right-0 bottom-0 pb-36 sm:pb-48 pr-12"},Y=["content"],D={class:"mapnav-section bg-white-75 hover:bg-white"},G=_({__name:"mapnav",setup(m){const a=u(),{t}=$(),e=M(),s=()=>{e.value._tippy.hide()},o=n=>{n.key==="Tab"&&e.value?.matches(":focus")&&e.value._tippy.show()};B(()=>{e.value?.addEventListener("blur",s),e.value?.addEventListener("keyup",o)}),F(()=>{e.value?.removeEventListener("blur",s),e.value?.removeEventListener("keyup",o)});const i=L(()=>a.order.map(n=>a.items[n]).filter(n=>n.componentId));return(n,h)=>{const y=b("focus-list"),E=b("tippy");return r(),l("div",W,[S((r(),l("div",{class:"flex flex-col",content:p(t)("panels.controls.items"),ref_key:"el",ref:e},[v(q,{class:"mapnav-section bg-white-75 hover:bg-white"}),h[0]||(h[0]=c("span",{class:"py-1"},null,-1)),c("div",D,[(r(!0),l(w,null,H(i.value,(d,C)=>(r(),l(w,{key:d.id+"button"},[(r(),x(P(d.id+"-nav-button"))),C!==i.value.length-1?(r(),x(k,{key:0,class:"mapnav-divider"})):V("",!0)],64))),128))])],8,Y)),[[y],[E,{trigger:"manual",placement:"top-end",touch:!1,maxWidth:190}]])])}}}),J=z(G,[["__scopeId","data-v-41a5c7b7"]]);class K extends Z{mapnavStore=u(this.$vApp.$pinia);get config(){return super.config}_parseConfig(a){if(!a)return;const t=a.items.map(e=>({id:e}));this.mapnavStore.items=t.reduce((e,s)=>(e[s.id]=s,e),{}),this.mapnavStore.order=t.map(e=>e.id),this._validateItems()}_validateItems(){const a=["geolocator","zoom","home","fullscreen"];this.mapnavStore.order.forEach(t=>{(this.$iApi.fixture.exists(t)||a.includes(t))&&(this.mapnavStore.items[t].componentId=`${t}-nav-button`)})}}const Q={en:{"mapnav.zoomIn":"Zoom In","mapnav.zoomOut":"Zoom Out","mapnav.home":"Home","mapnav.fullscreen":"Full Screen","mapnav.geolocator":"Your Location","mapnav.geolocator.error.permission":"The location request was denied. Please check your browser permission settings.","mapnav.geolocator.error.internal":"Your location could not be found."},fr:{"mapnav.zoomIn":"Zoom avant","mapnav.zoomOut":"Zoom arrière","mapnav.home":"Accueil","mapnav.fullscreen":"Plein Écran","mapnav.geolocator":"Votre position","mapnav.geolocator.error.permission":"Demande de localisation refusée. Veuillez vérifier les paramètres d'autorisation de votre navigateur.","mapnav.geolocator.error.internal":"Votre emplacement n'a pu être trouvé."}};class U extends K{async added(){Object.entries(Q).forEach(o=>this.$iApi.$i18n.mergeLocaleMessage(...o));const{destroy:a,el:t}=this.mount(J,{app:this.$element});this.$vApp.$el.getElementsByClassName("inner-shell")[0].appendChild(t.childNodes[0]),this._parseConfig(this.config);const e=this.$vApp.$watch(()=>this.config,o=>this._parseConfig(o)),s=this.$iApi.event.on(I.COMPONENT,()=>{this._parseConfig(this.config)});this.removed=()=>{e(),this.$iApi.event.off(s);const o=u(this.$vApp.$pinia),i={...o.items};Object.keys(i).forEach(n=>o.removeItem(n)),o.$reset(),a()}}}export{U as default};
