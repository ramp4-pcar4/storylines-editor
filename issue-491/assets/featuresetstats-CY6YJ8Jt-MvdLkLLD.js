import{r as l}from"./TimeOnly-DSMefxKy-BrR9EZwD.js";import{w as A,r as f,C as m,y as w,Z as d,T as h,n as S,g as c,e as v}from"./languageUtils-BYxF9hRA-CTuCjQb9.js";import{l as u}from"./arcadeUtils-DpP0k7IY-BX5mNITI.js";import{Z as p,r as x}from"./WhereClause-DxwoyBMS-DWTzn5Zq.js";import"./main-ljaACljU.js";import"./UnknownTimeZone-C--TOcPG-Duf2m1gg.js";import"./ImmutableArray-CiJxhY8_-Kqx7aWRu.js";import"./shared-D1w-26bA-Bx9ept74.js";import"./Field-C6hA1tZj-BCQx8YuA.js";import"./fieldType-CD2CL2hr-iuW5PF1A.js";import"./number-eRKYXfX9-B_qGmFM4.js";import"./Query-BrwMGK8U-C5TYBQTQ.js";import"./TimeExtent-Cn0Jofqr-Ck50QJvn.js";import"./featureConversionUtils-D6hFQ4Af-ljldKZV_.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./FieldsIndex-HmzMbJQG-BlJhlV8J.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";async function s(n,r,t,i){if(t.length===1){if(m(t[0]))return u(n,t[0],c(t[1],-1));if(d(t[0]))return u(n,t[0].toArray(),c(t[1],-1))}else if(t.length===2){if(m(t[0]))return u(n,t[0],c(t[1],-1));if(d(t[0]))return u(n,t[0].toArray(),c(t[1],-1));if(f(t[0])){const o=await t[0].load(),a=await y(p.create(t[1],{fieldsIndex:o.getFieldsIndex(),timeZone:o.dateFieldsTimeZoneDefaultUTC}),i,r);return g(r,await t[0].calculateStatistic(n,a,c(t[2],1e3),r.abortSignal))}}else if(t.length===3&&f(t[0])){const o=await t[0].load(),a=await y(p.create(t[1],{fieldsIndex:o.getFieldsIndex(),timeZone:o.dateFieldsTimeZoneDefaultUTC}),i,r);return g(r,await t[0].calculateStatistic(n,a,c(t[2],1e3),r.abortSignal))}return u(n,t,-1)}function g(n,r){return r instanceof x?l.fromReaderAsTimeStampOffset(r.toStorageFormat()):r instanceof Date?l.dateJSAndZoneToArcadeDate(r,v(n)):r}async function y(n,r,t){const i=n.getVariables();if(i.length>0){const o=[];for(let e=0;e<i.length;e++){const F={name:i[e]};o.push(await r.evaluateIdentifier(t,F))}const a={};for(let e=0;e<i.length;e++)a[i[e]]=o[e];return n.parameters=a,n}return n}function E(n){n.mode==="async"&&(n.functions.stdev=function(r,t){return n.standardFunctionAsync(r,t,(i,o,a)=>s("stdev",r,a,n))},n.functions.variance=function(r,t){return n.standardFunctionAsync(r,t,(i,o,a)=>s("variance",r,a,n))},n.functions.average=function(r,t){return n.standardFunctionAsync(r,t,(i,o,a)=>s("mean",r,a,n))},n.functions.mean=function(r,t){return n.standardFunctionAsync(r,t,(i,o,a)=>s("mean",r,a,n))},n.functions.sum=function(r,t){return n.standardFunctionAsync(r,t,(i,o,a)=>s("sum",r,a,n))},n.functions.min=function(r,t){return n.standardFunctionAsync(r,t,(i,o,a)=>s("min",r,a,n))},n.functions.max=function(r,t){return n.standardFunctionAsync(r,t,(i,o,a)=>s("max",r,a,n))},n.functions.count=function(r,t){return n.standardFunctionAsync(r,t,async(i,o,a)=>{if(A(a,1,1,r,t),f(a[0]))return a[0].count(i.abortSignal);if(m(a[0])||w(a[0]))return a[0].length;if(d(a[0]))return a[0].length();throw new h(r,S.InvalidParameter,t)})})}export{E as registerFunctions};
