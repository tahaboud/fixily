import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  ArtisanFoundIcon,
  CompletedJobIcon,
  OpenJobsCountIcon,
} from "../../../assets/Icons";

const Cards = ({
  openJobsCount,
  matchedJobsCount,
  archivedJobsCount,
}: {
  openJobsCount: number;
  matchedJobsCount: number;
  archivedJobsCount: number;
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: "1em", height: "20%" }}
    >
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 8px 0px #00000017",
          borderRadius: "16px",
          flex: 1,
          display: "flex",
          padding: "1em",
          gap: "1em",
        }}
      >
        <OpenJobsCountIcon sx={{ fontSize: "7rem" }} />
        <Box>
          <Typography sx={{ fontSize: "4rem" }}>{openJobsCount}</Typography>
          <Typography sx={{ color: "#9CA4AC", fontSize: "1.3rem" }}>
            {t("open")}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 8px 0px #00000017",
          borderRadius: "16px",
          flex: 1,
          display: "flex",
          padding: "1em",
          gap: "1em",
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            backgroundColor: "#BAEBE1",
            height: "8em",
            width: "8em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArtisanFoundIcon sx={{ fontSize: "4rem" }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: "4rem" }}>{matchedJobsCount}</Typography>
          <Typography sx={{ color: "#9CA4AC", fontSize: "1.3rem" }}>
            {t("matched")}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 8px 0px #00000017",
          borderRadius: "16px",
          flex: 1,
          display: "flex",
          padding: "1em",
          gap: "1em",
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            backgroundColor: "#FBEDB7",
            height: "8em",
            width: "8em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CompletedJobIcon sx={{ fontSize: "4rem" }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: "4rem" }}>{archivedJobsCount}</Typography>
          <Typography sx={{ color: "#9CA4AC", fontSize: "1.3rem" }}>
            {t("archived")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Cards;
