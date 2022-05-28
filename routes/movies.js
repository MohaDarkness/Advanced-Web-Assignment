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
    var movies = MoviesData.find({},(err, movies)=>{
        res.render('addMovies', movies);
    });
});

router.get('/movies', (req, res, next)=>{
    var movies = MoviesData.find({},(err, movies)=>{
        console.log(movies);
        res.render('movies', {movies});
    });
});


router.post('/movies', (req, res, next)=>{
    MoviesData.create({
        title: req.body.mName,
        release: req.body.mRelease,
        genre: req.body.mGenre,
    });

    res.redirect("/movies");
});

router.get("/movies/:id", (req, res, next) => {
    MoviesData.findById(req.params.id,(err, movie)=>{
        res.render("movieDetails", { title : movie.title, release: movie.release, genre: movie.genre });
    });
});


module.exports = router;

