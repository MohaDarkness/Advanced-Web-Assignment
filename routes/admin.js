var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var router = express.Router();
router.use(express.urlencoded({ extended: true }));

var movieSchema = new mongoose.Schema({
    title:  {type:String, require:true},
    release:{type:Number, require:true},
    genre:  {type:String, require:true}
}, {collection: 'movies-data'});

const userSchema = new mongoose.Schema({
    username:  {type:String, require:true, unique:true},
    age:       {type:Number, require:true},
    password:   {type:String, require:true},
    favGenre:  {type:String, require:true}
}, {collection: 'users-data'});

var fromUsers = mongoose.model('fromUsers', userSchema);
var fromMovies = mongoose.model('fromMovies', movieSchema);

function getAllUsers(){
    var UsersData = [];
    try{
        fromUsers.find({},(err, uData)=>{
            for(user of uData){
                UsersData.push({name: user.username, favGen: user.favGenre, movies:[]});
            }
            // console.log(UsersData);
            return UsersData;
        });
    } catch (err){
        console.log("Something is wrong");
        return UsersData;
    }
};

function getMovies(allUsersData){
    for(user of allUsersData){
        fromMovies.find({genre:user.favGenre},(err, mData)=>{
           for(movie of mData){
               user["movies"].push(movie.title);
           }
       });
    }

    return allUsersData;
};

router.get('/admin',(req, res, next)=>{
    var allUsersData = [];
    allUsersData = getAllUsers()
    console.log(allUsersData);
    // allUsersData = await getMovies(allUsersData);
    // console.log(allUsersData);
    
    // res.render("admin", {data:allUsersData});
});


module.exports = router;