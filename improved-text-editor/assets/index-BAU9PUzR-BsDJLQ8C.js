const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./screen-x-yg_fPu-CYECwFIW.js","./main-CaWWi_jZ.js","./main-D2HtlAsr.css","./marked.esm-DgqJBp_S-CCvGNfAT.js"])))=>i.map(i=>d[i]);
import{c2 as o,fu as h,_ as c,fw as r,fJ as l,cB as u,c7 as d,c6 as v,c9 as f,ca as g,cb as m,cc as x,cd as s,cf as _,c4 as A}from"./main-CaWWi_jZ.js";class $ extends u{toggleHelp(e){const t=this.$iApi.panel.get("help");this.$iApi.panel.toggle(t,e)}get config(){return super.config}_parseConfig(e){const t=l(this.$vApp.$pinia);t.location=e?.location??"./help/",this.handlePanelWidths(["help"]),this.handlePanelTeleports(["help"])}}const w=o({__name:"nav-button",setup(i){const e=d("iApi"),{t}=v(),p=()=>e.event.emit(A.HELP_TOGGLE);return(C,n)=>{const a=f("mapnav-button");return g(),m(a,{onClickFunction:p,tooltip:_(t)("help.title")},{default:x(()=>n[0]||(n[0]=[s("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",class:"fill-current w-32 h-20"},[s("path",{d:"M0 0h24v24H0z",fill:"none"}),s("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"})],-1)])),_:1},8,["tooltip"])}}}),E={en:{"help.title":"Help","help.search":"Search Help","help.section.expand":"Expand section","help.section.collapse":"Collapse section","help.noResults":"Nothing is found. Please try a different search."},fr:{"help.title":"Aide","help.search":"Aide à la recherche","help.section.expand":"Développer une section","help.section.collapse":"Réduire une section","help.noResults":"Aucun résultat. Veuillez essayer une autre recherche."}};class P extends ${added(){this.$iApi.component("help-nav-button",w),this.$iApi.panel.register({help:{screens:{"help-screen":()=>h(c(()=>import("./screen-x-yg_fPu-CYECwFIW.js"),__vite__mapDeps([0,1,2,3]),import.meta.url))},style:{"flex-grow":"1","max-width":"750px"},alertName:"help.title"}},{i18n:{messages:E}}),this._parseConfig(this.config);const e=this.$vApp.$watch(()=>this.config,t=>this._parseConfig(t));this.removed=()=>{e(),this.$iApi.fixture.exists("mapnav")&&r(this.$vApp.$pinia).removeItem("help"),l(this.$vApp.$pinia).$reset(),this.$iApi.panel.remove("help")}}}export{P as default};
