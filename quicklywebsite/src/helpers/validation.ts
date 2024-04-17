import validator from "validator";

export const isValidEmail = (email: string, confirmEmail: string): boolean => {
  return (
    validator.isEmail(email) &&
    validator.isEmail(confirmEmail) &&
    validator.equals(email, confirmEmail)
  );
};

export const isValidPassword = (
  password: string,
  confirmPassword: string
): boolean => {
  return (
    validator.equals(password, confirmPassword) &&
    validator.isLength(password, { min: 6 }) &&
    validator.isLength(confirmPassword, { min: 6 })
  );
};
