import React from 'react';
import './ShowMore.css';

function ShowMore({ handleShowMore, cardsOnPage, movies }) {
  const totalMovies = movies.length;
  return (
    <>
      {(totalMovies > cardsOnPage) && <button className="show-more-movies" onClick={handleShowMore}>Ещё</button>}
    </>
  );
}

export default ShowMore;
