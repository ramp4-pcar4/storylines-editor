import{y as i}from"./utils-9sQxfkoa-D2a_EK_f.js";import{q as s}from"./query-DFW9-NG_-C276id-6.js";import{O as c}from"./FeatureSet-BkVNthuN-CPoF4uR4.js";import{b as e}from"./Query-BrwMGK8U-Czy7zTOT.js";async function S(r,t,o){const a=await p(r,t,o);return c.fromJSON(a)}async function p(r,t,o){const a=i(r),m={...o},n=e.from(t),{data:f}=await s(a,n,n.sourceSpatialReference,m);return f}export{p as s,S as u};
