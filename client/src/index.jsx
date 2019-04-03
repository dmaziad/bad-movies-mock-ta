import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
     // genres: [{"id": 0, "name": "Genres"}],
      movies: [{"vote_count":664,"id":428078,"video":false,"vote_average":6,"title":"Mortal Engines","popularity":274.11,"poster_path":"\/uXJVpPXxZO4L8Rz3IG1Y8XvZJcg.jpg","original_language":"en","original_title":"Mortal Engines","genre_ids":[878,28,12,14,53],"backdrop_path":"\/rxYG6Sj95as9rv9wKIHUx6ATWd3.jpg","adult":false,"overview":"Set in a world many thousands of years in the future. Earth’s cities now roam the globe on huge wheels, devouring each other in a struggle for ever diminishing resources. On one of these massive Traction Cities, Tom Natsworthy has an unexpected encounter with a mysterious young woman from the Outlands who will change the course of his life forever.","release_date":"2018-12-05"},{"vote_count":3206,"id":297802,"video":false,"vote_average":6.9,"title":"Aquaman","popularity":238.791,"poster_path":"\/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg","original_language":"en","original_title":"Aquaman","genre_ids":[28,14,878,12],"backdrop_path":"\/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg","adult":false,"overview":"Once home to the most advanced civilization on Earth, the city of Atlantis is now an underwater kingdom ruled by the power-hungry King Orm. With a vast army at his disposal, Orm plans to conquer the remaining oceanic people -- and then the surface world. Standing in his way is Aquaman, Orm's half-human, half-Atlantean brother and true heir to the throne. With help from royal counselor Vulko, Aquaman must retrieve the legendary Trident of Atlan and embrace his destiny as protector of the deep.","release_date":"2018-12-07"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };
    
    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  getMovies(genre) {
    // make an axios request to your server on the GET SEARCH endpoint
    if (genre === undefined) {
      genre = 28;
    }
    var params = {params: {value: genre}}; 
    axios.get('/movies/search', params)
         .then((response) => {
           this.setState({movies: response.data})
         })
         .catch((err) => {
           console.error(err);
         })
  }

  getFavorites() {
    axios.get('/movies/favorites')
         .then((response) => {
           this.setState({favorites: response.data});
         })
  }

  // getGenres() {
  //   axios.get('/movies/genres')
  //        .then((response) => {
  //          this.setState({genres: response.data})
  //          console.log(response.data)
  //        })
  //        .catch((err) => {
  //          console.log('this is the error: ' + err);
  //        })
  // }

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  componentDidMount() {
    this.getMovies();
    this.getFavorites();
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search getFavorites={this.getFavorites} getMovies={this.getMovies} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} getFavorites={this.getFavorites}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));