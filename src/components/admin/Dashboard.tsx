import { Box } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { adminGetJobs, adminGetUsers } from "../../state/actions/adminAction";
import ArtisansCountCard from "./dashboardTab/ArtisansCountCard";
import ClientsCountCard from "./dashboardTab/ClientsCountCard";
import JobsCountCard from "./dashboardTab/JobsCountCard";
import JoinedUsersCard from "./dashboardTab/JoinedUsersCard";
import QueriesCountCard from "./dashboardTab/QueriesCountCard";
import SubscriberTrendCard from "./dashboardTab/SubscriberTrendCard";

const Dashboard = ({
  setCurrentTab,
  setSelectedUserType,
}: {
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  setSelectedUserType: React.Dispatch<
    React.SetStateAction<"clients" | "artisans" | "admins">
  >;
}) => {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);
  const { users, jobs } = useAppSelector((state) => state.admin);

  useEffect(() => {
    if (token) {
      dispatch(adminGetUsers({ token }));
      dispatch(adminGetJobs({ token }));
    }
  }, [token, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1em",
          alignItems: "center",
        }}
      >
        <ClientsCountCard
          users={users}
          setSelectedUserType={setSelectedUserType}
          setCurrentTab={setCurrentTab}
        />
        <ArtisansCountCard
          users={users}
          setSelectedUserType={setSelectedUserType}
          setCurrentTab={setCurrentTab}
        />
        <QueriesCountCard jobs={jobs} setCurrentTab={setCurrentTab} />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1em",
          flex: 1,
        }}
      >
        <SubscriberTrendCard setCurrentTab={setCurrentTab} users={users} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <JobsCountCard jobs={jobs} setCurrentTab={setCurrentTab} />
          <JoinedUsersCard users={users} setCurrentTab={setCurrentTab} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
