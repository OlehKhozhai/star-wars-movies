import { LSKey } from "utils/constants";
import { FavoriteMovies, Movie } from "utils/types";

export const getAPIData = <T>(
  url: string,
  params: RequestInit = {}
): Promise<T> =>
  fetch(url, { ...params })
    .then((data) => data.json())
    .then((data) => data)
    .catch((error) => console.log("--error--", error));

export const initializeFavoriteMoviesConfigToLS = (movies: Movie[]): void => {
  const favoriteMovies = localStorage.getItem(LSKey.FavoriteMovies);

  if (!favoriteMovies) {
    const preparedMovies = movies.reduce<FavoriteMovies>(
      (accumulator, movie) => {
        accumulator[movie.title] = false;

        return accumulator;
      },
      {}
    );

    localStorage.setItem(LSKey.FavoriteMovies, JSON.stringify(preparedMovies));
  }
};

export const getFavoriteMoviesConfigFromLS = (): FavoriteMovies => {
  const favoriteMovies = localStorage.getItem(LSKey.FavoriteMovies);

  return favoriteMovies ? JSON.parse(favoriteMovies) : {};
};

export const setFavoriteMoviesConfigToLS = (config: FavoriteMovies): void => {
  localStorage.setItem(LSKey.FavoriteMovies, JSON.stringify(config));
};

export const updateFavoriteMoviesConfig = (
  title: string
): FavoriteMovies => {
  const favoriteMovies = getFavoriteMoviesConfigFromLS();
  const newFavoriteMovies = {
    ...favoriteMovies,
    [title]: !favoriteMovies[title],
  };

  return newFavoriteMovies;
};
