import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Job, User } from "../../types";
import EditAvailability from "./sidePanel/EditAvailability";
import EditProfile from "./sidePanel/EditProfile";
import EditSubCategories from "./sidePanel/EditSubCategories";
import JobDetails from "./sidePanel/JobDetails";
import NearbyJobs from "./sidePanel/NearbyJobs";

const SidePanel = ({
  title,
  jobs,
  job,
  user,
  setSelectedJob,
  setSidePanelTitle,
  setSidePanelOpen,
}: {
  title: string;
  jobs: Array<Job> | null;
  job: Job | null;
  user: User | null;
  setSelectedJob: Dispatch<SetStateAction<Job | null>>;
  setSidePanelTitle: Dispatch<SetStateAction<string>>;
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();

  const getCurrentBody = () => {
    switch (title) {
      case "nearby_jobs":
        return (
          <NearbyJobs
            jobs={jobs}
            setSelectedJob={setSelectedJob}
            setSidePanelTitle={setSidePanelTitle}
          />
        );

      case "job_details":
        if (job) {
          return <JobDetails job={job} />;
        }
        break;

      case "edit_profile":
        if (user) {
          return (
            <EditProfile user={user} setSidePanelOpen={setSidePanelOpen} />
          );
        }
        break;

      case "edit_availability":
        if (user) {
          return (
            <EditAvailability user={user} setSidePanelOpen={setSidePanelOpen} />
          );
        }
        break;

      case "edit_sub_categories":
        if (user) {
          return (
            <EditSubCategories
              user={user}
              setSidePanelOpen={setSidePanelOpen}
            />
          );
        }
        break;

      default:
        return (
          <NearbyJobs
            jobs={jobs}
            setSelectedJob={setSelectedJob}
            setSidePanelTitle={setSidePanelTitle}
          />
        );
    }
  };

  const getCurrentTitle = () => {
    switch (title) {
      case "nearby_jobs":
        return t("nearby_jobs");
      case "job_details":
        return t("offers");
      case "edit_profile":
        return t("edit_profile");
      case "edit_availability":
        return t("edit_availability");
      case "edit_sub_categories":
        return t("edit_sub_categories");
      default:
        return t(title);
    }
  };

  const handleCloseSidePanel = () => {
    switch (title) {
      case "nearby_jobs":
        return;
      case "job_details":
        setSelectedJob(null);
        setSidePanelTitle("nearby_jobs");
        return;
      case "edit_profile":
        setSidePanelOpen(false);
        return;
      case "edit_availability":
        setSidePanelOpen(false);
        return;
      case "edit_sub_categories":
        setSidePanelOpen(false);
        return;

      default:
        return;
    }
  };

  return (
    <Box
      className="scrollbar"
      sx={{
        width: "40em",
        height: "100%",
        maxHeight: "100vh",
        backgroundColor: "#FFFFFF",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "5em",
        }}
      >
        <Typography
          sx={{ fontSize: "1.2rem", padding: "1em", fontWeight: "600" }}
        >
          {getCurrentTitle()}
        </Typography>
        {title !== "nearby_jobs" ? (
          <IconButton onClick={handleCloseSidePanel}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </Box>
      {getCurrentBody()}
    </Box>
  );
};

export default SidePanel;
