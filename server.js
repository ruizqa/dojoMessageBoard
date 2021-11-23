const express = require("express");
const session = require('express-session');
const flash = require( 'express-flash' );
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/dojoBoard', {useNewUrlParser: true});
const {messageModel} = require('./models/messageModel')

app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.set( 'static', __dirname + '/static' );
app.set( 'views', __dirname + '/views' );
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 20 }
}));

app.get('/', function(req, res) {
    messageModel
    .findAll()
    .then(data => res.render("index", {posts: data}))
    .catch(err => console.log(err))
})

app.post('/messages', function(req, res) {
    console.log(req.body)
    let message = {}
    message.name = req.body.name;
    message.message = req.body.message;

    if(message.name.length >0 && message.message.length >0){
        messageModel
    .create(message)
    .then(newMessage => console.log('Message created: ', newMessage))
    .catch(err => {console.log(err)})
    res.redirect('/')
}
    else{

        req.flash('error', 'Please fill all fields')
        res.redirect('/')
    }


    })
    

app.post('/comments', function(req, res) {

    if(req.body.name.length <1 || req.body.comment.length <1){
        req.flash(`errorComment${req.body.messageId}`,'Please fill all fields')
        res.redirect('/')

    }

    else{
    let comment = {}
    comment.name = req.body.name;
    comment.comment = req.body.comment;
    
    
    messageModel
    .addComment(req.body.messageId,comment)
    .then(newComment => console.log('Comment created: ', newComment))
    .catch(err => req.flash(`errorComment${req.body.messageId}`, `${err}. Please fill all fields`))
    
    res.redirect('/')}
})


// tell the express app to listen on port 8000
app.listen(8181, function() {
 console.log("listening on port 8181");
});
