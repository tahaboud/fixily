import { Box, Button, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

const LookingForArtisanStep = ({
  setSidePanelOpen,
}: {
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1em",
      }}
    >
      <Typography>{t("looking_for_artisans_in_region")}</Typography>
      <Typography>
        {t("we_have_sent_notifications_to_nearby_artisans")}
      </Typography>
      <Button
        sx={{
          backgroundColor: "#F1C40F",
          borderRadius: "8px",
          textTransform: "none",
          color: "#000000",
          width: "100%",
          "&:hover": {
            backgroundColor: "#d8b011",
          },
        }}
        variant="contained"
        onClick={() => setSidePanelOpen(false)}
      >
        {t("close")}
      </Button>
    </Box>
  );
};

export default LookingForArtisanStep;
