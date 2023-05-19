##### Detailed Information about _Extents and Level of Details_ Section

This is usually the first section to setup. It will define which spatial reference system your viewer will use. Depending
on the template you are using, maybe most of this section is already filled. If you want to modify these settings, check
the "show advanced configuration options" check box then follow these steps:

1. You need to add one Tile schema by spatial reference
    * Enter a name.The name will be use to generate the tile schema ID.
2. You need to create one Spatial Extent set by Tile Schema. In this section you will define the spatial reference system to use
    * To find which WKID to use you can refer to this
    <a href="http://spatialreference.org/ref/" target="_blank">spatial reference list</a>.
    * Enter a unique ID then set at least the default extent (set extent buttons only works for those wkid: 3978, 3857 and 102100).
3. You can set one LODs (Levels of Details Sets) by Tile Schema
    * Enter a unique ID.
    * Use "Set Levels of Details" button with your basemap URL. A TileLayer has a number of LODs and each LOD corresponds
    to a map at a given scale or resolution. You can then remove some of them to restrict levels where user can zoom.
4. You need to link your Tile Schema with the Spatial Extent Set and Level of Details Sets created previously
    * Select their ID in the Tile Schema section.
