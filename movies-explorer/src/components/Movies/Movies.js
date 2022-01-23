import React from 'react';
import './Movies.css';

import Search from '../Search/Search';
import Movie from '../Movie/Movie';

function Movies(props) {
  let step = 6;

  return (
    <>
      <Search />
      <section className="movies">
        <div className="movies__container">
          {props.films.map((item) => (
            (item.id <= step) && <Movie key={item.id} title={item.nameRU} duration={item.duration} thumb={item.image.url} />))}
        </div>
        <button className="show-more-movies">Ещё</button>
      </section>
    </>
  );
}

export default Movies;
