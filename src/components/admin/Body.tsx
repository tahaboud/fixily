import EngineeringIcon from "@mui/icons-material/Engineering";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  adminDeleteUser,
  adminGetUsers,
  adminUpdateUser,
} from "../../state/actions/adminAction";
import { User } from "../../types";

const Body = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { token, data: currentUser } = useAppSelector((state) => state.auth);
  const { data } = useAppSelector((state) => state.admin);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userIdBeingEdited, setUserIdBeingEdited] = useState<number | null>(
    null
  );
  const [userBeingEdited, setUserBeingEdited] = useState<User | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [points, setPoints] = useState("0");
  const [isActive, setIsActive] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clientType, setClientType] = useState<"client" | "artisan">("client");
  const [filteredUsers, setFilteredUsers] = useState<Array<User>>([]);
  useEffect(() => {
    if (token) {
      dispatch(adminGetUsers({ token }));
    }
  }, [dispatch]);
  const handleOpenEdit = (
    event: React.MouseEvent<HTMLButtonElement>,
    userId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setUserIdBeingEdited(userId);
  };
  const handleCloseEdit = () => {
    setAnchorEl(null);
    setUserIdBeingEdited(null);
  };
  const handleEditUser = ({ user }: { user: User }) => {
    setEditModalOpen(true);
    setAnchorEl(null);
    setUserIdBeingEdited(null);
    setUserBeingEdited(user);
    setPoints(String(user.points));
    setIsActive(user.is_active);
    setIsVerified(user.is_id_verified);
    setIsAdmin(user.is_admin);
  };
  const handleSaveUser = () => {
    if (token && userBeingEdited) {
      if (currentUser?.is_superuser) {
        dispatch(
          adminUpdateUser({
            token,
            isActive,
            isAdmin,
            isIDVerified: isVerified,
            points,
            userId: userBeingEdited.id,
          })
        );
      } else {
        dispatch(
          adminUpdateUser({
            token,
            isActive,
            isIDVerified: isVerified,
            points,
            userId: userBeingEdited.id,
          })
        );
      }
    }
    setEditModalOpen(false);
  };
  const handleDeleteUser = ({ userId }: { userId: number }) => {
    if (token) {
      dispatch(adminDeleteUser({ token, userId }));
      setAnchorEl(null);
      setUserIdBeingEdited(null);
    }
  };
  const handleEditIsActive = ({
    userId,
    isActive,
  }: {
    userId: number;
    isActive: boolean;
  }) => {
    if (token) {
      dispatch(adminUpdateUser({ token, userId, isActive }));
      setAnchorEl(null);
      setUserIdBeingEdited(null);
    }
  };
  useEffect(() => {
    if (data) {
      if (clientType === "artisan") {
        setFilteredUsers(data.filter((user) => user.is_artisan));
      } else {
        setFilteredUsers(data.filter((user) => !user.is_artisan));
      }
    }
  }, [data, clientType]);
  return (
    <Box sx={{ backgroundColor: "#FFFFFF" }}>
      <Box
        sx={{
          margin: "1em",
          display: "flex",
          alignItems: "center",
          gap: "1em",
        }}
      >
        <Button
          variant={clientType === "client" ? "text" : "contained"}
          onClick={() => setClientType("client")}
          startIcon={<PersonIcon />}
        >
          {t("client")}
        </Button>
        <Button
          variant={clientType === "artisan" ? "text" : "contained"}
          onClick={() => setClientType("artisan")}
          startIcon={<EngineeringIcon />}
        >
          {t("artisan")}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#e1e1e1" }}>
            <TableRow>
              <TableCell align="center">{t("email")}</TableCell>
              <TableCell align="center">{t("firstName")}</TableCell>
              <TableCell align="center">{t("lastName")}</TableCell>
              <TableCell align="center">{t("phoneNumber")}</TableCell>
              <TableCell align="center">{t("verifiedEmail")}</TableCell>
              <TableCell align="center">{t("isArtisan")}</TableCell>
              <TableCell align="center">{t("isVerified")}</TableCell>
              <TableCell align="center">{t("isActive")}</TableCell>
              <TableCell align="center">{t("points")}</TableCell>
              {currentUser && currentUser.is_superuser && (
                <TableCell align="center">{t("isAdmin")}</TableCell>
              )}
              <TableCell align="center">{t("edit")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  {user.first_name !== "" ? user.first_name : t("none")}
                </TableCell>
                <TableCell align="center">
                  {user.last_name !== "" ? user.last_name : t("none")}
                </TableCell>
                <TableCell align="center">
                  {user.phone_number && user.phone_number !== ""
                    ? user.phone_number
                    : t("none")}
                </TableCell>
                <TableCell align="center">
                  {user.is_email_verified ? t("yes") : t("no")}
                </TableCell>
                <TableCell align="center">
                  {user.is_artisan ? t("yes") : t("no")}
                </TableCell>
                <TableCell align="center">
                  {user.is_id_verified ? t("yes") : t("no")}
                </TableCell>
                <TableCell align="center">
                  {user.is_active ? t("yes") : t("no")}
                </TableCell>
                <TableCell align="center">{user.points}</TableCell>
                {currentUser && currentUser.is_superuser && (
                  <TableCell align="center">
                    {user.is_admin ? t("yes") : t("no")}
                  </TableCell>
                )}
                <TableCell align="center">
                  <IconButton onClick={(e) => handleOpenEdit(e, user.id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={userIdBeingEdited === user.id}
                    onClose={handleCloseEdit}
                  >
                    <MenuItem onClick={() => handleEditUser({ user })}>
                      {t("profile")}
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleEditIsActive({
                          userId: user.id,
                          isActive: !user.is_active,
                        })
                      }
                    >
                      {user.is_active ? t("deactivate") : t("activate")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleDeleteUser({ userId: user.id })}
                    >
                      {t("delete")}
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "40em",
            width: "40em",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "1.3rem" }}>{t("frontId")}</Typography>
          {userBeingEdited && userBeingEdited.front_id_image ? (
            <Typography component={"a"} href={userBeingEdited.front_id_image}>
              {t("View")}
            </Typography>
          ) : (
            <Typography>{t("none")}</Typography>
          )}
          <Divider />
          <Typography sx={{ fontSize: "1.3rem" }}>{t("backId")}</Typography>
          {userBeingEdited && userBeingEdited.back_id_image ? (
            <Typography component={"a"} href={userBeingEdited.back_id_image}>
              {t("View")}
            </Typography>
          ) : (
            <Typography>{t("none")}</Typography>
          )}
          <Divider />
          <Box>
            <Typography sx={{ fontSize: "1.3rem" }}>{t("points")}</Typography>
            <TextField
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "1.3rem" }}>{t("isActive")}</Typography>
            <Switch
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "1.3rem" }}>
              {t("isVerified")}
            </Typography>
            <Switch
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
            />
          </Box>
          <Divider />
          {currentUser && currentUser.is_superuser && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.3rem" }}>
                  {t("isAdmin")}
                </Typography>
                <Switch
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </Box>
              <Divider />
            </>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: "1em",
            }}
          >
            <Button onClick={() => setEditModalOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={handleSaveUser}>{t("save")}</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Body;
