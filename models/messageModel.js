const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const {Comment, CommentSchema} = require('./commentModel')

const MessageSchema = new mongoose.Schema({
    name: {type: String, required:true},
    message:{type:String, required:true},
    comments: [CommentSchema]
   })

MessageSchema.plugin(AutoIncrement, {inc_field: 'id'});

const Message = mongoose.model('Message', MessageSchema);

const messageModel={
    create: function(newMessage){
        return Message.create(newMessage)
    },
    findAll:function(){
        return Message.find()
    },

    findById:function(Id){

        return Message.findOne({id:Id})
    },

    update: function(Id,newMessage){
        return Message.updateOne({id:Id},newMessage)
    },

    delete: function(Id){
        return Message.deleteOne({id:Id})
    },

    addComment: function(id,comment){
        return Message.updateOne({id:id},{$push:{comments: comment}})
    }




}

module.exports = {messageModel}