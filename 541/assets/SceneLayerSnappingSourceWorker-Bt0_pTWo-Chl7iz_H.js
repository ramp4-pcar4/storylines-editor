import{v as C,i as v,dU as p,$ as x,i8 as m}from"./main-B-qqJ5ov.js";import{j as h,g as f,N as l}from"./vec32-D9GsKZ1t-Cpv9XLxo.js";import{u as L,q as P,y as S}from"./lineSegment-CcqvCARM-C0AZuzC4.js";import{F as _,t as w,b as V}from"./sphere-BenPORjV-D7fb-jY0.js";import{y as b}from"./Octree-CJNwbhg4-yceOLup8.js";import{k as j}from"./edgeProcessing-CALv8P-b-CDh0BNkp.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./plane-Dt8R0KeE-cjZbO2Lx.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./quatf64-C16JxGFv-BKWK1F8U.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./mat4-DX7gBViE-wsQhA476.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./Util-BjGjeg6f-08Szkf4F.js";import"./deduplicate-D2d-E5Pw-Bhtp4l8k.js";import"./Indices-DEr2HrWx-C9AM9eK0.js";import"./InterleavedLayout-DXzw3B2n--yDACIEp.js";import"./BufferView-PQoE3GL7-BKyY1XmX.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./types-ChhhI6OU-Cxh6dPlX.js";import"./VertexAttribute-DqD5S0a2-3q90nikV.js";import"./glUtil-n1JOrdV3-CRAZdee5.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./VertexElementDescriptor-BAy1DPb3-BOhpDZGx.js";const I=1e3;function T(t,o,e){const i=V(),n=_(i);return l(n,n,t,.5),l(n,n,o,.5),i[3]=f(n,t),h(n,n,e),i}let g=class{constructor(){this._idToComponent=new Map,this._components=new b(t=>t.bounds),this._edges=new b(t=>t.bounds),this._tmpLineSegment=L(),this._tmpP1=p(),this._tmpP2=p(),this._tmpP3=p(),this.remoteClient=null}async fetchCandidates(t,o){await Promise.resolve(),x(o),await this._ensureEdgeLocations(t,o);const e=[];return this._edges.forEachNeighbor(i=>(this._addCandidates(t,i,e),e.length<I),t.bounds),{result:{candidates:e}}}async _ensureEdgeLocations(t,o){const e=[];if(this._components.forEachNeighbor(s=>{if(s.info==null){const{id:c,uid:r}=s;e.push({id:c,uid:r})}return!0},t.bounds),!e.length)return;const i={components:e},n=await this.remoteClient.invoke("fetchAllEdgeLocations",i,o??{});for(const s of n.components)this._setFetchEdgeLocations(s)}async add(t){const o=new u(t.id,t.bounds);return this._idToComponent.set(o.id,o),this._components.add([o]),{result:{}}}async remove(t){const o=this._idToComponent.get(t.id);if(o){const e=[];this._edges.forEachNeighbor(i=>(i.component===o&&e.push(i),!0),o.bounds),this._edges.remove(e),this._components.remove([o]),this._idToComponent.delete(o.id)}return{result:{}}}_setFetchEdgeLocations(t){const o=this._idToComponent.get(t.id);if(o==null||t.uid!==o.uid)return;const e=j.createView(t.locations),i=new Array(e.count),n=p(),s=p();for(let d=0;d<e.count;d++){e.position0.getVec(d,n),e.position1.getVec(d,s);const a=T(n,s,t.origin),y=new k(o,d,a);i[d]=y}this._edges.add(i);const{objectIds:c,origin:r}=t;o.info={locations:e,objectIds:c,origin:r}}_addCandidates(t,o,e){const{info:i}=o.component,{origin:n,objectIds:s}=i,c=i.locations,r=c.position0.getVec(o.index,this._tmpP1),d=c.position1.getVec(o.index,this._tmpP2);h(r,r,n),h(d,d,n);const a=s[c.componentIndex.get(o.index)];this._addEdgeCandidate(t,a,r,d,e),E(t,a,r,e),E(t,a,d,e)}_addEdgeCandidate(t,o,e,i,n){if(!t.returnEdge)return;const s=_(t.bounds),c=P(e,i,this._tmpLineSegment),r=S(c,s,this._tmpP3);w(t.bounds,r)&&n.push({type:"edge",objectId:o,target:m(r),distance:f(s,r),start:m(e),end:m(i)})}};g=C([v("esri.views.interactive.snapping.featureSources.sceneLayerSource.SceneLayerSnappingSourceWorker")],g);const rt=g;function E(t,o,e,i){if(!t.returnVertex||!w(t.bounds,e))return;const n=_(t.bounds);i.push({type:"vertex",objectId:o,target:m(e),distance:f(n,e)})}class u{constructor(o,e){this.id=o,this.bounds=e,this.info=null,this.uid=++u.uid}}u.uid=0;class k{constructor(o,e,i){this.component=o,this.index=e,this.bounds=i}}export{rt as default};
