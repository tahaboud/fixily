export const authErrors = (
  error: string,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string> | null>>
) => {
  switch (error) {
    case "auth/invalid-credential":
      setErrors({
        email: "Invalid credentials.",
        password: "Invalid credentials.",
      });
      break;
    case "auth/invalid-email":
      setErrors({
        email: "Please input a valid email.",
      });
      break;
    case "auth/missing-password":
      setErrors({
        password: "Please enter a password.",
      });
      break;
    case "auth/email-already-in-use":
      setErrors({
        email: "This email is already associated with an account.",
      });
      break;

    default:
      break;
  }
};
