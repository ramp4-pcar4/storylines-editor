import{c2 as g,c3 as _,c6 as y,c7 as z,cl as o,ca as s,cm as l,cn as r,ce as v,cf as m,cd as a,cg as x,cr as k,gb as d,gc as j,co as C,fv as B,c8 as E,ch as G,cj as I,c9 as K,cb as M,cc as w,fG as q,cw as A,cx as O,cz as P,fE as W}from"./main-CBEjgtGo.js";const Z={class:"mt-10"},$=["aria-label"],D=["alt","src"],H=["alt"],L={class:"absolute flex w-full bg-black opacity-75 text-white h-30 bottom-6 items-center"},Q={class:"pl-5"},R={class:"ml-auto pr-5"},S=["content"],U=g({__name:"item",props:{area:{type:Object,required:!0},showThumbnail:{type:Boolean}},setup(e){const{t:i}=y(),p=z("iApi"),c=n=>{if(!n.extent){console.error("selected area of interest doesn't have an extent specified.");return}p?.geo.map.zoomMapTo(W.fromConfig("area-of-interest-extent",n.extent))};return(n,t)=>{const b=o("truncate"),u=o("tippy"),h=o("focus-item");return s(),l("div",Z,[r((s(),l("button",{type:"button",class:v(["area-of-interest-item-button bg-gray-300 w-full",{"border border-gray-300":e.showThumbnail}]),"aria-label":m(i)("areas-of-interest.select"),onClick:t[2]||(t[2]=f=>c(e.area))},[a("div",null,[a("div",{class:v(["flex hover:opacity-50 area-of-interest-item-image",e.showThumbnail?"h-180":"h-30"])},[e.area.thumbnail?(s(),l("img",{key:0,class:"w-full bg-white object-contain",alt:e.area.altText||e.area.title,src:e.area.thumbnail},null,8,D)):e.showThumbnail?(s(),l("img",{key:1,class:"w-full bg-white object-contain py-30",alt:e.area.altText||e.area.title,src:"https://openclipart.org/image/800px/160615"},null,8,H)):x("",!0)],2)]),a("div",L,[r((s(),l("div",Q,[a("span",null,k(e.area.title),1)])),[[b]]),r(a("div",R,[r((s(),l("a",{onClick:t[0]||(t[0]=d(()=>{},["stop"])),onKeydown:t[1]||(t[1]=j(d(()=>{},["prevent"]),["enter","space"])),content:e.area.description},t[3]||(t[3]=[a("svg",{class:"fill-current w-16 h-16",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},[a("path",{d:"M0 0h24v24H0z",fill:"none"}),a("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"})],-1)]),40,S)),[[u,{placement:"bottom",trigger:"click focus"}]])],512),[[C,e.area.description]])])],10,$)),[[h]])])}}}),V=_(U,[["__scopeId","data-v-06be115a"]]),X={class:"h-600 overflow-y-auto"},Y={class:"mx-5"},F={key:0},N=g({__name:"screen",props:{panel:{type:Object}},setup(e){const{t:i}=y(),p=B(),c=E(()=>p.areas);let n=G(!1);return I(()=>{n.value=!!c.value?.some(t=>t.thumbnail)}),(t,b)=>{const u=K("panel-screen"),h=o("focus-list");return s(),M(u,{panel:e.panel},{header:w(()=>[q(k(m(i)("areas-of-interest.title")),1)]),content:w(()=>[a("div",X,[a("div",Y,[c.value.length>0?r((s(),l("ul",F,[(s(!0),l(A,null,O(c.value,(f,T)=>(s(),l("li",{key:T},[P(V,{area:f,"show-thumbnail":m(n),class:"block relative overflow-hidden"},null,8,["area","show-thumbnail"])]))),128))])),[[h]]):x("",!0)])])]),_:1},8,["panel"])}}});export{N as default};
