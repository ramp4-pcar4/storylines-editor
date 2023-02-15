##### Comment utiliser les modules sur votre propre page

1. Incluez le script et le css (si nécessaire) sur la page hôte dans la section **head** du fichier HTML.
    ```
        <head>
            <script src = "myPlugin.js" />
            <link rel = "stylesheet" type = "text / css" href = "myPlugin.css" />
        </ head>
    ```
2. Incluez le module dans la propriété de l'élément de la carte nommé ```rv-plugins```
    ```
        <div is = "rv-map" rv-plugins = "myPlugin"> </ div>
    ```


 Pour plus d'<a target="_blank" href="https://github.com/fgpv-vpgf/plugins">informations </a>sur les principaux modules (seulement en anglais).
 <br />
 Pour plus de <a target="_blank" href="http://fgpv-vpgf.github.io/fgpv-vpgf/v3.1.0-b5/#/developer/plugins">documentation </a>sur les modules (seulement en anglais).