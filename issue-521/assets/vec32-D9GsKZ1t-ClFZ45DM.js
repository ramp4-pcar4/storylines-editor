import{dU as x}from"./main-CF9Cdcsk.js";import{n as D,o as I}from"./common-CYWrYyJl-E8-sukrT.js";function q(n){const r=n[0],o=n[1],t=n[2];return Math.sqrt(r*r+o*o+t*t)}function L(n,r){return n[0]=r[0],n[1]=r[1],n[2]=r[2],n}function O(n,r,o,t){return n[0]=r,n[1]=o,n[2]=t,n}function S(n,r,o){return n[0]=r[0]+o[0],n[1]=r[1]+o[1],n[2]=r[2]+o[2],n}function g(n,r,o){return n[0]=r[0]-o[0],n[1]=r[1]-o[1],n[2]=r[2]-o[2],n}function p(n,r,o){return n[0]=r[0]*o[0],n[1]=r[1]*o[1],n[2]=r[2]*o[2],n}function v(n,r,o){return n[0]=r[0]/o[0],n[1]=r[1]/o[1],n[2]=r[2]/o[2],n}function E(n,r){return n[0]=Math.ceil(r[0]),n[1]=Math.ceil(r[1]),n[2]=Math.ceil(r[2]),n}function N(n,r){return n[0]=Math.floor(r[0]),n[1]=Math.floor(r[1]),n[2]=Math.floor(r[2]),n}function Q(n,r){return n[0]=Math.abs(r[0]),n[1]=Math.abs(r[1]),n[2]=Math.abs(r[2]),n}function T(n,r){return n[0]=Math.sign(r[0]),n[1]=Math.sign(r[1]),n[2]=Math.sign(r[2]),n}function U(n,r,o){return n[0]=Math.min(r[0],o[0]),n[1]=Math.min(r[1],o[1]),n[2]=Math.min(r[2],o[2]),n}function X(n,r,o){return n[0]=Math.max(r[0],o[0]),n[1]=Math.max(r[1],o[1]),n[2]=Math.max(r[2],o[2]),n}function Y(n,r=0,o=1){return n[0]=Math.min(Math.max(n[0],r),o),n[1]=Math.min(Math.max(n[1],r),o),n[2]=Math.min(Math.max(n[2],r),o),n}function Z(n,r){return n[0]=Math.round(r[0]),n[1]=Math.round(r[1]),n[2]=Math.round(r[2]),n}function k(n,r,o){return n[0]=r[0]*o,n[1]=r[1]*o,n[2]=r[2]*o,n}function w(n,r,o,t){return n[0]=r[0]+o[0]*t,n[1]=r[1]+o[1]*t,n[2]=r[2]+o[2]*t,n}function y(n,r){const o=r[0]-n[0],t=r[1]-n[1],u=r[2]-n[2];return Math.sqrt(o*o+t*t+u*u)}function _(n,r){const o=r[0]-n[0],t=r[1]-n[1],u=r[2]-n[2];return o*o+t*t+u*u}function z(n){const r=n[0],o=n[1],t=n[2];return r*r+o*o+t*t}function B(n,r){return n[0]=-r[0],n[1]=-r[1],n[2]=-r[2],n}function C(n,r){return n[0]=1/r[0],n[1]=1/r[1],n[2]=1/r[2],n}function s(n,r){const o=r[0],t=r[1],u=r[2];let c=o*o+t*t+u*u;return c>0&&(c=1/Math.sqrt(c),n[0]=r[0]*c,n[1]=r[1]*c,n[2]=r[2]*c),n}function A(n,r){return n[0]*r[0]+n[1]*r[1]+n[2]*r[2]}function F(n,r,o){const t=r[0],u=r[1],c=r[2],e=o[0],h=o[1],i=o[2];return n[0]=u*i-c*h,n[1]=c*e-t*i,n[2]=t*h-u*e,n}function G(n,r,o){const t=r[0],u=r[1],c=r[2],e=o[0],h=o[1],i=o[2],M=u*i-c*h,f=c*e-t*i,a=t*h-u*e,m=Math.sqrt(M*M+f*f+a*a);return n[0]=M/m,n[1]=f/m,n[2]=a/m,n}function H(n,r,o,t){const u=r[0],c=r[1],e=r[2];return n[0]=u+t*(o[0]-u),n[1]=c+t*(o[1]-c),n[2]=e+t*(o[2]-e),n}function J(n,r,o,t,u,c){const e=c*c,h=e*(2*c-3)+1,i=e*(c-2)+c,M=e*(c-1),f=e*(3-2*c);return n[0]=r[0]*h+o[0]*i+t[0]*M+u[0]*f,n[1]=r[1]*h+o[1]*i+t[1]*M+u[1]*f,n[2]=r[2]*h+o[2]*i+t[2]*M+u[2]*f,n}function K(n,r,o,t,u,c){const e=1-c,h=e*e,i=c*c,M=h*e,f=3*c*h,a=3*i*e,m=i*c;return n[0]=r[0]*M+o[0]*f+t[0]*a+u[0]*m,n[1]=r[1]*M+o[1]*f+t[1]*a+u[1]*m,n[2]=r[2]*M+o[2]*f+t[2]*a+u[2]*m,n}function R(n,r=1){const o=I,t=2*o()*Math.PI,u=2*o()-1,c=Math.sqrt(1-u*u)*r;return n[0]=Math.cos(t)*c,n[1]=Math.sin(t)*c,n[2]=u*r,n}function V(n,r,o){const t=r[0],u=r[1],c=r[2];return n[0]=o[0]*t+o[4]*u+o[8]*c+o[12],n[1]=o[1]*t+o[5]*u+o[9]*c+o[13],n[2]=o[2]*t+o[6]*u+o[10]*c+o[14],n}function W(n,r,o){const t=r[0],u=r[1],c=r[2];return n[0]=t*o[0]+u*o[3]+c*o[6],n[1]=t*o[1]+u*o[4]+c*o[7],n[2]=t*o[2]+u*o[5]+c*o[8],n}function nn(n,r,o){const t=o[0],u=o[1],c=o[2],e=o[3],h=r[0],i=r[1],M=r[2],f=u*M-c*i,a=c*h-t*M,m=t*i-u*h,P=u*m-c*a,$=c*f-t*m,j=t*a-u*f,l=2*e;return n[0]=h+f*l+2*P,n[1]=i+a*l+2*$,n[2]=M+m*l+2*j,n}function rn(n,r,o,t){const u=[],c=[];return u[0]=r[0]-o[0],u[1]=r[1]-o[1],u[2]=r[2]-o[2],c[0]=u[0],c[1]=u[1]*Math.cos(t)-u[2]*Math.sin(t),c[2]=u[1]*Math.sin(t)+u[2]*Math.cos(t),n[0]=c[0]+o[0],n[1]=c[1]+o[1],n[2]=c[2]+o[2],n}function on(n,r,o,t){const u=[],c=[];return u[0]=r[0]-o[0],u[1]=r[1]-o[1],u[2]=r[2]-o[2],c[0]=u[2]*Math.sin(t)+u[0]*Math.cos(t),c[1]=u[1],c[2]=u[2]*Math.cos(t)-u[0]*Math.sin(t),n[0]=c[0]+o[0],n[1]=c[1]+o[1],n[2]=c[2]+o[2],n}function tn(n,r,o,t){const u=[],c=[];return u[0]=r[0]-o[0],u[1]=r[1]-o[1],u[2]=r[2]-o[2],c[0]=u[0]*Math.cos(t)-u[1]*Math.sin(t),c[1]=u[0]*Math.sin(t)+u[1]*Math.cos(t),c[2]=u[2],n[0]=c[0]+o[0],n[1]=c[1]+o[1],n[2]=c[2]+o[2],n}function un(n,r){s(d,n),s(b,r);const o=A(d,b);return o>1?0:o<-1?Math.PI:Math.acos(o)}const d=x(),b=x();function cn(n){return"vec3("+n[0]+", "+n[1]+", "+n[2]+")"}function en(n,r){return n[0]===r[0]&&n[1]===r[1]&&n[2]===r[2]}function hn(n,r){if(n===r)return!0;const o=n[0],t=n[1],u=n[2],c=r[0],e=r[1],h=r[2],i=D();return Math.abs(o-c)<=i*Math.max(1,Math.abs(o),Math.abs(c))&&Math.abs(t-e)<=i*Math.max(1,Math.abs(t),Math.abs(e))&&Math.abs(u-h)<=i*Math.max(1,Math.abs(u),Math.abs(h))}function Mn(n,r,o){const t=o[0]-r[0],u=o[1]-r[1],c=o[2]-r[2];let e=t*t+u*u+c*c;return e>0?(e=1/Math.sqrt(e),n[0]=t*e,n[1]=u*e,n[2]=c*e,n):(n[0]=0,n[1]=0,n[2]=0,n)}const fn=g,an=p,mn=v,ln=y,sn=_,dn=q,bn=z;Object.freeze(Object.defineProperty({__proto__:null,abs:Q,add:S,angle:un,bezier:K,ceil:E,clamp:Y,copy:L,cross:F,crossAndNormalize:G,direction:Mn,dist:ln,distance:y,div:mn,divide:v,dot:A,equals:hn,exactEquals:en,floor:N,hermite:J,inverse:C,len:dn,length:q,lerp:H,max:X,min:U,mul:an,multiply:p,negate:B,normalize:s,random:R,rotateX:rn,rotateY:on,rotateZ:tn,round:Z,scale:k,scaleAndAdd:w,set:O,sign:T,sqrDist:sn,sqrLen:bn,squaredDistance:_,squaredLength:z,str:cn,sub:fn,subtract:g,transformMat3:W,transformMat4:V,transformQuat:nn},Symbol.toStringTag,{value:"Module"}));export{L as A,ln as B,sn as C,U as D,X as E,dn as F,bn as G,tn as H,Q as I,k as L,w as N,B as O,T as P,C as Q,en as R,F as S,hn as T,Mn as W,H as X,V as Y,W as Z,O as _,q as b,y as g,S as j,fn as k,s as l,_ as p,p as q,g as r,z as v,nn as w,v as x,A as y};
