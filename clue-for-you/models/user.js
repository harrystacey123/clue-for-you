const mongoose = require('mongoose');
    Schema = mongoose.Schema;

const UserSchema = new Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true , unique: true},
    password: {type: String, required: true }
})

UserSchema.set('toJSON', {
    transform: function(doc,ret,otp){
        delete ret['password']
        return ret
    }
})


const User = mongoose.model('User', UserSchema);

module.exports = User;
