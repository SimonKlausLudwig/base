const mongoose = require("mongoose");

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre:{
        Name: String,
        Description: String
    },
    Director:{
        Name: String,
        Bio: String,
        Birth: String,
        Death: String
    },
    ImageURL: String,
    Featured: Boolean
});

let Movies = mongoose.model('Movie', movieSchema);

module.exports.Movies = Movies;