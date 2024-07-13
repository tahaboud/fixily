import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCommunes, getWilayas } from "../../state/actions/servicesAction";
import { Commune, Wilaya } from "../../types";

const LocationStep = ({
  setStep,
  selectedWilaya,
  setSelectedWilaya,
  selectedCommune,
  setSelectedCommune,
  handleCreateJob,
}: {
  setStep: Dispatch<SetStateAction<0 | 1 | 2 | 3 | 4>>;
  selectedWilaya: Wilaya | null;
  setSelectedWilaya: Dispatch<SetStateAction<Wilaya | null>>;
  selectedCommune: Commune | null;
  setSelectedCommune: Dispatch<SetStateAction<Commune | null>>;
  handleCreateJob: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { wilayas, communes } = useAppSelector((state) => state.services);

  useEffect(() => {
    dispatch(getWilayas());
  }, [dispatch]);

  useEffect(() => {
    if (selectedWilaya) {
      dispatch(getCommunes({ wilayaId: selectedWilaya.id }));
    }
  }, [selectedWilaya, dispatch]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "2em",
      }}
    >
      <Box
        sx={{
          padding: "1em 0",
          height: "90%",
        }}
      >
        <Typography sx={{ fontWeight: "600", margin: "1em 0" }}>
          {t("select_your_location")}
        </Typography>
        <Select
          displayEmpty
          value={selectedWilaya === null ? "" : selectedWilaya.id}
          onChange={(e) => {
            if (wilayas) {
              const wilayaIndex = wilayas.findIndex(
                (value) => value.id === e.target.value
              );
              setSelectedWilaya(wilayas[wilayaIndex]);
            }
          }}
          sx={{
            width: "100%",
            margin: "1em 0",
            borderRadius: "8px",
            backgroundColor: "#ECF0F180",
          }}
          IconComponent={KeyboardArrowDownIcon}
          input={
            <OutlinedInput
              startAdornment={<LocationOnIcon sx={{ color: "#2C3E5080" }} />}
            />
          }
        >
          <MenuItem disabled value="">
            <em>{t("select_a_wilaya")}</em>
          </MenuItem>
          {wilayas?.map((wilaya) => (
            <MenuItem key={wilaya.id} value={wilaya.id}>
              {wilaya.name_en}
            </MenuItem>
          ))}
        </Select>
        <Select
          displayEmpty
          value={selectedCommune === null ? "" : selectedCommune.id}
          onChange={(e) => {
            if (communes) {
              const communeIndex = communes.findIndex(
                (value) => value.id === e.target.value
              );
              setSelectedCommune(communes[communeIndex]);
            }
          }}
          sx={{
            width: "100%",
            margin: "1em 0",
            borderRadius: "8px",
            backgroundColor: "#ECF0F180",
          }}
          IconComponent={KeyboardArrowDownIcon}
          input={
            <OutlinedInput
              startAdornment={<LocationOnIcon sx={{ color: "#2C3E5080" }} />}
            />
          }
        >
          <MenuItem disabled value="">
            <em>{t("select_a_commune")}</em>
          </MenuItem>
          {selectedWilaya &&
            communes?.map((commune) => (
              <MenuItem key={commune.id} value={commune.id}>
                {commune.name_en}
              </MenuItem>
            ))}
        </Select>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <IconButton
          sx={{
            backgroundColor: "#2C3E50",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#283849" },
          }}
          onClick={() => setStep(1)}
        >
          <KeyboardArrowLeftIcon sx={{ color: "#FFFFFF" }} />
        </IconButton>
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
          endIcon={<KeyboardArrowRightIcon />}
          onClick={handleCreateJob}
          disabled={selectedWilaya === null || selectedCommune === null}
        >
          {t("next")}
        </Button>
      </Box>
    </Box>
  );
};

export default LocationStep;
