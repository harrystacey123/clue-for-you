const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../models')
const User = db.User

router.post('/signup', (req, res) => {
    if (req.body.password != req.body.confirmpassword) {
        res.json({"err": "Passwords do not match"})
    }
    else{
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            console.log(`hashing`);
            if (err) {
                return res.status(500).json({
                    error: req.body
                });
            } else {
                var user = {
                    'firstName': req.body.firstName,
                    'lastName': req.body.lastName,
                    'email': req.body.email,
                    'password': hash
                }
                
                User.create(user, (err, newuser)=>{
                    if (err){
                        return console.log(err)
                    }
                    else{
                        res.json(newuser)
                    }
                    
                })
        }
        });
    }
});

router.get('/users', (req, res) => {
    User.find({}, (err, allUsers) => {
        if (err){
            return console.log(err)
        }
        else{
            res.json(allUsers)
        }
    })

})



module.exports = router;
