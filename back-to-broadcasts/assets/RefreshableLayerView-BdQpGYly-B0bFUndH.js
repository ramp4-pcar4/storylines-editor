import{v as i,i as t,ai as h,aU as l,a1 as d}from"./main-Cs_aiUdl.js";const o=r=>{let e=class extends r{initialize(){this.addHandles(h(()=>this.layer,"refresh",s=>{this.doRefresh(s.dataChanged).catch(a=>{l(a)||d.getLogger(this).error(a)})}),"RefreshableLayerView")}};return e=i([t("esri.views.layers.RefreshableLayerView")],e),e};export{o as n};
