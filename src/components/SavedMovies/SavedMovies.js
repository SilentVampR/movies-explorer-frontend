import React from 'react';
import './SavedMovies.css';

import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMore from '../ShowMore/ShowMore';

function SavedMovies(props) {

  return (
    <>
      <Search />
      <section className="movies">
        <MoviesCardList films={props.films} isLoading={props.isLoading} page="saved-movies" />
        <ShowMore/>
      </section>
    </>
  );
}

export default SavedMovies;
