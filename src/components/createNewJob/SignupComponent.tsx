import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logoImage from "../../assets/logo.webp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { registerClient } from "../../state/actions/authActions";
import { validateClientSignUp } from "../../validators/clientSignUp";
import { ClientSignUpValidationErrors } from "../../validators/types";

const SignupComponent = ({
  setLoginComponent,
  handleCreateJob,
}: {
  setLoginComponent: React.Dispatch<React.SetStateAction<"login" | "register">>;
  handleCreateJob: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ClientSignUpValidationErrors | null>(
    null
  );

  const {
    userIsLoading,
    errors: serverErrors,
    isAuthenticated,
  } = useAppSelector((state) => state.auth);

  const handleClientSignUp = () => {
    const { isValid, validationErrors } = validateClientSignUp({
      password,
      email,
      firstName,
      lastName,
      rePassword,
    });
    if (isValid) {
      dispatch(registerClient({ email, password, firstName, lastName }));
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (serverErrors && serverErrors.type === "validation_error") {
      setErrors({ email: "email_already_in_use" });
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
        justifyContent: "center",
        alignItems: "center",
        gap: "1em",
        padding: "2em",
        flex: 1,
      }}
    >
      <img src={logoImage} alt="Fixily" style={{ margin: "1em 0" }} />
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
          {t("your_password")}
        </Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <LockIcon sx={{ color: "#909AA4", margin: "0 0.5em 0 0" }} />
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
            errors && errors.password !== undefined ? t(errors.password) : null
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
              <LockIcon sx={{ color: "#909AA4", margin: "0 0.5em 0 0" }} />
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
        onClick={handleClientSignUp}
      >
        {t("Creer un compte")}
      </Button>
      <Box sx={{ width: "100%" }}>
        <Typography sx={{ textAlign: "center", width: "100%" }}>
          {t("Vous avez deja un compte?")}
        </Typography>
        <Typography
          component="a"
          onClick={() => setLoginComponent("login")}
          sx={{
            width: "100%",
            display: "block",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          {t("Se connecter")}
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupComponent;
