import { MenuItem, Typography } from "@mui/material";
import { SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Notification } from "../../types";

const NotificationComponent = ({
  notification,
  setAnchorEl,
}: {
  notification: Notification;
  setAnchorEl: (value: SetStateAction<HTMLElement | null>) => void;
}) => {
  const { t } = useTranslation();
  return (
    <MenuItem sx={{ padding: "1em" }} onClick={() => setAnchorEl(null)}>
      <Typography>{t(notification.notification_type)}</Typography>
    </MenuItem>
  );
};

export default NotificationComponent;
