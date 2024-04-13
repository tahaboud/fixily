import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { login } from "../state/actions/authActions";

const Body = () => {
  const dispatch = useAppDispatch();
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
  return (
    <Container maxWidth="xl">
      <Box>
        <Typography>Sign In</Typography>
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
    </Container>
  );
};

export default Body;
