import {
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
import { getAllUsers } from "../state/actions/usersAction";

const Body = () => {
  const dispatch = useAppDispatch();
  const { usersIsLoading, allUsers } = useAppSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
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
                <TableCell align="right">{user.createdAt}</TableCell>
                <TableCell align="right">
                  {user.emailVerified ? "true" : "false"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Body;
