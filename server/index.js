var express = require('express'); //Express Web Server
var bodyParser = require('body-parser'); //connects bodyParsing middleware
var formidable = require('formidable');
var path = require('path'); //used for file path
var fs = require('fs-extra'); //File System-needed for renaming file etc
var cors = require('cors');
var moment = require('moment'); // require
const decompress = require('decompress');
const archiver = require('archiver');
const simpleGit = require('simple-git');
const responseMessages = [];
require('dotenv').config();

// CONFIGURATION
const PORT = process.env.port ? process.env.port : 6040; // the Express server will run on this port.
const UPLOAD_PATH =
    process.env.SERVER_CURR_ENV && process.env.SERVER_CURR_ENV !== '#{CURR_ENV}#'
        ? process.env.SERVER_UPLOAD_PATH
        : './files'; // files uploaded from the app will be uploaded to this folder (deleted after processing)
const TARGET_PATH =
    process.env.SERVER_CURR_ENV && process.env.SERVER_CURR_ENV !== '#{CURR_ENV}#'
        ? process.env.SERVER_TARGET_PATH
        : './public'; // ZIP files in the UPLOAD_PATH folder will be extracted here.
const LOG_PATH =
    process.env.SERVER_CURR_ENV && process.env.SERVER_CURR_ENV !== '#{CURR_ENV}#'
        ? process.env.SERVER_LOG_PATH
        : './logfile.txt'; // the path to the logfile
const ROUTE_PREFIX =
    process.env.SERVER_CURR_ENV && process.env.SERVER_CURR_ENV !== '#{CURR_ENV}#'
        ? '/Storylines-Editor-STB-Server'
        : '';

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
    // TODO: Putting this on the header isn't great. The body has the zipped folder. And usernames in the URL doesn't look great either. Maybe improve this somehow.
    const user = req.headers.user;
    if (!user) {
        // Send back error if the user uploading the storyline was not provided.
        responseMessages.push({
            type: 'WARNING',
            message: 'Upload Aborted: the user uploading the form was not provided.'
        });
        logger('WARNING', 'Upload Aborted: the user uploading the form was not provided.');
        res.status(400).send({ status: 'Bad Request' });
        return;
    }

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
    form.parse(req, async function (err, field, file) {
        if (err) {
            responseMessages.push({
                type: 'WARNING',
                message: 'Upload Aborted: an error has occurred while parsing the uploaded form: ' + err
            });
            logger('WARNING', 'Upload Aborted: an error has occurred while parsing the uploaded form: ', err);
            res.status(500).send({ status: 'Internal Server Error' });
            return;
        }
        logger('INFO', file.data.originalFilename);

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
        decompress(secureFilename, fileName).then(async () => {
            // SECURITY FEATURE: delete all files in the folder that don't have one of the following extensions:
            // .json, .jpg, .jpeg, .gif, .png, .csv
            // TODO: Disabled until I can find a better regex
            // files.forEach((file) => {
            //     validateFile(file, fileName);
            // });
            responseMessages.push({ type: 'INFO', message: `Uploaded files to product ${fileName}` });
            logger('INFO', `Uploaded files to product ${fileName}`);
            // Initialize a new git repo if this is a new storyline.
            // Otherwise, simply create a new commit with the zipped folder.
            if (!newStorylines) {
                await commitToRepo(fileName, user, false);
            } else {
                await initGitRepo(fileName, user);
            }
            // Finally, delete the uploaded zip file.
            safeRM(secureFilename, UPLOAD_PATH);
            const git = simpleGit(fileName);
            const commits = await git.log();
            // Get the hash of the latest commit
            const lastHash = commits.latest.hash;
            // Send a response back to the client.
            res.json({ new: newStorylines, commitHash: lastHash });
        });
    });
});

// GET requests made to /retrieve/ID/commitHash will be handled here.
// Calling this with commitHash as "latest" simply fetches the product as normal.
app.route(ROUTE_PREFIX + '/retrieve/:id/:hash').get(function (req, res, next) {
    // This user is only needed for backwards compatibility.
    // If we have an existing storylines product that is not a git repo, we need to initialize a git repo
    // and make an initial commit for it, but we need the user for the commit.
    const user = req.headers.user;
    if (!user) {
        // Send back error if the user uploading the storyline was not provided.
        responseMessages.push({
            type: 'WARNING',
            message: 'Upload Aborted: the user uploading the form was not provided.'
        });
        logger('WARNING', 'Upload Aborted: the user uploading the form was not provided.');
        res.status(400).send({ status: 'Bad Request' });
        return;
    }

    var archive = archiver('zip');
    const PRODUCT_PATH = `${TARGET_PATH}/${req.params.id}`;
    const uploadLocation = `${UPLOAD_PATH}/${req.params.id}-outgoing.zip`;
    const commitHash = req.params.hash;

    // Check if the product exists.
    if (
        fs.access(PRODUCT_PATH, async (error) => {
            if (!error) {
                // Backwards compatibility. If the existing product is not a git repo i.e. it existed before git version control,
                // we make a git repo for it before returning the version history. Otherwise, the code below will explode.
                await initGitRepo(PRODUCT_PATH, user);
                const git = simpleGit(PRODUCT_PATH);
                // Get the current branch. We do it this way instead of assuming its "main" in case someone has it set to master.
                const branches = await git.branchLocal();
                const currBranch = branches.current;
                if (commitHash !== 'latest') {
                    // If the user does not ask for the latest commit, we checkout a new branch at the point of the requested commit,
                    // and then proceed with getting the zipped folder below.
                    try {
                        // First, we check if the requested commit exists.
                        // NOTE: When calling from frontend, the catch block should never run.
                        const commitExists = await git.catFile(['-t', commitHash]);
                        if (commitExists !== 'commit\n') {
                            throw new Error();
                        }
                    } catch (error) {
                        responseMessages.push({
                            type: 'INFO',
                            message: `Access attempt to version ${commitHash} of product ${req.params.id} failed, does not exist.`
                        });
                        logger(
                            'INFO',
                            `Access attempt to version ${commitHash} of product ${req.params.id} failed, does not exist.`
                        );
                        res.status(404).send({ status: 'Not Found' });
                        return;
                    }
                    // Checkout a new branch at the point of the requested commit
                    // This will result in the code below returning the version's folder back to the client.
                    await git.checkoutBranch(`version-${commitHash}`, commitHash);
                }

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

                    // When the piping is finished, delete the stream and perform any git cleanup.
                    result.on('finish', async () => {
                        fs.rm(uploadLocation);

                        if (commitHash !== 'latest') {
                            // Since the user has not asked for the latest commit, we need to clean up.
                            // Go back to the main branch and delete the newly created branch.
                            await git.checkout(currBranch);
                            await git.deleteLocalBranch(`version-${commitHash}`);
                        }
                    });
                });

                // Write the product data to the ZIP file.
                archive.pipe(output);
                archive.glob('**', {
                    cwd: PRODUCT_PATH,
                    ignore: ['**/Thumbs.db']
                });
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

app.route(ROUTE_PREFIX + '/history/:id').get(function (req, res, next) {
    // This user is only needed for backwards compatibility.
    // If we have an existing storylines product that is not a git repo, we need to initialize a git repo
    // and make an initial commit for it, but we need the user for the commit.
    const user = req.headers.user;
    if (!user) {
        // Send back error if the user uploading the storyline was not provided.
        responseMessages.push({
            type: 'WARNING',
            message: 'Upload Aborted: the user uploading the form was not provided.'
        });
        logger('WARNING', 'Upload Aborted: the user uploading the form was not provided.');
        res.status(400).send({ status: 'Bad Request' });
        return;
    }

    const PRODUCT_PATH = `${TARGET_PATH}/${req.params.id}`;
    // Check if the product exists.
    fs.access(PRODUCT_PATH, async (error) => {
        if (error) {
            responseMessages.push({
                type: 'INFO',
                message: `Access attempt to versions of ${req.params.id} failed, does not exist.`
            });
            logger('INFO', `Access attempt to versions of ${req.params.id} failed, does not exist.`);
            res.status(404).send({ status: 'Not Found' });
        } else {
            // Backwards compatibility. If the existing product is not a git repo i.e. it existed before git version control,
            // we make a git repo for it before returning the version history. Otherwise, the code below will explode.
            await initGitRepo(PRODUCT_PATH, user);
            // Get version history for this product via git log command
            const git = simpleGit(PRODUCT_PATH);
            const log = await git.log();
            // TODO: Remove the 10 version limit once pagination is implemented
            const history = log.all
                .slice(0, 10)
                .map((commit) => ({ hash: commit.hash, created: commit.date, storylineUUID: req.params.id }));
            res.json(history);
        }
    });
});

// GET reuests made to /retrieveMessages will recieve all the responseMessages currently queued.
app.route(ROUTE_PREFIX + '/retrieveMessages').get(function (req, res) {
    res.json({ messages: responseMessages });
    responseMessages.length = 0;
});

/*
 * Initializes a git repo at the requested path, if one does not already exist.
 * Creates an initial commit with any currently existing files in the directory.
 *
 * @param {string} path the path of the git repo
 * @param {string} username the name of the user initializing the repo
 */
async function initGitRepo(path, username) {
    const git = simpleGit(path);
    let repoExists = true;
    try {
        // Check if the product directory is the top-level directory of a git repo.
        // We need to do it this way because locally the storylines-editor is a git repo
        // so simply checking for existence of a git repo is not sufficient.
        const res = await git.raw('rev-parse', '--git-dir');
        if (res !== '.git\n') {
            // Product directory is in a git repo but not top-level, we are working locally.
            repoExists = false;
        }
    } catch (error) {
        // Product directory is not a git repo nor is it within a git repo.
        repoExists = false;
    }

    if (!repoExists) {
        // Repo does not exist for the storyline product.
        // Initialize a git repo and add an initial commit with all existing files.
        await git.init();
        await commitToRepo(path, username, true);
    }
}

/**
 * Commits any existing files in the repo at the specified directory.
 * Precondition: assumes that the specified directory is already a git repo.
 * @param {string} path the path of the git repo
 * @param {string} username the name of the user making the commit
 * @param {boolean} initial specifies whether this is the initial commit
 */
async function commitToRepo(path, username, initial) {
    const date = moment().format('YYYY-MM-DD');
    const time = moment().format('hh:mm:ss a');
    // Initialize git
    const git = simpleGit(path);
    let versionNumber = 1;
    if (!initial) {
        // Compute version number for storyline if this is not the initial commit.
        const log = await git.log();
        const lastMessage = log.latest.message;
        versionNumber = lastMessage.split(' ')[3];
        versionNumber = Number(versionNumber) + 1;
    }
    // Commit the files for this storyline to its repo.
    await git
        .add('./*')
        .commit(`Add product version ${versionNumber} on ${date} at ${time}`, { '--author': `"${username} <>"` });
}

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
