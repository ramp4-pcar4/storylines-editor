import{e as z}from"./glsl-o28TenZV-B0eZUNn3.js";import{k1 as Ue,jr as Ge,k2 as He,bc as je,k3 as _e,k4 as Be,k5 as ke,k6 as Xe,cE as N,f_ as Pe,gh as Ye,ck as qe,gi as Qe,f3 as Je}from"./main-DK5A1thH.js";import{f as Ze}from"./doublePrecisionUtils-BJbYwoii-kIP-tL_t.js";import{r as H,X as k,l as D,N as F,P as L,y as Ce,A as ie,Z as Ke,_ as ee}from"./vec32-BuqRmYBM-Docn8r6P.js";import{t as R,o as E,u as Me}from"./vec3f32-BS0cezmI-B_madU1n.js";import{h as We,a5 as $e,a8 as et,b as Ne,c as tt,u as we,aP as nt,ap as ot,_ as rt,d as st,ax as at,x as lt,aQ as G,aR as U,aS as Se,aT as ze}from"./VerticalOffset.glsl-BtVaDxLq-Bbkz3TDV.js";import{w as De,A as it}from"./Indices-DkAzsiH--DFsJBoBx.js";import{Q as ct,B as ut,g as ft}from"./plane-B_adY3_o-Ns1JnzfT.js";import{M as pt}from"./sphere-Cj20syUS-P9gsXSIi.js";import{M as T}from"./orientedBoundingBox-CTsjUkMw-DzdH9G5q.js";import{V as te}from"./InterleavedLayout-DcHoXu73-35D6EIGL.js";import{T as y}from"./VertexAttribute-DFC3a3eR-BhmQtMsu.js";import{L as ht,J as dt,K as mt}from"./mat4-BFStKTjU-BMLpTkEG.js";import{n as Ot}from"./mat4f64-BaJwL7tQ-k0uMm8LY.js";import{y as gt}from"./vec42-D8CJyqHG-DnfLTeQH.js";import{i as wt,y as vt}from"./vec4f64-CjUMzAyX-DPYbdAom.js";import{n as yt}from"./projection-m8vi7Cxv-ByA_2Rez.js";import{m as xt}from"./meshVertexSpaceUtils-BwEbYR8F-D_1-zksg.js";import{s as xe}from"./projectVectorToVector-D0K_S4MR-BN7ztR9y.js";import{m as At,Q as Pt}from"./hydratedFeatures-BDT5zTGB-CvrRwYk-.js";var Te,ve;(function(e){e[e.OBJECT=0]="OBJECT",e[e.HUD=1]="HUD",e[e.TERRAIN=2]="TERRAIN",e[e.OVERLAY=3]="OVERLAY",e[e.I3S=4]="I3S",e[e.PCL=5]="PCL",e[e.LOD=6]="LOD",e[e.VOXEL=7]="VOXEL",e[e.TILES3D=8]="TILES3D"})(Te||(Te={}));let cn=class{constructor(){this.verticalOffset=0,this.selectionMode=!1,this.hud=!0,this.selectOpaqueTerrainOnly=!0,this.invisibleTerrain=!1,this.backfacesTerrain=!0,this.isFiltered=!1,this.filteredLayerUids=[],this.store=ve.ALL,this.normalRequired=!0,this.excludeLabels=!1}};(function(e){e[e.MIN=0]="MIN",e[e.MINMAX=1]="MINMAX",e[e.ALL=2]="ALL"})(ve||(ve={}));function un(e){e.code.add(z`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}`),e.code.add(z`const vec4 RGBA_TO_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgbaTofloat(vec4 rgba) {
return dot(rgba, RGBA_TO_FLOAT_FACTORS);
}`),e.code.add(z`const vec4 uninterpolatedRGBAToFloatFactors = vec4(
1.0 / 256.0,
1.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0 / 256.0
);
float uninterpolatedRGBAToFloat(vec4 rgba) {
return (dot(round(rgba * 255.0), uninterpolatedRGBAToFloatFactors) - 0.5) * 2.0;
}`)}function fn(e){return e.type==="point"}function pn(e,n){return e==null&&(e=[]),e.push(n),e}function hn(e,n){if(e==null)return null;const o=e.filter(t=>t!==n);return o.length===0?null:o}function dn(e,n,o,t,r){oe[0]=e.get(n,0),oe[1]=e.get(n,1),oe[2]=e.get(n,2),Ze(oe,X,3),o.set(r,0,X[0]),t.set(r,0,X[1]),o.set(r,1,X[2]),t.set(r,1,X[3]),o.set(r,2,X[4]),t.set(r,2,X[5])}const oe=N(),X=new Float32Array(6);var ye;(function(e){function n(s,l){const c=s[l],a=s[l+1],i=s[l+2];return Math.sqrt(c*c+a*a+i*i)}function o(s,l){const c=s[l],a=s[l+1],i=s[l+2],h=1/Math.sqrt(c*c+a*a+i*i);s[l]*=h,s[l+1]*=h,s[l+2]*=h}function t(s,l,c){s[l]*=c,s[l+1]*=c,s[l+2]*=c}function r(s,l,c,a,i,h=l){(i=i||s)[h]=s[l]+c[a],i[h+1]=s[l+1]+c[a+1],i[h+2]=s[l+2]+c[a+2]}function f(s,l,c,a,i,h=l){(i=i||s)[h]=s[l]-c[a],i[h+1]=s[l+1]-c[a+1],i[h+2]=s[l+2]-c[a+2]}e.length=n,e.normalize=o,e.scale=t,e.add=r,e.subtract=f})(ye||(ye={}));const q=ye,de=[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5]],Mt=[0,0,1,-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1],St=[0,0,1,0,1,1,0,1],Tt=[0,1,2,2,3,0,4,0,3,3,7,4,1,5,6,6,2,1,1,0,4,4,5,1,3,2,6,6,7,3,5,4,7,7,6,5],Ve=new Array(36);for(let e=0;e<6;e++)for(let n=0;n<6;n++)Ve[6*e+n]=e;const Y=new Array(36);for(let e=0;e<6;e++)Y[6*e]=0,Y[6*e+1]=1,Y[6*e+2]=2,Y[6*e+3]=2,Y[6*e+4]=3,Y[6*e+5]=0;function mn(e,n){Array.isArray(n)||(n=[n,n,n]);const o=new Array(24);for(let t=0;t<8;t++)o[3*t]=de[t][0]*n[0],o[3*t+1]=de[t][1]*n[1],o[3*t+2]=de[t][2]*n[2];return new G(e,[[y.POSITION,new T(o,Tt,3,!0)],[y.NORMAL,new T(Mt,Ve,3)],[y.UV0,new T(St,Y,2)]])}const me=[[-.5,0,-.5],[.5,0,-.5],[.5,0,.5],[-.5,0,.5],[0,-.5,0],[0,.5,0]],bt=[0,1,-1,1,1,0,0,1,1,-1,1,0,0,-1,-1,1,-1,0,0,-1,1,-1,-1,0],It=[5,1,0,5,2,1,5,3,2,5,0,3,4,0,1,4,1,2,4,2,3,4,3,0],Rt=[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];function On(e,n){Array.isArray(n)||(n=[n,n,n]);const o=new Array(18);for(let t=0;t<6;t++)o[3*t]=me[t][0]*n[0],o[3*t+1]=me[t][1]*n[1],o[3*t+2]=me[t][2]*n[2];return new G(e,[[y.POSITION,new T(o,It,3,!0)],[y.NORMAL,new T(bt,Rt,3)]])}const re=R(-.5,0,-.5),se=R(.5,0,-.5),ae=R(0,0,.5),le=R(0,.5,0),Q=E(),J=E(),K=E(),W=E(),$=E();H(Q,re,le),H(J,re,se),k(K,Q,J),D(K,K),H(Q,se,le),H(J,se,ae),k(W,Q,J),D(W,W),H(Q,ae,le),H(J,ae,re),k($,Q,J),D($,$);const Oe=[re,se,ae,le],Ct=[0,-1,0,K[0],K[1],K[2],W[0],W[1],W[2],$[0],$[1],$[2]],Nt=[0,1,2,3,1,0,3,2,1,3,0,2],zt=[0,0,0,1,1,1,2,2,2,3,3,3];function gn(e,n){Array.isArray(n)||(n=[n,n,n]);const o=new Array(12);for(let t=0;t<4;t++)o[3*t]=Oe[t][0]*n[0],o[3*t+1]=Oe[t][1]*n[1],o[3*t+2]=Oe[t][2]*n[2];return new G(e,[[y.POSITION,new T(o,Nt,3,!0)],[y.NORMAL,new T(Ct,zt,3)]])}function wn(e,n,o,t,r={uv:!0}){const f=-Math.PI,s=2*Math.PI,l=-Math.PI/2,c=Math.PI,a=Math.max(3,Math.floor(o)),i=Math.max(2,Math.floor(t)),h=(a+1)*(i+1),x=U(3*h),P=U(3*h),A=U(2*h),g=[];let p=0;for(let O=0;O<=i;O++){const I=[],u=O/i,M=l+u*c,S=Math.cos(M);for(let C=0;C<=a;C++){const j=C/a,w=f+j*s,V=Math.cos(w)*S,b=Math.sin(M),ne=-Math.sin(w)*S;x[3*p]=V*n,x[3*p+1]=b*n,x[3*p+2]=ne*n,P[3*p]=V,P[3*p+1]=b,P[3*p+2]=ne,A[2*p]=j,A[2*p+1]=u,I.push(p),++p}g.push(I)}const m=new Array;for(let O=0;O<i;O++)for(let I=0;I<a;I++){const u=g[O][I],M=g[O][I+1],S=g[O+1][I+1],C=g[O+1][I];O===0?(m.push(u),m.push(S),m.push(C)):O===i-1?(m.push(u),m.push(M),m.push(S)):(m.push(u),m.push(M),m.push(S),m.push(S),m.push(C),m.push(u))}const d=[[y.POSITION,new T(x,m,3,!0)],[y.NORMAL,new T(P,m,3,!0)]];return r.uv&&d.push([y.UV0,new T(A,m,2,!0)]),r.offset&&(d[0][0]=y.OFFSET,d.push([y.POSITION,new T(Float64Array.from(r.offset),De(m.length),3,!0)])),new G(e,d)}function vn(e,n,o,t){const r=Dt(n,o);return new G(e,r)}function Dt(e,n,o){let t,r;t=[0,-1,0,1,0,0,0,0,1,-1,0,0,0,0,-1,0,1,0],r=[0,1,2,0,2,3,0,3,4,0,4,1,1,5,2,2,5,3,3,5,4,4,5,1];for(let c=0;c<t.length;c+=3)q.scale(t,c,e/q.length(t,c));let f={};function s(c,a){c>a&&([c,a]=[a,c]);const i=c.toString()+"."+a.toString();if(f[i])return f[i];let h=t.length;return t.length+=3,q.add(t,3*c,t,3*a,t,h),q.scale(t,h,e/q.length(t,h)),h/=3,f[i]=h,h}for(let c=0;c<n;c++){const a=r.length,i=new Array(4*a);for(let h=0;h<a;h+=3){const x=r[h],P=r[h+1],A=r[h+2],g=s(x,P),p=s(P,A),m=s(A,x),d=4*h;i[d]=x,i[d+1]=g,i[d+2]=m,i[d+3]=P,i[d+4]=p,i[d+5]=g,i[d+6]=A,i[d+7]=m,i[d+8]=p,i[d+9]=g,i[d+10]=p,i[d+11]=m}r=i,f={}}const l=Se(t);for(let c=0;c<l.length;c+=3)q.normalize(l,c);return[[y.POSITION,new T(Se(t),r,3,!0)],[y.NORMAL,new T(l,r,3,!0)]]}function yn(e,n={}){const{normal:o,position:t,color:r,rotation:f,size:s,centerOffsetAndDistance:l,uvs:c,featureAttribute:a,objectAndLayerIdColor:i=null}=n,h=t?Pe(t):N(),x=o?Pe(o):Ye(0,0,1),P=r?[255*r[0],255*r[1],255*r[2],r.length>3?255*r[3]:255]:[255,255,255,255],A=s!=null&&s.length===2?s:[1,1],g=f!=null?[f]:[0],p=De(1),m=[[y.POSITION,new T(h,p,3,!0)],[y.NORMAL,new T(x,p,3,!0)],[y.COLOR,new T(P,p,4,!0)],[y.SIZE,new T(A,p,2)],[y.ROTATION,new T(g,p,1,!0)]];if(c&&m.push([y.UV0,new T(c,p,c.length)]),l!=null){const d=[l[0],l[1],l[2],l[3]];m.push([y.CENTEROFFSETANDDISTANCE,new T(d,p,4)])}if(a){const d=[a[0],a[1],a[2],a[3]];m.push([y.FEATUREATTRIBUTE,new T(d,p,4)])}return new G(e,m,null,ze.Point,i)}function Vt(e,n,o,t,r=!0,f=!0){let s=0;const l=n,c=e;let a=R(0,s,0),i=R(0,s+c,0),h=R(0,-1,0),x=R(0,1,0);t&&(s=c,i=R(0,0,0),a=R(0,s,0),h=R(0,1,0),x=R(0,-1,0));const P=[i,a],A=[h,x],g=o+2,p=Math.sqrt(c*c+l*l);if(t)for(let u=o-1;u>=0;u--){const M=u*(2*Math.PI/o),S=R(Math.cos(M)*l,s,Math.sin(M)*l);P.push(S);const C=R(c*Math.cos(M)/p,-l/p,c*Math.sin(M)/p);A.push(C)}else for(let u=0;u<o;u++){const M=u*(2*Math.PI/o),S=R(Math.cos(M)*l,s,Math.sin(M)*l);P.push(S);const C=R(c*Math.cos(M)/p,l/p,c*Math.sin(M)/p);A.push(C)}const m=new Array,d=new Array;if(r){for(let u=3;u<P.length;u++)m.push(1),m.push(u-1),m.push(u),d.push(0),d.push(0),d.push(0);m.push(P.length-1),m.push(2),m.push(1),d.push(0),d.push(0),d.push(0)}if(f){for(let u=3;u<P.length;u++)m.push(u),m.push(u-1),m.push(0),d.push(u),d.push(u-1),d.push(1);m.push(0),m.push(2),m.push(P.length-1),d.push(1),d.push(2),d.push(A.length-1)}const O=U(3*g);for(let u=0;u<g;u++)O[3*u]=P[u][0],O[3*u+1]=P[u][1],O[3*u+2]=P[u][2];const I=U(3*g);for(let u=0;u<g;u++)I[3*u]=A[u][0],I[3*u+1]=A[u][1],I[3*u+2]=A[u][2];return[[y.POSITION,new T(O,m,3,!0)],[y.NORMAL,new T(I,d,3,!0)]]}function xn(e,n,o,t,r,f=!0,s=!0){return new G(e,Vt(n,o,t,r,f,s))}function An(e,n,o,t,r,f,s){const l=r?Me(r):R(1,0,0),c=f?Me(f):R(0,0,0);s??=!0;const a=E();D(a,l);const i=E();F(i,a,Math.abs(n));const h=E();F(h,i,-.5),L(h,h,c);const x=R(0,1,0);Math.abs(1-Ce(a,x))<.2&&ie(x,0,0,1);const P=E();k(P,a,x),D(P,P),k(x,P,a);const A=2*t+(s?2:0),g=t+(s?2:0),p=U(3*A),m=U(3*g),d=U(2*A),O=new Array(3*t*(s?4:2)),I=new Array(3*t*(s?4:2));s&&(p[3*(A-2)]=h[0],p[3*(A-2)+1]=h[1],p[3*(A-2)+2]=h[2],d[2*(A-2)]=0,d[2*(A-2)+1]=0,p[3*(A-1)]=p[3*(A-2)]+i[0],p[3*(A-1)+1]=p[3*(A-2)+1]+i[1],p[3*(A-1)+2]=p[3*(A-2)+2]+i[2],d[2*(A-1)]=1,d[2*(A-1)+1]=1,m[3*(g-2)]=-a[0],m[3*(g-2)+1]=-a[1],m[3*(g-2)+2]=-a[2],m[3*(g-1)]=a[0],m[3*(g-1)+1]=a[1],m[3*(g-1)+2]=a[2]);const u=(w,V,b)=>{O[w]=V,I[w]=b};let M=0;const S=E(),C=E();for(let w=0;w<t;w++){const V=w*(2*Math.PI/t);F(S,x,Math.sin(V)),F(C,P,Math.cos(V)),L(S,S,C),m[3*w]=S[0],m[3*w+1]=S[1],m[3*w+2]=S[2],F(S,S,o),L(S,S,h),p[3*w]=S[0],p[3*w+1]=S[1],p[3*w+2]=S[2],d[2*w]=w/t,d[2*w+1]=0,p[3*(w+t)]=p[3*w]+i[0],p[3*(w+t)+1]=p[3*w+1]+i[1],p[3*(w+t)+2]=p[3*w+2]+i[2],d[2*(w+t)]=w/t,d[2*w+1]=1;const b=(w+1)%t;u(M++,w,w),u(M++,w+t,w),u(M++,b,b),u(M++,b,b),u(M++,w+t,w),u(M++,b+t,b)}if(s){for(let w=0;w<t;w++){const V=(w+1)%t;u(M++,A-2,g-2),u(M++,w,g-2),u(M++,V,g-2)}for(let w=0;w<t;w++){const V=(w+1)%t;u(M++,w+t,g-1),u(M++,A-1,g-1),u(M++,V+t,g-1)}}const j=[[y.POSITION,new T(p,O,3,!0)],[y.NORMAL,new T(m,I,3,!0)],[y.UV0,new T(d,O,2,!0)]];return new G(e,j)}function Pn(e,n,o,t,r,f){t=t||10,r=r==null||r,te(n.length>1);const s=[[0,0,0]],l=[],c=[];for(let a=0;a<t;a++){l.push([0,-a-1,-(a+1)%t-1]);const i=a/t*2*Math.PI;c.push([Math.cos(i)*o,Math.sin(i)*o])}return Lt(e,c,n,s,l,r,f)}function Lt(e,n,o,t,r,f,s=R(0,0,0)){const l=n.length,c=U(o.length*l*3+(6*t.length||0)),a=U(o.length*l*3+(t?6:0)),i=new Array,h=new Array;let x=0,P=0;const A=N(),g=N(),p=N(),m=N(),d=N(),O=N(),I=N(),u=N(),M=N(),S=N(),C=N(),j=N(),w=N(),V=ct();ie(M,0,1,0),H(g,o[1],o[0]),D(g,g),f?(L(u,o[0],s),D(p,u)):ie(p,0,0,1),be(g,p,M,M,d,p,Ie),ee(m,p),ee(j,d);for(let v=0;v<t.length;v++)F(O,d,t[v][0]),F(u,p,t[v][2]),L(O,O,u),L(O,O,o[0]),c[x++]=O[0],c[x++]=O[1],c[x++]=O[2];a[P++]=-g[0],a[P++]=-g[1],a[P++]=-g[2];for(let v=0;v<r.length;v++)i.push(r[v][0]>0?r[v][0]:-r[v][0]-1+t.length),i.push(r[v][1]>0?r[v][1]:-r[v][1]-1+t.length),i.push(r[v][2]>0?r[v][2]:-r[v][2]-1+t.length),h.push(0),h.push(0),h.push(0);let b=t.length;const ne=t.length-1;for(let v=0;v<o.length;v++){let Ae=!1;v>0&&(ee(A,g),v<o.length-1?(H(g,o[v+1],o[v]),D(g,g)):Ae=!0,L(S,A,g),D(S,S),L(C,o[v-1],m),ut(o[v],S,V),ft(V,pt(C,A),u)?(H(u,u,o[v]),D(p,u),k(d,S,p),D(d,d)):be(S,m,j,M,d,p,Ie),ee(m,p),ee(j,d)),f&&(L(u,o[v],s),D(w,u));for(let _=0;_<l;_++)if(F(O,d,n[_][0]),F(u,p,n[_][1]),L(O,O,u),D(I,O),a[P++]=I[0],a[P++]=I[1],a[P++]=I[2],L(O,O,o[v]),c[x++]=O[0],c[x++]=O[1],c[x++]=O[2],!Ae){const pe=(_+1)%l;i.push(b+_),i.push(b+l+_),i.push(b+pe),i.push(b+pe),i.push(b+l+_),i.push(b+l+pe);for(let he=0;he<6;he++){const Ee=i.length-6;h.push(i[Ee+he]-ne)}}b+=l}const Le=o[o.length-1];for(let v=0;v<t.length;v++)F(O,d,t[v][0]),F(u,p,t[v][1]),L(O,O,u),L(O,O,Le),c[x++]=O[0],c[x++]=O[1],c[x++]=O[2];const ue=P/3;a[P++]=g[0],a[P++]=g[1],a[P++]=g[2];const fe=b-l;for(let v=0;v<r.length;v++)i.push(r[v][0]>=0?b+r[v][0]:-r[v][0]-1+fe),i.push(r[v][2]>=0?b+r[v][2]:-r[v][2]-1+fe),i.push(r[v][1]>=0?b+r[v][1]:-r[v][1]-1+fe),h.push(ue),h.push(ue),h.push(ue);const Fe=[[y.POSITION,new T(c,i,3,!0)],[y.NORMAL,new T(a,h,3,!0)]];return new G(e,Fe)}function Mn(e,n,o,t){te(n.length>1,"createPolylineGeometry(): polyline needs at least 2 points"),te(n[0].length===3,"createPolylineGeometry(): malformed vertex"),te(o==null||o.length===n.length,"createPolylineGeometry: need same number of points and normals"),te(o==null||o[0].length===3,"createPolylineGeometry(): malformed normal");const r=Xe(3*n.length),f=new Array(2*(n.length-1));let s=0,l=0;for(let a=0;a<n.length;a++){for(let i=0;i<3;i++)r[s++]=n[a][i];a>0&&(f[l++]=a-1,f[l++]=a)}const c=[[y.POSITION,new T(r,f,3,!0)]];if(o){const a=U(3*o.length);let i=0;for(let h=0;h<n.length;h++)for(let x=0;x<3;x++)a[i++]=o[h][x];c.push([y.NORMAL,new T(a,f,3,!0)])}return t&&c.push([y.COLOR,new T(t,it(t.length/4),4)]),new G(e,c,null,ze.Line)}function Sn(e,n,o,t,r,f=0){const s=new Array(18),l=[[-o,f,r/2],[t,f,r/2],[0,n+f,r/2],[-o,f,-r/2],[t,f,-r/2],[0,n+f,-r/2]],c=[0,1,2,3,0,2,2,5,3,1,4,5,5,2,1,1,0,3,3,4,1,4,3,5];for(let a=0;a<6;a++)s[3*a]=l[a][0],s[3*a+1]=l[a][1],s[3*a+2]=l[a][2];return new G(e,[[y.POSITION,new T(s,c,3,!0)]])}function Tn(e,n){const o=e.getMutableAttribute(y.POSITION).data;for(let t=0;t<o.length;t+=3){const r=o[t],f=o[t+1],s=o[t+2];ie(Z,r,f,s),Ke(Z,Z,n),o[t]=Z[0],o[t+1]=Z[1],o[t+2]=Z[2]}}function bn(e,n=e){const o=e.attributes,t=o.get(y.POSITION).data,r=o.get(y.NORMAL).data;if(r){const f=n.getMutableAttribute(y.NORMAL).data;for(let s=0;s<r.length;s+=3){const l=r[s+1];f[s+1]=-r[s+2],f[s+2]=l}}if(t){const f=n.getMutableAttribute(y.POSITION).data;for(let s=0;s<t.length;s+=3){const l=t[s+1];f[s+1]=-t[s+2],f[s+2]=l}}}function ge(e,n,o,t,r){return!(Math.abs(Ce(n,e))>r)&&(k(o,e,n),D(o,o),k(t,o,e),D(t,t),!0)}function be(e,n,o,t,r,f,s){return ge(e,n,r,f,s)||ge(e,o,r,f,s)||ge(e,t,r,f,s)}const Ie=.99619469809,Z=N();var ce;(function(e){e[e.Occluded=0]="Occluded",e[e.NotOccluded=1]="NotOccluded",e[e.Both=2]="Both",e[e.COUNT=3]="COUNT"})(ce||(ce={}));function In(e,n){if(e.type==="point")return B(e,n,!1);if(At(e))switch(e.type){case"extent":return B(e.center,n,!1);case"polygon":return B(e.centroid,n,!1);case"polyline":return B(Re(e),n,!0);case"mesh":return B(xt(e.vertexSpace,e.spatialReference)??e.extent.center,n,!1);case"multipoint":return}else switch(e.type){case"extent":return B(Ft(e),n,!0);case"polygon":return B(Et(e),n,!0);case"polyline":return B(Re(e),n,!0);case"multipoint":return}}function Re(e){const n=e.paths[0];if(!n||n.length===0)return null;const o=Ue(n,Ge(n)/2);return xe(o[0],o[1],o[2],e.spatialReference)}function Ft(e){return xe(.5*(e.xmax+e.xmin),.5*(e.ymax+e.ymin),e.zmin!=null&&e.zmax!=null&&isFinite(e.zmin)&&isFinite(e.zmax)?.5*(e.zmax+e.zmin):void 0,e.spatialReference)}function Et(e){const n=e.rings[0];if(!n||n.length===0)return null;const o=He(e.rings,!!e.hasZ);return xe(o[0],o[1],o[2],e.spatialReference)}function B(e,n,o){const t=o?e:Pt(e);return n&&e?yt(e,t,n)?t:null:t}function Rn(e,n,o,t=0){if(e){n||(n=qe());const r=e;let f=.5*r.width*(o-1),s=.5*r.height*(o-1);return r.width<1e-7*r.height?f+=s/20:r.height<1e-7*r.width&&(s+=f/20),gt(n,r.xmin-f-t,r.ymin-s-t,r.xmax+f+t,r.ymax+s+t),n}return null}function Cn(e,n,o=null){const t=wt(vt);return e!=null&&(t[0]=e[0],t[1]=e[1],t[2]=e[2]),n!=null?t[3]=n:e!=null&&e.length>3&&(t[3]=e[3]),o&&(t[0]*=o,t[1]*=o,t[2]*=o,t[3]*=o),t}function Nn(e=Je,n,o,t=1){const r=new Array(3);if(n==null||o==null)r[0]=1,r[1]=1,r[2]=1;else{let f,s=0;for(let l=2;l>=0;l--){const c=e[l],a=c!=null,i=l===0&&!f&&!a,h=o[l];let x;c==="symbol-value"||i?x=h!==0?n[l]/h:1:a&&c!=="proportional"&&isFinite(c)&&(x=h!==0?c/h:1),x!=null&&(r[l]=x,f=x,s=Math.max(s,Math.abs(x)))}for(let l=2;l>=0;l--)r[l]==null?r[l]=f:r[l]===0&&(r[l]=.001*s)}for(let f=2;f>=0;f--)r[f]/=t;return Qe(r)}function Ut(e){return e.isPrimitive!=null}function zn(e){return Gt(Ut(e)?[e.width,e.depth,e.height]:e)?null:"Symbol sizes may not be negative values"}function Gt(e){const n=o=>o==null||o>=0;return Array.isArray(e)?e.every(n):n(e)}function Dn(e,n,o,t=Ot()){return e&&ht(t,t,-e/180*Math.PI),n&&dt(t,t,n/180*Math.PI),o&&mt(t,t,o/180*Math.PI),t}function Vn(e,n,o){if(o.minDemResolution!=null)return o.minDemResolution;const t=je(n),r=_e(e)*t,f=Be(e)*t,s=ke(e)*(n.isGeographic?1:t);return r===0&&f===0&&s===0?o.minDemResolutionForPoints:.01*Math.max(r,f,s)}const Ht=.5;function Ln(e,n){e.include(We),e.attributes.add(y.POSITION,"vec3"),e.attributes.add(y.NORMAL,"vec3"),e.attributes.add(y.CENTEROFFSETANDDISTANCE,"vec4");const o=e.vertex;$e(o,n),et(o,n),o.uniforms.add(new Ne("viewport",t=>t.camera.fullViewport),new tt("polygonOffset",t=>t.shaderPolygonOffset),new we("cameraGroundRelative",t=>t.camera.aboveGround?1:-1)),n.hasVerticalOffset&&nt(o),o.constants.add("smallOffsetAngle","float",.984807753012208),o.code.add(z`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),o.code.add(z`
    float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
      float pointGroundSign = ${n.terrainDepthTest?z.float(0):z`sign(pointGroundDistance)`};
      if (pointGroundSign == 0.0) {
        pointGroundSign = cameraGroundRelative;
      }

      // cameraGroundRelative is -1 if camera is below ground, 1 if above ground
      // groundRelative is 1 if both camera and symbol are on the same side of the ground, -1 otherwise
      float groundRelative = cameraGroundRelative * pointGroundSign;

      // view angle dependent part of polygon offset emulation: we take the absolute value because the sign that is
      // dropped is instead introduced using the ground-relative position of the symbol and the camera
      if (polygonOffset > .0) {
        float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
        float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
        float factor = (1.0 - tanAlpha / viewport[2]);

        // same side of the terrain
        if (groundRelative > 0.0) {
          posView *= factor;
        }
        // opposite sides of the terrain
        else {
          posView /= factor;
        }
      }

      return groundRelative;
    }
  `),n.draped&&!n.hasVerticalOffset||ot(o),n.draped||(o.uniforms.add(new we("perDistancePixelRatio",t=>Math.tan(t.camera.fovY/2)/(t.camera.fullViewport[2]/2))),o.code.add(z`
    void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
      float distanceToCamera = length(posView);

      // Compute offset in world units for a half pixel shift
      float pixelOffset = distanceToCamera * perDistancePixelRatio * ${z.float(Ht)};

      // Apply offset along normal in the direction away from the ground surface
      vec3 modelOffset = normalModel * cameraGroundRelative * pixelOffset;

      // Apply the same offset also on the view space position
      vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

      posModel += modelOffset;
      posView += viewOffset;
    }
  `)),n.screenCenterOffsetUnitsEnabled&&rt(o),n.hasScreenSizePerspective&&st(o),o.code.add(z`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      vec3 centerOffset = centerOffsetAndDistance.xyz;
      float pointGroundDistance = centerOffsetAndDistance.w;

      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${n.draped?"":"applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);"}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${n.hasScreenSizePerspective&&(n.hasVerticalOffset||n.screenCenterOffsetUnitsEnabled)?"vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);":""}

      ${n.hasVerticalOffset?n.hasScreenSizePerspective?"float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);":"float verticalOffsetScreenHeight = verticalOffset.x;":""}

      ${n.hasVerticalOffset?z`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${n.screenCenterOffsetUnitsEnabled?"":z`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${n.screenCenterOffsetUnitsEnabled?n.hasScreenSizePerspective?"float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);":"float centerOffsetY = centerOffset.y;":""}

      ${n.screenCenterOffsetUnitsEnabled?"posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;":""}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}function jt(e){e.uniforms.add(new at("alignPixelEnabled",n=>n.alignPixelEnabled)),e.code.add(z`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),e.code.add(z`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}function Fn(e){e.vertex.uniforms.add(new we("renderTransparentlyOccludedHUD",n=>n.hudRenderStyle===ce.Occluded?1:n.hudRenderStyle===ce.NotOccluded?0:.75),new Ne("viewport",n=>n.camera.fullViewport),new lt("hudVisibilityTexture",n=>n.hudVisibility?.getTexture())),e.vertex.include(jt),e.vertex.code.add(z`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}export{On as $,un as C,Vt as D,Gt as E,jt as G,yn as J,Pn as K,fn as N,Fn as O,be as P,xn as Q,cn as R,Ht as U,pn as V,An as W,vn as Y,In as a,Lt as b,ce as c,hn as d,Mn as e,Vn as f,Cn as g,mn as h,Dn as i,wn as k,Rn as l,Ln as m,Tn as n,bn as o,zn as p,gn as q,ve as s,Sn as t,Nn as u,Te as w,dn as z};
