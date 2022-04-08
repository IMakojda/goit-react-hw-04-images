import React, { Component } from "react";

class SearchForm extends Component {
  state = {
    image: [],
    searchQuery: "",
  }

  render() {
    return (
      <form className="searchForm">

        <button type="submit" className="searchForm-button">
          <span className="searchForm-button-label">Search</span>
        </button>

        <input
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />

      </form>
    )
  }
}

export default SearchForm