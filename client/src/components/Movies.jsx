import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class Movies extends React.Component {
  constructor(props) {
    super(props)

  }

  addFav(e) {
    var movie = $(e).find("h2");
    var movieTitle = movie['0'].innerText
    console.log(movieTitle);
    var favTarget = this.props.movies.filter((film)=> {
      return film.title === movieTitle;
    })[0];
    console.log(favTarget)
    var params = {title: favTarget.title, release_date: favTarget.release_date, poster_path: favTarget.poster_path, vote_average: favTarget.vote_average};
    if (this.props.showFaves === false) {
    axios.post('/movies/save', params)
         .then((response) => {
           this.props.getFavorites();
           console.log('movie saved!');
         })
         .catch((err) => console.log('there was an error adding movie: ' + err))
    }
    if (this.props.showFaves === true) {
      axios.delete('/movies/delete', {data: {title: movieTitle}})
           .then((response) => {
             this.props.getFavorites();
             console.log('movie removed')
           })
           .catch((err) => console.log('there was a problem deleting the movie: ' + err))
    }
  }
  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    return (
      <ul className="movies">
    {this.props.movies.map((movie) => {
    return (
        <li className="movie_item" onClick={(e) => {console.log(e.currentTarget); this.addFav(e.currentTarget)}}>
          <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`} />
          <div className="movie_description">
            <h2>{movie.title}</h2>
            <section className="movie_details">
              <div className="movie_year">
                <span className="title">Year</span>
                <span>{movie.release_date.slice(0,4)}</span>
              </div>
              <div className="movie_rating">
                <span className="title">Rating</span>
                <span>{movie.vote_average}</span>
              </div>
            </section>
          </div>
        </li>
        )
      }
    )
  }
      </ul>
    );
  }
}

export default Movies;