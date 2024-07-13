import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { adminUpdateUser } from "../../../state/actions/adminAction";
import { User } from "../../../types";

const EditRequest = ({
  request,
  setSelectedRequest,
}: {
  request: User;
  setSelectedRequest: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const [idImage, setIdImage] = useState(request.front_id_image);
  const handleChangeImage = () => {
    if (idImage === request.front_id_image) {
      setIdImage(request.back_id_image);
    } else {
      setIdImage(request.front_id_image);
    }
  };
  const handleApprove = () => {
    if (token) {
      dispatch(
        adminUpdateUser({ token, isIDVerified: true, userId: request.id })
      );
      setSelectedRequest(null);
    }
  };
  const handleReject = () => {
    if (token) {
      dispatch(
        adminUpdateUser({ token, isIDVerified: false, userId: request.id })
      );
      setSelectedRequest(null);
    }
  };

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
      <Typography sx={{ fontWeight: 600, fontSize: "1.2rem", width: "100%" }}>
        {t("ID")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1em",
          width: "100%",
        }}
      >
        <IconButton onClick={handleChangeImage}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Box
          sx={{
            height: "20em",
            width: "100%",
            backgroundImage: `url(${
              import.meta.env.VITE_REACT_APP_API_URL
            }${idImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <IconButton onClick={handleChangeImage}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
      <Typography sx={{ color: "#2C3E50" }}>
        {idImage === request.back_id_image ? t("ID Back") : t("ID Front")}
      </Typography>
      <Box
        sx={{
          height: "10em",
          width: "10em",
          backgroundColor: "#F5F7F8",
          backgroundImage: `url(${import.meta.env.VITE_REACT_APP_API_URL}${
            request.picture
          })`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRadius: "100px",
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
        <Typography>{t("First Name")}</Typography>
        <Typography>{request.first_name}</Typography>
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
        <Typography>{t("Last Name")}</Typography>
        <Typography>{request.last_name}</Typography>
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
        <Typography>{t("Birth Date")}</Typography>
        <Typography>
          {Intl.DateTimeFormat("en-US").format(new Date("2022-12-12"))}
        </Typography>
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
          {t("Approve")}
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
          {t("Reject")}
        </Button>
      </Box>
    </Box>
  );
};

export default EditRequest;
