import { memo, FC } from "react";

import MovieItem from "components/MovieItem/MovieItem";
import { FavoriteMovies, Movie } from "utils/types";
import styles from "./MovieList.module.scss";

type MovieListProps = {
  movies: Movie[];
  activeMovie: Movie | null;
  favoriteMoviesConfig: FavoriteMovies;
  onMovieClick: (movie: Movie) => void;
};

const MovieList: FC<MovieListProps> = ({
  movies,
  activeMovie,
  favoriteMoviesConfig,
  onMovieClick,
}) => {
  return (
    <ul className={styles.root}>
      {movies.length === 0 && (
        <h2 className={styles.noMovieFound}>No movies found</h2>
      )}

      {movies.length > 0 &&
        movies.map((movie) => (
          <MovieItem
            key={movie.title}
            {...movie}
            isActive={movie.title === activeMovie?.title}
            isFavorite={favoriteMoviesConfig[movie.title]}
            onMovieClick={onMovieClick}
          />
        ))}
    </ul>
  );
};

export default memo(MovieList);
