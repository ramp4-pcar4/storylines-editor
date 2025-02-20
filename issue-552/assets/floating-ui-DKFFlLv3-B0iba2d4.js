import{h as xt,c as Ht}from"./themeUtils-YjM7iIiX-ByYjoo1K.js";import{p as Xt}from"./dom-N58V0tYi-DBU3jlah.js";import{l as Gt}from"./debounce-27Hmkkyg-Th7bw3mg.js";const Ft=["top","right","bottom","left"],vt=["start","end"],bt=Ft.reduce((t,e)=>t.concat(e,e+"-"+vt[0],e+"-"+vt[1]),[]),U=Math.min,j=Math.max,et=Math.round,tt=Math.floor,V=t=>({x:t,y:t}),Kt={left:"right",right:"left",bottom:"top",top:"bottom"},Qt={start:"end",end:"start"};function pt(t,e,n){return j(t,U(e,n))}function _(t,e){return typeof t=="function"?t(e):t}function B(t){return t.split("-")[0]}function F(t){return t.split("-")[1]}function Wt(t){return t==="x"?"y":"x"}function gt(t){return t==="y"?"height":"width"}function lt(t){return["top","bottom"].includes(B(t))?"y":"x"}function ht(t){return Wt(lt(t))}function Mt(t,e,n){n===void 0&&(n=!1);const o=F(t),i=ht(t),l=gt(i);let r=i==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[l]>e.floating[l]&&(r=ot(r)),[r,ot(r)]}function Zt(t){const e=ot(t);return[nt(t),e,nt(e)]}function nt(t){return t.replace(/start|end/g,e=>Qt[e])}function Jt(t,e,n){const o=["left","right"],i=["right","left"],l=["top","bottom"],r=["bottom","top"];switch(t){case"top":case"bottom":return n?e?i:o:e?o:i;case"left":case"right":return e?l:r;default:return[]}}function te(t,e,n,o){const i=F(t);let l=Jt(B(t),n==="start",o);return i&&(l=l.map(r=>r+"-"+i),e&&(l=l.concat(l.map(nt)))),l}function ot(t){return t.replace(/left|right|bottom|top/g,e=>Kt[e])}function ee(t){return{top:0,right:0,bottom:0,left:0,...t}}function Bt(t){return typeof t!="number"?ee(t):{top:t,right:t,bottom:t,left:t}}function it(t){const{x:e,y:n,width:o,height:i}=t;return{width:o,height:i,top:n,left:e,right:e+o,bottom:n+i,x:e,y:n}}function Et(t,e,n){let{reference:o,floating:i}=t;const l=lt(e),r=ht(e),a=gt(r),c=B(e),s=l==="y",u=o.x+o.width/2-i.width/2,d=o.y+o.height/2-i.height/2,h=o[a]/2-i[a]/2;let f;switch(c){case"top":f={x:u,y:o.y-i.height};break;case"bottom":f={x:u,y:o.y+o.height};break;case"right":f={x:o.x+o.width,y:d};break;case"left":f={x:o.x-i.width,y:d};break;default:f={x:o.x,y:o.y}}switch(F(e)){case"start":f[r]-=h*(n&&s?-1:1);break;case"end":f[r]+=h*(n&&s?-1:1);break}return f}const ne=async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:l=[],platform:r}=n,a=l.filter(Boolean),c=await(r.isRTL==null?void 0:r.isRTL(e));let s=await r.getElementRects({reference:t,floating:e,strategy:i}),{x:u,y:d}=Et(s,o,c),h=o,f={},p=0;for(let m=0;m<a.length;m++){const{name:y,fn:g}=a[m],{x:w,y:x,data:v,reset:b}=await g({x:u,y:d,initialPlacement:o,placement:h,strategy:i,middlewareData:f,rects:s,platform:r,elements:{reference:t,floating:e}});u=w??u,d=x??d,f={...f,[y]:{...f[y],...v}},b&&p<=50&&(p++,typeof b=="object"&&(b.placement&&(h=b.placement),b.rects&&(s=b.rects===!0?await r.getElementRects({reference:t,floating:e,strategy:i}):b.rects),{x:u,y:d}=Et(s,h,c)),m=-1)}return{x:u,y:d,placement:h,strategy:i,middlewareData:f}};async function K(t,e){var n;e===void 0&&(e={});const{x:o,y:i,platform:l,rects:r,elements:a,strategy:c}=t,{boundary:s="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:h=!1,padding:f=0}=_(e,t),p=Bt(f),m=a[h?d==="floating"?"reference":"floating":d],y=it(await l.getClippingRect({element:(n=await(l.isElement==null?void 0:l.isElement(m)))==null||n?m:m.contextElement||await(l.getDocumentElement==null?void 0:l.getDocumentElement(a.floating)),boundary:s,rootBoundary:u,strategy:c})),g=d==="floating"?{x:o,y:i,width:r.floating.width,height:r.floating.height}:r.reference,w=await(l.getOffsetParent==null?void 0:l.getOffsetParent(a.floating)),x=await(l.isElement==null?void 0:l.isElement(w))?await(l.getScale==null?void 0:l.getScale(w))||{x:1,y:1}:{x:1,y:1},v=it(l.convertOffsetParentRelativeRectToViewportRelativeRect?await l.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:g,offsetParent:w,strategy:c}):g);return{top:(y.top-v.top+p.top)/x.y,bottom:(v.bottom-y.bottom+p.bottom)/x.y,left:(y.left-v.left+p.left)/x.x,right:(v.right-y.right+p.right)/x.x}}const oe=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:o,placement:i,rects:l,platform:r,elements:a,middlewareData:c}=e,{element:s,padding:u=0}=_(t,e)||{};if(s==null)return{};const d=Bt(u),h={x:n,y:o},f=ht(i),p=gt(f),m=await r.getDimensions(s),y=f==="y",g=y?"top":"left",w=y?"bottom":"right",x=y?"clientHeight":"clientWidth",v=l.reference[p]+l.reference[f]-h[f]-l.floating[p],b=h[f]-l.reference[f],T=await(r.getOffsetParent==null?void 0:r.getOffsetParent(s));let R=T?T[x]:0;(!R||!await(r.isElement==null?void 0:r.isElement(T)))&&(R=a.floating[x]||l.floating[p]);const A=v/2-b/2,E=R/2-m[p]/2-1,O=U(d[g],E),z=U(d[w],E),L=O,G=R-m[p]-z,P=R/2-m[p]/2+A,C=pt(L,P,G),H=!c.arrow&&F(i)!=null&&P!==C&&l.reference[p]/2-(P<L?O:z)-m[p]/2<0,M=H?P<L?P-L:P-G:0;return{[f]:h[f]+M,data:{[f]:C,centerOffset:P-C-M,...H&&{alignmentOffset:M}},reset:H}}});function ie(t,e,n){return(t?[...n.filter(o=>F(o)===t),...n.filter(o=>F(o)!==t)]:n.filter(o=>B(o)===o)).filter(o=>t?F(o)===t||(e?nt(o)!==o:!1):!0)}const re=function(t){return t===void 0&&(t={}),{name:"autoPlacement",options:t,async fn(e){var n,o,i;const{rects:l,middlewareData:r,placement:a,platform:c,elements:s}=e,{crossAxis:u=!1,alignment:d,allowedPlacements:h=bt,autoAlignment:f=!0,...p}=_(t,e),m=d!==void 0||h===bt?ie(d||null,f,h):h,y=await K(e,p),g=((n=r.autoPlacement)==null?void 0:n.index)||0,w=m[g];if(w==null)return{};const x=Mt(w,l,await(c.isRTL==null?void 0:c.isRTL(s.floating)));if(a!==w)return{reset:{placement:m[0]}};const v=[y[B(w)],y[x[0]],y[x[1]]],b=[...((o=r.autoPlacement)==null?void 0:o.overflows)||[],{placement:w,overflows:v}],T=m[g+1];if(T)return{data:{index:g+1,overflows:b},reset:{placement:T}};const R=b.map(E=>{const O=F(E.placement);return[E.placement,O&&u?E.overflows.slice(0,2).reduce((z,L)=>z+L,0):E.overflows[0],E.overflows]}).sort((E,O)=>E[1]-O[1]),A=((i=R.filter(E=>E[2].slice(0,F(E[0])?2:3).every(O=>O<=0))[0])==null?void 0:i[0])||R[0][0];return A!==a?{data:{index:g+1,overflows:b},reset:{placement:A}}:{}}}},le=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:i,middlewareData:l,rects:r,initialPlacement:a,platform:c,elements:s}=e,{mainAxis:u=!0,crossAxis:d=!0,fallbackPlacements:h,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:p="none",flipAlignment:m=!0,...y}=_(t,e);if((n=l.arrow)!=null&&n.alignmentOffset)return{};const g=B(i),w=B(a)===a,x=await(c.isRTL==null?void 0:c.isRTL(s.floating)),v=h||(w||!m?[ot(a)]:Zt(a));!h&&p!=="none"&&v.push(...te(a,m,p,x));const b=[a,...v],T=await K(e,y),R=[];let A=((o=l.flip)==null?void 0:o.overflows)||[];if(u&&R.push(T[g]),d){const L=Mt(i,r,x);R.push(T[L[0]],T[L[1]])}if(A=[...A,{placement:i,overflows:R}],!R.every(L=>L<=0)){var E,O;const L=(((E=l.flip)==null?void 0:E.index)||0)+1,G=b[L];if(G)return{data:{index:L,overflows:A},reset:{placement:G}};let P=(O=A.filter(C=>C.overflows[0]<=0).sort((C,H)=>C.overflows[1]-H.overflows[1])[0])==null?void 0:O.placement;if(!P)switch(f){case"bestFit":{var z;const C=(z=A.map(H=>[H.placement,H.overflows.filter(M=>M>0).reduce((M,Yt)=>M+Yt,0)]).sort((H,M)=>H[1]-M[1])[0])==null?void 0:z[0];C&&(P=C);break}case"initialPlacement":P=a;break}if(i!==P)return{reset:{placement:P}}}return{}}}};function Rt(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function Tt(t){return Ft.some(e=>t[e]>=0)}const ae=function(t){return t===void 0&&(t={}),{name:"hide",options:t,async fn(e){const{rects:n}=e,{strategy:o="referenceHidden",...i}=_(t,e);switch(o){case"referenceHidden":{const l=await K(e,{...i,elementContext:"reference"}),r=Rt(l,n.reference);return{data:{referenceHiddenOffsets:r,referenceHidden:Tt(r)}}}case"escaped":{const l=await K(e,{...i,altBoundary:!0}),r=Rt(l,n.floating);return{data:{escapedOffsets:r,escaped:Tt(r)}}}default:return{}}}}};async function ce(t,e){const{placement:n,platform:o,elements:i}=t,l=await(o.isRTL==null?void 0:o.isRTL(i.floating)),r=B(n),a=F(n),c=lt(n)==="y",s=["left","top"].includes(r)?-1:1,u=l&&c?-1:1,d=_(e,t);let{mainAxis:h,crossAxis:f,alignmentAxis:p}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return a&&typeof p=="number"&&(f=a==="end"?p*-1:p),c?{x:f*u,y:h*s}:{x:h*s,y:f*u}}const se=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:i,y:l,placement:r,middlewareData:a}=e,c=await ce(e,t);return r===((n=a.offset)==null?void 0:n.placement)&&(o=a.arrow)!=null&&o.alignmentOffset?{}:{x:i+c.x,y:l+c.y,data:{...c,placement:r}}}}},fe=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:i}=e,{mainAxis:l=!0,crossAxis:r=!1,limiter:a={fn:y=>{let{x:g,y:w}=y;return{x:g,y:w}}},...c}=_(t,e),s={x:n,y:o},u=await K(e,c),d=lt(B(i)),h=Wt(d);let f=s[h],p=s[d];if(l){const y=h==="y"?"top":"left",g=h==="y"?"bottom":"right",w=f+u[y],x=f-u[g];f=pt(w,f,x)}if(r){const y=d==="y"?"top":"left",g=d==="y"?"bottom":"right",w=p+u[y],x=p-u[g];p=pt(w,p,x)}const m=a.fn({...e,[h]:f,[d]:p});return{...m,data:{x:m.x-n,y:m.y-o}}}}};function at(){return typeof window<"u"}function X(t){return Nt(t)?(t.nodeName||"").toLowerCase():"#document"}function D(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function N(t){var e;return(e=(Nt(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Nt(t){return at()?t instanceof Node||t instanceof D(t).Node:!1}function S(t){return at()?t instanceof Element||t instanceof D(t).Element:!1}function W(t){return at()?t instanceof HTMLElement||t instanceof D(t).HTMLElement:!1}function Lt(t){return!at()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof D(t).ShadowRoot}function J(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=k(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(i)}function ue(t){return["table","td","th"].includes(X(t))}function ct(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return!1}})}function st(t){const e=yt(),n=S(t)?k(t):t;return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(o=>(n.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(n.contain||"").includes(o))}function de(t){let e=$(t);for(;W(e)&&!Y(e);){if(st(e))return e;if(ct(e))return null;e=$(e)}return null}function yt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Y(t){return["html","body","#document"].includes(X(t))}function k(t){return D(t).getComputedStyle(t)}function ft(t){return S(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function $(t){if(X(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Lt(t)&&t.host||N(t);return Lt(e)?e.host:e}function Vt(t){const e=$(t);return Y(e)?t.ownerDocument?t.ownerDocument.body:t.body:W(e)&&J(e)?e:Vt(e)}function Q(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);const i=Vt(t),l=i===((o=t.ownerDocument)==null?void 0:o.body),r=D(i);if(l){const a=pe(r);return e.concat(r,r.visualViewport||[],J(i)?i:[],a&&n?Q(a):[])}return e.concat(i,Q(i,[],n))}function pe(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function $t(t){const e=k(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const i=W(t),l=i?t.offsetWidth:n,r=i?t.offsetHeight:o,a=et(n)!==l||et(o)!==r;return a&&(n=l,o=r),{width:n,height:o,$:a}}function wt(t){return S(t)?t:t.contextElement}function q(t){const e=wt(t);if(!W(e))return V(1);const n=e.getBoundingClientRect(),{width:o,height:i,$:l}=$t(e);let r=(l?et(n.width):n.width)/o,a=(l?et(n.height):n.height)/i;return(!r||!Number.isFinite(r))&&(r=1),(!a||!Number.isFinite(a))&&(a=1),{x:r,y:a}}const me=V(0);function zt(t){const e=D(t);return!yt()||!e.visualViewport?me:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function ge(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==D(t)?!1:e}function I(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);const i=t.getBoundingClientRect(),l=wt(t);let r=V(1);e&&(o?S(o)&&(r=q(o)):r=q(t));const a=ge(l,n,o)?zt(l):V(0);let c=(i.left+a.x)/r.x,s=(i.top+a.y)/r.y,u=i.width/r.x,d=i.height/r.y;if(l){const h=D(l),f=o&&S(o)?D(o):o;let p=h,m=p.frameElement;for(;m&&o&&f!==p;){const y=q(m),g=m.getBoundingClientRect(),w=k(m),x=g.left+(m.clientLeft+parseFloat(w.paddingLeft))*y.x,v=g.top+(m.clientTop+parseFloat(w.paddingTop))*y.y;c*=y.x,s*=y.y,u*=y.x,d*=y.y,c+=x,s+=v,p=D(m),m=p.frameElement}}return it({width:u,height:d,x:c,y:s})}function he(t){let{elements:e,rect:n,offsetParent:o,strategy:i}=t;const l=i==="fixed",r=N(o),a=e?ct(e.floating):!1;if(o===r||a&&l)return n;let c={scrollLeft:0,scrollTop:0},s=V(1);const u=V(0),d=W(o);if((d||!d&&!l)&&((X(o)!=="body"||J(r))&&(c=ft(o)),W(o))){const h=I(o);s=q(o),u.x=h.x+o.clientLeft,u.y=h.y+o.clientTop}return{width:n.width*s.x,height:n.height*s.y,x:n.x*s.x-c.scrollLeft*s.x+u.x,y:n.y*s.y-c.scrollTop*s.y+u.y}}function ye(t){return Array.from(t.getClientRects())}function jt(t){return I(N(t)).left+ft(t).scrollLeft}function we(t){const e=N(t),n=ft(t),o=t.ownerDocument.body,i=j(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),l=j(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let r=-n.scrollLeft+jt(t);const a=-n.scrollTop;return k(o).direction==="rtl"&&(r+=j(e.clientWidth,o.clientWidth)-i),{width:i,height:l,x:r,y:a}}function xe(t,e){const n=D(t),o=N(t),i=n.visualViewport;let l=o.clientWidth,r=o.clientHeight,a=0,c=0;if(i){l=i.width,r=i.height;const s=yt();(!s||s&&e==="fixed")&&(a=i.offsetLeft,c=i.offsetTop)}return{width:l,height:r,x:a,y:c}}function ve(t,e){const n=I(t,!0,e==="fixed"),o=n.top+t.clientTop,i=n.left+t.clientLeft,l=W(t)?q(t):V(1),r=t.clientWidth*l.x,a=t.clientHeight*l.y,c=i*l.x,s=o*l.y;return{width:r,height:a,x:c,y:s}}function Pt(t,e,n){let o;if(e==="viewport")o=xe(t,n);else if(e==="document")o=we(N(t));else if(S(e))o=ve(e,n);else{const i=zt(t);o={...e,x:e.x-i.x,y:e.y-i.y}}return it(o)}function It(t,e){const n=$(t);return n===e||!S(n)||Y(n)?!1:k(n).position==="fixed"||It(n,e)}function be(t,e){const n=e.get(t);if(n)return n;let o=Q(t,[],!1).filter(a=>S(a)&&X(a)!=="body"),i=null;const l=k(t).position==="fixed";let r=l?$(t):t;for(;S(r)&&!Y(r);){const a=k(r),c=st(r);!c&&a.position==="fixed"&&(i=null),(l?!c&&!i:!c&&a.position==="static"&&i&&["absolute","fixed"].includes(i.position)||J(r)&&!c&&It(t,r))?o=o.filter(s=>s!==r):i=a,r=$(r)}return e.set(t,o),o}function Ee(t){let{element:e,boundary:n,rootBoundary:o,strategy:i}=t;const l=[...n==="clippingAncestors"?ct(e)?[]:be(e,this._c):[].concat(n),o],r=l[0],a=l.reduce((c,s)=>{const u=Pt(e,s,i);return c.top=j(u.top,c.top),c.right=U(u.right,c.right),c.bottom=U(u.bottom,c.bottom),c.left=j(u.left,c.left),c},Pt(e,r,i));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function Re(t){const{width:e,height:n}=$t(t);return{width:e,height:n}}function Te(t,e,n){const o=W(e),i=N(e),l=n==="fixed",r=I(t,!0,l,e);let a={scrollLeft:0,scrollTop:0};const c=V(0);if(o||!o&&!l)if((X(e)!=="body"||J(i))&&(a=ft(e)),o){const d=I(e,!0,l,e);c.x=d.x+e.clientLeft,c.y=d.y+e.clientTop}else i&&(c.x=jt(i));const s=r.left+a.scrollLeft-c.x,u=r.top+a.scrollTop-c.y;return{x:s,y:u,width:r.width,height:r.height}}function ut(t){return k(t).position==="static"}function Dt(t,e){return!W(t)||k(t).position==="fixed"?null:e?e(t):t.offsetParent}function _t(t,e){const n=D(t);if(ct(t))return n;if(!W(t)){let i=$(t);for(;i&&!Y(i);){if(S(i)&&!ut(i))return i;i=$(i)}return n}let o=Dt(t,e);for(;o&&ue(o)&&ut(o);)o=Dt(o,e);return o&&Y(o)&&ut(o)&&!st(o)?n:o||de(t)||n}const Le=async function(t){const e=this.getOffsetParent||_t,n=this.getDimensions,o=await n(t.floating);return{reference:Te(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function Pe(t){return k(t).direction==="rtl"}const mt={convertOffsetParentRelativeRectToViewportRelativeRect:he,getDocumentElement:N,getClippingRect:Ee,getOffsetParent:_t,getElementRects:Le,getClientRects:ye,getDimensions:Re,getScale:q,isElement:S,isRTL:Pe};function De(t,e){let n=null,o;const i=N(t);function l(){var a;clearTimeout(o),(a=n)==null||a.disconnect(),n=null}function r(a,c){a===void 0&&(a=!1),c===void 0&&(c=1),l();const{left:s,top:u,width:d,height:h}=t.getBoundingClientRect();if(a||e(),!d||!h)return;const f=tt(u),p=tt(i.clientWidth-(s+d)),m=tt(i.clientHeight-(u+h)),y=tt(s),g={rootMargin:-f+"px "+-p+"px "+-m+"px "+-y+"px",threshold:j(0,U(1,c))||1};let w=!0;function x(v){const b=v[0].intersectionRatio;if(b!==c){if(!w)return r();b?r(!1,b):o=setTimeout(()=>{r(!1,1e-7)},1e3)}w=!1}try{n=new IntersectionObserver(x,{...g,root:i.ownerDocument})}catch{n=new IntersectionObserver(x,g)}n.observe(t)}return r(!0),l}function Ae(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:i=!0,ancestorResize:l=!0,elementResize:r=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:c=!1}=o,s=wt(t),u=i||l?[...s?Q(s):[],...Q(e)]:[];u.forEach(g=>{i&&g.addEventListener("scroll",n,{passive:!0}),l&&g.addEventListener("resize",n)});const d=s&&a?De(s,n):null;let h=-1,f=null;r&&(f=new ResizeObserver(g=>{let[w]=g;w&&w.target===s&&f&&(f.unobserve(e),cancelAnimationFrame(h),h=requestAnimationFrame(()=>{var x;(x=f)==null||x.observe(e)})),n()}),s&&!c&&f.observe(s),f.observe(e));let p,m=c?I(t):null;c&&y();function y(){const g=I(t);m&&(g.x!==m.x||g.y!==m.y||g.width!==m.width||g.height!==m.height)&&n(),m=g,p=requestAnimationFrame(y)}return n(),()=>{var g;u.forEach(w=>{i&&w.removeEventListener("scroll",n),l&&w.removeEventListener("resize",n)}),d?.(),(g=f)==null||g.disconnect(),f=null,c&&cancelAnimationFrame(p)}}const Oe=se,Se=re,ke=fe,At=le,Ce=ae,He=oe,Fe=(t,e,n)=>{const o=new Map,i={platform:mt,...n},l={...i.platform,_c:o};return ne(t,e,{...i,platform:l})};function We(t){return Me(t)}function dt(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Me(t){for(let e=t;e;e=dt(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=dt(t);e;e=dt(e)){if(!(e instanceof Element))continue;const n=getComputedStyle(e);if(n.display!=="contents"&&(n.position!=="static"||st(n)||e.tagName==="BODY"))return e}return null}(function(){if(Ht()){const t=mt.getOffsetParent;mt.getOffsetParent=e=>t(e,We)}})();function Ot(t){const e=window.devicePixelRatio||1;return Math.round(t*e)/e}const qt=async(t,{referenceEl:e,floatingEl:n,overlayPositioning:o="absolute",placement:i,flipDisabled:l,flipPlacements:r,offsetDistance:a,offsetSkidding:c,arrowEl:s,type:u})=>{if(!e||!n)return null;const d=Xt(n)==="rtl",{x:h,y:f,placement:p,strategy:m,middlewareData:y}=await Fe(e,n,{strategy:o,placement:i==="auto"||i==="auto-start"||i==="auto-end"?void 0:kt(i,d),middleware:Ne({placement:i,flipDisabled:l,flipPlacements:r?.map(v=>kt(v,d)),offsetDistance:a,offsetSkidding:c,arrowEl:s,type:u})});if(s&&y.arrow){const{x:v,y:b}=y.arrow,T=p.split("-")[0],R=v!=null?"left":"top",A=$e[T],E={left:"",top:"",bottom:"",right:""};"floatingLayout"in t&&(t.floatingLayout=T==="left"||T==="right"?"horizontal":"vertical"),Object.assign(s.style,{...E,[R]:`${R=="left"?v:b}px`,[T]:"100%",transform:A})}const g=y.hide?.referenceHidden?"hidden":null,w=g?"none":null;n.setAttribute(Be,p);const{open:x}=t;Object.assign(n.style,{visibility:g,pointerEvents:w,position:m,transform:x?`translate(${Ot(h)}px,${Ot(f)}px)`:"",top:0,left:0})},Be="data-placement",St=["top","bottom","right","left","top-start","top-end","bottom-start","bottom-end","right-start","right-end","left-start","left-end","leading","trailing","leading-start","leading-end","trailing-start","trailing-end"],qe="bottom-start",Ue="bottom-end",Ye={animation:"calcite-floating-ui-anim",animationActive:"calcite-floating-ui-anim--active",arrow:"calcite-floating-ui-arrow",arrowStroke:"calcite-floating-ui-arrow__stroke"};function Ne({placement:t,flipDisabled:e,flipPlacements:n,offsetDistance:o,offsetSkidding:i,arrowEl:l,type:r}){const a=[ke(),Ce()];if(r==="menu")return[...a,At({fallbackPlacements:n||["top-start","top","top-end","bottom-start","bottom","bottom-end"]})];if(r==="popover"||r==="tooltip"){const c=[...a,Oe({mainAxis:typeof o=="number"?o:0,crossAxis:typeof i=="number"?i:0})];return t==="auto"||t==="auto-start"||t==="auto-end"?c.push(Se({alignment:t==="auto-start"?"start":t==="auto-end"?"end":null})):e||c.push(At(n?{fallbackPlacements:n}:{})),l&&c.push(He({element:l})),c}return[]}function Xe(t,e){const n=t.filter(o=>St.includes(o));return n.length!==t.length&&console.warn(`${e.tagName}: Invalid value found in: flipPlacements. Try any of these: ${St.map(o=>`"${o}"`).join(", ").trim()}`,{el:e}),n}function kt(t,e=!1){const n=["left","right"];return e&&n.reverse(),t.replace(/leading/gi,n[0]).replace(/trailing/gi,n[1])}async function Ge(t,e,n=!1){if(!(!t.open||!e.floatingEl||!e.referenceEl)){if(!Z.get(t))return Ut(t,e.referenceEl,e.floatingEl);await(n?Ve(t):qt)(t,e)}}function Ve(t){let e=rt.get(t);return e||(e=Gt(qt,xt.reposition,{leading:!0,maxWait:xt.reposition}),rt.set(t,e),e)}const $e={top:"",left:"rotate(-90deg)",bottom:"rotate(180deg)",right:"rotate(90deg)"},Z=new WeakMap,rt=new WeakMap;async function Ut(t,e,n){if(!n.isConnected)return;const o=Ht()?Ae:(r,a,c)=>(c(),()=>{});Z.set(t,{state:"pending"});let i;const l=o(e,n,()=>{const r=t.reposition();i||(i=r)});return Z.set(t,{state:"active",cleanUp:l}),i}async function Ke(t,e,n){if(!(!n||!e)&&(ze(t,e,n),Object.assign(n.style,{visibility:"hidden",pointerEvents:"none",position:t.overlayPositioning}),!!t.open))return Ut(t,e,n)}function ze(t,e,n){if(!n||!e)return;const o=Z.get(t);o?.state==="active"&&o.cleanUp(),Z.delete(t),rt.get(t)?.cancel(),rt.delete(t)}const Ct=4,Qe=Math.ceil(Math.hypot(Ct,Ct));export{Ue as $,Xe as I,Ke as U,qe as V,Qe as X,Ge as _,Ye as j,ze as q};
