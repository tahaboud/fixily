import { Box, styled, Typography } from "@mui/material";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { PieChart } from "@mui/x-charts/PieChart";
import React from "react";
import { useTranslation } from "react-i18next";
import { Job } from "../../../types";

const TasksPostedCount = ({ jobs }: { jobs: Array<Job> | null }) => {
  const { t } = useTranslation();

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
        {t("jobs_posted")}
      </Typography>
      <PieChart
        series={[
          {
            arcLabelRadius: 80,
            cornerRadius: 80,
            innerRadius: 60,
            outerRadius: 80,
            paddingAngle: -10,
            data: [
              {
                label: t("jobs"),
                value: jobs ? jobs.length : 0,
                color: "#34495E",
              },
            ],
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
    </Box>
  );
};

// eslint-disable-next-line no-empty-pattern
const StyledText = styled("text")(({}) => ({
  fill: "#000000",
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: "2rem",
  fontWeight: 600,
}));

const PieCenterLabel = ({ children }: { children: React.ReactNode }) => {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
};

export default TasksPostedCount;
