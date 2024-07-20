import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import artisanImage from "../../assets/artisan.webp";
import clientImage from "../../assets/client.webp";
import { useAppSelector } from "../../hooks";

const Body = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleOnClick = ({ userType }: { userType: "client" | "artisan" }) => {
    navigate(`/login/${userType}`);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          backgroundImage: `url(${clientImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "50%",
          position: "relative",
        }}
        onClick={() => handleOnClick({ userType: "client" })}
      >
        <Box
          sx={{
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0) -26.15%, rgba(68, 126, 239, 0.5) 62.16%)",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            "&:hover": {
              background:
                "linear-gradient(90deg, rgba(255, 255, 255, 0) -26.15%, rgba(55, 105, 204, 0.5) 62.16%)",
              cursor: "pointer",
            },
          }}
        />
        <Box sx={{ position: "absolute", top: "10%", right: "1em" }}>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "3rem",
              textTransform: "uppercase",
              fontWeight: "700",
              letterSpacing: "0.03em",
              textAlign: "right",
              userSelect: "none",
            }}
          >
            {t("client")}
          </Typography>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "1.7rem",
              fontWeight: "500",
              textAlign: "right",
              userSelect: "none",
            }}
          >
            {t("Je suis un client cherche un professionel")}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${artisanImage})`,
          backgroundSize: "cover",
          height: "100vh",
          backgroundRepeat: "no-repeat",
          width: "50%",
          position: "relative",
        }}
        onClick={() => handleOnClick({ userType: "artisan" })}
      >
        <Box
          sx={{
            background:
              "linear-gradient(270deg, rgba(255, 255, 255, 0) -23.54%, rgba(241, 196, 15, 0.5) 49.47%)",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            "&:hover": {
              background:
                "linear-gradient(270deg, rgba(255, 255, 255, 0) -23.54%, rgba(212, 174, 19, 0.5) 49.47%)",
              cursor: "pointer",
            },
          }}
        />
        <Box sx={{ position: "absolute", bottom: "10%", left: "1em" }}>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "3rem",
              textTransform: "uppercase",
              fontWeight: "700",
              letterSpacing: "0.03em",
              userSelect: "none",
            }}
          >
            {t("artisan")}
          </Typography>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "1.7rem",
              fontWeight: "500",
              userSelect: "none",
            }}
          >
            {t("Je suis un client cherche un professionel")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Body;
