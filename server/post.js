const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    name : {type : String},
    content : {type : String},
    originalFileName : {type : String},
    path: {type : String}
});

module.exports = mongoose.model('PostSchema', postSchema)