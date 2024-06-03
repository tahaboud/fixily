import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  Button,
  Container,
  IconButton,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUser } from "../../state/actions/authActions";
import { CustomConnector, CustomStepIcon } from "./CustomStepper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const Body = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [bio, setBio] = useState("");
  const { token, userIsLoading } = useAppSelector((state) => state.auth);
  const [image, setImage] = useState<File | null>(null);
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleNext = () => {
    switch (step) {
      case 0:
        if (token) {
          if (image) {
            setUploading(true);
            dispatch(
              updateUser({
                token,
                picture: image,
                setUploading,
                setUploadProgress,
              })
            );
          } else {
            setStep(1);
          }
        }
        break;
      case 1:
        if (token) {
          dispatch(updateUser({ token, bio }));
        }
        setStep(2);
        break;
      case 2:
        navigate("/");
        break;
      default:
        break;
    }
  };
  const handleBack = () => {
    switch (step) {
      case 1:
        setStep(0);
        break;
      case 2:
        setStep(1);
        break;
    }
  };
  const getCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <Step1
            image={image}
            setImage={setImage}
            uploadProgress={uploadProgress}
            uploading={uploading}
          />
        );
      case 1:
        return (
          <Step2
            bio={bio}
            setBio={setBio}
            uploading={uploading}
            setUploading={setUploading}
            uploadProgress={uploadProgress}
            setUploadProgress={setUploadProgress}
          />
        );
      case 2:
        return <Step3 />;

      default:
        return (
          <Step1
            image={image}
            setImage={setImage}
            uploadProgress={uploadProgress}
            uploading={uploading}
          />
        );
    }
  };
  useEffect(() => {
    if (uploading === false && uploadProgress === 100) {
      if (step === 0) {
        setUploadProgress(0);
        setImage(null);
        setStep(1);
      }
    }
  }, [uploading, uploadProgress, setUploadProgress, setStep, step]);
  return (
    <Box sx={{ height: "80vh", backgroundColor: "#FFFFFF" }}>
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2em",
            position: "relative",
            height: "100%",
          }}
        >
          <Stepper
            alternativeLabel
            activeStep={step}
            connector={<CustomConnector />}
            sx={{ width: "30em" }}
          >
            <Step>
              <StepLabel StepIconComponent={CustomStepIcon} />
            </Step>
            <Step>
              <StepLabel StepIconComponent={CustomStepIcon} />
            </Step>
            <Step>
              <StepLabel StepIconComponent={CustomStepIcon} />
            </Step>
          </Stepper>
          <Box sx={{ width: "100%" }}>{getCurrentStep()}</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          >
            {step !== 0 && (
              <IconButton
                sx={{
                  backgroundColor: "#2C3E50",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#273644" },
                }}
                onClick={handleBack}
                disabled={userIsLoading}
              >
                <ArrowBackIosNewIcon sx={{ color: "#FFFFFF" }} />
              </IconButton>
            )}
            <Box />
            <Button
              endIcon={<ArrowForwardIosIcon />}
              sx={{
                borderRadius: "8px",
                backgroundColor: "#F1C40F",
                color: "#2C3E50",
                textTransform: "none",
                padding: "0.5em 2em",
                "&:hover": {
                  backgroundColor: "#e4b90f",
                },
              }}
              onClick={handleNext}
              disabled={userIsLoading}
            >
              {step === 2 ? t("Ignorer pour l'instant") : t("Suivant")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Body;
