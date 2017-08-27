/**
 * Created by mupxq on 8/26/17.
 */
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');


let userSchema = new Schema({
    userEmail: String,
    userPwd: String,
    userSex: String,
    userFirstName: String,
    userLastName: String,
});

userSchema.pre('save', function(next) {
    let user = this;
    let SALT_FACTOR = 10;

    if (!user.isModified('userPwd')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.userPwd, salt, null, function(err, hash) {
            if (err) return next(err);
            user.userPwd = hash;
            next();
        });
    });
});



userSchema.methods = {
    comparePassword: function(_password, cb) {
        bcrypt.compare(_password, this.userPwd, function(err, isMatch) {
            if (err) return cb(err);

            cb(null, isMatch)
        })
    }
};

let userDBInterface = mongoose.model('User', userSchema);
export default userDBInterface
