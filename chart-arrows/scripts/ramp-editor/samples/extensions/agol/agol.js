setTimeout(() => {
    // add translations
    api.addTranslations('agollabel', ['Import from ArcGIS Online', 'Importer de ArcGIS Online']);
    api.addTranslations('agoltooltip', ['Import from ArcGIS Online', 'Importer de ArcGIS Online']);
    api.addTranslations('agol.id', ['Enter id' , 'Entrez l\'identifiant']);
    api.addTranslations('agol.title', ['Import from ArcGIS Online', 'Importer de ArcGIS Online']);
    api.addTranslations('agol.erroritem', ['Id does not exist or is inaccessible.', 'L\'identifiant n\'existe pas ou est inaccessible.']);
    api.addTranslations('agol.erroruser', ['Wrong user name and/or password.', 'Mauvis non d\'usagé et/ou mot de passe.']);
    api.addTranslations('agol.username', ['Enter username', 'Entrer votre nom d\'usagé']);
    api.addTranslations('agol.password', ['Enter password', 'Entrer votre mot de passe']);

    // add function to scope
    scope.agol = () => {
        api.setExtensionDialog(`<md-dialog aria-label="{{ \'extensions.agoltooltip\' | translate }}" class="av-agol-dialog">
                <av-content-panel close-panel="self.close()"
                        title-style="title" title-value="{{ \'extensions.agoltooltip\' | translate }}">
                        ${agolTemplate()}
                </av-content-panel>
            '</md-dialog>`, 'av-agol-button', agolController);
    }

    // add button to the interface
    api.addButton('agol()', 'agollabel', 'agoltooltip', 'av-agol-button');
}, 2000);

/**
 * Create agol template
 * @function agolTempalte
 * @return {String} the agol template
 */
function agolTemplate() {
    return `
    <section class="av-agol-login">
            <md-input-container class="md-block" flex-gt-xs>
                <label>{{ 'extensions.agol.username' | translate }}</label>
                <input type="text" name="username" ng-model="self.agolUsername" av-focus autocomplete="on" required></input>
                <div class="av-error">{{ self.errorUser }}</div>
            </md-input-container>
            <md-input-container class="md-block" flex-gt-xs>
                <label>{{ 'extensions.agol.password' | translate }}</label>
                <input type="password" name="password" ng-model="self.agolPassword" av-focus required></input>
                <div class="av-error">{{ self.errorUser }}</div>
            </md-input-container>
            <md-input-container class="md-block" flex-gt-xs>
                <label>{{ 'extensions.agol.id' | translate }}</label>
                <input type="text" name="id" ng-model="self.agolId" av-focus autocomplete="on" required></input>
                <div class="av-error">{{ self.errorId }}</div>
            </md-input-container>
            <md-button
                class="av-button-square md-raised md-primary av-savedialog-save"
                ng-click="self.downloadArcGIS()"
                ng-disabled="self.agolId.length !== 32 || (self.agolUsername.length === 0 || self.agolPassword.length === 0)">
                {{ 'button.import' | translate }}
                <md-tooltip>{{ 'button.import' | translate }}</md-tooltip>
            </md-button>
            <md-button
                class="av-button-square md-raised av-savedialog-cancel"
                ng-click="self.cancel()">
                {{ 'button.cancel' | translate }}
                <md-tooltip>{{ 'button.cancel' | translate }}</md-tooltip>
            </md-button>
        </section>
        <section class="av-agol-import hidden">
            <ul class="nav">
                <li ng-repeat="item in self.items">
                    <div ng-if="item.value === 'sectionLabel'" class="av-agol-sectionlabel">
                        {{ item.desc }}
                        <md-divider></md-divider>
                    </div>
                    <div ng-if="item.value !== 'sectionLabel'">
                        <md-checkbox aria-label="{{ 'form.showadvance' | translate }}" class="md-primary"
                            ng-model="self.items[$index].active">
                            {{ item.desc }} : {{ item.value }}
                        </md-checkbox>
                    </div>
                </li>
            </ul>
            <md-button
                class="av-button-square md-raised md-primary av-savedialog-save"
                ng-click="self.import()">
                {{ 'button.import' | translate }}
                <md-tooltip>{{ 'button.import' | translate }}</md-tooltip>
            </md-button>
            <md-button
                class="av-button-square md-raised av-savedialog-cancel"
                ng-click="self.cancel()">
                {{ 'button.cancel' | translate }}
                <md-tooltip>{{ 'button.cancel' | translate }}</md-tooltip>
            </md-button>
        </section>
    `;
}

/**
 * Create agol controller
 * @function agolController
 */
function agolController() {
    'ngInject';
    const self = this;

    // the agol url
    const url = 'https://nrcan-rncan.maps.arcgis.com/';

    self.close = api.hideDialog();
    self.cancel = self.close;
    self.downloadArcGIS = downloadArcGIS;
    self.import = importToModel;
    self.agolId = 'd12125a278484ffaaa38d6dd45892ad8';
    self.agolUsername = 'johann.levesque';
    self.agolPassword = '***';
    //'e0a5da1e07ea42269fd3f4b0d0d245ce'; // 'd12125a278484ffaaa38d6dd45892ad8';

    // lookup item to match between model and agol
    self.items = [{
        'desc': 'Side Menu (UI)'
    }, {
        'agol': 'title',
        'model': 'ui.title',
        'active': true,
        'desc': 'Title value'
    }];

    self.layers =[{
        'agol': 'mapData.operationalLayers.url',
        'model': 'map.layers.url',
        'active': true,
        'desc': 'The layer url'
    }, {
        'agol': 'mapData.operationalLayers.layerType',
        'model': 'map.layers.layerType',
        'active': true,
        'desc': 'The layer type'
    }];

    /**
     * Download info from ArcGIS Online
     * @function downloadArcGIS
     * @private
     */
    function downloadArcGIS() {
        self.errorUser = '';
        self.errorId = '';

        api.getAgolToken(url, self.agolUsername, self.agolPassword).then(res => {
            api.getAgolId(url, self.agolId, res.token).then(res => parseAgol(res))
                .catch(() => { self.errorId = api.translate('extensions.agol.erroritem') });
        }).catch(() => { self.errorUser = api.translate('extensions.agol.erroruser') });
    }

    /**
     * Parse info from ArcGIS Online to generate from for user to choose what to import
     * @function parseAgol
     * @private
     * @param {Object} data the json response
     */
    function parseAgol(data) {
        console.log(data);
        // hide login section and show content section
        document.getElementsByClassName('av-agol-login')[0].classList.add('hidden');
        document.getElementsByClassName('av-agol-import')[0].classList.remove('hidden');
        document.getElementsByClassName('av-agol-dialog')[0].classList.add('av-agolimport-dialog');

        // loop trough all the items to have in import form and generate them
        for (let item of self.items) {
            item.value = (typeof data[item.agol]) !== 'undefined' ?
                api.getAgolDataValue(data, item.agol) : 'sectionLabel';
        }
    }

    /**
     * Import selected values to model
     * @function importToModel
     * @private
     */
    function importToModel() {
        // get all active item
        const active = self.items.filter(item => item.active === true);

        // set values inside model
        for (let item of active) {
            api.setModelValue(item.model, item.value)
        }

        self.close();
    }
}