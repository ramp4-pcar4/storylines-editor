import{a as o,r as n}from"./main-Csa2lEpO.js";function s(t,r){return{...a(t,r),readResourcePaths:[]}}function u(t,r,l){const e=o(t.itemUrl);return{...a(t,r),messages:[],writtenProperties:[],blockedRelativeUrls:[],verifyItemRelativeUrls:e?{rootPath:e.path,writtenUrls:[]}:null,resources:l?{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}:null}}function a(t,r){return{origin:r,url:o(t.itemUrl),portal:t.portal||n.getDefault(),portalItem:t}}export{s as a,u as i};
