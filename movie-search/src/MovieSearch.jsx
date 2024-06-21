import React, { useState, useEffect, useRef } from 'react';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MovieList from './MovieList';

const MovieSearch = () => {
  const movies = [
    { title: 'The Matrix', rating: 7.5, genre: 'Action' },
    { title: 'Focus', rating: 6.9, genre: 'Comedy' },
    { title: 'The Lazarus Effect', rating: 6.4, genre: 'Thriller' },
    { title: 'Everly', rating: 5.0, genre: 'Action' },
    { title: 'Maps to the Stars', rating: 7.5, genre: 'Drama' }
  ];

  const [search, setSearch] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterMovies(value,rating,genre);
    setShowAutocomplete(true);
  };
  const handleRatingChange = (e) => {
    const value = e.target.value;
    setRating(value);
    filterMovies(search,value,genre);
  };
  const handleGenreChange = (e) => {
    const value = e.target.value;
    setGenre(value);
    filterMovies(search,rating,value);
  };
  const filterMovies = (search,rating,genre) => {
    let filtered = movies.filter((movie) => {
      return(
        (search === '' || movie.title.toLowerCase().includes(search.toLowerCase())) && 
        (rating === '' || rating === 'Any Rating' || movie.rating === parseFloat(rating)) &&
        (genre === '' || genre === 'Any Genre' || movie.genre === genre)
      );
    });
    setFilteredMovies(filtered);
  };
  const handleMovieSelect = (movie) => {
    setSearch(movie.title);
    setShowAutocomplete(false);
    setFilteredMovies([movie]);
  };
  return (
    <div className="App">
        <nav className="navbar">
            <h1> Movie Hub</h1>
        </nav>
        <div className="content-container">
            <div className="search-container" ref={searchRef}>
              <input type="text" placeholder="Search Movies ..." className="search-bar" value={search} onChange={handleSearchChange} onFocus={() => setShowAutocomplete(true)}/>
              {showAutocomplete && (
                <div className="autocomplete-container">
                  {filteredMovies.map((movie, index) => (
                    <div key={index} onClick={() => handleMovieSelect(movie)}>
                      {movie.title}
                    </div>
                  ))}
                </div>
              )}
              <select className="ratings-dropdown dropdown" value={rating} onChange={handleRatingChange}>
                <option value="">Ratings</option>
                <option value="Any Rating">Any Rating</option>
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                  {'★'.repeat(index + 1) + '☆'.repeat(10 - index - 1)}
                  </option>
                ))}
              </select>
              <select className="genre-dropdown dropdown" value={genre} onChange={handleGenreChange}>
                <option value=""> Genre </option>
                <option value="Any Genre">Any Genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Thriller">Thriller</option>
              </select>
            </div>
            <MovieList movies={filteredMovies}/>
        </div>
    </div>
  )
}

export default MovieSearch