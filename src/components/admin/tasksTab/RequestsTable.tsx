import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../../types";

const RequestsTable = ({
  requests,
  selectedRequest,
  setSelectedRequest,
}: {
  requests: Array<User>;
  selectedRequest: User | null;
  setSelectedRequest: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        boxShadow: "0px 4px 8px 0px #00000017",
        height: "100%",
        width: "50%",
        padding: "1em",
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
        {t("ID check requests")}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">{t("ID")}</TableCell>
              <TableCell align="center">{t("First Name")}</TableCell>
              <TableCell align="center">{t("Last Name")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                sx={{
                  "&>td": {
                    color: selectedRequest === request ? "#447EEF" : "#000000",
                  },
                  "&:hover": { cursor: "pointer" },
                }}
              >
                <TableCell align="center">{request.id}</TableCell>
                <TableCell align="center">{request.first_name}</TableCell>
                <TableCell align="center">{request.last_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RequestsTable;
