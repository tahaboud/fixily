import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IdVerifiedIcon } from "../../../assets/Icons";
import { Job } from "../../../types";

const JobDetails = ({ job }: { job: Job }) => {
  const { t } = useTranslation();

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
      <Box>
        <Typography sx={{ fontSize: "1.2rem" }}>{t("job_details")}</Typography>
        <Typography sx={{ color: "#2C3E5080" }}>{job.description}</Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: "1.2rem" }}>{t("location")}</Typography>
        <Typography
          sx={{ color: "#2C3E5080" }}
        >{`${job.commune.name_en}, ${job.wilaya.name_en}`}</Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {t("client_details")}
        </Typography>
        <Box sx={{ display: "flex", gap: "1em", alignItems: "center" }}>
          <Avatar
            src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${
              job.client.picture
            }`}
          />
          <Box>
            <Box sx={{ display: "flex", gap: "1em", alignItems: "center" }}>
              <Typography>{`${job.client.first_name} ${job.client.last_name}`}</Typography>
              {job.client.id_status === "verified" && <IdVerifiedIcon />}
            </Box>
            <Typography
              sx={{ color: "#2C3E5080" }}
            >{`${job.client.commune.name_en}, ${job.client.wilaya.name_en}`}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "0.5em",
            alignItems: "center",
            margin: "1em 0",
          }}
        >
          <IdVerifiedIcon />
          <Typography>{`${t("client_since")} ${Intl.DateTimeFormat(
            "fr-FR"
          ).format(new Date(job.client.created_at))}`}</Typography>
        </Box>
        {job.client.phone_number && (
          <Box
            sx={{
              display: "flex",
              gap: "0.5em",
              alignItems: "center",
              margin: "1em 0",
            }}
          >
            <PhoneEnabledIcon />
            <Typography>{job.client.phone_number}</Typography>
          </Box>
        )}
        {job.client.email && (
          <Box
            sx={{
              display: "flex",
              gap: "0.5em",
              alignItems: "center",
              margin: "1em 0",
            }}
          >
            <EmailIcon />
            <Typography>{job.client.email}</Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ flex: 1 }} />
      <Box>
        <Button
          sx={{
            color: "#34495E",
            textTransform: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            "&.Mui-disabled": {
              backgroundColor: "#F8E187",
            },
          }}
          disabled
          fullWidth
          variant="contained"
          endIcon={
            <Typography
              sx={{
                fontSize: "0.7rem !important",
                backgroundColor: "#D0DEFA",
                borderRadius: "100px",
                padding: "0.3em 0.5em",
              }}
            >{`${job.sub_category.point_cost} ${t("P")}`}</Typography>
          }
        >{`${t("make_an_offer")}`}</Button>
        <Typography
          sx={{ width: "100%", textAlign: "center", color: "#2C3E5080" }}
        >
          {t("open_in_app")}
        </Typography>
      </Box>
    </Box>
  );
};

export default JobDetails;
