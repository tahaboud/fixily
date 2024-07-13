import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  JoinedTodayIcon,
  TotalArtisansIcon,
  TotalClientsIcon,
} from "../../../assets/Icons";

const Cards = ({
  numOfArtisans,
  numOfClients,
  numOfJoinedToday,
}: {
  numOfArtisans: number;
  numOfClients: number;
  numOfJoinedToday: number;
}) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 8px 0px #00000017",
          borderRadius: "16px",
          height: "9em",
          flex: 1,
          display: "flex",
          padding: "1em",
          gap: "1em",
        }}
      >
        <TotalClientsIcon sx={{ fontSize: "7rem" }} />
        <Box>
          <Typography sx={{ fontSize: "4rem" }}>{numOfClients}</Typography>
          <Typography sx={{ color: "#9CA4AC", fontSize: "1.3rem" }}>
            {t("Clients")}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 8px 0px #00000017",
          borderRadius: "16px",
          height: "9em",
          flex: 1,
          display: "flex",
          padding: "1em",
          gap: "1em",
        }}
      >
        <TotalArtisansIcon sx={{ fontSize: "7rem" }} />
        <Box>
          <Typography sx={{ fontSize: "4rem" }}>{numOfArtisans}</Typography>
          <Typography sx={{ color: "#9CA4AC", fontSize: "1.3rem" }}>
            {t("Artisans")}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 8px 0px #00000017",
          borderRadius: "16px",
          height: "9em",
          flex: 1,
          display: "flex",
          padding: "1em",
          gap: "1em",
        }}
      >
        <JoinedTodayIcon sx={{ fontSize: "7rem" }} />
        <Box>
          <Typography sx={{ fontSize: "4rem" }}>{numOfJoinedToday}</Typography>
          <Typography sx={{ color: "#9CA4AC", fontSize: "1.3rem" }}>
            {t("Joined today")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Cards;
