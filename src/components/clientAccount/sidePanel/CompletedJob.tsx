import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { Avatar, Box, Rating, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CompletedJobIcon, IdVerifiedIcon } from "../../../assets/Icons";
import { Job } from "../../../types";

const CompletedJob = ({ job }: { job: Job }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ height: "calc(100vh - 5em)" }}>
      <Box sx={{ display: "flex", gap: "1em", alignItems: "center" }}>
        <Box
          sx={{
            borderRadius: "50%",
            backgroundColor: "#FBEDB7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5em",
          }}
        >
          <CompletedJobIcon />
        </Box>
        <Typography sx={{ color: "#F1C40F" }}>{t("job_completed")}</Typography>
      </Box>
      <Typography sx={{ fontWeight: 600, margin: "1em 0" }}>
        {t("details")}
      </Typography>
      <Typography sx={{ color: "#2C3E5080" }}>{job.description}</Typography>
      {job.images.length !== 0 && (
        <Box
          sx={{
            display: "flex",
            gap: "1em",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "1em 0",
          }}
        >
          {job.images.map((image) => (
            <Box
              sx={{
                height: "4em",
                width: "4em",
                borderRadius: "8px",
                backgroundImage: `url(${
                  import.meta.env.VITE_REACT_APP_IMAGE_URL
                }${image.image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
          ))}
        </Box>
      )}
      <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
        {t("location")}
      </Typography>
      <Typography
        sx={{ color: "#2C3E5080", margin: "1em 0" }}
      >{`${job.commune.name_en}, ${job.wilaya.name_en}`}</Typography>
      {job.artisan && (
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            {t("completed_by")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "1em",
              alignItems: "center",
              margin: "1em 0",
            }}
          >
            <Avatar
              src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${
                job.artisan.picture
              }`}
              sx={{ height: "3em", width: "3em" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
                <Typography
                  sx={{ fontSize: "1.2rem" }}
                >{`${job.artisan.first_name} ${job.artisan.last_name}`}</Typography>
                {job.artisan.id_status === "verified" && <IdVerifiedIcon />}
              </Box>
              <Typography
                sx={{ color: "#2C3E5080" }}
              >{`${job.artisan.commune.name_en}, ${job.artisan.wilaya.name_en}`}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
                <Rating
                  value={Number(job.artisan.review)}
                  readOnly
                  precision={0.5}
                />
                <Typography fontWeight={600}>{job.artisan.review}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <PhoneEnabledIcon />
            <Typography>{job.artisan.phone_number}</Typography>
          </Box>
        </Box>
      )}
      {job.review && (
        <Box>
          <Typography
            sx={{ fontWeight: 600, margin: "1em 0", fontSize: "1.1rem" }}
          >
            {t("your_opinion")}
          </Typography>
          <Typography sx={{ color: "#2C3E5080" }}>
            {job.review.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1em",
              justifyContent: "space-between",
              margin: "1em 0",
            }}
          >
            <Typography>{t("rate")}</Typography>
            <Rating
              value={Number(job.review.review)}
              readOnly
              precision={0.5}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CompletedJob;
