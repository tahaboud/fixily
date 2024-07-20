import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DescriptionIcon from "@mui/icons-material/Description";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import artisanImage from "../../assets/artisan.webp";
import logoImage from "../../assets/logo.webp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  registerArtisan,
  sendOTP,
  verifyOTP,
} from "../../state/actions/authActions";
import { ActionEnums } from "../../state/types/actionEnums";
import {
  validateArtisanConfirmOTP,
  validateArtisanPhoneNumberSignup,
  validateArtisanSignUp,
} from "../../validators/artisanSignUp";
import {
  ArtisanConfirmOTPValidationErrors,
  ArtisanSignUpPhoneNumberValidationErrors,
  ArtisanSignUpValidationErrors,
} from "../../validators/types";
import {
  SnackbarContext,
  SnackbarContextType,
} from "../common/SnackbarContext";

const ArtisanSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const {
    isAuthenticated,
    userIsLoading,
    detail,
    errors: serverErrors,
  } = useAppSelector((state) => state.auth);

  const { setSnack } = useContext<SnackbarContextType>(SnackbarContext);

  const [registrationStep, setRegistrationStep] = useState<
    "userData" | "otp" | "phoneNumber"
  >("phoneNumber");
  const [otpInterval, setOtpInterval] = useState<NodeJS.Timeout | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("+213");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [businessRegisterNumber, setBusinessRegisterNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [isBusiness, setIsBusiness] = useState(false);
  const [otpCounter, setOtpCounter] = useState(0);
  const [errors, setErrors] = useState<
    | (ArtisanConfirmOTPValidationErrors &
        ArtisanSignUpValidationErrors &
        ArtisanSignUpPhoneNumberValidationErrors)
    | null
  >(null);

  useEffect(() => {
    if (isAuthenticated) {
      if (registrationStep === "userData") {
        navigate("/categories");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, navigate, registrationStep]);

  const handleArtisanSendOTP = () => {
    const unmaskedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
    const { isValid, validationErrors } = validateArtisanPhoneNumberSignup({
      phoneNumber: unmaskedPhoneNumber,
    });
    if (isValid) {
      dispatch(sendOTP({ phoneNumber: unmaskedPhoneNumber }));
    } else {
      setErrors(validationErrors);
    }
  };

  const handleConfirmOTP = () => {
    const { isValid, validationErrors } = validateArtisanConfirmOTP({ otp });
    if (isValid) {
      const unmaskedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      dispatch(verifyOTP({ phoneNumber: unmaskedPhoneNumber, code: otp }));
    } else {
      setErrors(validationErrors);
    }
  };

  const handleArtisanSignUp = () => {
    const unmaskedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
    const { isValid, validationErrors } = validateArtisanSignUp({
      password,
      rePassword,
      email,
      firstName,
      lastName,
      businessRegisterNumber: isBusiness ? businessRegisterNumber : undefined,
    });
    if (isValid) {
      dispatch(
        registerArtisan({
          email,
          password,
          firstName,
          lastName,
          phoneNumber: unmaskedPhoneNumber,
          code: otp,
        })
      );
    } else {
      setErrors(validationErrors);
    }
  };

  const handleResendOTP = () => {
    const unmaskedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
    dispatch(sendOTP({ phoneNumber: unmaskedPhoneNumber }));
  };

  useEffect(() => {
    if (serverErrors) {
      if (registrationStep === "phoneNumber") {
        if (
          serverErrors.type === "validation_error" &&
          serverErrors.errors[0].attr === "phone_number"
        ) {
          setErrors((currentErrors) => {
            return { ...currentErrors, phoneNumber: "phone_already_in_use" };
          });
        }
      } else if (registrationStep === "otp") {
        if (
          serverErrors.type === "validation_error" &&
          serverErrors.errors[0].attr === "code"
        ) {
          setErrors((currentErrors) => {
            return { ...currentErrors, otp: "invalid_otp" };
          });
        }
      } else if (registrationStep === "userData") {
        if (
          serverErrors.type === "validation_error" &&
          serverErrors.errors[0].attr === "email"
        ) {
          setErrors((currentErrors) => {
            return { ...currentErrors, email: "email_already_in_use" };
          });
        }
      }
    }
  }, [serverErrors, registrationStep]);

  useEffect(() => {
    if (detail) {
      if (
        registrationStep === "phoneNumber" &&
        detail.detail &&
        detail.detail.indexOf("OTP sent to") === 0
      ) {
        dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
        setRegistrationStep("otp");
        startCountdown();
      } else if (registrationStep === "otp" && detail.detail) {
        if (detail.detail.indexOf("OTP sent to") === 0) {
          dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
          setSnack({
            message: t("otp_resent"),
            color: "success",
            open: true,
            duration: 2000,
          });
          startCountdown();
        } else if (detail.detail === "Valid code.") {
          dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
          setRegistrationStep("userData");
        }
      }
    }
  }, [detail, dispatch, registrationStep, setSnack, t]);

  const startCountdown = () => {
    setOtpCounter(60);
    const localInterval = setInterval(() => {
      setOtpCounter((oldCounter) => oldCounter - 1);
    }, 1000) as NodeJS.Timeout;
    setOtpInterval(localInterval);
  };

  const handleBack = () => {
    setOtpCounter(0);
    if (otpInterval) {
      clearInterval(otpInterval);
    }
    if (registrationStep === "otp") {
      setPhoneNumber("+213");
      setRegistrationStep("phoneNumber");
    }
  };

  useEffect(() => {
    if (otpCounter === 0 && otpInterval) {
      clearInterval(otpInterval);
    }
  }, [otpCounter, otpInterval]);

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#FFFFFF" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2em",
          gap: "1em",
          flex: 1,
        }}
      >
        <img src={logoImage} alt="Fixily" style={{ margin: "1em 0" }} />
        {registrationStep === "userData" ? (
          <>
            <Typography
              sx={{
                color: "#2C3E50",
                fontSize: "1.2rem",
                fontWeight: "500",
              }}
            >
              {t("S'inscrire")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F8FAFA",
                width: "100%",
                gap: "1em",
                margin: "1em",
              }}
            >
              <Button
                variant={isBusiness ? "text" : "contained"}
                sx={{
                  color: isBusiness ? "#939CA6" : "#447EEF",
                  backgroundColor: isBusiness ? "transparent" : "#FFFFFF",
                  textTransform: "none",
                  fontSize: "1.2rem",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
                fullWidth
                onClick={() => setIsBusiness(false)}
                startIcon={
                  <PersonIcon
                    sx={{
                      color: isBusiness ? "#939CA6" : "#447EEF",
                      fontSize: "1.2rem",
                    }}
                  />
                }
              >
                {t("Particulier")}
              </Button>
              <Button
                variant={isBusiness ? "contained" : "text"}
                sx={{
                  color: isBusiness ? "#447EEF" : "#939CA6",
                  backgroundColor: isBusiness ? "#FFFFFF" : "transparent",
                  textTransform: "none",
                  fontSize: "1.2rem",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
                fullWidth
                onClick={() => setIsBusiness(true)}
                startIcon={
                  <GroupsIcon
                    sx={{
                      color: isBusiness ? "#447EEF" : "#939CA6",
                      fontSize: "1.2rem",
                    }}
                  />
                }
              >
                {t("Entreprise")}
              </Button>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "#2C3E50", fontWeight: "500" }}>
                {t("Votre nom et prenom")}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1em",
                }}
              >
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: "#F5F7F8",
                    },
                  }}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors(null);
                  }}
                  fullWidth
                  error={errors !== null && errors.firstName !== undefined}
                  helperText={
                    errors && errors.firstName !== undefined
                      ? t(errors.firstName)
                      : null
                  }
                  placeholder="Nom"
                  variant="outlined"
                />
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: "#F5F7F8",
                    },
                  }}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setErrors(null);
                  }}
                  fullWidth
                  error={errors !== null && errors.lastName !== undefined}
                  helperText={
                    errors && errors.lastName !== undefined
                      ? t(errors.lastName)
                      : null
                  }
                  placeholder="Prénom"
                  variant="outlined"
                />
              </Box>
            </Box>

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
                  errors && errors.email !== undefined ? t(errors.email) : null
                }
                placeholder="Email"
                variant="outlined"
              />
            </Box>
            {isBusiness ? (
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ color: "#2C3E50", fontWeight: "500" }}>
                  {t("Votre numero de registre de commerce")}
                </Typography>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <DescriptionIcon
                        sx={{ color: "#909AA4", margin: "0 0.5em 0 0" }}
                      />
                    ),
                    sx: {
                      borderRadius: "8px",
                      backgroundColor: "#F5F7F8",
                    },
                  }}
                  value={businessRegisterNumber}
                  type="text"
                  onChange={(e) => {
                    setBusinessRegisterNumber(e.target.value);
                    setErrors(null);
                  }}
                  fullWidth
                  error={
                    errors !== null &&
                    errors.businessRegisterNumber !== undefined
                  }
                  helperText={
                    errors && errors.businessRegisterNumber !== undefined
                      ? t(errors.businessRegisterNumber)
                      : null
                  }
                  placeholder="2213340987768"
                  variant="outlined"
                />
              </Box>
            ) : null}
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "#2C3E50", fontWeight: "500" }}>
                {t("Votre mot de passe")}
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
                placeholder="**************************"
                variant="outlined"
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "#2C3E50", fontWeight: "500" }}>
                {t("Confirmer votre mot de passe")}
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
              fullWidth
              onClick={handleArtisanSignUp}
            >
              {t("Creer un compte")}
            </Button>
            <Typography>{t("Vous avez deja un compte?")}</Typography>
            <Typography component="a" href="/login/artisan">
              {t("Se connecter")}
            </Typography>
          </>
        ) : registrationStep === "phoneNumber" ? (
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
                maskPlaceholder={" "}
                children={
                  <TextField
                    type="tel"
                    error={errors !== null && errors.phoneNumber !== undefined}
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
                margin: "0",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#ddb411",
                },
              }}
              disabled={userIsLoading}
              onClick={handleArtisanSendOTP}
            >
              {t("Continuer")}
            </Button>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1em",
            }}
          >
            <Typography sx={{ textAlign: "center", fontSize: "1.2rem" }}>
              {t("Vérifier votre compte")}
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              {t(
                "Nous avons vous envoyé un code de verification au numéro suivant:"
              )}
            </Typography>
            <Typography
              sx={{ textAlign: "center", fontSize: "1.1rem" }}
            >{`+${phoneNumber.replace(/\D/g, "")}`}</Typography>
            <Box sx={{ width: "100%" }}>
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
                placeholder="######"
                variant="outlined"
              />
            </Box>
            <Box
              sx={{
                margin: "1em 0 0 0",
                width: "100%",
                display: "flex",
                gap: "1em",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: "#000000",
                  borderRadius: "3px",
                  "&:hover": { backgroundColor: "#313131" },
                }}
                onClick={handleBack}
              >
                <ArrowBackIosNewIcon sx={{ color: "#FFFFFF" }} />
              </IconButton>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#F1C40F",
                  color: "#000000",
                  letterSpacing: "0.03em",
                  fontSize: "1rem",
                  margin: "0",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#ddb411",
                  },
                }}
                disabled={userIsLoading}
                onClick={handleConfirmOTP}
              >
                {t("Continuer")}
              </Button>
            </Box>
            {otpCounter !== 0 && (
              <Typography
                sx={{ width: "100%", textAlign: "end", color: "#959EA7" }}
              >
                {`${otpCounter}s`}
              </Typography>
            )}
            <Button
              sx={{ width: "100%", textTransform: "none", color: "#447EEF" }}
              variant="text"
              onClick={handleResendOTP}
              disabled={otpCounter !== 0 || userIsLoading}
            >
              {t("Renvoyer le code de verifcation")}
            </Button>
          </Box>
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
          background: `url(${artisanImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "20%",
          backgroundPositionX: "center",
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
  );
};

export default ArtisanSignUp;
