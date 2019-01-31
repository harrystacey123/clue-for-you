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
const cookieParser  = require('cookie-parser');
const auth = require('./modules/auth');


app.use(bodyParser.json());
app.use(cookieParser())
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

app.use( (req, res, next) => {

    const token = req.cookies.clueforyou; 
    if(token===undefined){ 
        res.locals.user = null;
        next();
    }else{        
        auth.validateToken(token,(err,data)=>{
            if(err ){
                res.status(403).end();
            }
            else{
            res.locals.user = data;
console.log('hell yea this is state')
            next();
            }
        });
    }   
})

app.use('/user', userRoutes);

app.get('/new-post', (req, res) => res.render('new-post'));
app.get('/', (req, res) => res.render('landing'));

app.get('/browse', (req, res) => {
    console.log(res.locals.user)
    db.post.find({
        category: 'wc'
    }, (err, data) => {
        const mydata = data.map(function(d){
            return {
                ans:d.answer,
                img:d.image,
                clue:d.clue,
                category: d.category
            }

        })
        res.render('browse',{data:mydata});
    })

});

app.get('/browse/:category', (req, res) => {
    
    let category = req.params.category;
    
    db.post.find({
        category: category
    }, (err, data) => {
        const mydata = data.map(function(d){
            return {
                id: d._id,
                ans:d.answer,
                img:d.image,
                clue:d.clue,
                category: d.category
            }

        })
        res.render('browse',{data:mydata});
    })
});

app.delete('/browse', (req, res) => {
    let postId = req.body.id;
   
    db.post.deleteOne(
        {_id: postId}, (err, data) => {
            if (err) {
                res.json('error')
            } else {
                res.redirect('/browse')
            }

        }
    )
})


app.post('/upload', upload.single('myImage'),(req, res) => {
    db.post.create({    
        answer: req.body.answer,
        clue: req.body.clue,
        category: req.body.category,
        image: req.file ? req.file.filename : null,
        userID: 'String'}, (err, newPost) => {
            if(err) return console.log(err);
            // res.json(newPost);
            res.redirect('/browse/'+req.body.category)
        })
    // req.file.filename
    
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

    // app.delete('browse/post')

});

app.get('/api/posts/:id', (req, res) => {
    let postId = req.params.id;
    db.post.findOne({_id: postId })
    .exec((err, foundPost) => {
        if (err) { return console.log(err) }
        res.json(foundPost);
    });
});

app.put('/api/posts/:id', (req, res) => {
    let postId = req.params.id;
    let updatePost = req.body;

    db.post.findOneAndUpdate(
        { _id: postId },
        updatePost,
        { new: true },
        (err, updatedPost) => {
            if (err) {
                return console.log(err)
            } 
            res.redirect('/browse/'+req.body.category)
        }
    );
});