const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./screen-CcinMdyM-C3o3VqgP.js","./main-BLGVPR4E.js","./main-Dy4rT7Ar.css"])))=>i.map(i=>d[i]);
import{c2 as l,cB as o,fu as c,_ as m,c5 as r,fw as b,c6 as v,c7 as d,c9 as h,ca as u,cb as f,cc as g,cd as e,cf as w}from"./main-BLGVPR4E.js";const x=l({__name:"nav-button",setup(t){const{t:s}=v(),i=d("iApi"),p=()=>i?.panel.toggle("basemap");return(A,a)=>{const n=h("mapnav-button");return u(),f(n,{onClickFunction:p,tooltip:w(s)("basemap.title")},{default:g(()=>a[0]||(a[0]=[e("svg",{class:"fill-current w-32 h-20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},[e("path",{d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"})],-1)])),_:1},8,["tooltip"])}}}),_={en:{"basemap.select":"Select basemap","basemap.title":"Basemap"},fr:{"basemap.select":"Sélectionner la carte de base","basemap.title":"Carte de base"}};class $ extends o{added(){this.$iApi.component("basemap-nav-button",x),this.$iApi.panel.register({id:"basemap",config:{screens:{"basemap-component":()=>c(m(()=>import("./screen-CcinMdyM-C3o3VqgP.js"),__vite__mapDeps([0,1,2]),import.meta.url))},button:{tooltip:"basemap.title",icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/><path d="M0 0h24v24H0z" fill="none" /></svg>'},alertName:"basemap.title"}},{i18n:{messages:_}}),this.handlePanelTeleports(["basemap"])}removed(){this.$iApi.fixture.exists("appbar")&&r(this.$vApp.$pinia).removeButton("basemap"),this.$iApi.fixture.exists("mapnav")&&b(this.$vApp.$pinia).removeItem("basemap"),this.$iApi.panel.remove("basemap")}}export{$ as default};
