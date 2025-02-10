import{K as A,$ as l,f,bX as h,J as X,az as Q,aN as v,an as Y,a2 as Z,bm as D,W as ee,jd as se,a1 as te,bn as I}from"./main-ljaACljU.js";import{a as re}from"./uuid-Dj9mdEVg-BaKSCiyT.js";import{M as oe,q as ne,i as _,v as k,O as ae}from"./External-D_wl4XAw-Cebcso_L.js";import{p as ie,c as ce,m as le,f as ue,$ as C,x as pe,g as me,d as fe,l as de,i as ge}from"./meshSpatialReferenceScaleUtils-B1zR72Os-CpYeBOKE.js";import{L as he}from"./arcgisLayerUrl-HNYh8jvG-DK1s7ONN.js";import{j as we,L as ye,b as Pe,u as be,f as Te}from"./infoFor3D-DIuYZyyK-BtH19JJ7.js";import{e as Ae,s as ve}from"./meshFeatureAttributes-BwKR5odo-By3qPRwz.js";import"./MeshTransform-C--IG09w-C1Khl8na.js";import"./mat4-DX7gBViE-C1VO5ErA.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./quat-BODLR7mS-BAKPFPsB.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./quatf64-C16JxGFv-BKWK1F8U.js";import"./vec32-D9GsKZ1t-Dv0QTCaj.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";const j={upload:{createFromFiles:.8,loadMesh:.2},uploadAssetBlobs:{prepareAssetItems:.9,uploadAssetItems:.1},uploadConvertibleSource:{uploadEditSource:.5,serviceAssetsToGlb:.5},uploadLocalMesh:{meshToAssetBlob:.5,uploadAssetBlobs:.5}};function w(e,s=r=>{},t){return new je(e,s,t)}let je=class{constructor(e,s=r=>{},t){if(this.onProgress=s,this.taskName=t,this._progressMap=new Map,this._startTime=void 0,this._timingsMap=new Map,typeof e=="number"){this._weights={};for(let r=0;r<e;r++){const o=r,n=1/e;this._weights[o]=n,this._progressMap.set(o,0)}}else this._weights=e;this.emitProgress()}emitProgress(){let e=0;for(const[s,t]of this._progressMap.entries())e+=t*this._weights[s];if(e===1&&A("enable-feature:esri-3dofl-upload-timings")){const s=Math.round(performance.now()-(this._startTime??0))/1e3;console.log(`${this.taskName} done in ${s} sec`);for(const[t,r]of this._timingsMap){const o=Math.round(r.end-r.start)/1e3,n=Math.round(o/s*100);console.log(this.taskName??"Task",{stepKey:t,stepTime:o,relativeTime:n})}}this.onProgress(e)}setProgress(e,s){if(this._progressMap.set(e,s),A("enable-feature:esri-3dofl-upload-timings")){const t=performance.now();this._startTime??=t;const r=Y(this._timingsMap,e,()=>({start:t,end:0}));s===1&&(r.end=t)}this.emitProgress()}simulate(e,s){return E(t=>this.setProgress(e,t),s)}makeOnProgress(e){return s=>this.setProgress(e,s)}};function E(e=t=>{},s=De){const t=performance.now();e(0);const r=setInterval(()=>{const o=performance.now()-t,n=1-Math.exp(-o/s);e(n)},xe);return Z(()=>{clearInterval(r),e(1)})}function Me(e,s=Ne){return D(I(e*O/s))}function Fe(e,s=Se){return D(I(e*O/s))}const Ne=10,Se=10,O=8e-6,xe=v(50),De=v(1e3),R=1e6,x=20*R,Ie=2e9,_e=3;async function ke({data:e,name:s,description:t},r,o){let n=null;try{const a=h(r,"uploads"),i=h(a,"info"),{data:u}=await f(i,{query:{f:"json"},responseType:"json"});l(o);const d=he(r),g=u.maxUploadFileSize*R,m=d?Ie:g,c=d?Math.min(x,g):x;if(e.size>m)throw new Error("Data too large");const L=h(a,"register"),{data:M}=await f(L,{query:{f:"json",itemName:Ce(s),description:t},responseType:"json",method:"post"});if(l(o),!M.success)throw new Error("Registration failed");const{itemID:z}=M.item;n=h(a,z);const H=h(n,"uploadPart"),F=Math.ceil(e.size/c),y=new Array;for(let p=0;p<F;++p)y.push(e.slice(p*c,Math.min((p+1)*c,e.size)));const P=y.slice().reverse(),N=new Array,J=w(F,o?.onProgress,"uploadItem"),G=async()=>{for(;P.length!==0;){const p=y.length-P.length,b=P.pop(),T=new FormData,W=J.simulate(p,Me(b.size));try{T.append("f","json"),T.append("file",b),T.append("partId",`${p}`);const{data:V}=await f(H,{timeout:0,body:T,responseType:"json",method:"post"});if(l(o),!V.success)throw new Error("Part upload failed")}finally{W.remove()}}};for(let p=0;p<_e&&P.length!==0;++p)N.push(G());await Promise.all(N);const K=h(n,"commit"),{data:S}=await f(K,{query:{f:"json",parts:y.map((p,b)=>b).join(",")},responseType:"json",method:"post"});if(l(o),!S.success)throw new Error("Commit failed");return S.item}catch(a){if(n!=null){const i=h(n,"delete");await f(i,{query:{f:"json"},responseType:"json",method:"post"})}throw a}}function Ce(e){return e.replaceAll("/","_").replaceAll("\\","_")}async function ys(e,s,t){const r=e.length;if(!r)return t?.onProgress?.(1),[];const o=w(r,t?.onProgress,"uploadAssets");return Promise.all(e.map((n,a)=>Ee(n,s,{...t,onProgress:o.makeOnProgress(a)})))}async function Ee(e,{layer:s,ongoingUploads:t},r){const o=t.get(e);if(o)return o;if(!Ze(s))throw new ie;if(Oe(e,s))return r?.onProgress?.(1),e;const n=Re(e,s,r);t.set(e,n);try{await n}finally{t.delete(e)}return e}function Oe(e,s){const{parsedUrl:t}=s;return t!=null&&e.metadata.externalSources.some(r=>oe(r,t))}async function Re(e,s,t){const{metadata:r}=e,{displaySource:o}=r,n=$(o?.source,s,{checkForConversionRequired:A("enable-feature:georeferenced-uploads")}),a=n!=null?$e(n,s,t):r.externalSources.length>0?Be(e,s,t):Ue(e,s,t),i=await a;return l(t),e.addExternalSources([i]),e}async function $e(e,s,t){return{source:await B(e,s,t),original:!0,unitConversionDisabled:!0}}async function Be(e,s,t){const r=q(s),{externalSources:o}=e.metadata,n=Le(o,s);if(!n)throw new ce;const a=w(j.uploadConvertibleSource,t?.onProgress,"uploadConvertibleSource"),i=await B(n,s,{onProgress:a.makeOnProgress("uploadEditSource")});e.addExternalSources([{source:i,original:!0}]);const u=n.reduce((g,{asset:m})=>m instanceof File?g+m.size:g,0),d=a.simulate("serviceAssetsToGlb",Fe(u));try{const{source:g,transform:m,origin:c}=await Ve(i,s,r);return e.transform=m,c&&(e.metadata.georeferenced=!0,t?.useAssetOrigin&&(e.vertexSpace.origin=[c.x,c.y,c.z??0],e.spatialReference=c.spatialReference)),{source:g,unitConversionDisabled:!0}}finally{d.remove()}}async function Ue(e,s,t){const r=w(j.uploadLocalMesh,t?.onProgress,"uploadLocalMesh"),o=qe(e,s,{...t,onProgress:r.makeOnProgress("meshToAssetBlob")});return{source:await U([o],s,{...t,onProgress:r.makeOnProgress("uploadAssetBlobs")}),extent:e.extent.clone(),original:!0}}async function qe(e,s,t){const r=q(s),o=await e.load(t),n=await o.toBinaryGLTF({origin:o.origin,signal:t?.signal,ignoreLocalTransform:!0,unitConversionDisabled:!0});return l(t),{blob:new Blob([n],{type:"model/gltf-binary"}),assetName:`${re()}.glb`,assetType:r}}function Le(e,s){for(const t of e){const r=$(t.source,s);if(r)return r}return null}function $(e,{infoFor3D:s},t={}){if(!e)return null;const{supportedFormats:r,editFormats:o}=s,n=ae(e),a=new Array,i=we(s),u=ye(s);let d=!1;for(const g of n){const m=ze(g,r);if(!m)return null;const{assetType:c}=m;if(t.checkForConversionRequired&&(c===i||c===u))return null;o.includes(c)&&(d=!0),a.push(m)}return d?a:null}function ze(e,s){const t=ne(e,s);return t?{asset:e,assetType:t}:null}async function B(e,s,t){return U(e.map(r=>He(r,t)),s,t)}async function U(e,s,t){const r=w(j.uploadAssetBlobs,t?.onProgress,"uploadAssetBlobs"),o=await Ge(e,s,{...t,onProgress:r.makeOnProgress("prepareAssetItems")});l(t);const n=o.map(({item:i})=>i),{uploadResults:a}=await Ke(n,s,{...t,onProgress:r.makeOnProgress("uploadAssetItems")});return l(t),e.map((i,u)=>We(o[u],a[u],s))}async function He(e,s){const{asset:t,assetType:r}=e;if(t instanceof File)return{blob:t,assetName:t.name,assetType:r};const o=await t.toBlob(s);return l(s),{blob:o,assetName:t.assetName,assetType:r}}async function Je(e,s,t){const{blob:r,assetType:o,assetName:n}=e;let a=null;try{const i=await ke({data:r,name:n},s.url,t);l(t),a={assetType:o,assetUploadId:i.itemID}}catch(i){ee(i),es().warnOnce(`Service ${s.url} does not support the REST Uploads API.`)}if(!a){const i=await se(r);if(l(t),!i.isBase64)throw new de;a={assetType:o,assetData:i.data}}if(!a)throw new ge;return{item:a,assetName:n}}function Ge(e,s,t){const r=w(e.length,t?.onProgress,"prepareAssetItems");return Promise.all(e.map(async(o,n)=>{const a=Je(await o,s,{...t,onProgress:r.makeOnProgress(n)});return l(t),a}))}async function Ke(e,s,t){const r=E(t?.onProgress);try{const o=await f(h(s.parsedUrl.path,"uploadAssets"),{timeout:0,query:{f:"json",assets:JSON.stringify(e)},method:"post",responseType:"json"});if(l(t),o.data.uploadResults.length!==e.length)throw new le(e.length,o.data.uploadResults.length);return o.data}finally{r.remove()}}function We(e,s,t){const{success:r}=s;if(!r){const{error:d}=s;throw new ue(e.assetName,d)}const{assetHash:o}=s,{assetName:n,item:{assetType:a}}=e,{infoFor3D:{supportedFormats:i}}=t,u=Pe(a,i);if(!u)throw new C(a);return new _(n,u,[new k(`${t.parsedUrl.path}/assets/${o}`,o)])}async function Ve(e,s,t){const r=e.map(({assetName:n,parts:a})=>({assetName:n,assetHash:a[0].partHash}));let o;try{const n=h(s.parsedUrl.path,"convert3D"),a=s.capabilities?.operations.supportsAsyncConvert3D;o=(await(a?Ye:Qe)(n,{query:{f:"json",assets:JSON.stringify(r),transportType:"esriTransportTypeUrl",targetFormat:t,async:a},responseType:"json",timeout:0})).data}catch{throw new pe}return Xe(s,o)}function Xe(e,s){const t={source:s.assets.map(r=>{const o=be(r.contentType,e.infoFor3D.supportedFormats);if(!o)throw new C(o);return new _(r.assetName,r.contentType,[new k(r.assetURL,r.assetHash)])}),origin:void 0,transform:void 0};if(A("enable-feature:georeferenced-uploads")&&s.transform){if(t.transform=Ae(s.transform),s.spatialReference){const r=X.fromJSON(s.spatialReference);t.origin=ve(s.transform,r)}}else t.transform=me(e.spatialReference);return t}function Qe(e,s){return f(e,s)}async function Ye(e,s){const t=(await f(e,s)).data.statusUrl;for(;;){const r=(await f(t,{query:{f:"json"},responseType:"json"})).data;switch(r.status){case"Completed":return f(r.resultUrl,{query:{f:"json"},responseType:"json"});case"CompletedWithErrors":throw new Error(r.status);case"Failed ImportChanges":case"InProgress":case"Pending":case"ExportAttachments":case"ExportChanges":case"ExportingData":case"ExportingSnapshot":case"ImportAttachments":case"ProvisioningReplica":case"UnRegisteringReplica":break;default:throw new Error}await Q(ss)}}function Ze(e){return!!e.infoFor3D&&!!e.url}function q({infoFor3D:e}){const s=Te(e);if(!s)throw new fe;return s}function es(){return te.getLogger("esri.layers.graphics.sources.support.uploadAssets")}const ss=v(1e3);export{ys as uploadAssets};
