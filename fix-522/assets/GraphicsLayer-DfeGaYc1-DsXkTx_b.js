import{v as e,S as i,i as p}from"./main-gpNb-fIA.js";import{o,u as a}from"./GraphicsCollection-CWTXNZOX-fV-W7Vz1.js";import{D as h}from"./Layer-ChoECxvZ-Evk2QmX2.js";import{u as n}from"./BlendLayer-D1WkSmwP-BUxwTlKs.js";import{S as m}from"./ScaleRangeLayer-Bz0DcnvM-BEPtihz_.js";import{q as d}from"./ElevationInfo-yv2-9tj6-BYOOMGXx.js";import"./TimeExtent-Cn0Jofqr-DB46E7PV.js";import"./jsonUtils-wIllKWI4-B2gFQLO9.js";import"./parser-DyDJ-rlI-DY7eY1Nn.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-C_vT_4dx.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./lengthUtils-DKpMe5qR-uFvVP53_.js";let t=class extends n(m(h)){constructor(r){super(r),this.elevationInfo=null,this.graphics=new o,this.screenSizePerspectiveEnabled=!0,this.type="graphics",this.internal=!1}destroy(){this.removeAll(),this.graphics.destroy()}add(r){return this.graphics.add(r),this}addMany(r){return this.graphics.addMany(r),this}removeAll(){return this.graphics.removeAll(),this}remove(r){this.graphics.remove(r)}removeMany(r){this.graphics.removeMany(r)}on(r,s){return super.on(r,s)}graphicChanged(r){this.emit("graphic-update",r)}};e([i({type:d})],t.prototype,"elevationInfo",void 0),e([i(a(o,"graphics"))],t.prototype,"graphics",void 0),e([i({type:["show","hide"]})],t.prototype,"listMode",void 0),e([i()],t.prototype,"screenSizePerspectiveEnabled",void 0),e([i({readOnly:!0})],t.prototype,"type",void 0),e([i({constructOnly:!0})],t.prototype,"internal",void 0),t=e([p("esri.layers.GraphicsLayer")],t);const z=t;export{z as default};
