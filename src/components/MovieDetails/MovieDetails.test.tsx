import { create } from "react-test-renderer";

import { movieMock } from "utils/mock";
import MovieDetails from "./MovieDetails";

describe("MovieDetails component", () => {
  it("should render by default", () => {
    const component = create(
      <MovieDetails
        {...movieMock}
        favoriteMoviesConfig={{}}
        onFavoriteIconClick={() => undefined}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render favorite movie", () => {
    const component = create(
      <MovieDetails
        {...movieMock}
        favoriteMoviesConfig={{ [movieMock.title]: true }}
        onFavoriteIconClick={() => undefined}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should trigger onFavoriteIconClick function", () => {
    const onFavoriteIconClickStub = jest.fn();
    const component = create(
      <MovieDetails
        {...movieMock}
        favoriteMoviesConfig={{}}
        onFavoriteIconClick={onFavoriteIconClickStub}
      />
    );

    component.root.findByType("span").props.onClick();

    expect(onFavoriteIconClickStub).toHaveBeenCalled();
  });
});
