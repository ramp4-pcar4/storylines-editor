import{cM as en,cN as on,cO as tn,cP as sn,o as Z,a1 as un,cQ as cn,cR as ln,cS as an,O as fn}from"./main-DeZqmqPk.js";import{c as P,i as F}from"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import{t as hn}from"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";function p(n,r){return n?r?4:3:r?3:2}const $=()=>un.getLogger("esri.layers.graphics.featureConversionUtils"),H={esriGeometryPoint:0,esriGeometryPolyline:2,esriGeometryPolygon:3,esriGeometryMultipoint:0,esriGeometryMultiPatch:3,esriGeometryEnvelope:0},dn=(n,r,e,o,s,t)=>{n[e]=s,n[e+1]=t},O=(n,r,e,o,s,t)=>{n[e]=s,n[e+1]=t,n[e+2]=r[o+2]},mn=(n,r,e,o,s,t)=>{n[e]=s,n[e+1]=t,n[e+2]=r[o+3]},gn=(n,r,e,o,s,t)=>{n[e]=s,n[e+1]=t,n[e+2]=r[o+2],n[e+3]=r[o+3]};function q(n,r,e,o){if(n){if(e)return r&&o?gn:O;if(r&&o)return mn}else if(r&&o)return O;return dn}function j({scale:n,translate:r},e){return Math.round((e-r[0])/n[0])}function z({scale:n,translate:r},e){return Math.round((r[1]-e)/n[1])}function L({scale:n,translate:r},e,o){return e*n[o]+r[o]}function En(n,r,e){return n?r?e?U(n):E(n):e?R(n):k(n):null}function k(n){const r=n.coords;return{x:r[0],y:r[1]}}function Q(n,r){return n.coords[0]=r.x,n.coords[1]=r.y,n}function E(n){const r=n.coords;return{x:r[0],y:r[1],z:r[2]}}function yn(n,r){return n.coords[0]=r.x,n.coords[1]=r.y,n.coords[2]=r.z,n}function R(n){const r=n.coords;return{x:r[0],y:r[1],m:r[2]}}function pn(n,r){return n.coords[0]=r.x,n.coords[1]=r.y,n.coords[2]=r.m,n}function U(n){const r=n.coords;return{x:r[0],y:r[1],z:r[2],m:r[3]}}function bn(n,r){return n.coords[0]=r.x,n.coords[1]=r.y,n.coords[2]=r.z,n.coords[3]=r.m,n}function wn(n,r,e,o){let s=k;e&&o?s=U:e?s=E:o&&(s=R);for(const t of r){const{geometry:u,attributes:c}=t,i=u!=null?s(u):null;n.push({attributes:c,geometry:i})}return n}function Y(n,r){return n&&r?bn:n?yn:r?pn:Q}function Mn(n,r,e,o,s){const t=Y(e,o);for(const{geometry:u,attributes:c}of r){const i=u!=null?t(new P,u):null;n.push(new F(i,c,null,s?c[s]:void 0))}return n}function In(n,r,e=Y(r.z!=null,r.m!=null)){return e(n,r)}function Gn(n,r,e,o){for(const{geometry:s,attributes:t}of r)n.push({attributes:t,geometry:s!=null?W(s,e,o):null});return n}function W(n,r,e){if(n==null)return null;const o=p(r,e),s=[];for(let t=0;t<n.coords.length;t+=o){const u=[];for(let c=0;c<o;c++)u.push(n.coords[t+c]);s.push(u)}return r?e?{points:s,hasZ:r,hasM:e}:{points:s,hasZ:r}:e?{points:s,hasM:e}:{points:s}}function Nn(n,r,e,o,s){const t=p(e,o);for(const{geometry:u,attributes:c}of r){const i=u!=null?X(new P,u,t):null;n.push(new F(i,c,null,s?c[s]:void 0))}return n}function X(n,r,e=p(r.hasZ,r.hasM)){n.lengths[0]=r.points.length;const o=n.coords;let s=0;for(const t of r.points)for(let u=0;u<e;u++)o[s++]=t[u];return n}function Pn(n,r,e,o){for(const{geometry:s,attributes:t}of r)n.push({attributes:t,geometry:s!=null?B(s,e,o):null});return n}function B(n,r,e){if(!n)return null;const o=p(r,e),{coords:s,lengths:t}=n,u=[];let c=0;for(const i of t){const l=[];for(let a=0;a<i;a++){const f=[];for(let h=0;h<o;h++)f.push(s[c++]);l.push(f)}u.push(l)}return r?e?{paths:u,hasZ:r,hasM:e}:{paths:u,hasZ:r}:e?{paths:u,hasM:e}:{paths:u}}function Tn(n,r,e,o,s){const t=p(e,o);for(const{geometry:u,attributes:c,centroid:i}of r){const l=u!=null?D(new P,u,t):null,a=i!=null?In(new P,i):null;n.push(new F(l,c,a,s?c[s]:void 0))}return n}function D(n,r,e=p(r.hasZ,r.hasM)){const{lengths:o,coords:s}=n;let t=0;for(const u of r.paths){for(const c of u)for(let i=0;i<e;i++)s[t++]=c[i];o.push(u.length)}return n}function Fn(n,r,e,o){for(const{geometry:s,attributes:t,centroid:u}of r){const c=s!=null?J(s,e,o):null;if(u!=null){const i=k(u);n.push({attributes:t,centroid:i,geometry:c})}else n.push({attributes:t,geometry:c})}return n}function J(n,r,e){if(!n)return null;const o=p(r,e),{coords:s,lengths:t}=n,u=[];let c=0;for(const i of t){const l=[];for(let a=0;a<i;a++){const f=[];for(let h=0;h<o;h++)f.push(s[c++]);l.push(f)}u.push(l)}return r?e?{rings:u,hasZ:r,hasM:e}:{rings:u,hasZ:r}:e?{rings:u,hasM:e}:{rings:u}}function xn(n,r,e,o,s){for(const{geometry:t,centroid:u,attributes:c}of r){const i=t!=null?K(new P,t,e,o):null,l=s?c[s]:void 0;u!=null?n.push(new F(i,c,Q(new P,u),l)):n.push(new F(i,c,null,l))}return n}function K(n,r,e=r.hasZ,o=r.hasM){return Zn(n,r.rings,e,o)}function Zn(n,r,e,o){const s=p(e,o),{lengths:t,coords:u}=n;let c=0;N(n);for(const i of r){for(const l of i)for(let a=0;a<s;a++)u[c++]=l[a];t.push(i.length)}return n}const T=[],x=[];function Rn(n,r,e,o,s){T[0]=n;const[t]=nn(x,T,r,e,o,s);return G(T),G(x),t}function nn(n,r,e,o,s,t){if(G(n),!e){for(const u of r){const c=t?u.attributes[t]:void 0;n.push(new F(null,u.attributes,null,c))}return n}switch(e){case"esriGeometryPoint":return Mn(n,r,o,s,t);case"esriGeometryMultipoint":return Nn(n,r,o,s,t);case"esriGeometryPolyline":return Tn(n,r,o,s,t);case"esriGeometryPolygon":case"esriGeometryMultiPatch":return xn(n,r,o,s,t);default:$().error("convertToFeatureSet:unknown-geometry",new Z(`Unable to parse unknown geometry type '${e}'`)),G(n)}return n}function Un(n,r,e,o){x[0]=n,rn(T,x,r,e,o);const s=T[0];return G(T),G(x),s}function Yn(n,r,e){if(n==null)return null;const o=new P;return"hasZ"in n&&r==null&&(r=n.hasZ),"hasM"in n&&e==null&&(e=n.hasM),en(n)?Y(r??n.z!=null,e??n.m!=null)(o,n):on(n)?K(o,n,r,e):tn(n)?D(o,n,p(r,e)):sn(n)?X(o,n,p(r,e)):void $().error("convertFromGeometry:unknown-geometry",new Z(`Unable to parse unknown geometry type '${n}'`))}function $n(n,r,e,o){const s=n&&("coords"in n?n:n.geometry);if(s==null)return null;switch(r){case"esriGeometryPoint":{let t=k;return e&&o?t=U:e?t=E:o&&(t=R),t(s)}case"esriGeometryMultipoint":return W(s,e,o);case"esriGeometryPolyline":return B(s,e,o);case"esriGeometryPolygon":return J(s,e,o);default:return $().error("convertToGeometry:unknown-geometry",new Z(`Unable to parse unknown geometry type '${r}'`)),null}}function vn(n,r){for(const e of r)n.push({attributes:e.attributes});return n}function rn(n,r,e,o,s){if(G(n),e==null)return vn(n,r);switch(e){case"esriGeometryPoint":return wn(n,r,o,s);case"esriGeometryMultipoint":return Gn(n,r,o,s);case"esriGeometryPolyline":return Pn(n,r,o,s);case"esriGeometryPolygon":return Fn(n,r,o,s);default:$().error("convertToFeatureSet:unknown-geometry",new Z(`Unable to parse unknown geometry type '${e}'`))}return n}function Sn(n){const{objectIdFieldName:r,spatialReference:e,transform:o,fields:s,hasM:t,hasZ:u,features:c,geometryType:i,exceededTransferLimit:l,uniqueIdField:a,queryGeometry:f,queryGeometryType:h}=n,d={features:rn([],c,i,u,t),fields:s,geometryType:i,objectIdFieldName:r,spatialReference:e,uniqueIdField:a,queryGeometry:$n(f,h,!1,!1)};return o&&(d.transform=o),l&&(d.exceededTransferLimit=l),t&&(d.hasM=t),u&&(d.hasZ=u),d}function Vn(n,r){const e=new hn,{hasM:o,hasZ:s,features:t,objectIdFieldName:u,spatialReference:c,geometryType:i,exceededTransferLimit:l,transform:a,fields:f}=n;return f&&(e.fields=f),e.geometryType=i??null,e.objectIdFieldName=u??r??null,e.spatialReference=c??null,e.objectIdFieldName?(t&&nn(e.features,t,i,s,o,e.objectIdFieldName),l&&(e.exceededTransferLimit=l),o&&(e.hasM=o),s&&(e.hasZ=s),a&&(e.transform=a),e):($().error(new Z("optimized-features:invalid-objectIdFieldName","objectIdFieldName is missing")),e)}function On(n){const{transform:r,features:e,hasM:o,hasZ:s}=n;if(!r)return n;for(const t of e)t.geometry!=null&&C(t.geometry,t.geometry,o,s,r),t.centroid!=null&&C(t.centroid,t.centroid,o,s,r);return n.transform=null,n}function An(n,r){const{geometryType:e,features:o,hasM:s,hasZ:t}=r;if(!n)return r;for(let u=0;u<o.length;u++){const c=o[u],i=c.weakClone();i.geometry=new P,A(i.geometry,c.geometry,s,t,e,n),c.centroid&&(i.centroid=new P,A(i.centroid,c.centroid,s,t,"esriGeometryPoint",n)),o[u]=i}return r.transform=n,r}function A(n,r,e,o,s,t,u=e,c=o){if(N(n),!r?.coords.length)return null;const i=H[s],{coords:l,lengths:a}=r,f=p(e,o),h=p(e&&u,o&&c),d=q(e,o,u,c);if(!a.length)return d(n.coords,l,0,0,j(t,l[0]),z(t,l[1])),N(n,f,0),n;let m,y,w,M,b=0,g=0,I=g;for(const S of a){if(S<i)continue;let v=0;g=I,w=m=j(t,l[b]),M=y=z(t,l[b+1]),d(n.coords,l,g,b,w,M),v++,b+=f,g+=h;for(let V=1;V<S;V++,b+=f)w=j(t,l[b]),M=z(t,l[b+1]),w===m&&M===y||(d(n.coords,l,g,b,w-m,M-y),g+=h,v++,m=w,y=M);v>=i&&(n.lengths.push(v),I=g)}return G(n.coords,I),n.coords.length?n:null}function Cn(n,r,e,o,s,t,u=e,c=o){if(N(n),!r?.coords.length)return null;const i=H[s],{coords:l,lengths:a}=r,f=p(e,o),h=p(e&&u,o&&c),d=q(e,o,u,c);if(!a.length)return d(n.coords,l,0,0,l[0],l[1]),N(n,f,0),n;let m=0;const y=t*t;for(const w of a){if(w<i){m+=w*f;continue}const M=n.coords.length/h,b=m,g=m+(w-1)*f;d(n.coords,l,n.coords.length,b,l[b],l[b+1]),_(n.coords,l,f,y,d,b,g),d(n.coords,l,n.coords.length,g,l[g],l[g+1]);const I=n.coords.length/h-M;I>=i?n.lengths.push(I):G(n.coords,M*h),m+=w*f}return n.coords.length?n:null}function kn(n,r,e,o){const s=n[r],t=n[r+1],u=n[e],c=n[e+1],i=n[o],l=n[o+1];let a=u,f=c,h=i-a,d=l-f;if(h!==0||d!==0){const m=((s-a)*h+(t-f)*d)/(h*h+d*d);m>1?(a=i,f=l):m>0&&(a+=h*m,f+=d*m)}return h=s-a,d=t-f,h*h+d*d}function _(n,r,e,o,s,t,u){let c,i=o,l=0;for(let a=t+e;a<u;a+=e)c=kn(r,a,t,u),c>i&&(l=a,i=c);i>o&&(l-t>e&&_(n,r,e,o,s,t,l),s(n,r,n.length,l,r[l],r[l+1]),u-l>e&&_(n,r,e,o,s,l,u))}function Hn(n,r,e,o){if(!r?.coords?.length)return null;const s=p(e,o);let t=Number.POSITIVE_INFINITY,u=Number.POSITIVE_INFINITY,c=Number.NEGATIVE_INFINITY,i=Number.NEGATIVE_INFINITY;if(r&&r.coords){const l=r.coords;for(let a=0;a<l.length;a+=s){const f=l[a],h=l[a+1];t=Math.min(t,f),c=Math.max(c,f),u=Math.min(u,h),i=Math.max(i,h)}}return cn(n)?ln(n,t,u,c,i):an(t,u,c,i,n),n}function C(n,r,e,o,s){const{coords:t,lengths:u}=r,c=p(e,o);if(!t.length)return n!==r&&N(n),n;fn(s);const{originPosition:i,scale:l,translate:a}=s,f=zn;f.originPosition=i;const h=f.scale;h[0]=l[0]??1,h[1]=-(l[1]??1),h[2]=l[2]??1,h[3]=l[3]??1;const d=f.translate;if(d[0]=a[0]??0,d[1]=a[1]??0,d[2]=a[2]??0,d[3]=a[3]??0,!u.length){for(let y=0;y<c;++y)n.coords[y]=L(f,t[y],y);return n!==r&&N(n,c,0),n}let m=0;for(let y=0;y<u.length;y++){const w=u[y];n.lengths[y]=w;for(let g=0;g<c;++g)n.coords[m+g]=L(f,t[m+g],g);let M=n.coords[m],b=n.coords[m+1];m+=c;for(let g=1;g<w;g++,m+=c){M+=t[m]*h[0],b+=t[m+1]*h[1],n.coords[m]=M,n.coords[m+1]=b;for(let I=2;I<c;++I)n.coords[m+I]=L(f,t[m+I],I)}}return n!==r&&N(n,t.length,u.length),n}function Qn(n,r,e,o,s,t){if(N(n),n.lengths.push(...r.lengths),e===s&&o===t)for(let u=0;u<r.coords.length;u++)n.coords.push(r.coords[u]);else{const u=p(e,o),c=q(e,o,s,t),i=r.coords;for(let l=0;l<i.length;l+=u)c(n.coords,i,n.coords.length,l,i[l],i[l+1])}return n}function jn(n,r,e,o){let s=0,t=n[o*r],u=n[o*(r+1)];for(let c=1;c<e;c++){const i=t+n[o*(r+c)],l=u+n[o*(r+c)+1],a=(i-t)*(l+u);t=i,u=l,s+=a}return .5*s}function Wn(n,r){const{coords:e,lengths:o}=n;let s=0,t=0;for(let u=0;u<o.length;u++){const c=o[u];t+=jn(e,s,c,r),s+=c}return Math.abs(t)}function N(n,r=0,e=0){G(n.lengths,e),G(n.coords,r)}function G(n,r=0){n.length!==r&&(n.length=r)}const zn={originPosition:"lowerLeft",scale:[1,1,1,1],translate:[0,0,0,0]};export{An as $,nn as A,A as C,C as D,On as L,K as O,Cn as R,Sn as U,Hn as V,In as X,Qn as Y,J as _,B as a,En as b,W as c,Wn as d,j as e,z as f,Un as j,Rn as k,$n as n,Zn as o,Vn as q,Yn as z};
