import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  adminUpdatePaymentReceipt,
  adminUpdateUser,
} from "../../../state/actions/adminAction";
import { PaymentReceipt } from "../../../state/reducers/types";

const UpdateReceipt = ({
  selectedReceipt,
  setSelectedReceipt,
}: {
  selectedReceipt: PaymentReceipt;
  setSelectedReceipt: React.Dispatch<
    React.SetStateAction<PaymentReceipt | null>
  >;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);
  const { data } = useAppSelector((state) => state.admin);

  const [points, setPoints] = useState(0);

  const handleApprove = () => {
    if (token) {
      dispatch(
        adminUpdatePaymentReceipt({
          token,
          status: "approved",
          receiptId: selectedReceipt.id,
        })
      );
      const user = data?.find((user) => user.id === selectedReceipt.user.id);
      if (user) {
        dispatch(adminUpdateUser({ token, points, userId: user.id }));
      }
      setSelectedReceipt(null);
    }
  };

  const handleReject = () => {
    if (token) {
      dispatch(
        adminUpdatePaymentReceipt({
          token,
          status: "denied",
          receiptId: selectedReceipt.id,
        })
      );
      setSelectedReceipt(null);
    }
  };

  useEffect(() => {
    if (data) {
      const user = data.find((user) => user.id === selectedReceipt.user.id);
      if (user) {
        setPoints(user.points);
      }
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
        padding: "1em",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        width: "50%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem", width: "100%" }}>
          {t("payment_receipt")}
        </Typography>
        <IconButton onClick={() => setSelectedReceipt(null)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          height: "20em",
          width: "100%",
          backgroundImage: `url(${import.meta.env.VITE_REACT_APP_IMAGE_URL}${
            selectedReceipt.receipt
          })`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          gap: "1em",
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>{t("first_name")}</Typography>
        <Typography>{selectedReceipt.user.first_name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          gap: "1em",
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>{t("last_name")}</Typography>
        <Typography>{selectedReceipt.user.last_name}</Typography>
      </Box>
      {selectedReceipt.status === "pending" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: "1em",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>{t("points")}</Typography>
          <TextField
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            type="number"
            inputProps={{ min: 0 }}
          />
        </Box>
      ) : null}
      <Box sx={{ flex: 1 }} />
      {selectedReceipt.status === "pending" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: "1em",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            startIcon={<CheckCircleOutlineRoundedIcon />}
            sx={{
              textTransform: "none",
              backgroundColor: "#447EEF",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#3c79f5" },
            }}
            onClick={handleApprove}
          >
            {t("approve")}
          </Button>
          <Button
            variant="contained"
            fullWidth
            startIcon={<CancelOutlinedIcon />}
            sx={{
              textTransform: "none",
              backgroundColor: "#FC4848",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#f73a3a" },
            }}
            onClick={handleReject}
          >
            {t("reject")}
          </Button>
        </Box>
      ) : (
        <Typography
          sx={{
            width: "100",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "1.3rem",
          }}
        >
          {t(selectedReceipt.status)}
        </Typography>
      )}
    </Box>
  );
};

export default UpdateReceipt;
