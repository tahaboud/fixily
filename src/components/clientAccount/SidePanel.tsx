import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Job, User } from "../../types";
import CompletedJob from "./sidePanel/CompletedJob";
import CreateNewJobBody from "./sidePanel/createNewJob/Body";
import EditProfile from "./sidePanel/editProfile/Body";
import JobDetails from "./sidePanel/jobDetails/Body";

const SidePanel = ({
  title,
  setSidePanelOpen,
  job,
  user,
}: {
  title: string;
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
  job: Job | null;
  user: User | null;
}) => {
  const { t } = useTranslation();

  const getCurrentBody = () => {
    switch (title) {
      case "add_new_job":
        return <CreateNewJobBody setSidePanelOpen={setSidePanelOpen} />;

      case "edit_job":
        if (job) {
          return <JobDetails job={job} setSidePanelOpen={setSidePanelOpen} />;
        }
        break;

      case "edit_profile":
        if (user) {
          return (
            <EditProfile user={user} setSidePanelOpen={setSidePanelOpen} />
          );
        }
        break;

      case "completed_job":
        if (job) {
          return <CompletedJob job={job} />;
        }
        break;

      default:
        return <CreateNewJobBody setSidePanelOpen={setSidePanelOpen} />;
    }
  };

  const getCurrentTitle = () => {
    switch (title) {
      case "add_new_job":
        return t(title);

      case "edit_job":
      case "completed_job":
        if (job) {
          return job.sub_category.name_en;
        }
        return t(title);

      case "edit_profile":
        return t(title);

      default:
        return t(title);
    }
  };

  return (
    <Box
      sx={{
        width: "40em",
        height: "100%",
        maxHeight: "100vh",
        backgroundColor: "#FFFFFF",
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
        <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
          {getCurrentTitle()}
        </Typography>
        <IconButton onClick={() => setSidePanelOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      {getCurrentBody()}
    </Box>
  );
};

export default SidePanel;
