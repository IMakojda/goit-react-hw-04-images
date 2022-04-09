import { useState } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchQueryChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase())
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (searchQuery.trim() === '') {
      Notify.warning("No words to search.")
      return
    }

    onSubmit(searchQuery);
    setSearchQuery('')
  }

  return (
    <header className="searchbar">
      <form className="searchForm" onSubmit={handleSubmit}>
        <button type="submit" className="searchForm-button" >
          <span className="searchForm-button-label">Search</span>
        </button>

        <input
          className="searchForm-input"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          type="text"
        />
      </form>
    </header>
  )

};
