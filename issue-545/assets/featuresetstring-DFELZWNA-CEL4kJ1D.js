import{N as l}from"./arcadeUtils-DpP0k7IY-C1tWlA1r.js";import{w as a,t as m,W as T,M as f,r as c,ah as y,T as d,n as u,$ as h,e as p,Q as b,ai as A,X as g,aj as x,g as j,u as F,x as V}from"./languageUtils-BYxF9hRA-CQ_df2HZ.js";import{M as v}from"./shared-D1w-26bA-UiB4Rn2A.js";import"./main-BnX5fuW-.js";import"./TimeOnly-DSMefxKy-caCwfUpZ.js";import"./UnknownTimeZone-C--TOcPG-BL9BL5iL.js";import"./ImmutableArray-CiJxhY8_-Kqx7aWRu.js";import"./featureConversionUtils-D6hFQ4Af-TPvy2jYa.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./FieldsIndex-HmzMbJQG-Do-rDA84.js";import"./number-eRKYXfX9-fVrgh30K.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./Query-BrwMGK8U-Brlbd04u.js";import"./Field-C6hA1tZj-CPQsl65u.js";import"./fieldType-CD2CL2hr-CMvUUYbD.js";import"./TimeExtent-Cn0Jofqr-CvUK1vHe.js";function w(i,t){return i&&i.domain?i.domain.type==="coded-value"||i.domain.type==="codedValue"?l.convertObjectToArcadeDictionary({type:"codedValue",name:i.domain.name,dataType:v[i.field.type],codedValues:i.domain.codedValues.map(e=>({name:e.name,code:e.code}))},p(t)):l.convertObjectToArcadeDictionary({type:"range",name:i.domain.name,dataType:v[i.field.type],min:i.domain.minValue,max:i.domain.maxValue},p(t)):null}function B(i){i.mode==="async"&&(i.functions.domain=function(t,e){return i.standardFunctionAsync(t,e,async(o,s,n)=>{if(a(n,2,3,t,e),m(n[0]))return w(T(n[0],f(n[1]),n[2]===void 0?void 0:n[2]),t);if(c(n[0]))return await n[0]._ensureLoaded(),w(y(f(n[1]),n[0],null,n[2]===void 0?void 0:n[2]),t);throw new d(t,u.InvalidParameter,e)})},i.functions.subtypes=function(t,e){return i.standardFunctionAsync(t,e,async(o,s,n)=>{if(a(n,1,1,t,e),m(n[0])){const r=h(n[0]);return r?l.convertObjectToArcadeDictionary(r,p(t)):null}if(c(n[0])){await n[0]._ensureLoaded();const r=n[0].subtypeMetaData();return r?l.convertObjectToArcadeDictionary(r,p(t)):null}throw new d(t,u.InvalidParameter,e)})},i.functions.domainname=function(t,e){return i.standardFunctionAsync(t,e,async(o,s,n)=>{if(a(n,2,4,t,e),m(n[0]))return b(n[0],f(n[1]),n[2],n[3]===void 0?void 0:n[3]);if(c(n[0])){await n[0]._ensureLoaded();const r=y(f(n[1]),n[0],null,n[3]===void 0?void 0:n[3]);return A(r,n[2])}throw new d(t,u.InvalidParameter,e)})},i.signatures.push({name:"domainname",min:2,max:4}),i.functions.domaincode=function(t,e){return i.standardFunctionAsync(t,e,async(o,s,n)=>{if(a(n,2,4,t,e),m(n[0]))return g(n[0],f(n[1]),n[2],n[3]===void 0?void 0:n[3]);if(c(n[0])){await n[0]._ensureLoaded();const r=y(f(n[1]),n[0],null,n[3]===void 0?void 0:n[3]);return x(r,n[2])}throw new d(t,u.InvalidParameter,e)})},i.signatures.push({name:"domaincode",min:2,max:4}),i.functions.text=function(t,e){return i.standardFunctionAsync(t,e,async(o,s,n)=>{if(a(n,1,2,t,e),c(n[0])){const r=j(n[1],"");if(r==="")return n[0].castToText();if(r.toLowerCase()==="schema")return n[0].convertToText("schema",o.abortSignal);if(r.toLowerCase()==="featureset")return n[0].convertToText("featureset",o.abortSignal);throw new d(t,u.InvalidParameter,e)}return F(n[0],n[1])})},i.functions.gdbversion=function(t,e){return i.standardFunctionAsync(t,e,async(o,s,n)=>{if(a(n,1,1,t,e),m(n[0]))return n[0].gdbVersion();if(c(n[0]))return(await n[0].load()).gdbVersion;throw new d(t,u.InvalidParameter,e)})},i.functions.schema=function(t,e){return i.standardFunctionAsync(t,e,async(o,s,n)=>{if(a(n,1,1,t,e),c(n[0]))return await n[0].load(),l.convertObjectToArcadeDictionary(n[0].schema(),p(t));if(m(n[0])){const r=V(n[0]);return r?l.convertObjectToArcadeDictionary(r,p(t)):null}throw new d(t,u.InvalidParameter,e)})})}export{B as registerFunctions};
