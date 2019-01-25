const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../models')
const User = db.User

router.post('/signup', (req, res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        console.log(`hashing`);
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            console.log(`creating new user`);
            let user = req.body
            user.password = hash
            User.create(user, (err, newuser)=>{
                if (err){
                    console.log(err)
                }
                console.log(`created new user`, newuser);
                res.status(201).json({
                    user: newuser
                });
            })
    }
    });
});



module.exports = router;
