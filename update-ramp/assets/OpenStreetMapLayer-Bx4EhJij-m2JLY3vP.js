import{v as t,S as r,i as s,w as p,J as l,n as a}from"./main-CJueYQxD.js";import{I as m}from"./WebTileLayer-CUoicUjK-Shf-1uF3.js";import{V as i,d as e}from"./TileInfo-CWIRDhZl-DEMRsfTt.js";import w from"./PortalItem-CctGdnxF-h5IZ14b9.js";import"./MultiOriginJSONSupport-DKRh9P6w-CpQOaL6_.js";import"./Layer-ChoECxvZ-B9RF9Run.js";import"./TimeExtent-Cn0Jofqr-BGv9oSxW.js";import"./BlendLayer-D1WkSmwP-Cg3yVOis.js";import"./jsonUtils-wIllKWI4-Dp6oBxeL.js";import"./parser-DyDJ-rlI-BTl5jbUe.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-CuyWPRvp.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./OperationalLayer-B5IXiMa2-DHgK4NON.js";import"./commonProperties-BtIqvFU_-DDbguMhd.js";import"./ElevationInfo-yv2-9tj6-CJQNjUWn.js";import"./lengthUtils-DKpMe5qR-1EhMXnK6.js";import"./PortalLayer-CElnYuSQ-Crib-ovh.js";import"./portalItemUtils-B8bw6SAG-BZzOLQXw.js";import"./projection-BA9M1R7d-MtiC3YOi.js";import"./projectBuffer-CvCBvJ6W-D1GMAOjG.js";import"./RefreshableLayer-a8BQ58Xh-QytxpqHz.js";import"./ScaleRangeLayer-Bz0DcnvM-BObnfvsv.js";import"./imageBitmapUtils-DA36kg39-DHwYv2js.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";let o=class extends m{constructor(...n){super(...n),this.portalItem=null,this.isReference=null,this.tileInfo=new i({size:[256,256],dpi:96,format:"png8",compressionQuality:0,origin:new p({x:-20037508342787e-6,y:20037508342787e-6,spatialReference:l.WebMercator}),spatialReference:l.WebMercator,lods:[new e({level:0,scale:591657527591555e-6,resolution:156543.033928}),new e({level:1,scale:295828763795777e-6,resolution:78271.5169639999}),new e({level:2,scale:147914381897889e-6,resolution:39135.7584820001}),new e({level:3,scale:73957190948944e-6,resolution:19567.8792409999}),new e({level:4,scale:36978595474472e-6,resolution:9783.93962049996}),new e({level:5,scale:18489297737236e-6,resolution:4891.96981024998}),new e({level:6,scale:9244648868618e-6,resolution:2445.98490512499}),new e({level:7,scale:4622324434309e-6,resolution:1222.99245256249}),new e({level:8,scale:2311162217155e-6,resolution:611.49622628138}),new e({level:9,scale:1155581108577e-6,resolution:305.748113140558}),new e({level:10,scale:577790.554289,resolution:152.874056570411}),new e({level:11,scale:288895.277144,resolution:76.4370282850732}),new e({level:12,scale:144447.638572,resolution:38.2185141425366}),new e({level:13,scale:72223.819286,resolution:19.1092570712683}),new e({level:14,scale:36111.909643,resolution:9.55462853563415}),new e({level:15,scale:18055.954822,resolution:4.77731426794937}),new e({level:16,scale:9027.977411,resolution:2.38865713397468}),new e({level:17,scale:4513.988705,resolution:1.19432856685505}),new e({level:18,scale:2256.994353,resolution:.597164283559817}),new e({level:19,scale:1128.497176,resolution:.298582141647617})]}),this.subDomains=["a","b","c"],this.fullExtent=new a(-20037508342787e-6,-2003750834278e-5,2003750834278e-5,20037508342787e-6,l.WebMercator),this.urlTemplate="https://{subDomain}.tile.openstreetmap.org/{level}/{col}/{row}.png",this.operationalLayerType="OpenStreetMap",this.type="open-street-map",this.copyright="Map data &copy; OpenStreetMap contributors, CC-BY-SA"}get refreshInterval(){return 0}};t([r({type:w,json:{read:!1,write:!1,origins:{"web-document":{read:!1,write:!1}}}})],o.prototype,"portalItem",void 0),t([r({type:Boolean,json:{read:!1,write:!1}})],o.prototype,"isReference",void 0),t([r({type:Number,readOnly:!0,json:{read:!1,write:!1,origins:{"web-document":{read:!1,write:!1}}}})],o.prototype,"refreshInterval",null),t([r({type:i,json:{write:!1}})],o.prototype,"tileInfo",void 0),t([r({type:["show","hide"]})],o.prototype,"listMode",void 0),t([r({readOnly:!0,json:{read:!1,write:!1}})],o.prototype,"subDomains",void 0),t([r({readOnly:!0,json:{read:!1,write:!1},nonNullable:!0})],o.prototype,"fullExtent",void 0),t([r({readOnly:!0,json:{read:!1,write:!1}})],o.prototype,"urlTemplate",void 0),t([r({type:["OpenStreetMap"]})],o.prototype,"operationalLayerType",void 0),t([r({json:{read:!1}})],o.prototype,"type",void 0),t([r({json:{read:!1,write:!1}})],o.prototype,"copyright",void 0),t([r({json:{read:!1,write:!1}})],o.prototype,"wmtsInfo",void 0),o=t([s("esri.layers.OpenStreetMapLayer")],o);const A=o;export{A as default};
