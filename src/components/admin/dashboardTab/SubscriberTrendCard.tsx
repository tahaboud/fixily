import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../../types";

const SubscriberTrendCard = ({
  setCurrentTab,
  users,
}: {
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  users: Array<User> | null;
}) => {
  const { t } = useTranslation();

  const [xData, setXData] = useState<Array<number>>([]);
  const [yData, setYData] = useState<Array<number>>([]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const today = new Date();
    let currentDayIndex = today.getDay();
    const daysArray: Array<number> = [];

    for (let i = 1; i < 11; i++) {
      daysArray.unshift(currentDayIndex);
      currentDayIndex -= 1;
    }
    setXData([...daysArray]);
  }, []);

  useEffect(() => {
    if (users) {
      const today = new Date();
      const usersArray: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      users.map((user) => {
        const difference = Math.round(
          (today.getTime() - new Date(user.created_at).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        if (difference < 10) {
          usersArray[9 - difference] += 1;
        }
      });

      setYData([...usersArray]);
    }
  }, [users]);

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "1em",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 2,
        cursor: "pointer",
        boxShadow: "0px 4px 8px 0px #00000017",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
      onClick={() => setCurrentTab(4)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
          {t("subscriber_trend")}
        </Typography>
        <ChevronRightIcon sx={{ color: "#2C3E5080", fontSize: "2rem" }} />
      </Box>
      <svg
        style={{ width: 0, height: 0, position: "absolute" }}
        aria-hidden="true"
        focusable="false"
      >
        <linearGradient id="my-cool-gradient" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(68, 126, 239, 0.2)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
        </linearGradient>
      </svg>
      <LineChart
        xAxis={[
          {
            data: xData,
            valueFormatter: (value) => {
              if (value >= 0) return daysOfWeek[value];
              return daysOfWeek[((value % 7) + 7) % 7];
            },
            tickNumber: 10,
          },
        ]}
        series={[
          {
            data: yData,
            area: true,
            color: "#447EEF",
          },
        ]}
        sx={{
          "& .MuiAreaElement-root": {
            fill: "url(#my-cool-gradient)",
          },
        }}
        width={800}
        height={500}
      />
    </Box>
  );
};

export default SubscriberTrendCard;
