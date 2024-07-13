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
import { PaymentReceipt } from "../../../state/reducers/types";

const CCPTransfer = ({
  paymentReceipts,
  selectedReceipt,
  setSelectedReceipt,
}: {
  paymentReceipts: Array<PaymentReceipt> | null;
  selectedReceipt: PaymentReceipt | null;
  setSelectedReceipt: React.Dispatch<
    React.SetStateAction<PaymentReceipt | null>
  >;
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
        {t("ccp_transfers")}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">{t("ID")}</TableCell>
              <TableCell align="center">{t("first_name")}</TableCell>
              <TableCell align="center">{t("last_name")}</TableCell>
              <TableCell align="center">{t("status")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentReceipts &&
              paymentReceipts.map((receipt) => (
                <TableRow
                  key={receipt.id}
                  onClick={() => setSelectedReceipt(receipt)}
                  sx={{
                    "&>td": {
                      color:
                        selectedReceipt === receipt ? "#447EEF" : "#000000",
                    },
                    "&:hover": { cursor: "pointer" },
                  }}
                >
                  <TableCell align="center">{receipt.id}</TableCell>
                  <TableCell align="center">
                    {receipt.user.first_name}
                  </TableCell>
                  <TableCell align="center">{receipt.user.last_name}</TableCell>
                  <TableCell align="center">{t(receipt.status)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CCPTransfer;
