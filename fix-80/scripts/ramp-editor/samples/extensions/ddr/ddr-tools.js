// FIXME: we cant use ES6 because of IE11. When we can get rid of this non browser, update the code (https://kangax.github.io/compat-table/es6/)
// set translations

/**
* @module ddr_tools.js
* @memberof extensions
* @restrict E
* @description
*
* The data dissemination repository ddr publishng process to delete, upload, publish
* a zip file package (created by a user) containing a fgp author conﬁguration ﬁle (conﬁg-ﬁle.json),HTML snippet and it can have folders (Images/help/about folders).
*
* Users will need a DDR account to use authoring tool DDR extension.
* Users need to contact nrcan.ddrsupport.rncan@canada.ca to create an account.
* All conﬁguration packages will be copied to SSC Prod server (internal and external).
 */
const lang = localStorage.getItem('fgpa-lang');
const translations = {
    'en-CA': {
        fmeUser: 'Username: ',
        fmePass: 'Password: ',
        fmeUserPH: 'Enter Username...',
        fmePassPH: 'Enter Password...',
        fmeLogin: 'Login',
        fmeErrorConn: 'Connection error: the connection to the server failed',
        register: 'If you do not have a DDR account, contact support at ',
        cancel: 'Cancel',
        upload: 'Upload',
        delete: 'Delete',
        publish: 'Publish',
        uploaded: 'Selected file: ',
        runupload: 'Start Upload',
        update: 'Update existing package',
        size: 'bytes',
        configFileName: 'Config File Name',
        chooseFile: 'Choose a zip file',
        userEmail: 'User Email: ',
        deletelist: 'Select folders to delete ',
        publishlist: 'Select folder to publish ',
        publishenv: 'Select environnement to publish to',
        privatelist: 'Private;privateInternal',
        internallist: 'Internal;publicInternal',
        externallist: 'External;publicExternal',
        messType: 'Message Type: ',
        messSev: 'Message Severity: ',
        messTypeAll: 'All',
        messTypeAdmin: 'Administrator',
        messTypeUser: 'User',
        messSevAll: 'All',
        messSevInfo: 'Information',
        messSevWarn: 'Warning',
        messSevErr: 'Error',
        messSevSucc: 'Success',
        messSevFatal: 'Fatal',
        progress: 'Execution in progress...',
        wait: 'Please wait.',
        reportTitle: 'Execution Report',
        fgpId: 'FGP ID: ',
        jobId: 'Job Id: ',
        headTime: 'Timestamp',
        headSev: 'Severity',
        headMess: 'Messages',
        snippetLabel: 'HTML Snippet in ZIP file',
        snippet1: 'None',
        snippet2: 'PreSnippet.html',
        snippet3: 'PostSnippet.html',
        snippet4: 'All'
    },

    'fr-CA': {
        fmeUser: 'Nom d\'usagé : ',
        fmePass: 'Mot de passe : ',
        fmeUserPH: 'Entrer un nom d\'usagé...',
        fmePassPH: 'Entrer un mot de passe...',
        fmeLogin: 'Identification',
        fmeErrorConn: 'Erreur de connexion : la connexion au serveur à échoué',
        register: 'Si vous ne possédez pas de compte DDR, contactez le support technique à ',
        cancel: 'Annuler',
        upload: 'Téléverser',
        delete: 'Supprimer',
        publish: 'Publier',
        uploaded: 'Fichier sélectionné : ',
        runupload: 'Débuter le Téléversement',
        update: 'Mettre à jour un paquet existant',
        size: 'octets',
        configFileName: 'Nom du fichier de configuration',
        chooseFile: 'Sélectionnez un fichier zip',
        userEmail: 'Courriel utilisateur : ',
        deletelist: 'Sélectionnez les répertoires à supprimer ',
        publishlist: 'Sélectionnez le répertoire à publier ',
        publishenv: 'Sélectionnez l\'environnement dans lequel publier',
        privatelist: 'Privé;privateInternal',
        internallist: 'Interne;publicInternal',
        externallist: 'Externe;publicExternal',
        messType: 'Type du message : ',
        messSev: 'Sévéritée du message : ',
        messTypeAll: 'Tous',
        messTypeAdmin: 'Administrateur',
        messTypeUser: 'Utilisateur',
        messSevAll: 'Tous',
        messSevInfo: 'Information',
        messSevWarn: 'Attention',
        messSevErr: 'Erreur',
        messSevSucc: 'Succès',
        messSevFatal: 'Fatal',
        progress: 'Exécution en cours...',
        wait: 'Veuillez patienter.',
        reportTitle: 'rapport d\'exécution',
        fgpId: 'PGF id :',
        jobId: 'Traitement Id :',
        headTime: 'Horodatage',
        headSev: 'Sévéritée',
        headMess: 'Messages',
        snippetLabel: 'Snippet HTML dans le fichier ZIP',
        snippet1: 'Aucun',
        snippet2: 'PreSnippet.html',
        snippet3: 'PostSnippet.html',
        snippet4: 'Tous'
    }
};

// bind function to set label (http://jsfiddle.net/RkTMD/)

/**
 * Bind function to set labels in frame-ddr.html elements (http://jsfiddle.net/RkTMD/).
 *
 * @function bindHTML
 * @private
 * @param {Object} element html element with the specified ID
 * @param {String} data translated text
 * @param {String} att element property either - innertext default , placeholder, value
 */
 function bindHTML(element, data, att) {
    if (typeof att === 'undefined') {
        att = 'innerText';
    }

    this.data = data;
    this.element = element;
    element[att] = data;
}

// set login interface
bindHTML(document.getElementById('avFMEUser'), translations[lang].userEmail);
bindHTML(document.getElementById('avFMEPass'), translations[lang].fmePass);
bindHTML(document.getElementById('avTokenUser'), translations[lang].fmeUserPH, 'placeholder');
bindHTML(document.getElementById('avTokenPass'), translations[lang].fmePassPH, 'placeholder');
bindHTML(document.getElementById('avFMELogin'), translations[lang].fmeLogin, 'value');
bindHTML(document.getElementById('avRegister'), translations[lang].register);
bindHTML(document.getElementsByClassName('av-error-connect')[0], translations[lang].fmeErrorConn);

// set functions interface
bindHTML(document.getElementById('avCancelUpload'), translations[lang].cancel, 'value');
bindHTML(document.getElementById('avCancelDelete'), translations[lang].cancel, 'value');
bindHTML(document.getElementById('avCancelPublish'), translations[lang].cancel, 'value');
bindHTML(document.getElementById('avCancelReport'), translations[lang].cancel, 'value');
bindHTML(document.getElementById('avUpload'), translations[lang].upload, 'value');
bindHTML(document.getElementById('avDelete'), translations[lang].delete, 'value');
bindHTML(document.getElementById('avPublish'), translations[lang].publish, 'value');

// set upload interface
bindHTML(document.getElementById('avUploaded'), translations[lang].uploaded);
bindHTML(document.getElementById('avRunUpload'), translations[lang].runupload, 'value');
bindHTML(document.getElementById('avUpdateLabel'), translations[lang].update);

// set delete interface
bindHTML(document.getElementById('avDeletePrivate'), translations[lang].privatelist.split(';')[0]);
bindHTML(document.getElementById('avDeleteInternal'), translations[lang].internallist.split(';')[0]);
bindHTML(document.getElementById('avDeleteExternal'), translations[lang].externallist.split(';')[0]);
bindHTML(document.getElementById('avDeleteList'), translations[lang].deletelist);
bindHTML(document.getElementById('avRunDelete'), translations[lang].delete, 'value');

// set publish interface
bindHTML(document.getElementById('avPublishPrivate'), translations[lang].publishlist);
bindHTML(document.getElementById('avPublishEnv'), translations[lang].publishenv);
bindHTML(document.getElementById('avUpdatePublishLabel'), translations[lang].update);
bindHTML(document.getElementById('avRunPublish'), translations[lang].publish, 'value');

// set report interface (contains message and select dropdown)
bindHTML(document.getElementById('avMessTypeLbl'), translations[lang].messType);
bindHTML(document.getElementById('avMessSevLbl'), translations[lang].messSev);
bindHTML(document.getElementById('avProgress'), translations[lang].progress);
bindHTML(document.getElementById('avWait'), translations[lang].wait);

const optsType = [translations[lang].messTypeAll, translations[lang].messTypeAdmin, translations[lang].messTypeUser];
const messType = document.getElementById('avMessageType');
const optsSev = [translations[lang].messSevAll, translations[lang].messSevInfo, translations[lang].messSevWarn,
    translations[lang].messSevErr, translations[lang].messSevSucc, translations[lang].messSevFatal];
const messSev = document.getElementById('avMessageSev');

for (let i = 0; i < optsType.length; i++) {
    let option = document.createElement('option');
    option.text = optsType[i];
    messType.add(option);
}

for (let i = 0; i < optsSev.length; i++) {
    let option = document.createElement('option');
    option.text = optsSev[i];
    messSev.add(option);
}

//--------------------------------------------------
// GLOBAL VARIABLES - TOP
//--------------------------------------------------
let server;
let json;
let repository;
let workspace;
let session;
let path;
let fileInput;
let files;
let outputStream;
let serverUrl;
let response;

// DDR_Registry table query results in json
let registry;
let publisher;
let publisherRole;
let publisherInfo;
let publisherName;
let publisherNameConcat;
let publisherDepartment;
let departmentID;
let publisherID;
let authorDepartmentID;
let authorPublisherID;
let publisherEmail;

$(document).ready(function() {

    // FME Server repository and url for the DDR Modules
    repository = 'AuthoringTool';

    //--------------------------------------------------
    // FGP SERVER URL
    //--------------------------------------------------
    // DEV
    serverUrl="http://fgp-0001030.dev.global.gc.ca";
    // PROD
    // serverUrl="http://fgp-5001985.prod.global.gc.ca";

    // Get fme "guest" token
    getToken();

});

/**
 * Get FME session token from login parameters.
 *
 * @function getToken
 * @private
 */
 function getToken() {
    const username = 'guest';
    const password = 'guest';

    const url = serverUrl + '/fmetoken/generate.json?user=' + username + '&password=' + password;
    $.ajax({
        url: url,
        type: 'GET',
        success: function(json) {
            FMEServer.init({
                server : serverUrl,
                token : json.serviceResponse.token
            });
            // Create an instance of DDRRegistry class
            registry = new DDRRegistry(username, password, serverUrl);

            $('.av-login-section').show();

            // Login page - On submit button click event
            $('#avFMELogin').click(function(event) {
                event.preventDefault();

                // Reset validate publisher error element
                $('.av-error-validatePublisher').hide().empty();

                const user_email = $('#avTokenUser').val();
                const user_password = $('#avTokenPass').val();

                // Run ValidatePublisher.fmw workspace to validate publisher credentials
                // Returns :
                //      - On ERROR : Error mesage
                //      - On SUCCESS : Publisher role
                FMEServer.runDataStreaming(repository, 'validatePublisher.fmw', 'PUBLISHER_EMAIL=' + user_email + '&PUBLISHER_PASSWORD=' + user_password, getPublisherRole);

                // Hide login section
                $('.av-login-section').hide();
                $('.av-progress-section').show();

            });
        },
        error: function() {
            document.getElementsByClassName('av-error-connect')[0].classList.remove('hidden');
        }
    });
}

/**
 * Determine publisher role.
 *
 * @function getPublisherRole
 * @private
 * @param {Object} json file from fmeserver
 */
function getPublisherRole(json) {

    $('.av-progress-section').hide();

    response = json.MessageList[0];

    if (response.MessageType === 'INTERNAL') {

        // Get publisher attributes needed for populating registry table auyhor_dataset
        publisherInfo = response.EnMessage;
        publisherNameConcat = publisherInfo.split(',')[0];
        publisherDepartment = publisherInfo.split(',')[1];
        publisherID = publisherInfo.split(',')[2];
        departmentID = publisherInfo.split(',')[3];
        publisherEmail= publisherInfo.split(',')[4];
        publisherName = publisherInfo.split(',')[5];

        // Switch on publisher role
        switch (response.FrMessage) {
        case 'admin_publisher':
            publisherRole = 'admin_publisher';
            break;
        case 'department_publisher':
            publisherRole = 'department_publisher';
            break;
        case 'basic_publisher':
            publisherRole = 'basic_publisher';
            // Basic publisher doesn't have the privilege to publish in external (PROD) directory
            $('#avPublish').hide();
        }
        $('.av-function-section').show();
    }
    else {
        // Hide login section
        $('.av-login-section').show();
        if (lang === 'fr-CA') {
            $('.av-error-validatePublisher').show().append('Erreur: ' + response.FrMessage);
        }
        else if (lang === 'en-CA') {
            $('.av-error-validatePublisher').show().append('Error: ' + response.EnMessage);
        }
    }
}

//--------------------------------------------------
//  SECTION 2 - Select function and receive info
//--------------------------------------------------
/*
* Display main menu function section by hiding displayed section via setting html attributes.
*
* @function returnMainMenu
* @private
* @param {String} menu html user menu displayed
*/
function returnMainMenu(menu) {
    $('.av-' + menu + '-section').hide();
    $('.av-function-section').show();
}

/*
* Set FME Server workspace for the current session id.
*
* @function selectUpload
* @private
*/
function selectUpload() {
    $('.av-function-section').hide();
    $('.av-upload-section').show();

    workspace = 'AT_Upload.fmw'
    // Ask FME Server for the current session id and set it
    FMEServer.getSession(repository, workspace, setVars);
}

/**
 * From selected role, get files to delete.
 *
 * @function selectDelete
 * @private
 */
function selectDelete() {
    $('.av-progress-section').show();
    $('.av-function-section').hide();

    // Switch on publisher role
    switch (publisherRole) {
    case 'admin_publisher':
        registry.getRecord('get_author_publisher_department', getDeleteList);
        break;
    case 'department_publisher':
        registry.getRecord('get_author_publisher_department', getDeleteList, 'department_id=' + departmentID);
        break;
    case 'basic_publisher':
        registry.getRecord('get_author_publisher_department', getDeleteList, 'publisher_id=' + publisherID);

    }
}

/**
 * From publisher role, get files to publish.
 *
 * @function selectPublish
 * @private
 */
 function selectPublish() {
    $('.av-progress-section').show();
    $('.av-function-section').hide();

    // Switch on publisher role
    switch (publisherRole) {
    case 'admin_publisher':
        registry.getRecord('get_author_publisher_department', getPublishList, 'author_dataset_env=private');
        break;
    case 'department_publisher':
        registry.getRecord('get_author_publisher_department', getPublishList, 'department_id=' + departmentID + '&author_dataset_env=private');
    }
}

/**
 * Get list of files that can be deleted and set the interface.
 *
 * @function getDeleteList
 * @private
 * @param {Object} json file from fmeserver
 */
function getDeleteList(json) {
    $('.av-progress-section').hide();
    $('.av-delete-section').show();

    const list = {
        private: [],
        internal: [],
        external: []
    }

    if (json.matched_records !== 0) {
        for (let i=0; i<json.get_author_publisher_department.length; i++) {


            if (json.get_author_publisher_department[i].author_dataset_env === 'private') {
                list.private.push(
                    json.get_author_publisher_department[i].dataset_folder_name + ';' +
                    json.get_author_publisher_department[i].author_dataset_id + ';' +
                    json.get_author_publisher_department[i].dataset_folder_path + ';' +
                    json.get_author_publisher_department[i].author_dataset_env + ';' +
                    json.get_author_publisher_department[i].tbs_department_acronym_en + ';' +
                    json.get_author_publisher_department[i].publisher_name
                );
            }
            else if (json.get_author_publisher_department[i].author_dataset_env === 'internal') {
                list.internal.push(
                    json.get_author_publisher_department[i].dataset_folder_name + ';' +
                    json.get_author_publisher_department[i].author_dataset_id + ';' +
                    json.get_author_publisher_department[i].dataset_folder_path + ';' +
                    json.get_author_publisher_department[i].author_dataset_env + ';' +
                    json.get_author_publisher_department[i].tbs_department_acronym_en + ';' +
                    json.get_author_publisher_department[i].publisher_name
                );
            }
            else if (json.get_author_publisher_department[i].author_dataset_env === 'external') {
                list.external.push(
                    json.get_author_publisher_department[i].dataset_folder_name + ';' +
                    json.get_author_publisher_department[i].author_dataset_id + ';' +
                    json.get_author_publisher_department[i].dataset_folder_path + ';' +
                    json.get_author_publisher_department[i].author_dataset_env + ';' +
                    json.get_author_publisher_department[i].tbs_department_acronym_en + ';' +
                    json.get_author_publisher_department[i].publisher_name
                );
            }
        }
    }

    // create privatelist
    setInterface('av-deletelist-private', list.private, 'delprivate');

    // create internallist
    setInterface('av-deletelist-internal', list.internal, 'delinternal');

    // create externallist
    setInterface('av-deletelist-external', list.external, 'delexternal');
}

/**
 * Determine publisher role and set the interface.
 *
 * @function getPublishList
 * @private
 * @param {Object} json file from fmeserver
 */
 function getPublishList(json) {
    $('.av-progress-section').hide();
    $('.av-publish-section').show();

    const list = {
        private: []
    }

    if (json.matched_records !== 0) {
        for (let i=0; i<json.get_author_publisher_department.length; i++) {

            list.private.push(
                json.get_author_publisher_department[i].dataset_folder_name + ';' +
                json.get_author_publisher_department[i].author_dataset_id + ';' +
                json.get_author_publisher_department[i].publisher_id + ';' +
                json.get_author_publisher_department[i].department_id + ';' +
                json.get_author_publisher_department[i].tbs_department_acronym_en + ';' +
                json.get_author_publisher_department[i].publisher_name + ';' +
                json.get_author_publisher_department[i].author_metadata_id + ';' +
                json.get_author_publisher_department[i].author_dataset_env + ';' +
                json.get_author_publisher_department[i].dataset_folder_path
            );
        }
    }
    // create privatelist
    setInterface('av-publishlist-private', list.private, 'pubprivate');

    // create environement list
    setInterface('av-publishlist-env', [translations[lang].internallist, translations[lang].externallist], 'pubenv');
}

/**
 * Set the user interface for published lists.
 *
 * @function setInterface
 * @private
 * @param {String} id html id of element
 * @param {Array} list fieldset list to display
 * @param {String} type publisher type - pubprivate ,pubenv
 */
 function setInterface(id, list, type) {
    // remove existing values
    $('.' + id).not('legend').children().not('legend').remove();

    // get fieldset then loop array to add elements
    const elem = document.getElementsByClassName(id)[0];
    const length = list.length;
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = list[i];
            input.id = type  + '-' + list[i];

            const label = document.createElement('label');
            label.setAttribute('for', input.id);
            if (!input.id.includes('pubenv')){
                label.innerHTML = list[i].split(';')[0] + ' (' + list[i].split(';')[4] + ' | ' + list[i].split(';')[5] + ')';
            }
            else {
                label.innerHTML = list[i].split(';')[0];
            }

            elem.append(input);
            elem.append(label);
            elem.append(document.createElement('br'));
        }
    } else {
        elem.style.display = 'none';
    }
}

//--------------------------------------------------
//  SECTION 3 - Delete and publish
//--------------------------------------------------

/**
 * Delete list of selected files.
 *
 * @function deleteList
 * @private
 */
 function deleteList() {
    const deleteArr = [];
    $('.av-deletelist-private :checkbox').each(function() {
        if (this.checked) {
            deleteArr.push(this.value);
        }
    });
    $('.av-deletelist-internal :checkbox').each(function() {
        if (this.checked) {
            deleteArr.push(this.value);
        }
    });
    $('.av-deletelist-external :checkbox').each(function() {
        if (this.checked) {
            deleteArr.push(this.value);
        }
    });

    // Run AT_Delete.fmw
    FMEServer.runDataStreaming(repository, "AT_Delete.fmw", "USER_EMAIL=" + publisherEmail + "&DELETE_ARRAY=" + deleteArr, showMessages);

    // FIXME show message, then have a button to go back to menu
    $('.av-delete-section').hide();
    $('.av-progress-section').show();
}

/**
 * Publish list of selected files.
 *
 * @function publish
 * @private
 */
 function publish() {
    const publishArr = [];
    const publishEnv = [];
    $('.av-publishlist-private :checkbox').each(function() {
        if (this.checked) {
            publishArr.push(this.value);
        }
    });
    $('.av-publishlist-env :checkbox').each(function() {
        if (this.checked) {
            publishEnv.push(this.value);
        }
    });

    // check if need to Update
    const update = $('#avUpdatePublish')[0].checked;

    // Run AT_Publish.fmw
    FMEServer.runDataStreaming(repository, "AT_Publish.fmw", "PUBLISHER_EMAIL=" + publisherEmail + "&PUBLISH_ARRAY=" + publishArr +"&PUBLISH_ENV=" + publishEnv +"&UPDATE_FLAG=" + update, showMessages);

    // FIXME show message, then have a button to go back to menu
    $('.av-publish-section').hide();
    $('.av-progress-section').show();
}

//--------------------------------------------------
//  SECTION 4 - Package Upload and update
//--------------------------------------------------

/**
 * Run upload zip package to FME.
 *
 * @function runUpdate
 * @private
 */
 function runUpdate() {
    // Remove message when changing section
    $('.av-upload-section').hide();
    $('.av-progress-section').show();

    // check if need to Update
    const update = $('#avUpdate')[0].checked;

    $('input[name="UPLOAD_OVERWRITE"]').val(update);

    runWorkspace();
}

/**
 * Set variables for the upload process.
 *
 * @function setVars
 * @private
 * @param {Object} json file from fme server
 */
 function setVars(json) {
    if (typeof json.serviceResponse.files !== 'undefined') {
        session = json.serviceResponse.session;
        path = json.serviceResponse.files.folder[0].path;
    }

    // Cleanup the upload previous info
    const span = document.getElementsByClassName('av-file-list')[0];
    if (span.firstChild !== null) {
        span.removeChild(span.firstChild);
    }

    const node = document.getElementById('options');
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }

    // Get published parameters of the workspace
    generateOptions();
}

/**
 * FME Server upload
 *
 * @function uploadFile
 * @private
 */
 function uploadFile() {
    // Ask FME Server to upload the file
    FMEServer.dataUpload(repository, workspace, fileInput, session, processFiles);
}

/**
 * Get the workspace published parameters.
 *
 * @function generateOptions
 * @private
 */
 function generateOptions() {
    // Get the workspace published parameters from FME Server
    FMEServer.getWorkspaceParameters(repository, workspace, buildOptions);
}

/**
 * Build forms items.
 *
 * @function buildOptions
 * @private
 * @param {Object} json file from fmeserver
 */
 function buildOptions(json) {
    // Use the API to build the form items
    FMEServer.generateFormItems('options', json);

    // Attach the upload button to the form file input
    const inputs = document.getElementById('options').getElementsByTagName('input');
    const selects = document.getElementById('options').getElementsByTagName('select');

    // customize user email text
    inputs[0].parentElement.getElementsByTagName('label')[0].innerText = translations[lang].configFileName;
    selects[0].parentElement.getElementsByTagName('label')[0].innerText = translations[lang].snippetLabel;
    selects[0].options[0].innerHTML = translations[lang].snippet1;
    selects[0].options[1].innerHTML = translations[lang].snippet2;
    selects[0].options[2].innerHTML = translations[lang].snippet3;
    selects[0].options[3].innerHTML = translations[lang].snippet4;

    // Set hidden parameters values for AT_Upload.fmw FME workspace
    $('input[name="SESSION_ID"]').val(session);
    $('input[name="PUBLISHER_INFO"]').val(publisherInfo);
    $('.UPLOAD_OVERWRITE').hide();
    $('.PUBLISHER_INFO').hide();
    $('.SESSION_ID').hide();

    // generate a new file input (original not bilangual)
    fileInput = inputs[3];
    createFileInput($(fileInput));
}

/**
 * Create the package file input.
 *
 * @function createFileInput
 * @private
 * @param {Object} input array
 */
 function createFileInput(input) {
    // limit to zip file and set id to link with label
    input.attr({ 'accept': '.zip', 'tabindex': -1 });

    // set label to act as a button because file input is not bilingual
    const label = input.parent().find('label');
    label[0].innerText = translations[lang].chooseFile;

    // call upload files on FME Server
    input.change(function() {
        uploadFile();
    });
}

/**
 * List files picked in chooser.
 *
 * @function  processFiles
 * @private
 * @param {Object} json file from fmeserver
 */
 function processFiles(json) {
    const list = $('.av-file-list');
    if (typeof json.serviceResponse !== 'undefined') {
        files = json.serviceResponse.files.archive;

        for (let i=0; i<files.length; i++) {
            let file=files[i];
            if (typeof file.name !== 'undefined') {
                list.append('<p>' + file.name + ' | <em>' + file.size + ' ' +  translations[lang].size + '</em></p>');
            }
        }
        $('#avRunUpload').prop('disabled',false);
    }
}

// Manage form parameters

/**
 * Process the form parameters for input to FME run workspace.
 *
 * @function  processParams
 * @private
 * @param {Object} element_id  id of html element
 * @return {Array} properties input to FME runworkspace
 */
 function processParams(element_id) {
    // Convert HTML NodeList types to regular array types
    let inputs = document.getElementById(element_id).getElementsByTagName('input');
    let selects = document.getElementById(element_id).getElementsByTagName('select');
    let options = [];
    let properties = '';

    // Convert HTML NodeList types to regular array types
    inputs = Array.prototype.slice.call(inputs);
    selects = Array.prototype.slice.call(selects);

    // Merge the regular arrays
    options = inputs.concat(selects);

    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        if (element_id === 'options'){
            if ( option.value && option.name !== fileInput.name && option.type !== 'button') {
                properties += option.name + '=';
                if ( option.type === 'select') {
                    properties += option[option.selectedIndex].value;
                } else {
                    properties += option.value;
                }
                properties += '&';
            }
        }
        else if (option.type === 'select-one' || option.type === 'text') {
            properties += option.name + '=';
            if ( option.type === 'select') {
                properties += option[option.selectedIndex].value;
            } else {
                properties += option.value;
            }
            properties += '&';
        }
    }
    properties = properties.substr(0, properties.length - 1);
    return properties;
}

/**
 * Run the FME workspace.
 *
 * @function  runWorkspace
 * @private
 */
 function runWorkspace() {
    const params = {
        filename: fileInput.name,
        files: files,
        service: 'fmedatastreaming',
        params: processParams('options')
    };
    // Ask FME Server to run the workspace with the uploaded data
    FMEServer.runWorkspaceWithData(path, params, showMessages);
}

// --------------------------------------------------
//  SECTION 5 - Execution Report
//--------------------------------------------------
/**
 * Show messages from FME success/error report.
 *
 * @function  showMessages
 * @private
 * @param {Object} json file from fmeserver
 */
 function showMessages(json) {
    $('.av-progress-section').hide();
    $('.av-report-section').show();
    setMessages(json.MessageList);
}

/**
 * Callback function for FMEServer.runWorkspaceWithData and FMEServer.runDataStreaming.
 *
 * @function  setMessages
 * @private
 * @param {String} message fmeserver message
 */
 function setMessages(message) {function setMessages(message) {
    // keep message as outputStream to reuse later
    outputStream = message;

    // set header message
    setHeader(message[0]);

    let table = document.getElementById('avReportTable');
    for (let i = 0; i < outputStream.length; i++) {
        let row = outputStream[i];
        let messageRow = (lang === 'en-CA') ? row.EnMessage.replace(/\n/g,'<br>') : row.FrMessage.replace(/\n/g,'<br>');
        let color_code = (row.Severity === 'ERROR' || row.Severity === 'FATAL') ? 'red' : 'green';
        messageRow = messageRow + '<br><br><div style=\'color:' + color_code + '\'>' + row.ExecutionTrace + '</div>';
        addRow(table.getElementsByTagName('tbody')[0], row, messageRow);
    }
}

/**
 * Creates the report Header.
 *
 * @function  setHeader
 * @private
 * @param {Object} header
 */
 function setHeader(header) {
    // set variables
    const serviceName = (typeof header.ServiceName !== 'undefined') ? header.ServiceName : '';
    const job = (typeof header.JobID !== 'undefined') ? header.JobID : '';

    // set service name and report title
    bindHTML(document.getElementsByClassName('av-service-name')[0], serviceName);
    bindHTML(document.getElementsByClassName('av-report-title')[0], translations[lang].reportTitle);
    bindHTML(document.getElementById('avJobId'), translations[lang].jobId + job);

    // set table header
    bindHTML(document.getElementById('avTime'), translations[lang].headTime);
    bindHTML(document.getElementById('avSev'), translations[lang].headSev);
    bindHTML(document.getElementById('avMess'), translations[lang].headMess);
}


/**
 * Add row elemens to table body.
 *
 * @function addRow
 * @private
 * @param {Object} tableBody  html table to display results
 * @param {Object} rowInfo row info from fme server
 * @param {Object} message html snippet with fmeserver message
 */
 function addRow(tableBody, rowInfo, message) {
    let info = [rowInfo.TimeStamp, rowInfo.MessageType + '-' + rowInfo.Severity, message];
    let row = document.createElement('tr');
    row.classList.add('av-row', rowInfo.MessageType, rowInfo.Severity);

    for (let i = 0; i < info.length; i++) {
        let cell = info[i];
        let cellData = document.createElement('td');
        cellData.innerHTML = cell;
        row.appendChild(cellData)
    }

    tableBody.appendChild(row);
}

/**
 * Filter Message Type by making message type visible.
 *
 * @function filterMessType
 * @private
 */
 function filterMessType() {
    let mess = document.getElementById('avMessageType');
    let value = mess.options[mess.selectedIndex].value;

    const rows = document.getElementsByClassName('av-row');
    for (let row in rows) {
        if (value === translations[lang].messTypeAll) {
            row.classList.remove('hidden-type');
        } else if (value === translations[lang].messTypeAdmin && row.classList.contains('ADMIN')) {
            row.classList.remove('hidden-type');
        } else if (value === translations[lang].messTypeUser && row.classList.contains('USER')) {
            row.classList.remove('hidden-type');
        } else {
            row.classList.add('hidden-type');
        }
    }
}

/**
 * Filter Message Severity by making message visible.
 *
 * @function filterMessSev
 * @private
 */
 function filterMessSev() {
    let mess = document.getElementById('avMessageSev');
    let value = mess.options[mess.selectedIndex].value;

    const rows = document.getElementsByClassName('av-row');
    for (let row in rows) {
        if (value === translations[lang].messSevAll) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevInfo && row.classList.contains('INFO')) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevWarn && row.classList.contains('WARNING')) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevErr && row.classList.contains('ERROR')) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevSucc && row.classList.contains('SUCCESS')) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevFatal && row.classList.contains('FATAL')) {
            row.classList.remove('hidden-sev');
        } else {
            row.classList.add('hidden-sev');
        }
    }
}