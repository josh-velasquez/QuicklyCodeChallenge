import { render, fireEvent, waitFor, screen } from "@testing-library/react"; // Import screen directly

import LoginPage from "../src/pages/LoginPage";
import { BrowserRouter } from "react-router-dom";
jest.mock("../src/api", () => ({
  loginUser: jest.fn().mockResolvedValue({ success: true, token: "mockToken" }),
}));

describe("LoginPage component", () => {
  test("navigates to profile page when login button is pressed", async () => {
    const { container } = render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@user.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/profile");
    });
  });
});
