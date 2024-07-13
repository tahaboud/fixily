import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, IconButton, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { ArtisanFoundIcon, LookingForArtisanIcon } from "../../../assets/Icons";
import { Job } from "../../../types";

const Demand = ({
  job,
  setSidePanelOpen,
  setSidePanelTitle,
  setSelectedJob,
}: {
  job: Job;
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
  setSidePanelTitle: Dispatch<SetStateAction<string>>;
  setSelectedJob: Dispatch<SetStateAction<Job | null>>;
}) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1em",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em",
        "&:hover": {
          backgroundColor: "#ebebeb",
          cursor: "pointer",
        },
      }}
      onClick={() => {
        setSidePanelOpen(true);
        setSidePanelTitle("edit_job");
        setSelectedJob(job);
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          backgroundColor: job.artisan ? "#1ABC9C21" : "#447EEF21",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {job.artisan ? <ArtisanFoundIcon /> : <LookingForArtisanIcon />}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 600 }}>
          {job.sub_category.name_ar}
        </Typography>
        <Typography sx={{ color: "#2C3E5080" }}>
          {job.artisan ? t("working") : t("looking_for_artisan")}
        </Typography>
      </Box>
      {job.artisan === null && job.rooms_count !== 0 && (
        <Box
          sx={{
            borderRadius: "50%",
            backgroundColor: "#1ABC9C",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "2em",
            width: "2em",
            color: "#ffffff",
            fontWeight: 600,
          }}
        >
          {job.rooms_count}
        </Box>
      )}
      <IconButton>
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );
};

export default Demand;
