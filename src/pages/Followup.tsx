import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import logoImage from "../assets/logo.png";
import { services } from "./followupServices";

const Followup = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        padding: "2em",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", margin: "3em" }}>
        <img src={logoImage} />
      </Box>
      <Typography sx={{ fontSize: "1.2rem", margin: "1em" }}>
        {t("Veuillez choisir votre domaine de service")}
      </Typography>
      <Grid container spacing={"1em"} justifyContent={"center"}>
        {services.map((service, index) => (
          <Grid item key={index} md={2} sm={4}>
            <Box
              sx={{
                height: "10em",
                borderRadius: "8px",
                overflow: "hidden",
                "&:hover": {
                  cursor: "pointer",
                  "&>img": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              <img
                src={service.image}
                style={{ height: "100%", width: "100%" }}
              />
            </Box>
            <Typography sx={{ textAlign: "center" }}>
              {t(service.title)}
            </Typography>
          </Grid>
        ))}
        <Grid item md={2} sm={4}>
          <Box
            sx={{
              height: "10em",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                cursor: "pointer",
                "&>svg": {
                  transform: "scale(1.1)",
                },
              },
            }}
          >
            <AddIcon sx={{ fontSize: "9rem", color: "#959EA7" }} />
          </Box>
          <Typography sx={{ textAlign: "center" }}>{t("other")}</Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "#000000",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#313131" },
          }}
        >
          <ArrowBackIosNewIcon sx={{ color: "#FFFFFF" }} />
        </IconButton>
        <Button
          sx={{
            backgroundColor: "#F1C40F",
            width: "10em",
            textTransform: "none",
            fontSize: "1.2rem",
            color: "#000000",
            "&:hover": {
              backgroundColor: "#d8b010",
            },
          }}
          endIcon={<NavigateNextIcon />}
        >
          {t("next")}
        </Button>
      </Box>
    </Box>
  );
};

export default Followup;
