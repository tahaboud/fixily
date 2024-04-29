import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deleteUser,
  getAllUsers,
  updateAdminPrivileges,
  updateUser,
} from "../state/actions/adminAction";

const Body = () => {
  const dispatch = useAppDispatch();
  const { allUsers } = useAppSelector((state) => state.admin);
  const { details } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const onEditAdminPrivileges = ({
    uid,
    isAdmin,
  }: {
    uid: string;
    isAdmin: boolean;
  }) => {
    dispatch(updateAdminPrivileges({ body: { isAdmin }, uid }));
  };
  const onDeleteUser = ({ uid }: { uid: string }) => {
    dispatch(deleteUser({ uid }));
  };
  const onUpdateUser = ({
    uid,
    disabled,
  }: {
    uid: string;
    disabled: boolean;
  }) => {
    dispatch(updateUser({ uid, disabled }));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>email</TableCell>
            <TableCell align="right">Display Name</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Email Verified</TableCell>
            <TableCell align="right">Is Admin</TableCell>
            <TableCell align="right">Is Artisan</TableCell>
            <TableCell align="right">Is Verified</TableCell>
            <TableCell align="right">Is Active</TableCell>
            <TableCell align="right">Points</TableCell>
            <TableCell align="right">Activate / Deactivate</TableCell>
            <TableCell align="right">Delete User</TableCell>
            {details?.isSuperuser ? (
              <TableCell align="right">Edit Privileges</TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers &&
            allUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell align="right">{user.displayName}</TableCell>
                <TableCell align="right">{user.phoneNumber}</TableCell>
                <TableCell align="right">
                  {user.createdAt ? user.createdAt : "No Data"}
                </TableCell>
                <TableCell align="right">
                  {user.emailVerified ? "true" : "false"}
                </TableCell>
                <TableCell align="right">
                  {user.isAdmin ? "Yes" : "No"}
                </TableCell>
                <TableCell align="right">
                  {user.isArtisan ? "Yes" : "No"}
                </TableCell>
                <TableCell align="right">
                  {user.isVerified ? "Yes" : "No"}
                </TableCell>
                <TableCell align="right">
                  {user.disabled ? "Yes" : "No"}
                </TableCell>
                <TableCell align="right">{user.points}</TableCell>
                {user.disabled ? (
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "green" }}
                      onClick={() =>
                        onUpdateUser({ uid: user.id, disabled: false })
                      }
                    >
                      Activate
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red" }}
                      onClick={() =>
                        onUpdateUser({ uid: user.id, disabled: true })
                      }
                    >
                      Deactivate
                    </Button>
                  </TableCell>
                )}
                <TableCell align="right">
                  <Button onClick={() => onDeleteUser({ uid: user.id })}>
                    Delete
                  </Button>
                </TableCell>
                {details?.isSuperuser ? (
                  <TableCell align="right">
                    {user.isAdmin ? (
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "red" }}
                        onClick={() =>
                          onEditAdminPrivileges({
                            uid: user.id,
                            isAdmin: false,
                          })
                        }
                      >
                        Remove Privileges
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "Green" }}
                        onClick={() =>
                          onEditAdminPrivileges({ uid: user.id, isAdmin: true })
                        }
                      >
                        Add Privileges
                      </Button>
                    )}
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Body;
