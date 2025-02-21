import{K as $,o as p,a1 as Y}from"./main-DeZqmqPk.js";import{P as I,U as d,F as G,M as E,G as z,V as B,B as a,t as T,I as M,H as x,S as k}from"./enums-DBi1-Mm2-CUS1pvQe.js";const K=()=>Y.getLogger("esri.views.webgl.checkWebGLError");function q(t,e){switch(e){case t.INVALID_ENUM:return"Invalid Enum. An unacceptable value has been specified for an enumerated argument.";case t.INVALID_VALUE:return"Invalid Value. A numeric argument is out of range.";case t.INVALID_OPERATION:return"Invalid Operation. The specified command is not allowed for the current state.";case t.INVALID_FRAMEBUFFER_OPERATION:return"Invalid Framebuffer operation. The currently bound framebuffer is not framebuffer complete when trying to render to or to read from it.";case t.OUT_OF_MEMORY:return"Out of memory. Not enough memory is left to execute the command.";case t.CONTEXT_LOST_WEBGL:return"WebGL context has been lost";default:return"Unknown error"}}const X=!!$("enable-feature:webgl-debug");function H(){return X}function ce(){return X}function N(t){if(H()){const e=t.getError();if(e){const r=q(t,e),o=new Error().stack;K().error(new p("webgl-error","WebGL error occurred",{message:r,stack:o}))}}}var O;(function(t){t[t.Texture=0]="Texture",t[t.RenderBuffer=1]="RenderBuffer"})(O||(O={}));function j(t){switch(t){case M.BYTE:case M.UNSIGNED_BYTE:return 1;case M.SHORT:case M.UNSIGNED_SHORT:case M.HALF_FLOAT:return 2;case M.FLOAT:case M.INT:case M.UNSIGNED_INT:return 4}}function Q(t){const e=t.gl;switch(e.getError()){case e.NO_ERROR:return null;case e.INVALID_ENUM:return"An unacceptable value has been specified for an enumerated argument";case e.INVALID_VALUE:return"An unacceptable value has been specified for an argument";case e.INVALID_OPERATION:return"The specified command is not allowed for the current state";case e.INVALID_FRAMEBUFFER_OPERATION:return"The currently bound framebuffer is not framebuffer complete";case e.OUT_OF_MEMORY:return"Not enough memory is left to execute the command";case e.CONTEXT_LOST_WEBGL:return"WebGL context is lost"}return"Unknown error"}function le(t,e,r,o,s=0){const n=t.gl;t.bindBuffer(r);for(const i of o){const c=e.get(i.name);if(c==null){console.warn(`There is no location for vertex attribute '${i.name}' defined.`);continue}const _=s*i.stride;if(i.count<=4)n.vertexAttribPointer(c,i.count,i.type,i.normalized,i.stride,i.offset+_),n.enableVertexAttribArray(c),i.divisor>0&&t.gl.vertexAttribDivisor(c,i.divisor);else if(i.count===9)for(let l=0;l<3;l++)n.vertexAttribPointer(c+l,3,i.type,i.normalized,i.stride,i.offset+12*l+_),n.enableVertexAttribArray(c+l),i.divisor>0&&t.gl.vertexAttribDivisor(c+l,i.divisor);else if(i.count===16)for(let l=0;l<4;l++)n.vertexAttribPointer(c+l,4,i.type,i.normalized,i.stride,i.offset+16*l+_),n.enableVertexAttribArray(c+l),i.divisor>0&&t.gl?.vertexAttribDivisor(c+l,i.divisor);else console.error("Unsupported vertex attribute element count: "+i.count);if(H()){const l=Q(t),h=j(i.type),u=i.offset,m=Math.round(h/u)!==h/u?`. Offset not a multiple of stride. DataType requires ${h} bytes, but descriptor has an offset of ${u}`:"";l&&console.error(`Unable to bind vertex attribute "${i.name}" with baseInstanceOffset ${_}${m}:`,l,i)}}}function _e(t,e,r,o){const s=t.gl;t.bindBuffer(r);for(const n of o){const i=e.get(n.name);if(n.count<=4)s.disableVertexAttribArray(i),n.divisor&&n.divisor>0&&t.gl?.vertexAttribDivisor(i,0);else if(n.count===9)for(let c=0;c<3;c++)s.disableVertexAttribArray(i+c),n.divisor&&n.divisor>0&&t.gl?.vertexAttribDivisor(i+c,0);else if(n.count===16)for(let c=0;c<4;c++)s.disableVertexAttribArray(i+c),n.divisor&&n.divisor>0&&t.gl?.vertexAttribDivisor(i+c,0);else console.error("Unsupported vertex attribute element count: "+n.count)}t.unbindBuffer(k.ARRAY_BUFFER)}function Z(t){switch(t){case d.ALPHA:case d.LUMINANCE:case d.RED:case d.RED_INTEGER:case a.R8:case a.R8I:case a.R8UI:case a.R8_SNORM:case x.STENCIL_INDEX8:return 1;case d.LUMINANCE_ALPHA:case d.RG:case d.RG_INTEGER:case a.RGBA4:case a.R16F:case a.R16I:case a.R16UI:case a.RG8:case a.RG8I:case a.RG8UI:case a.RG8_SNORM:case a.RGB565:case a.RGB5_A1:case x.DEPTH_COMPONENT16:return 2;case d.DEPTH_COMPONENT:case d.RGB:case d.RGB_INTEGER:case a.RGB8:case a.RGB8I:case a.RGB8UI:case a.RGB8_SNORM:case a.SRGB8:case x.DEPTH_COMPONENT24:return 3;case d.DEPTH_STENCIL:case d.DEPTH24_STENCIL8:case d.RGBA:case d.RGBA_INTEGER:case a.RGBA8:case a.R32F:case a.R11F_G11F_B10F:case a.RG16F:case a.R32I:case a.R32UI:case a.RG16I:case a.RG16UI:case a.RGBA8I:case a.RGBA8UI:case a.RGBA8_SNORM:case a.SRGB8_ALPHA8:case a.RGB9_E5:case a.RGB10_A2UI:case a.RGB10_A2:case x.DEPTH_STENCIL:case x.DEPTH_COMPONENT32F:case x.DEPTH24_STENCIL8:return 4;case x.DEPTH32F_STENCIL8:return 5;case a.RGB16F:case a.RGB16I:case a.RGB16UI:return 6;case a.RG32F:case a.RG32I:case a.RG32UI:case a.RGBA16F:case a.RGBA16I:case a.RGBA16UI:return 8;case a.RGB32F:case a.RGB32I:case a.RGB32UI:return 12;case a.RGBA32F:case a.RGBA32I:case a.RGBA32UI:return 16;case T.COMPRESSED_RGB_S3TC_DXT1_EXT:case T.COMPRESSED_RGBA_S3TC_DXT1_EXT:return .5;case T.COMPRESSED_RGBA_S3TC_DXT3_EXT:case T.COMPRESSED_RGBA_S3TC_DXT5_EXT:return 1;case T.COMPRESSED_R11_EAC:case T.COMPRESSED_SIGNED_R11_EAC:case T.COMPRESSED_RGB8_ETC2:case T.COMPRESSED_SRGB8_ETC2:case T.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2:case T.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2:return .5;case T.COMPRESSED_RG11_EAC:case T.COMPRESSED_SIGNED_RG11_EAC:case T.COMPRESSED_RGBA8_ETC2_EAC:case T.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:return 1}return 0}let J=class{constructor(t=0,e=t){this.width=t,this.height=e,this.target=I.TEXTURE_2D,this.pixelFormat=d.RGBA,this.dataType=G.UNSIGNED_BYTE,this.samplingMode=E.LINEAR,this.wrapMode=z.REPEAT,this.maxAnisotropy=1,this.flipped=!1,this.hasMipmap=!1,this.isOpaque=!1,this.unpackAlignment=4,this.preMultiplyAlpha=!1,this.depth=1,this.isImmutable=!1}};function ee(t){return t.width<=0||t.height<=0?0:Math.round(t.width*t.height*(t.hasMipmap?4/3:1)*(t.internalFormat==null?4:Z(t.internalFormat))*(t.target===I.TEXTURE_CUBE_MAP?6:1))}class F extends J{constructor(e,r){switch(super(),this.context=e,Object.assign(this,r),this.internalFormat){case a.R16F:case a.R16I:case a.R16UI:case a.R32F:case a.R32I:case a.R32UI:case a.R8_SNORM:case a.R8:case a.R8I:case a.R8UI:this.pixelFormat=d.RED}}static validate(e,r){return new F(e,r)}}let te=class g{constructor(e,r=null,o=null){if(this.type=O.Texture,this._glName=null,this._samplingModeDirty=!1,this._wrapModeDirty=!1,this._wasImmutablyAllocated=!1,"context"in e)this._descriptor=e,o=r;else{const s=F.validate(e,r);if(!s)throw new p("Texture descriptor invalid");this._descriptor=s}this._descriptor.target===I.TEXTURE_CUBE_MAP?this._setDataCubeMap(o):this.setData(o)}get glName(){return this._glName}get descriptor(){return this._descriptor}get usedMemory(){return ee(this._descriptor)}get isDirty(){return this._samplingModeDirty||this._wrapModeDirty}dispose(){this._glName&&this._descriptor.context.instanceCounter.decrement(B.Texture,this),this._descriptor.context.gl&&this._glName&&(this._descriptor.context.unbindTexture(this),this._descriptor.context.gl.deleteTexture(this._glName),this._glName=null)}release(){this.dispose()}resize(e,r){const o=this._descriptor;if(o.width!==e||o.height!==r){if(this._wasImmutablyAllocated)throw new p("Immutable textures can't be resized!");o.width=e,o.height=r,this._descriptor.target===I.TEXTURE_CUBE_MAP?this._setDataCubeMap(null):this.setData(null)}}_setDataCubeMap(e=null){for(let r=I.TEXTURE_CUBE_MAP_POSITIVE_X;r<=I.TEXTURE_CUBE_MAP_NEGATIVE_Z;r++)this._setData(e,r)}setData(e){this._setData(e)}_setData(e,r){const o=this._descriptor.context?.gl;if(!o)return;N(o),this._glName||(this._glName=o.createTexture(),this._glName&&this._descriptor.context.instanceCounter.increment(B.Texture,this));const s=this._descriptor,n=r??s.target,i=S(n),c=this._descriptor.context.bindTexture(this,g.TEXTURE_UNIT_FOR_UPDATES);this._descriptor.context.setActiveTexture(g.TEXTURE_UNIT_FOR_UPDATES),P(s),this._configurePixelStorage(),N(o);const _=this._deriveInternalFormat();if(v(e)){let l="width"in e?e.width:e.codedWidth,h="height"in e?e.height:e.codedHeight;const u=1;e instanceof HTMLVideoElement&&(l=e.videoWidth,h=e.videoHeight),s.width&&s.height,i&&s.depth,s.isImmutable&&!this._wasImmutablyAllocated&&this._texStorage(n,_,s.hasMipmap,l,h,u),this._texImage(n,0,_,l,h,u,e),N(o),s.hasMipmap&&(this.generateMipmap(),N(o)),s.width||(s.width=l),s.height||(s.height=h),i&&!s.depth&&(s.depth=u)}else{const{width:l,height:h,depth:u}=s;if(l==null||h==null)throw new p("Width and height must be specified!");if(i&&u==null)throw new p("Depth must be specified!");if(s.isImmutable&&!this._wasImmutablyAllocated&&this._texStorage(n,_,s.hasMipmap,l,h,u),U(e)){const m=e.levels,R=y(n,l,h,u),D=Math.min(R-1,m.length-1);o.texParameteri(s.target,this._descriptor.context.gl.TEXTURE_MAX_LEVEL,D);const f=_;if(!se(f))throw new p("Attempting to use compressed data with an uncompressed format!");this._forEachMipmapLevel((A,b,w,V)=>{const W=m[Math.min(A,m.length-1)];this._compressedTexImage(n,A,f,b,w,V,W)},D)}else this._texImage(n,0,_,l,h,u,e),N(o),s.hasMipmap&&this.generateMipmap()}C(o,this._descriptor),L(o,this._descriptor),re(this._descriptor.context,this._descriptor),N(o),this._descriptor.context.bindTexture(c,g.TEXTURE_UNIT_FOR_UPDATES)}updateData(e,r,o,s,n,i,c=0){i||console.error("An attempt to use uninitialized data!"),this._glName||console.error("An attempt to update uninitialized texture!");const _=this._descriptor,l=this._deriveInternalFormat(),{context:h,pixelFormat:u,dataType:m,target:R,isImmutable:D}=_;if(D&&!this._wasImmutablyAllocated)throw new p("Cannot update immutable texture before allocation!");const f=h.bindTexture(this,g.TEXTURE_UNIT_FOR_UPDATES,!0);(r<0||o<0||r+s>_.width||o+n>_.height)&&console.error("An attempt to update out of bounds of the texture!"),this._configurePixelStorage();const{gl:A}=h;c&&A.pixelStorei(A.UNPACK_SKIP_ROWS,c),v(i)?A.texSubImage2D(R,e,r,o,s,n,u,m,i):U(i)?A.compressedTexSubImage2D(R,e,r,o,s,n,l,i.levels[e]):A.texSubImage2D(R,e,r,o,s,n,u,m,i),c&&A.pixelStorei(A.UNPACK_SKIP_ROWS,0),h.bindTexture(f,g.TEXTURE_UNIT_FOR_UPDATES)}updateData3D(e,r,o,s,n,i,c,_){_||console.error("An attempt to use uninitialized data!"),this._glName||console.error("An attempt to update uninitialized texture!");const l=this._descriptor,h=this._deriveInternalFormat(),{context:u,pixelFormat:m,dataType:R,isImmutable:D,target:f}=l;if(D&&!this._wasImmutablyAllocated)throw new p("Cannot update immutable texture before allocation!");S(f)||console.warn("Attempting to set 3D texture data on a non-3D texture");const A=u.bindTexture(this,g.TEXTURE_UNIT_FOR_UPDATES);u.setActiveTexture(g.TEXTURE_UNIT_FOR_UPDATES),(r<0||o<0||s<0||r+n>l.width||o+i>l.height||s+c>l.depth)&&console.error("An attempt to update out of bounds of the texture!"),this._configurePixelStorage();const{gl:b}=u;if(U(_))_=_.levels[e],b.compressedTexSubImage3D(f,e,r,o,s,n,i,c,h,_);else{const w=_;b.texSubImage3D(f,e,r,o,s,n,i,c,m,R,w)}u.bindTexture(A,g.TEXTURE_UNIT_FOR_UPDATES)}generateMipmap(){const e=this._descriptor;if(!e.hasMipmap){if(this._wasImmutablyAllocated)throw new p("Cannot add mipmaps to immutable texture after allocation");e.hasMipmap=!0,this._samplingModeDirty=!0,P(e)}e.samplingMode===E.LINEAR?(this._samplingModeDirty=!0,e.samplingMode=E.LINEAR_MIPMAP_NEAREST):e.samplingMode===E.NEAREST&&(this._samplingModeDirty=!0,e.samplingMode=E.NEAREST_MIPMAP_NEAREST);const r=this._descriptor.context.bindTexture(this,g.TEXTURE_UNIT_FOR_UPDATES);this._descriptor.context.setActiveTexture(g.TEXTURE_UNIT_FOR_UPDATES),this._descriptor.context.gl.generateMipmap(e.target),this._descriptor.context.bindTexture(r,g.TEXTURE_UNIT_FOR_UPDATES)}clearMipmap(){const e=this._descriptor;if(e.hasMipmap){if(this._wasImmutablyAllocated)throw new p("Cannot delete mipmaps to immutable texture after allocation");e.hasMipmap=!1,this._samplingModeDirty=!0,P(e)}e.samplingMode===E.LINEAR_MIPMAP_NEAREST?(this._samplingModeDirty=!0,e.samplingMode=E.LINEAR):e.samplingMode===E.NEAREST_MIPMAP_NEAREST&&(this._samplingModeDirty=!0,e.samplingMode=E.NEAREST)}setSamplingMode(e){e!==this._descriptor.samplingMode&&(this._descriptor.samplingMode=e,this._samplingModeDirty=!0)}setWrapMode(e){e!==this._descriptor.wrapMode&&(this._descriptor.wrapMode=e,P(this._descriptor),this._wrapModeDirty=!0)}applyChanges(){const e=this._descriptor,r=e.context.gl;this._samplingModeDirty&&(C(r,e),this._samplingModeDirty=!1),this._wrapModeDirty&&(L(r,e),this._wrapModeDirty=!1)}_deriveInternalFormat(){if(this._descriptor.internalFormat!=null)return this._descriptor.internalFormat===d.DEPTH_STENCIL&&(this._descriptor.internalFormat=d.DEPTH24_STENCIL8),this._descriptor.internalFormat;switch(this._descriptor.dataType){case G.FLOAT:switch(this._descriptor.pixelFormat){case d.RGBA:return this._descriptor.internalFormat=a.RGBA32F;case d.RGB:return this._descriptor.internalFormat=a.RGB32F;default:throw new p("Unable to derive format")}case G.UNSIGNED_BYTE:switch(this._descriptor.pixelFormat){case d.RGBA:return this._descriptor.internalFormat=a.RGBA8;case d.RGB:return this._descriptor.internalFormat=a.RGB8}}return this._descriptor.internalFormat=this._descriptor.pixelFormat===d.DEPTH_STENCIL?d.DEPTH24_STENCIL8:this._descriptor.pixelFormat}_configurePixelStorage(){const e=this._descriptor.context.gl,{unpackAlignment:r,flipped:o,preMultiplyAlpha:s}=this._descriptor;e.pixelStorei(e.UNPACK_ALIGNMENT,r),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o?1:0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s?1:0)}_texStorage(e,r,o,s,n,i){const{gl:c}=this._descriptor.context;if(!ie(r))throw new p("Immutable textures must have a sized internal format");if(!this._descriptor.isImmutable)return;const _=o?y(e,s,n,i):1;if(S(e)){if(i==null)throw new p("Missing depth dimension for 3D texture upload");c.texStorage3D(e,_,r,s,n,i)}else c.texStorage2D(e,_,r,s,n);this._wasImmutablyAllocated=!0}_texImage(e,r,o,s,n,i,c){const _=this._descriptor.context.gl,l=S(e),{isImmutable:h,pixelFormat:u,dataType:m}=this._descriptor;if(h){if(c!=null){const R=c;if(l){if(i==null)throw new p("Missing depth dimension for 3D texture upload");_.texSubImage3D(e,r,0,0,0,s,n,i,u,m,R)}else _.texSubImage2D(e,r,0,0,s,n,u,m,R)}}else{const R=c;if(l){if(i==null)throw new p("Missing depth dimension for 3D texture upload");_.texImage3D(e,r,o,s,n,i,0,u,m,R)}else _.texImage2D(e,r,o,s,n,0,u,m,R)}}_compressedTexImage(e,r,o,s,n,i,c){const _=this._descriptor.context.gl,l=S(e);if(this._descriptor.isImmutable){if(c!=null)if(l){if(i==null)throw new p("Missing depth dimension for 3D texture upload");_.compressedTexSubImage3D(e,r,0,0,0,s,n,i,o,c)}else _.compressedTexSubImage2D(e,r,0,0,s,n,o,c)}else if(l){if(i==null)throw new p("Missing depth dimension for 3D texture upload");_.compressedTexImage3D(e,r,o,s,n,i,0,c)}else _.compressedTexImage2D(e,r,o,s,n,0,c)}_forEachMipmapLevel(e,r=1/0){let{width:o,height:s,depth:n,hasMipmap:i,target:c}=this._descriptor;const _=c===I.TEXTURE_3D;if(o==null||s==null||_&&n==null)throw new p("Missing texture dimensions for mipmap calculation");for(let l=0;e(l,o,s,n),i&&(o!==1||s!==1||_&&n!==1)&&!(l>=r);++l)o=Math.max(1,o>>1),s=Math.max(1,s>>1),_&&(n=Math.max(1,n>>1))}};function P(t){(t.width!=null&&t.width<0||t.height!=null&&t.height<0||t.depth!=null&&t.depth<0)&&console.error("Negative dimension parameters are not allowed!")}function C(t,e){let r=e.samplingMode,o=e.samplingMode;r===E.LINEAR_MIPMAP_NEAREST||r===E.LINEAR_MIPMAP_LINEAR?(r=E.LINEAR,e.hasMipmap||(o=E.LINEAR)):r!==E.NEAREST_MIPMAP_NEAREST&&r!==E.NEAREST_MIPMAP_LINEAR||(r=E.NEAREST,e.hasMipmap||(o=E.NEAREST)),t.texParameteri(e.target,t.TEXTURE_MAG_FILTER,r),t.texParameteri(e.target,t.TEXTURE_MIN_FILTER,o)}function L(t,e){typeof e.wrapMode=="number"?(t.texParameteri(e.target,t.TEXTURE_WRAP_S,e.wrapMode),t.texParameteri(e.target,t.TEXTURE_WRAP_T,e.wrapMode)):(t.texParameteri(e.target,t.TEXTURE_WRAP_S,e.wrapMode.s),t.texParameteri(e.target,t.TEXTURE_WRAP_T,e.wrapMode.t))}function re(t,e){const r=t.capabilities.textureFilterAnisotropic;r&&t.gl.texParameterf(e.target,r.TEXTURE_MAX_ANISOTROPY,e.maxAnisotropy??1)}function ie(t){return t in a}function se(t){return t in T}function U(t){return t!=null&&"type"in t&&t.type==="compressed"}function ae(t){return t!=null&&"byteLength"in t}function v(t){return t!=null&&!U(t)&&!ae(t)}function S(t){return t===I.TEXTURE_3D||t===I.TEXTURE_2D_ARRAY}function y(t,e,r,o=1){let s=Math.max(e,r);return t===I.TEXTURE_3D&&(s=Math.max(s,o)),Math.round(Math.log(s)/Math.LN2)+1}te.TEXTURE_UNIT_FOR_UPDATES=0;export{H as F,F as G,J as H,N,O as P,te as V,Z as X,_e as i,le as r,ce as t,j as v,Q as y};
