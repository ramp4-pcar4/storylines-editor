import{c2 as P,c3 as D,c6 as F,fH as H,cs as J,c8 as w,fZ as O,cl as A,ca as a,cm as l,cd as n,ce as Q,cf as c,gc as z,gb as U,cn as x,fG as C,cg as _,c7 as Z,ch as $,ct as Y,ci as ee,cj as W,ck as X,cr as f,cw as G,cx as I,c4 as ae,c9 as te,cb as B,cc as N,cz as V,cp as le,gd as re,ge as se}from"./main-CJueYQxD.js";const ne={class:"rv-geosearch-bar relative h-26 mx-8 mb-8"},oe=["placeholder","value","aria-label"],ce={class:"absolute inset-y-0 right-8 grid w-10 place-content-center"},ie=["aria-label","content"],ue=P({__name:"search-bar",setup(R){const{t:r}=F(),u=H(),i=J(),m=w(()=>u.searchVal),s=w(()=>['"',"$","!","*","+","?","^","{","}","(",")","|","[","]"].filter(p=>u.searchVal.includes(p)).join("")),o=p=>{u.setSearchTerm(p),u.setSearchRegex(p)},h=O(500,p=>{o(p)});return(p,t)=>{const e=A("tippy");return a(),l("div",ne,[n("input",{type:"text",class:Q(["border-b w-full text-base py-8 outline-none focus:shadow-outline border-gray-600 h-full min-w-0",{"border-yellow-500":s.value}]),placeholder:c(r)("geosearch.searchText"),value:m.value,onInput:t[0]||(t[0]=v=>c(h)(v.target.value)),onKeyup:t[1]||(t[1]=z(v=>{c(i).mobileView&&v.target.blur()},["enter"])),"aria-label":c(r)("geosearch.searchText"),onKeypress:t[2]||(t[2]=z(U(()=>{},["prevent"]),["enter"])),enterkeyhint:"done"},null,42,oe),n("span",ce,[s.value?x((a(),l("button",{key:0,class:"cursor-default","aria-label":c(r)("geosearch.badChars",{chars:s.value}),content:c(r)("geosearch.badChars",{chars:s.value})},t[3]||(t[3]=[C(" ⚠ ")]),8,ie)),[[e]]):_("",!0)])])}}}),pe={class:"w-fit inline-block sm:w-1/2 h-26 mb-8 sm:mb-0 pr-16 sm:pr-0"},ve=["value","aria-label"],be={value:"",disabled:"",hidden:""},de={class:"sm:w-1/2 h-26 sm:mx-16 flex"},ge=["value","aria-label"],he={value:"",disabled:"",hidden:""},fe=["disabled","content","aria-label"],me=P({__name:"top-filters",setup(R){const{t:r}=F(),u=Z("iApi"),i=H(),m=$(),s=$(),o=$(),h=$([]),p=$([]),t=$([]),e=w(()=>i.queryParams),v=w(()=>u.language),L=g=>i.setProvince(g),E=g=>i.setType(g),S=()=>{L({}),E({})},j=()=>{i.initService(u.language,u.fixture.get("geosearch").config);const g=h.value.find(d=>e.value.province===d.name)?.code,k=p.value.find(d=>e.value.type===d.name)?.code;i.getProvinces.then(d=>{h.value=d,L({province:d.find(T=>T.code===g)?.name,forceReRun:!0})}),i.getTypes.then(d=>{p.value=d,E({type:d.find(T=>T.code===k)?.name,forceReRun:!0})})},b=()=>{s.value._tippy.hide()},M=()=>{o.value._tippy.hide()},K=g=>{g.key==="Tab"&&s.value?.matches(":focus")&&navigator.userAgent.includes("Firefox")?s.value._tippy.show():s.value._tippy.hide()},q=g=>{g.key==="Tab"&&o.value?.matches(":focus")&&navigator.userAgent.includes("Firefox")?o.value._tippy.show():o.value._tippy.hide()};return Y(()=>{j(),t.value.push(ee(v,j))}),W(()=>{s.value?.addEventListener("blur",b),s.value?.addEventListener("keyup",K),o.value?.addEventListener("blur",M),o.value?.addEventListener("keyup",q)}),X(()=>{t.value.forEach(g=>g()),s.value?.removeEventListener("blur",b),s.value?.removeEventListener("keyup",K),o.value?.removeEventListener("blur",M),o.value?.removeEventListener("keyup",q)}),(g,k)=>{const d=A("truncate"),T=A("tippy");return a(),l("div",{class:"rv-geosearch-top-filters sm:flex items-center w-full ml-8 mb-14",ref_key:"el",ref:m},[n("div",pe,[x((a(),l("select",{class:"border-b border-b-gray-600 w-full h-full py-0 cursor-pointer",value:e.value.province,"aria-label":c(r)("geosearch.filters.province"),onChange:k[0]||(k[0]=y=>L({province:y.target.value})),ref_key:"selectProvince",ref:s},[x((a(),l("option",be,[C(f(c(r)("geosearch.filters.province")),1)])),[[d]]),(a(!0),l(G,null,I(h.value,y=>x((a(),l("option",{key:y.code},[C(f(y.name),1)])),[[d]])),128))],40,ve)),[[d],[T,{content:c(r)("select.items"),trigger:"manual",placement:"top-start"}]])]),n("div",de,[x((a(),l("select",{class:"border-b border-b-gray-600 w-full h-full py-0 cursor-pointer max-w-150",value:e.value.type,"aria-label":c(r)("geosearch.filters.type"),onChange:k[1]||(k[1]=y=>E({type:y.target.value})),ref_key:"selectFilter",ref:o},[n("option",he,f(c(r)("geosearch.filters.type")),1),(a(!0),l(G,null,I(p.value,y=>(a(),l("option",{key:y.code},f(y.name),1))),128))],40,ge)),[[d],[T,{content:c(r)("select.items"),trigger:"manual",placement:"top-start"}]]),x((a(),l("button",{type:"button",class:"text-gray-500 w-1/8 h-24 pl-8 pr-16 sm:pr-8 hover:text-black disabled:cursor-default disabled:text-gray-400",disabled:!e.value.type&&!e.value.province,onClick:S,content:c(r)("geosearch.filters.clear"),"aria-label":c(r)("geosearch.filters.clear")},k[2]||(k[2]=[n("div",{class:"rv-geosearch-icon"},[n("svg",{class:"fill-current w-18 h-18",viewBox:"0 0 23 21"},[n("path",{d:"M 14.7574,20.8284L 17.6036,17.9822L 14.7574,15.1716L 16.1716,13.7574L 19.0178,16.568L 21.8284,13.7574L 23.2426,15.1716L 20.432,17.9822L 23.2426,20.8284L 21.8284,22.2426L 19.0178,19.3964L 16.1716,22.2426L 14.7574,20.8284 Z M 2,2L 19.9888,2.00001L 20,2.00001L 20,2.01122L 20,3.99999L 19.9207,3.99999L 13,10.9207L 13,22.909L 8.99999,18.909L 8.99999,10.906L 2.09405,3.99999L 2,3.99999L 2,2 Z "})])],-1)]),8,fe)),[[T,{placement:"bottom"}]])])],512)}}}),ye={class:"rv-geosearch-bottom-filters"},xe={class:"bg-white"},we={class:"ml-8 cursor-pointer font-normal"},Le=["checked"],ke=P({__name:"bottom-filters",setup(R){const{t:r}=F(),u=Z("iApi"),i=H(),m=w(()=>i.resultsVisible),s=O(300,t=>{h(t).then(e=>{o({extent:e,visible:m.value})})}),o=t=>{i.setMapExtent(t)},h=async t=>t.sr.wkid===4326?t:await u.geo.proj.projectGeometry(4326,t),p=t=>{h(u.geo.map.getExtent()).then(e=>{o({extent:e,visible:t})})};return W(()=>{u.event.on(ae.MAP_EXTENTCHANGE,s,"geosearch_map_extent")}),X(()=>{u.event.off("geosearch_map_extent")}),(t,e)=>(a(),l("div",ye,[n("div",xe,[n("label",we,[n("input",{type:"checkbox",class:"border-2 mx-8 border-gray-600 cursor-pointer",checked:m.value,onChange:e[0]||(e[0]=v=>p(v.target.checked)),onKeypress:e[1]||(e[1]=z(U(()=>{},["prevent"]),["enter"]))},null,40,Le),C(f(c(r)("geosearch.visible")),1)])])]))}}),_e={},Ee={class:"w-full h-6 relative overflow-hidden rounded-full indeterminate mb-14"},Te={class:"h-full progressbar bg-blue-800 rounded-full top-0","aria-valuemin":"0","aria-valuemax":"100"},Ce={class:"flex items-center h-full"};function Re(R,r){return a(),l("div",Ee,[n("div",Te,[n("span",Ce,[le(R.$slots,"default",{},void 0,!0)])])])}const $e=D(_e,[["render",Re],["__scopeId","data-v-0a8d1c36"]]),Ae={class:"flex flex-col h-full"},je={key:1,class:"text-red-900 text-xs px-8 mb-10"},Me={key:2,class:"px-8 mb-10 py-8 flex-grow text-wrap border-y border-gray-600 overflow-y-auto"},Pe={class:"relative h-48"},Fe={class:"font-bold text-blue-600"},He={key:3,class:"rv-results-list flex-grow mb-5 border-t border-b border-gray-600 overflow-y-auto"},Se=["onClick"],Ke={class:"rv-result-description px-8"},Ve={class:"flex-1 text-left truncate font-bold leading-tight"},ze=["innerHTML"],Ge={key:0,class:"text-gray-600 text-sm"},Ie={key:1,class:"hidden"},Ze={key:2,class:"text-sm font-normal"},Be=P({__name:"screen",props:{panel:{type:Object}},setup(R){const{t:r}=F(),u=Z("iApi"),i=H(),m=w(()=>i.searchVal.replace(/["!*$+?^{}()|[\]\\]/g,"").trim()),s=w(()=>i.searchResults),o=w(()=>i.loadingResults),h=w(()=>i.failedServices),p=e=>{let v=new re("zoomies",[[[e.bbox[0],e.bbox[1]],[e.bbox[0],e.bbox[3]],[e.bbox[2],e.bbox[3]],[e.bbox[2],e.bbox[1]],[e.bbox[0],e.bbox[1]]]],se.latLongSR(),!0);u.geo.map.zoomMapTo(v)},t=(e,v)=>{const L=e.replace(new RegExp(`${i.searchRegex}`,"gi"),E=>'<span class="font-bold text-blue-600">'+E+"</span>");return v?L+",":L};return(e,v)=>{const L=te("panel-screen"),E=A("truncate"),S=A("focus-item"),j=A("focus-list");return a(),B(L,{panel:R.panel},{header:N(()=>[C(f(c(r)("geosearch.title")),1)]),content:N(()=>[n("div",Ae,[V(ue),V(me),o.value?(a(),B($e,{key:0,class:"flex-none"})):_("",!0),h.value.length>0&&!o.value?(a(),l("div",je,f(c(r)("geosearch.serviceError",{services:h.value.join(", ")})),1)):_("",!0),m.value&&s.value.length===0&&!o.value?(a(),l("div",Me,[n("span",Pe,[C(f(c(r)("geosearch.noResults")),1),n("span",Fe,'"'+f(m.value)+'"',1)])])):_("",!0),s.value.length>0?x((a(),l("ul",He,[(a(!0),l(G,null,I(s.value,(b,M)=>(a(),l("li",{class:"relative h-56",key:M},[x((a(),l("button",{type:"button",class:"absolute inset-0 h-full w-full hover:bg-gray-300 default-focus-style",onClick:K=>p(b),style:{"border-bottom":"1px solid lightgray"},"truncate-trigger":""},[n("div",Ke,[x((a(),l("div",Ve,[n("span",{innerHTML:t(b.name,b.location.province)},null,8,ze),b.location.province?(a(),l("span",Ge,f(b.location.city?" "+b.location.city+", "+b.location.province.abbr:" "+b.location.province.abbr),1)):_("",!0),b.type?(a(),l("span",Ie,"; ")):_("",!0),b.type?(a(),l("span",Ze,[v[0]||(v[0]=n("br",null,null,-1)),C(f(b.type),1)])):_("",!0)])),[[E,{externalTrigger:!0,options:{placement:"top-start"}}]])])],8,Se)),[[S,"show-truncate"]])]))),128))])),[[j]]):_("",!0),V(ke,{class:"mt-auto"})])]),_:1},8,["panel"])}}});export{Be as default};
