import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent } from "react";
import {
  AdminPanelActiveTab1Icon,
  AdminPanelActiveTab2Icon,
  AdminPanelActiveTab3Icon,
  AdminPanelActiveTab4Icon,
  AdminPanelActiveTab5Icon,
  AdminPanelActiveTab6Icon,
  AdminPanelTab1Icon,
  AdminPanelTab2Icon,
  AdminPanelTab3Icon,
  AdminPanelTab4Icon,
  AdminPanelTab5Icon,
  AdminPanelTab6Icon,
} from "../../assets/Icons";

const AdminTabs = ({
  tabNumber,
  handleChangeTab,
}: {
  tabNumber: number;
  handleChangeTab: (e: SyntheticEvent, value: number) => void;
}) => {
  return (
    <Box
      sx={{
        width: "10em",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="standard"
        value={tabNumber}
        onChange={handleChangeTab}
        TabIndicatorProps={{ sx: { display: "none" } }}
        sx={{ width: "100%", "& .MuiTabs-flexContainer": { gap: "1.2em" } }}
      >
        <Tab
          icon={
            tabNumber === 0 ? (
              <AdminPanelActiveTab1Icon sx={{ fontSize: "2.5rem" }} />
            ) : (
              <AdminPanelTab1Icon sx={{ fontSize: "2.5rem" }} />
            )
          }
          value={0}
        />
        <Tab
          icon={
            tabNumber === 1 ? (
              <AdminPanelActiveTab2Icon sx={{ fontSize: "2.5rem" }} />
            ) : (
              <AdminPanelTab2Icon sx={{ fontSize: "2.5rem" }} />
            )
          }
          value={1}
        />
        <Tab
          icon={
            tabNumber === 2 ? (
              <AdminPanelActiveTab3Icon sx={{ fontSize: "2.5rem" }} />
            ) : (
              <AdminPanelTab3Icon sx={{ fontSize: "2.5rem" }} />
            )
          }
          value={2}
        />
        <Tab
          icon={
            tabNumber === 3 ? (
              <AdminPanelActiveTab4Icon sx={{ fontSize: "2.5rem" }} />
            ) : (
              <AdminPanelTab4Icon sx={{ fontSize: "2.5rem" }} />
            )
          }
          value={3}
        />
        <Tab
          icon={
            tabNumber === 4 ? (
              <AdminPanelActiveTab5Icon sx={{ fontSize: "2.5rem" }} />
            ) : (
              <AdminPanelTab5Icon sx={{ fontSize: "2.5rem" }} />
            )
          }
          value={4}
        />
        <Tab
          icon={
            tabNumber === 5 ? (
              <AdminPanelActiveTab6Icon sx={{ fontSize: "2.5rem" }} />
            ) : (
              <AdminPanelTab6Icon sx={{ fontSize: "2.5rem" }} />
            )
          }
          value={5}
        />
      </Tabs>
    </Box>
  );
};

export default AdminTabs;
