import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { adminCreateAdmin } from "../../../state/actions/adminAction";

const CreateAdminComponent = ({
  setScreenToShow,
}: {
  setScreenToShow: React.Dispatch<
    React.SetStateAction<"table" | "editing" | "creating">
  >;
}) => {
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const handleCreateAdmin = () => {
    if (token) {
      dispatch(
        adminCreateAdmin({ token, firstName, lastName, email, password })
      );
      setScreenToShow("table");
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        height: "90vh",
        width: "100%",
        borderRadius: "16px",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            margin: "2em",
            padding: "2em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2em",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
            {t("Add a new admin")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
              {t("First Name")}
            </Typography>
            <TextField
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
              {t("Last Name")}
            </Typography>
            <TextField
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
              {t("Email")}
            </Typography>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
              {t("Password")}
            </Typography>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
              {t("RePassword")}
            </Typography>
            <TextField
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F1C40F",
                textTransform: "none",
                "&:hover": { backgroundColor: "#e9bc07" },
              }}
              onClick={() => setScreenToShow("table")}
            >
              {t("Cancel")}
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#447EEF",
                textTransform: "none",
                "&:hover": { backgroundColor: "#3371ec" },
              }}
              onClick={handleCreateAdmin}
            >
              {t("Save")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateAdminComponent;
