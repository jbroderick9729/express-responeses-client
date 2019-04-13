import React, { Component } from 'react';
import './App.css';
import Game from './Game';


class App extends Component {
  state = {
    sort: "",
    filter: "",
    games: [],
  }


  handleFilter = (filter) => {
    console.log('filtered')
    this.setState({
      filter
    })
  }

  handleSort = (sort) => {
    console.log('sorted')
    this.setState({
      sort
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { sort, filter } = this.state;

    const params = [];

    if (sort) {
      params.push(`sort=${sort}`)
    }

    if (filter) {
      params.push(`genre=${filter}`)
    }

    const query = params.join('&');
    const baseUrl = `http://localhost:8001/apps`;
    const url = `${baseUrl}?${query}`
    console.log(url);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json()
      })
      .then(data => {
        this.setState({
          games: data
        })
      })
      .catch(err => alert('Sorry there was an error. Thank you. Come again.'))
  }

  render() {
    return (
      <div className="App">
        <div className="form">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="sort">
              <select id="sort" name="sort" onChange={e => this.handleSort(e.target.value)}>
                <option value="">Unsorted</option>
                <option value="Rating">Rating</option>
                <option value="App">App</option>
              </select>
            </label>
            <label htmlFor="filter">
              <select id="filter" name="filter" onChange={e => this.handleFilter(e.target.value)}>
                <option value="">No filter</option>
                <option value="Action">Action</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Strategy">Strategy</option>
                <option value="Casual">Casual</option>
                <option value="Arcade">Arcade</option>
                <option value="Card">Card</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
        <ul>
          {this.state.games.map((game, i) => <Game title={game.App} genres={game.Genres} key={i}/>)}
        </ul>
      </div>
    );
  }
}

export default App;
