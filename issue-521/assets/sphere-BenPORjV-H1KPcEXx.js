import{dA as B,i8 as C,ha as D,i9 as M,dU as g,d$ as G}from"./main-CF9Cdcsk.js";import{K as H}from"./mat4-DX7gBViE-1P3ND5w1.js";import{j as P,L as d,g as T,b as l,S as x,Y as J,r as f,v as Q,l as X,_ as q,p as W,X as tt,A as w,y as Y,N as nt}from"./vec32-D9GsKZ1t-ClFZ45DM.js";import{O as F,p as y}from"./vec42-D8CJyqHG-DnfLTeQH.js";import{o as K,e as N}from"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import{n as it}from"./common-CYWrYyJl-E8-sukrT.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import{f as a,o as ot,e as et}from"./plane-Dt8R0KeE-BfNZ8Eib.js";class rt{constructor(i){this._allocator=i,this._items=[],this._itemsPtr=0,this._grow()}get(){return this._itemsPtr===0&&B(()=>this._reset()),this._itemsPtr===this._items.length&&this._grow(),this._items[this._itemsPtr++]}_reset(){const i=Math.min(3*Math.max(8,this._itemsPtr),this._itemsPtr+3*E);this._items.length=Math.min(i,this._items.length),this._itemsPtr=0}_grow(){for(let i=0;i<Math.max(8,Math.min(this._items.length,E));i++)this._items.push(this._allocator())}}const E=1024;function S(t){return t?O(C(t.origin),C(t.direction)):O(g(),g())}function O(t,i){return{origin:t,direction:i}}function zt(t,i){const n=at.get();return n.origin=t,n.direction=i,n}function It(t,i=S()){return ct(t.origin,t.direction,i)}function st(t,i,n=S()){return w(n.origin,t),f(n.direction,i,t),n}function ct(t,i,n=S()){return w(n.origin,t),w(n.direction,i),n}function Lt(t,i){const n=x(a.get(),X(a.get(),t.direction),f(a.get(),i,t.origin));return Y(n,n)}function ut(t,i,n){const o=Y(t.direction,f(n,i,t.origin));return P(n,t.origin,d(n,t.direction,o)),n}const at=new rt(()=>S());function v(t,i){const n=l(t),o=G(t[2]/n),e=Math.atan2(t[1]/n,t[0]/n);return q(i,n,o,e),i}const ft=R();function R(){return K()}const ht=F,gt=F;function V(t,i){return y(i,t)}function lt(t,i){return N(t[0],t[1],t[2],i)}function mt(t){return t}function dt(t){t[0]=t[1]=t[2]=t[3]=0}function _t(t,i){return t[0]=t[1]=t[2]=0,t[3]=i,t}function _(t){return t[3]}function Mt(t){return t}function pt(t,i,n,o){return N(t,i,n,o)}function Pt(t,i,n){return t!==n&&(n[0]=t[0],n[1]=t[1],n[2]=t[2]),n[3]=t[3]+i,n}function St(t,i,n){return t!==n&&V(t,n),n}function bt(t,i){return i}function b(t,i,n){if(i==null||!Z(t,i,p))return!1;let{t0:o,t1:e}=p;if((o<0||e<o&&e>0)&&(o=e),o<0)return!1;if(n){const{origin:r,direction:s}=i;n[0]=r[0]+s[0]*o,n[1]=r[1]+s[1]*o,n[2]=r[2]+s[2]*o}return!0}function $t(t,i,n){const o=st(i,n);if(!Z(t,o,p))return[];const{origin:e,direction:r}=o,{t0:s,t1:c}=p,u=h=>{const m=g();return nt(m,e,r,h),j(t,m,m)};return Math.abs(s-c)<it()?[u(s)]:[u(s),u(c)]}const p={t0:0,t1:0};function Z(t,i,n){const{origin:o,direction:e}=i,r=xt;r[0]=o[0]-t[0],r[1]=o[1]-t[1],r[2]=o[2]-t[2];const s=e[0]*e[0]+e[1]*e[1]+e[2]*e[2];if(s===0)return!1;const c=2*(e[0]*r[0]+e[1]*r[1]+e[2]*r[2]),u=c*c-4*s*(r[0]*r[0]+r[1]*r[1]+r[2]*r[2]-t[3]*t[3]);if(u<0)return!1;const h=Math.sqrt(u);return n.t0=(-c-h)/(2*s),n.t1=(-c+h)/(2*s),!0}const xt=g();function qt(t,i){return b(t,i,null)}function wt(t,i,n){if(b(t,i,n))return n;const o=z(t,i,a.get());return P(n,i.origin,d(a.get(),i.direction,T(i.origin,o)/l(i.direction))),n}function z(t,i,n){const o=a.get(),e=ot.get();x(o,i.origin,i.direction);const r=_(t);x(n,o,i.origin),d(n,n,1/l(n)*r);const s=I(t,i.origin),c=et(i.origin,n);return H(e,c+s,o),J(n,n,e),n}function yt(t,i,n,o){const e=_(t),r=e*e,s=i+.5*Math.PI,c=n*n+r-2*Math.cos(s)*n*e,u=Math.sqrt(c),h=c-r;if(h<=0)return .5;const m=Math.sqrt(h),k=Math.acos(m/u)-Math.asin(e/(u/Math.sin(s)));return Math.min(1,(k+.5*o)/o)}function At(t,i,n){return b(t,i,n)?n:(ut(i,t,n),j(t,n,n))}function j(t,i,n){const o=f(a.get(),i,t),e=d(a.get(),o,t[3]/l(o));return P(n,e,t)}function Rt(t,i){const n=f(a.get(),i,t),o=Q(n),e=t[3]*t[3];return Math.sqrt(Math.abs(o-e))}function I(t,i){const n=f(a.get(),i,t),o=l(n),e=_(t),r=e+Math.abs(e-o);return D(e/r)}const $=g();function L(t,i,n,o){const e=f($,i,t);switch(n){case M.X:{const r=v(e,$)[2];return q(o,-Math.sin(r),Math.cos(r),0)}case M.Y:{const r=v(e,$),s=r[1],c=r[2],u=Math.sin(s);return q(o,-u*Math.cos(c),-u*Math.sin(c),Math.cos(s))}case M.Z:return X(o,e);default:return}}function U(t,i){const n=f(A,i,t);return l(n)-t[3]}function jt(t,i,n,o){const e=U(t,i),r=L(t,i,M.Z,A),s=d(A,r,n-e);return P(o,i,s)}function Ct(t,i){const n=W(t,i),o=_(t);return n<=o*o}function Et(t,i,n=K()){const o=T(t,i),e=t[3],r=i[3];return o+r<e?(y(n,t),n):o+e<r?(y(n,i),n):(tt(n,t,i,(o+r-e)/(2*o)),n[3]=(o+e+r)/2,n)}const A=g(),Ot=R(),Ut=Object.freeze(Object.defineProperty({__proto__:null,NullSphere:ft,altitudeAt:U,angleToSilhouette:I,axisAt:L,cameraFrustumCoverage:yt,clear:dt,closestPoint:At,closestPointOnSilhouette:z,containsPoint:Ct,copy:V,create:R,distanceToSilhouette:Rt,elevate:Pt,equals:gt,exactEquals:ht,fromCenterAndRadius:lt,fromRadius:_t,fromValues:pt,getCenter:Mt,getExtent:bt,getRadius:_,intersectLine:$t,intersectRay:b,intersectRayClosestSilhouette:wt,intersectsRay:qt,projectPoint:j,setAltitudeAt:jt,setExtent:St,tmpSphere:Ot,union:Et,wrap:mt},Symbol.toStringTag,{value:"Module"}));export{V as C,mt as D,Mt as F,qt as G,pt as H,$t as U,Ut as V,rt as X,It as _,_ as a,R as b,S as d,ht as k,zt as l,Lt as p,Ct as t,j as w,lt as z};
