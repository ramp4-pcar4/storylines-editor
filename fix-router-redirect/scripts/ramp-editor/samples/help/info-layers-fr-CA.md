##### Informations détaillées concernant la section _Couche_

Le visualisateur supporte 5 types de couches différentes
* ESRI feature
* ESRI dynamic (image)
* ESRI image
* ESRI tile (image)
* WMS (image)

Pour chaque type, vous devez définir au moins ces valeurs:
1. Type de couche.
2. Nom pour la couche. Ce nom apparaîtra dans le sélecteur de couches et sera utilisé pour générer l'identifiant unique de la couche.
3. URL pour la couche.
4. Pour ESRI dynamic et WMS, vous devez ajouter au moins une entrée de couche
    * Index de la couche et un nom (ESRI feature).
    * Identifiant de la couche à ajouter et un nom (WMS).

Si vous souhaitez définir plus de paramètres comme les contrôles disponibles et / ou personnaliser la table, cochez la case
_Afficher les options de configuration avancées_ pour les rendre disponibles.

Vous pouvez réorganiser les couches à votre convenance, mais gardez à l'esprit que les couches ne sont réordonnables qu'à
l'intérieur de leur propre type (feature ou image). Donc, même si l'interface vous permet de les mélanger, ils seront regroupés dans le visualisateur.


**IMPORTANT** - La modification du type de couche d'une couche existante n'est pas une bonne bonne pratique. Il est préférable
de créer une nouvelle couche puis de supprimer l'ancienne.
