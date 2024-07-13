import { Box, Rating, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IdVerifiedIcon } from "../../../assets/Icons";
import { PreviousJob } from "../../../types";

const PreviousJobComponent = ({ job }: { job: PreviousJob }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "space-between",
        gap: "1em",
      }}
    >
      <Typography sx={{ fontSize: "1.3rem" }}>
        {job.sub_category.name_en}
      </Typography>
      <Box sx={{ display: "flex", gap: "1em", alignItems: "center" }}>
        <Box
          sx={{
            height: "3em",
            width: "3em",
            borderRadius: "50%",
            backgroundImage: `url(${import.meta.env.VITE_REACT_APP_IMAGE_URL}${
              job.client.picture
            })`,
            backgroundSize: "cover",
            backgroundRepeat: "none",
          }}
        />
        <Typography>{`${job.client.first_name} ${job.client.last_name}`}</Typography>
        {job.client.id_status === "verified" && <IdVerifiedIcon />}
      </Box>
      {job.review && (
        <>
          <Typography sx={{ color: "#2C3E5080" }}>
            {job.review.description}
          </Typography>
          <Box sx={{ display: "flex", gap: "1em", alignItems: "center" }}>
            <Typography sx={{ fontSize: "1.1rem" }}>{t("rate")}</Typography>
            <Rating
              value={Number(job.review.review)}
              precision={0.5}
              readOnly
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default PreviousJobComponent;
