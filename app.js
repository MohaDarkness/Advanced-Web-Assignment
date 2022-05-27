var express = require('express');
const app = express();

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({'extended':false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

const homeRoute = require('./routes/home.js');
const moviesRoute = require('./routes/movies.js'); 
// const addMovies = require('./routes/admin.js');

app.use(homeRoute);
app.use(moviesRoute);
// app.use(addMovies)

app.get(('*'),(req, res, next)=>{
    res.status('404');
    res.send("Say hi to this friendly 404 error @_@");
})

app.listen(5000, ()=>{
    console.log("we are listening");
});