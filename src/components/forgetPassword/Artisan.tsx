import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import artisanImage from "../../assets/artisan.webp";
import logoImage from "../../assets/logo.webp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  checkResetPasswordOTP,
  requestResetPassword,
  resetPassword,
} from "../../state/actions/authActions";
import { ActionEnums } from "../../state/types/actionEnums";
import {
  validateArtisanForgetPassword,
  validateArtisanForgetPasswordOTP,
  validateArtisanForgetPasswordResetPassword,
} from "../../validators/artisanForgotPassword";
import {
  ArtisanForgotPasswordOTPValidationErrors,
  ArtisanForgotPasswordResetPasswordValidationErrors,
  ArtisanForgotPasswordValidationErrors,
} from "../../validators/types";
import {
  SnackbarContext,
  SnackbarContextType,
} from "../common/SnackbarContext";

const Artisan = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    userIsLoading,
    detail,
    errors: serverErrors,
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { setSnack } = useContext<SnackbarContextType>(SnackbarContext);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<
    "phoneNumber" | "otp" | "resetPassword"
  >("phoneNumber");
  const [phoneNumber, setPhoneNumber] = useState("+213");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState<
    | (ArtisanForgotPasswordValidationErrors &
        ArtisanForgotPasswordOTPValidationErrors &
        ArtisanForgotPasswordResetPasswordValidationErrors)
    | null
  >(null);
  const handleArtisanForgotPassword = () => {
    const unmaskedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
    const { isValid, validationErrors } = validateArtisanForgetPassword({
      phoneNumber: unmaskedPhoneNumber,
    });
    if (isValid) {
      dispatch(requestResetPassword({ phoneNumber: unmaskedPhoneNumber }));
    } else {
      setErrors(validationErrors);
    }
  };
  const handleVerifyOTP = () => {
    const unmaskedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
    const { isValid, validationErrors } = validateArtisanForgetPasswordOTP({
      otp,
    });
    if (isValid) {
      dispatch(
        checkResetPasswordOTP({ phoneNumber: unmaskedPhoneNumber, otp })
      );
    } else {
      setErrors(validationErrors);
    }
  };
  const handleResetPassword = () => {
    const unmaskedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
    const { isValid, validationErrors } =
      validateArtisanForgetPasswordResetPassword({
        password,
        rePassword,
      });
    if (isValid) {
      dispatch(
        resetPassword({ phoneNumber: unmaskedPhoneNumber, otp, password })
      );
    } else {
      setErrors(validationErrors);
    }
  };
  useEffect(() => {
    if (detail && detail.detail) {
      if (
        detail.detail ===
        "A reset password SMS has been sent to the user associated with this SMS if it exists."
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
        navigate("/login/artisan");
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
          {forgotPasswordStep === "phoneNumber" ? (
            <>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ color: "#2C3E50", fontWeight: "500" }}>
                  {t("Votre numero de telephone")}
                </Typography>
                <InputMask
                  mask="+213  999999999"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setErrors(null);
                  }}
                  maskChar={" "}
                  children={
                    <TextField
                      type="tel"
                      error={
                        errors !== null && errors.phoneNumber !== undefined
                      }
                      helperText={
                        errors !== null && errors.phoneNumber !== undefined
                          ? t(errors.phoneNumber)
                          : null
                      }
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <PhoneEnabledIcon
                            sx={{ color: "#909AA4", margin: "0 0.5em 0 0" }}
                          />
                        ),
                        sx: {
                          borderRadius: "8px",
                          backgroundColor: "#F5F7F8",
                        },
                      }}
                    />
                  }
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
                onClick={handleArtisanForgotPassword}
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
                    "Nous avons vous envoyé un code de verification au numéro suivant:"
                  )}
                </Typography>
                <Typography sx={{ textAlign: "center", margin: "0 0 1em 0" }}>
                  {phoneNumber}
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
        <Box
          sx={{
            width: {
              xl: "75%",
              lg: "60%",
              md: "50%",
              sm: "0%",
            },
            height: "100%",
            backgroundImage: `url(${artisanImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#F1C40F80",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Artisan;
