import { memo, FC } from "react";

import { StarIcon } from "assets/icons/StarIcon";
import { FavoriteMovies, Movie } from "utils/types";
import styles from "./MovieDetails.module.scss";

type MovieDetailsProps = Movie & {
  favoriteMoviesConfig: FavoriteMovies;
  onFavoriteIconClick: (title: string) => void;
};

const MovieDetails: FC<MovieDetailsProps> = ({
  title,
  opening_crawl,
  favoriteMoviesConfig,
  onFavoriteIconClick,
}) => {
  const handleFavoriteIconClick = () => {
    onFavoriteIconClick(title);
  };

  return (
    <>
      <h1 className={styles.title}>
        {title}
        <span className={styles.starIcon} onClick={handleFavoriteIconClick}>
          <StarIcon fill={favoriteMoviesConfig[title] ? "yellow" : "grey"} />
        </span>
      </h1>

      <p>{opening_crawl}</p>
    </>
  );
};

export default memo(MovieDetails);
