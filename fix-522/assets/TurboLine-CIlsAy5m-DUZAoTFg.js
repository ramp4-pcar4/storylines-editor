const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./libtess-asm-CEhQARv_-C8K5Bmv1.js","./_commonjsHelpers-BITg13Vk-KnjfkSck.js","./libtess-DHRgJTgB-4cw3_oA4.js"])))=>i.map(i=>d[i]);
import{K as bt,_ as wt,bw as pt}from"./main-gpNb-fIA.js";import{i as S,t as D}from"./enums-CpSG_SL3-BMD3Tb1v.js";import{d as Rt}from"./definitions-DJSdSb77-DkoRHaVx.js";const Mt=128e3;let dt=null,gt=null;async function Ot(){return dt||(dt=Ut()),dt}async function Ut(){gt=await(bt("esri-csp-restrictions")?await wt(()=>import("./libtess-asm-CEhQARv_-C8K5Bmv1.js"),__vite__mapDeps([0,1]),import.meta.url).then(x=>x.l):await wt(()=>import("./libtess-DHRgJTgB-4cw3_oA4.js"),__vite__mapDeps([2,1]),import.meta.url).then(x=>x.l)).default({locateFile:x=>pt(`esri/core/libs/libtess/${x}`)})}function It(x,i){const r=Math.max(x.length,Mt);return gt.triangulate(x,i,r)}function Vt(x,i){return x.x===i.x&&x.y===i.y}function kt(x){if(!x)return;const i=x.length;if(i<=1)return;let r=0;for(let v=1;v<i;v++)Vt(x[v],x[r])||++r===v||(x[r]=x[v]);x.length=r+1}function k(x,i){return x.x=i.y,x.y=-i.x,x}function p(x,i){return x.x=-i.y,x.y=i.x,x}function Tt(x,i){return x.x=i.x,x.y=i.y,x}function vt(x,i){return x.x=-i.x,x.y=-i.y,x}function ft(x){return Math.sqrt(x.x*x.x+x.y*x.y)}function Bt(x,i){return x.x*i.y-x.y*i.x}function mt(x,i){return x.x*i.x+x.y*i.y}function et(x,i,r,v){return x.x=i.x*r+i.y*v,x.y=i.x*v-i.y*r,x}class Pt{constructor(i,r,v){this._writeVertex=i,this._writeTriangle=r,this._canUseThinTessellation=v,this._prevNormal={x:void 0,y:void 0},this._nextNormal={x:void 0,y:void 0},this._textureNormalLeft={x:0,y:1},this._textureNormalRight={x:0,y:-1},this._textureNormal={x:void 0,y:void 0},this._joinNormal={x:void 0,y:void 0},this._inner={x:void 0,y:void 0},this._outer={x:void 0,y:void 0},this._roundStart={x:void 0,y:void 0},this._roundEnd={x:void 0,y:void 0},this._startBreak={x:void 0,y:void 0},this._endBreak={x:void 0,y:void 0},this._innerPrev={x:void 0,y:void 0},this._innerNext={x:void 0,y:void 0},this._bevelStart={x:void 0,y:void 0},this._bevelEnd={x:void 0,y:void 0},this._bevelMiddle={x:void 0,y:void 0}}tessellate(i,r,v=this._canUseThinTessellation){kt(i),v&&r.halfWidth<Rt&&!r.offset?this._tessellateThin(i,r):this._tessellate(i,r)}_tessellateThin(i,r){if(i.length<2)return;const v=r.wrapDistance||65535;let E=r.initialDistance||0,W=!1,z=i[0].x,F=i[0].y;const B=i.length;for(let j=1;j<B;++j){W&&(W=!1,E=0);let q=i[j].x,Q=i[j].y,b=q-z,f=Q-F,T=Math.sqrt(b*b+f*f);if(b/=T,f/=T,E+T>v){W=!0;const t=(v-E)/T;T=v-E,q=(1-t)*z+t*q,Q=(1-t)*F+t*Q,--j}const o=this._writeVertex(z,F,0,0,b,f,f,-b,0,-1,E),n=this._writeVertex(z,F,0,0,b,f,-f,b,0,1,E);E+=T;const G=this._writeVertex(q,Q,0,0,b,f,f,-b,0,-1,E),e=this._writeVertex(q,Q,0,0,b,f,-f,b,0,1,E);this._writeTriangle(o,n,G),this._writeTriangle(n,G,e),z=q,F=Q}}_tessellate(i,r){const v=i[0],E=i[i.length-1],W=Vt(v,E),z=W?3:2;if(i.length<z)return;const F=r.pixelCoordRatio,B=r.capType!=null?r.capType:S.BUTT,j=r.joinType!=null?r.joinType:D.MITER,q=r.miterLimit!=null?Math.min(r.miterLimit,4):2,Q=r.roundLimit!=null?Math.min(r.roundLimit,1.05):1.05,b=r.halfWidth!=null?r.halfWidth:2,f=!!r.textured;let T,o,n,G=null;const e=this._prevNormal,t=this._nextNormal;let Y=-1,C=-1;const y=this._joinNormal;let _,c;const rt=this._textureNormalLeft,st=this._textureNormalRight,w=this._textureNormal;let u=-1,l=-1;const _t=r.wrapDistance||65535;let h=r.initialDistance||0;const Nt=this._writeVertex,Et=this._writeTriangle,d=(R,yt,H,g,L,A)=>{const O=Nt(o,n,_,c,H,g,R,yt,L,A,h);return u>=0&&l>=0&&O>=0&&Et(u,l,O),u=l,l=O,O};W&&(T=i[i.length-2],t.x=E.x-T.x,t.y=E.y-T.y,C=ft(t),t.x/=C,t.y/=C);let Z=!1;for(let R=0;R<i.length;++R){if(Z&&(Z=!1,h=0),T&&(e.x=-t.x,e.y=-t.y,Y=C,h+Y>_t&&(Z=!0)),Z){const s=(_t-h)/Y;Y=_t-h,T={x:(1-s)*T.x+s*i[R].x,y:(1-s)*T.y+s*i[R].y},--R}else T=i[R];o=T.x,n=T.y;const yt=R<=0&&!Z,H=R===i.length-1;if(yt||(h+=Y),G=H?W?i[1]:null:i[R+1],G?(t.x=G.x-o,t.y=G.y-n,C=ft(t),t.x/=C,t.y/=C):(t.x=void 0,t.y=void 0),!W){if(yt){p(y,t),_=y.x,c=y.y,B===S.SQUARE&&(d(-t.y-t.x,t.x-t.y,t.x,t.y,0,-1),d(t.y-t.x,-t.x-t.y,t.x,t.y,0,1)),B===S.ROUND&&(d(-t.y-t.x,t.x-t.y,t.x,t.y,-1,-1),d(t.y-t.x,-t.x-t.y,t.x,t.y,-1,1)),B!==S.ROUND&&B!==S.BUTT||(d(-t.y,t.x,t.x,t.y,0,-1),d(t.y,-t.x,t.x,t.y,0,1));continue}if(H){k(y,e),_=y.x,c=y.y,B!==S.ROUND&&B!==S.BUTT||(d(e.y,-e.x,-e.x,-e.y,0,-1),d(-e.y,e.x,-e.x,-e.y,0,1)),B===S.SQUARE&&(d(e.y-e.x,-e.x-e.y,-e.x,-e.y,0,-1),d(-e.y-e.x,e.x-e.y,-e.x,-e.y,0,1)),B===S.ROUND&&(d(e.y-e.x,-e.x-e.y,-e.x,-e.y,1,-1),d(-e.y-e.x,e.x-e.y,-e.x,-e.y,1,1));continue}}let g,L,A=-Bt(e,t);if(Math.abs(A)<.01)mt(e,t)>0?(y.x=e.x,y.y=e.y,A=1,g=Number.MAX_VALUE,L=!0):(p(y,t),A=1,g=1,L=!1);else{y.x=(e.x+t.x)/A,y.y=(e.y+t.y)/A,g=ft(y);const s=(g-1)*b*F;L=g>4||s>Y&&s>C}_=y.x,c=y.y;let O=j;switch(j){case D.BEVEL:g<1.05&&(O=D.MITER);break;case D.ROUND:g<Q&&(O=D.MITER);break;case D.MITER:g>q&&(O=D.BEVEL)}switch(O){case D.MITER:if(d(y.x,y.y,-e.x,-e.y,0,-1),d(-y.x,-y.y,-e.x,-e.y,0,1),H)break;if(f){const s=Z?0:h;u=this._writeVertex(o,n,_,c,t.x,t.y,y.x,y.y,0,-1,s),l=this._writeVertex(o,n,_,c,t.x,t.y,-y.x,-y.y,0,1,s)}break;case D.BEVEL:{const s=A<0;let m,V,K,M;if(s){const a=u;u=l,l=a,m=rt,V=st}else m=st,V=rt;if(L)K=s?p(this._innerPrev,e):k(this._innerPrev,e),M=s?k(this._innerNext,t):p(this._innerNext,t);else{const a=s?vt(this._inner,y):Tt(this._inner,y);K=a,M=a}const U=s?k(this._bevelStart,e):p(this._bevelStart,e);d(K.x,K.y,-e.x,-e.y,m.x,m.y);const nt=d(U.x,U.y,-e.x,-e.y,V.x,V.y);if(H)break;const I=s?p(this._bevelEnd,t):k(this._bevelEnd,t);if(L){const a=this._writeVertex(o,n,_,c,-e.x,-e.y,0,0,0,0,h);u=this._writeVertex(o,n,_,c,t.x,t.y,M.x,M.y,m.x,m.y,h),l=this._writeVertex(o,n,_,c,t.x,t.y,I.x,I.y,V.x,V.y,h),this._writeTriangle(nt,a,l)}else{if(f){const a=this._bevelMiddle;a.x=(U.x+I.x)/2,a.y=(U.y+I.y)/2,et(w,a,-e.x,-e.y),d(a.x,a.y,-e.x,-e.y,w.x,w.y),et(w,a,t.x,t.y),u=this._writeVertex(o,n,_,c,t.x,t.y,a.x,a.y,w.x,w.y,h),l=this._writeVertex(o,n,_,c,t.x,t.y,M.x,M.y,m.x,m.y,h)}else{const a=u;u=l,l=a}d(I.x,I.y,t.x,t.y,V.x,V.y)}if(s){const a=u;u=l,l=a}break}case D.ROUND:{const s=A<0;let m,V;if(s){const N=u;u=l,l=N,m=rt,V=st}else m=st,V=rt;const K=s?vt(this._inner,y):Tt(this._inner,y);let M,U;L?(M=s?p(this._innerPrev,e):k(this._innerPrev,e),U=s?k(this._innerNext,t):p(this._innerNext,t)):(M=K,U=K);const nt=s?k(this._roundStart,e):p(this._roundStart,e),I=s?p(this._roundEnd,t):k(this._roundEnd,t),a=d(M.x,M.y,-e.x,-e.y,m.x,m.y),ot=d(nt.x,nt.y,-e.x,-e.y,V.x,V.y);if(H)break;const X=this._writeVertex(o,n,_,c,-e.x,-e.y,0,0,0,0,h);L||this._writeTriangle(u,l,X);const P=vt(this._outer,K),J=this._writeVertex(o,n,_,c,t.x,t.y,I.x,I.y,V.x,V.y,h);let $,tt;const lt=g>2;if(lt){let N;g!==Number.MAX_VALUE?(P.x/=g,P.y/=g,N=mt(e,P),N=(g*(N*N-1)+1)/N):N=-1,$=s?k(this._startBreak,e):p(this._startBreak,e),$.x+=e.x*N,$.y+=e.y*N,tt=s?p(this._endBreak,t):k(this._endBreak,t),tt.x+=t.x*N,tt.y+=t.y*N}et(w,P,-e.x,-e.y);const ht=this._writeVertex(o,n,_,c,-e.x,-e.y,P.x,P.y,w.x,w.y,h);et(w,P,t.x,t.y);const ct=f?this._writeVertex(o,n,_,c,t.x,t.y,P.x,P.y,w.x,w.y,h):ht,ut=X,at=f?this._writeVertex(o,n,_,c,t.x,t.y,0,0,0,0,h):X;let it=-1,xt=-1;if(lt&&(et(w,$,-e.x,-e.y),it=this._writeVertex(o,n,_,c,-e.x,-e.y,$.x,$.y,w.x,w.y,h),et(w,tt,t.x,t.y),xt=this._writeVertex(o,n,_,c,t.x,t.y,tt.x,tt.y,w.x,w.y,h)),f?lt?(this._writeTriangle(ut,ot,it),this._writeTriangle(ut,it,ht),this._writeTriangle(at,ct,xt),this._writeTriangle(at,xt,J)):(this._writeTriangle(ut,ot,ht),this._writeTriangle(at,ct,J)):lt?(this._writeTriangle(X,ot,it),this._writeTriangle(X,it,xt),this._writeTriangle(X,xt,J)):(this._writeTriangle(X,ot,ht),this._writeTriangle(X,ct,J)),L?(u=this._writeVertex(o,n,_,c,t.x,t.y,U.x,U.y,m.x,m.y,h),l=J):(u=f?this._writeVertex(o,n,_,c,t.x,t.y,U.x,U.y,m.x,m.y,h):a,this._writeTriangle(u,at,J),l=J),s){const N=u;u=l,l=N}break}}}}}export{Pt as D,Ot as M,It as k};
