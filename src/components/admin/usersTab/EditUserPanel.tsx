import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DeactivateUserIcon, EditUserIcon } from "../../../assets/Icons";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { adminUpdateUser } from "../../../state/actions/adminAction";
import { User } from "../../../types";

const EditUserPanel = ({
  setSelectedUser,
  selectedUser,
  setScreenToShow,
}: {
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedUser: User;
  setScreenToShow: React.Dispatch<
    React.SetStateAction<"table" | "editing" | "creating">
  >;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { token, data: currentUser } = useAppSelector((state) => state.auth);
  const handleToggleAdminPrivileges = () => {
    if (token) {
      dispatch(
        adminUpdateUser({
          token,
          userId: selectedUser.id,
          isAdmin: !selectedUser.is_admin,
        })
      );
    }
  };
  const handleToggleActivateUser = () => {
    if (token) {
      dispatch(
        adminUpdateUser({
          token,
          userId: selectedUser.id,
          isActive: !selectedUser.is_active,
        })
      );
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        boxShadow: "0px 4px 8px 0px #00000017",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "calc(70vh-1em)",
        minWidth: "20em",
        padding: "1em",
        gap: "1em",
        position: "relative",
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: "0", right: "0" }}
        onClick={() => setSelectedUser(null)}
      >
        <CloseIcon />
      </IconButton>
      <Box
        sx={{
          width: "10em",
          height: "10em",
          borderRadius: "50%",
          backgroundImage: `url(${selectedUser.picture})`,
          backgroundColor: "#000000",
        }}
      />
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        {selectedUser.first_name} {selectedUser.last_name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography sx={{ width: "100%", fontWeight: 600, fontSize: "1.2rem" }}>
          {t("Email")}
        </Typography>
        <Typography>{selectedUser.email}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography sx={{ width: "100%", fontWeight: 600, fontSize: "1.2rem" }}>
          {t("Phone")}
        </Typography>
        <Typography>{selectedUser.phone_number}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography sx={{ width: "100%", fontWeight: 600, fontSize: "1.2rem" }}>
          {t("Location")}
        </Typography>
        <Typography>
          {selectedUser.wilaya ? selectedUser.wilaya.name_en : t("None")},
          {selectedUser.commune ? selectedUser.commune.name_en : t("None")}
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }} />
      <Button
        variant="contained"
        fullWidth
        startIcon={<EditUserIcon sx={{ height: "1.4em", width: "1.4em" }} />}
        sx={{
          backgroundColor: "#447EEF",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1.1rem",
        }}
        onClick={() => {
          setScreenToShow("editing");
        }}
      >
        {t("Edit")}
      </Button>
      {currentUser && currentUser.is_superuser && (
        <Button
          variant="contained"
          fullWidth
          startIcon={
            <AdminPanelSettingsIcon sx={{ height: "1.4em", width: "1.4em" }} />
          }
          sx={{
            backgroundColor: "#1ABC9C",
            "&:hover": { backgroundColor: "#10c09d" },
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1.1rem",
          }}
          onClick={handleToggleAdminPrivileges}
        >
          {selectedUser.is_admin
            ? t("Grant Admin Previleges")
            : t("Remove Admin Previleges")}
        </Button>
      )}
      <Button
        variant="contained"
        fullWidth
        startIcon={
          <DeactivateUserIcon sx={{ height: "1.4em", width: "1.4em" }} />
        }
        sx={{
          backgroundColor: "#F1C40F",
          "&:hover": { backgroundColor: "#f1c204" },
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1.1rem",
        }}
        onClick={handleToggleActivateUser}
      >
        {selectedUser.is_active ? t("Deactivate User") : t("Activate User")}
      </Button>
    </Box>
  );
};

export default EditUserPanel;
