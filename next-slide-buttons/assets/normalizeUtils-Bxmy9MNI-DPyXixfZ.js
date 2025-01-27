import{C as W,aG as D,m as P,b7 as O,bM as X,bK as k,f as H,g as _,a as B,l as z,a1 as G,dK as V,o as Z}from"./main-CSyv-l2o.js";import{f as L,t as A,p as R,u as K}from"./normalizeUtilsCommon-CRJlkfEA-BAOUdLbS.js";import{y as E}from"./utils-9sQxfkoa-DviREFnb.js";import{p as Q,f as Y}from"./utils-Bq23Xwmj-Lu1e5M63.js";async function $(e,t,l,s){const n=E(e),i=t[0].spatialReference,r={...s,responseType:"json",query:{...n.query,f:"json",sr:X(i),target:JSON.stringify({geometryType:k(t[0]),geometries:t}),cutter:JSON.stringify(l)}},o=await H(n.path+"/cut",r),{cutIndexes:c,geometries:a=[]}=o.data;return{cutIndexes:c,geometries:a.map(u=>{const m=_(u);return m.spatialReference=i,m})}}async function ee(e,t,l){const s=typeof e=="string"?B(e):e,n=t[0].spatialReference,i=k(t[0]),r={...l,query:{...s.query,f:"json",sr:X(n),geometries:JSON.stringify(Q(t))}},{data:o}=await H(s.path+"/simplify",r);return Y(o.geometries,i,n)}const U=()=>G.getLogger("esri.geometry.support.normalizeUtils");function ne(e){return e.type==="polygon"}function te(e){return e[0].type==="polygon"}function se(e){return e[0].type==="polyline"}function C(e){const t=[];let l=0,s=0;for(let n=0;n<e.length;n++){const i=e[n];let r=null;for(let o=0;o<i.length;o++)r=i[o],t.push(r),o===0?(l=r[0],s=l):(l=Math.min(l,r[0]),s=Math.max(s,r[0]));r&&t.push([(l+s)/2,0])}return t}function oe(e,t){if(!(e instanceof P||e instanceof z)){const n="straightLineDensify: the input geometry is neither polyline nor polygon";throw U().error(n),new Z(n)}const l=A(e),s=[];for(const n of l){const i=[];s.push(i),i.push([n[0][0],n[0][1]]);for(let r=0;r<n.length-1;r++){const o=n[r][0],c=n[r][1],a=n[r+1][0],u=n[r+1][1],m=Math.sqrt((a-o)*(a-o)+(u-c)*(u-c)),p=(u-c)/m,d=(a-o)/m,g=m/t;if(g>1){for(let N=1;N<=g-1;N++){const S=N*t,f=d*S+o,h=p*S+c;i.push([f,h])}const b=(m+Math.floor(g-1)*t)/2,j=d*b+o,F=p*b+c;i.push([j,F])}i.push([a,u])}}return ne(e)?new z({rings:s,spatialReference:e.spatialReference}):new P({paths:s,spatialReference:e.spatialReference})}function J(e,t,l){if(t){const s=oe(e,1e6);e=V(s,!0)}return l&&(e=K(e,l)),e}function T(e,t,l){if(Array.isArray(e)){const s=e[0];if(s>t){const n=R(s,t);e[0]=s+n*(-2*t)}else if(s<l){const n=R(s,l);e[0]=s+n*(-2*l)}}else{const s=e.x;if(s>t){const n=R(s,t);e=e.clone().offset(n*(-2*t),0)}else if(s<l){const n=R(s,l);e=e.clone().offset(n*(-2*l),0)}}return e}function re(e,t){let l=-1;for(let s=0;s<t.cutIndexes.length;s++){const n=t.cutIndexes[s],i=t.geometries[s],r=A(i);for(let o=0;o<r.length;o++){const c=r[o];c.some(a=>{if(a[0]<180)return!0;{let u=0;for(let p=0;p<c.length;p++){const d=c[p][0];u=d>u?d:u}u=Number(u.toFixed(9));const m=-360*R(u,180);for(let p=0;p<c.length;p++){const d=i.getPoint(o,p);i.setPoint(o,p,d.clone().offset(m,0))}return!0}})}if(n===l){if(te(e))for(const o of A(i))e[n]=e[n].addRing(o);else if(se(e))for(const o of A(i))e[n]=e[n].addPath(o)}else l=n,e[n]=i}return e}async function ie(e,t,l){if(!Array.isArray(e))return ie([e],t);t&&typeof t!="string"&&U().warn("normalizeCentralMeridian()","The url object is deprecated, use the url string instead");const s=typeof t=="string"?t:t?.url??W.geometryServiceUrl;let n,i,r,o,c,a,u,m,p=0;const d=[],g=[];for(const f of e)if(f!=null)if(n||(n=f.spatialReference,i=D(n),r=n.isWebMercator,a=r?102100:4326,o=L[a].maxX,c=L[a].minX,u=L[a].plus180Line,m=L[a].minus180Line),i)if(f.type==="mesh")g.push(f);else if(f.type==="point")g.push(T(f.clone(),o,c));else if(f.type==="multipoint"){const h=f.clone();h.points=h.points.map(x=>T(x,o,c)),g.push(h)}else if(f.type==="extent"){const h=f.clone()._normalize(!1,!1,i);g.push(h.rings?new z(h):h)}else if(f.extent){const h=f.extent,x=R(h.xmin,c)*(2*o);let M=x===0?f.clone():K(f.clone(),x);h.offset(x,0);let{xmin:w,xmax:y}=h;w=Number(w.toFixed(9)),y=Number(y.toFixed(9)),h.intersects(u)&&y!==o?(p=y>p?y:p,M=J(M,r),d.push(M),g.push("cut")):h.intersects(m)&&w!==c?(p=y*(2*o)>p?y*(2*o):p,M=J(M,r,360),d.push(M),g.push("cut")):g.push(M)}else g.push(f.clone());else g.push(f);else g.push(f);let b=R(p,o),j=-90;const F=b,N=new P;for(;b>0;){const f=360*b-180;N.addPath([[f,j],[f,-1*j]]),j*=-1,b--}if(d.length>0&&F>0){const f=re(d,await $(s,d,N,l)),h=[],x=[];for(let y=0;y<g.length;y++){const q=g[y];if(q!=="cut")x.push(q);else{const I=f.shift(),v=e[y];v!=null&&v.type==="polygon"&&v.rings&&v.rings.length>1&&I.rings.length>=v.rings.length?(h.push(I),x.push("simplify")):x.push(r?O(I):I)}}if(!h.length)return x;const M=await ee(s,h,l),w=[];for(let y=0;y<x.length;y++){const q=x[y];q!=="simplify"?w.push(q):w.push(r?O(M.shift()):M.shift())}return w}const S=[];for(let f=0;f<g.length;f++){const h=g[f];if(h!=="cut")S.push(h);else{const x=d.shift();S.push(r===!0?O(x):x)}}return S}function ue(e){if(!e)return null;const t=e.extent;if(!t)return null;const l=e.spatialReference&&D(e.spatialReference);if(!l)return t;const[s,n]=l.valid,i=2*n,{width:r}=t;let o,{xmin:c,xmax:a}=t;if([c,a]=[a,c],e.type==="extent"||r===0||r<=n||r>i||c<s||a>n)return t;switch(e.type){case"polygon":if(!(e.rings.length>1))return t;o=C(e.rings);break;case"polyline":if(!(e.paths.length>1))return t;o=C(e.paths);break;case"multipoint":o=e.points}const u=t.clone();for(let m=0;m<o.length;m++){let p=o[m][0];p<0?(p+=n,a=Math.max(p,a)):(p-=n,c=Math.min(p,c))}return u.xmin=c,u.xmax=a,u.width<r?(u.xmin-=n,u.xmax-=n,u):t}function pe(e,t,l){const s=D(l);if(s==null)return e;const[n,i]=s.valid,r=2*i;let o=0,c=0;t>i?o=Math.ceil(Math.abs(t-i)/r):t<n&&(o=-Math.ceil(Math.abs(t-n)/r)),e>i?c=Math.ceil(Math.abs(e-i)/r):e<n&&(c=-Math.ceil(Math.abs(e-n)/r));let a=e+(o-c)*r;const u=a-t;return u>i?a-=r:u<n&&(a+=r),a}function he(e,t){const l=D(t);if(l){const[s,n]=l.valid,i=n-s;if(e<s)for(;e<s;)e+=i;if(e>n)for(;e>n;)e-=i}return e}export{ie as B,oe as D,ue as a,pe as c,he as l};
