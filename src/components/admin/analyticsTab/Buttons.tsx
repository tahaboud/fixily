import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { CharArrowIcon } from "../../../assets/Icons";

const Buttons = ({
  selectedChart,
  setSelectedChart,
}: {
  selectedChart: "user_growth" | "task_fill_rate" | "user_retention";
  setSelectedChart: React.Dispatch<
    React.SetStateAction<"user_growth" | "task_fill_rate" | "user_retention">
  >;
}) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1em",
        margin: "1em 0",
      }}
    >
      <Box
        sx={{
          backgroundColor:
            selectedChart === "user_growth" ? "#447EEF" : "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0px 4px 8px 0px #00000017",
          cursor: "pointer",
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          height: "5em",
          alignItems: "center",
          padding: "1em",
          "&:hover": {
            backgroundColor: "#447EEF",
          },
        }}
        onClick={() => setSelectedChart("user_growth")}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: selectedChart === "user_growth" ? "#FFFFFF" : "#2C3E5080",
          }}
        >
          {t("user_growth")}
        </Typography>
        <CharArrowIcon
          sx={{
            color: selectedChart === "user_growth" ? "#FFFFFF" : "#2C3E5080",
          }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor:
            selectedChart === "task_fill_rate" ? "#447EEF" : "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0px 4px 8px 0px #00000017",
          cursor: "pointer",
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          height: "5em",
          alignItems: "center",
          padding: "1em",
          "&:hover": {
            backgroundColor: "#447EEF",
          },
        }}
        onClick={() => setSelectedChart("task_fill_rate")}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: selectedChart === "task_fill_rate" ? "#FFFFFF" : "#2C3E5080",
          }}
        >
          {t("task_fill_rate")}
        </Typography>
        <CharArrowIcon
          sx={{
            fill: selectedChart === "task_fill_rate" ? "#FFFFFF" : "#2C3E5080",
          }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor:
            selectedChart === "user_retention" ? "#447EEF" : "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0px 4px 8px 0px #00000017",
          cursor: "pointer",
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          height: "5em",
          alignItems: "center",
          padding: "1em",
          "&:hover": {
            backgroundColor: "#447EEF",
          },
        }}
        onClick={() => setSelectedChart("user_retention")}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: selectedChart === "user_retention" ? "#FFFFFF" : "#2C3E5080",
          }}
        >
          {t("user_retention")}
        </Typography>
        <CharArrowIcon
          sx={{
            color: selectedChart === "user_retention" ? "#FFFFFF" : "#2C3E5080",
          }}
        />
      </Box>
    </Box>
  );
};

export default Buttons;
