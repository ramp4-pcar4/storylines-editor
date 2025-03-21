import{dA as G,dU as N,ha as x,ae as H}from"./main-DG3mLaAJ.js";import{y as I,b as v,S as A,L,r as _,j as y,R as V,l as M,_ as $}from"./vec32-D9GsKZ1t-Djh33dLb.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import{n as J}from"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import{t as K}from"./mat4f64-Dn1WEGBx-C99QVUMW.js";import{e as k}from"./quatf64-C16JxGFv-BKWK1F8U.js";import{o as z}from"./vec2f64-CeODonrJ-CkkJCdRC.js";import{o as W}from"./vec4f64-hf2nxvhQ-CaAr8PTM.js";function X(t,r){return I(t,r)/v(t)}function _t(t,r){const e=I(t,r)/(v(t)*v(r));return-x(e)}function Mt(t,r,e){M(C,t),M(d,r);const c=I(C,d),i=x(c),n=A(C,C,d);return I(n,e)<0?2*Math.PI-i:i}const C=N(),d=N();let S=class E{constructor(r){this._create=r,this._items=new Array,this._itemsPtr=0}get(){return this._itemsPtr===0&&G(()=>this._reset()),this._itemsPtr>=this._items.length&&this._items.push(this._create()),this._items[this._itemsPtr++]}_reset(){const r=2*this._itemsPtr;this._items.length>r&&(this._items.length=r),this._itemsPtr=0}static createVec2f64(){return new E(z)}static createVec3f64(){return new E(N)}static createVec4f64(){return new E(W)}static createMat3f64(){return new E(J)}static createMat4f64(){return new E(K)}static createQuatf64(){return new E(k)}get test(){}};const St=S.createVec2f64(),f=S.createVec3f64(),Y=S.createVec4f64();S.createMat3f64();const mt=S.createMat4f64(),gt=S.createQuatf64();function Ot(t){const r=t[0]*t[0]+t[4]*t[4]+t[8]*t[8],e=t[1]*t[1]+t[5]*t[5]+t[9]*t[9],c=t[2]*t[2]+t[6]*t[6]+t[10]*t[10];return Math.sqrt(Math.max(r,e,c))}function Dt(t,r){const e=Math.sqrt(r[0]*r[0]+r[4]*r[4]+r[8]*r[8]),c=Math.sqrt(r[1]*r[1]+r[5]*r[5]+r[9]*r[9]),i=Math.sqrt(r[2]*r[2]+r[6]*r[6]+r[10]*r[10]);return $(t,e,c,i),t}function Z(t,r,e){Math.abs(t[0])>Math.abs(t[1])?$(r,0,1,0):$(r,1,0,0),A(e,t,r),A(r,e,t),M(e,e),M(r,r)}function Q(t=O){return[t[0],t[1],t[2],t[3]]}function lt(t=O[0],r=O[1],e=O[2],c=O[3]){return B(t,r,e,c,Y.get())}function tt(t,r){return B(r[0],r[1],r[2],r[3],t)}function Ct(t){return t}function B(t,r,e,c,i=Q()){return i[0]=t,i[1]=r,i[2]=e,i[3]=c,i}function rt(t,r,e){const c=r[0]*r[0]+r[1]*r[1]+r[2]*r[2],i=Math.abs(c-1)>1e-5&&c>1e-12?1/Math.sqrt(c):1;return e[0]=r[0]*i,e[1]=r[1]*i,e[2]=r[2]*i,e[3]=-(e[0]*t[0]+e[1]*t[1]+e[2]*t[2]),e}function et(t,r,e,c=Q()){const i=e[0]-r[0],n=e[1]-r[1],a=e[2]-r[2],o=t[0]-r[0],D=t[1]-r[1],l=t[2]-r[2],m=n*l-a*D,F=a*o-i*l,b=i*D-n*o,w=m*m+F*F+b*b,q=Math.abs(w-1)>1e-5&&w>1e-12?1/Math.sqrt(w):1;return c[0]=m*q,c[1]=F*q,c[2]=b*q,c[3]=-(c[0]*t[0]+c[1]*t[1]+c[2]*t[2]),c}function ct(t,r,e,c=0,i=Math.floor(e*(1/3)),n=Math.floor(e*(2/3))){if(e<3)return!1;r(g,c);let a=i,o=!1;for(;a<e-1&&!o;)r(T,a),a++,o=!V(g,T);if(!o)return!1;for(a=Math.max(a,n),o=!1;a<e&&!o;)r(h,a),a++,_(U,g,T),M(U,U),_(P,T,h),M(P,P),o=!V(g,h)&&!V(T,h)&&Math.abs(I(U,P))<it;return o?(et(g,T,h,t),!0):(c!==0||i!==1||n!==2)&&ct(t,r,e,0,1,2)}const it=.99619469809,g=N(),T=N(),h=N(),U=N(),P=N();function Ut(t,r,e){return r!==t&&tt(t,r),t[3]=-I(t,e),t}function Pt(t,r,e,c){return A(h,r,t),rt(e,h,c)}function At(t,r,e,c){return p(R(t,r,_(f.get(),e,r),at,c))}function $t(t,r,e){return r!=null&&p(R(t,r.origin,r.direction,nt,e))}function pt(t,r,e){return p(R(t,r.origin,r.vector,u.NONE,e))}function Rt(t,r,e){return p(R(t,r.origin,r.vector,u.CLAMP,e))}function Ft(t,r){return j(t,r)>=0}function bt(t,r,e){const c=L(f.get(),t,-t[3]),i=ot(t,_(f.get(),r,c),f.get());return y(e,i,c),e}function wt(t,r,e,c){const i=t,n=f.get(),a=f.get();Z(i,n,a);const o=_(f.get(),e,r),D=X(n,o),l=X(a,o),m=X(i,o);return $(c,D,l,m)}function ot(t,r,e){const c=L(f.get(),t,I(t,r));return _(e,r,c),e}function qt(t,r){return Math.abs(j(t,r))}function j(t,r){return I(t,r)+t[3]}var s;function p(t){return t===s.INTERSECTS_INSIDE_OUT||t===s.INTERSECTS_OUTSIDE_IN}function R(t,r,e,c,i){const n=I(t,e),a=j(t,r);if(n===0)return a>=0?s.INSIDE:s.OUTSIDE;let o=-a/n;return c&u.CLAMP&&(o=H(o,0,1)),!(c&u.INFINITE_MIN)&&o<0||!(c&u.INFINITE_MAX)&&o>1?a>=0?s.INSIDE:s.OUTSIDE:(y(i,r,L(i,e,o)),a>=0?s.INTERSECTS_INSIDE_OUT:s.INTERSECTS_OUTSIDE_IN)}(function(t){t[t.INTERSECTS_INSIDE_OUT=0]="INTERSECTS_INSIDE_OUT",t[t.INTERSECTS_OUTSIDE_IN=1]="INTERSECTS_OUTSIDE_IN",t[t.INSIDE=2]="INSIDE",t[t.OUTSIDE=3]="OUTSIDE"})(s||(s={}));const O=[0,0,1,0];var u;(function(t){t[t.NONE=0]="NONE",t[t.CLAMP=1]="CLAMP",t[t.INFINITE_MIN=4]="INFINITE_MIN",t[t.INFINITE_MAX=8]="INFINITE_MAX"})(u||(u={}));const at=u.INFINITE_MIN|u.INFINITE_MAX,nt=u.INFINITE_MAX;export{Z as $,rt as B,bt as D,et as G,B as H,Dt as I,Y as J,ct as K,$t as M,Ct as N,wt as O,qt as P,pt as S,Pt as T,At as _,lt as a,St as c,_t as e,f,Ft as g,Ut as h,gt as i,tt as j,X as l,Rt as m,mt as o,Mt as r,Ot as u,j as w,Q as y};
