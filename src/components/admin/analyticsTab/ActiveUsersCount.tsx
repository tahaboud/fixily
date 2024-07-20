import { Box, styled, Typography } from "@mui/material";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { PieChart } from "@mui/x-charts/PieChart";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../../types";

const ActiveUsersCount = ({ users }: { users: Array<User> | null }) => {
  const { t } = useTranslation();

  const [artisansCount, setArtisansCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);

  useEffect(() => {
    if (users) {
      setArtisansCount(users.filter((user) => user.is_artisan).length);
      setClientsCount(users.filter((user) => !user.is_artisan).length);
    }
  }, [users, t]);

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
      <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", width: "100%" }}>
        {t("active_users_count")}
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
                label: t("artisans"),
                value: artisansCount,
                color: "#F1C40F",
              },
              {
                label: t("clients"),
                value: clientsCount,
                color: "#447EEF",
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
        <PieCenterLabel>{users ? users.length : 0}</PieCenterLabel>
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
              backgroundColor: "#F1C40F",
            }}
          />
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>{`${t(
            "artisans"
          )} (${artisansCount})`}</Typography>
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
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>{`${t(
            "clients"
          )} (${clientsCount})`}</Typography>
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

export default ActiveUsersCount;
