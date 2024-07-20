import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
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
import { isStringIncluded } from "../utils";
import EditUserPanel from "./EditUserPanel";

const UsersTable = ({
  setNumOfArtisans,
  setNumOfClients,
  setNumOfJoinedToday,
  setSelectedUser,
  selectedUser,
  setScreenToShow,
  selectedUserType,
  setSelectedUserType,
}: {
  setNumOfClients: React.Dispatch<React.SetStateAction<number>>;
  setNumOfArtisans: React.Dispatch<React.SetStateAction<number>>;
  setNumOfJoinedToday: React.Dispatch<React.SetStateAction<number>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedUser: User | null;
  setScreenToShow: React.Dispatch<
    React.SetStateAction<"table" | "editing" | "creating">
  >;
  selectedUserType: "clients" | "artisans" | "admins";
  setSelectedUserType: React.Dispatch<
    React.SetStateAction<"clients" | "artisans" | "admins">
  >;
}) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const { token, data: currentUser } = useAppSelector((state) => state.auth);
  const { users: serverUsers } = useAppSelector((state) => state.admin);

  const [artisans, setArtisans] = useState<Array<User>>([]);
  const [clients, setClients] = useState<Array<User>>([]);
  const [admins, setAdmins] = useState<Array<User>>([]);
  const [queriedUsers, setQueriedUsers] = useState<Array<User>>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(adminGetUsers({ token }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (serverUsers) {
      setAdmins(serverUsers.filter((user) => user.is_admin));
      setArtisans(
        serverUsers.filter((user) => user.is_artisan && !user.is_admin)
      );
      setClients(
        serverUsers.filter((user) => !user.is_artisan && !user.is_admin)
      );
    }
  }, [serverUsers]);

  useEffect(() => {
    if (selectedUserType === "admins") {
      setQueriedUsers(admins);
      setSearchQuery("");
    } else if (selectedUserType === "clients") {
      setQueriedUsers(clients);
      setSearchQuery("");
    } else {
      setQueriedUsers(artisans);
      setSearchQuery("");
    }
  }, [selectedUserType, admins, clients, artisans]);

  useEffect(() => {
    if (serverUsers) {
      const today = new Date();
      setNumOfArtisans(
        serverUsers.filter((user) => user.is_artisan && !user.is_admin).length
      );
      setNumOfClients(
        serverUsers.filter((user) => !user.is_artisan && !user.is_admin).length
      );
      setNumOfJoinedToday(
        serverUsers.filter(
          (user) =>
            Math.round(
              (today.getTime() - new Date(user.created_at).getTime()) /
                (1000 * 60 * 60 * 24)
            ) === 0
        ).length
      );
    }
  }, [serverUsers, setNumOfArtisans, setNumOfClients, setNumOfJoinedToday]);

  useEffect(() => {
    if (searchQuery === "") {
      if (selectedUserType === "admins") {
        setQueriedUsers(admins);
      } else if (selectedUserType === "clients") {
        setQueriedUsers(clients);
      } else {
        setQueriedUsers(artisans);
      }
    } else {
      if (selectedUserType === "admins") {
        setQueriedUsers(
          admins.filter((user) =>
            isStringIncluded(user, searchQuery.split(" "))
          )
        );
      } else if (selectedUserType === "clients") {
        setQueriedUsers(
          clients.filter((user) =>
            isStringIncluded(user, searchQuery.split(" "))
          )
        );
      } else {
        setQueriedUsers(
          artisans.filter((user) =>
            isStringIncluded(user, searchQuery.split(" "))
          )
        );
      }
    }
  }, [searchQuery, admins, clients, artisans, selectedUserType]);

  return (
    <Box sx={{ display: "flex", gap: "1em", flex: 1, maxHeight: "80%" }}>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0px 4px 8px 0px #00000017",
          flex: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "1em",
            gap: "1em",
            height: "5em",
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
          <TextField
            InputProps={{
              startAdornment: <SearchIcon />,
              sx: { borderRadius: "24px" },
            }}
            sx={{ backgroundColor: "#ECF0F180", borderRadius: "24px", flex: 1 }}
            placeholder={t("search...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {currentUser?.is_superuser && selectedUserType === "admins" && (
            <Button
              startIcon={<AddIcon />}
              sx={{ textTransform: "none", color: "#2C3E50" }}
              onClick={() => setScreenToShow("creating")}
            >
              {t("Add new admin")}
            </Button>
          )}
        </Box>
        <TableContainer
          sx={{ minWidth: "50em", maxHeight: "calc(100% - 5em)" }}
          className="scrollbar"
        >
          <Table stickyHeader>
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
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t("last_online")}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t("language")}
                </TableCell>
                {currentUser?.is_superuser && (
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    {t("Is Admin")}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {queriedUsers.map((user) => (
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
                  <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                    {Intl.DateTimeFormat("en-US", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date(user.last_online))}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                    {user.language}
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
