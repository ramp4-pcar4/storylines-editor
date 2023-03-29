##### How to use plugins on your own page

1.  Include the script and css (if needed) on the host page in the head section of the html
    ```
        <head>
            <script src="myPlugin.js" />
            <link rel="stylesheet" type="text/css" href="myPlugin.css" />
        </head>
    ```
2. Include the plugin in the property of the map element named ```rv-plugins```
    ```
        <div is="rv-map" rv-plugins="myPlugin"></div>
    ```


For more <a target="_blank" href="https://github.com/fgpv-vpgf/plugins">information </a>about core plugins.
 <br />
 For more <a target="_blank" href="http://fgpv-vpgf.github.io/fgpv-vpgf/v3.1.0-b5/#/developer/plugins">documentation 
 </a>about plugins.
