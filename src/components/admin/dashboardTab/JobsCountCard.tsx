import styled from "@emotion/styled";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Typography } from "@mui/material";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Job } from "../../../types";

const JobsCountCard = ({
  jobs,
  setCurrentTab,
}: {
  jobs: Array<Job> | null;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { t } = useTranslation();

  const [data, setData] = useState<
    Array<{ label: string; value: number; color: string }>
  >([]);

  useEffect(() => {
    if (jobs) {
      setData([
        {
          label: t("archived_jobs"),
          value: jobs.filter((job) => job.is_done === true).length,
          color: "#34495E",
        },
        {
          label: t("open_jobs"),
          value: jobs.filter((job) => job.artisan === null).length,
          color: "#1ABC9C",
        },
        {
          label: t("matched_jobs"),
          value: jobs.filter(
            (job) => job.artisan !== null && job.is_done === false
          ).length,
          color: "#447EEF",
        },
      ]);
    }
  }, [jobs, setData, t]);

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "1em",
        height: "50%",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0px 4px 8px 0px #00000017",
        flex: 1,
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
      onClick={() => setCurrentTab(2)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
          {t("jobs")}
        </Typography>
        <ChevronRightIcon sx={{ color: "#2C3E5080" }} />
      </Box>
      <PieChart
        series={[
          {
            arcLabelRadius: 80,
            cornerRadius: 80,
            innerRadius: 60,
            outerRadius: 80,
            paddingAngle: -10,
            data,
          },
        ]}
        margin={{ right: 5 }}
        width={200}
        height={100}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      >
        <PieCenterLabel>{jobs ? jobs.length : 0}</PieCenterLabel>
      </PieChart>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1em",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <Box
            sx={{
              height: "1em",
              width: "1em",
              borderRadius: "50%",
              backgroundColor: "#1ABC9C",
            }}
          />
          <Typography>{t("open_jobs")}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <Box
            sx={{
              height: "1em",
              width: "1em",
              borderRadius: "50%",
              backgroundColor: "#447EEF",
            }}
          />
          <Typography>{t("matched_jobs")}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <Box
            sx={{
              height: "1em",
              width: "1em",
              borderRadius: "50%",
              backgroundColor: "#34495E",
            }}
          />
          <Typography>{t("archived_jobs")}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

// eslint-disable-next-line no-empty-pattern
const StyledText = styled("text")(({}) => ({
  fill: "#000000",
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: "1.2rem",
}));

const PieCenterLabel = ({ children }: { children: React.ReactNode }) => {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
};

export default JobsCountCard;
