import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = { term: '' }

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onInputChange(e){
    this.setState({ term: e.target.value })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.handleSubmit(this.state.term);
  }

  render() {
    return (
      <form className="SearchBar input-group" onSubmit={this.handleSubmit}>
        <input
        placeholder="Find a rhyme"
        className="form-control"
        value={this.state.term}
        onChange={this.onInputChange} />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-success">Submit</button>
        </span>
      </form>
    );
  }
}
