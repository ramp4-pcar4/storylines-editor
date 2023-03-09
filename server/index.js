var express = require('express'); //Express Web Server
var bodyParser = require('body-parser'); //connects bodyParsing middleware
var formidable = require('formidable');
var path = require('path'); //used for file path
var fs = require('fs-extra'); //File System-needed for renaming file etc
var cors = require('cors');
const decompress = require('decompress');
const archiver = require('archiver');

// CONFIGURATION
PORT = 6040; // the Express server will run on this port.
UPLOAD_PATH = './files'; // files uploaded from the app will be uploaded to this folder (deleted after processing)
TARGET_PATH = './public'; // ZIP files in the UPLOAD_PATH folder will be extracted here.

// Create express app.
var app = express();

// Express middleware.
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// POST requests made to /upload will be handled here.
app.route('/upload').post(function (req, res, next) {
    const options = {
        uploadDir: UPLOAD_PATH,
        keepExtensions: true
    };

    const form = new formidable.IncomingForm(options);

    // Project zip must match this or it will be rejected. Commented out because CWS didn't want to use the UUID system.
    // We have a temporary solution for now, but I'm not sure how we want to handle this in the future.
    //const projectNameRegex = /[a-zA-Z0-9]{8}(-[a-zA-Z0-9]{4}){3}-[a-zA-Z0-9]{12}/g;

    // Upload the file to the server, into the /files/ folder.
    form.parse(req, function (err, field, file) {
        const fileName = `${TARGET_PATH}/${file.data.originalFilename.split('.zip')[0]}`;
        const secureFilename = `${UPLOAD_PATH}/${file.data.newFilename}`;

        // SECURITY FEATURE (?): Check if the uploaded filename matches our Storylines UUID format. Prevents overwriting
        // other folders.
        //if (!projectNameRegex.test(fileName)) {

        // SECURITY FEATURE (temporary): Make sure the project name isn't `scripts`, or `help`, and doesn't contain . or / in order to prevent overwriting folders.
        if (fileName !== 'scripts' && fileName !== 'help' && !fileName.includes('/') && !fileName.includes('.')) {
            console.error('ABORTING: file does not match Storylines UUID standards.');

            // Delete the uploaded zip file.
            safeRM(secureFilename, UPLOAD_PATH);
            res.end();
            return;
        }

        // Before unzipping, create the product folder in /public/ if it doesn't exist already.
        if (!fs.existsSync(fileName)) {
            fs.mkdirSync(fileName);
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
        });

        // Finally, delete the uploaded zip file.
        safeRM(secureFilename, UPLOAD_PATH);

        // Send a response back to the client.
        res.end();
    });
});

// GET requests made to /retrieve/ID will be handled here.
app.route('/retrieve/:id').get(function (req, res, next) {
    var archive = archiver('zip');
    const PRODUCT_PATH = `${TARGET_PATH}/${req.params.id}`;

    // Check if the product exists.
    if (
        fs.access(PRODUCT_PATH, (error) => {
            if (!error) {
                // Tell the browser that this is a zip file.
                res.writeHead(200, {
                    'Content-Type': 'application/zip',
                    'Content-disposition': `attachment; filename=${req.params.id}.zip`
                });

                // Send the ZIP contents to the client.
                archive.pipe(res);
                archive.directory(PRODUCT_PATH, false);
                archive.finalize().then(() => {
                    res.end();
                });
            } else {
                res.status(404).send({ status: 'Not Found' });
            }
        })
    );
});

// GET requests made to /retrieve/ID/LANG will be handled here.
app.route('/retrieve/:id/:lang').get(function (req, res) {
    const CONFIG_PATH = `${TARGET_PATH}/${req.params.id}/${req.params.id}_${req.params.lang}.json`;
    // obtain requested config file if it exists
    if (
        fs.access(CONFIG_PATH, (error) => {
            if (!error) {
                fs.readFile(CONFIG_PATH, (err, data) => {
                    if (!err) {
                        // return JSON config file as response
                        const configJson = JSON.parse(data.toString());
                        res.json(configJson);
                    } else {
                        res.status(err.status);
                    }
                });
            } else {
                res.status(404).send({ status: 'Not Found' });
            }
        })
    );
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
        console.error(`Validation of ${fileObj.path} failed. Deleting.`);
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

// Run the express app on port 6040.
var server = app.listen(6040, function () {
    console.log('Listening on port %d', server.address().port);
});
