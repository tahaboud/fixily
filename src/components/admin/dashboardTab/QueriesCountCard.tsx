import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TotalQueriesIcon } from "../../../assets/Icons";
import { Job } from "../../../types";

const QueriesCountCard = ({
  jobs,
  setCurrentTab,
}: {
  jobs: Array<Job> | null;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "1em",
        height: "10em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        cursor: "pointer",
        boxShadow: "0px 4px 8px 0px #00000017",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
      onClick={() => setCurrentTab(2)}
    >
      <TotalQueriesIcon sx={{ fontSize: "7rem" }} />
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: "2.5rem", fontWeight: 700 }}>
          {jobs ? jobs.length : 0}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem", color: "#2C3E5080" }}>
          {t("queries")}
        </Typography>
      </Box>
      <ChevronRightIcon sx={{ fontSize: "4rem", color: "#2C3E5080" }} />
    </Box>
  );
};

export default QueriesCountCard;
