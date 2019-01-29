const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const userRoutes = require('./routes/user')
const db = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Set Storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        console.log(file.originalname);
        if(file.originalname.split('.')[1]!='jpg' | 'jpeg' | 'png' | 'gif'){
            cb('invalid format',null);
        }
        else{
            cb(null,  Date.now() +(file.originalname));
        }
    }
});

// Init Upload
const upload = multer({
    storage: storage
});

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

app.get('/new-post', (req, res) => res.render('new-post'));
app.get('/', (req, res) => res.render('landing'));

app.get('/browse', (req, res) => {
    
    db.post.find({
        categoryID: 'wc'
    }, (err, data) => {
        console.log(data);
        const mydata = data.map(function(d){
            return {
                ans:d.answer,
                img:d.image,
                clue:d.clue
            }

        })
        console.log(mydata);
        res.render('browse',{data:mydata});
    })

});

app.get('/browse/:category', (req, res) => {
    var category = req.params.category;
    
    db.post.find({
        categoryID: category
    }, (err, data) => {
        const mydata = data.map(function(d){
            return {
                ans:d.answer,
                img:d.image,
                clue:d.clue
            }

        })
        console.log(mydata);
        res.render('browse',{data:mydata});
    })
});

app.delete('/browse', (req, res) => {
    let postId = req.params.id;
    db.Post.deleteOne(
        {id: postId},
        
    )
})

app.post('/upload', upload.single('myImage'),(req, res) => {
    db.post.create({    
        answer: req.body.answer,
        clue: req.body.clue,
        categoryID: req.body.category,
        image: req.file.filename,
        userID: 'String'})
    // req.file.filename
    res.redirect('/browse')
    // upload(req, res, (err) => {
    //     if (err) {
    //         res.render('new-post', {
    //             msg: err
    //         });
    //     } else {
    //         if (req.file == undefined) {
    //             res.render('new-post', {
    //                 msg: 'Error: No File Selected!'
    //             });
    //         } else {
    //             res.render('new-post', {
    //                 msg: 'File Uploaded!',
    //                 file: `uploads/${req.file.filename}`
    //             });
    //         };
    //     };
    // });

    app.get('')

});
