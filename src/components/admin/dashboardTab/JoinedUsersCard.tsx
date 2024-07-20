import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../../types";

const JoinedUsersCard = ({
  users,
  setCurrentTab,
}: {
  users: Array<User> | null;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { t } = useTranslation();

  const [dayNames, setDayNames] = useState<Array<string>>([]);
  const [data, setData] = useState<
    Array<{ data: Array<number>; label: string; color: string }>
  >([]);

  useEffect(() => {
    if (users) {
      const today = new Date();
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let currentDayIndex = today.getDay();

      const artisansJoinedToday = users.filter(
        (user) =>
          Math.round(
            (today.getTime() - new Date(user.created_at).getTime()) /
              (1000 * 60 * 60 * 24)
          ) === 0 && user.is_artisan
      ).length;
      const clientsJoinedToday = users.filter(
        (user) =>
          Math.round(
            (today.getTime() - new Date(user.created_at).getTime()) /
              (1000 * 60 * 60 * 24)
          ) === 0 && !user.is_artisan
      ).length;
      const todayName = daysOfWeek[currentDayIndex];
      currentDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

      const artisansJoinedYesterday = users.filter(
        (user) =>
          Math.round(
            (today.getTime() - new Date(user.created_at).getTime()) /
              (1000 * 60 * 60 * 24)
          ) === 1 && user.is_artisan
      ).length;
      const clientsJoinedYesterday = users.filter(
        (user) =>
          Math.round(
            (today.getTime() - new Date(user.created_at).getTime()) /
              (1000 * 60 * 60 * 24)
          ) === 1 && !user.is_artisan
      ).length;
      const yesterdayName = daysOfWeek[currentDayIndex];
      currentDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

      const artisansJoinedTwoDaysBefore = users.filter(
        (user) =>
          Math.round(
            (today.getTime() - new Date(user.created_at).getTime()) /
              (1000 * 60 * 60 * 24)
          ) === 2 && user.is_artisan
      ).length;
      const clientsJoinedTwoDaysBefore = users.filter(
        (user) =>
          Math.round(
            (today.getTime() - new Date(user.created_at).getTime()) /
              (1000 * 60 * 60 * 24)
          ) === 2 && !user.is_artisan
      ).length;
      const twoDaysBeforeName = daysOfWeek[currentDayIndex];
      currentDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

      const artisansJoinedThreeDaysBefore = users.filter(
        (user) =>
          Math.round(
            (today.getTime() - new Date(user.created_at).getTime()) /
              (1000 * 60 * 60 * 24)
          ) === 3 && user.is_artisan
      ).length;
      const clientsJoinedThreeDaysBefore = users.filter(
        (user) =>
          Math.round(
            (today.getTime() - new Date(user.created_at).getTime()) /
              (1000 * 60 * 60 * 24)
          ) === 3 && !user.is_artisan
      ).length;
      const threeDaysBeforeName = daysOfWeek[currentDayIndex];
      currentDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

      setDayNames([
        threeDaysBeforeName,
        twoDaysBeforeName,
        yesterdayName,
        todayName,
      ]);

      setData([
        {
          data: [
            clientsJoinedThreeDaysBefore,
            clientsJoinedTwoDaysBefore,
            clientsJoinedYesterday,
            clientsJoinedToday,
          ],
          label: t("clients"),
          color: "#447EEF",
        },
        {
          data: [
            artisansJoinedThreeDaysBefore,
            artisansJoinedTwoDaysBefore,
            artisansJoinedYesterday,
            artisansJoinedToday,
          ],
          label: t("artisans"),
          color: "#F1C40F",
        },
      ]);
    }
  }, [users, t]);

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
        flex: 1,
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
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
          {t("joined_users")}
        </Typography>
        <ChevronRightIcon sx={{ color: "#2C3E5080" }} />
      </Box>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: dayNames,
            disableLine: true,
            tickLabelStyle: {
              color: "#2C3E5080",
              fontWeight: 600,
            },
          },
        ]}
        series={data}
        width={400}
        height={200}
        slotProps={{
          legend: { hidden: true },
          axisLine: { display: "none" },
          axisTick: { display: "none" },
        }}
        borderRadius={16}
        yAxis={[{ tickLabelStyle: { display: "none" } }]}
      />
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
              backgroundColor: "#447EEF",
            }}
          />
          <Typography>{t("clients")}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <Box
            sx={{
              height: "1em",
              width: "1em",
              borderRadius: "50%",
              backgroundColor: "#F1C40F",
            }}
          />
          <Typography>{t("artisans")}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default JoinedUsersCard;
