import{a1 as N,o as i,d7 as Q,eh as W,k7 as Z,an as ee,Y as te,bf as B}from"./main-CaWWi_jZ.js";import{t as $,o as A}from"./mat4f64-Dn1WEGBx-C99QVUMW.js";import{M as E,G as O,I as u,T as x}from"./enums-DBi1-Mm2-CUS1pvQe.js";import{m as k}from"./Version-CoKzbupV-BgDSkAuF.js";import{L as re,B as oe,H as se,V as ne,N as ae}from"./mat4-DX7gBViE-CznOV6K4.js";import{j as ie}from"./quat-BODLR7mS-CCUcK7eH.js";import{e as ue}from"./quatf64-C16JxGFv-BKWK1F8U.js";import{p as Y,P as le,x as ce,j as fe,S as de,I as pe,N as me,w as he,O as Te,l as R,X as P,L as we,C as ge,g as xe,M as be}from"./BufferView-PQoE3GL7-TcOrQZI-.js";import{h as ye,d as _e,l as Se,f as Ne}from"./resourceUtils-Ds65naCv-CBkf38t4.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./vec32-D9GsKZ1t-CS2r7p5V.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./basicInterfaces-Dsf65ICa-DkQ9Rsnx.js";function S(o,e){const r=o.count;e||(e=new o.TypedArrayConstructor(r));for(let t=0;t<r;t++)e[t]=o.get(t);return e}Object.freeze(Object.defineProperty({__proto__:null,makeDense:S},Symbol.toStringTag,{value:"Module"}));function Ee(o={}){return{color:[1,1,1],opacity:1,alphaMode:"OPAQUE",alphaCutoff:.5,doubleSided:!1,castShadows:!0,receiveShadows:!0,receiveAmbientOcclustion:!0,textureColor:null,textureNormal:null,textureOcclusion:null,textureEmissive:null,textureMetallicRoughness:null,colorTextureTransform:null,normalTextureTransform:null,occlusionTextureTransform:null,emissiveTextureTransform:null,metallicRoughnessTextureTransform:null,emissiveFactor:[0,0,0],metallicFactor:1,roughnessFactor:1,colorMixMode:"multiply",...o}}function Oe(o,e={}){return{data:o,parameters:{wrap:{s:O.REPEAT,t:O.REPEAT,...e.wrap},noUnpackFlip:!0,mipmap:!1,...e}}}let G=class{constructor(o){this._data=o,this._offset4=0,this._dataUint32=new Uint32Array(this._data,0,Math.floor(this._data.byteLength/4))}readUint32(){const o=this._offset4;return this._offset4+=1,this._dataUint32[o]}readUint8Array(o){const e=4*this._offset4;return this._offset4+=o/4,new Uint8Array(this._data,e,o)}remainingBytes(){return this._data.byteLength-4*this._offset4}};var b,j;(function(o){o.SCALAR="SCALAR",o.VEC2="VEC2",o.VEC3="VEC3",o.VEC4="VEC4",o.MAT2="MAT2",o.MAT3="MAT3",o.MAT4="MAT4"})(b||(b={})),function(o){o[o.ARRAY_BUFFER=34962]="ARRAY_BUFFER",o[o.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER"}(j||(j={}));const K={baseColorFactor:[1,1,1,1],metallicFactor:1,roughnessFactor:1},Re={pbrMetallicRoughness:K,emissiveFactor:[0,0,0],alphaMode:"OPAQUE",alphaCutoff:.5,doubleSided:!1},Ae={ESRI_externalColorMixMode:"tint",ESRI_receiveShadows:!0,ESRI_receiveAmbientOcclusion:!0},H=(o={})=>{const e={...K,...o.pbrMetallicRoughness},r=Ce({...Ae,...o.extras});return{...Re,...o,pbrMetallicRoughness:e,extras:r}};function Ce(o){switch(o.ESRI_externalColorMixMode){case"multiply":case"tint":case"ignore":case"replace":break;default:o.ESRI_externalColorMixMode="tint"}return o}const ve={magFilter:E.LINEAR,minFilter:E.LINEAR_MIPMAP_LINEAR,wrapS:O.REPEAT,wrapT:O.REPEAT},Ie=o=>({...ve,...o});function Me(o){let e,r;return o.replace(/^(.*\/)?([^/]*)$/,(t,s,n)=>(e=s||"",r=n||"","")),{dirPart:e,filePart:r}}const y={MAGIC:1179937895,CHUNK_TYPE_JSON:1313821514,CHUNK_TYPE_BIN:5130562,MIN_HEADER_LENGTH:20};class h{constructor(e,r,t,s){if(this._context=e,this.uri=r,this.json=t,this._glbBuffer=s,this._bufferLoaders=new Map,this._textureLoaders=new Map,this._textureCache=new Map,this._materialCache=new Map,this._nodeParentMap=new Map,this._nodeTransformCache=new Map,this._supportedExtensions=["KHR_texture_basisu","KHR_texture_transform"],this._baseUri=Me(this.uri).dirPart,this._checkVersionSupported(),this._checkRequiredExtensionsSupported(),t.scenes==null)throw new i("gltf-loader-unsupported-feature","Scenes must be defined.");if(t.meshes==null)throw new i("gltf-loader-unsupported-feature","Meshes must be defined");if(t.nodes==null)throw new i("gltf-loader-unsupported-feature","Nodes must be defined.");this._computeNodeParents()}static async load(e,r,t){if(Q(r)){const a=W(r);if(a&&a.mediaType!=="model/gltf-binary")try{const f=JSON.parse(a.isBase64?atob(a.data):a.data);return new h(e,r,f)}catch{}const c=Z(r);if(h._isGLBData(c))return this._fromGLBData(e,r,c)}if(Pe.test(r)||t?.expectedType==="gltf"){const a=await e.loadJSON(r,t);return new h(e,r,a)}const s=await e.loadBinary(r,t);if(h._isGLBData(s))return this._fromGLBData(e,r,s);if(Ge.test(r)||t?.expectedType==="glb")throw new i("gltf-loader-invalid-glb","This is not a valid glb file.");const n=await e.loadJSON(r,t);return new h(e,r,n)}static _isGLBData(e){if(e==null)return!1;const r=new G(e);return r.remainingBytes()>=4&&r.readUint32()===y.MAGIC}static async _fromGLBData(e,r,t){const s=await h._parseGLBData(t);return new h(e,r,s.json,s.binaryData)}static async _parseGLBData(e){const r=new G(e);if(r.remainingBytes()<12)throw new i("gltf-loader-error","glb binary data is insufficiently large.");const t=r.readUint32(),s=r.readUint32(),n=r.readUint32();if(t!==y.MAGIC)throw new i("gltf-loader-error","Magic first 4 bytes do not fit to expected glb value.");if(e.byteLength<n)throw new i("gltf-loader-error","glb binary data is smaller than header specifies.");if(s!==2)throw new i("gltf-loader-unsupported-feature","An unsupported glb container version was detected. Only version 2 is supported.");let a,c,f=0;for(;r.remainingBytes()>=8;){const d=r.readUint32(),p=r.readUint32();if(f===0){if(p!==y.CHUNK_TYPE_JSON)throw new i("gltf-loader-error","First glb chunk must be JSON.");if(d<0)throw new i("gltf-loader-error","No JSON data found.");a=await ye(r.readUint8Array(d))}else if(f===1){if(p!==y.CHUNK_TYPE_BIN)throw new i("gltf-loader-unsupported-feature","Second glb chunk expected to be BIN.");c=r.readUint8Array(d)}else N.getLogger("esri.views.3d.glTF").warn("[Unsupported Feature] More than 2 glb chunks detected. Skipping.");f+=1}if(!a)throw new i("gltf-loader-error","No glb JSON chunk detected.");return{json:a,binaryData:c}}async getBuffer(e,r){const t=this.json.buffers[e];if(t.uri==null){if(this._glbBuffer==null)throw new i("gltf-loader-error","glb buffer not present");return this._glbBuffer}const s=await this._getBufferLoader(e,r);if(s.byteLength!==t.byteLength)throw new i("gltf-loader-error","Buffer byte lengths should match.");return s}async _getBufferLoader(e,r){const t=this._bufferLoaders.get(e);if(t)return t;const s=this.json.buffers[e].uri,n=this._context.loadBinary(this._resolveUri(s),r).then(a=>new Uint8Array(a));return this._bufferLoaders.set(e,n),n}async getAccessor(e,r){if(!this.json.accessors)throw new i("gltf-loader-unsupported-feature","Accessors missing.");const t=this.json.accessors[e];if(t?.bufferView==null)throw new i("gltf-loader-unsupported-feature","Some accessor does not specify a bufferView.");if(t.type in[b.MAT2,b.MAT3,b.MAT4])throw new i("gltf-loader-unsupported-feature",`AttributeType ${t.type} is not supported`);const s=this.json.bufferViews[t.bufferView],n=await this.getBuffer(s.buffer,r),a=Ue[t.type],c=De[t.componentType],f=a*c,d=s.byteStride||f;return{raw:n.buffer,byteStride:d,byteOffset:n.byteOffset+(s.byteOffset||0)+(t.byteOffset||0),entryCount:t.count,isDenselyPacked:d===f,componentCount:a,componentByteSize:c,componentType:t.componentType,min:t.min,max:t.max,normalized:!!t.normalized}}async getIndexData(e,r){if(e.indices==null)return;const t=await this.getAccessor(e.indices,r);if(t.isDenselyPacked)switch(t.componentType){case u.UNSIGNED_BYTE:return new Uint8Array(t.raw,t.byteOffset,t.entryCount);case u.UNSIGNED_SHORT:return new Uint16Array(t.raw,t.byteOffset,t.entryCount);case u.UNSIGNED_INT:return new Uint32Array(t.raw,t.byteOffset,t.entryCount)}else switch(t.componentType){case u.UNSIGNED_BYTE:return S(m(Te,t));case u.UNSIGNED_SHORT:return S(m(he,t));case u.UNSIGNED_INT:return S(m(me,t))}}async getPositionData(e,r){if(e.attributes.POSITION==null)throw new i("gltf-loader-unsupported-feature","No POSITION vertex data found.");const t=await this.getAccessor(e.attributes.POSITION,r);if(t.componentType!==u.FLOAT)throw new i("gltf-loader-unsupported-feature","Expected type FLOAT for POSITION vertex attribute, but found "+u[t.componentType]);if(t.componentCount!==3)throw new i("gltf-loader-unsupported-feature","POSITION vertex attribute must have 3 components, but found "+t.componentCount.toFixed());return m(R,t)}async getNormalData(e,r){if(e.attributes.NORMAL==null)throw new i("gltf-loader-error","No NORMAL vertex data found.");const t=await this.getAccessor(e.attributes.NORMAL,r);if(t.componentType!==u.FLOAT)throw new i("gltf-loader-unsupported-feature","Expected type FLOAT for NORMAL vertex attribute, but found "+u[t.componentType]);if(t.componentCount!==3)throw new i("gltf-loader-unsupported-feature","NORMAL vertex attribute must have 3 components, but found "+t.componentCount.toFixed());return m(R,t)}async getTangentData(e,r){if(e.attributes.TANGENT==null)throw new i("gltf-loader-error","No TANGENT vertex data found.");const t=await this.getAccessor(e.attributes.TANGENT,r);if(t.componentType!==u.FLOAT)throw new i("gltf-loader-unsupported-feature","Expected type FLOAT for TANGENT vertex attribute, but found "+u[t.componentType]);if(t.componentCount!==4)throw new i("gltf-loader-unsupported-feature","TANGENT vertex attribute must have 4 components, but found "+t.componentCount.toFixed());return m(P,t)}async getTextureCoordinates(e,r){if(e.attributes.TEXCOORD_0==null)throw new i("gltf-loader-error","No TEXCOORD_0 vertex data found.");const t=await this.getAccessor(e.attributes.TEXCOORD_0,r);if(t.componentCount!==2)throw new i("gltf-loader-unsupported-feature","TEXCOORD_0 vertex attribute must have 2 components, but found "+t.componentCount.toFixed());if(t.componentType===u.FLOAT)return m(Y,t);if(!t.normalized)throw new i("gltf-loader-unsupported-feature","Integer component types are only supported for a normalized accessor for TEXCOORD_0.");return Be(t)}async getVertexColors(e,r){if(e.attributes.COLOR_0==null)throw new i("gltf-loader-error","No COLOR_0 vertex data found.");const t=await this.getAccessor(e.attributes.COLOR_0,r);if(t.componentCount!==4&&t.componentCount!==3)throw new i("gltf-loader-unsupported-feature","COLOR_0 attribute must have 3 or 4 components, but found "+t.componentCount.toFixed());if(t.componentCount===4){if(t.componentType===u.FLOAT)return m(P,t);if(t.componentType===u.UNSIGNED_BYTE)return m(we,t);if(t.componentType===u.UNSIGNED_SHORT)return m(ge,t)}else if(t.componentCount===3){if(t.componentType===u.FLOAT)return m(R,t);if(t.componentType===u.UNSIGNED_BYTE)return m(xe,t);if(t.componentType===u.UNSIGNED_SHORT)return m(be,t)}throw new i("gltf-loader-unsupported-feature","Unsupported component type for COLOR_0 attribute: "+u[t.componentType])}hasPositions(e){return e.attributes.POSITION!==void 0}hasNormals(e){return e.attributes.NORMAL!==void 0}hasVertexColors(e){return e.attributes.COLOR_0!==void 0}hasTextureCoordinates(e){return e.attributes.TEXCOORD_0!==void 0}hasTangents(e){return e.attributes.TANGENT!==void 0}async getMaterial(e,r,t){let s=e.material?this._materialCache.get(e.material):void 0;if(!s){const n=e.material!=null?H(this.json.materials[e.material]):H(),a=n.pbrMetallicRoughness,c=this.hasVertexColors(e),f=this.getTexture(a.baseColorTexture,r),d=this.getTexture(n.normalTexture,r),p=t?this.getTexture(n.occlusionTexture,r):void 0,l=t?this.getTexture(n.emissiveTexture,r):void 0,w=t?this.getTexture(a.metallicRoughnessTexture,r):void 0,T=e.material!=null?e.material:-1;s={alphaMode:n.alphaMode,alphaCutoff:n.alphaCutoff,color:a.baseColorFactor,doubleSided:!!n.doubleSided,colorTexture:await f,normalTexture:await d,name:n.name,id:T,occlusionTexture:await p,emissiveTexture:await l,emissiveFactor:n.emissiveFactor,metallicFactor:a.metallicFactor,roughnessFactor:a.roughnessFactor,metallicRoughnessTexture:await w,hasVertexColors:c,ESRI_externalColorMixMode:n.extras.ESRI_externalColorMixMode,colorTextureTransform:a?.baseColorTexture?.extensions?.KHR_texture_transform,normalTextureTransform:n.normalTexture?.extensions?.KHR_texture_transform,occlusionTextureTransform:n.occlusionTexture?.extensions?.KHR_texture_transform,emissiveTextureTransform:n.emissiveTexture?.extensions?.KHR_texture_transform,metallicRoughnessTextureTransform:a?.metallicRoughnessTexture?.extensions?.KHR_texture_transform,receiveAmbientOcclusion:n.extras.ESRI_receiveAmbientOcclusion,receiveShadows:n.extras.ESRI_receiveShadows}}return s}async getTexture(e,r){if(!e)return;if((e.texCoord||0)!==0)throw new i("gltf-loader-unsupported-feature","Only TEXCOORD with index 0 is supported.");const t=e.index,s=this.json.textures[t],n=Ie(s.sampler!=null?this.json.samplers[s.sampler]:{}),a=V(s),c=this.json.images[a],f=await this._loadTextureImageData(t,s,r);return ee(this._textureCache,t,()=>{const d=l=>l===33071||l===33648||l===10497,p=l=>{throw new i("gltf-loader-error",`Unexpected TextureSampler WrapMode: ${l}`)};return{data:f,wrapS:d(n.wrapS)?n.wrapS:p(n.wrapS),wrapT:d(n.wrapT)?n.wrapT:p(n.wrapT),minFilter:n.minFilter,name:c.name,id:t}})}getNodeTransform(e){if(e===void 0)return Le;let r=this._nodeTransformCache.get(e);if(!r){const t=this.getNodeTransform(this._getNodeParent(e)),s=this.json.nodes[e];s.matrix?r=oe($(),t,s.matrix):s.translation||s.rotation||s.scale?(r=A(t),s.translation&&se(r,r,s.translation),s.rotation&&(_[3]=ie(_,s.rotation),ne(r,r,_[3],_)),s.scale&&ae(r,r,s.scale)):r=A(t),this._nodeTransformCache.set(e,r)}return r}_resolveUri(e){return te(e,this._baseUri)}_getNodeParent(e){return this._nodeParentMap.get(e)}_checkVersionSupported(){const e=k.parse(this.json.asset.version,"glTF");Fe.validate(e)}_checkRequiredExtensionsSupported(){const e=this.json;if(e.extensionsRequired&&!e.extensionsRequired.every(r=>this._supportedExtensions.includes(r)))throw new i("gltf-loader-unsupported-feature","gltf loader was not able to load unsupported feature. Required extensions: "+e.extensionsRequired.join(", "))}_computeNodeParents(){this.json.nodes.forEach((e,r)=>{e.children&&e.children.forEach(t=>{this._nodeParentMap.set(t,r)})})}async _loadTextureImageData(e,r,t){const s=this._textureLoaders.get(e);if(s)return s;const n=this._createTextureLoader(r,t);return this._textureLoaders.set(e,n),n}async _createTextureLoader(e,r){const t=V(e),s=this.json.images[t];if(s.uri){if(s.uri.endsWith(".ktx2")){const f=await this._context.loadBinary(this._resolveUri(s.uri),r);return new _e(new Uint8Array(f))}return this._context.loadImage(this._resolveUri(s.uri),r)}if(s.bufferView==null)throw new i("gltf-loader-unsupported-feature","Image bufferView must be defined.");if(s.mimeType==null)throw new i("gltf-loader-unsupported-feature","Image mimeType must be defined.");const n=this.json.bufferViews[s.bufferView],a=await this.getBuffer(n.buffer,r);if(n.byteStride!=null)throw new i("gltf-loader-unsupported-feature","byteStride not supported for image buffer");const c=a.byteOffset+(n.byteOffset||0);return Se(new Uint8Array(a.buffer,c,n.byteLength),s.mimeType)}async getLoadedBuffersSize(){if(this._glbBuffer)return this._glbBuffer.byteLength;const e=await B(Array.from(this._bufferLoaders.values())),r=await B(Array.from(this._textureLoaders.values()));return e.reduce((t,s)=>t+(s?.byteLength??0),0)+r.reduce((t,s)=>t+(s?Ne(s)?s.data.byteLength:s.width*s.height*4:0),0)}}const Le=re($(),Math.PI/2),Fe=new k(2,0,"glTF"),_=ue(),Ue={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},De={[u.BYTE]:1,[u.UNSIGNED_BYTE]:1,[u.SHORT]:2,[u.UNSIGNED_SHORT]:2,[u.HALF_FLOAT]:2,[u.FLOAT]:4,[u.INT]:4,[u.UNSIGNED_INT]:4};function Be(o){switch(o.componentType){case u.BYTE:return new pe(o.raw,o.byteOffset,o.byteStride,o.byteOffset+o.byteStride*o.entryCount);case u.UNSIGNED_BYTE:return new de(o.raw,o.byteOffset,o.byteStride,o.byteOffset+o.byteStride*o.entryCount);case u.SHORT:return new fe(o.raw,o.byteOffset,o.byteStride,o.byteOffset+o.byteStride*o.entryCount);case u.UNSIGNED_SHORT:return new ce(o.raw,o.byteOffset,o.byteStride,o.byteOffset+o.byteStride*o.entryCount);case u.UNSIGNED_INT:return new le(o.raw,o.byteOffset,o.byteStride,o.byteOffset+o.byteStride*o.entryCount);case u.FLOAT:return new Y(o.raw,o.byteOffset,o.byteStride,o.byteOffset+o.byteStride*o.entryCount)}}function m(o,e){return new o(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*(e.entryCount-1)+e.componentByteSize*e.componentCount)}function V(o){if(o.extensions?.KHR_texture_basisu!=null)return o.extensions.KHR_texture_basisu.source;if(o.source!==null)return o.source;throw new i("gltf-loader-unsupported-feature","Source is expected to be defined for a texture. It can also be omitted in favour of an KHR_texture_basisu extension tag.")}const Pe=/\.gltf$/i,Ge=/\.glb$/i;let je=0;async function it(o,e,r={},t=!0){const s=await h.load(o,e,r),n="gltf_"+je++,a={lods:[],materials:new Map,textures:new Map,meta:He(s)},c=!(!s.json.asset.extras||s.json.asset.extras.ESRI_type!=="symbolResource"),f=s.json.asset.extras?.ESRI_webstyleSymbol?.webstyle,d=new Map;await Ve(s,async(l,w,T,C)=>{const v=d.get(T)??0;d.set(T,v+1);const g=l.mode!==void 0?l.mode:x.TRIANGLES,I=g===x.TRIANGLES||g===x.TRIANGLE_STRIP||g===x.TRIANGLE_FAN?g:null;if(I==null)return void N.getLogger("esri.views.3d.glTF").warn("[Unsupported Feature] Unsupported primitive mode ("+x[g]+"). Skipping primitive.");if(!s.hasPositions(l))return void N.getLogger("esri.views.3d.glTF").warn("Skipping primitive without POSITION vertex attribute.");const z=s.getPositionData(l,r),J=s.getMaterial(l,r,t),M=s.hasNormals(l)?s.getNormalData(l,r):null,L=s.hasTangents(l)?s.getTangentData(l,r):null,F=s.hasTextureCoordinates(l)?s.getTextureCoordinates(l,r):null,U=s.hasVertexColors(l)?s.getVertexColors(l,r):null,X=s.getIndexData(l,r),q={name:C,transform:A(w),attributes:{position:await z,normal:M?await M:null,texCoord0:F?await F:null,color:U?await U:null,tangent:L?await L:null},indices:await X,primitiveType:I,material:ke(a,await J,n)};let D=null;a.meta?.ESRI_lod!=null&&a.meta.ESRI_lod.metric==="screenSpaceRadius"&&(D=a.meta.ESRI_lod.thresholds[T]),a.lods[T]=a.lods[T]||{parts:[],name:C,lodThreshold:D},a.lods[T].parts[v]=q});for(const l of a.lods)l.parts=l.parts.filter(w=>!!w);const p=await s.getLoadedBuffersSize();return{model:a,meta:{isEsriSymbolResource:c,uri:s.uri,ESRI_webstyle:f},customMeta:{},size:p}}function He(o){const e=o.json;let r=null;return e.nodes.forEach(t=>{const s=t.extras;s!=null&&(s.ESRI_proxyEllipsoid||s.ESRI_lod)&&(r=s)}),r}async function Ve(o,e){const r=o.json,t=r.scenes[r.scene||0].nodes,s=t.length>1,n=[];for(const c of t){const f=r.nodes[c];n.push(a(c,0)),$e(f)&&!s&&f.extensions.MSFT_lod.ids.forEach((d,p)=>a(d,p+1))}async function a(c,f){const d=r.nodes[c],p=o.getNodeTransform(c);if(d.weights!=null&&N.getLogger("esri.views.3d.glTF").warn("[Unsupported Feature] Morph targets are not supported."),d.mesh!=null){const l=r.meshes[d.mesh];for(const w of l.primitives)n.push(e(w,p,f,l.name))}for(const l of d.children||[])n.push(a(l,f))}await Promise.all(n)}function $e(o){return o.extensions?.MSFT_lod&&Array.isArray(o.extensions.MSFT_lod.ids)}function ke(o,e,r){const t=n=>{const a=`${r}_tex_${n&&n.id}${n?.name?"_"+n.name:""}`;if(n&&!o.textures.has(a)){const c=Oe(n.data,{wrap:{s:n.wrapS,t:n.wrapT},mipmap:Ye.has(n.minFilter),noUnpackFlip:!0});o.textures.set(a,c)}return a},s=`${r}_mat_${e.id}_${e.name}`;if(!o.materials.has(s)){const n=Ee({color:[e.color[0],e.color[1],e.color[2]],opacity:e.color[3],alphaMode:e.alphaMode,alphaCutoff:e.alphaCutoff,doubleSided:e.doubleSided,colorMixMode:e.ESRI_externalColorMixMode,textureColor:e.colorTexture?t(e.colorTexture):void 0,textureNormal:e.normalTexture?t(e.normalTexture):void 0,textureOcclusion:e.occlusionTexture?t(e.occlusionTexture):void 0,textureEmissive:e.emissiveTexture?t(e.emissiveTexture):void 0,textureMetallicRoughness:e.metallicRoughnessTexture?t(e.metallicRoughnessTexture):void 0,emissiveFactor:[e.emissiveFactor[0],e.emissiveFactor[1],e.emissiveFactor[2]],colorTextureTransform:e.colorTextureTransform,normalTextureTransform:e.normalTextureTransform,occlusionTextureTransform:e.occlusionTextureTransform,emissiveTextureTransform:e.emissiveTextureTransform,metallicRoughnessTextureTransform:e.metallicRoughnessTextureTransform,metallicFactor:e.metallicFactor,roughnessFactor:e.roughnessFactor,receiveShadows:e.receiveShadows,receiveAmbientOcclustion:e.receiveAmbientOcclusion});o.materials.set(s,n)}return s}const Ye=new Set([E.LINEAR_MIPMAP_LINEAR,E.LINEAR_MIPMAP_NEAREST]);export{it as loadGLTF};
