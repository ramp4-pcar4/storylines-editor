##### Detailed Information about _Legend_ Section

There is two types of legend

* Autopopulate
* Structured

The autopopulate legend will take the layers as they appear in the _Layers_ section and create a default legend.

The structured legend let you customize the legend to change the order, the grouping, add description and many other settings. Below, you can find information on all the different customization.

**IMPORTANT** - _For the time being, the structured legend is not validated against the FGP viewer schema, so loading problems can happen at preview time. This could be caused by errors in value (eg: bad ID), missing required attributes or errors in the legend structure._-

### Structured legend

When you choose _Structured_ legend type a new section appears at the bottom of the drop down menu. This section contains three main parts that can be used to edit and validate a customized legend:

1. Manual edition
2. Validation
3. Automatic edition

![Structured Legend](./help/images/structLegendSections.png)

#### 1. Manual edition

This section contains a text editor in which Legend JSON object can be edited manually. The content should respect the <a href="http://json-schema.org/specification-links.html#draft-4" target="_blank">JSON schema draft-4 specifications</a>.

#### 2. Validation

Pushing the _VALIDATE JSON_ button will run a JSON validator over the content of the editor window. If no error is found, this message will be displayed: ![Validation message](./help/images/messLegendValidation.png). However, if the validator identified errors, a message will be shown
( e.g. ![Error message](./help/images/messLegendErrorValidation.png) ).

#### 3. Automatic edition

This section contains 5 buttons that can be used to add JSON object to the editor window content.

* ENTRY
* ENTRY GROUP
* INFO SECTION
* UNBOUND LAYER
* VISIBILITY SET

Once you have added an automatic edition section to the legend it will be highlighted when legend get focus.

##### ENTRY

This is a basic legend entry that corresponds to a layer.

> **Configuration file**

```json
    {
      "layerId": "crops"
    }
```

> **Interface**

![Legend entry](./help/images/legendEntry.png)

##### ENTRY GROUP

A group can contains: groups, entries, visibility sets, info sections et unbound layer. It takes the form of an array in the configuration file.

> **Configuration file**

```json
    {
      "name": "An entry group",
      "expanded": true,
      "controls": [
        "visibility"
      ],
      "children": [
          {
            "layerId": "powerplant100mw-electric"
          },
          {
            "layerId": "powerplant100mw-naturalGas"
          },
          {
            "layerId": "powerplant100mw-liquids"
          }
      ]
    }
```

> **Interface**

![Group entry](./help/images/legendEntryGroup.png)

##### INFO SECTION

Info section can be of type _text_, _title_, _image_ or _unbound layer_.

> **Collections of different info sections from a configuration file**

```json
    {
        "infoType": "text",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mauris augumattis at nunc et, pharetra feugiat ex. Maecenas et."
    },
    {
        "infoType": "title",
        "content": "Maecenas et."
    },
    {
        "infoType": "image",
        "content": "http://fgpv.cloudapp.net/demo/__assets__/solazy.gif"
    },
    {
        "infoType": "unboundLayer",
        "layerName": "My unbound layer",
        "symbologyStack": [
            {
                "image": "http://fgpv.cloudapp.net/demo/__assets__/beautiful.png",
                "text": ""
            }
        ],
        "symbologyRenderStyle": "images"
    }
```
symbologyStack - image: Either a data URI or a URL to a source that supports CORS headers
symbologyStack - sqlFilter: An SQL where clause by which the map and datatable attributes can be filtered. All the query results for the symbologyStack should cover all attributes for that layer.

> **Interface**

![Info section](./help/images/legendInfoSection.gif)

##### UNBOUND LAYER

This is an entry containing a symbology stack. A symbology stack is an array of images or icons.

> **Configuration file**

```json
    {
      "infoType": "unboundLayer",
      "layerName": "How to catch Santa (//www.pusheen.com/)",
      "symbologyStack": [
        {
          "image": "http://fgpv.cloudapp.net/demo/__assets__/step1.gif",
          "text":"1. Set your bait"
        },
        {
          "image": "http://fgpv.cloudapp.net/demo/__assets__/step2.gif",
          "text":"2. Hide"
        },
        {
          "image": "http://fgpv.cloudapp.net/demo/__assets__/step3.gif",
          "text":"3. Don't eat the bait"
        },
        {
          "image": "http://fgpv.cloudapp.net/demo/__assets__/step4.gif",
          "text":"4. Don't do it"
        },
        {
          "image": "http://fgpv.cloudapp.net/demo/__assets__/step5.gif",
          "text":"5. Stop!!"
        },
        {
          "image": "http://fgpv.cloudapp.net/demo/__assets__/step6.gif",
          "text":"6. You ruinted it!"
        }
      ],
      "symbologyRenderStyle": "images"
    }
```

> **Interface**

![Unbound Layer](./help/images/legendUnboundLayer.gif)

##### VISIBILITY SET

A visibility set is a group of entries and/or entry groups that are mutually exclusive e.g. only one item could be shown at a time. A radio button control will be displayed.

> **Configuration file**

```json
    "exclusiveVisibility": [
      {
        "layerId": "powerplant100mw-naturalGas"
      },
      {
        "layerId": "powerplant100mw-electric"
      },
      {
        "layerId": "powerplant100mw-liquids"
      }
    ]
```

> **Interface**

![Visibility set](./help/images/legendVisibilitySet.png)

> **Link to project's page**

<a href="https://fgpv-vpgf.github.io/fgpv-vpgf/v2.3.0-semi-weekly01/tutorial-legend.html" target="_blank">For more information...</a>