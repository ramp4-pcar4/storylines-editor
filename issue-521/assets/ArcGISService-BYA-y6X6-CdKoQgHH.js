import{v as i,S as r,i as s,a1 as n}from"./main-CF9Cdcsk.js";import{i as o,j as u}from"./arcgisLayerUrl-HNYh8jvG-CD-ZkkCp.js";const h=l=>{let e=class extends l{get title(){if(this._get("title")&&this.originOf("title")!=="defaults")return this._get("title");if(this.url){const t=o(this.url);if(t!=null&&t.title)return t.title}return this._get("title")||""}set title(t){this._set("title",t)}set url(t){this._set("url",u(t,n.getLogger(this)))}};return i([r()],e.prototype,"title",null),i([r({type:String})],e.prototype,"url",null),e=i([s("esri.layers.mixins.ArcGISService")],e),e};export{h as a};
