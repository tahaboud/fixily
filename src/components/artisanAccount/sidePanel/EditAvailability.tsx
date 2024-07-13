import { Box, Button, Checkbox, Typography } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { updateUser } from "../../../state/actions/authActions";
import { Availability } from "../../../state/actions/types";
import { User } from "../../../types";

interface EditAvailabilityInterface {
  day:
    | "saturday"
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday";
  from_time: Dayjs | null;
  to_time: Dayjs | null;
  is_holiday: boolean;
}

const EditAvailability = ({
  user,
  setSidePanelOpen,
}: {
  user: User;
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const weekDays = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [saturdayAvailability, setSaturdayAvailability] =
    useState<EditAvailabilityInterface>({
      day: "saturday",
      is_holiday: false,
      from_time: null,
      to_time: null,
    });
  const [sundayAvailability, setSundayAvailability] =
    useState<EditAvailabilityInterface>({
      day: "sunday",
      is_holiday: false,
      from_time: null,
      to_time: null,
    });
  const [mondayAvailability, setMondayAvailability] =
    useState<EditAvailabilityInterface>({
      day: "monday",
      is_holiday: false,
      from_time: null,
      to_time: null,
    });
  const [tuesdayAvailability, setTuesdayAvailability] =
    useState<EditAvailabilityInterface>({
      day: "tuesday",
      is_holiday: false,
      from_time: null,
      to_time: null,
    });
  const [wednesdayAvailability, setWednesdayAvailability] =
    useState<EditAvailabilityInterface>({
      day: "wednesday",
      is_holiday: false,
      from_time: null,
      to_time: null,
    });
  const [thursdayAvailability, setThursdayAvailability] =
    useState<EditAvailabilityInterface>({
      day: "thursday",
      is_holiday: false,
      from_time: null,
      to_time: null,
    });
  const [fridayAvailability, setFridayAvailability] =
    useState<EditAvailabilityInterface>({
      day: "friday",
      is_holiday: false,
      from_time: null,
      to_time: null,
    });

  const variables = {
    saturdayAvailability,
    setSaturdayAvailability,
    sundayAvailability,
    setSundayAvailability,
    mondayAvailability,
    setMondayAvailability,
    tuesdayAvailability,
    setTuesdayAvailability,
    wednesdayAvailability,
    setWednesdayAvailability,
    thursdayAvailability,
    setThursdayAvailability,
    fridayAvailability,
    setFridayAvailability,
  } as Record<
    string,
    Availability | React.Dispatch<React.SetStateAction<Availability>>
  >;

  useEffect(() => {
    user.availability.map((dayAvailability) => {
      switch (dayAvailability.day) {
        case "saturday":
          setSaturdayAvailability({
            ...dayAvailability,
            from_time: dayjs(dayAvailability.from_time, "HH:mm:ss"),
            to_time: dayjs(dayAvailability.to_time, "HH:mm:ss"),
          });
          break;
        case "sunday":
          setSundayAvailability({
            ...dayAvailability,
            from_time: dayjs(dayAvailability.from_time, "HH:mm:ss"),
            to_time: dayjs(dayAvailability.to_time, "HH:mm:ss"),
          });
          break;
        case "monday":
          setMondayAvailability({
            ...dayAvailability,
            from_time: dayjs(dayAvailability.from_time, "HH:mm:ss"),
            to_time: dayjs(dayAvailability.to_time, "HH:mm:ss"),
          });
          break;
        case "tuesday":
          setTuesdayAvailability({
            ...dayAvailability,
            from_time: dayjs(dayAvailability.from_time, "HH:mm:ss"),
            to_time: dayjs(dayAvailability.to_time, "HH:mm:ss"),
          });
          break;
        case "wednesday":
          setWednesdayAvailability({
            ...dayAvailability,
            from_time: dayjs(dayAvailability.from_time, "HH:mm:ss"),
            to_time: dayjs(dayAvailability.to_time, "HH:mm:ss"),
          });
          break;
        case "thursday":
          setThursdayAvailability({
            ...dayAvailability,
            from_time: dayjs(dayAvailability.from_time, "HH:mm:ss"),
            to_time: dayjs(dayAvailability.to_time, "HH:mm:ss"),
          });
          break;
        case "friday":
          setFridayAvailability({
            ...dayAvailability,
            from_time: dayjs(dayAvailability.from_time, "HH:mm:ss"),
            to_time: dayjs(dayAvailability.to_time, "HH:mm:ss"),
          });
          break;
      }
    });
  }, [user]);

  const handleSave = () => {
    if (token) {
      const totalAvailability: Array<Availability> = [
        {
          ...saturdayAvailability,
          from_time: saturdayAvailability.from_time
            ? saturdayAvailability.from_time.toString().split(" ")[4]
            : null,
          to_time: saturdayAvailability.to_time
            ? saturdayAvailability.to_time.toString().split(" ")[4]
            : null,
        },
        {
          ...sundayAvailability,
          from_time: sundayAvailability.from_time
            ? sundayAvailability.from_time.toString().split(" ")[4]
            : null,
          to_time: sundayAvailability.to_time
            ? sundayAvailability.to_time.toString().split(" ")[4]
            : null,
        },
        {
          ...mondayAvailability,
          from_time: mondayAvailability.from_time
            ? mondayAvailability.from_time.toString().split(" ")[4]
            : null,
          to_time: mondayAvailability.to_time
            ? mondayAvailability.to_time.toString().split(" ")[4]
            : null,
        },
        {
          ...tuesdayAvailability,
          from_time: tuesdayAvailability.from_time
            ? tuesdayAvailability.from_time.toString().split(" ")[4]
            : null,
          to_time: tuesdayAvailability.to_time
            ? tuesdayAvailability.to_time.toString().split(" ")[4]
            : null,
        },
        {
          ...wednesdayAvailability,
          from_time: wednesdayAvailability.from_time
            ? wednesdayAvailability.from_time.toString().split(" ")[4]
            : null,
          to_time: wednesdayAvailability.to_time
            ? wednesdayAvailability.to_time.toString().split(" ")[4]
            : null,
        },
        {
          ...thursdayAvailability,
          from_time: thursdayAvailability.from_time
            ? thursdayAvailability.from_time.toString().split(" ")[4]
            : null,
          to_time: thursdayAvailability.to_time
            ? thursdayAvailability.to_time.toString().split(" ")[4]
            : null,
        },
        {
          ...fridayAvailability,
          from_time: fridayAvailability.from_time
            ? fridayAvailability.from_time.toString().split(" ")[4]
            : null,
          to_time: fridayAvailability.to_time
            ? fridayAvailability.to_time.toString().split(" ")[4]
            : null,
        },
      ];
      dispatch(updateUser({ token, availability: totalAvailability }));
      setSidePanelOpen(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          height: "calc(100vh - 5em)",
          padding: "0 0 1em 0",
        }}
      >
        {weekDays.map((day, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1em",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
              <Checkbox
                checked={
                  !(
                    variables[`${day}Availability`] as EditAvailabilityInterface
                  ).is_holiday
                }
                onChange={(e) => {
                  (
                    variables[
                      `set${
                        day.charAt(0).toUpperCase() + day.slice(1)
                      }Availability`
                    ] as React.Dispatch<
                      React.SetStateAction<EditAvailabilityInterface>
                    >
                  )((current) => {
                    const localAvailability = { ...current };
                    localAvailability.is_holiday = !e.target.checked;
                    return localAvailability;
                  });
                }}
              />
              <Typography sx={{ width: "5em", fontWeight: 600 }}>
                {t(day)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
              <TimePicker
                format="HH:mm"
                disableOpenPicker
                sx={{
                  backgroundColor: "#F5F7F8",
                  borderRadius: "8px",
                }}
                value={dayjs(
                  (variables[`${day}Availability`] as EditAvailabilityInterface)
                    .from_time,
                  "HH:mm:ss"
                )}
                onChange={(value) => {
                  (
                    variables[
                      `set${
                        day.charAt(0).toUpperCase() + day.slice(1)
                      }Availability`
                    ] as React.Dispatch<
                      React.SetStateAction<EditAvailabilityInterface>
                    >
                  )((current) => {
                    const localAvailability = { ...current };
                    localAvailability.from_time = value;
                    return localAvailability;
                  });
                }}
                formatDensity="dense"
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { width: "5em" },
                    inputProps: { style: { textAlign: "center" } },
                  },
                }}
                disabled={
                  (variables[`${day}Availability`] as EditAvailabilityInterface)
                    .is_holiday
                }
              />
              <Typography>{t("to")}</Typography>
              <TimePicker
                format="HH:mm"
                disableOpenPicker
                sx={{
                  backgroundColor: "#F5F7F8",
                  borderRadius: "8px",
                }}
                formatDensity="dense"
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { width: "5em" },
                    inputProps: { style: { textAlign: "center" } },
                  },
                }}
                value={dayjs(
                  (variables[`${day}Availability`] as EditAvailabilityInterface)
                    .to_time,
                  "HH:mm:ss"
                )}
                onChange={(value) => {
                  (
                    variables[
                      `set${
                        day.charAt(0).toUpperCase() + day.slice(1)
                      }Availability`
                    ] as React.Dispatch<
                      React.SetStateAction<EditAvailabilityInterface>
                    >
                  )((current) => {
                    const localAvailability = { ...current };
                    localAvailability.to_time = value;
                    return localAvailability;
                  });
                }}
                disabled={
                  (variables[`${day}Availability`] as EditAvailabilityInterface)
                    .is_holiday
                }
              />
            </Box>
          </Box>
        ))}
        <Box sx={{ flex: 1 }} />
        <Button
          variant="contained"
          sx={{
            width: "100%",
            color: "#FFFFFF",
            backgroundColor: "#F1C40F",
            textTransform: "none",
            "&:hover": { backgroundColor: "#e4b90f" },
          }}
          onClick={handleSave}
        >
          {t("save")}
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default EditAvailability;
