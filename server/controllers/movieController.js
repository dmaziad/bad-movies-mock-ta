const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre     
    // console.log(req);
    let genreId = req.query.value;
    // https://www.themoviedb.org/account/signup
    // get your API KEY
    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
    apiHelpers.getMoviesByGenre(genreId, (result) => {
      res.send(result.results)
    })
    
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres
    // axios.get(`https://api.themoviedb.org/3/genre/movie/list`)
    
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
         apiHelpers.getGenreList((result) => {
           res.send(JSON.stringify(result.genres));
         })
    // send back
  },
  saveMovie: (req, res) => {
    let params = req.body;
    console.log(params);
    // console.log(req);
    //let params = [req.body.title, req.body.genre_ids, req.body.vote_average];
    movieModel.movies.save(params, (err) => {
      if (err) {
        console.error(err)
      }
      res.sendStatus(201);
    })
  },

    getFavorites: (req, res) => {
      movieModel.movies.get((err, results) => {
        if (err) {
          console.error(err);
        }
        res.send(results);
      })
    },
  deleteMovie: (req, res) => {
    console.log('this is the request body: ' + JSON.stringify(req.body.title));
    movieModel.movies.delete(req.body.title, (err) => {
      if (err) {
        console.error(err);
      }
      res.sendStatus(201);
    })
  }
}