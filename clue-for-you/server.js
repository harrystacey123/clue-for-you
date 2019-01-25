const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const userRoutes = require('./routes/user')

app.use(bodyParser.json());

// Set Storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    fileName: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

function checkFileType(file, cb) {
    // allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only');
    }
}

const port = 3000;

app.listen(port, () => {
    console.log(`We are live on ${port}`)
});


//EJS
app.set('view engine', 'ejs');

//Puclic Folder
app.use(express.static('./public'));

app.use('/user', userRoutes);

app.get('/profile', (req, res) => res.render('profile'));
app.get('/', (req, res) => res.render('landing'));
app.get('/browse', (req, res) => res.render('browse'));

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('profile', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('profile', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                res.render('profile', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                });
            };
        };
    });
});
