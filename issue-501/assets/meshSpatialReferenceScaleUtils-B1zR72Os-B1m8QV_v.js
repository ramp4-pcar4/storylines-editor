import{o as e,p as u}from"./main-BLGVPR4E.js";import{V as p}from"./MeshTransform-C--IG09w-B-mfgoF_.js";const t="upload-assets",r=()=>new Error;class c extends e{constructor(){super(`${t}:unsupported`,"Layer does not support asset uploads.",r())}}let l=class extends e{constructor(){super(`${t}:no-glb-support`,"Layer does not support glb.",r())}};class i extends e{constructor(){super(`${t}:no-supported-source`,"No supported external source found",r())}}class m extends e{constructor(){super(`${t}:not-base-64`,"Expected gltf data in base64 format after conversion.",r())}}class f extends e{constructor(){super(`${t}:unable-to-prepare-options`,"Unable to prepare uploadAsset request options.",r())}}class $ extends e{constructor(o,n){super(`${t}:bad-response`,`Bad response. Uploaded ${o} items and received ${n} results.`,r())}}class x extends e{constructor(o,n){super(`${t}-layer:upload-failed`,`Failed to upload mesh file ${o}. Error code: ${n?.code??"-1"}. Error message: ${n?.messages??"unknown"}`,r())}}class b extends e{constructor(o){super(`${t}-layer:unsupported-format`,`The service allowed us to upload an asset of FormatID ${o}, but it does not list it in its supported formats.`,r())}}class v extends e{constructor(){super(`${t}:convert3D-failed`,"convert3D failed.")}}class g extends e{constructor(){super("invalid-input:no-model","No supported model found")}}class w extends e{constructor(){super("invalid-input:multiple-models","Multiple supported models found")}}function y(s){const o=1/u(s,1);return o!==1?new p({scale:[o,o,o]}):void 0}export{b as $,g as b,i as c,l as d,x as f,y as g,f as i,m as l,$ as m,c as p,w as v,v as x};
