var express = require('express');
var path = require('path');
var router = express.Router();

router.use(express.urlencoded({ extended: true }));


let movies = [
    {title:"The Batman", release:"2022", genre:"Action"},
    {title:"I Am Sam", release:"2020", genre:"Drama"}
];

movies = movies.map( (v, ind) => {
    return {
        ...v,
        id : ind
    }
} );

router.get('/movies/add', (req, res, next)=>{
    res.render('addMovies', {movies,});
});

router.get('/movies', (req, res, next)=>{
    res.render('movies',{movies,});
});


router.post('/movies', (req, res, next)=>{
    const movieToAdd = {
        title: req.body.mName,
        release: req.body.mRelease,
        genre: req.body.mGenre,
        id: movies.length
    }
    movies.push(movieToAdd);
    console.log(movies);
    res.redirect("/movies");
});

router.get("/movies/:id", (req, res, next) => {
    const movie = movies.find((ite) => ite.id === Number(req.params.id));
    console.log(movie);
    
    // console.log(req.params.id);
    res.render("movieDetails", { title : movie.title, release: movie.release, genre: movie.genre });
});


module.exports = router;

