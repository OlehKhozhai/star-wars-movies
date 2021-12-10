import { create } from "react-test-renderer";

import { movieMock } from "utils/mock";
import { Movie } from "utils/types";
import MovieList from "./MovieList";

jest.mock("./../MovieItem/MovieItem", () => ({
  __esModule: true,
  default: "<---MovieItem--->",
}));

describe("MovieList component", () => {
  it("should render by default", () => {
    const component = create(
      <MovieList
        movies={[]}
        activeMovie={{} as Movie}
        favoriteMoviesConfig={{}}
        onMovieClick={() => undefined}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render with movie properly", () => {
    const component = create(
      <MovieList
        movies={[movieMock]}
        activeMovie={movieMock}
        favoriteMoviesConfig={{}}
        onMovieClick={() => undefined}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
