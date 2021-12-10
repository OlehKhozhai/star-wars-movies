import { create } from "react-test-renderer";

import { movieMock } from "utils/mock";
import MovieItem from "./MovieItem";

describe("MovieItem component", () => {
  it("should render by default", () => {
    const component = create(
      <MovieItem
        {...movieMock}
        isActive={false}
        isFavorite={false}
        onMovieClick={() => undefined}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render active movie", () => {
    const component = create(
      <MovieItem
        {...movieMock}
        isActive={true}
        isFavorite={false}
        onMovieClick={() => undefined}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render favorite and active movie", () => {
    const component = create(
      <MovieItem
        {...movieMock}
        isActive={true}
        isFavorite={true}
        onMovieClick={() => undefined}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should trigger onMovieClick function", () => {
    const onMovieClickStub = jest.fn();
    const component = create(
      <MovieItem
        {...movieMock}
        isActive={true}
        isFavorite={true}
        onMovieClick={onMovieClickStub}
      />
    );

    component.root.findByType("li").props.onClick();

    expect(onMovieClickStub).toHaveBeenCalledWith(movieMock);
  });
});
