import{dC as n,o as h,aU as r}from"./main-BeHOkNcW.js";class f{constructor(i,e=0,t=i.lods[i.lods.length-1].level){this.tileInfo=i,this.minLOD=e,this.maxLOD=t,i.lodAt(e)||(this.minLOD=i.lods[0].level),i.lodAt(t)||(this.maxLOD=i.lods[i.lods.length-1].level)}get effectiveMinLOD(){return this.minLOD??this.tileInfo.lods[0].level}get effectiveMaxLOD(){return this.maxLOD??this.tileInfo.lods[this.tileInfo.lods.length-1].level}getAvailability(i,e,t){const l=this.tileInfo?.lodAt(i);return!l||i<this.minLOD||i>this.maxLOD?"unavailable":l.cols&&l.rows?t>=l.cols[0]&&t<=l.cols[1]&&e>=l.rows[0]&&e<=l.rows[1]?"unknown":"unavailable":"unknown"}async fetchAvailability(i,e,t,l){await n(l);const a=this.getAvailability(i,e,t);if(a==="unavailable")throw new h("tile-map:tile-unavailable","Tile is not available",{level:i,row:e,col:t});return a}async fetchAvailabilityUpsample(i,e,t,l,a){await n(a),l.level=i,l.row=e,l.col=t;const s=this.tileInfo;return s.updateTileInfo(l),this.fetchAvailability(i,e,t,a).catch(o=>{if(r(o))throw o;if(s.upsampleTile(l))return this.fetchAvailabilityUpsample(l.level,l.row,l.col,l,a);throw o})}}export{f as c};
