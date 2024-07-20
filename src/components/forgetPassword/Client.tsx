import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import clientImage from "../../assets/client.webp";
import logoImage from "../../assets/logo.webp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  checkResetPasswordOTP,
  requestResetPassword,
  resetPassword,
} from "../../state/actions/authActions";
import { ActionEnums } from "../../state/types/actionEnums";
import {
  validateClientForgetPassword,
  validateClientForgetPasswordOTP,
  validateClientForgetPasswordResetPassword,
} from "../../validators/clientForgotPassword";
import {
  ClientForgotPasswordOTPValidationErrors,
  ClientForgotPasswordResetPasswordValidationErrors,
  ClientForgotPasswordValidationErrors,
} from "../../validators/types";
import {
  SnackbarContext,
  SnackbarContextType,
} from "../common/SnackbarContext";

const Client = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSnack } = useContext<SnackbarContextType>(SnackbarContext);
  const {
    userIsLoading,
    detail,
    errors: serverErrors,
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [forgotPasswordStep, setForgotPasswordStep] = useState<
    "email" | "otp" | "resetPassword"
  >("email");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState<
    | (ClientForgotPasswordValidationErrors &
        ClientForgotPasswordOTPValidationErrors &
        ClientForgotPasswordResetPasswordValidationErrors)
    | null
  >(null);
  const handleClientForgotPassword = () => {
    const { isValid, validationErrors } = validateClientForgetPassword({
      email,
    });
    if (isValid) {
      dispatch(requestResetPassword({ email }));
    } else {
      setErrors(validationErrors);
    }
  };
  const handleVerifyOTP = () => {
    const { isValid, validationErrors } = validateClientForgetPasswordOTP({
      otp,
    });
    if (isValid) {
      dispatch(checkResetPasswordOTP({ email, otp }));
    } else {
      setErrors(validationErrors);
    }
  };
  const handleResetPassword = () => {
    const { isValid, validationErrors } =
      validateClientForgetPasswordResetPassword({
        password,
        rePassword,
      });
    if (isValid) {
      dispatch(resetPassword({ email, otp, password }));
    } else {
      setErrors(validationErrors);
    }
  };
  useEffect(() => {
    if (detail && detail.detail) {
      console.log(detail);

      if (
        detail.detail ===
        "A reset password Email has been sent to the user associated with this Email if it exists."
      ) {
        dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
        setForgotPasswordStep("otp");
      } else if (detail.detail === "Valid code.") {
        dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
        setForgotPasswordStep("resetPassword");
      } else if (detail.detail === "Password has been changed successfully.") {
        dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
        setSnack({
          message: t("password_reset_success"),
          color: "success",
          open: true,
          duration: 3000,
        });
        navigate("/login/client");
      }
    }

    if (serverErrors && serverErrors.type === "validation_error") {
      setErrors({ otp: "invalid_otp" });
    }
  }, [detail, navigate, serverErrors, dispatch, setSnack, t]);
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            width: {
              xl: "75%",
              lg: "60%",
              md: "50%",
              sm: "0%",
            },
            height: "100%",
            backgroundImage: `url(${clientImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPositionY: "50%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#447EEF80 ",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1em",
            padding: "1em",
          }}
        >
          <img src={logoImage} alt="Fixily" style={{ margin: "1em 0" }} />
          {forgotPasswordStep === "email" ? (
            <>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ color: "#2C3E50", fontWeight: "500" }}>
                  {t("Votre adresse email")}
                </Typography>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <EmailIcon
                        sx={{ color: "#909AA4", margin: "0 0.5em 0 0" }}
                      />
                    ),
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: "#F5F7F8",
                    },
                  }}
                  value={email}
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors(null);
                  }}
                  fullWidth
                  error={errors !== null && errors.email !== undefined}
                  helperText={
                    errors && errors.email !== undefined
                      ? t(errors.email)
                      : null
                  }
                  placeholder="Email"
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
                onClick={handleClientForgotPassword}
                fullWidth
              >
                {t("Continuer")}
              </Button>
            </>
          ) : forgotPasswordStep === "otp" ? (
            <>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ textAlign: "center" }}>
                  {t(
                    "Nous avons vous envoyé un code de verification au email suivant:"
                  )}
                </Typography>
                <Typography sx={{ textAlign: "center", margin: "0 0 1em 0" }}>
                  {email}
                </Typography>
                <Typography sx={{ color: "#2C3E50", fontWeight: "500" }}>
                  {t("Code de verification")}
                </Typography>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <EmailIcon
                        sx={{ color: "#909AA4", margin: "0 0.5em 0 0" }}
                      />
                    ),
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: "#F5F7F8",
                    },
                  }}
                  value={otp}
                  type="text"
                  onChange={(e) => {
                    setOTP(e.target.value);
                    setErrors(null);
                  }}
                  fullWidth
                  error={errors !== null && errors.otp !== undefined}
                  helperText={
                    errors && errors.otp !== undefined ? t(errors.otp) : null
                  }
                  placeholder="* * * * * *"
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
                onClick={handleVerifyOTP}
                fullWidth
              >
                {t("Continuer")}
              </Button>
            </>
          ) : (
            <>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ color: "#2C3E50", fontWeight: "500" }}>
                  {t("Nouveau mot de passe")}
                </Typography>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <LockIcon
                        sx={{ color: "#909AA4", margin: "0 0.5em 0 0" }}
                      />
                    ),
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: "#F5F7F8",
                    },
                  }}
                  value={password}
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors(null);
                  }}
                  fullWidth
                  error={errors !== null && errors.password !== undefined}
                  helperText={
                    errors && errors.password !== undefined
                      ? t(errors.password)
                      : null
                  }
                  placeholder="****************"
                  variant="outlined"
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ color: "#2C3E50", fontWeight: "500" }}>
                  {t("Confirmer le nouveau mot de passe")}
                </Typography>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <LockIcon
                        sx={{ color: "#909AA4", margin: "0 0.5em 0 0" }}
                      />
                    ),
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: "#F5F7F8",
                    },
                  }}
                  value={rePassword}
                  type="password"
                  onChange={(e) => {
                    setRePassword(e.target.value);
                    setErrors(null);
                  }}
                  fullWidth
                  error={errors !== null && errors.rePassword !== undefined}
                  helperText={
                    errors && errors.rePassword !== undefined
                      ? t(errors.rePassword)
                      : null
                  }
                  placeholder="****************"
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
                onClick={handleResetPassword}
                fullWidth
              >
                {t("Continuer")}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Client;
