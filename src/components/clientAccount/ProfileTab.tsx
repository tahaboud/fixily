import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Switch from "react-switch";
import {
  ArtisanSwitchIcon,
  ClientSwitchIcon,
  IdVerifiedIcon,
} from "../../assets/Icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ActionEnums } from "../../state/types/actionEnums";
import { Job, User } from "../../types";
import FinishedJob from "./profileTab/FinishedJob";

const ProfileTab = ({
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
  const dispatch = useAppDispatch();

  const { jobs } = useAppSelector((state) => state.services);
  const { isArtisan } = useAppSelector((state) => state.auth);

  const [finishedJobs, setFinishedJobs] = useState<Array<Job>>([]);

  useEffect(() => {
    if (jobs) {
      const localFinishedJobs: Array<Job> = [];

      jobs.map((job) => {
        if (job.is_done) {
          localFinishedJobs.push(job);
        }
      });
      setFinishedJobs(localFinishedJobs);
    }
  }, [jobs]);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "1em",
        }}
      >
        <Box sx={{ display: "flex", gap: "1em", alignItems: "center" }}>
          {user.picture && (
            <Avatar
              src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${user.picture}`}
              sx={{ height: "3em", width: "3em" }}
            />
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
              <Typography
                sx={{ fontSize: "1.2rem" }}
              >{`${user.first_name} ${user.last_name}`}</Typography>
              {user.id_status === "verified" && <IdVerifiedIcon />}
            </Box>
            <Typography sx={{ color: "#2C3E5080" }}>{user.email}</Typography>
          </Box>
          <Box sx={{ flex: 1 }} />
          <IconButton
            onClick={() => {
              setSidePanelOpen(true);
              setSidePanelTitle("edit_profile");
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
        {user.is_artisan && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "1em 0",
            }}
          >
            <Typography fontWeight={600}>{t("switch_to_client")}</Typography>
            <Switch
              onChange={() => {
                dispatch({ type: ActionEnums.SWITCH_TO_CLIENT });
              }}
              checked={isArtisan}
              offColor="#FFFFFF"
              onColor="#FFFFFF"
              checkedIcon={
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    padding: "0 1em",
                    color: "#F1C40F",
                    transform: "translateX(0.2em)",
                  }}
                >
                  {t("artisan_cappitalized")}
                </Typography>
              }
              uncheckedIcon={
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "#447EEF",
                    transform: "translateX(-1em)",
                  }}
                >
                  {t("client_cappitalized")}
                </Typography>
              }
              checkedHandleIcon={
                <ArtisanSwitchIcon sx={{ fontSize: "1.7rem" }} />
              }
              uncheckedHandleIcon={
                <ClientSwitchIcon sx={{ fontSize: "1.7rem" }} />
              }
              height={30}
              width={100}
              className="artisan-switch"
            />
          </Box>
        )}
        <Typography fontWeight={600} margin={"1em 0"}>
          {t("bio")}
        </Typography>
        <Typography sx={{ color: "#2C3E5080" }}>{user.bio}</Typography>
      </Box>
      <Typography
        sx={{
          color: "#2C3E50",
          fontWeight: 600,
          fontSize: "1.2rem",
          margin: "1em 0",
        }}
      >
        {t("completed_jobs")}
      </Typography>

      {finishedJobs.length === 0 ? (
        <Typography>{t("No finished jobs")}</Typography>
      ) : (
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {finishedJobs.map((job) => (
            <FinishedJob
              key={job.id}
              job={job}
              setSelectedJob={setSelectedJob}
              setSidePanelOpen={setSidePanelOpen}
              setSidePanelTitle={setSidePanelTitle}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProfileTab;
