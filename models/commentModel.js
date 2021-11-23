const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CommentSchema = new mongoose.Schema({
    name: {type: String, required:true},
    comment:{type:String, required:true}
   })


const Comment = mongoose.model('Comment', CommentSchema);


module.exports = {Comment, CommentSchema}