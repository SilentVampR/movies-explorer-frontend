import React from 'react';
import './ShowMore.css';

function ShowMore({ handleShowMore, step, movies }) {
  const totalMovies = movies.length;
  return (
    <>
      {(totalMovies > step) && <button className="show-more-movies" onClick={handleShowMore}>Ещё</button>}
    </>
  );
}

export default ShowMore;
