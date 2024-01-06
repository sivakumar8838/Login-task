const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    resetPasswod: String,
    createdAt :{
        type: Date,
        default: Date.now(),
    },
    updateAt: Date,
},{versionKey: false});

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;