import{v as i,S as e,i as w,e as I,dU as S,il as U,hZ as q,i8 as l,B as M,je as z,jf as B,i1 as E,bj as Q}from"./main-YbCtmqIL.js";import{o as R,z as T,u as V,s as Z}from"./mat4-DX7gBViE-BSzsvZjb.js";import{t as x}from"./mat4f64-Dn1WEGBx-C99QVUMW.js";import{A as p,j as N,_}from"./quat-BODLR7mS-SA-LcOzO.js";import{e as m}from"./quatf64-C16JxGFv-BKWK1F8U.js";import{A as k}from"./vec32-D9GsKZ1t-yxjREqVu.js";function s(t=d){return[t[0],t[1],t[2],t[3]]}function c(t,o,r=s()){return k(r,t),r[3]=o,r}function L(t,o=s()){const r=Z(a,t);return $(o,M(N(o,r))),o}function g(t,o,r=s()){return p(a,t,h(t)),p(j,o,h(o)),_(a,j,a),$(r,M(N(r,a)))}function O(t,o,r,A=s()){return c(z,t,u),c(B,o,y),c(E,r,b),g(u,y,u),g(u,b,A),A}function P(t){return t}function C(t){return t[3]}function h(t){return Q(t[3])}function $(t,o){return t[3]=o,t}const d=[0,0,1,0],a=m(),j=m();s();const u=s(),y=s(),b=s();var f;let n=f=class extends I{constructor(t){super(t),this.translation=S(),this.rotationAxis=U(d),this.rotationAngle=0,this.scale=q(1,1,1)}get rotation(){return c(this.rotationAxis,this.rotationAngle)}set rotation(t){this.rotationAxis=l(t),this.rotationAngle=C(t)}get localMatrix(){const t=x();return p(v,this.rotation,h(this.rotation)),R(t,v,this.translation,this.scale),t}get localMatrixInverse(){return T(x(),this.localMatrix)}equals(t){return this===t||t!=null&&V(this.localMatrix,t.localMatrix)}clone(){const t={translation:l(this.translation),rotationAxis:l(this.rotationAxis),rotationAngle:this.rotationAngle,scale:l(this.scale)};return new f(t)}};i([e({type:[Number],nonNullable:!0,json:{write:!0}})],n.prototype,"translation",void 0),i([e({type:[Number],nonNullable:!0,json:{write:!0}})],n.prototype,"rotationAxis",void 0),i([e({type:Number,nonNullable:!0,json:{write:!0}})],n.prototype,"rotationAngle",void 0),i([e({type:[Number],nonNullable:!0,json:{write:!0}})],n.prototype,"scale",void 0),i([e()],n.prototype,"rotation",null),i([e()],n.prototype,"localMatrix",null),i([e()],n.prototype,"localMatrixInverse",null),n=f=i([w("esri.geometry.support.MeshTransform")],n);const v=m(),W=n;export{L as Q,O as R,P as S,W as V,h as c,s};
