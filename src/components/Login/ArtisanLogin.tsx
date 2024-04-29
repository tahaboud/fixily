import { Box, Button, TextField, Typography } from "@mui/material";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAppSelector } from "../../hooks";

const ArtisanLogin = () => {
  const navigate = useNavigate();
  const recaptchaVerifierRef = useRef<RecaptchaVerifier>();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [step, setStep] = useState<"phoneNumber" | "code">("phoneNumber");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSignInSubmit = () => {
    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.verify().then(() =>
        signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifierRef.current as RecaptchaVerifier
        )
          .then((confirmationResult) => {
            setStep("code");
            setConfirmationResult(confirmationResult);
          })
          .catch(() => {
            // Error; SMS not sent
            // ...
          })
      );
    }
  };
  useEffect(() => {
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      auth,
      "sign-in-button",
      {
        size: "invisible",
      }
    );
  }, []);
  const handleConfirmCode = () => {
    if (confirmationResult) {
      confirmationResult
        .confirm(code)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  return (
    <Box>
      <Typography>Artisan Sign In</Typography>
      {step === "phoneNumber" ? (
        <TextField
          fullWidth
          type="text"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          placeholder="Phone Number ..."
        />
      ) : (
        <TextField
          fullWidth
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          placeholder="Code ..."
        />
      )}
      {step === "phoneNumber" ? (
        <Button
          id="sign-in-button"
          onClick={() => onSignInSubmit()}
          variant="contained"
        >
          Sign In with phone number
        </Button>
      ) : (
        <Button onClick={handleConfirmCode}>Confirm code</Button>
      )}
    </Box>
  );
};

export default ArtisanLogin;
