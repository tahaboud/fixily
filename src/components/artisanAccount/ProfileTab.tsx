import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import CreateIcon from "@mui/icons-material/Create";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, createRef } from "react";
import { useTranslation } from "react-i18next";
import Switch from "react-switch";
import {
  ArtisanSwitchIcon,
  ClientSwitchIcon,
  IdVerifiedIcon,
} from "../../assets/Icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deletePreviousWorkPhoto,
  updateUser,
} from "../../state/actions/authActions";
import { ActionEnums } from "../../state/types/actionEnums";
import { User } from "../../types";

const ProfileTab = ({
  user,
  setSidePanelTitle,
  setSidePanelOpen,
}: {
  user: User;
  setSidePanelTitle: Dispatch<SetStateAction<string>>;
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const inputRef = createRef<HTMLInputElement>();

  const { isArtisan, token, userIsLoading } = useAppSelector(
    (state) => state.auth
  );

  const handleSwitchHolidayMode = (checked: boolean) => {
    if (token) {
      dispatch(updateUser({ token, isOnHolidayMode: !checked }));
    }
  };

  const handleDeletePreviousWorkImage = (id: string) => {
    if (token) {
      dispatch(deletePreviousWorkPhoto({ token, photoId: id }));
    }
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "1em",
        }}
      >
        <Box sx={{ display: "flex", gap: "1em", alignItems: "center" }}>
          <Avatar
            src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${user.picture}`}
            sx={{ height: "3em", width: "3em" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
              <Typography
                sx={{ fontSize: "1.2rem" }}
              >{`${user.first_name} ${user.last_name}`}</Typography>
              {user.id_status === "verified" && <IdVerifiedIcon />}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
              <Rating value={Number(user.review)} readOnly precision={0.5} />
              <Typography fontWeight={600}>{user.review}</Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }} />
          <IconButton
            onClick={() => {
              setSidePanelTitle("edit_profile");
              setSidePanelOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "1em 0",
          }}
        >
          <Typography fontWeight={600}>{t("switch_to_client")}</Typography>
          <Switch
            onChange={() => {
              dispatch({ type: ActionEnums.SWITCH_TO_CLIENT });
            }}
            checked={isArtisan}
            offColor="#FFFFFF"
            onColor="#FFFFFF"
            checkedIcon={
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  padding: "0 1em",
                  color: "#F1C40F",
                  transform: "translateX(0.2em)",
                }}
              >
                {t("artisan_cappitalized")}
              </Typography>
            }
            uncheckedIcon={
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "#447EEF",
                  transform: "translateX(-1em)",
                }}
              >
                {t("client_cappitalized")}
              </Typography>
            }
            checkedHandleIcon={
              <ArtisanSwitchIcon sx={{ fontSize: "1.7rem" }} />
            }
            uncheckedHandleIcon={
              <ClientSwitchIcon sx={{ fontSize: "1.7rem" }} />
            }
            height={30}
            width={100}
            className="artisan-switch"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight={600}>{t("availability")}</Typography>
          <Switch
            onChange={(checked) => handleSwitchHolidayMode(checked)}
            checked={!user.is_on_holiday_mode}
            offColor="#e6e6e6"
            onColor="#1ABC9C"
            checkedIcon={
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  padding: "0 1em",
                  color: "#FFFFFF",
                  transform: "translate(0em, 0.5em)",
                }}
              >
                {t("available")}
              </Typography>
            }
            uncheckedIcon={
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "#1ABC9C",
                  transform: "translate(-1.5em, 0.5em)",
                }}
              >
                {t("unavailable")}
              </Typography>
            }
            height={40}
            width={130}
          />
        </Box>
        <Button
          sx={{ textTransform: "none", color: "#447EEF" }}
          startIcon={<CreateIcon />}
          onClick={() => {
            setSidePanelOpen(true);
            setSidePanelTitle("edit_availability");
          }}
        >
          {t("edit_availability")}
        </Button>
        <Typography fontWeight={600}>{t("bio")}</Typography>
        <Typography
          className="scrollbar"
          sx={{ color: "#2C3E5080", maxHeight: "5em", overflowY: "auto" }}
        >
          {user.bio}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "1em",
          margin: "1em 0 0 0",
        }}
      >
        <Typography fontWeight={600} fontSize={"1.1rem"} margin={"1em 0"}>
          {t("comptences")}
        </Typography>

        {user.sub_categories.length === 0 ? (
          <Button
            sx={{
              textTransform: "none",
              color: "#447EEF",
              border: "1px dashed #447EEF",
              borderRadius: "100px",
            }}
            variant="text"
            startIcon={<AddIcon />}
            onClick={() => {
              setSidePanelOpen(true);
              setSidePanelTitle("edit_sub_categories");
            }}
          >
            {t("add")}
          </Button>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1em",
              maxHeight: "10em",
              overflowY: "auto",
            }}
            className="scrollbar"
          >
            {user.sub_categories.map((sub_category) => (
              <Typography
                key={sub_category.id}
                sx={{
                  padding: "1em",
                  border: "1px solid #2C3E504D",
                  borderRadius: "100px",
                  width: "fit-content",
                }}
              >
                {sub_category.name_en}
              </Typography>
            ))}
            <Button
              sx={{
                textTransform: "none",
                color: "#447EEF",
                border: "1px dashed #447EEF",
                borderRadius: "100px",
                width: "fit-content",
              }}
              variant="text"
              onClick={() => {
                setSidePanelOpen(true);
                setSidePanelTitle("edit_sub_categories");
              }}
            >
              {t("add")}
            </Button>
          </Box>
        )}
        <Typography fontWeight={600} fontSize={"1.1rem"} margin={"1em 0"}>
          {t("portfolio")}
        </Typography>
        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={(e) => {
            if (e.target.files && token) {
              dispatch(
                updateUser({ token, previousWorkPhotos: e.target.files })
              );
            }
          }}
        />
        {user.previous_work_photos.length === 0 ? (
          <IconButton
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            <AddIcon sx={{ height: "3em", width: "3em" }} />
          </IconButton>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "1em",
              flexWrap: "wrap",
            }}
          >
            {user.previous_work_photos.map((previousWorkPhoto) => (
              <Box
                key={previousWorkPhoto.id}
                sx={{
                  height: "5em",
                  width: "5em",
                  borderRadius: "8px",
                  backgroundImage: `url(${
                    import.meta.env.VITE_REACT_APP_IMAGE_URL
                  }${previousWorkPhoto.image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    margin: 0,
                    padding: 0,
                    transform: "translate(50%,-50%)",
                  }}
                  onClick={() =>
                    handleDeletePreviousWorkImage(previousWorkPhoto.id)
                  }
                  disabled={userIsLoading}
                >
                  <CancelIcon sx={{ color: "#FC4848" }} />
                </IconButton>
              </Box>
            ))}
            {user.previous_work_photos.length !== 15 && (
              <IconButton
                onClick={() => {
                  inputRef.current?.click();
                }}
                sx={{ height: "3em", width: "3em", padding: "0" }}
              >
                <AddIcon sx={{ height: "100%", width: "100%" }} />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfileTab;
