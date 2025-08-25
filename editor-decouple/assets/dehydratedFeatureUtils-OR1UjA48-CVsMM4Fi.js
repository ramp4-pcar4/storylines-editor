import{e as V}from"./glsl-Z5uYj8ka-BRgh2Cgo.js";import{k6 as De,jC as Fe,k7 as Ue,az as $e,k8 as Ge,k9 as Le,ka as je,kb as Ee,du as N,b9 as He,gD as xe,gL as _e,k3 as ke,fk as Be}from"./main-Dt6SBPaS.js";import{U as Xe,K as Ye,L as qe}from"./mat4-OOmHNWi7-C1MkrqH6.js";import{n as Ze}from"./mat4f64-xsZDPPj0-Dq35B4BL.js";import{y as Je}from"./vec42-D8CJyqHG-DnfLTeQH.js";import{c as Ke,I as Qe}from"./vec4f64-DD-nkcCV-CSNWKRqG.js";import{n as We}from"./projectionUtils-B-CplN3q-B9fSc15M.js";import{m as et}from"./meshVertexSpaceUtils-CCr86FVF-CotKMy_b.js";import{s as ge}from"./projectVectorToVector-DcyiGOWJ-PIqWYlVS.js";import{m as tt,j as nt}from"./hydratedFeatures-oobA80ei-kATXO33R.js";import{r as j,S as k,l as z,A as ae,Y as ot,L as U,P as F,y as be,_ as W}from"./vec32-Cj8pVsU0-Di-lTX65.js";import{r as C,o as $,u as ye}from"./vec3f32-GX_cKsFD-UJPpzdNc.js";import{n as rt,J as st,i as at,y as Te,O as lt,a as we,l as it,e as ct,t as ut,b as ft,G as pt,c as ht,j as G,M as L,L as Re,X as Ae}from"./OutputColorHighlightOID.glsl-BdXTjs7_-CkQBXzCM.js";import{s as Ce,w as dt}from"./Indices-BuIC5D20-BHWboudN.js";import{y as mt,z as wt,o as vt}from"./plane-Cf3Koz3c-BWlKi-Yp.js";import{_ as gt}from"./sphere-zPMQWhGG-D-6OSYGF.js";import{M as b}from"./orientedBoundingBox-CSC169JG-BVzNfhnF.js";import{c as ee}from"./BufferView-wDxx79o3-C2rO7SyV.js";import{T as x}from"./VertexAttribute-hUz6pozM-Bx3V-z96.js";function nn(t){t.code.add(V`const float MAX_RGBA_FLOAT =
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
}`),t.code.add(V`const vec4 RGBA_TO_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgbaTofloat(vec4 rgba) {
return dot(rgba, RGBA_TO_FLOAT_FACTORS);
}`),t.code.add(V`const vec4 uninterpolatedRGBAToFloatFactors = vec4(
1.0 / 256.0,
1.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0 / 256.0
);
float uninterpolatedRGBAToFloat(vec4 rgba) {
return (dot(round(rgba * 255.0), uninterpolatedRGBAToFloatFactors) - 0.5) * 2.0;
}`)}function on(t,n){if(t.type==="point")return _(t,n,!1);if(tt(t))switch(t.type){case"extent":return _(t.center,n,!1);case"polygon":return _(t.centroid,n,!1);case"polyline":return _(Pe(t),n,!0);case"mesh":return _(et(t.vertexSpace,t.spatialReference)??t.extent.center,n,!1);case"multipoint":return}else switch(t.type){case"extent":return _(Ot(t),n,!0);case"polygon":return _(xt(t),n,!0);case"polyline":return _(Pe(t),n,!0);case"multipoint":return}}function Pe(t){const n=t.paths[0];if(!n||n.length===0)return null;const o=De(n,Fe(n)/2);return ge(o[0],o[1],o[2],t.spatialReference)}function Ot(t){return ge(.5*(t.xmax+t.xmin),.5*(t.ymax+t.ymin),t.zmin!=null&&t.zmax!=null&&isFinite(t.zmin)&&isFinite(t.zmax)?.5*(t.zmax+t.zmin):void 0,t.spatialReference)}function xt(t){const n=t.rings[0];if(!n||n.length===0)return null;const o=Ue(t.rings,!!t.hasZ);return ge(o[0],o[1],o[2],t.spatialReference)}function _(t,n,o){const e=o?t:nt(t);return n&&t?We(t,e,n)?e:null:e}function rn(t,n,o,e=0){if(t){n||(n=He());const r=t;let f=.5*r.width*(o-1),s=.5*r.height*(o-1);return r.width<1e-7*r.height?f+=s/20:r.height<1e-7*r.width&&(s+=f/20),Je(n,r.xmin-f-e,r.ymin-s-e,r.xmax+f+e,r.ymax+s+e),n}return null}function sn(t,n,o=null){const e=Ke(Qe);return t!=null&&(e[0]=t[0],e[1]=t[1],e[2]=t[2]),n!=null?e[3]=n:t!=null&&t.length>3&&(e[3]=t[3]),o&&(e[0]*=o,e[1]*=o,e[2]*=o,e[3]*=o),e}function an(t=Be,n,o,e=1){const r=new Array(3);if(n==null||o==null)r[0]=1,r[1]=1,r[2]=1;else{let f,s=0;for(let a=2;a>=0;a--){const i=t[a],l=i!=null,c=a===0&&!f&&!l,p=o[a];let y;i==="symbol-value"||c?y=p!==0?n[a]/p:1:l&&i!=="proportional"&&isFinite(i)&&(y=p!==0?i/p:1),y!=null&&(r[a]=y,f=y,s=Math.max(s,Math.abs(y)))}for(let a=2;a>=0;a--)r[a]==null?r[a]=f:r[a]===0&&(r[a]=.001*s)}for(let f=2;f>=0;f--)r[f]/=e;return ke(r)}function yt(t){return t.isPrimitive!=null}function ln(t){return At(yt(t)?[t.width,t.depth,t.height]:t)?null:"Symbol sizes may not be negative values"}function At(t){const n=o=>o==null||o>=0;return Array.isArray(t)?t.every(n):n(t)}function cn(t,n,o,e=Ze()){return t&&Xe(e,e,-t/180*Math.PI),n&&Ye(e,e,n/180*Math.PI),o&&qe(e,e,o/180*Math.PI),e}function un(t,n,o){if(o.minDemResolution!=null)return o.minDemResolution;const e=$e(n),r=Ge(t)*e,f=Le(t)*e,s=je(t)*(n.isGeographic?1:e);return r===0&&f===0&&s===0?o.minDemResolutionForPoints:.01*Math.max(r,f,s)}var ve;(function(t){function n(s,a){const i=s[a],l=s[a+1],c=s[a+2];return Math.sqrt(i*i+l*l+c*c)}function o(s,a){const i=s[a],l=s[a+1],c=s[a+2],p=1/Math.sqrt(i*i+l*l+c*c);s[a]*=p,s[a+1]*=p,s[a+2]*=p}function e(s,a,i){s[a]*=i,s[a+1]*=i,s[a+2]*=i}function r(s,a,i,l,c,p=a){(c=c||s)[p]=s[a]+i[l],c[p+1]=s[a+1]+i[l+1],c[p+2]=s[a+2]+i[l+2]}function f(s,a,i,l,c,p=a){(c=c||s)[p]=s[a]-i[l],c[p+1]=s[a+1]-i[l+1],c[p+2]=s[a+2]-i[l+2]}t.length=n,t.normalize=o,t.scale=e,t.add=r,t.subtract=f})(ve||(ve={}));const X=ve,pe=[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5]],Pt=[0,0,1,-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1],Mt=[0,0,1,0,1,1,0,1],St=[0,1,2,2,3,0,4,0,3,3,7,4,1,5,6,6,2,1,1,0,4,4,5,1,3,2,6,6,7,3,5,4,7,7,6,5],Ie=new Array(36);for(let t=0;t<6;t++)for(let n=0;n<6;n++)Ie[6*t+n]=t;const B=new Array(36);for(let t=0;t<6;t++)B[6*t]=0,B[6*t+1]=1,B[6*t+2]=2,B[6*t+3]=2,B[6*t+4]=3,B[6*t+5]=0;function fn(t,n){Array.isArray(n)||(n=[n,n,n]);const o=new Array(24);for(let e=0;e<8;e++)o[3*e]=pe[e][0]*n[0],o[3*e+1]=pe[e][1]*n[1],o[3*e+2]=pe[e][2]*n[2];return new L(t,[[x.POSITION,new b(o,St,3,!0)],[x.NORMAL,new b(Pt,Ie,3)],[x.UV0,new b(Mt,B,2)]])}const he=[[-.5,0,-.5],[.5,0,-.5],[.5,0,.5],[-.5,0,.5],[0,-.5,0],[0,.5,0]],bt=[0,1,-1,1,1,0,0,1,1,-1,1,0,0,-1,-1,1,-1,0,0,-1,1,-1,-1,0],Tt=[5,1,0,5,2,1,5,3,2,5,0,3,4,0,1,4,1,2,4,2,3,4,3,0],Rt=[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];function pn(t,n){Array.isArray(n)||(n=[n,n,n]);const o=new Array(18);for(let e=0;e<6;e++)o[3*e]=he[e][0]*n[0],o[3*e+1]=he[e][1]*n[1],o[3*e+2]=he[e][2]*n[2];return new L(t,[[x.POSITION,new b(o,Tt,3,!0)],[x.NORMAL,new b(bt,Rt,3)]])}const ne=C(-.5,0,-.5),oe=C(.5,0,-.5),re=C(0,0,.5),se=C(0,.5,0),Y=$(),q=$(),J=$(),K=$(),Q=$();j(Y,ne,se),j(q,ne,oe),k(J,Y,q),z(J,J),j(Y,oe,se),j(q,oe,re),k(K,Y,q),z(K,K),j(Y,re,se),j(q,re,ne),k(Q,Y,q),z(Q,Q);const de=[ne,oe,re,se],Ct=[0,-1,0,J[0],J[1],J[2],K[0],K[1],K[2],Q[0],Q[1],Q[2]],It=[0,1,2,3,1,0,3,2,1,3,0,2],Nt=[0,0,0,1,1,1,2,2,2,3,3,3];function hn(t,n){Array.isArray(n)||(n=[n,n,n]);const o=new Array(12);for(let e=0;e<4;e++)o[3*e]=de[e][0]*n[0],o[3*e+1]=de[e][1]*n[1],o[3*e+2]=de[e][2]*n[2];return new L(t,[[x.POSITION,new b(o,It,3,!0)],[x.NORMAL,new b(Ct,Nt,3)]])}function dn(t,n,o,e,r={uv:!0}){const f=-Math.PI,s=2*Math.PI,a=-Math.PI/2,i=Math.PI,l=Math.max(3,Math.floor(o)),c=Math.max(2,Math.floor(e)),p=(l+1)*(c+1),y=G(3*p),P=G(3*p),A=G(2*p),m=[];let h=0;for(let v=0;v<=c;v++){const R=[],u=v/c,M=a+u*i,S=Math.cos(M);for(let I=0;I<=l;I++){const E=I/l,g=f+E*s,D=Math.cos(g)*S,T=Math.sin(M),te=-Math.sin(g)*S;y[3*h]=D*n,y[3*h+1]=T*n,y[3*h+2]=te*n,P[3*h]=D,P[3*h+1]=T,P[3*h+2]=te,A[2*h]=E,A[2*h+1]=u,R.push(h),++h}m.push(R)}const d=new Array;for(let v=0;v<c;v++)for(let R=0;R<l;R++){const u=m[v][R],M=m[v][R+1],S=m[v+1][R+1],I=m[v+1][R];v===0?(d.push(u),d.push(S),d.push(I)):v===c-1?(d.push(u),d.push(M),d.push(S)):(d.push(u),d.push(M),d.push(S),d.push(S),d.push(I),d.push(u))}const w=[[x.POSITION,new b(y,d,3,!0)],[x.NORMAL,new b(P,d,3,!0)]];return r.uv&&w.push([x.UV0,new b(A,d,2,!0)]),r.offset&&(w[0][0]=x.OFFSET,w.push([x.POSITION,new b(Float64Array.from(r.offset),Ce(d.length),3,!0)])),new L(t,w)}function mn(t,n,o,e){const r=Vt(n,o);return new L(t,r)}function Vt(t,n,o){let e,r;e=[0,-1,0,1,0,0,0,0,1,-1,0,0,0,0,-1,0,1,0],r=[0,1,2,0,2,3,0,3,4,0,4,1,1,5,2,2,5,3,3,5,4,4,5,1];for(let i=0;i<e.length;i+=3)X.scale(e,i,t/X.length(e,i));let f={};function s(i,l){i>l&&([i,l]=[l,i]);const c=i.toString()+"."+l.toString();if(f[c])return f[c];let p=e.length;return e.length+=3,X.add(e,3*i,e,3*l,e,p),X.scale(e,p,t/X.length(e,p)),p/=3,f[c]=p,p}for(let i=0;i<n;i++){const l=r.length,c=new Array(4*l);for(let p=0;p<l;p+=3){const y=r[p],P=r[p+1],A=r[p+2],m=s(y,P),h=s(P,A),d=s(A,y),w=4*p;c[w]=y,c[w+1]=m,c[w+2]=d,c[w+3]=P,c[w+4]=h,c[w+5]=m,c[w+6]=A,c[w+7]=d,c[w+8]=h,c[w+9]=m,c[w+10]=h,c[w+11]=d}r=c,f={}}const a=Ae(e);for(let i=0;i<a.length;i+=3)X.normalize(a,i);return[[x.POSITION,new b(Ae(e),r,3,!0)],[x.NORMAL,new b(a,r,3,!0)]]}function wn(t,{normal:n,position:o,color:e,rotation:r,size:f,centerOffsetAndDistance:s,uvi:a,featureAttribute:i,objectAndLayerIdColor:l=null}={}){const c=o?xe(o):N(),p=n?xe(n):_e(0,0,1),y=e?[255*e[0],255*e[1],255*e[2],e.length>3?255*e[3]:255]:[255,255,255,255],P=f!=null&&f.length===2?f:[1,1],A=r!=null?[r]:[0],m=Ce(1),h=[[x.POSITION,new b(c,m,3,!0)],[x.NORMAL,new b(p,m,3,!0)],[x.COLOR,new b(y,m,4,!0)],[x.SIZE,new b(P,m,2)],[x.ROTATION,new b(A,m,1,!0)]];if(a&&h.push([x.UVI,new b(a,m,a.length)]),s!=null){const d=[s[0],s[1],s[2],s[3]];h.push([x.CENTEROFFSETANDDISTANCE,new b(d,m,4)])}if(i){const d=[i[0],i[1],i[2],i[3]];h.push([x.FEATUREATTRIBUTE,new b(d,m,4)])}return new L(t,h,null,Re.Point,l)}function zt(t,n,o,e,r=!0,f=!0){let s=0;const a=n,i=t;let l=C(0,s,0),c=C(0,s+i,0),p=C(0,-1,0),y=C(0,1,0);e&&(s=i,c=C(0,0,0),l=C(0,s,0),p=C(0,1,0),y=C(0,-1,0));const P=[c,l],A=[p,y],m=o+2,h=Math.sqrt(i*i+a*a);if(e)for(let u=o-1;u>=0;u--){const M=u*(2*Math.PI/o),S=C(Math.cos(M)*a,s,Math.sin(M)*a);P.push(S);const I=C(i*Math.cos(M)/h,-a/h,i*Math.sin(M)/h);A.push(I)}else for(let u=0;u<o;u++){const M=u*(2*Math.PI/o),S=C(Math.cos(M)*a,s,Math.sin(M)*a);P.push(S);const I=C(i*Math.cos(M)/h,a/h,i*Math.sin(M)/h);A.push(I)}const d=new Array,w=new Array;if(r){for(let u=3;u<P.length;u++)d.push(1),d.push(u-1),d.push(u),w.push(0),w.push(0),w.push(0);d.push(P.length-1),d.push(2),d.push(1),w.push(0),w.push(0),w.push(0)}if(f){for(let u=3;u<P.length;u++)d.push(u),d.push(u-1),d.push(0),w.push(u),w.push(u-1),w.push(1);d.push(0),d.push(2),d.push(P.length-1),w.push(1),w.push(2),w.push(A.length-1)}const v=G(3*m);for(let u=0;u<m;u++)v[3*u]=P[u][0],v[3*u+1]=P[u][1],v[3*u+2]=P[u][2];const R=G(3*m);for(let u=0;u<m;u++)R[3*u]=A[u][0],R[3*u+1]=A[u][1],R[3*u+2]=A[u][2];return[[x.POSITION,new b(v,d,3,!0)],[x.NORMAL,new b(R,w,3,!0)]]}function vn(t,n,o,e,r,f=!0,s=!0){return new L(t,zt(n,o,e,r,f,s))}function gn(t,n,o,e,r,f,s){const a=r?ye(r):C(1,0,0),i=f?ye(f):C(0,0,0);s??=!0;const l=$();z(l,a);const c=$();U(c,l,Math.abs(n));const p=$();U(p,c,-.5),F(p,p,i);const y=C(0,1,0);Math.abs(1-be(l,y))<.2&&ae(y,0,0,1);const P=$();k(P,l,y),z(P,P),k(y,P,l);const A=2*e+(s?2:0),m=e+(s?2:0),h=G(3*A),d=G(3*m),w=G(2*A),v=new Array(3*e*(s?4:2)),R=new Array(3*e*(s?4:2));s&&(h[3*(A-2)]=p[0],h[3*(A-2)+1]=p[1],h[3*(A-2)+2]=p[2],w[2*(A-2)]=0,w[2*(A-2)+1]=0,h[3*(A-1)]=h[3*(A-2)]+c[0],h[3*(A-1)+1]=h[3*(A-2)+1]+c[1],h[3*(A-1)+2]=h[3*(A-2)+2]+c[2],w[2*(A-1)]=1,w[2*(A-1)+1]=1,d[3*(m-2)]=-l[0],d[3*(m-2)+1]=-l[1],d[3*(m-2)+2]=-l[2],d[3*(m-1)]=l[0],d[3*(m-1)+1]=l[1],d[3*(m-1)+2]=l[2]);const u=(g,D,T)=>{v[g]=D,R[g]=T};let M=0;const S=$(),I=$();for(let g=0;g<e;g++){const D=g*(2*Math.PI/e);U(S,y,Math.sin(D)),U(I,P,Math.cos(D)),F(S,S,I),d[3*g]=S[0],d[3*g+1]=S[1],d[3*g+2]=S[2],U(S,S,o),F(S,S,p),h[3*g]=S[0],h[3*g+1]=S[1],h[3*g+2]=S[2],w[2*g]=g/e,w[2*g+1]=0,h[3*(g+e)]=h[3*g]+c[0],h[3*(g+e)+1]=h[3*g+1]+c[1],h[3*(g+e)+2]=h[3*g+2]+c[2],w[2*(g+e)]=g/e,w[2*g+1]=1;const T=(g+1)%e;u(M++,g,g),u(M++,g+e,g),u(M++,T,T),u(M++,T,T),u(M++,g+e,g),u(M++,T+e,T)}if(s){for(let g=0;g<e;g++){const D=(g+1)%e;u(M++,A-2,m-2),u(M++,g,m-2),u(M++,D,m-2)}for(let g=0;g<e;g++){const D=(g+1)%e;u(M++,g+e,m-1),u(M++,A-1,m-1),u(M++,D+e,m-1)}}const E=[[x.POSITION,new b(h,v,3,!0)],[x.NORMAL,new b(d,R,3,!0)],[x.UV0,new b(w,v,2,!0)]];return new L(t,E)}function On(t,n,o,e,r,f){e=e||10,r=r==null||r,ee(n.length>1);const s=[[0,0,0]],a=[],i=[];for(let l=0;l<e;l++){a.push([0,-l-1,-(l+1)%e-1]);const c=l/e*2*Math.PI;i.push([Math.cos(c)*o,Math.sin(c)*o])}return Dt(t,i,n,s,a,r,f)}function Dt(t,n,o,e,r,f,s=C(0,0,0)){const a=n.length,i=G(o.length*a*3+(6*e.length||0)),l=G(o.length*a*3+(e?6:0)),c=new Array,p=new Array;let y=0,P=0;const A=N(),m=N(),h=N(),d=N(),w=N(),v=N(),R=N(),u=N(),M=N(),S=N(),I=N(),E=N(),g=N(),D=mt();ae(M,0,1,0),j(m,o[1],o[0]),z(m,m),f?(F(u,o[0],s),z(h,u)):ae(h,0,0,1),Me(m,h,M,M,w,h,Se),W(d,h),W(E,w);for(let O=0;O<e.length;O++)U(v,w,e[O][0]),U(u,h,e[O][2]),F(v,v,u),F(v,v,o[0]),i[y++]=v[0],i[y++]=v[1],i[y++]=v[2];l[P++]=-m[0],l[P++]=-m[1],l[P++]=-m[2];for(let O=0;O<r.length;O++)c.push(r[O][0]>0?r[O][0]:-r[O][0]-1+e.length),c.push(r[O][1]>0?r[O][1]:-r[O][1]-1+e.length),c.push(r[O][2]>0?r[O][2]:-r[O][2]-1+e.length),p.push(0),p.push(0),p.push(0);let T=e.length;const te=e.length-1;for(let O=0;O<o.length;O++){let Oe=!1;O>0&&(W(A,m),O<o.length-1?(j(m,o[O+1],o[O]),z(m,m)):Oe=!0,F(S,A,m),z(S,S),F(I,o[O-1],d),wt(o[O],S,D),vt(D,gt(I,A),u)?(j(u,u,o[O]),z(h,u),k(w,S,h),z(w,w)):Me(S,d,E,M,w,h,Se),W(d,h),W(E,w)),f&&(F(u,o[O],s),z(g,u));for(let H=0;H<a;H++)if(U(v,w,n[H][0]),U(u,h,n[H][1]),F(v,v,u),z(R,v),l[P++]=R[0],l[P++]=R[1],l[P++]=R[2],F(v,v,o[O]),i[y++]=v[0],i[y++]=v[1],i[y++]=v[2],!Oe){const ue=(H+1)%a;c.push(T+H),c.push(T+a+H),c.push(T+ue),c.push(T+ue),c.push(T+a+H),c.push(T+a+ue);for(let fe=0;fe<6;fe++){const ze=c.length-6;p.push(c[ze+fe]-te)}}T+=a}const Ne=o[o.length-1];for(let O=0;O<e.length;O++)U(v,w,e[O][0]),U(u,h,e[O][1]),F(v,v,u),F(v,v,Ne),i[y++]=v[0],i[y++]=v[1],i[y++]=v[2];const ie=P/3;l[P++]=m[0],l[P++]=m[1],l[P++]=m[2];const ce=T-a;for(let O=0;O<r.length;O++)c.push(r[O][0]>=0?T+r[O][0]:-r[O][0]-1+ce),c.push(r[O][2]>=0?T+r[O][2]:-r[O][2]-1+ce),c.push(r[O][1]>=0?T+r[O][1]:-r[O][1]-1+ce),p.push(ie),p.push(ie),p.push(ie);const Ve=[[x.POSITION,new b(i,c,3,!0)],[x.NORMAL,new b(l,p,3,!0)]];return new L(t,Ve)}function xn(t,n,o,e){ee(n.length>1,"createPolylineGeometry(): polyline needs at least 2 points"),ee(n[0].length===3,"createPolylineGeometry(): malformed vertex"),ee(o==null||o.length===n.length,"createPolylineGeometry: need same number of points and normals"),ee(o==null||o[0].length===3,"createPolylineGeometry(): malformed normal");const r=Ee(3*n.length),f=new Array(2*(n.length-1));let s=0,a=0;for(let l=0;l<n.length;l++){for(let c=0;c<3;c++)r[s++]=n[l][c];l>0&&(f[a++]=l-1,f[a++]=l)}const i=[[x.POSITION,new b(r,f,3,!0)]];if(o){const l=G(3*o.length);let c=0;for(let p=0;p<n.length;p++)for(let y=0;y<3;y++)l[c++]=o[p][y];i.push([x.NORMAL,new b(l,f,3,!0)])}return e&&i.push([x.COLOR,new b(e,dt(e.length/4),4)]),new L(t,i,null,Re.Line)}function yn(t,n,o,e,r,f=0){const s=new Array(18),a=[[-o,f,r/2],[e,f,r/2],[0,n+f,r/2],[-o,f,-r/2],[e,f,-r/2],[0,n+f,-r/2]],i=[0,1,2,3,0,2,2,5,3,1,4,5,5,2,1,1,0,3,3,4,1,4,3,5];for(let l=0;l<6;l++)s[3*l]=a[l][0],s[3*l+1]=a[l][1],s[3*l+2]=a[l][2];return new L(t,[[x.POSITION,new b(s,i,3,!0)]])}function An(t,n){const o=t.getMutableAttribute(x.POSITION).data;for(let e=0;e<o.length;e+=3){const r=o[e],f=o[e+1],s=o[e+2];ae(Z,r,f,s),ot(Z,Z,n),o[e]=Z[0],o[e+1]=Z[1],o[e+2]=Z[2]}}function Pn(t,n=t){const o=t.attributes,e=o.get(x.POSITION).data,r=o.get(x.NORMAL).data;if(r){const f=n.getMutableAttribute(x.NORMAL).data;for(let s=0;s<r.length;s+=3){const a=r[s+1];f[s+1]=-r[s+2],f[s+2]=a}}if(e){const f=n.getMutableAttribute(x.POSITION).data;for(let s=0;s<e.length;s+=3){const a=e[s+1];f[s+1]=-e[s+2],f[s+2]=a}}}function me(t,n,o,e,r){return!(Math.abs(be(n,t))>r)&&(k(o,t,n),z(o,o),k(e,o,t),z(e,e),!0)}function Me(t,n,o,e,r,f,s){return me(t,n,r,f,s)||me(t,o,r,f,s)||me(t,e,r,f,s)}const Se=.99619469809,Z=N(),Ft=.5;function Mn(t,n){t.include(rt),t.attributes.add(x.POSITION,"vec3"),t.attributes.add(x.NORMAL,"vec3"),t.attributes.add(x.CENTEROFFSETANDDISTANCE,"vec4");const o=t.vertex;st(o,n),at(o,n),o.uniforms.add(new Te("viewport",e=>e.camera.fullViewport),new lt("polygonOffset",e=>e.shaderPolygonOffset),new we("cameraGroundRelative",e=>e.camera.aboveGround?1:-1)),n.hasVerticalOffset&&it(o),o.code.add(V`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),o.code.add(V`
    float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
      float pointGroundSign = ${n.terrainDepthTest?V.float(0):V`sign(pointGroundDistance)`};
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
  `),n.draped&&!n.hasVerticalOffset||ct(o),n.draped||(o.uniforms.add(new we("perDistancePixelRatio",e=>Math.tan(e.camera.fovY/2)/(e.camera.fullViewport[2]/2))),o.code.add(V`
    void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
      float distanceToCamera = length(posView);

      // Compute offset in world units for a half pixel shift
      float pixelOffset = distanceToCamera * perDistancePixelRatio * ${V.float(Ft)};

      // Apply offset along normal in the direction away from the ground surface
      vec3 modelOffset = normalModel * cameraGroundRelative * pixelOffset;

      // Apply the same offset also on the view space position
      vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

      posModel += modelOffset;
      posView += viewOffset;
    }
  `)),n.screenCenterOffsetUnitsEnabled&&ut(o),n.hasScreenSizePerspective&&ft(o),o.code.add(V`
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

      ${n.hasVerticalOffset?V`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${n.screenCenterOffsetUnitsEnabled?"":V`
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
  `)}function Ut(t){t.uniforms.add(new pt("alignPixelEnabled",n=>n.alignPixelEnabled)),t.code.add(V`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),t.code.add(V`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}var le;(function(t){t[t.Occluded=0]="Occluded",t[t.NotOccluded=1]="NotOccluded",t[t.Both=2]="Both",t[t.COUNT=3]="COUNT"})(le||(le={}));function Sn(t){t.vertex.uniforms.add(new we("renderTransparentlyOccludedHUD",n=>n.hudRenderStyle===le.Occluded?1:n.hudRenderStyle===le.NotOccluded?0:.75),new Te("viewport",n=>n.camera.fullViewport),new ht("hudVisibilityTexture",n=>n.hudVisibility?.getTexture())),t.vertex.include(Ut),t.vertex.code.add(V`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}function bn(t){return t.type==="point"}export{sn as C,zt as D,fn as E,Ft as F,rn as I,wn as J,vn as K,an as N,Me as O,gn as Q,nn as S,on as T,cn as V,On as W,hn as X,dn as Y,mn as Z,pn as _,Vt as a,Mn as b,le as c,un as d,xn as e,ln as f,At as g,Ut as j,An as n,Pn as o,bn as r,Sn as s,yn as t,Dt as z};
