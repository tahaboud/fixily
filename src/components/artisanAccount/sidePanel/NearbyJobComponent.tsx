import { Avatar, Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { IdVerifiedIcon } from "../../../assets/Icons";
import { Job } from "../../../types";

const NearbyJobComponent = ({
  job,
  setSelectedJob,
  setSidePanelTitle,
}: {
  job: Job;
  setSelectedJob: Dispatch<SetStateAction<Job | null>>;
  setSidePanelTitle: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "1em",
        padding: "1em",
        borderRadius: "18px",
        "&:hover": { backgroundColor: "#f1f1f1", cursor: "pointer" },
      }}
      onClick={() => {
        setSelectedJob(job);
        setSidePanelTitle("job_details");
      }}
    >
      <Box sx={{ display: "flex", gap: "1em", alignItems: "center" }}>
        <Avatar
          src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${
            job.client.picture
          }`}
        />
        <Typography
          sx={{ fontSize: "1.1rem" }}
        >{`${job.client.first_name} ${job.client.last_name}`}</Typography>
        {job.client.id_status === "verified" && <IdVerifiedIcon />}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography>{job.sub_category.name_en}</Typography>
          <Typography
            sx={{ color: "#2C3E5080", fontSize: "0.9rem" }}
          >{`${job.commune.name_en}, ${job.wilaya.name_en}`}</Typography>
        </Box>
        <Typography
          sx={{
            backgroundColor: "#447EEF21",
            borderRadius: "8px",
            padding: "2px 5px",
            color: "#447EEF",
          }}
        >{`${job.sub_category.point_cost} ${t("pts")}`}</Typography>
      </Box>
    </Box>
  );
};

export default NearbyJobComponent;
