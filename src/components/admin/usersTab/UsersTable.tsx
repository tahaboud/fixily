import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AdminsUserTypeIcon,
  ArtisansUserTypeIcon,
  ClientsUserTypeIcon,
} from "../../../assets/Icons";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { adminGetUsers } from "../../../state/actions/adminAction";
import { User } from "../../../types";
import EditUserPanel from "./EditUserPanel";

const UsersTable = ({
  setNumOfArtisans,
  setNumOfClients,
  setNumOfJoinedToday,
  setSelectedUser,
  selectedUser,
  setScreenToShow,
}: {
  setNumOfClients: React.Dispatch<React.SetStateAction<number>>;
  setNumOfArtisans: React.Dispatch<React.SetStateAction<number>>;
  setNumOfJoinedToday: React.Dispatch<React.SetStateAction<number>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedUser: User | null;
  setScreenToShow: React.Dispatch<
    React.SetStateAction<"table" | "editing" | "creating">
  >;
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [selectedUserType, setSelectedUserType] = useState<
    "clients" | "artisans" | "admins"
  >("clients");
  const { token, data: currentUser } = useAppSelector((state) => state.auth);
  const { data } = useAppSelector((state) => state.admin);
  const [users, setUsers] = useState<Array<User>>([]);
  useEffect(() => {
    if (token) {
      dispatch(adminGetUsers({ token }));
    }
  }, [dispatch, token]);
  useEffect(() => {
    if (data) {
      const localAdmins: Array<User> = [];
      const localClients: Array<User> = [];
      const localArtisans: Array<User> = [];
      let numOfJoinedToday = 0;
      const today = new Date();
      data.map((user) => {
        const userJoinedOn = new Date(user.created_at);
        if (userJoinedOn === today) {
          numOfJoinedToday += 1;
        }
        if (user.is_admin) {
          localAdmins.push(user);
        } else if (user.is_artisan) {
          localArtisans.push(user);
        } else {
          localClients.push(user);
        }
      });
      if (selectedUserType === "admins") {
        setUsers(localAdmins);
      } else if (selectedUserType === "artisans") {
        setUsers(localArtisans);
      } else {
        setUsers(localClients);
      }
      setNumOfArtisans(localArtisans.length);
      setNumOfClients(localClients.length);
      setNumOfJoinedToday(numOfJoinedToday);
    }
  }, [
    data,
    selectedUserType,
    setNumOfArtisans,
    setNumOfClients,
    setNumOfJoinedToday,
  ]);
  return (
    <Box sx={{ display: "flex", gap: "1em" }}>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0px 4px 8px 0px #00000017",
          height: "70vh",
          flex: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "1em",
            gap: "1em",
          }}
        >
          <Button
            startIcon={
              <ClientsUserTypeIcon
                sx={{
                  "&>path": {
                    fill:
                      selectedUserType === "clients" ? "#FFFFFF" : "#939CA6",
                  },
                }}
              />
            }
            sx={{
              backgroundColor:
                selectedUserType === "clients" ? "#447EEF" : "#F9FBFB",
              color: selectedUserType === "clients" ? "#FFFFFF" : "#939CA6",
              borderRadius: "24px",
              textTransform: "none",
              padding: "0.5em 1em",
              "&:hover": {
                backgroundColor:
                  selectedUserType === "clients" ? "#3875ee" : "#dddddd",
              },
            }}
            onClick={() => setSelectedUserType("clients")}
          >
            {t("Clients")}
          </Button>
          <Button
            startIcon={
              <ArtisansUserTypeIcon
                sx={{
                  "&>path": {
                    fill:
                      selectedUserType === "artisans" ? "#FFFFFF" : "#939CA6",
                  },
                }}
              />
            }
            sx={{
              backgroundColor:
                selectedUserType === "artisans" ? "#447EEF" : "#F9FBFB",
              color: selectedUserType === "artisans" ? "#FFFFFF" : "#939CA6",
              borderRadius: "24px",
              textTransform: "none",
              padding: "0.5em 1em",
              "&:hover": {
                backgroundColor:
                  selectedUserType === "artisans" ? "#3875ee" : "#dddddd",
              },
            }}
            onClick={() => setSelectedUserType("artisans")}
          >
            {t("Artisans")}
          </Button>
          {currentUser?.is_superuser && (
            <Button
              startIcon={
                <AdminsUserTypeIcon
                  sx={{
                    "&>path": {
                      fill:
                        selectedUserType === "admins" ? "#FFFFFF" : "#939CA6",
                    },
                  }}
                />
              }
              sx={{
                backgroundColor:
                  selectedUserType === "admins" ? "#447EEF" : "#F9FBFB",
                color: selectedUserType === "admins" ? "#FFFFFF" : "#939CA6",
                borderRadius: "24px",
                textTransform: "none",
                padding: "0.5em 1em",
                "&:hover": {
                  backgroundColor:
                    selectedUserType === "admins" ? "#3875ee" : "#dddddd",
                },
              }}
              onClick={() => setSelectedUserType("admins")}
            >
              {t("Admins")}
            </Button>
          )}
          <Box sx={{ flex: 1 }} />
          {currentUser?.is_superuser && selectedUserType === "admins" && (
            <Button
              startIcon={<AddIcon />}
              sx={{ textTransform: "none", color: "#2C3E50" }}
            >
              {t("Add new admin")}
            </Button>
          )}
        </Box>
        <TableContainer sx={{ height: "100%", minWidth: "50em" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t("ID")}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t("First Name")}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t("Last Name")}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t("Phone")}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t("Email")}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t("Wilaya")}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t("Commune")}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t("Joined")}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t("Is Active")}
                </TableCell>
                {currentUser?.is_superuser && (
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    {t("Is Admin")}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&>.MuiTableCell-body": {
                      border: "none",
                      color:
                        selectedUser && selectedUser.id === user.id
                          ? "#447EEF"
                          : "#2C3E5080",
                    },
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor:
                        selectedUser && selectedUser.id === user.id
                          ? "#e1eafc"
                          : "#f0f0f0",
                    },
                    backgroundColor:
                      selectedUser && selectedUser.id === user.id
                        ? "#ECF2FD"
                        : "transparent",
                  }}
                  onClick={() => setSelectedUser(user)}
                >
                  <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                    {user.id}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                    {user.first_name}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                    {user.last_name}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                    {user.phone_number}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                    {user.email}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                    {user.wilaya ? user.wilaya.name_en : t("None")}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                    {user.commune ? user.commune.name_en : t("None")}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                    {Intl.DateTimeFormat("en-US").format(
                      new Date(user.created_at)
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                    {user.is_active ? t("Yes") : t("No")}
                  </TableCell>
                  {currentUser?.is_superuser && (
                    <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                      {user.is_admin ? t("Yes") : t("No")}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {selectedUser && (
        <EditUserPanel
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setScreenToShow={setScreenToShow}
        />
      )}
    </Box>
  );
};

export default UsersTable;
