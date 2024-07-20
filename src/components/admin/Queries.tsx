import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { adminGetJobs } from "../../state/actions/adminAction";
import Cards from "./queriesTab/Cards";
import JobsTable from "./queriesTab/JobsTable";

const Queries = () => {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);
  const { jobs } = useAppSelector((state) => state.admin);

  const [openJobsCount, setOpenJobsCount] = useState(0);
  const [matchedJobsCount, setMatchedJobsCount] = useState(0);
  const [archivedJobsCount, setArchivedJobsCount] = useState(0);

  useEffect(() => {
    if (token) {
      dispatch(adminGetJobs({ token }));
    }
  }, [token]);

  useEffect(() => {
    if (jobs) {
      setOpenJobsCount(
        jobs.filter((job) => job.artisan === null && !job.is_done).length
      );
      setMatchedJobsCount(
        jobs.filter((job) => job.artisan !== null && !job.is_done).length
      );
      setArchivedJobsCount(jobs.filter((job) => job.is_done).length);
    }
  }, [jobs]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        height: "100%",
      }}
    >
      <Cards
        openJobsCount={openJobsCount}
        matchedJobsCount={matchedJobsCount}
        archivedJobsCount={archivedJobsCount}
      />
      <JobsTable jobs={jobs} />
    </Box>
  );
};

export default Queries;
