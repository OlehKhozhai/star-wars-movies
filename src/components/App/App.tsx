import { useEffect, useCallback, useState } from "react";

import MovieList from "components/MovieList/MovieList";
import MovieDetails from "components/MovieDetails/MovieDetails";
import { FavoriteMovies, Movie } from "utils/types";
import {
  getAPIData,
  getFavoriteMoviesConfigFromLS,
  setFavoriteMoviesConfigToLS,
  updateFavoriteMoviesConfig,
  initializeFavoriteMoviesConfigToLS,
} from "utils/helpers";
import { APIPath } from "utils/constants";
import styles from "./App.module.scss";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovies>(
    getFavoriteMoviesConfigFromLS()
  );

  const handleMovieClick = useCallback((movie: Movie) => {
    setActiveMovie(movie);
  }, []);

  const handleFavoriteIconClick = useCallback((title: string) => {
    const updatedFavoriteMoviesConfig = updateFavoriteMoviesConfig(title);

    setFavoriteMoviesConfigToLS(updatedFavoriteMoviesConfig);
    setFavoriteMovies(updatedFavoriteMoviesConfig);
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      const response = await getAPIData<{ results: Movie[] }>(APIPath.Films);
      if (response?.results?.length > 0) {
        setMovies(response.results);
        setActiveMovie(response.results[0]);
        initializeFavoriteMoviesConfigToLS(response.results);
      }
    };

    getMovies();
  }, []);

  return (
    <div className={styles.root}>
      <aside className={styles.aside}>
        <MovieList
          movies={movies}
          activeMovie={activeMovie}
          favoriteMoviesConfig={favoriteMovies}
          onMovieClick={handleMovieClick}
        />
      </aside>

      {activeMovie && (
        <main className={styles.main}>
          <MovieDetails
            {...activeMovie}
            favoriteMoviesConfig={favoriteMovies}
            onFavoriteIconClick={handleFavoriteIconClick}
          />
        </main>
      )}
    </div>
  );
};

export default App;
