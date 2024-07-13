import EmailIcon from "@mui/icons-material/Email";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  createRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";
import { CameraIcon, IdVerifiedIcon } from "../../../../assets/Icons";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { updateUser } from "../../../../state/actions/authActions";
import { User } from "../../../../types";
import { validateClientEditProfile } from "../../../../validators/clientEditProfile";
import { ClientEditProfileValidationErrors } from "../../../../validators/types";
import {
  SnackbarContext,
  SnackbarContextType,
} from "../../../common/SnackbarContext";

const Body = ({
  user,
  setSidePanelOpen,
}: {
  user: User;
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const inputRef = createRef<HTMLInputElement>();
  const dispatch = useAppDispatch();

  const {
    token,
    errors: serverErrors,
    detail,
    userIsLoading,
  } = useAppSelector((state) => state.auth);
  const { setSnack } = useContext<SnackbarContextType>(SnackbarContext);

  const [preferedLanguage, setPreferedLanguage] = useState<"french" | "arabic">(
    "french"
  );
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio ?? "");
  const [errors, setErrors] = useState<ClientEditProfileValidationErrors>({});

  const handleChangeLanguage = () => {
    if (preferedLanguage === "french") {
      setPreferedLanguage("arabic");
    } else {
      setPreferedLanguage("french");
    }
  };

  const handleSave = () => {
    const newValues: {
      email: string;
      firstName?: string;
      lastName?: string;
      bio: string;
    } = { bio, email };
    if (user.id_status !== "verified") {
      newValues.firstName = firstName;
      newValues.lastName = lastName;
    }
    const { isValid, validationErrors } = validateClientEditProfile(newValues);
    if (isValid) {
      if (token) {
        const changedValues: {
          email?: string;
          firstName?: string;
          lastName?: string;
          bio?: string;
          picture?: File;
        } = { ...newValues };
        if (uploadedImage) {
          changedValues["picture"] = uploadedImage;
        }

        dispatch(updateUser({ ...changedValues, token }));
      }
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (detail && detail.detail === "user updated successfully") {
      setSnack({
        message: t("profile_updated"),
        color: "success",
        open: true,
        duration: 3000,
      });
      setSidePanelOpen(false);
    }
  }, [detail, setSnack, t, setSidePanelOpen]);

  useEffect(() => {
    if (serverErrors && serverErrors.type === "validation_error") {
      if (
        serverErrors.errors[0].attr === "email" &&
        serverErrors.errors[0].code === "unique"
      ) {
        setErrors((currentErrors) => {
          return { ...currentErrors, email: "email_already_in_use" };
        });
      }
    }
  }, [serverErrors]);

  return (
    <Box
      sx={{
        height: "calc(100vh - 5em)",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        padding: "0 1em 1em 0",
      }}
    >
      <Box sx={{ display: "flex", gap: "1em", alignItems: "center" }}>
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : `${import.meta.env.VITE_REACT_APP_IMAGE_URL}${user?.picture}`
            }
            sx={{ height: "3em", width: "3em" }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFFB2",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              zIndex: 10,
              "&:hover": {
                backgroundColor: "#FFFFFF",
                cursor: "pointer",
              },
            }}
            onClick={() => inputRef.current?.click()}
          >
            <CameraIcon />
          </Box>
          <input
            ref={inputRef}
            type="file"
            hidden
            onChange={(e) => {
              if (e.target.files) {
                setUploadedImage(e.target.files[0]);
              }
            }}
          />
        </Box>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <Typography>{`${user?.first_name} ${user?.last_name}`}</Typography>
            {user?.id_status === "verified" && <IdVerifiedIcon />}
          </Box>
          <Typography>{user?.email}</Typography>
        </Box>
      </Box>

      <Typography fontSize={"1.2rem"} fontWeight={600}>
        {t("personal_info")}
      </Typography>
      <Box>
        <Typography fontWeight={600}>{t("first_and_last_name")}</Typography>
        <Box sx={{ display: "flex", gap: "1em" }}>
          <TextField
            size="small"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#ECF0F180",
              width: "100%",
              "& .MuiFormHelperText-root": {
                backgroundColor: "#FFFFFF !important",
                margin: 0,
              },
            }}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrors((currentErrors) => {
                delete currentErrors.firstName;
                return currentErrors;
              });
            }}
            disabled={user.id_status === "verified"}
            error={errors.firstName !== undefined}
            helperText={
              errors.firstName !== undefined ? t(errors.firstName) : null
            }
          />
          <TextField
            size="small"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#ECF0F180",
              width: "100%",
              "& .MuiFormHelperText-root": {
                backgroundColor: "#FFFFFF !important",
                margin: 0,
              },
            }}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setErrors((currentErrors) => {
                delete currentErrors.lastName;
                return currentErrors;
              });
            }}
            disabled={user.id_status === "verified"}
            error={errors.lastName !== undefined}
            helperText={
              errors.lastName !== undefined ? t(errors.lastName) : null
            }
          />
        </Box>
      </Box>
      <Box>
        <Typography>{t("phone_number")}</Typography>
        <Box sx={{ display: "flex", gap: "1em" }}>
          <InputMask
            mask="+213  999999999"
            value={user.phone_number ?? ""}
            maskPlaceholder={" "}
            disabled
            children={
              <TextField
                type="tel"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <PhoneEnabledIcon
                      sx={{ color: "#909AA4", margin: "0 0.5em 0 0" }}
                    />
                  ),
                  sx: {
                    borderRadius: "8px",
                    backgroundColor: "#F5F7F8",
                  },
                }}
              />
            }
          />
        </Box>
      </Box>
      <Box>
        <Typography>{t("email")}</Typography>
        <Box sx={{ display: "flex", gap: "1em" }}>
          <TextField
            type="email"
            size="small"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#ECF0F180",
              width: "100%",
              "& .MuiFormHelperText-root": {
                backgroundColor: "#FFFFFF !important",
                margin: 0,
              },
            }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((currentErrors) => {
                delete currentErrors.email;
                return currentErrors;
              });
            }}
            error={errors.email !== undefined}
            helperText={errors.email !== undefined ? t(errors.email) : null}
            InputProps={{
              startAdornment: (
                <EmailIcon sx={{ color: "#909AA4", margin: "0 0.5em 0 0" }} />
              ),
            }}
          />
        </Box>
      </Box>
      <Box>
        <Typography>{t("bio")}</Typography>
        <Box sx={{ display: "flex", gap: "1em" }}>
          <TextField
            size="small"
            multiline
            rows={4}
            maxRows={4}
            inputProps={{ maxLength: 2000, className: "scrollbar" }}
            sx={{
              borderRadius: "8px",
              backgroundColor: "#ECF0F180",
              width: "100%",
              "& .MuiFormHelperText-root": {
                backgroundColor: "#FFFFFF !important",
                margin: 0,
              },
            }}
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              setErrors((currentErrors) => {
                delete currentErrors.bio;
                return currentErrors;
              });
            }}
            error={errors.bio !== undefined}
            helperText={errors.bio !== undefined ? t(errors.bio) : null}
          />
        </Box>
      </Box>
      <Box>
        <Typography>{t("language")}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "8px",
            backgroundColor: "#ECF0F180",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleChangeLanguage}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography>{t(preferedLanguage)}</Typography>
          <IconButton onClick={handleChangeLanguage}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ flex: 1 }} />
      <Button
        variant="contained"
        sx={{
          width: "100%",
          color: "#FFFFFF",
          backgroundColor: "#F1C40F",
          textTransform: "none",
          "&:hover": { backgroundColor: "#e4b90f" },
        }}
        onClick={handleSave}
        disabled={userIsLoading}
      >
        {t("save")}
      </Button>
    </Box>
  );
};

export default Body;
