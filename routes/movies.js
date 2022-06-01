var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
const { stringify } = require('querystring');
var router = express.Router();

router.use(express.urlencoded({ extended: true }));

const movieSchema = new mongoose.Schema({
    title:  {type:String, require:true},
    release:{type:Number, require:true},
    genre:  {type:String, require:true}
}, {collection: 'movies-data'});

var MoviesData = mongoose.model('MoviesData', movieSchema);


router.get('/movies/add', (req, res, next)=>{
    res.render('addMovies', {m_id:"", title :"", release:"", genre:"", flag:0, edit:"", add:"Add Movie"});
});

router.get('/movies', (req, res, next)=>{
    var movies = MoviesData.find({},(err, movies)=>{
        res.render('movies', {movies});
    });
});

router.post('/movies', (req, res, next)=>{
    console.log(req.body.mName);
    if(req.body.flag == 1){
        console.log("IM IN THE IF STATEMENT");
        console.log(req.body.mID);
        MoviesData.findByIdAndUpdate(req.body.mID, {title    :req.body.mName,
                                                   release  :req.body.mRelease,
                                                   genre    :req.body.mGenre}, (err, movie)=>{
                                                   });
 
    }
    else{
        console.log("Inside the else...");
        console.log(req.body.id);
        MoviesData.create({
            title: req.body.mName,
            release: req.body.mRelease,
            genre: req.body.mGenre,
        });
    }
 
    res.redirect("/movies");
});

router.get("/movies/:id", (req, res, next) => {
    MoviesData.findById(req.params.id,(err, movie)=>{
        res.render("movieDetails", { m_id: movie._id, title : movie.title, release: movie.release, genre: movie.genre});
    });
});

router.get("/movies/:id/delete", (req, res, next) => {
    MoviesData.findByIdAndDelete(req.params.id,(err, movie)=>{
        res.redirect("/movies");
    });
});

router.get("/movies/:id/update", (req, res, next) => {
    MoviesData.findById(req.params.id,(err, movie)=>{
        // console.log(movie._id);
        res.render('addMovies', {m_id: movie._id, title : movie.title, release: movie.release, genre: movie.genre, flag:1, edit:" - EDIT", add:""});
    });
});

module.exports = router;
                  

