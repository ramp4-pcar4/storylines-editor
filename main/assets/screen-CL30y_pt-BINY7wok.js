import{H as e,J as t,M as n,Q as r,R as i,X as a,d as o,dt as s,it as c,m as l,o as u,ot as d,p as f,pt as p,q as m,t as h,u as g,ut as _}from"./vue.esm-bundler-7UEitcnU-C1eyAGEX.js";import{t as v}from"./vue-i18n-CKa_z5QX-B5KedJOs.js";import{J as y,P as b,f as x}from"./main-Dn78hbcA-D1upAGkB.js";import{t as S}from"./marked.esm-erzOXD1Y-CP79NLhK.js";n();var C=`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:gmd="http://www.isotc211.org/2005/gmd"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:gmdl="http://www.canada.gc.ca/ns/gmdl"
                xmlns:napec="http://www.ec.gc.ca/data_donnees/standards/schemas/napec"
                xmlns:gml="http://www.opengis.net/gml"
                xmlns:geonet="http://www.fao.org/geonetwork"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.ec.gc.ca/data_donnees/standards/schemas/napec/schema.xsd">

  <xsl:param name="catalogue_url" />
  <xsl:decimal-format NaN=""/>

  <xsl:template match="/">

    <div class="metadata-view">

      <xsl:if test="//gmd:abstract/gco:CharacterString/text() != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Abstract}}</h5>
        <p>
          <xsl:value-of select="//gmd:abstract/gco:CharacterString/text()" />
        </p>
      </xsl:if>

      <xsl:comment>
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Scope}}</h5>
        <p>{{metadata.xslt.hereBeScope}}</p>
      </xsl:comment>

      <xsl:if test="//gml:TimePeriod//* != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.timePeriod}}</h5>
        <p>
          <xsl:value-of select="//gml:TimePeriod//gml:beginPosition" />
          <xsl:if test="//gml:TimePeriod//gml:beginPosition/text() != '' and //gml:TimePeriod//gml:endPosition/text() != ''">
            -
          </xsl:if>
          <xsl:value-of select="//gml:TimePeriod//gml:endPosition" />
        </p>
      </xsl:if>

      <xsl:comment>
        <xsl:if test="//gmd:supplementalInformation/gco:CharacterString/text() != ''">
          <h5 class="text-xl font-bold mb-3">{{metadata.xslt.supplementalData}}</h5>
          <p>
            <xsl:value-of select="//gmd:supplementalInformation/gco:CharacterString/text()" />
          </p>
        </xsl:if>
      </xsl:comment>

      <xsl:if test="//gmd:citedResponsibleParty//gmd:individualName/* != '' 
              or //gmd:citedResponsibleParty//gmd:organisationName/gco:CharacterString/text() != ''
              or //gmd:citedResponsibleParty//gmd:positionName/gco:CharacterString/text() != ''
              or //gmd:citedResponsibleParty//gmd:electronicMailAddress/* != ''
              or //gmd:citedResponsibleParty//gmd:role/gmd:CI_RoleCode/@codeListValue != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.contactInfo}}</h5>
        <p>
          <xsl:value-of select="//gmd:citedResponsibleParty//gmd:individualName" />
        </p>
        <p>
          <xsl:value-of select="//gmd:citedResponsibleParty//gmd:organisationName/gco:CharacterString/text()" />
        </p>
        <p>
          <xsl:value-of select="//gmd:citedResponsibleParty//gmd:positionName/gco:CharacterString/text()" />
        </p>
        <p>
          <a href="mailto:{//gmd:citedResponsibleParty//gmd:electronicMailAddress/gco:CharacterString/text()}?Subject={//gmd:identificationInfo//gmd:title/gco:CharacterString/text()}">
            <xsl:value-of select="//gmd:citedResponsibleParty//gmd:electronicMailAddress" />
          </a>
        </p>
        <p>
          <xsl:variable name="roleCode" >
            <xsl:value-of select="concat(substring(//gmd:citedResponsibleParty//gmd:role/gmd:CI_RoleCode/@codeListValue,1,1),
                        substring(//gmd:citedResponsibleParty//gmd:role/gmd:CI_RoleCode/@codeListValue, 2))" />
          </xsl:variable>

          <xsl:choose>
            <xsl:when test="$roleCode = 'resourceProvider'">{{metadata.xslt.resourceProvider}}</xsl:when>
            <xsl:when test="$roleCode = 'custodian'">{{metadata.xslt.custodian}}</xsl:when>
            <xsl:when test="$roleCode = 'owner'">{{metadata.xslt.owner}}</xsl:when>
            <xsl:when test="$roleCode = 'user'">{{metadata.xslt.user}}</xsl:when>
            <xsl:when test="$roleCode = 'distributor'">{{metadata.xslt.distributor}}</xsl:when>
            <xsl:when test="$roleCode = 'originator'">{{metadata.xslt.originator}}</xsl:when>
            <xsl:when test="$roleCode = 'pointOfContact'">{{metadata.xslt.pointOfContact}}</xsl:when>
            <xsl:when test="$roleCode = 'principalInvestigator'">{{metadata.xslt.principalInvestigator}}</xsl:when>
            <xsl:when test="$roleCode = 'processor'">{{metadata.xslt.processor}}</xsl:when>
            <xsl:when test="$roleCode = 'publisher'">{{metadata.xslt.publisher}}</xsl:when>
            <xsl:when test="$roleCode = 'author'">{{metadata.xslt.author}}</xsl:when>
            <xsl:when test="$roleCode = 'collaborator'">{{metadata.xslt.collaborator}}</xsl:when>
            <xsl:when test="$roleCode = 'editor'">{{metadata.xslt.editor}}</xsl:when>
            <xsl:when test="$roleCode = 'mediator'">{{metadata.xslt.mediator}}</xsl:when>
            <xsl:when test="$roleCode = 'rightsHolder'">{{metadata.xslt.rightsHolder}}</xsl:when>
          </xsl:choose>
        </p>
      </xsl:if>

      <xsl:if test="$catalogue_url != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.cataloguePage}}</h5>
        <p>
          <a href="{$catalogue_url}"
             rel="external" target="_blank" class="ui-link">
            {{metadata.xslt.metadata}}
          </a>
        </p>
      </xsl:if>
    </div>
  </xsl:template>
</xsl:stylesheet>
`,w=`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:gmd="http://www.isotc211.org/2005/gmd"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:gmdl="http://www.canada.gc.ca/ns/gmdl"
                xmlns:napec="http://www.ec.gc.ca/data_donnees/standards/schemas/napec"
                xmlns:gml="http://www.opengis.net/gml"
                xmlns:geonet="http://www.fao.org/geonetwork"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.ec.gc.ca/data_donnees/standards/schemas/napec/schema.xsd">

  <xsl:param name="catalogue_url" />
  <xsl:decimal-format NaN=""/>

  <xsl:template match="/">

    <div class="metadata-view">

      <xsl:if test="//gmd:abstract//gmd:LocalisedCharacterString[@locale='#fra']/text() != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Abstract}}</h5>
        <p>
          <xsl:value-of select="//gmd:abstract//gmd:LocalisedCharacterString[@locale='#fra']/text()" />
        </p>
      </xsl:if>

      <xsl:comment>
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Scope}}</h5>
        <p>{{metadata.xslt.hereBeScope}}</p>
      </xsl:comment>

      <xsl:if test="//gml:TimePeriod//* != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.timePeriod}}</h5>
        <p>
          <xsl:value-of select="//gml:TimePeriod//gml:beginPosition" />
          <xsl:if test="//gml:TimePeriod//gml:beginPosition/text() != '' and //gml:TimePeriod//gml:endPosition/text() != ''">
            -
          </xsl:if>
          <xsl:value-of select="//gml:TimePeriod//gml:endPosition" />
        </p>
      </xsl:if>

      <xsl:comment>
        <xsl:if test="//gmd:supplementalInformation//gmd:LocalisedCharacterString[@locale='#fra']/text() != ''">
          <h5 class="text-xl font-bold mb-3">{{metadata.xslt.supplementalData}}</h5>
          <p>
            <xsl:value-of select="//gmd:supplementalInformation//gmd:LocalisedCharacterString[@locale='#fra']/text()" />
          </p>
        </xsl:if>
      </xsl:comment>

      <xsl:if test="//gmd:citedResponsibleParty//gmd:individualName/* != '' 
              or //gmd:citedResponsibleParty//gmd:organisationName//gmd:LocalisedCharacterString[@locale='#fra']/text() != ''
              or //gmd:citedResponsibleParty//gmd:positionName//gmd:LocalisedCharacterString[@locale='#fra']/text() != ''
              or //gmd:citedResponsibleParty//gmd:electronicMailAddress/* != ''
              or //gmd:citedResponsibleParty//gmd:role/gmd:CI_RoleCode/@codeListValue != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.contactInfo}}</h5>
        <p>
          <xsl:value-of select="//gmd:citedResponsibleParty//gmd:individualName" />
        </p>
        <p>
          <xsl:value-of select="//gmd:citedResponsibleParty//gmd:organisationName//gmd:LocalisedCharacterString[@locale='#fra']/text()" />
        </p>
        <p>
          <xsl:value-of select="//gmd:citedResponsibleParty//gmd:positionName//gmd:LocalisedCharacterString[@locale='#fra']/text()" />
        </p>
        <p>
          <a href="mailto:{//gmd:citedResponsibleParty//gmd:electronicMailAddress//gmd:LocalisedCharacterString[@locale='#fra']/text()}?Subject={//gmd:identificationInfo//gmd:title//gmd:LocalisedCharacterString[@locale='#fra']/text()}">
            <xsl:value-of select="//gmd:citedResponsibleParty//gmd:electronicMailAddress" />
          </a>
        </p>
        <p>
          <xsl:variable name="roleCode" >
            <xsl:value-of select="concat(substring(//gmd:citedResponsibleParty//gmd:role/gmd:CI_RoleCode/@codeListValue,1,1),
                        substring(//gmd:citedResponsibleParty//gmd:role/gmd:CI_RoleCode/@codeListValue, 2))" />
          </xsl:variable>

          <xsl:choose>
            <xsl:when test="$roleCode = 'resourceProvider'">{{metadata.xslt.resourceProvider}}</xsl:when>
            <xsl:when test="$roleCode = 'custodian'">{{metadata.xslt.custodian}}</xsl:when>
            <xsl:when test="$roleCode = 'owner'">{{metadata.xslt.owner}}</xsl:when>
            <xsl:when test="$roleCode = 'user'">{{metadata.xslt.user}}</xsl:when>
            <xsl:when test="$roleCode = 'distributor'">{{metadata.xslt.distributor}}</xsl:when>
            <xsl:when test="$roleCode = 'originator'">{{metadata.xslt.originator}}</xsl:when>
            <xsl:when test="$roleCode = 'pointOfContact'">{{metadata.xslt.pointOfContact}}</xsl:when>
            <xsl:when test="$roleCode = 'principalInvestigator'">{{metadata.xslt.principalInvestigator}}</xsl:when>
            <xsl:when test="$roleCode = 'processor'">{{metadata.xslt.processor}}</xsl:when>
            <xsl:when test="$roleCode = 'publisher'">{{metadata.xslt.publisher}}</xsl:when>
            <xsl:when test="$roleCode = 'author'">{{metadata.xslt.author}}</xsl:when>
            <xsl:when test="$roleCode = 'collaborator'">{{metadata.xslt.collaborator}}</xsl:when>
            <xsl:when test="$roleCode = 'editor'">{{metadata.xslt.editor}}</xsl:when>
            <xsl:when test="$roleCode = 'mediator'">{{metadata.xslt.mediator}}</xsl:when>
            <xsl:when test="$roleCode = 'rightsHolder'">{{metadata.xslt.rightsHolder}}</xsl:when>
          </xsl:choose>
        </p>
      </xsl:if>

      <xsl:if test="$catalogue_url != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.cataloguePage}}</h5>
        <p>
          <a href="{$catalogue_url}"
             rel="external" target="_blank" class="ui-link">
            {{metadata.xslt.metadata}}
          </a>
        </p>
      </xsl:if>
    </div>
  </xsl:template>
</xsl:stylesheet>
`,T=`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:dct="http://purl.org/dc/terms/"
                xmlns:vcard="http://www.w3.org/2006/vcard/ns#"
                xmlns:dcat="http://www.w3.org/ns/dcat#"
                xmlns:locn="http://www.w3.org/ns/locn#"
                xmlns:foaf="http://xmlns.com/foaf/0.1/"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">

  <xsl:param name="catalogue_url" />
  <xsl:decimal-format NaN=""/>

  <xsl:template match="/">

    <div class="metadata-view">

      <xsl:if test="//dct:description[@xml:lang='en']/text() != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Abstract}}</h5>
        <p>
          <xsl:value-of select="//dct:description[@xml:lang='en']/text()" />
        </p>
      </xsl:if>

      <xsl:comment>
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Scope}}</h5>
        <p>{{metadata.xslt.hereBeScope}}</p>
      </xsl:comment>

      <!-- xsl:if test="//gml:TimePeriod//* != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.timePeriod}}</h5>
        <p>
          <xsl:value-of select="//gml:TimePeriod//gml:beginPosition" />
          <xsl:if test="//gml:TimePeriod//gml:beginPosition/text() != '' and //gml:TimePeriod//gml:endPosition/text() != ''">
            -
          </xsl:if>
          <xsl:value-of select="//gml:TimePeriod//gml:endPosition" />
        </p>
      </xsl:if -->

      <!-- xsl:comment>
        <xsl:if test="//gmd:supplementalInformation/gco:CharacterString/text() != ''">
          <h5 class="text-xl font-bold mb-3">{{metadata.xslt.supplementalData}}</h5>
          <p>
            <xsl:value-of select="//gmd:supplementalInformation/gco:CharacterString/text()" />
          </p>
        </xsl:if>
      </xsl:comment -->

      <xsl:if test="//dct:publisher//foaf:Organization/* != '' 
              or //dcat:contactPoint//vcard:hasEmail != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.contactInfo}}</h5>
        <p>
          <xsl:value-of select="//dct:publisher//foaf:name[@xml:lang='en']/text()" />
        </p>
        <p>
          <a href="mailto:{substring-after(//dcat:contactPoint//vcard:hasEmail/@rdf:resource, 'mailto:')}">
            <xsl:value-of select="substring-after(//dcat:contactPoint//vcard:hasEmail/@rdf:resource, 'mailto:')" />
          </a>
        </p>
      </xsl:if>

      <xsl:if test="$catalogue_url != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.cataloguePage}}</h5>
        <p>
          <a href="{$catalogue_url}"
             rel="external" target="_blank" class="ui-link">
            {{metadata.xslt.metadata}}
          </a>
        </p>
      </xsl:if>
    </div>
  </xsl:template>
</xsl:stylesheet>
`,E=`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:dct="http://purl.org/dc/terms/"
                xmlns:vcard="http://www.w3.org/2006/vcard/ns#"
                xmlns:dcat="http://www.w3.org/ns/dcat#"
                xmlns:locn="http://www.w3.org/ns/locn#"
                xmlns:foaf="http://xmlns.com/foaf/0.1/"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">

  <xsl:param name="catalogue_url" />
  <xsl:decimal-format NaN=""/>

  <xsl:template match="/">

    <div class="metadata-view">

      <xsl:if test="//dct:description[@xml:lang='fr']/text() != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Abstract}}</h5>
        <p>
          <xsl:value-of select="//dct:description[@xml:lang='fr']/text()" />
        </p>
      </xsl:if>

      <xsl:comment>
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Scope}}</h5>
        <p>{{metadata.xslt.hereBeScope}}</p>
      </xsl:comment>

      <!-- xsl:if test="//gml:TimePeriod//* != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.timePeriod}}</h5>
        <p>
          <xsl:value-of select="//gml:TimePeriod//gml:beginPosition" />
          <xsl:if test="//gml:TimePeriod//gml:beginPosition/text() != '' and //gml:TimePeriod//gml:endPosition/text() != ''">
            -
          </xsl:if>
          <xsl:value-of select="//gml:TimePeriod//gml:endPosition" />
        </p>
      </xsl:if -->

      <!-- xsl:comment>
        <xsl:if test="//gmd:supplementalInformation/gco:CharacterString/text() != ''">
          <h5 class="text-xl font-bold mb-3">{{metadata.xslt.supplementalData}}</h5>
          <p>
            <xsl:value-of select="//gmd:supplementalInformation/gco:CharacterString/text()" />
          </p>
        </xsl:if>
      </xsl:comment -->

      <xsl:if test="//dct:publisher//foaf:Organization/* != '' 
              or //dcat:contactPoint//vcard:hasEmail != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.contactInfo}}</h5>
        <p>
          <xsl:value-of select="//dct:publisher//foaf:name[@xml:lang='fr']/text()" />
        </p>
        <p>
          <a href="mailto:{substring-after(//dcat:contactPoint//vcard:hasEmail/@rdf:resource, 'mailto:')}">
            <xsl:value-of select="substring-after(//dcat:contactPoint//vcard:hasEmail/@rdf:resource, 'mailto:')" />
          </a>
        </p>
      </xsl:if>

      <xsl:if test="$catalogue_url != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.cataloguePage}}</h5>
        <p>
          <a href="{$catalogue_url}"
             rel="external" target="_blank" class="ui-link">
            {{metadata.xslt.metadata}}
          </a>
        </p>
      </xsl:if>
    </div>
  </xsl:template>
</xsl:stylesheet>
`,D={key:0},O={class:`flex justify-center`},k={key:0,class:`flex flex-col justify-center text-center`},A=[`innerHTML`],j=[`innerHTML`],M={key:3,class:`flex flex-col justify-center text-center`},N={class:`text-xl mt-20`},P={key:1,class:`p-5`},F=f({__name:`screen`,props:{panel:{type:Object,required:!0},payload:{type:Object,required:!0}},setup(n){let f=y(),{t:F}=v(),I=r(`iApi`),L=t(),R=n,z=i(()=>f.status),B=i(()=>f.response),V=t(!1),H=_({}),U=_([]),W=_([]);a(()=>{f.status=`loading`,G(),U.push(I.event.on(x.LAYER_REMOVE,e=>{R.payload.layer?.uid===e.uid&&R.panel.close()})),W.push(s(()=>R.payload.layer.uid,(e,t)=>{e!==t&&(f.status=`loading`,G())}))}),e(()=>{U.forEach(e=>I.event.off(e)),W.forEach(e=>e())});let G=()=>{V.value=R.payload.layer!==void 0&&!R.payload.layer.isRemoved,R.payload.type===`xml`?K(R.payload.url,[]).then(e=>{if(f.status=`success`,e!==null){let t=document.createElement(`div`);t.appendChild(Y(`${e.firstElementChild.outerHTML}`)),(R.payload.catalogueUrl||R.payload.url)&&t.appendChild(Y(`<h5 class="text-xl font-bold mb-3">${F(`metadata.xslt.metadata`)}</h5>`)),R.payload.catalogueUrl&&t.appendChild(Y(`<p><a style="color: blue;" href="${R.payload.catalogueUrl}" target="_blank">${F(`metadata.xslt.cataloguePage`)}</a></p>`)),t.appendChild(Y(`<p><a style="color: blue;" href="${R.payload.url}" target="_blank">${F(`metadata.xslt.metadataPage`)}</a> (xml)</p>`)),f.response=t.outerHTML}}):R.payload.type===`html`?J(R.payload.url).then(e=>{f.status=e.status,f.response=e.response}):R.payload.type===`md`&&J(R.payload.url).then(e=>{f.status=e.status,f.response=S(e.response)})},K=(e,t)=>{let n;return n=R.payload.xmlType&&R.payload.xmlType===`DCAT`?I.language===`en`?T:E:I.language===`en`?C:w,n=n.replace(/\{\{([\w.]+)\}\}/g,(e,t)=>F(t)),H[e]?Promise.resolve(q(H[e],n,t)):J(e).then(r=>(H[e]=r.response,q(H[e],n,t)))},q=(e,t,n)=>{let r=null;if(window.XSLTProcessor){let i=new window.XSLTProcessor,a=new DOMParser,o=a.parseFromString(e,`text/xml`),s=a.parseFromString(t,`text/xml`);i.importStylesheet(s),n&&n.forEach(e=>i.setParameter(``,e.key,e.value||``)),r=i.transformToFragment(o,document);let c={className:`underline text-blue-700 break-all`,target:`_blank`,validate:{url:e=>/^https?:\/\//.test(e)}},l=r.firstElementChild;l&&(R.payload.treatXmlAsMarkdown?l.innerHTML=S.parse(l.innerHTML,{async:!1}):l.innerHTML=b(l.innerHTML,c))}return r},J=e=>new Promise(t=>{let n=new XMLHttpRequest;n.open(`GET`,e,!0),n.responseType=`text`,n.onload=()=>{n.status===200?t({status:`success`,response:n.response}):t({status:`error`,response:`Could not load results from remote service.`})},n.onerror=()=>{t({status:`error`,response:`Could not load results from remote service.`})},n.send()});function Y(e){let t=document.createElement(`div`);return t.innerHTML=e,t}return(e,t)=>{let r=c(`panel-screen`);return u(),m(r,{panel:n.panel,ref_key:`el`,ref:L},{header:d(()=>[p(o(l(F)(`metadata.title`))+`: `+o(n.payload.layerName),1)]),content:d(()=>[V.value?(u(),h(`div`,D,[g(`div`,O,[z.value==`loading`?(u(),h(`div`,k,o(l(F)(`metadata.loading`)),1)):n.payload.type===`xml`&&z.value==`success`?(u(),h(`div`,{key:1,innerHTML:B.value,class:`flex flex-col justify-center max-w-full xml-content`},null,8,A)):(n.payload.type===`html`||n.payload.type===`md`)&&z.value==`success`?(u(),h(`div`,{key:2,innerHTML:B.value,class:`flex flex-col justify-center max-w-full metadata-view`},null,8,j)):(u(),h(`div`,M,[t[0]||=g(`img`,{src:`https://i.imgur.com/fA5EqV6.png`},null,-1),g(`span`,N,o(l(F)(`metadata.error`)),1)]))])])):(u(),h(`div`,P,[g(`span`,null,o(l(F)(`metadata.label.no.layer`)),1)]))]),_:1},8,[`panel`])}}});export{F as default};