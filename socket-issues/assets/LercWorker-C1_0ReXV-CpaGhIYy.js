import{hA as P}from"./main-8gcLRx1v.js";var b={};b.defaultNoDataValue=P(-1/0),b.decode=function(i,t){var s=(t=t||{}).encodedMaskData||t.encodedMaskData===null,e=E(i,t.inputOffset||0,s),c=t.noDataValue!=null?P(t.noDataValue):b.defaultNoDataValue,a=Y(e,t.pixelType||Float32Array,t.encodedMaskData,c,t.returnMask),r={width:e.width,height:e.height,pixelData:a.resultPixels,minValue:e.pixels.minValue,maxValue:e.pixels.maxValue,noDataValue:c};return a.resultMask&&(r.maskData=a.resultMask),t.returnEncodedMask&&e.mask&&(r.encodedMaskData=e.mask.bitset?e.mask.bitset:null),t.returnFileInfo&&(r.fileInfo=X(e,c),t.computeUsedBitDepths&&(r.fileInfo.bitDepths=F(e))),r};var Y=function(i,t,s,e,c){var a,r,d=0,m=i.pixels.numBlocksX,k=i.pixels.numBlocksY,y=Math.floor(i.width/m),v=Math.floor(i.height/k),p=2*i.maxZError;s=s||(i.mask?i.mask.bitset:null),a=new t(i.width*i.height),c&&s&&(r=new Uint8Array(i.width*i.height));for(var g,h,x=new Float32Array(y*v),U=0;U<=k;U++){var V=U!==k?v:i.height%k;if(V!==0)for(var M=0;M<=m;M++){var o=M!==m?y:i.width%m;if(o!==0){var D,l,f,w,n=U*i.width*v+M*y,B=i.width-o,u=i.pixels.blocks[d];if(u.encoding<2?(u.encoding===0?D=u.rawData:(S(u.stuffedData,u.bitsPerPixel,u.numValidPixels,u.offset,p,x,i.pixels.maxValue),D=x),l=0):f=u.encoding===2?0:u.offset,s)for(h=0;h<V;h++){for(7&n&&(w=s[n>>3],w<<=7&n),g=0;g<o;g++)7&n||(w=s[n>>3]),128&w?(r&&(r[n]=1),a[n++]=u.encoding<2?D[l++]:f):(r&&(r[n]=0),a[n++]=e),w<<=1;n+=B}else if(u.encoding<2)for(h=0;h<V;h++){for(g=0;g<o;g++)a[n++]=D[l++];n+=B}else for(h=0;h<V;h++)if(a.fill)a.fill(f,n,n+o),n+=o+B;else{for(g=0;g<o;g++)a[n++]=f;n+=B}if(u.encoding===1&&l!==u.numValidPixels)throw"Block and Mask do not match";d++}}}return{resultPixels:a,resultMask:r}},X=function(i,t){return{fileIdentifierString:i.fileIdentifierString,fileVersion:i.fileVersion,imageType:i.imageType,height:i.height,width:i.width,maxZError:i.maxZError,eofOffset:i.eofOffset,mask:i.mask?{numBlocksX:i.mask.numBlocksX,numBlocksY:i.mask.numBlocksY,numBytes:i.mask.numBytes,maxValue:i.mask.maxValue}:null,pixels:{numBlocksX:i.pixels.numBlocksX,numBlocksY:i.pixels.numBlocksY,numBytes:i.pixels.numBytes,maxValue:i.pixels.maxValue,minValue:i.pixels.minValue,noDataValue:t}}},F=function(i){for(var t=i.pixels.numBlocksX*i.pixels.numBlocksY,s={},e=0;e<t;e++){var c=i.pixels.blocks[e];c.encoding===0?s.float32=!0:c.encoding===1?s[c.bitsPerPixel]=!0:s[0]=!0}return Object.keys(s)},E=function(i,t,s){var e={},c=new Uint8Array(i,t,10);if(e.fileIdentifierString=String.fromCharCode.apply(null,c),e.fileIdentifierString.trim()!="CntZImage")throw"Unexpected file identifier string: "+e.fileIdentifierString;t+=10;var a=new DataView(i,t,24);if(e.fileVersion=a.getInt32(0,!0),e.imageType=a.getInt32(4,!0),e.height=a.getUint32(8,!0),e.width=a.getUint32(12,!0),e.maxZError=a.getFloat64(16,!0),t+=24,!s)if(a=new DataView(i,t,16),e.mask={},e.mask.numBlocksY=a.getUint32(0,!0),e.mask.numBlocksX=a.getUint32(4,!0),e.mask.numBytes=a.getUint32(8,!0),e.mask.maxValue=a.getFloat32(12,!0),t+=16,e.mask.numBytes>0){var r=new Uint8Array(Math.ceil(e.width*e.height/8)),d=(a=new DataView(i,t,e.mask.numBytes)).getInt16(0,!0),m=2,k=0;do{if(d>0)for(;d--;)r[k++]=a.getUint8(m++);else{var y=a.getUint8(m++);for(d=-d;d--;)r[k++]=y}d=a.getInt16(m,!0),m+=2}while(m<e.mask.numBytes);if(d!==-32768||k<r.length)throw"Unexpected end of mask RLE encoding";e.mask.bitset=r,t+=e.mask.numBytes}else e.mask.numBytes|e.mask.numBlocksY|e.mask.maxValue||(r=new Uint8Array(Math.ceil(e.width*e.height/8)),e.mask.bitset=r);a=new DataView(i,t,16),e.pixels={},e.pixels.numBlocksY=a.getUint32(0,!0),e.pixels.numBlocksX=a.getUint32(4,!0),e.pixels.numBytes=a.getUint32(8,!0),e.pixels.maxValue=a.getFloat32(12,!0),t+=16;var v=e.pixels.numBlocksX,p=e.pixels.numBlocksY,g=v+(e.width%v>0?1:0),h=p+(e.height%p>0?1:0);e.pixels.blocks=new Array(g*h);for(var x=1e9,U=0,V=0;V<h;V++)for(var M=0;M<g;M++){var o=0,D=i.byteLength-t;a=new DataView(i,t,Math.min(10,D));var l={};e.pixels.blocks[U++]=l;var f=a.getUint8(0);if(o++,l.encoding=63&f,l.encoding>3)throw"Invalid block encoding ("+l.encoding+")";if(l.encoding!==2){if(f!==0&&f!==2){if(f>>=6,l.offsetType=f,f===2)l.offset=a.getInt8(1),o++;else if(f===1)l.offset=a.getInt16(1,!0),o+=2;else{if(f!==0)throw"Invalid block offset type";l.offset=a.getFloat32(1,!0),o+=4}if(x=Math.min(l.offset,x),l.encoding===1)if(f=a.getUint8(o),o++,l.bitsPerPixel=63&f,f>>=6,l.numValidPixelsType=f,f===2)l.numValidPixels=a.getUint8(o),o++;else if(f===1)l.numValidPixels=a.getUint16(o,!0),o+=2;else{if(f!==0)throw"Invalid valid pixel count type";l.numValidPixels=a.getUint32(o,!0),o+=4}}var w;if(t+=o,l.encoding!=3){if(l.encoding===0){var n=(e.pixels.numBytes-1)/4;if(n!==Math.floor(n))throw"uncompressed block has invalid length";w=new ArrayBuffer(4*n),new Uint8Array(w).set(new Uint8Array(i,t,4*n));for(var B=new Float32Array(w),u=0;u<B.length;u++)x=Math.min(x,B[u]);l.rawData=B,t+=4*n}else if(l.encoding===1){var I=Math.ceil(l.numValidPixels*l.bitsPerPixel/8),A=Math.ceil(I/4);w=new ArrayBuffer(4*A),new Uint8Array(w).set(new Uint8Array(i,t,I)),l.stuffedData=new Uint32Array(w),t+=I}}}else t++,x=Math.min(x,0)}return e.pixels.minValue=x,e.eofOffset=t,e},S=function(i,t,s,e,c,a,r){var d,m,k,y=(1<<t)-1,v=0,p=0,g=Math.ceil((r-e)/c),h=4*i.length-Math.ceil(t*s/8);for(i[i.length-1]<<=8*h,d=0;d<s;d++){if(p===0&&(k=i[v++],p=32),p>=t)m=k>>>p-t&y,p-=t;else{var x=t-p;m=(k&y)<<x&y,m+=(k=i[v++])>>>(p=32-x)}a[d]=m<g?e+m*c:r}return a};const T=b.decode;class O{_decode(t){const s=T(t.buffer,t.options);return Promise.resolve({result:s,transferList:[s.pixelData.buffer]})}}function C(){return new O}export{C as default};
