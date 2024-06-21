import React from 'react';
import './MovieList.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const MovieList = ({ movies }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const starArray = [];

    for (let i = 0; i < fullStars; i++) {
      starArray.push(<FaStar key={i} />);
    }

    if (hasHalfStar) {
      starArray.push(<FaStarHalfAlt key={starArray.length} />);
    }

    for (let i = 0; i < emptyStars; i++) {
      starArray.push(<FaRegStar key={starArray.length + i} />);
    }

    return starArray;
  };

  return (
    <div>
      {movies.map((movie, index) => (
        <div key={index} className="movie-box d-md-flex align-items-center justify-content-between mb-30">
          <div className="movie-left my-4 d-md-flex align-items-center flex-wrap">
            <div className="movie-content">
              <h5 className="text-center text-md-left">{movie.title}</h5>
              <div className="rating-container">
                <div className="rating-stars">
                  {renderStars(movie.rating)}
                </div>
                <div className="rating-number">
                  {movie.rating}
                </div>
              </div>
            </div>
          </div>
          <div className="genre text-muted">{movie.genre}</div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;

