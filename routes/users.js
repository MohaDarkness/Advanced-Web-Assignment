var express = require('express');
const { read } = require('fs');
const mongoose = require('mongoose');
var path = require('path');
var router = express.Router();
router.use(express.urlencoded({ extended: true }));


const userSchema = new mongoose.Schema({
    username:  {type:String, require:true, unique:true},
    age:       {type:Number, require:true},
    password:   {type:String, require:true},
    favGenre:  {type:String, require:true}
}, {collection: 'users-data'});

var UsersData = mongoose.model('UsersData', userSchema);

router.get('/signUp',(req, res, next)=>{
    res.render(path.join(__dirname,"../","views","signUp.ejs"), {error:""});
});

router.post('/signUp', (req, res, next)=>{
    UsersData.find({username:req.body.uName}, (e, data)=>{
        if(data == 0){
            UsersData.create({
                username: req.body.uName,
                password: req.body.uPassword,
                age:      req.body.uAge,
                favGenre: req.body.uFavGenre 
            });
            res.redirect("/");
        }
        else{
            console.log(data);
            res.render(path.join(__dirname,"../","views","signUp.ejs"), {error:"Username is already exists."});
        }
    });
    
});

router.get('/logIn',(req, res, next)=>{
    res.render(path.join(__dirname,"../","views","logIn.ejs"), {error:"",});
});

router.post('/logIn', (req, res, next)=>{
    UsersData.find({'username':req.body.uName}, 'password', (e, data)=>{
        const thisPassword = data.password;
        if(data == 0){
            res.render(path.join(__dirname,"../","views","logIn.ejs"), {error:"This user name has no account!!"});
        }
        else{
            if(req.body.uPassword == data[0].password){
                res.render(path.join(__dirname,"../","views","home.ejs"), {logged:"You're logged in", tab_title:"Home"});
            }
            else{
                console.log(data[0].password);
                res.render(path.join(__dirname,"../","views","logIn.ejs"), {error:"Incorrect Password!!", tab_title:"Log in"});
            }
        }
    });
    
});

module.exports = router;