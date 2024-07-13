import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Job } from "../../../types";
import NearbyJobComponent from "./NearbyJobComponent";

const NearbyJobs = ({
  jobs,
  setSelectedJob,
  setSidePanelTitle,
}: {
  jobs: Array<Job> | null;
  setSelectedJob: Dispatch<SetStateAction<Job | null>>;
  setSidePanelTitle: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  return jobs && jobs.length !== 0 ? (
    <Box>
      {jobs.map((job) => (
        <NearbyJobComponent
          key={job.id}
          job={job}
          setSelectedJob={setSelectedJob}
          setSidePanelTitle={setSidePanelTitle}
        />
      ))}
    </Box>
  ) : (
    <Box
      sx={{
        height: "calc(100vh - 5em)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
        {t("no_nearby_jobs")}
      </Typography>
    </Box>
  );
};

export default NearbyJobs;
