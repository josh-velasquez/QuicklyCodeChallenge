import { render } from "@testing-library/react";
import Profile from "../src/pages/Profile";

jest.mock("axios");
describe("Profile component", () => {
  test("renders component", () => {
    const { container } = render(<Profile />);
    expect(container).toBeInTheDocument();
  });
});
