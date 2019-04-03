import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [{"id": 0, "name": "Genre"}],
      value: 20
    };
   this.getGenres = this.getGenres.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }


  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/movies/genres')
         .then((response) => {
           this.setState({genres: response.data})
         })
         .catch((err) => {console.log('the error is: ' + err)})
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={(e) => {this.setState({value: e.target.value})}} >
        {this.state.genres.map((genre) => {
          return (
          <option value={genre.id}>{genre.name}</option>
          )}
        )}
        </select>
        <br/><br/>

        <button onClick={()=>{this.props.getMovies(this.state.value)}}>Search</button>

      </div>
    );
  }
}

export default Search;