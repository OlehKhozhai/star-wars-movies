import React from "react";
import { create, act } from "react-test-renderer";

import { movieMock } from "utils/mock";
import {
  getAPIData,
  getFavoriteMoviesConfigFromLS,
  updateFavoriteMoviesConfig,
} from "utils/helpers";
import { APIPath } from "utils/constants";
import MovieList from "components/MovieList/MovieList";
import MovieDetails from "components/MovieDetails/MovieDetails";
import App from "./App";

jest.mock("./../MovieList/MovieList", () => ({
  __esModule: true,
  default: "<---MovieList--->",
}));
jest.mock("./../MovieDetails/MovieDetails", () => ({
  __esModule: true,
  default: "<---MovieDetails--->",
}));
jest.mock("utils/helpers");

describe("App component", () => {
  beforeAll(() => {
    localStorage.removeItem(APIPath.Films);
  });

  it("should render by default", () => {
    (getFavoriteMoviesConfigFromLS as jest.Mock).mockReturnValue({});
    const component = create(<App />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render with movies properly", () => {
    (getAPIData as jest.Mock).mockResolvedValue({
      results: [],
    });
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [[movieMock], jest.fn()])
      .mockImplementationOnce(() => [movieMock, jest.fn()])
      .mockImplementationOnce(() => [{ [movieMock.title]: true }, jest.fn()]);

    const component = create(<App />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should trigger setMovies and setActiveMovie functions with proper arguments", async () => {
    const setMoviesStub = jest.fn();
    const setActiveMovieStub = jest.fn();

    (getAPIData as jest.Mock).mockResolvedValue({
      results: [{ title: "Test" }],
    });
    (getFavoriteMoviesConfigFromLS as jest.Mock).mockReturnValue({});
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [[movieMock], setMoviesStub])
      .mockImplementationOnce(() => [movieMock, setActiveMovieStub])
      .mockImplementationOnce(() => [{ [movieMock.title]: true }, jest.fn()]);

    await act(async () => {
      create(<App />);
    });

    expect(setMoviesStub).toHaveBeenCalledWith([{ title: "Test" }]);
    expect(setActiveMovieStub).toHaveBeenCalledWith({ title: "Test" });
  });

  it("should trigger handleMovieClick", () => {
    const setActiveMovieStub = jest.fn();
    (getAPIData as jest.Mock).mockResolvedValue({
      results: [],
    });
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [[movieMock], jest.fn()])
      .mockImplementationOnce(() => [movieMock, setActiveMovieStub])
      .mockImplementationOnce(() => [{ [movieMock.title]: true }, jest.fn()]);

    const component = create(<App />);

    component.root.findByType(MovieList).props.onMovieClick(movieMock);

    expect(setActiveMovieStub).toHaveBeenCalledWith(movieMock);
  });

  it("should trigger handleFavoriteIconClick", () => {
    const setFavoriteMoviesStub = jest.fn();
    (getAPIData as jest.Mock).mockResolvedValue({
      results: [],
    });
    (updateFavoriteMoviesConfig as jest.Mock).mockReturnValue({ Test: true });

    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [[movieMock], jest.fn()])
      .mockImplementationOnce(() => [movieMock, jest.fn()])
      .mockImplementationOnce(() => [
        { [movieMock.title]: true },
        setFavoriteMoviesStub,
      ]);

    const component = create(<App />);

    component.root.findByType(MovieDetails).props.onFavoriteIconClick("Test");

    expect(setFavoriteMoviesStub).toHaveBeenCalledWith({ Test: true });
  });
});
