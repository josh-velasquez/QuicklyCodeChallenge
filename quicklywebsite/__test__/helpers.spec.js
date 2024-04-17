import { isValidEmail, isValidPassword } from "../src/helpers/validation";

describe("validation", () => {
  test("returns true if the email is valid formatting", () => {
    const email = "test@email.com";
    const confirmEmail = "test@email.com";
    const valid = isValidEmail(email, confirmEmail);
    expect(valid).toBeTruthy();
  });
  test("returns false if the emails don't match", () => {
    const email = "test@email.com";
    const confirmEmail = "test1@email.com";
    const valid = isValidEmail(email, confirmEmail);
    expect(valid).toBeFalsy();
  });
  test("returns true if the password valid", () => {
    const password = "password1";
    const confirmPassword = "password1";
    const valid = isValidPassword(password, confirmPassword);
    expect(valid).toBeTruthy();
  });
  test("returns false if the passwords don't match", () => {
    const password = "password";
    const confirmPassword = "password1";
    const valid = isValidPassword(password, confirmPassword);
    expect(valid).toBeFalsy();
  });
  test("returns false if the password is less than 6 characters", () => {
    const password = "passw";
    const confirmPassword = "passw";
    const valid = isValidPassword(password, confirmPassword);
    expect(valid).toBeFalsy();
  });
});
