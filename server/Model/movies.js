const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  plot: String,
  genres: Array,
  runtime: Number,
  cast: String,
  num_mflix_comments: Number,
  title: String,
  fullplot: String,
  countries: Array,
  released: Date,
  directors: Array,
  rated: String,
  awards: Object,
  lastUpdated: Date,
  year: Number,
  imdb: Object,
  type: String,
  tomatoes: Object,
});

module.exports = mongoose.model('movies', moviesSchema, 'movies');
