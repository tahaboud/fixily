import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clientLogin } from "../../state/actions/authActions";

const AdminLogin = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>();

  const {
    isAuthenticated,
    data,
    errors: serverErrors,
    userIsLoading,
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && data && data.is_admin) {
      navigate("/admin");
    } else if (isAuthenticated && data && !data.is_admin) {
      navigate("/account");
    }
  }, [isAuthenticated, data, navigate]);

  const handleSignIn = () => {
    dispatch(clientLogin({ email, password }));
  };

  useEffect(() => {
    if (serverErrors && serverErrors.type === "validation_error") {
      setErrors({
        email: "incorrect_credentials",
        password: "incorrect_credentials",
      });
    }
  }, [serverErrors]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          width: "20em",
        }}
      >
        <Box>
          <Typography>{t("email")}</Typography>
          <TextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors && errors.email !== undefined}
            helperText={
              errors && errors.email !== undefined ? t(errors.email) : null
            }
          />
        </Box>
        <Box>
          <Typography>{t("password")}</Typography>
          <TextField
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            error={errors && errors.password !== undefined}
            helperText={
              errors && errors.password !== undefined
                ? t(errors.password)
                : null
            }
          />
        </Box>
        <Button
          onClick={handleSignIn}
          variant="contained"
          disabled={userIsLoading}
        >
          {t("login")}
        </Button>
      </Box>
    </Box>
  );
};

export default AdminLogin;
