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
        sx={{ width: "100%" }}
      >
        <Tab
          icon={
            tabNumber === 0 ? (
              <AdminPanelActiveTab1Icon />
            ) : (
              <AdminPanelTab1Icon />
            )
          }
          value={0}
        />
        <Tab
          icon={
            tabNumber === 1 ? (
              <AdminPanelActiveTab2Icon />
            ) : (
              <AdminPanelTab2Icon />
            )
          }
          value={1}
        />
        <Tab
          icon={
            tabNumber === 2 ? (
              <AdminPanelActiveTab3Icon />
            ) : (
              <AdminPanelTab3Icon />
            )
          }
          value={2}
        />
        <Tab
          icon={
            tabNumber === 3 ? (
              <AdminPanelActiveTab4Icon />
            ) : (
              <AdminPanelTab4Icon />
            )
          }
          value={3}
        />
        <Tab
          icon={
            tabNumber === 4 ? (
              <AdminPanelActiveTab5Icon />
            ) : (
              <AdminPanelTab5Icon />
            )
          }
          value={4}
        />
        <Tab
          icon={
            tabNumber === 5 ? (
              <AdminPanelActiveTab6Icon />
            ) : (
              <AdminPanelTab6Icon />
            )
          }
          value={5}
        />
      </Tabs>
    </Box>
  );
};

export default AdminTabs;
