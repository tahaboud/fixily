import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUser } from "../../state/actions/authActions";
import { prepareAvailability } from "../utils";

const Body = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, data } = useAppSelector((state) => state.auth);

  const [workOnSaturday, setWorkOnSaturday] = useState(false);
  const [fromTimeSaturday, setFromTimeSaturday] = useState<Dayjs | null>(null);
  const [toTimeSaturday, setToTimeSaturday] = useState<Dayjs | null>(null);
  const [workOnMonday, setWorkOnMonday] = useState(false);
  const [fromTimeMonday, setFromTimeMonday] = useState<Dayjs | null>(null);
  const [toTimeMonday, setToTimeMonday] = useState<Dayjs | null>(null);
  const [workOnTuesday, setWorkOnTuesday] = useState(false);
  const [fromTimeTuesday, setFromTimeTuesday] = useState<Dayjs | null>(null);
  const [toTimeTuesday, setToTimeTuesday] = useState<Dayjs | null>(null);
  const [workOnWednesday, setWorkOnWednesday] = useState(false);
  const [fromTimeWednesday, setFromTimeWednesday] = useState<Dayjs | null>(
    null
  );
  const [toTimeWednesday, setToTimeWednesday] = useState<Dayjs | null>(null);
  const [workOnThursday, setWorkOnThursday] = useState(false);
  const [fromTimeThursday, setFromTimeThursday] = useState<Dayjs | null>(null);
  const [toTimeThursday, setToTimeThursday] = useState<Dayjs | null>(null);
  const [workOnSunday, setWorkOnSunday] = useState(false);
  const [fromTimeSunday, setFromTimeSunday] = useState<Dayjs | null>(null);
  const [toTimeSunday, setToTimeSunday] = useState<Dayjs | null>(null);
  const [workOnFriday, setWorkOnFriday] = useState(false);
  const [fromTimeFriday, setFromTimeFriday] = useState<Dayjs | null>(null);
  const [toTimeFriday, setToTimeFriday] = useState<Dayjs | null>(null);
  const handleNext = () => {
    if (token) {
      const availability = prepareAvailability({
        workOnFriday,
        workOnMonday,
        workOnSaturday,
        workOnSunday,
        workOnThursday,
        workOnTuesday,
        workOnWednesday,
        fromTimeFriday,
        fromTimeMonday,
        fromTimeSaturday,
        fromTimeSunday,
        fromTimeThursday,
        fromTimeTuesday,
        fromTimeWednesday,
        toTimeFriday,
        toTimeMonday,
        toTimeSaturday,
        toTimeSunday,
        toTimeThursday,
        toTimeTuesday,
        toTimeWednesday,
      });
      dispatch(updateUser({ token, availability }));
      navigate("/photo");
    }
  };
  useEffect(() => {
    if (data && data.availability) {
      data.availability.map((dayAvailability) => {
        switch (dayAvailability.day) {
          case "saturday":
            setWorkOnSaturday(!dayAvailability.is_holiday);
            if (dayAvailability.from_time) {
              setFromTimeSaturday(dayjs(dayAvailability.from_time, "HH:mm:ss"));
            }
            if (dayAvailability.to_time) {
              setToTimeSaturday(dayjs(dayAvailability.to_time, "HH:mm:ss"));
            }
            break;
          case "sunday":
            setWorkOnSunday(!dayAvailability.is_holiday);
            if (dayAvailability.from_time) {
              setFromTimeSunday(dayjs(dayAvailability.from_time, "HH:mm:ss"));
            }
            if (dayAvailability.to_time) {
              setToTimeSunday(dayjs(dayAvailability.to_time, "HH:mm:ss"));
            }
            break;
          case "monday":
            setWorkOnMonday(!dayAvailability.is_holiday);
            if (dayAvailability.from_time) {
              setFromTimeMonday(dayjs(dayAvailability.from_time, "HH:mm:ss"));
            }
            if (dayAvailability.to_time) {
              setToTimeMonday(dayjs(dayAvailability.to_time, "HH:mm:ss"));
            }
            break;
          case "tuesday":
            setWorkOnTuesday(!dayAvailability.is_holiday);
            if (dayAvailability.from_time) {
              setFromTimeTuesday(dayjs(dayAvailability.from_time, "HH:mm:ss"));
            }
            if (dayAvailability.to_time) {
              setToTimeTuesday(dayjs(dayAvailability.to_time, "HH:mm:ss"));
            }
            break;
          case "wednesday":
            setWorkOnWednesday(!dayAvailability.is_holiday);
            if (dayAvailability.from_time) {
              setFromTimeWednesday(
                dayjs(dayAvailability.from_time, "HH:mm:ss")
              );
            }
            if (dayAvailability.to_time) {
              setToTimeWednesday(dayjs(dayAvailability.to_time, "HH:mm:ss"));
            }
            break;
          case "thursday":
            setWorkOnThursday(!dayAvailability.is_holiday);
            if (dayAvailability.from_time) {
              setFromTimeThursday(dayjs(dayAvailability.from_time, "HH:mm:ss"));
            }
            if (dayAvailability.to_time) {
              setToTimeThursday(dayjs(dayAvailability.to_time, "HH:mm:ss"));
            }
            break;
          case "friday":
            setWorkOnFriday(!dayAvailability.is_holiday);
            if (dayAvailability.from_time) {
              setFromTimeFriday(dayjs(dayAvailability.from_time, "HH:mm:ss"));
            }
            if (dayAvailability.to_time) {
              setToTimeFriday(dayjs(dayAvailability.to_time, "HH:mm:ss"));
            }
            break;
        }
      });
    }
  }, [data]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ backgroundColor: "#FFFFFF", height: "90vh" }}>
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: "2em",
            }}
          >
            <img src={logoImage} />
            <Typography>{t("Veuillez choisir votre disponibility")}</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Checkbox
                  checked={workOnSaturday}
                  onChange={(e) => setWorkOnSaturday(e.target.checked)}
                />
                <Typography>{t("Saturday")}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Typography>{t("from")}</Typography>
                <TimePicker
                  disabled={!workOnSaturday}
                  format="HH:mm"
                  value={fromTimeSaturday}
                  onChange={(newValue) => setFromTimeSaturday(newValue)}
                  disableOpenPicker
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
                <Typography>{t("to")}</Typography>
                <TimePicker
                  disabled={!workOnSaturday}
                  format="HH:mm"
                  disableOpenPicker
                  value={toTimeSaturday}
                  onChange={(newValue) => setToTimeSaturday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Checkbox
                  checked={workOnSunday}
                  onChange={(e) => setWorkOnSunday(e.target.checked)}
                />
                <Typography>{t("Sunday")}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Typography>{t("from")}</Typography>
                <TimePicker
                  disabled={!workOnSunday}
                  format="HH:mm"
                  disableOpenPicker
                  value={fromTimeSunday}
                  onChange={(newValue) => setFromTimeSunday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
                <Typography>{t("to")}</Typography>
                <TimePicker
                  disabled={!workOnSunday}
                  format="HH:mm"
                  disableOpenPicker
                  value={toTimeSunday}
                  onChange={(newValue) => setToTimeSunday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Checkbox
                  checked={workOnMonday}
                  onChange={(e) => setWorkOnMonday(e.target.checked)}
                />
                <Typography>{t("Monday")}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Typography>{t("from")}</Typography>
                <TimePicker
                  disabled={!workOnMonday}
                  format="HH:mm"
                  disableOpenPicker
                  value={fromTimeMonday}
                  onChange={(newValue) => setFromTimeMonday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
                <Typography>{t("to")}</Typography>
                <TimePicker
                  disabled={!workOnMonday}
                  format="HH:mm"
                  disableOpenPicker
                  value={toTimeMonday}
                  onChange={(newValue) => setToTimeMonday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Checkbox
                  checked={workOnTuesday}
                  onChange={(e) => setWorkOnTuesday(e.target.checked)}
                />
                <Typography>{t("Tuesday")}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Typography>{t("from")}</Typography>
                <TimePicker
                  disabled={!workOnTuesday}
                  format="HH:mm"
                  disableOpenPicker
                  value={fromTimeTuesday}
                  onChange={(newValue) => setFromTimeTuesday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
                <Typography>{t("to")}</Typography>
                <TimePicker
                  disabled={!workOnTuesday}
                  format="HH:mm"
                  disableOpenPicker
                  value={toTimeTuesday}
                  onChange={(newValue) => setToTimeTuesday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Checkbox
                  checked={workOnWednesday}
                  onChange={(e) => setWorkOnWednesday(e.target.checked)}
                />
                <Typography>{t("Wednesday")}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Typography>{t("from")}</Typography>
                <TimePicker
                  disabled={!workOnWednesday}
                  format="HH:mm"
                  disableOpenPicker
                  value={fromTimeWednesday}
                  onChange={(newValue) => setFromTimeWednesday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
                <Typography>{t("to")}</Typography>
                <TimePicker
                  disabled={!workOnWednesday}
                  format="HH:mm"
                  disableOpenPicker
                  value={toTimeWednesday}
                  onChange={(newValue) => setToTimeWednesday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Checkbox
                  checked={workOnThursday}
                  onChange={(e) => setWorkOnThursday(e.target.checked)}
                />
                <Typography>{t("Thursday")}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Typography>{t("from")}</Typography>
                <TimePicker
                  disabled={!workOnThursday}
                  format="HH:mm"
                  disableOpenPicker
                  value={fromTimeThursday}
                  onChange={(newValue) => setFromTimeThursday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
                <Typography>{t("to")}</Typography>
                <TimePicker
                  disabled={!workOnThursday}
                  format="HH:mm"
                  disableOpenPicker
                  value={toTimeThursday}
                  onChange={(newValue) => setToTimeThursday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Checkbox
                  checked={workOnFriday}
                  onChange={(e) => setWorkOnFriday(e.target.checked)}
                />
                <Typography>{t("Friday")}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <Typography>{t("from")}</Typography>
                <TimePicker
                  disabled={!workOnFriday}
                  format="HH:mm"
                  disableOpenPicker
                  value={fromTimeFriday}
                  onChange={(newValue) => setFromTimeFriday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
                <Typography>{t("to")}</Typography>
                <TimePicker
                  disabled={!workOnFriday}
                  format="HH:mm"
                  disableOpenPicker
                  value={toTimeFriday}
                  onChange={(newValue) => setToTimeFriday(newValue)}
                  sx={{
                    backgroundColor: "#F5F7F8",
                    borderRadius: "8px",
                  }}
                />
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
                onClick={() => navigate("/wilayas")}
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
                onClick={handleNext}
              >
                {t("Suivant")}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default Body;
