using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using GoC.WebTemplate.Components.Entities;
using GoC.WebTemplate.WebForms;

namespace Storylines
{
    public partial class base_page : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            WebTemplateMaster.WebTemplateModel.HTMLHeaderElements.Add("<script src=\"https://code.highcharts.com/highcharts.js\" charset=\"utf-8\"></script><script src=\"https://code.highcharts.com/modules/data.js\" charset=\"utf-8\"></script><link rel=\"icon\" href=\"favicon.svg\" /><link rel=\"stylesheet\" href=\"assets/scripts/multi-ramp/rv-styles.css\" /><link rel=\"stylesheet\" href=\"assets/scripts/highcharts-editor/highcharts-editor.min.css\" /><link href=\"assets/css/chunk-common.5f115248.css\" rel=\"preload\" as=\"style\" />\r\n    <link href=\"assets/css/chunk-vendors.5ce752f9.css\" rel=\"preload\" as=\"style\" />\r\n    <link href=\"assets/js/chunk-common.b1125170.js\" rel=\"preload\" as=\"script\" />\r\n    <link href=\"assets/js/chunk-vendors.a28bff94.js\" rel=\"preload\" as=\"script\" />\r\n    <link href=\"assets/js/index.827e9960.js\" rel=\"preload\" as=\"script\" />\r\n    <link href=\"assets/css/chunk-vendors.5ce752f9.css\" rel=\"stylesheet\" />\r\n    <link href=\"assets/css/chunk-common.5f115248.css\" rel=\"stylesheet\" />");
            WebTemplateMaster.WebTemplateModel.DateModified = Convert.ToDateTime("2023-09-28", System.Globalization.CultureInfo.CurrentCulture);

            //Page Title and Breadcrumbs
            if (WebTemplateMaster.WebTemplateModel.TwoLetterCultureLanguage == "en") {
                WebTemplateMaster.WebTemplateModel.HeaderTitle = "Storylines";
                WebTemplateMaster.WebTemplateModel.ApplicationTitle.Text = "Storylines";
                WebTemplateMaster.WebTemplateModel.Breadcrumbs.Add(new Breadcrumb { Href = "https://www.canada.ca/en.html", Title = "GoC" });
                WebTemplateMaster.WebTemplateModel.Breadcrumbs.Add(new Breadcrumb { Href = "https://www.canada.ca/en/services/environment.html", Title = "Environment and natural resources" });
                WebTemplateMaster.WebTemplateModel.Breadcrumbs.Add(new Breadcrumb { Href = "https://www.canada.ca/en/services/environment/cumulative-effect/federal-initiative.html", Title = "Storylines", });
            } else {
                WebTemplateMaster.WebTemplateModel.HeaderTitle = "[FR] Storylines";
                WebTemplateMaster.WebTemplateModel.ApplicationTitle.Text = "[FR] Storylines";
                WebTemplateMaster.WebTemplateModel.Breadcrumbs.Add(new Breadcrumb { Href = "https://www.canada.ca/fr.html", Title = "GoC", Acronym = "Gouvernement du Canada" });
                WebTemplateMaster.WebTemplateModel.Breadcrumbs.Add(new Breadcrumb { Href = "https://www.canada.ca/fr/services/environnement.html", Title = "Environnement et ressources naturelles", Acronym = "Environnement et ressources naturelles" });
                WebTemplateMaster.WebTemplateModel.Breadcrumbs.Add(new Breadcrumb { Href = "https://canada.ca/fr/services/environnement/effets-cumulatif/initiative-federale.html", Title = "Effets cumulatifs", Acronym = "[FR]Storylines" });
            }
        }
    }
}