import{p as c,fk as f,fl as o}from"./main-ljaACljU.js";const r=96;function p(n,t){const e=n.extent,u=n.width,i=c(e?.spatialReference);return e&&u?e.width/u*i*f*r:0}function m(n,t){return n/(c(t)*f*r)}function w(n,t,e){return a(n,t)&&s(n,e)}function a(n,t){return t===0||o(n,t)||n<t}function s(n,t){return t===0||o(n,t)||n>t}export{w as b,p as c,m as f};
