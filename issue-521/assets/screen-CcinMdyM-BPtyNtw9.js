import{c2 as j,c3 as G,c6 as C,c7 as K,fN as $,ga as q,ch as T,c8 as P,cj as M,ck as O,cl as o,ca as l,cm as t,cn as h,cf as E,cd as i,ce as S,cw as w,cx as k,cr as z,gb as I,gc as W,cg as A,c9 as Z,cb as F,cc as B,fG as U,cz as H}from"./main-CF9Cdcsk.js";const J={class:"mb-10"},N=["aria-label"],V={key:0,class:"w-full h-30 hidden"},Q=["alt","src"],R=["alt","src"],X=["alt"],Y={class:"pl-5"},ee={class:"ml-auto pr-5"},ae=["content"],le={key:0,class:"rv-basemap-check absolute top-0 right-0"},te=j({__name:"item",props:{basemap:{type:Object,required:!0},tileSchema:{type:Object,required:!0}},setup(a){const{t:b}=C(),x=K("iApi"),n=$(),e=q("basemapInfo"),r=T(!1),m=P(()=>n.activeBasemapConfig),y=p=>{p.id!==m.value.id&&x?.geo.map.setBasemap(p.id)},f=p=>{p.key==="Tab"&&e.value?.matches(":focus")&&(r.value=!0,e.value._tippy.show())},c=()=>{r.value=!1,e.value._tippy.hide()},d=p=>{p.pointerType==="touch"&&(r.value=!r.value,r.value?e.value._tippy.show():e.value._tippy.hide())};return M(()=>{e.value?.addEventListener("mouseenter",()=>e.value._tippy.show()),e.value?.addEventListener("mouseleave",()=>e.value._tippy.hide()),e.value?.addEventListener("click",d),e.value?.addEventListener("keyup",f),e.value?.addEventListener("blur",c)}),O(()=>{e.value?.removeEventListener("mouseenter",()=>e.value._tippy.show()),e.value?.removeEventListener("mouseleave",()=>e.value._tippy.hide()),e.value?.removeEventListener("click",d),e.value?.removeEventListener("focus",()=>f),e.value?.removeEventListener("blur",()=>c)}),(p,s)=>{const _=o("truncate"),L=o("tippy"),v=o("focus-item");return l(),t("div",J,[h((l(),t("button",{class:"basemap-item-button bg-gray-300 w-full h-full",type:"button","aria-label":E(b)("basemap.select"),onClick:s[2]||(s[2]=u=>y(a.basemap))},[i("div",null,[i("div",{class:S(["flex hover:opacity-50 basemap-item-image basemap-item-container",a.basemap.hideThumbnail?"h-30":"h-180"])},[a.basemap.hideThumbnail?(l(),t("div",V)):a.basemap.thumbnailUrl?(l(),t("img",{key:1,class:"w-full h-180",alt:a.basemap.altText,src:a.basemap.thumbnailUrl},null,8,Q)):a.tileSchema.thumbnailTileUrls&&a.tileSchema.thumbnailTileUrls.length>0&&a.basemap.layers.every(u=>u.layerType==="esri-tile")?(l(!0),t(w,{key:2},k(a.basemap.layers,u=>(l(),t("div",{key:u.id,class:"flex basemap-item-inner h-180"},[(l(!0),t(w,null,k(a.tileSchema.thumbnailTileUrls,(g,D)=>(l(),t("img",{class:"w-full",alt:a.basemap.altText,src:u.url+g,key:D},null,8,R))),128))]))),128)):(l(),t("img",{key:3,class:"w-full bg-white h-180",alt:a.basemap.altText,src:"https://openclipart.org/image/800px/275366"},null,8,X))],2)]),i("div",{class:S(["absolute flex w-full bg-black text-white h-30 bottom-6 items-center",a.basemap.hideThumbnail&&a.basemap.id===m.value.id?"opacity-85":"opacity-75"])},[h((l(),t("div",Y,[i("span",null,z(a.basemap.name),1)])),[[_]]),i("div",ee,[h((l(),t("a",{onClick:s[0]||(s[0]=I(()=>{},["stop"])),onKeydown:s[1]||(s[1]=W(I(()=>{},["prevent"]),["enter","space"])),content:a.basemap.description,ref_key:"basemapInfo",ref:e},s[3]||(s[3]=[i("svg",{class:"fill-current w-16 h-16",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},[i("path",{d:"M0 0h24v24H0z",fill:"none"}),i("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"})],-1)]),40,ae)),[[L,{placement:"bottom",trigger:"manual"}]])])],2),a.basemap.id===m.value.id&&!a.basemap.hideThumbnail?(l(),t("div",le,s[4]||(s[4]=[i("svg",{class:"fill-current w-25 h-25 relative",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},[i("path",{d:"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"})],-1)]))):A("",!0)],8,N)),[[v]])])}}}),se=G(te,[["__scopeId","data-v-b53a4940"]]),ie=["content"],ne={class:"h-600 overflow-y-auto"},ce={class:"font-bold text-xl"},re={key:0,class:"border-t border-b border-gray-600"},ue=j({__name:"screen",props:{panel:{type:Object}},setup(a){const{t:b}=C(),x=$(),n=q("el"),e=T([]),r=T([]),m=c=>{c.key==="Tab"&&n.value?.matches(":focus")&&n.value._tippy.show()},y=()=>{n.value._tippy.hide()};M(()=>{const c=x.config.map;e.value=c.tileSchemas,r.value=c.basemaps,n.value?.addEventListener("blur",y),n.value?.addEventListener("keyup",m)}),O(()=>{n.value?.removeEventListener("blur",y),n.value?.removeEventListener("keyup",m)});const f=c=>r.value.filter(d=>d.tileSchemaId===c);return(c,d)=>{const p=Z("panel-screen"),s=o("truncate"),_=o("focus-list"),L=o("tippy");return l(),F(p,{panel:a.panel},{header:B(()=>[U(z(E(b)("basemap.title")),1)]),content:B(()=>[h((l(),t("div",{content:E(b)("panels.controls.items"),ref_key:"el",ref:n},[i("div",ne,[(l(!0),t(w,null,k(e.value,(v,u)=>(l(),t("div",{class:"mx-5",key:v.id},[i("div",{class:S((u===0?"mt-5":"mt-36")+" flex mb-5")},[h((l(),t("h3",ce,[U(z(v.name),1)])),[[s]])],2),r.value.length>0?(l(),t("ul",re,[(l(!0),t(w,null,k(f(v.id),g=>(l(),t("li",{key:g.id},[H(se,{basemap:g,tileSchema:v,class:"block relative overflow-hidden"},null,8,["basemap","tileSchema"])]))),128))])):A("",!0)]))),128))])],8,ie)),[[_],[L,{trigger:"manual",placement:"top-end",touch:!1,maxWidth:190}]])]),_:1},8,["panel"])}}});export{ue as default};
