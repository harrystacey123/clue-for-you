const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../models')
const User = db.User;
const Auth = require('../modules/auth');

router.post('/login', (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
console.log('this is my email'+email)
    User.findOne({email:email},(err,data)=>{
        if(err){
            console.log('this is find error')
            res.redirect('/');
        }else{
            if(data!==null){
                bcrypt.compare(password, data.password, (err, resp)=> {
                    if(err){
                        console.log('this is hash error')
                        res.redirect('/');
                    }else{    
                        res.cookie('clueforyou',                        Auth.getToken(data._id), { expires: new Date(Date.now() + 86400000), httpOnly: true,path:'/',maxAge:86400000 });
                        res.redirect('/browse');    
                    }
                });
            }
            else {
                res.redirect('/');
            }
        }
    });
})


router.post('/signup', (req, res) => {
    
    

        //check password,
        //check email,
        var err = ''
        if (req.body.password != req.body.confirmpassword) {
            err = 'password';
        }
        if (! (/^[a-zA-Z]+$/).test(req.body.firstName)) {
            err += '-firstname';

        }
        if (! (/^[a-zA-Z]+$/).test(req.body.lastName)) {
            err += '-lastname';

        }
        if (! (/^\S+@\S+$/).test(req.body.email)) {
            err += '-email'

        }
        if (err != '') {
            res.redirect('/?v=' + err)
        }

        bcrypt.hash(req.body.password, 10, (err, hash) => {
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
                        console.log('this is error usercreation')
                        return console.log(err)
                    }
                    else{
                        res.redirect('/browse')
                    }
                    
                })
        }
        });
    
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

router.get('/logout',(req,res)=>{
    res.clearCookie("clueforyou");
        res.redirect('/');
});



module.exports = router;
