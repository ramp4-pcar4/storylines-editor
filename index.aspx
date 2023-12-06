<%@ Page Title="" Language="C#"
MasterPageFile="~/GoC.WebTemplate/GoCWebTemplate.Master" AutoEventWireup="true"
CodeBehind="index.aspx.cs" Inherits="Storylines.base_page" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
  <h1
    class="pageTitle"
    data-lang="<%=WebTemplateMaster.WebTemplateModel.TwoLetterCultureLanguage %>"
    id="wb-cont"
  >
    <%=WebTemplateMaster.WebTemplateModel.ApplicationTitle.Text %>
  </h1>

  <div id="app"></div>
  <script src="/assets/scripts/multi-ramp/legacy-api.js"></script>
  <script src="/assets/scripts/multi-ramp/rv-main.js"></script>
  <script
    src="/assets/scripts/highcharts-editor/highcharts-editor.complete.js"
  ></script>
  <script src="/assets/js/chunk-vendors.a28bff94.js"></script>
  <script src="/assets/js/chunk-common.b1125170.js"></script>
  <script src="/assets/js/index.827e9960.js"></script>

  
</asp:Content>
