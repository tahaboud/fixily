import { Badge, Box, IconButton, Menu, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminUserIcon, NotificationBellIcon } from "../../assets/Icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getNotifications,
  markNotificationsAsRead,
} from "../../state/actions/authActions";
import AdminTabs from "./AdminTabs";
import Analytics from "./Analytics";
import Dashboard from "./Dashboard";
import NotificationComponent from "./NotificationComponent";
import Queries from "./Queries";
import Settings from "./Settings";
import Tasks from "./Tasks";
import Users from "./Users";

const Body = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [currentTab, setCurrentTab] = useState(0);
  const [selectedUserType, setSelectedUserType] = useState<
    "clients" | "artisans" | "admins"
  >("clients");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const notificationMenuOpen = Boolean(anchorEl);

  const { notifications, token } = useAppSelector((state) => state.auth);

  const handleChangeTab = (_e: SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  const handleOpenNotifications = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(e.currentTarget);
    if (token) {
      dispatch(markNotificationsAsRead({ token }));
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getNotifications({ token }));
    }
  }, [dispatch, token]);

  const getCurrentTabBody = () => {
    switch (currentTab) {
      case 0:
        return (
          <Dashboard
            setSelectedUserType={setSelectedUserType}
            setCurrentTab={setCurrentTab}
          />
        );
      case 1:
        return (
          <Users
            selectedUserType={selectedUserType}
            setSelectedUserType={setSelectedUserType}
          />
        );
      case 2:
        return <Queries />;
      case 3:
        return <Tasks />;
      case 4:
        return <Analytics />;
      case 5:
        return <Settings />;

      default:
        return (
          <Dashboard
            setSelectedUserType={setSelectedUserType}
            setCurrentTab={setCurrentTab}
          />
        );
    }
  };

  const getCurrentTabTitle = () => {
    switch (currentTab) {
      case 0:
        return t("dashboard");
      case 1:
        return t("users");
      case 2:
        return t("queries");
      case 3:
        return t("tasks");
      case 4:
        return t("analytics");
      case 5:
        return t("settings");

      default:
        return t("dashboard");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          height: "5em",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "10em" }} />
          <Typography sx={{ fontSize: "1.6rem", fontWeight: 700 }}>
            {getCurrentTabTitle()}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={(e) => handleOpenNotifications(e)}>
            {notifications && notifications.unseen_notifications_count !== 0 ? (
              <Badge
                badgeContent={notifications.unseen_notifications_count}
                color="primary"
              >
                <NotificationBellIcon />
              </Badge>
            ) : (
              <NotificationBellIcon />
            )}
          </IconButton>

          <IconButton>
            <AdminUserIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          height: "calc(100vh - 5em)",
          display: "flex",
          padding: "0 2em 2em 0",
        }}
      >
        <AdminTabs handleChangeTab={handleChangeTab} tabNumber={currentTab} />
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#F5F7F8",
            borderRadius: "24px",
            padding: "1em",
          }}
        >
          {getCurrentTabBody()}
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={notificationMenuOpen}
          onClose={() => setAnchorEl(null)}
        >
          {notifications &&
            notifications.notifications.map((notification) => (
              <NotificationComponent
                key={notification.id}
                setAnchorEl={setAnchorEl}
                notification={notification}
              />
            ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default Body;
