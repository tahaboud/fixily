import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../state/actions/authActions";

const ClientLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const signIn = ({
    provider,
  }: {
    provider: "email" | "google" | "facebook";
  }) => {
    dispatch(login({ email, password, provider }));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box>
      <Typography>Client Sign In</Typography>
      <TextField
        fullWidth
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((current) => {
            const currentErrors = { ...current };
            if (current && current.email) {
              delete currentErrors.email;
            }
            return currentErrors;
          });
        }}
        placeholder="Email..."
        error={errors !== null && errors.email !== undefined}
        helperText={errors && errors.email ? errors.email : null}
      />
      <TextField
        fullWidth
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors((current) => {
            const currentErrors = { ...current };
            if (current && current.password) {
              delete currentErrors.password;
            }
            return currentErrors;
          });
        }}
        placeholder="Password..."
        error={errors !== null && errors.password !== undefined}
        helperText={errors && errors.password ? errors.password : null}
      />
      <Button onClick={() => signIn({ provider: "email" })}>Sign In</Button>
      <Button onClick={() => signIn({ provider: "google" })}>
        Sign In with google
      </Button>
      <Button onClick={() => signIn({ provider: "facebook" })}>
        Sign In with facebook
      </Button>
    </Box>
  );
};

export default ClientLogin;
