##### Detailed Information about _Layers_ Section

The viewer support 5 different types of layer
* ESRI feature
* ESRI dynamic (image)
* ESRI image
* ESRI tile (image)
* WMS (image)

For each type you need to set at least these values:
1. Layer type.
2. Name for the layer. This name will show up inside the layers selector and will be used to generate the layer ID.
3. URL for the layer.
4. For ESRI dynamic and WMS you need to add at least one layer entry
    * Layer index and a name (ESRI dynamic).
    * Id of the layer to add and a name (WMS).

If you want to set more settings like available controls and/or customize table, check the _show advanced configuration options_
check box to make them available.

You can reorder the layers at your convenience but keep in mind layers are only reorderable inside their own layer type
(feature or image). So even if the interface let you mix them up, they will be regroup inside the viewer.

**IMPORTANT** - Modifying the layer type of an existing layer is not a good practice. It is better to create a new layer
and then delete the old one.
