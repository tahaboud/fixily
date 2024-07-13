import AddIcon from "@mui/icons-material/Add";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getChatRooms } from "../../state/actions/chatAction";
import { clientGetJobs } from "../../state/actions/servicesAction";
import { Job, User } from "../../types";
import Chat from "./homeTab/Chat";
import Demand from "./homeTab/Demand";

const HomeTab = ({
  user,
  setSidePanelOpen,
  setSidePanelTitle,
  setSelectedJob,
}: {
  user: User;
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
  setSidePanelTitle: Dispatch<SetStateAction<string>>;
  setSelectedJob: Dispatch<SetStateAction<Job | null>>;
}) => {
  const { t } = useTranslation();
  const { jobs } = useAppSelector((state) => state.services);
  const { rooms } = useAppSelector((state) => state.chat);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      dispatch(clientGetJobs({ token }));
      dispatch(getChatRooms({ token }));
    }
  }, [token, dispatch]);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <Avatar
            src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${user.picture}`}
            sx={{ width: "3em", height: "3em" }}
          />
          <Typography sx={{ fontSize: "1.2rem" }}>{`${t("hello")}, ${
            user.first_name
          }`}</Typography>
        </Box>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ textTransform: "none", borderRadius: "16px" }}
          onClick={() => {
            setSidePanelOpen(true);
            setSidePanelTitle("add_new_job");
          }}
        >
          {t("add_new_job")}
        </Button>
      </Box>
      <Typography sx={{ fontSize: "1.3rem", margin: "1em 0" }}>
        {t("my_jobs")}
      </Typography>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          overflow: "hidden",
          margin: "1em 0",
          maxHeight: "20em",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "128px",
            cursor: "pointer",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <Demand
              key={job.id}
              job={job}
              setSidePanelOpen={setSidePanelOpen}
              setSidePanelTitle={setSidePanelTitle}
              setSelectedJob={setSelectedJob}
            />
          ))
        ) : (
          <Typography
            sx={{ padding: "1em", textAlign: "center", fontSize: "1.2rem" }}
          >
            {t("no_active_jobs")}
          </Typography>
        )}
      </Box>
      <Typography sx={{ fontSize: "1.3rem", margin: "1em 0" }}>
        {t("open_in_app")}
      </Typography>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          overflow: "hidden",
          margin: "1em 0",
        }}
      >
        {rooms && rooms.map((room) => <Chat key={room.id} chatRoom={room} />)}
      </Box>
    </Box>
  );
};

export default HomeTab;
