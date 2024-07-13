import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { deleteJob } from "../../../../state/actions/servicesAction";
import { Job } from "../../../../types";

const Body = ({
  job,
  setSidePanelOpen,
}: {
  job: Job;
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePreviousImage = () => {
    if (selectedImageIndex === 0) {
      setSelectedImageIndex(job.images.length - 1);
    } else {
      setSelectedImageIndex((current) => current - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex === job.images.length - 1) {
      setSelectedImageIndex(0);
    } else {
      setSelectedImageIndex((current) => current + 1);
    }
  };

  const handleDeleteJob = () => {
    if (token) {
      dispatch(deleteJob({ token, jobId: job.id }));
      setSidePanelOpen(false);
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 5em)",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        padding: "0 1em 1em 0",
      }}
    >
      <Typography sx={{ fontSize: "1.1rem" }}>
        {job.sub_category.name_en}
      </Typography>
      {job.images.length !== 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={handlePreviousImage}>
            <ChevronLeftIcon />
          </IconButton>
          <Box
            sx={{
              height: "10em",
              width: "7em",
              backgroundImage: `url(${
                import.meta.env.VITE_REACT_APP_IMAGE_URL
              }${job.images[selectedImageIndex].image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <IconButton onClick={handleNextImage}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          gap: "1em",
          alignItems: "center",
          flexWrap: "wrap",
          margin: "1em 0",
        }}
      >
        {job.images.map((image, index) => (
          <Box
            key={image.id}
            sx={{
              height: "5em",
              width: "5em",
              borderRadius: "8px",
              backgroundImage: `url(${
                import.meta.env.VITE_REACT_APP_IMAGE_URL
              }${image.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </Box>
      <Typography sx={{ color: "#2C3E5080" }}>{job.description}</Typography>
      <Box>
        <Typography sx={{ fontSize: "1.2rem" }}>{t("location")}</Typography>
        <Typography
          sx={{ color: "#2C3E5080" }}
        >{`${job.commune.name_en}, ${job.wilaya.name_en}`}</Typography>
      </Box>
      <Box sx={{ flex: 1 }} />
      {job.artisan === null && (
        <Button
          sx={{
            color: "#FFFFFF",
            textTransform: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            backgroundColor: "#FC4848",
            "&:hover": {
              backgroundColor: "#e24242",
            },
          }}
          fullWidth
          variant="contained"
          onClick={handleDeleteJob}
        >{`${t("delete_job")}`}</Button>
      )}
    </Box>
  );
};

export default Body;
