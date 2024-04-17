import { render } from "@testing-library/react";
import Profile from "../src/pages/Profile";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");
describe("Profile component", () => {
  test("renders component", () => {
    const { container } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
