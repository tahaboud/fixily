import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Job } from "../../../types";
import { calculateAverageDuration } from "../utils";

const AverageTimeOfJobCompletion = ({ jobs }: { jobs: Array<Job> | null }) => {
  const { t } = useTranslation();

  const [durationValue, setDurationValue] = useState(0);
  const [durationUnit, setDurationUnit] = useState("mins");

  useEffect(() => {
    if (jobs) {
      const { duration, unit } = calculateAverageDuration(jobs);
      setDurationValue(duration);
      setDurationUnit(unit);
    }
  }, [jobs]);

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "1em",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 4px 8px 0px #00000017",
        flex: 1,
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
        {t("average_time_of_job_completion")}
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "baseline", gap: "0em", flex: 1 }}
      >
        <Typography sx={{ fontSize: "7rem", fontWeight: 600 }}>
          {durationValue}
        </Typography>
        <Typography sx={{ color: "#959EA7", fontSize: "1.5rem" }}>
          {t(durationUnit)}
        </Typography>
      </Box>
    </Box>
  );
};

export default AverageTimeOfJobCompletion;
