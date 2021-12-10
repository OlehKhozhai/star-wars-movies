import { LSKey } from "utils/constants";
import { movieMock } from "utils/mock";
import {
  initializeFavoriteMoviesConfigToLS,
  getFavoriteMoviesConfigFromLS,
  setFavoriteMoviesConfigToLS,
  updateFavoriteMoviesConfig,
} from "../helpers";

describe("Helpers", () => {
  describe("initializeFavoriteMoviesConfigToLS unit tests", () => {
    afterEach(() => {
      localStorage.removeItem(LSKey.FavoriteMovies);
    });

    it("should return empty object", () => {
      initializeFavoriteMoviesConfigToLS([]);
      const favoriteMovies = getFavoriteMoviesConfigFromLS();

      expect(favoriteMovies).toStrictEqual({});
    });

    it("should return proper value", () => {
      initializeFavoriteMoviesConfigToLS([movieMock]);
      const favoriteMovies = getFavoriteMoviesConfigFromLS();

      expect(favoriteMovies).toStrictEqual({
        [movieMock.title]: false,
      });
    });
  });

  describe("getFavoriteMoviesConfigFromLS unit tests", () => {
    afterEach(() => {
      localStorage.removeItem(LSKey.FavoriteMovies);
    });

    it("should return null", () => {
      getFavoriteMoviesConfigFromLS();

      expect(getFavoriteMoviesConfigFromLS()).toStrictEqual({});
    });

    it("should return proper value", () => {
      initializeFavoriteMoviesConfigToLS([movieMock]);

      expect(getFavoriteMoviesConfigFromLS()).toStrictEqual({
        [movieMock.title]: false,
      });
    });
  });

  describe("setFavoriteMoviesConfigToLS unit tests", () => {
    afterEach(() => {
      localStorage.removeItem(LSKey.FavoriteMovies);
    });

    it("should set favorite movies config", () => {
      setFavoriteMoviesConfigToLS({ [movieMock.title]: false });
      const favoriteMovies = getFavoriteMoviesConfigFromLS();

      expect(favoriteMovies).toStrictEqual({
        [movieMock.title]: false,
      });
    });
  });

  describe("updateFavoriteMoviesConfig unit tests", () => {
    afterEach(() => {
      localStorage.removeItem(LSKey.FavoriteMovies);
    });

    it("should update one movie", () => {
      setFavoriteMoviesConfigToLS({ [movieMock.title]: false });
      const favoriteMovies = updateFavoriteMoviesConfig(movieMock.title);

      expect(favoriteMovies).toStrictEqual({
        [movieMock.title]: true,
      });
    });
  });
});
