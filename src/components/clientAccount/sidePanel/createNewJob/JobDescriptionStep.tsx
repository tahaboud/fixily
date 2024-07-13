import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { createRef, Dispatch, SetStateAction, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  SnackbarContext,
  SnackbarContextType,
} from "../../../common/SnackbarContext";

const JobDescriptionStep = ({
  setStep,
  description,
  setDescription,
  jobImages,
  setJobImages,
}: {
  setStep: Dispatch<SetStateAction<0 | 1 | 2 | 3 | 4>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  jobImages: Array<File> | null;
  setJobImages: Dispatch<SetStateAction<Array<File> | null>>;
}) => {
  const { t } = useTranslation();
  const inputRef = createRef<HTMLInputElement>();

  const { setSnack } = useContext<SnackbarContextType>(SnackbarContext);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          padding: "1em 0",
          height: "90%",
        }}
      >
        <Typography sx={{ fontWeight: 600, margin: "1em 0" }}>
          {t("describe_your_problem")}
        </Typography>
        <TextField
          multiline
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("describe_your_problem_placeholder")}
          sx={{
            borderRadius: "8px",
            backgroundColor: "#F5F7F8",
            width: "100%",
          }}
        />
        <Typography sx={{ fontWeight: 600, margin: "1em 0" }}>
          {t("add_job_images")}
        </Typography>
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          onChange={(e) => {
            if (e.target.files) {
              if (
                e.target.files.length > 5 ||
                (jobImages && jobImages.length + e.target.files.length > 5)
              ) {
                setSnack({
                  message: t("max_5_photos"),
                  color: "error",
                  open: true,
                  duration: 1000,
                });
              } else {
                setJobImages((current) => {
                  if (e.target.files) {
                    if (current) {
                      let images = [...current];
                      images = images.concat(Array.from(e.target.files));
                      return images;
                    } else {
                      return Array.from(e.target.files);
                    }
                  }
                  return null;
                });
              }
            }
          }}
        />
        {jobImages === null || jobImages.length < 5 ? (
          <>
            <Button
              sx={{
                width: "100%",
                color: "#FFFFFF",
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor: "#447EEF",
                fontSize: "1.1rem",
                "&:hover": { backgroundColor: "#3471eb" },
              }}
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              {t("upload_your_images")}
            </Button>
            <Typography sx={{ color: "#2C3E5080" }}>
              {t("max_5_photos")}
            </Typography>
          </>
        ) : null}
        {jobImages && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1em",
              flexWrap: "wrap",
              margin: "1em 0",
            }}
          >
            {jobImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  height: "5em",
                  width: "5em",
                  borderRadius: "8px",
                  backgroundImage: `url(${URL.createObjectURL(image)})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    margin: 0,
                    padding: 0,
                    transform: "translate(50%,-50%)",
                  }}
                  onClick={() => {
                    setJobImages((current) => {
                      if (current) {
                        const images = [...current];
                        images.splice(index);
                        return images;
                      }
                      return null;
                    });
                  }}
                >
                  <CancelIcon sx={{ color: "#FC4848" }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <IconButton
          sx={{
            backgroundColor: "#2C3E50",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#283849" },
          }}
          onClick={() => setStep(1)}
        >
          <KeyboardArrowLeftIcon sx={{ color: "#FFFFFF" }} />
        </IconButton>
        <Button
          sx={{
            backgroundColor: "#F1C40F",
            borderRadius: "8px",
            textTransform: "none",
            color: "#000000",
            width: "100%",
            "&:hover": {
              backgroundColor: "#d8b011",
            },
          }}
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          onClick={() => setStep(3)}
        >
          {t("next")}
        </Button>
      </Box>
    </Box>
  );
};

export default JobDescriptionStep;
