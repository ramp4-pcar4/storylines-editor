
##### Informations détaillées concernant la section _Légende_

Il y a deux types de légende

* Automatique
* structurée

La légende Automatique prendra les couches comme elle apparaissent dans la section _Couches_ et créera une légende par défaut.

Le légende structurée vous permet de personnaliser la légende pour modifier l'ordre, le regroupement, ajouter une description ainsi que de nombreux autres paramètres. Ci-dessous, vous trouverez des informations sur toutes les différentes personnalisations.

**IMPORTANT** - _Pour le moment, la légende structurée n'est pas validée selon le schéma du visualiseur de la PGF. Ainsi des problèmes lors du chargement pourraient survenir. Ceux-ci, peuvent être causés par des erreurs dans les valeurs (ex: mauvais ID), des attributs obligatoires manquants ou des erreurs dans la structure de la légende._-

### Légende structurée

Lorsque vous choisissez le type légende _structurée_, une nouvelle section apparaît sous le menu déroulant. Cette section contient trois parties qui peuvent être utilisées afin de personnaliser la légende:

1. **Édition manuelle**
2. **Validation**
3. **Édition automatique**

![Structured Legend](./help/images/structLegendSectionsFR.png)

#### 1. Édition manuelle

Cette section contient un éditeur de texte où les objets JSON de la légende peuvent être édités manuellement. Le contenu doit respecter les <a href="http://json-schema.org/specification-links.html#draft-4" target="_blank">spécifications de l'ébauche 4 de l'hyper schéma JSON</a>.

#### 2. Validation

Appuyer le bouton _VALIDER JSON_ exécutera un valideur JSON sur le contenu de la fenêtre d'édition. Si aucune erreur n'est trouvée, le message suivant sera affiché: ![Validation message](./help/images/messLegendValidationFR.png). Cependant, si le valideur identifie une erreur, le message suivant sera affiché: ( e.g. ![Error message](./help/images/messLegendErrorValidation.png) ).

#### 3. Édition automatique

Cette section contient cinq boutons qui peuvent être utilisés pour ajouter des objets JSON dans la fenêtre d'édition.

* ENTRÉE
* GROUPE
* INFORMATION
* COUCHE NON LIÉE
* GROUPE VISIBILITÉ

Une fois que vous avez ajouté une section d'édition automatique à la légende, elle sera mise en surbrillance lorsque la légende sera mise en évidence.

##### ENTRÉE

Une entrée de base dans la légende correspondant à une couche.

> **Fichier de configuration**

```json
    {
      "layerId": "crops"
    }
```

> **Interface**

![Legend entry](./help/images/legendEntry.png)

##### GROUPE

Un groupe peut contenir: des groupes, des entrées, des groupes de visibilité, des zones d'information et des couches non liées. Un groupe prend la forme d'un tableau dans le fichier de configuration.

> **Fichier de configuration**

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

##### INFORMATION

La section d'information peut être de type texte (_text_), titre (_title_), image (_image_) ou couche non liée (_unbound layer_).

> **Divers types de zones d'information dans un fichier de configuration**

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

symbologyStack - image: un URI de données ou une URL vers une source prenant en charge les en-têtes CORS
symbologyStack - sqlFilter: Une clause SQL par laquelle les attributs map et datatable peuvent être filtrés. Tous les résultats de la requête pour symbologyStack doivent couvrir tous les attributs de cette couche.

> **Interface**

![Info section](./help/images/legendInfoSection.gif)

##### COUCHE NON LIÉE

Une objet contenant un ensemble de symbologies (_symbology stack_). un ensemble de symbologies est un tableau d'images (_images_) ou d'icônes (_icon_).

> **Fichier de configuration**

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

##### GROUPE VISIBILITÉ

Un groupe de visibilité est un groupe d'entrées et/ou d'autres groupes de visibilité qui sont mutuellement exclusifs c-à-d. qu'un seul item peut être visible à la fois. Un bouton radio sera affiché.

> **Fichier de configuration**

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

> **Lien vers la page du projet**

<a href="https://fgpv-vpgf.github.io/fgpv-vpgf/v2.3.0-semi-weekly01/tutorial-legend.html" target="_blank">Pour de plus amples information...</a> (anglais seulement).