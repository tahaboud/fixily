import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import downloadAppImage from "../../assets/downloadApp.webp";
import downloadOnAppStoreImage from "../../assets/downloadOnAppStore.webp";
import downloadOnGooglePlayImage from "../../assets/downloadOnGooglePlay.webp";
import { useAppSelector } from "../../hooks";

const Step3 = () => {
  const { t } = useTranslation();
  const { data } = useAppSelector((state) => state.auth);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1em",
          width: "100%",
        }}
      >
        <Typography
          sx={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "600" }}
        >
          {t("Bienvenu")}
          {` ${data?.first_name},`}
        </Typography>
        <Box>
          <img src={downloadAppImage} />
        </Box>
        <Typography>
          {t("Verifiez votre profile et gagner 10 points")}
        </Typography>
        <Typography sx={{ color: "#2C3E5080" }}>
          {t("Telecharger l'application pour verifier votre identité")}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "2em" }}>
          <Box>
            <img src={downloadOnGooglePlayImage} />
          </Box>
          <Box>
            <img src={downloadOnAppStoreImage} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Step3;
