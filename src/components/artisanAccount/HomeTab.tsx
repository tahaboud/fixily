import { Avatar, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { artisanGetPreviousJobs } from "../../state/actions/servicesAction";
import { User } from "../../types";
import PreviousJobComponent from "./homeTab/PreviousJobComponent";

const HomeTab = ({ user }: { user: User }) => {
  const { t } = useTranslation();
  const { previousJobs } = useAppSelector((state) => state.services);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      dispatch(artisanGetPreviousJobs({ token }));
    }
  }, [token, dispatch]);
  return (
    <Box>
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
      <Typography sx={{ fontSize: "1.3rem", margin: "1em 0" }}>
        {t("previous_jobs")}
      </Typography>
      <Box
        className="scrollbar"
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          overflow: "hidden",
          margin: "1em 0",
          overflowY: "auto",
          maxHeight: "43em",
        }}
      >
        {previousJobs === null || previousJobs.length === 0 ? (
          <Typography
            sx={{
              margin: "1em",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
          >
            {t("no_previous_jobs")}
          </Typography>
        ) : (
          <>
            {previousJobs.map((job) => (
              <PreviousJobComponent key={job.id} job={job} />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default HomeTab;
