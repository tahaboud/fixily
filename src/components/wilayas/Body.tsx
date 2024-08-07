import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RoomIcon from "@mui/icons-material/Room";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUser } from "../../state/actions/authActions";
import { getCommunes, getWilayas } from "../../state/actions/servicesAction";
import { ActionEnums } from "../../state/types/actionEnums";

const Body = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token, userIsLoading, detail, data } = useAppSelector(
    (state) => state.auth
  );
  const { wilayas, communes } = useAppSelector((state) => state.services);

  const [wilaya, setWilaya] = useState<string>("");
  const [commune, setCommune] = useState<string>("");

  useEffect(() => {
    if (token) {
      dispatch(getWilayas());
    }
  }, [token, dispatch]);

  const handleChangeWilaya = (e: SelectChangeEvent<string>) => {
    setWilaya(e.target.value);
    if (token) {
      dispatch(getCommunes({ wilayaId: e.target.value }));
    }
  };

  const handleNext = () => {
    if (token) {
      dispatch(updateUser({ token, wilaya, commune }));
    }
  };

  useEffect(() => {
    if (detail && detail.detail === "user updated successfully") {
      navigate("/photo");
    }
  }, [detail, navigate]);

  useEffect(() => {
    dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
  }, [dispatch]);

  useEffect(() => {
    if (token && data && data.wilaya) {
      setWilaya(data.wilaya.id);
      dispatch(getCommunes({ wilayaId: data.wilaya.id }));
    }
    if (token && data && data.commune) {
      setCommune(data.commune.id);
    }
  }, [data, dispatch, token]);

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#FFFFFF" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "90vh",
            margin: "1em 0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1em",
              flex: 1,
            }}
          >
            <img src={logoImage} />
            <Typography>
              {t("Veuillez choisir votre location d'activité")}
            </Typography>
            <Box>
              <Typography>{t("Wilaya")}</Typography>
              <Select
                displayEmpty
                value={wilaya}
                onChange={handleChangeWilaya}
                input={
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <RoomIcon />
                      </InputAdornment>
                    }
                  />
                }
                sx={{ width: "20em", backgroundColor: "#F5F7F8" }}
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem disabled value="">
                  <em>{t("Wilaya")}</em>
                </MenuItem>
                {wilayas &&
                  wilayas.map((serverWilaya) => (
                    <MenuItem key={serverWilaya.id} value={serverWilaya.id}>
                      {serverWilaya.name_en}
                    </MenuItem>
                  ))}
              </Select>
            </Box>
            <Box>
              <Typography>{t("Commune")}</Typography>
              <Select
                displayEmpty
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                input={
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <RoomIcon />
                      </InputAdornment>
                    }
                  />
                }
                sx={{ width: "20em", backgroundColor: "#F5F7F8" }}
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem disabled value="">
                  <em>{wilaya === "" ? t("select_a_wilaya") : t("Commune")}</em>
                </MenuItem>
                {communes &&
                  communes.map((serverCommune) => (
                    <MenuItem key={serverCommune.id} value={serverCommune.id}>
                      {serverCommune.name_en}
                    </MenuItem>
                  ))}
              </Select>
            </Box>
          </Box>
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
                backgroundColor: "#2C3E50",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#273644" },
              }}
              onClick={() => navigate("/sub-categories")}
            >
              <ArrowBackIosNewIcon sx={{ color: "#FFFFFF" }} />
            </IconButton>
            <Button
              endIcon={<ArrowForwardIosIcon />}
              sx={{
                borderRadius: "8px",
                backgroundColor: "#F1C40F",
                color: "#2C3E50",
                textTransform: "none",
                padding: "0.5em 2em",
                "&:hover": {
                  backgroundColor: "#e4b90f",
                },
              }}
              disabled={userIsLoading || wilaya === "" || commune === ""}
              onClick={handleNext}
            >
              {t("Suivant")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Body;
