import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpPage from "../src/pages/SignUpPage";

jest.mock("axios");
describe("SignUpPage component", () => {
  test("renders component", () => {
    const { container } = render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
