import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import Navbar from './navbar';
import SearchBar from './searchbar';

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      rhymes: []
    }
  }

  onSubmit = (term) => {
    axios.get(`https://api.datamuse.com/words?rel_rhy=${term}`)
      .then((rhyme) => {
        let { rhymes } = this.state;
        let rand = this.getRandomWord(rhyme);
        rhymes.push(rand);
        this.setState({ rhymes });
      });
  }

  getRandomWord = (rhyme) => {
    let { rhymes } = this.state;
    let rand = rhyme.data[Math.floor(Math.random() * rhyme.data.length)];
    if (rhymes.length > 0 && rhymes.includes(rand)) {
      console.log('same');
      this.getRandomWord(rhyme);
    } else {
      return rand.word;
    }

  }

  render() {
    let { rhymes } = this.state;
    let words;
    if (rhymes.length > 0) {
      words = rhymes.map((word) => {
        return <li key={word}>{word}</li>;
      });
    }

    return (
      <div className="App">
        <Navbar brand="Rhymes" />
        <div className="container">
          <h1>Find rhyming words!</h1>
          <SearchBar handleSubmit={this.onSubmit}/>
          <ul className="words">
            {words}
          </ul>
        </div>
      </div>
    );
  }
}
