import { Box, Button, TextField, Typography } from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logoImage from "../../assets/logo.webp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clientLogin } from "../../state/actions/authActions";
import { validateClientLogin } from "../../validators/clientLogin";
import { ClientLoginValidationErrors } from "../../validators/types";

const LoginComponent = ({
  setLoginComponent,
  handleCreateJob,
}: {
  setLoginComponent: React.Dispatch<React.SetStateAction<"login" | "register">>;
  handleCreateJob: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    errors: serverErrors,
    userIsLoading,
    isAuthenticated,
  } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ClientLoginValidationErrors | null>(
    null
  );

  const handleEmailLogin = () => {
    const { isValid, validationErrors } = validateClientLogin({
      email,
      password,
    });
    if (isValid) {
      dispatch(clientLogin({ email, password }));
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (serverErrors && serverErrors.type === "validation_error") {
      setErrors({
        email: "incorrect_credentials",
        password: "incorrect_credentials",
      });
    }
  }, [serverErrors]);

  useEffect(() => {
    if (isAuthenticated) {
      handleCreateJob();
    }
  }, [isAuthenticated, handleCreateJob]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: "2em",
      }}
    >
      <img src={logoImage} alt="Fixily" style={{ margin: "1em 0" }} />
      <Typography
        sx={{
          color: "#2C3E50",
          fontSize: "1.2rem",
          fontWeight: "500",
        }}
      >
        {t("S'identifier")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".5em",
          alignItems: "center",
          width: "90%",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ color: "#2C3E50", fontWeight: "500" }}>
            {t("your_email")}
          </Typography>
          <TextField
            InputProps={{
              startAdornment: (
                <EmailIcon sx={{ color: "#909AA4", margin: "0 0.5em 0 0" }} />
              ),
              sx: {
                borderRadius: "8px",
                backgroundColor: "#F5F7F8",
              },
            }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(null);
            }}
            fullWidth
            placeholder="example@example.com"
            error={errors !== null && errors.email !== undefined}
            helperText={
              errors && errors.email !== undefined ? t(errors.email) : null
            }
            variant="outlined"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ color: "#2C3E50", fontWeight: "500" }}>
            {t("your_password")}
          </Typography>
          <TextField
            InputProps={{
              startAdornment: (
                <RemoveRedEyeIcon
                  sx={{ color: "#909AA4", margin: "0 0.5em 0 0" }}
                />
              ),
              sx: {
                borderRadius: "8px",
                backgroundColor: "#F5F7F8",
              },
            }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors(null);
            }}
            fullWidth
            type="password"
            error={errors !== null && errors.password !== undefined}
            helperText={
              errors && errors.password !== undefined
                ? t(errors.password)
                : null
            }
            placeholder="**************************"
            variant="outlined"
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#F1C40F",
            color: "#000000",
            letterSpacing: "0.03em",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#ddb411",
            },
          }}
          disabled={userIsLoading}
          onClick={handleEmailLogin}
          fullWidth
        >
          {t("Continuer")}
        </Button>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ textAlign: "center", width: "100%" }}>
            {t("Vous n'avez pas un compte?")}
          </Typography>
          <Typography
            component="a"
            onClick={() => setLoginComponent("register")}
            sx={{
              width: "100%",
              display: "block",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            {t("Créer un compte")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginComponent;
