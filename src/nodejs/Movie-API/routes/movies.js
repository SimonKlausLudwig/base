const express = require('express');

const passport = require("../middleware/passport");
const {Movies} = require("../models/movies.model");

const moviesRouter = express.Router();


moviesRouter.get('/movies', passport.authenticate('jwt', {session: false}), handleGetMovies());

moviesRouter.get('/movies/:Title', passport.authenticate('jwt', {session: false}), handleGetMovieByTitle());

moviesRouter.get('/movies/genre/:Name', passport.authenticate('jwt', {session: false}), handleGetGenreByName());

moviesRouter.get('/movies/director/:Name', passport.authenticate('jwt', {session: false}), handleGetDirectorByName());


// READ - Get movie
function handleGetMovies() {
    return (req, res) => {
        Movies.find()
            .then(movies => {
                res.status(200).json(movies);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    };
}

// READ - Get movie by title
function handleGetMovieByTitle() {
    return (req, res) => {
        Movies.findOne({Title: req.params.Title})
            .then((movie) => {
                res.status(200).json(movie);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            })
    };
}

// READ - Get description of genre by genre's name
function handleGetGenreByName() {
    return (req, res) => {
        Movies.findOne({'Genre.Name': req.params.Name})
            .then((movie) => {
                res.status(200).json(movie.Genre);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    };
}

// READ - Get data about director by director's name
function handleGetDirectorByName() {
    return (req, res) => {
        Movies.findOne({'Director.Name': req.params.Name})
            .then((movie) => {
                res.status(200).json(movie.Director);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    };
}

module.exports = {moviesRouter};
