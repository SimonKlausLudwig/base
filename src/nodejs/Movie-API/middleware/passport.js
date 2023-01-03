
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const {Users} = require("../models/users.model");

let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'Name',
    passwordField: 'Password'
}, (name, password, callback) => {
    console.log(name + ' ' + password);
    Users.findOne({Name: name}, (error, user) => {
        if (error) {
            console.log(error);
            return callback(error);
        }
        if (!user) {
            console.log('incorrect username');
            return callback(null, false, {message: 'Incorrect username.'});
        }
        if(!user.validatePassword(password)){
            console.log('incorrect password.');
            return callback(null, false, {message: 'Incorrect password.'})
        }

        console.log('finished');
        return callback(null, user);
    });
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error)
        });
}));

module.exports = passport;