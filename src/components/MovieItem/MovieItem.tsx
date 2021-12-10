import { memo, FC } from "react";

import { StarIcon } from "assets/icons/StarIcon";
import { Movie } from "utils/types";
import styles from "./MovieItem.module.scss";

type MovieItemProps = Movie & {
  isActive: boolean;
  isFavorite: boolean;
  onMovieClick: (movie: Movie) => void;
};

const MovieItem: FC<MovieItemProps> = ({
  isActive,
  isFavorite,
  onMovieClick,
  ...movie
}) => {
  const handleMovieClick = () => {
    onMovieClick(movie);
  };

  return (
    <li
      className={`${styles.root} ${isActive ? styles.active : ""}`}
      onClick={handleMovieClick}
    >
      {movie.title}

      <span className={styles.starIcon}>
        <StarIcon fill={isFavorite ? "yellow" : "grey"} />
      </span>
    </li>
  );
};

export default memo(MovieItem);
