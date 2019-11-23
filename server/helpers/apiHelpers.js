const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

let getMoviesByGenre = (genre, callback) => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&vote_count.gte=1&with_genres=${genre}&sort_by=vote_average.asc`;
// limit to movies which contain genre_ids that include X
    axios.get(url)
         .then((response) => {
             callback(response.data);
         })
         .catch((err) => {
             console.log('Here is the error: ' + err)
         })
}

let getGenreList = (callback) => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
// Object with "genres" prop that is an array.
// Each element of array is an object with "id" prop and "name" prop.
    axios.get(url)
         .then(response => callback(response.data))
         .catch(err => callback(err))
}

module.exports.getMoviesByGenre = getMoviesByGenre;
module.exports.getGenreList = getGenreList;