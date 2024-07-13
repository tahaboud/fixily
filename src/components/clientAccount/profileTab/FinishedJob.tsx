import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { CompletedJobIcon } from "../../../assets/Icons";
import { Job } from "../../../types";

const FinishedJob = ({
  job,
  setSidePanelOpen,
  setSidePanelTitle,
  setSelectedJob,
}: {
  job: Job;
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
  setSidePanelTitle: Dispatch<SetStateAction<string>>;
  setSelectedJob: Dispatch<SetStateAction<Job | null>>;
}) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1em",
        cursor: "pointer",
        padding: "1em",
        "&:hover": { backgroundColor: "#ebebeb" },
      }}
      onClick={() => {
        setSidePanelOpen(true);
        setSidePanelTitle("completed_job");
        setSelectedJob(job);
      }}
    >
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
      <Box sx={{ flex: 1 }}>
        <Typography fontWeight={600}>{job.sub_category.name_en}</Typography>
        <Typography sx={{ color: "#2C3E5080" }}>
          {t("job_completed")}
        </Typography>
      </Box>
      <KeyboardArrowRightIcon />
    </Box>
  );
};

export default FinishedJob;
