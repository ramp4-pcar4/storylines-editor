import{v as i,i as s}from"./main-DG3mLaAJ.js";import{E as a,h,R as n}from"./MapView-BGOJJ8ch-DktKCsG4.js";import{K as l}from"./AGraphicContainer-LUCT6Gle-d4rFusql.js";let r=class extends l{get hasHighlight(){return this.children.some(e=>e.hasData)}renderChildren(e){this.attributeView.update(),e.drawPhase===a.HIGHLIGHT&&this.children.some(t=>t.hasData)&&(super.renderChildren(e),e.context.setColorMask(!0,!0,!0,!0),h(e,!0,t=>{this._renderChildren(t,n.All)},0))}};r=i([s("esri.views.2d.layers.graphics.HighlightGraphicContainer")],r);const m=r;export{m as l};
