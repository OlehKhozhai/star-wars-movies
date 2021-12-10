import { create } from "react-test-renderer";

import { StarIcon } from "../StarIcon";

describe("StarIcon component", () => {
  it("should render by default", () => {
    const component = create(<StarIcon />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render with props properly", () => {
    const component = create(<StarIcon fill="green" className="test" />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
