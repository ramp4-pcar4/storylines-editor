import{c2 as T,c3 as F,c4 as te,c5 as S,c6 as W,c7 as K,c8 as q,c9 as Y,ca as l,cb as k,cc as V,cd as A,ce as I,cf as O,cg as B,ch as E,ci as ae,cj as J,ck as Q,cl as N,cm as g,cn as P,co as ee,cp as ne,cq as ie,cr as se,cs as oe,ct as le,cu as re,cv as R,cw as x,cx as M,cy as Z,cz as j,cA as pe,cB as ce,cC as ue,cD as D,cE as de}from"./main-BLGVPR4E.js";class U{id;options;componentId;constructor(a){const r={options:{},...a};({id:this.id,options:this.options,componentId:this.componentId}=r)}}const me=["innerHTML"],H=T({__name:"default-button",props:{panelId:{type:String,required:!0},minimize:{type:Boolean,default:!1},overflow:{type:Boolean}},setup(f){const{t:a}=W(),r=K("iApi"),n=f,d=q(()=>r?.panel.get(n.panelId)?.button),o=()=>{n.minimize?r?.panel.toggleMinimize(n.panelId):r?.panel.toggle(n.panelId)};return(e,y)=>{const p=Y("appbar-button");return d.value?(l(),k(p,{key:0,onClickFunction:o,tooltip:O(a)(d.value.tooltip),id:f.panelId},{default:V(()=>[A("div",{class:I(["default fill-current w-24 h-24 ml-8 sm:ml-20",{"ml-20":f.overflow}]),innerHTML:d.value.icon},null,10,me)]),_:1},8,["tooltip","id"])):B("",!0)}}}),ve={},fe={class:"border-b p-0 self-center w-2/3"};function he(f,a){return l(),g("span",fe)}const G=F(ve,[["render",he],["__scopeId","data-v-5d32b715"]]);var ge={name:"maxSize",enabled:!0,phase:"main",requiresIfExists:["offset","preventOverflow","flip"],fn:function(f){var a=f.state,r=f.name,n=f.options,d=de(a,n),o=a.modifiersData.preventOverflow||{x:0,y:0},e=o.x,y=o.y,p=a.rects.popper,c=p.width,h=p.height,z=a.placement.split("-"),w=z[0],_=w==="left"?"left":"right",v=w==="top"?"top":"bottom";a.modifiersData[r]={width:c-d[_]-e,height:h-d[v]-y}}};const be=["content","aria-label"],$e=T({__name:"more-button",props:{position:{type:String,default:"right-end"},popperOptions:{type:Object,default(){return{}}},numItems:{type:Number,default:1},renderWatch:{type:Number,default:0}},emits:["updateParent"],setup(f,{expose:a,emit:r}){const{t:n}=W(),d=K("iApi"),o=f,e=r;function y(){e("updateParent")}const p=E(!1),c=E(0),h=E(),z=E(),w=E();function _(){y(),R(()=>{v(),p.value=!p.value})}ae(()=>o.renderWatch,()=>{_()});const v=()=>{p.value=!p.value;const u=d.$vApp.$el.querySelector(".inner-shell"),b={name:"applyMaxSize",enabled:!0,phase:"beforeWrite",requires:["maxSize"],fn({state:m}){const{width:i}=m.modifiersData.maxSize;m.styles.popper={...m.styles.popper,maxWidth:`${i}px`,maxHeight:`${u.offsetHeight-45}px`};const $=Math.min(o.numItems<=0?0:55+44*(o.numItems-1),u.offsetHeight-45);m.styles.popper.height=`${$}px`,w?.value?.offsetHeight&&(w.value.style.height=`${$}px`),m.styles.popper.overflowY="auto",m.styles.popper.overflowX="hidden"}};z.value&&w.value&&(c.value++,ue(z.value,w.value,{placement:o.position||"right-end",modifiers:[{...ge,options:{boundary:u}},b,{name:"offset",options:{offset:[0,5]}},{name:"preventOverflow",enabled:!0,options:{boundary:u}}],...o.popperOptions})),c.value===1&&_()};return J(()=>{window.addEventListener("click",u=>{u.target instanceof HTMLElement&&!h.value?.contains(u.target)&&(p.value=!1)},{capture:!0})}),Q(()=>{window.removeEventListener("click",u=>{u.target instanceof HTMLElement&&!h.value?.contains(u.target)&&(p.value=!1)},{capture:!0})}),a({rerender:_}),(u,b)=>{const m=N("focus-item"),i=N("tippy");return l(),g("div",{class:"appbar-item relative inset-x-0 w-full text-center",ref_key:"el",ref:h},[P((l(),g("button",{type:"button",class:"text-gray-400 w-full h-48 focus:outline-none hover:text-white",onClick:b[0]||(b[0]=$=>v()),content:O(n)("appbar.more"),"aria-label":O(n)("appbar.more"),ref_key:"dropdownTrigger",ref:z},b[1]||(b[1]=[A("svg",{class:"fill-current w-24 h-24 m-auto",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},[A("path",{d:"M0 0h24v24H0z",fill:"none"}),A("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"})],-1)]),8,be)),[[m],[i,{placement:"right-end"}]]),P(A("div",{id:"dropdown",class:"dropdown shadow-md border border-gray:200 absolute w-64 flex flex-col bg-white rounded",ref_key:"dropdown",ref:w},[ne(u.$slots,"default",{},void 0,!0)],512),[[ee,p.value]])],512)}}}),ye=F($e,[["__scopeId","data-v-93661050"]]),we={key:0,class:"number absolute top-1 right-2 text-white w-18 rounded-full"},xe=T({__name:"appbar-button",setup(f){const a=ie(),{t:r}=W(),n=K("iApi"),d=q(()=>a.notificationNumber),o=()=>{n.panel.toggle("notifications")};return(e,y)=>{const p=Y("appbar-button",!0);return l(),k(p,{onClickFunction:o,tooltip:O(r)("notifications.title"),class:"notification-button",id:""},{default:V(()=>[y[0]||(y[0]=A("svg",{class:"fill-current w-24 h-24 mx-8 sm:mx-20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},[A("path",{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"})],-1)),d.value&&d.value>0?(l(),g("span",we,se(d.value),1)):B("",!0)]),_:1},8,["tooltip"])}}}),ke=F(xe,[["__scopeId","data-v-787da765"]]),Ee=["content"],Ie=T({__name:"appbar",setup(f){const a=oe(),r=S(),n=E(0),d=E(0),o=q(()=>r.visible),e=q(()=>r.temporary),{t:y}=W(),p=E(!1),c=E({}),h=E(),z=()=>{R(()=>{D()?.proxy?.$forceUpdate()})},w=()=>{h.value._tippy.hide()},_=v=>{v.key==="Tab"&&h.value?.matches(":focus")&&h.value._tippy.show()};return J(()=>{h.value?.addEventListener("blur",w),h.value?.addEventListener("keyup",_)}),le(()=>{const v=D();window.addEventListener("resize",()=>v?.proxy?.$forceUpdate())}),Q(()=>{const v=D();window.removeEventListener("resize",()=>v?.proxy?.$forceUpdate()),h.value?.removeEventListener("blur",w),h.value?.removeEventListener("keyup",_)}),re(()=>{R(()=>{const v=h.value;let u,b=[...v.children],m=b[b.length-2].getBoundingClientRect().top;a.mobileView||(m=v.getBoundingClientRect().bottom-38);let i=v.querySelector("#dropdown");for(let s=b.length-4;s>=0;s--){let C=b[s].getBoundingClientRect().bottom;if(m&&i&&(C>m||p.value&&C+56>m))b[s].classList.forEach(L=>{L.includes("identifier")&&(u=L.slice(11))}),u&&(c.value[u]=!0,u.includes("divider")||n.value++,d.value++),p.value||(p.value=!0);else if(C!==0)break}let $=v.querySelector("#more"),t=$.getBoundingClientRect().bottom;if(u=void 0,p.value&&m&&$&&i&&t!==0&&(t<=m-56||i.childElementCount==1&&t<=m)){let s=i.childElementCount,C=0;for(;t<=m-56||s==1;){let L=i.children[C];if(L&&(L.classList.forEach(X=>{X.includes("identifier")&&(u=X.slice(11))}),u&&(c.value[u]=!1,u.includes("divider")||n.value--),t+=48,s-=1,C+=1),s===0){p.value=!1;break}}}Object.keys(c.value).forEach(s=>{v.querySelector(`.identifier-${s}`)||(delete c.value[s],s.includes("divider")||(n.value=Math.max(0,n.value-1)),d.value++)})})}),(v,u)=>{const b=N("focus-list"),m=N("tippy");return P((l(),g("div",{class:"absolute top-0 left-0 bottom-28 flex flex-col w-40 pointer-events-auto appbar z-50 sm:z-20 bg-black-75 sm:w-64 sm:bottom-38",content:O(y)("panels.controls.items"),ref_key:"el",ref:h},[(l(!0),g(x,null,M(o.value,(i,$)=>(l(),g(x,null,[(l(!0),g(x,null,M(i,(t,s)=>(l(),g(x,null,[typeof t=="string"&&c.value[`${t}-${s}`]!==!0?(l(),k(H,{key:`${t}-${s}-default`,panelId:t,class:I(["appbar-item h-48",`identifier-${t}-${s}`])},null,8,["panelId","class"])):c.value[`${t}-${s}`]!==!0?(l(),k(Z(t.componentId),{key:`${t}-${s}-custom`,options:t.options,class:I(["appbar-item h-48",`identifier-${t}-${s}`]),id:t.id},null,8,["options","id","class"])):B("",!0)],64))),256)),c.value[`divider-${$}`]!==!0?(l(),k(G,{class:I(["appbar-item",`identifier-divider-${$}`]),key:`${i}-${$}-default`},null,8,["class"])):B("",!0)],64))),256)),(l(!0),g(x,null,M(e.value?.filter(i=>c.value[`${i}-temp`]!==!0),i=>(l(),k(H,{panelId:i,minimize:!0,key:`${i}-temp`,class:I([`identifier-${i}-temp`,"appbar-item h-48"])},null,8,["panelId","class"]))),128)),P(j(ye,{id:"more",numItems:n.value,renderWatch:d.value,onUpdateParent:z},{default:V(()=>[(l(!0),g(x,null,M(o.value,(i,$)=>(l(),g(x,{key:$},[(l(!0),g(x,null,M(i,(t,s)=>(l(),g(x,null,[typeof t=="string"&&c.value[`${t}-${s}`]?(l(),k(H,{key:`${t}-${s}-default`,panelId:t,class:I(["text-black hover:bg-gray my-4 h-36",`identifier-${t}-${s}`]),overflow:""},null,8,["panelId","class"])):c.value[`${t}-${s}`]?(l(),k(Z(t.componentId),{key:`${t}-${s}-custom`,options:t.options,id:t.id,class:I(["appbar-item h-48",`identifier-${t}-${s}`])},null,8,["options","id","class"])):B("",!0)],64))),256)),c.value[`divider-${$}`]?(l(),k(G,{key:0,class:I(["border-black my-4",`identifier-divider-${$}`])},null,8,["class"])):B("",!0)],64))),128)),(l(!0),g(x,null,M(e.value?.filter(i=>c.value[`${i}-temp`]),i=>(l(),k(H,{panelId:i,minimize:!0,key:`${i}-temp`,class:I([`identifier-${i}-temp`,"text-black hover:bg-gray my-4 h-36"]),overflow:""},null,8,["panelId","class"]))),128))]),_:1},8,["numItems","renderWatch"]),[[ee,p.value]]),j(ke,{class:"appbar-item bottom-48 h-48 sm:display-none"}),j(pe,{class:"absolute bottom-0 h-40 sm:display-none w-full text-center",position:"right-start"})],8,Ee)),[[b],[m,{trigger:"manual",touch:!1,placement:"top-end",popperOptions:{placement:"top",modifiers:[{name:"preventOverflow",options:{altAxis:!0}},{name:"flip",options:{fallbackPlacements:["top"]}}]}}]])}}});class _e extends ce{get config(){return super.config}_parseConfig(a){if(!a)return;const r=S(this.$vApp.$pinia);let n;Array.isArray(a.items[0])?n=a.items:n=[a.items];const d=[];n.forEach(o=>{d.push(o.map(e=>typeof e=="string"?e:new U(e)))}),r.items=d.flat().reduce((o,e)=>(o[e instanceof U?e.id:e]=e,o),{}),r.order=d.map(o=>o.map(e=>e instanceof U?e.id:e)),this._validateItems()}_validateItems(){const a=S(this.$vApp.$pinia);a.order.flat().forEach(r=>{typeof a.items[r]!="string"&&[r].some(n=>{this.$iApi.fixture.exists(n)&&!a.items[r]&&(a.items[r].componentId=`${n}-appbar-button`)})})}}const ze={en:{"appbar.navigation":"Navigation","appbar.more":"More","navigation.export":"Export","navigation.map.export":"Export Map"},fr:{"appbar.navigation":"Navigation","appbar.more":"Plus","navigation.export":"Exporter","navigation.map.export":"Exporter la Carte"}};class Ce extends _e{initialized(){}async added(){Object.entries(ze).forEach(e=>this.$iApi.$i18n.mergeLocaleMessage(...e));const{destroy:a,el:r}=this.mount(Ie,{app:this.$element}),n=this.$vApp.$el.getElementsByClassName("inner-shell")[0];n.insertBefore(r.childNodes[0],n.querySelector(".panel-stack")),this._parseConfig(this.config);const d=this.$vApp.$watch(()=>this.config,e=>this._parseConfig(e)),o=[];o.push(this.$iApi.event.on(te.COMPONENT,()=>{this._parseConfig(this.config)})),this.removed=()=>{const e=S(this.$vApp.$pinia);d(),o.forEach(c=>this.$iApi.event.off(c));const y={...e.items},p=[...e.temporary];Object.keys(y).forEach(c=>e.removeButton(c)),p.forEach(c=>e.removeButton(c)),a(),e.$reset()}}}export{Ce as default};
