const jwt = require('jsonwebtoken');
const db  = require('../models');

module.exports = {
    getToken : function(id){
        return  jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (86400),
                        data: id
                }, '36f8814a15d2ff06601240a1cd3a87b22845e5b4e546f4e6870555837e4cf2f7');
     },
     validateToken : function(token,cb){
         try {
             
             const tokenData = jwt.verify(token, '36f8814a15d2ff06601240a1cd3a87b22845e5b4e546f4e6870555837e4cf2f7');
            
             db.User.find({_id:tokenData.data}).exec((err,data)=>{
                 if(err){
                     cb('tressPass',null); // specific erros for in future use
                 }
                 else{
                    if(data.length > 0){
                      
                        cb(false,{
                            'id':data[0]._id,
                            'email':data[0].email,
                            
                        });
                    }
                    else{
                        cb('tressPass',null);
                    }
                 }
             });
             
         } catch(err) {
            cb('invalid',null);
         }
     }
}