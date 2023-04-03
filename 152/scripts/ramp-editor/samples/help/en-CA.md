# General Information

The Federal Geospatial Platform Authoring (FGPA) tool is used to create, update, validate and preview configuration files
used by the Federal Geospatial Platform Viewer (FGPV).

The FGPA tool is based on the <a href="https://github.com/json-schema-form/angular-schema-form" target="_blank">Angular Schema Form </a> library. This library
generates forms from JSON schemas using AngularJS. The FGPA tool uses the same schema as the FGPV and lets user modify values to easily
create new configuration files. The schema is composed of 5 sections:
+ **Map**
    + Map is divided in 5 sections (Extents and Levels of Details, Basemaps, Layers, Legend and Components)
+ **UI**
    + UI is divided in 4 sections (General, Application Bar, Navigation and Side Menu)
+ **Services**
    + Services is divided in 3 sections (Export Map, Geo Search and Service End Points)
+ **Version**
+ **Language**

For more information about schema structure, go to the
<a href="https://github.com/fgpv-vpgf/fgpa-apgf/wiki/FGPV_schema_doc" target="_blank">**FGPV schema**</a>
section in our wiki page. This section will also give you information on schema values and their effect in the viewer.

##### Useful information

To switch the interface language, use the language dropdown menu located in the upper right corner ![](languagebutton.png "Language dropdown menu").

At any time, when available, you can use the expand or collapse buttons ![](expandcollapse.png "Expand and collapse buttons")
to expand or collapse all the items inside a section.

Some configuration items are for more advanced user. You can show/hide these items with the _Show advanced configuration
options_ checkbox located under each section name.

Some items like basemaps, layers and layer fields can be reordered. You can easily identify reorderable items with the
drag handle ![](draghandle.png "Drag handle icon"). To reorder an item, click the handle then drag the item to the desired
position. A yellow box will appear under the item where it will be placed when you release the handle.
_Note:_ it is easier to drag an item when all items inside the section are collapsed.

To upload user configuration file or template directly from url you can use the following syntax:
+ _your instance url_?filename=_your file name_ (e.g. https: //xxx/fgpv-author.html?filename=https: //myfolder/myfilename.json)
+ _your instance url_?template=_your template name_ (e.g. https: //xxx/fgpv-author.html?template=mytemplate.json)

_Note:_ if the application can't read the configuration file or if the template doesn't exist, it will open the default configuration or the first template inside the list on templates.

> Unanticipated behavior may occur if any interactions occur before data is fully loaded. Please allow the webpage to
> load completely before triggering any functions. If you still encounter bugs, please
<a href="https://github.com/fgpv-vpgf/fgpa-apgf/issues" target="_blank">submit an issue </a>
> in our GitHub repository. Someone from our development team will take care of it as soon as possible.


# Header

![](header.png "Header overview")

The header toolbar allows you to:
+ Open the FGPA help window from the question mark button.
+ Create a new configuration file from scratch ![](plussign.png "Plus sign") _- only available when no templates are provided -_.
+ Create a new configuration file from templates ![](templates.png "Templates dropdown menu") _- only available when templates are provided -_.
    + Templates are managed by the organization in charge of this FGPA instance. Contact the organization if you need more information
    or would like an update to the list of templates.
+ Upload an existing configuration file ![](uparrow.png "Arrow sign").
+ Save the configuration file once finished ![](diskette.png "Diskette sign").
    + All files are saved in your Downloads folder. The application automatically increments the file name at each backup.

The file name you are working on is shown to the left of the save icon. However, if you save a file using an existing file name, it
will be renamed by your operating system and may no longer match the file name you used (e.g. Test is shown as the used
file name but renamed file name is Test(1)).

> When you create or upload a configuration file, loading time may vary based on the number of layers and basemaps being loaded.


# Map - Extents and Levels of Detail

This section is used to define the tile schemas for your viewer application. For each tile schema, a spatial reference
system must be defined in the _Spatial Extents Sets_ section. Again, for each tile schema, levels of detail (LODs) must
be defined in the _Levels of Detail Sets_ section. For this, an ESRI tile cache layer must be used to retrieve the list of LODs from.
Each LOD corresponds to a map at a given scale or resolution. Therefore each basemap linked to a tile schema must share the same
spatial extent and LODs.

>For more information about how to setup the _Extents and Levels of Detail_ section, see the help dropdown menu located below the section header.


# Map - Basemaps

This section is used to add basemaps to your viewer application. To add a basemap, a tile schema appropriate for this basemap
must already have been created. Once a basemap is added, the following information must be provided:
+ Name _- it will be used to generate the basemap id -_
+ Description
+ Alternate Text
+ Tile Schema ID (selected from existing tile schema)
+ At least one layer with ID, Layer Type and URL.

You must set the initial basemap that will appear when the viewer launches. To do so, select the basemap id (name-_unique key_
from _Initial Basemap ID_) from the dropdown menu.

>For more information about how to setup the _Basemaps_ section, see the help dropdown menu located below the section header.


# Map - Layers

This section is used to add layers to your viewer application. Once a layer is added, the following information must be provided:
+ Layer Type
    + esriDynamic
    + esriFeature
    + esriImage
    + esriTile (an appropriate tile schema must exist)
    + ogcWms
+ Name _- it will be used to generate the layer id -_
+ URL

At least one layer entry must be added if the selected layer type is esriDynamic or ocgWms. The following properties must be set:
+ Index for esriDynamic
+ ID for ogcWMS

You can make a esriDynamic layer look like a esriFeature layer inside the legend with the _Single entry collapse_ option.
This option will render a single layered dynamic layer with a single layer without its root group.

Optionally you can set URL values for the Metadata URL and Catalog URL options to display the relative information inside the
viewer's metadata panel available in the _Layer Controls_ section.

For each layer and layer entries, the following _Layer Controls_ options can be selected:
+ Opacity (_opacity_)
+ Visibility (_visibility_)
+ Bounding box (_boundingBox_)
+ Query (_query_)
+ Snapshot (_snapshot_)
+ Metadata (_metadata_)
+ Boundary zoom (_boundaryZoom_)
+ Refresh (_refresh_)
+ Reload (_reload_)
+ Remove (_remove_)
+ Settings (_settings_)
+ Table (_data_)
+ Styles (_styles_)

For each layer and layer entries, the following _State_ options can be selected:
+ Opacity - Initial opacity value.
+ Visibility - Initial visibility setting.
+ Bounding box - Set initial display of the layer's bounding box.
+ Query - Enable querying of map feature and display information inside the viewer's details panel. Will only work with
esriFeature and esriDynamic layer type.
+ Snapshot - Retrieve all feature data immediately on load. Will only work with esriFeature layer type.
+ Hovertips - Enable hover tips. Will only work with esriFeature layer type.

For every esriFeature layer and every esriDynamic layer entries a table is created automatically when the URL or entry Index option
is set. The table section is optional and is populated from the service information by default. You can customize the following table properties:
+ Title - Custom table title to apply. Default title is the layer name.
+ Description - Specifies additional information to be displayed in the table settings panel.
+ Maximize - Specifies if the table window is maximized on open. Default window size is split view.
+ Apply map - Specifies if table filters (from columns filters) are applied to the map (definition query).
+ Fields Customization - Specifies the array of table columns to display. Columns can be reinitialize with the _Set Fields_
button at any time. The following properties can be customized:
    + Title - Custom column title. Default column title is set with column's alias name from the service.
    + Description - Specifies additional information to be displayed in the table settings panel.
    + Visible - Specifies if the field is visible by default.
    + Width - Column's width. If no width is set, best width will be calculated.
    + Sort - Sort ascending (asc) or descending (dsc).
    + Searchable - Specifies if column can be filtered or not.
    + Filters - For each column, the following filter properties can be customized:
        + Type - Specifies the filter type to use. If Type is not specified, data field type will be used. String filter
        can be string or selector. Other filters must be of the same type.
        + Value - Specifies the filter value.
        + Static - Specifies if filter value can be modified or not.

**Important** - Modifying the layer type of an existing layer is not a good practice. It is better to create a new layer
and then delete the old one.

>For more information about how to setup _Layers_ section, see the help dropdown menu located below the section header.


# Map - Legend

This section is used to define legend for your viewer application. There are 2 types of legends to choose from: Autopopulate
and Structured. The Autopopulate legend will read the layers as they appear in the Layers section in order to create a simple default legend.

The Structured legend allows you to customize the display order of the layers, the layer grouping, descriptions and many other settings.

>For more information about legend customization options, see the dropdown help menu located below the section header.


# Map - Components

This section is used to define map component:
+ Mouse Coordinates
    + WKID must be set to display mouse coordinates on the map
    + Coordinates can be in degrees minutes seconds (DMS) and decimal degrees or meters depending on the projection (WKID)
+ North Arrow
+ Scale Bar
+ Overview Map
    + To change the overview map basemap, use _Static Overview Map_ in the appropriate tile schema of _Extents and Levels of Detail_ section


# User Interface

##### General

The General section is for customizing the following information:
+ Full screen - Used to set viewer application’s initial size to Full Screen (a.k.a. entire  viewport).
+ On Viewer Failure
    + Failure Message -  Custom message to use instead of the default failure message.
    + Failure Image Url - Custom image to use instead of the default failure image.
+ Legend
    + _Is Reorderable_ Set to allow interactive reordering of layers inside the viewer application's legend.
    Structured legends ignore this option.
    + _Allow Layers Import_ Set to allow interactive importing of additional layers inside the viewer application.
+ Legend Opening Options - Set to display the legend's initial view in small, medium and/or large display.
+ Table Opening Options - Set to display the table's initial view in small, medium and/or large display.
    + For table to open by default, a layer id must be selected.

##### Application Bar

![](applicationbar.png "Application bar")

The Application Bar section allows you to add or remove the following tools:
+ Side Menu
+ Geosearch
+ Basemap Selector
+ Layers Selector (legend)

##### Navigation Bar

The Navigation Bar allows you to add or remove the following navigation components:
+ Your location (_geolocator_) - Display user position on the map
+ Initial extent (_home_) - Zoom to initial extent
+ Basemaps selector (_basemap_) - Open Basemap Selector _- also available in the Application Bar -_
+ Help (_help_) - Open help window _- also available in the Side Menu -_
+ Full screen (_fullscreen_) - Open viewer in fullscreen _- also available in the Side Menu -_
+ Geo search (_geoSearch_) - Open Geosearch tool _- also available in the Application Bar -_
+ Side menu (_sidemenu_) - Open the Side Menu _- also available in the Application Bar -_
+ Layers selector (_layers_) - Open the Layers Selector (legend) _- also available in the Application Bar -_

You can restrict navigation within the maximum extent by checking the _Restrict Navigation_ checkbox.

##### Side Menu

The Side Menu allows you to configure how the side menu will appear. First you can set a title and a logo. If no title or
logo are provided, the default title ("FGP R2 Viewer") and logo will be used. Then you can add as many group of tools as you want
from the following options:
+ Layers selector (_layers_) - Layers Selector (legend) _- also available in the Application Bar -_
+ Basemaps selector (_basemap_) - Basemap Selector _- also available in the Application Bar -_
+ Geo search (_geoSearch_) - Geosearch tool _- also available in the Application Bar -_
+ Map description (_about_) - Display additional information about the map
    + About can be of type string or file. When type file is selected, you must provide a folder name for your custom About
    markdown formatted files located inside the FGPV instance.
    + **Important** About of type file will not show up inside preview mode.
+ Full screen (_fullscreen_) - Open viewer in fullscreen _- also available in the Navigation Bar -_
+ Map export (_export_) - Export the map view as png image
+ Share the map (_share_) - Create a URL link to share the map
+ Touch mode (_touch_) - Enable touch mode for touch screen (to enhance layout spacing and button size)
+ Help (_help_) - Open Help window _- also available in the Navigation Bar -_
    + If you do not want to use the default Help, you must provide a folder name for your custom Help markdown formatted files
    located inside the FGPV instance.
    + **Important** Custom Help will not show up inside preview mode.
+ Languages selector (_language_) - Set interface language
+ Plugins section (_plugins_) - Container to receive custom plugins
    + **Important** plugins section will not show up inside preview mode. A piece of code must be added to the viewer application
    HTML page to activate the plugin(s).

_Note:_ tools inside groups are not ordered as they appear inside the group list. They are ordered by selection order e.g. if
you click on _basemap_ then _layers_, inside the side menu _basemap_ will appear first because it was the first item selected from
the group.


# Services

##### Export Map

Export Map allows you to configure what components will be displayed by default and/or be customizable on the map when
exported as a png image. The _Is present_ checkbox under each component allows you to add the components by default to the exported map. The
_User can remove it_ checkbox allows you to choose if you want the user to be able to remove the component from the exported map.

The following components can be displayed or customized:
+ Title _- a default value can be set -_
+ Map
+ Legend
+ Map Elements (north arrow and scalebar)
+ Footnote _- a default value can be set -_.
+ Timestamp

##### Geosearch

The Geosearch section allows you to configure the geosearch tool capabilities. Geosearch allows you to find Canadian locations
by different categories like cities, provinces, topographic entities and so on leveraging the Geonames API. In addition of this,
Geosearch allows you to find locations by National Topographic System (NTS) name, forward sortation area (FSA) code and Latitude/Longitude values.
The last 3 search types options can be enabled by checking the corresponding checkbox on.

All URLs required by Geosearch are read-only values. If you encounter a problem whit these services, contact the person in
charge of the FGPA application instance you are using and/or
<a href="https://github.com/fgpv-vpgf/fgpa-apgf/issues" target="_blank">submit an issue</a>
to the FGPA developers team.

##### Service endpoints

The Service endpoints section lists all the services URLs the viewer application requires. These URLs are read-only values
and therefor cannot be modified. If you encounter a problems with these services, contact contact the person in charge of
the FGPV application instance you are using.


# Version

The version section allows you to select the version number of the FGP viewer you would like to use.


#  Language

The language section allows you to select the appropriate language for the configuration file.


#  Summary Panel

![](summarypanel.png "Summary panel")

The Summary Panel allows you to verify that your configuration file respects the FGPV schema. You can validate your configuration
file by clicking the Validate button ![](validate.png "Validate button").

After a validation is executed, green check marks ![](greencheckbox.png "Green check symbol") will appear beside configuration
fields that pass validation and red exclamation mark ![](redcircle.png "Red exclamation symbol") will appear beside configuration
fields that do not pass validation. To view a specific input field in the FGPA application, click on the desired field listed in
the validation summary tree; you will be automatically redirected to the appropriate tab or input field in the FGPA application.
+ Blue coloured items indicate items contained in groups such as Tile Schema, Spatial Extents Sets, Level of Detail sets, Basemaps and Layers groups.
+ _Italic_ formatted items are _advance configuration_ items. These items are hidden from the validation summary tree if the _Show advanced configuration
options_ checkbox is not checked.

Once all the configuration file fields pass validation, the Preview button ![](preview.png "Preview button") will be enabled.
You will be then able to click this button to preview your configuration file in an instance of the FGPV application. This
preview instance displays all the layers, basemaps, menus and options you have set as they would appear in a fully functional
FGPV application. Note that any custom Help and About file content cannot be displayed in the preview instance.

The preview instance may require a few seconds to initialize depending on:
+ Network location
+ Bandwidth availability
+ Number of layers in the map + Layer types and their sizes

![](previewsample.png "Viewer preview")

The summary panel might display other buttons (functions) alongside the Preview button. These optional functions are extensions
to the FGPA application and might not be available to all FGPA users.

You will find the following FGPA application version information at the bottom of the summary panel:
+ Version/build number
+ Date of version/build
+ Link of FGPA GitHub repository to report issues

![](summaryinfo.png "FGPA version information")


# Accessibility

This page is WCAG 2.0 AA compliant.

Keyboard Accessibility - Keyboard functionality is provided as an alternative for users who are unable to use a mouse. Use the Tab key to navigate forward to links and controls on the page. Press Shift+Tab to go back one step. Use the Enter or Spacebar keys to activate links and controls. Press Alt+s/Alt+x to expand or collapse the collection of layers.

You can reorder the array of basemaps and layers from the keyboard. To do so, when focus is one of the array item container, press down arrow key to move it downward or press up arrow key to move it upward.

You can focus directly to the Summary panel by pressing Alt+q. By pressing Alt+a, the focus will go back to the original
element.
