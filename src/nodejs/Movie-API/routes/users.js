const express = require('express');


const {check, validationResult} = require('express-validator');
const passport = require("../middleware/passport");
const {Users} = require("../models/users.model");
const {Movies} = require("../models/movies.model");

const usersRouter = express.Router();


// VALIDATE INPUT TO USER BODY
const validateUserBody = [
    check('Name', 'Username is required.').not().isEmpty(),
    check('Name', 'Username has to contain at least 5 characters.').isLength({min: 5}),
    // check('Name', 'Username contains non alphanumeric characters. Not allowed.').isAlphanumeric(),
    check('Password', 'Password is required.').not().isEmpty(),
    check('Password', 'Password has to contain at least 5 characters').isLength({min: 5}),
    check('Email', 'That is not a valid email address').isEmail(),
    check('Birthday', 'The required format is DD-MM-YYYY').isISO8601().toDate(),
];


usersRouter.post('/users', validateUserBody, handlePostUsers());

usersRouter
    .route('/users/:Name/movies/:Title')
    .post(passport.authenticate('jwt', {session: false}), handlePostUserMoviesByTitle())
    .delete(passport.authenticate('jwt', {session: false}), handleDeleteUserMovieByTitle());

usersRouter
    .route('/users/:Name')
    .get(passport.authenticate('jwt', {session:false}), handleGetUserByName())
    .put(passport.authenticate('jwt', {session: false}), validateUserBody,handlePutUserByName())
    .delete(passport.authenticate('jwt', {session: false}), handleDeleteUserByName());


// CREATE - Create and add new user
function handlePostUsers() {
    return (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors
            });
        }
        let hashedPassword = Users.hashPassword(req.body.Password);
        Users.findOne({Name: req.body.Name})
            .then((user) => {
                if (user) {
                    res.status(409).send({
                        success: false,
                        errors: [
                            {
                                param: 'Name',
                                msg: req.body.Name + ' already exists.'
                            }
                        ]
                    });
                } else {
                    Users
                        .create({
                            Name: req.body.Name,
                            Password: hashedPassword,
                            Email: req.body.Email,
                            Birthday: req.body.Birthday
                        })
                        .then((user) => {
                            res.status(201).json(user)
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).send({
                                success: false,
                                errors: [
                                    {
                                        param: 'Name',
                                        msg: 'Error: ' + err,
                                    }
                                ]
                            });
                        });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send({
                    success: false,
                    errors: [
                        {
                            param: 'Name',
                            msg: 'Error: ' + err,
                        }
                    ]
                });
            });
    };
}


// CREATE AND DELETE ROUTES - Add and delete favorite movies from user by movie title
function handlePostUserMoviesByTitle() {
    return (req, res) => {
        Movies.findOne({Title: req.params.Title})
            .then((movie) => {
                if (!movie) {
                    return res.status(404).send('Movie not found');
                }
                Users.findOne({Name: req.params.Name})
                    .then(user => {
                        if (!user) {
                            res.status(404).send('User not found');
                            return;
                        }
                        if (user.FavoriteMovies.includes(movie._id)) {
                            res.status(400).send('Movie already included.');
                            return
                        }
                        Users.findOneAndUpdate(
                            {Name: req.params.Name},
                            {
                                $push: {
                                    FavoriteMovies: movie._id
                                },
                            },
                            {new: true},
                            (err, updatedUser) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).send('Error: ' + err);
                                } else {
                                    res.status(201).json(updatedUser);
                                }
                            }
                        )
                    })
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            })
    };
}

function handleDeleteUserMovieByTitle() {
    return (req, res) => {
        Movies.findOne({Title: req.params.Title})
            .then((movie) => {
                if (!movie) {
                    return res.status(404).send('Movie not found')
                }
                Users.findOne({Name: req.params.Name})
                    .then(user => {
                        if (!user) {
                            return res.status(404).send('User not found')
                        }
                        if (!user.FavoriteMovies.includes(movie._id)) {
                            res.status(304).send('Movie does not exist in list of favorite movies.');
                            return
                        }
                        Users.findOneAndUpdate(
                            {Name: req.params.Name},
                            {
                                $pull: {
                                    FavoriteMovies: movie._id
                                },
                            },
                            {new: true},
                            (err) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).send('Error: ' + err);
                                } else {
                                    res.status(200).send(req.params.Title + ' was deleted from user ' + req.params.Name);
                                }
                            }
                        )
                    })

            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    };
}

function handleGetUserByName() {
    return (req, res) => {
        Users.findOne({Name: req.params.Name})
            .then(user => {
                if (!user) {
                    res.status(404).send('User not found');
                    return;
                }
                res.status(200).json(user);
            });
    };
}

// UPDATE AND REMOVE ROUTES - Update and remove user info by username
function handlePutUserByName() {
    return (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array()
            });
        }
        Users.findOneAndUpdate(
            {Name: req.params.Name},
            {
                $set: {
                    Name: req.body.Name,
                    Password: Users.hashPassword(req.body.Password),
                    Email: req.body.Email,
                    Birthday: req.body.Birthday
                },
            },
            {new: true},
            (err, updatedUser) => {
                if (err) {
                    console.error(err)
                    res.status(500).send('Error: ' + err)
                } else {
                    res.status(200).json(updatedUser);
                }
            }
        )
    };
}

function handleDeleteUserByName() {
    return (req, res) => {
        Users.findOneAndRemove({Name: req.params.Name})
            .then((user) => {
                if (!user) {
                    res.status(400).send(req.params.Name + ' was not found!')
                } else {
                    res.status(200).send(req.params.Name + ' was deleted.');
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    };
}


module.exports = {
    usersRouter,
    validateUserBody,
};
