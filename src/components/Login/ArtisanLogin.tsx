import { Box, Button, TextField, Typography } from "@mui/material";

import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import artisanImage from "../../assets/artisan.png";
import logoImage from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { artisanLogin } from "../../state/actions/authActions";
import { validateArtisanLogin } from "../../validators/artisanLogin";
import { ArtisanLoginValidationErrors } from "../../validators/types";

const ArtisanLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    isAuthenticated,
    userIsLoading,
    errors: serverErrors,
  } = useAppSelector((state) => state.auth);
  const [phoneNumber, setPhoneNumber] = useState("+213");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ArtisanLoginValidationErrors | null>(
    null
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [isAuthenticated, navigate]);
  const handlePhoneNumberLogin = () => {
    const unmaskedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
    const { isValid, validationErrors } = validateArtisanLogin({
      phoneNumber: unmaskedPhoneNumber,
      password,
    });
    if (isValid) {
      dispatch(artisanLogin({ phoneNumber: unmaskedPhoneNumber, password }));
    } else {
      setErrors(validationErrors);
    }
  };
  useEffect(() => {
    if (serverErrors && serverErrors.type === "validation_error") {
      setErrors({
        phoneNumber: "incorrect_credentials",
        password: "incorrect_credentials",
      });
    }
  }, [serverErrors]);
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
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
        <Typography
          sx={{
            color: "#2C3E50",
            fontSize: "1.2rem",
            fontWeight: "500",
          }}
        >
          {t("S'identifier")}
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ color: "#2C3E50", fontWeight: "500" }}>
            {t("Votre numéro de téléphone")}
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
          href={"/forget-password/artisan"}
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
          onClick={handlePhoneNumberLogin}
          fullWidth
        >
          {t("Continuer")}
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "#447EEF",
            borderColor: "#447EEF",
            letterSpacing: "0.03em",
            fontSize: "1rem",
          }}
          disabled={userIsLoading}
          onClick={() => navigate("/register/artisan")}
          fullWidth
        >
          {t("Créer un compte")}
        </Button>
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

export default ArtisanLogin;
