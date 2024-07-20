import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { adminGetJobs, adminGetUsers } from "../../state/actions/adminAction";
import ActiveUsersCount from "./analyticsTab/ActiveUsersCount";
import AverageTimeOfJobCompletion from "./analyticsTab/AverageTimeOfJobCompletion";
import Buttons from "./analyticsTab/Buttons";
import Chart from "./analyticsTab/Chart";
import TasksPostedCount from "./analyticsTab/TasksPostedCount";
import {
  categorizeJobsDoneByMonth,
  categorizeTotalJobsByMonth,
  countUsersBeforeEachMonth,
  getUserPercentageForInactiveUsers,
} from "./utils";

const Analytics = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { token } = useAppSelector((state) => state.auth);
  const { users, jobs } = useAppSelector((state) => state.admin);

  const [selectedChartType, setSelectedChartType] = useState<
    "user_growth" | "task_fill_rate" | "user_retention"
  >("user_growth");
  const [xData, setXData] = useState<Array<number>>([]);
  const [yData, setYData] = useState<
    Array<{
      data: Array<number>;
      area?: boolean;
      color: string;
      label?: string;
    }>
  >([]);

  useEffect(() => {
    if (token) {
      dispatch(adminGetUsers({ token }));
      dispatch(adminGetJobs({ token }));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (users && selectedChartType === "user_growth") {
      setXData([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      setYData([
        {
          data: countUsersBeforeEachMonth(users),
          area: true,
          color: "#447EEF",
        },
      ]);
    } else if (jobs && selectedChartType === "task_fill_rate") {
      setXData([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      setYData([
        {
          data: categorizeTotalJobsByMonth(jobs),
          label: t("total_jobs"),
          color: "#447EEF",
        },
        {
          data: categorizeJobsDoneByMonth(jobs),
          label: t("jobs_done"),
          color: "#F1C40F",
        },
      ]);
    } else if (users && selectedChartType === "user_retention") {
      setXData([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      setYData([
        {
          data: getUserPercentageForInactiveUsers(users),
          area: true,
          color: "#FC4848",
        },
      ]);
      console.log(getUserPercentageForInactiveUsers(users));
    }
  }, [users, selectedChartType, jobs, t]);

  return (
    <Box sx={{ height: "100%" }}>
      <Chart title={selectedChartType} xData={xData} yData={yData} />
      <Buttons
        selectedChart={selectedChartType}
        setSelectedChart={setSelectedChartType}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1em",
          height: "40%",
        }}
      >
        <ActiveUsersCount users={users} />
        <TasksPostedCount jobs={jobs} />
        <AverageTimeOfJobCompletion jobs={jobs} />
      </Box>
    </Box>
  );
};

export default Analytics;
