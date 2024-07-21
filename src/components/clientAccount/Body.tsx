import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Badge, Box, Button, IconButton, Menu, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import blackLogo from "../../assets/black-logo.svg";
import {
  HomeTabFilledIcon,
  HomeTabOutlinedIcon,
  ProfileTabFilledIcon,
  ProfileTabOutlinedIcon,
  SupportTabFilledIcon,
  SupportTabOutlinedIcon,
} from "../../assets/Icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getNotifications,
  logout,
  markNotificationsAsRead,
} from "../../state/actions/authActions";
import { Job } from "../../types";
import HomeTab from "./HomeTab";
import NotificationComponent from "./NotificationComponent";
import ProfileTab from "./ProfileTab";
import SidePanel from "./SidePanel";
import SupportTab from "./SupportTab";

const Body = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { data, notifications, token } = useAppSelector((state) => state.auth);

  const [currentTab, setCurrentTab] = useState(0);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sidePanelTitle, setSidePanelTitle] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const notificationMenuOpen = Boolean(anchorEl);

  const handleSignOut = () => {
    if (token) {
      dispatch(logout({ token }));
    }
  };

  const getCurrentTabContent = () => {
    if (data) {
      switch (currentTab) {
        case 0:
          return (
            <HomeTab
              user={data}
              setSidePanelOpen={setSidePanelOpen}
              setSidePanelTitle={setSidePanelTitle}
              setSelectedJob={setSelectedJob}
            />
          );
        case 1:
          return (
            <ProfileTab
              user={data}
              setSidePanelOpen={setSidePanelOpen}
              setSidePanelTitle={setSidePanelTitle}
              setSelectedJob={setSelectedJob}
            />
          );
        case 2:
          return <SupportTab />;
        default:
          return (
            <HomeTab
              user={data}
              setSidePanelOpen={setSidePanelOpen}
              setSidePanelTitle={setSidePanelTitle}
              setSelectedJob={setSelectedJob}
            />
          );
      }
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getNotifications({ token }));
    }
  }, [dispatch, token]);

  const handleOpenNotifications = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(e.currentTarget);
    if (token) {
      dispatch(markNotificationsAsRead({ token }));
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#FFFFFF",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          margin: "1em",
          backgroundColor: "#F7F9F9",
          borderRadius: "24px",
          display: "flex",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "20em",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={blackLogo} />
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              height: "100%",
              borderRadius: "48px",
              width: "calc(100% - 2em)",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={currentTab}
              onChange={(_event, value) => {
                setCurrentTab(value);
                setSidePanelOpen(false);
              }}
              sx={{
                height: "100%",
                position: "relative",
                "& .MuiTabs-flexContainer": {
                  height: "100%",
                  justifyContent: "center",
                },
              }}
              TabIndicatorProps={{
                sx: {
                  backgroundColor: "#000000",
                  width: "0.3em",
                  left: "0",
                },
              }}
            >
              <Tab
                label={t("Home")}
                icon={
                  currentTab === 0 ? (
                    <HomeTabFilledIcon />
                  ) : (
                    <HomeTabOutlinedIcon />
                  )
                }
                iconPosition="start"
                value={0}
                sx={{ textTransform: "none", fontSize: "1.1rem" }}
              />
              <Tab
                label={t("Profile")}
                icon={
                  currentTab === 1 ? (
                    <ProfileTabFilledIcon />
                  ) : (
                    <ProfileTabOutlinedIcon />
                  )
                }
                iconPosition="start"
                value={1}
                sx={{ textTransform: "none", fontSize: "1.1rem" }}
              />
              <Tab
                label={t("Support")}
                icon={
                  currentTab === 2 ? (
                    <SupportTabFilledIcon />
                  ) : (
                    <SupportTabOutlinedIcon />
                  )
                }
                iconPosition="start"
                value={2}
                sx={{ textTransform: "none", fontSize: "1.1rem" }}
              />
              <Button
                startIcon={<LogoutIcon sx={{ height: "1em", width: "1em" }} />}
                variant="text"
                sx={{
                  color: "#FC4848",
                  position: "absolute",
                  bottom: "5%",
                  textTransform: "none",
                  width: "100%",
                  fontSize: "1rem",
                }}
                onClick={handleSignOut}
              >
                {t("signout")}
              </Button>
            </Tabs>
          </Box>
        </Box>
        <hr />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              height: "2em",
              margin: "1em",
            }}
          >
            <IconButton onClick={(e) => handleOpenNotifications(e)}>
              {notifications &&
              notifications.unseen_notifications_count !== 0 ? (
                <Badge
                  badgeContent={notifications.unseen_notifications_count}
                  color="primary"
                >
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              ) : (
                <NotificationsNoneOutlinedIcon />
              )}
            </IconButton>
          </Box>
          <Box sx={{ height: "100%", margin: "1em" }}>
            {getCurrentTabContent()}
          </Box>
        </Box>
      </Box>
      {sidePanelOpen && (
        <SidePanel
          setSidePanelOpen={setSidePanelOpen}
          title={sidePanelTitle}
          job={selectedJob}
          user={data}
        />
      )}
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
  );
};

export default Body;
