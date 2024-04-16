import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { signup } from "../state/actions/authActions";

const Body = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const signUp = () => {
    dispatch(signup({ email, password }));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <Box>
      <TextField
        fullWidth
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email..."
        error={errors !== null && errors.email !== undefined}
        helperText={errors && errors.email ? errors.email : null}
      />
      <TextField
        fullWidth
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password..."
        error={errors !== null && errors.password !== undefined}
        helperText={errors && errors.password ? errors.password : null}
      />
      <TextField
        fullWidth
        type="password"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        placeholder="Retype password..."
        error={errors !== null && errors.rePassword !== undefined}
        helperText={errors && errors.rePassword ? errors.rePassword : null}
      />
      <Button variant="contained" onClick={signUp}>
        Sign up
      </Button>
    </Box>
  );
};

export default Body;
