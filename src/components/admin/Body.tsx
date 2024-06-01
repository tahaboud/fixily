import { Box, IconButton, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminUserIcon, NotificationBellIcon } from "../../assets/Icons";
import AdminTabs from "./AdminTabs";
import Analytics from "./Analytics";
import Dashboard from "./Dashboard";
import Queries from "./Queries";
import Settings from "./Settings";
import Tasks from "./Tasks";
import Users from "./Users";

const Body = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_e: SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };
  const getCurrentTabBody = () => {
    switch (currentTab) {
      case 0:
        return <Dashboard />;
      case 1:
        return <Users />;
      case 2:
        return <Queries />;
      case 3:
        return <Tasks />;
      case 4:
        return <Analytics />;
      case 5:
        return <Settings />;

      default:
        return <Dashboard />;
    }
  };
  const getCurrentTabTitle = () => {
    switch (currentTab) {
      case 0:
        return t("Dashboard");
      case 1:
        return t("Users");
      case 2:
        return t("Queries");
      case 3:
        return t("Tasks");
      case 4:
        return t("Analytics");
      case 5:
        return t("Settings");

      default:
        return t("Dashboard");
    }
  };
  return (
    <Box>
      <Box
        sx={{
          height: "5vh",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "10em" }} />
          <Typography>{getCurrentTabTitle()}</Typography>
        </Box>
        <Box>
          <IconButton>
            <NotificationBellIcon />
          </IconButton>
          <IconButton>
            <AdminUserIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          height: "95vh",
          display: "flex",
        }}
      >
        <AdminTabs handleChangeTab={handleChangeTab} tabNumber={currentTab} />
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#F5F7F8",
            borderRadius: "24px",
            margin: "1em",
          }}
        >
          {getCurrentTabBody()}
        </Box>
      </Box>
    </Box>
  );
};

export default Body;
