import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FacebookIcon, GoogleIcon } from "../../assets/Icons";
import clientImage from "../../assets/client.png";

import EmailIcon from "@mui/icons-material/Email";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  clientLogin,
  requestStateCode,
  socialLogin,
} from "../../state/actions/authActions";
import { validateClientLogin } from "../../validators/clientLogin";
import { ClientLoginValidationErrors } from "../../validators/types";
import { generateSocialLoginUrl } from "../utils";

const ClientLogin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isAuthenticated,
    detail,
    errors: serverErrors,
    userIsLoading,
  } = useAppSelector((state) => state.auth);
  const [waitingForStateCode, setWaitingForStateCode] = useState(false);
  const [loginProvider, setLoginProvider] = useState<
    "facebook" | "google" | null
  >(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ClientLoginValidationErrors | null>(
    null
  );
  const handleSocialLogin = ({
    provider,
  }: {
    provider: "facebook" | "google";
  }) => {
    setWaitingForStateCode(true);
    setLoginProvider(provider);
    dispatch(requestStateCode({ provider }));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
    if (waitingForStateCode && detail && detail.state_code && loginProvider) {
      location.href = generateSocialLoginUrl(loginProvider, detail.state_code);
    }
  }, [detail, isAuthenticated, navigate, loginProvider, waitingForStateCode]);
  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (code && state) {
      setSearchParams();
      dispatch(socialLogin({ stateCode: state, code }));
    }
    setErrors(null);
  }, [dispatch, searchParams, setSearchParams]);
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
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          height: "100%",
          width: {
            xl: "75%",
            lg: "60%",
            md: "50%",
            sm: "0%",
          },
          backgroundImage: `url(${clientImage})`,
          backgroundSize: "cover",
          backgroundPositionY: "50%",
          backgroundPositionX: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Box
          sx={{
            background: "#447EEF80",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
      <Box
        sx={{
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
              Votre adresse email
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
              Votre mot de passe
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
          <Typography
            component={"a"}
            href={"/forget-password/client"}
            sx={{ color: "#447EEF", textDecoration: "none" }}
          >
            {t("J'ai oublié mon mot de passe")}
          </Typography>
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
          <Typography sx={{ width: "100%", textAlign: "center" }}>
            {t("Ou bien")}
          </Typography>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "#447EEF",
              borderColor: "#447EEF",
              letterSpacing: "0.03em",
              fontSize: "1rem",
            }}
            startIcon={<GoogleIcon />}
            fullWidth
            disabled={userIsLoading}
            onClick={() => handleSocialLogin({ provider: "google" })}
          >
            {t("Continuer avec Google")}
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              color: "#447EEF",
              borderColor: "#447EEF",
              letterSpacing: "0.03em",
            }}
            startIcon={<FacebookIcon />}
            fullWidth
            disabled={userIsLoading}
            onClick={() => handleSocialLogin({ provider: "facebook" })}
          >
            {t("Continuer avec Facebook")}
          </Button>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ textAlign: "center", width: "100%" }}>
              {t("Vous n'avez pas un compte?")}
            </Typography>
            <Typography
              component="a"
              href="/register/client"
              sx={{
                width: "100%",
                display: "block",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              {t("Créer un compte")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientLogin;
