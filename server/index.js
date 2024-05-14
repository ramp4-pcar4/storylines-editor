var express = require('express'); //Express Web Server
var bodyParser = require('body-parser'); //connects bodyParsing middleware
var formidable = require('formidable');
var path = require('path'); //used for file path
var fs = require('fs-extra'); //File System-needed for renaming file etc
var cors = require('cors');
var moment = require('moment'); // require
const decompress = require('decompress');
const archiver = require('archiver');
const responseMessages = [];
require('dotenv').config();

// CONFIGURATION
PORT = process.env.port ? process.env.port : 6040; // the Express server will run on this port.
UPLOAD_PATH = process.env.SERVER_CURR_ENV && process.env.SERVER_CURR_ENV !== '#{CURR_ENV}#' ? process.env.SERVER_UPLOAD_PATH : './files'; // files uploaded from the app will be uploaded to this folder (deleted after processing)
TARGET_PATH = process.env.SERVER_CURR_ENV && process.env.SERVER_CURR_ENV !== '#{CURR_ENV}#' ? process.env.SERVER_TARGET_PATH : './public'; // ZIP files in the UPLOAD_PATH folder will be extracted here.
LOG_PATH = process.env.SERVER_CURR_ENV && process.env.SERVER_CURR_ENV !== '#{CURR_ENV}#' ? process.env.SERVER_LOG_PATH : './logfile.txt'; // the path to the logfile
ROUTE_PREFIX = process.env.SERVER_CURR_ENV && process.env.SERVER_CURR_ENV !== '#{CURR_ENV}#' ? '/Storylines-Editor-STB-Server' : '';

// Create express app.
var app = express();

// Open the logfile in append mode.
var logFile = fs.createWriteStream(LOG_PATH, { flags: 'a' });

// Express middleware.
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// POST requests made to /upload will be handled here.
app.route(ROUTE_PREFIX + '/upload').post(function (req, res, next) {
    const options = {
        uploadDir: UPLOAD_PATH,
        keepExtensions: true,
        maxFileSize: 300 * 1024 * 1024
    };

    const form = new formidable.IncomingForm(options);

    // Project zip must match this or it will be rejected. Commented out because CWS didn't want to use the UUID system.
    // We have a temporary solution for now, but I'm not sure how we want to handle this in the future.
    //const projectNameRegex = /[a-zA-Z0-9]{8}(-[a-zA-Z0-9]{4}){3}-[a-zA-Z0-9]{12}/g;

    // Upload the file to the server, into the /files/ folder.
    form.parse(req, function (err, field, file) {
        if (err) {
            responseMessages.push({
                type: 'WARNING',
                message: 'Upload Aborted: an error has occurred while parsing the uploaded form: ' + err
            });
            logger('WARNING', 'Upload Aborted: an error has occurred while parsing the uploaded form: ', err);
            res.status(500).send({ status: 'Internal Server Error' });
            return;
        }

        const fileName = `${TARGET_PATH}/${file.data.originalFilename.split('.zip')[0]}`;
        const secureFilename = `${UPLOAD_PATH}/${file.data.newFilename}`;
        let newStorylines = false;

        // SECURITY FEATURE (?): Check if the uploaded filename matches our Storylines UUID format. Prevents overwriting
        // other folders.
        //if (!projectNameRegex.test(fileName)) {
        // SECURITY FEATURE (temporary): Make sure the project name isn't `scripts`, or `help`, and doesn't contain . or / in order to prevent overwriting folders.
        if (fileName !== 'scripts' && fileName !== 'help' && !fileName.includes('/') && !fileName.includes('.')) {
            responseMessages.push({
                type: 'WARNING',
                message: 'Upload Aborted: file does not match Storylines UUID standards.'
            });
            logger('WARNING', 'Upload Aborted: file does not match Storylines UUID standards.');
            // Delete the uploaded zip file.
            safeRM(secureFilename, UPLOAD_PATH);
            res.json({ new: newStorylines });
            return;
        }

        // Before unzipping, create the product folder in /public/ if it doesn't exist already.
        if (!fs.existsSync(fileName)) {
            responseMessages.push({ type: 'INFO', message: `Successfully created new product ${fileName}` });
            logger('INFO', `Successfully created new product ${fileName}`);
            fs.mkdirSync(fileName);
            newStorylines = true;
        }

        // Unzip the contents of the uploaded zip file into the target directory. Will overwrite
        // old files in the folder.
        decompress(secureFilename, fileName).then((files) => {
            // SECURITY FEATURE: delete all files in the folder that don't have one of the following extensions:
            // .json, .jpg, .jpeg, .gif, .png, .csv
            // TODO: Disabled until I can find a better regex
            // files.forEach((file) => {
            //     validateFile(file, fileName);
            // });
            responseMessages.push({ type: 'INFO', message: `Uploaded files to product ${fileName}` });
            logger('INFO', `Uploaded files to product ${fileName}`);

            // Finally, delete the uploaded zip file.
            safeRM(secureFilename, UPLOAD_PATH);

            // Send a response back to the client.
            res.json({ new: newStorylines });
        });
    });
});

// GET requests made to /retrieve/ID will be handled here.
app.route(ROUTE_PREFIX + '/retrieve/:id').get(function (req, res, next) {
    var archive = archiver('zip');
    const PRODUCT_PATH = `${TARGET_PATH}/${req.params.id}`;
    const uploadLocation = `${UPLOAD_PATH}/${req.params.id}-outgoing.zip`;

    // Check if the product exists.
    if (
        fs.access(PRODUCT_PATH, (error) => {
            if (!error) {
                const output = fs.createWriteStream(uploadLocation);
                // This event listener is fired when the write stream has finished. This means that the
                // ZIP file should be correctly populated. Now, we can set the correct headers and send the
                // ZIP file to the client.
                output.on('close', () => {
                    res.writeHead(200, {
                        'Content-Type': 'application/zip',
                        'Content-disposition': `attachment; filename=${req.params.id}.zip`,
                        'Content-Length': archive.pointer()
                    });

                    const result = fs.createReadStream(uploadLocation).pipe(res);

                    // When the piping is finished, delete the stream.
                    result.on('finish', () => {
                        fs.rm(uploadLocation);
                    });
                });

                // Write the product data to the ZIP file.
                archive.pipe(output);
                archive.directory(PRODUCT_PATH, false);
                archive.finalize();

                responseMessages.push({ type: 'INFO', message: `Successfully loaded product ${req.params.id}` });
                logger('INFO', `Successfully loaded product ${req.params.id}`);
            } else {
                responseMessages.push({
                    type: 'INFO',
                    message: `Access attempt to ${req.params.id} failed, does not exist.`
                });
                logger('INFO', `Access attempt to ${req.params.id} failed, does not exist.`);
                res.status(404).send({ status: 'Not Found' });
            }
        })
    );
});

// GET requests made to /retrieve/ID/LANG will be handled here.
app.route(ROUTE_PREFIX + '/retrieve/:id/:lang').get(function (req, res) {
    const CONFIG_PATH = `${TARGET_PATH}/${req.params.id}/${req.params.id}_${req.params.lang}.json`;

    // obtain requested config file if it exists
    if (
        fs.access(CONFIG_PATH, (error) => {
            if (!error) {
                fs.readFile(CONFIG_PATH, (err, data) => {
                    if (!err) {
                        // return JSON config file as response
                        const configJson = JSON.parse(data.toString());
                        responseMessages.push({
                            type: 'INFO',
                            message: `Successfully loaded config file for ${req.params.id}, language ${req.params.lang}`
                        });
                        logger(
                            'INFO',
                            `Successfully loaded config file for ${req.params.id}, language ${req.params.lang}`
                        );
                        res.json(configJson);
                    } else {
                        responseMessages.push({
                            type: 'INFO',
                            message: `Access attempt to ${req.params.id} failed, error status ${err.status}`
                        });
                        logger('INFO', `Access attempt to ${req.params.id} failed, error status ${err.status}`);
                        res.status(err.status);
                    }
                });
            } else {
                responseMessages.push({
                    type: 'INFO',
                    message: `Access attempt to ${req.params.id} failed, does not exist.`
                });
                logger('INFO', `Access attempt to ${req.params.id} failed, does not exist.`);
                res.status(404).send({ status: 'Not Found' });
            }
        })
    );
});

// GET reuests made to /retrieveMessages will recieve all the responseMessages currently queued.
app.route(ROUTE_PREFIX + '/retrieveMessages').get(function (req, res) {
    res.json({ messages: responseMessages });
    responseMessages.length = 0;
});

/*
 * Verifies that the file has a valid extension. If it's not valid, the file is removed.
 *
 * fileObj {Object} object returned by decompress, contains file path and file type.
 * path {String} the path to the file
 */
function validateFile(fileObj, path) {
    const fullPath = path + '/' + fileObj.path;

    // Files within the project must match this or will be deleted.
    const filenameRegex = /((?!\/)(?!\\).)+.(jpg|jpeg|png|gif|json|csv|md|html)/g;

    // If the provided object is a file, check to see if it has a valid file extension.
    if (fileObj.type === 'file' && !filenameRegex.test(fileObj.path)) {
        logger('WARNING', `Validation of ${fileObj.path} failed. Deleting.`);
        safeRM(fullPath, path);
    }
}

/*
 * SECURITY FEATURE: In order to ensure that the wrong files are never deleted. Makes sure that `path` contains the `folder`.
 *
 * path {String} The full path to delete. Equivalent to calling `rm path`.
 * path {String} The folder that `path` should be in.
 */
function safeRM(path, folder) {
    if (path.includes(folder)) {
        fs.rm(path);
    }
}

/**
 * Appends the message alongside a timestamp to the logfile.
 * @param {string} message the message to write to the logfile.
 */
function logger(type, message) {
    let currentDate = moment().format('MM/DD/YYYY HH:mm:ss a');

    // Append to log file.
    logFile.write(`${currentDate} [${type}] ${message}\n`);

    // Print to console.
    console.log(`${currentDate} [${type}] ${message}`);
}

// Run the express app on the IIS Port.
var server = app.listen(PORT, function () {
    logger('INFO', `Storylines Express Server Started, PORT: ${PORT}`);
});
