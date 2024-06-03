import { Dayjs } from "dayjs";
import { Availability } from "../state/actions/types";

export const generateSocialLoginUrl = (
  provider: "facebook" | "google",
  stateCode: string
) => {
  if (provider === "facebook") {
    return `${import.meta.env.VITE_REACT_APP_FACEBOOK_LOGIN_URL}?client_id=${
      import.meta.env.VITE_REACT_APP_FACEBOOK_CLIENT_ID
    }&redirect_uri=${location.href}&state=${stateCode}`;
  } else {
    return `${import.meta.env.VITE_REACT_APP_GOOGLE_LOGIN_URL}&client_id=${
      import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID
    }&scope=openid email profile&redirect_uri=${
      location.href
    }&state=${stateCode}`;
  }
};

export const prepareAvailability = ({
  workOnMonday,
  workOnSaturday,
  workOnSunday,
  workOnThursday,
  workOnTuesday,
  workOnWednesday,
  workOnFriday,
  fromTimeMonday,
  fromTimeSaturday,
  fromTimeSunday,
  fromTimeThursday,
  fromTimeTuesday,
  fromTimeWednesday,
  fromTimeFriday,
  toTimeMonday,
  toTimeSaturday,
  toTimeSunday,
  toTimeThursday,
  toTimeTuesday,
  toTimeWednesday,
  toTimeFriday,
}: {
  workOnSaturday: boolean;
  workOnSunday: boolean;
  workOnMonday: boolean;
  workOnTuesday: boolean;
  workOnWednesday: boolean;
  workOnThursday: boolean;
  workOnFriday: boolean;
  fromTimeSaturday: Dayjs | null;
  fromTimeSunday: Dayjs | null;
  fromTimeMonday: Dayjs | null;
  fromTimeTuesday: Dayjs | null;
  fromTimeWednesday: Dayjs | null;
  fromTimeThursday: Dayjs | null;
  fromTimeFriday: Dayjs | null;
  toTimeSaturday: Dayjs | null;
  toTimeSunday: Dayjs | null;
  toTimeMonday: Dayjs | null;
  toTimeTuesday: Dayjs | null;
  toTimeWednesday: Dayjs | null;
  toTimeThursday: Dayjs | null;
  toTimeFriday: Dayjs | null;
}) => {
  const data: Array<Availability> = [];
  data.push({
    day: "saturday",
    is_holiday: !workOnSaturday,
    from_time: fromTimeSaturday
      ? fromTimeSaturday.toString().split(" ")[4]
      : null,
    to_time: toTimeSaturday ? toTimeSaturday.toString().split(" ")[4] : null,
  });
  data.push({
    day: "sunday",
    is_holiday: !workOnSunday,
    from_time: fromTimeSunday ? fromTimeSunday.toString().split(" ")[4] : null,
    to_time: toTimeSunday ? toTimeSunday.toString().split(" ")[4] : null,
  });
  data.push({
    day: "monday",
    is_holiday: !workOnMonday,
    from_time: fromTimeMonday ? fromTimeMonday.toString().split(" ")[4] : null,
    to_time: toTimeMonday ? toTimeMonday.toString().split(" ")[4] : null,
  });
  data.push({
    day: "tuesday",
    is_holiday: !workOnTuesday,
    from_time: fromTimeTuesday
      ? fromTimeTuesday.toString().split(" ")[4]
      : null,
    to_time: toTimeTuesday ? toTimeTuesday.toString().split(" ")[4] : null,
  });
  data.push({
    day: "wednesday",
    is_holiday: !workOnWednesday,
    from_time: fromTimeWednesday
      ? fromTimeWednesday.toString().split(" ")[4]
      : null,
    to_time: toTimeWednesday ? toTimeWednesday.toString().split(" ")[4] : null,
  });
  data.push({
    day: "thursday",
    is_holiday: !workOnThursday,
    from_time: fromTimeThursday
      ? fromTimeThursday.toString().split(" ")[4]
      : null,
    to_time: toTimeThursday ? toTimeThursday.toString().split(" ")[4] : null,
  });
  data.push({
    day: "friday",
    is_holiday: !workOnFriday,
    from_time: fromTimeFriday ? fromTimeFriday.toString().split(" ")[4] : null,
    to_time: toTimeFriday ? toTimeFriday.toString().split(" ")[4] : null,
  });
  return data;
};
