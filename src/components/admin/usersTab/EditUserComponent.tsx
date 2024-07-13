import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { adminUpdateUser } from "../../../state/actions/adminAction";
import { User } from "../../../types";

const EditUserComponent = ({
  setScreenToShow,
  selectedUser,
  currentUser,
}: {
  setScreenToShow: React.Dispatch<
    React.SetStateAction<"table" | "editing" | "creating">
  >;
  selectedUser: User;
  currentUser: User;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const [points, setPoints] = useState(selectedUser.points);
  const handleSave = () => {
    if (token) {
      dispatch(adminUpdateUser({ token, userId: selectedUser.id, points }));
      setScreenToShow("table");
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        height: "100%",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "20em",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          {t("First Name")}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {selectedUser.first_name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "20em",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          {t("Last Name")}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {selectedUser.last_name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "20em",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          {t("Phone")}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {selectedUser.phone_number}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "20em",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          {t("Email")}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {selectedUser.email}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "20em",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          {t("Is Verified")}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {selectedUser.id_status}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "20em",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          {t("Is Email Verified")}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {selectedUser.is_email_verified ? t("Yes") : t("No")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "20em",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          {t("Wilaya")}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {selectedUser.wilaya ? selectedUser.wilaya.name_en : t("None")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "20em",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          {t("Commune")}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {selectedUser.commune ? selectedUser.commune.name_en : t("None")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "20em",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          {t("Joined")}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {Intl.DateTimeFormat("en-US").format(
            new Date(selectedUser.created_at)
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "20em",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          {t("Is Active")}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {selectedUser.is_active ? t("Yes") : t("No")}
        </Typography>
      </Box>
      {selectedUser.is_artisan && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "20em",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
            {t("Points")}
          </Typography>
          <TextField
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            sx={{
              backgroundColor: "#F5F7F8",
              borderRadius: "8px",
            }}
            inputProps={{ min: "0" }}
            size="small"
          />
        </Box>
      )}
      {currentUser.is_superuser && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "20em",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
            {t("Is Admin")}
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>
            {selectedUser.is_admin ? t("Yes") : t("No")}
          </Typography>
        </Box>
      )}
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
            backgroundColor: "#447EEF",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#3772e7" },
          }}
          onClick={() => setScreenToShow("table")}
        >
          {t("Cancel")}
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1ABC9C",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#12b392" },
          }}
          onClick={handleSave}
        >
          {t("Save")}
        </Button>
      </Box>
    </Box>
  );
};

export default EditUserComponent;
