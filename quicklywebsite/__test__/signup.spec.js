import { render } from "@testing-library/react";
import SignUpPage from "../src/pages/SignUpPage";

jest.mock("axios");
describe("SignUpPage component", () => {
  test("renders component", () => {
    const { container } = render(<SignUpPage />);
    expect(container).toBeInTheDocument();
  });
});
