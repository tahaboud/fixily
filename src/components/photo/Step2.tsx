import CancelIcon from "@mui/icons-material/Cancel";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  createRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deletePreviousWorkPhoto,
  updateUser,
} from "../../state/actions/authActions";
import { PreviousWorkPhoto } from "../../types";
import {
  SnackbarContext,
  SnackbarContextType,
} from "../common/SnackbarContext";

const Step2 = ({
  bio,
  setBio,
  uploadProgress,
  uploading,
  setUploadProgress,
  setUploading,
}: {
  bio: string;
  setBio: Dispatch<SetStateAction<string>>;
  uploading: boolean;
  uploadProgress: number;
  setUploading: Dispatch<SetStateAction<boolean>>;
  setUploadProgress: Dispatch<SetStateAction<number>>;
}) => {
  const dispatch = useAppDispatch();

  const fileInputRef = createRef<HTMLInputElement>();
  const { t } = useTranslation();
  const { data, token, userIsLoading } = useAppSelector((state) => state.auth);
  const [images, setImages] = useState<Array<PreviousWorkPhoto>>([]);
  const { setSnack } = useContext<SnackbarContextType>(SnackbarContext);
  const handleImagesUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && token) {
      const totalUploadedImages = images
        ? images.length + e.target.files.length
        : e.target.files.length;
      if (totalUploadedImages > 15) {
        setSnack({
          message: t("Maximum 15 photos"),
          color: "error",
          open: true,
          duration: 3000,
        });
        return;
      }
      setUploading(true);
      dispatch(
        updateUser({
          token,
          previousWorkPhotos: e.target.files,
          setUploadProgress,
        })
      );
    }
  };
  const handleDeleteImage = (index: string) => {
    if (token) {
      dispatch(deletePreviousWorkPhoto({ token, photoId: index }));
    }
  };
  useEffect(() => {
    if (data && data.previous_work_photos) {
      setImages([...data.previous_work_photos]);
    }
    if (data && data.bio) {
      setBio(data.bio);
    }
  }, [data, setBio]);
  useEffect(() => {
    if (uploading && uploadProgress === 100) {
      setUploadProgress(0);
      setUploading(false);
    }
  }, [uploadProgress, uploading, setUploadProgress, setUploading]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1em",
        width: "100%",
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "600" }}
      >
        {t("Bienvenu")}
        {` ${data?.first_name},`}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Typography sx={{ fontWeight: "600", width: "30em" }}>
          {t("Decrivez vous en quelques mots")}
        </Typography>
        <TextField
          multiline
          minRows={4}
          maxRows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          sx={{ width: "30em", backgroundColor: "#F5F7F8" }}
          placeholder={t("Je suis ...")}
        />
        <Typography sx={{ fontWeight: "600", width: "30em" }}>
          {t("Montrez votre meilleur travail")}
        </Typography>
        <Box>
          <input
            type="file"
            hidden
            multiple
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImagesUpload}
          />
          <Button
            variant="contained"
            sx={{ textTransform: "none", fontWeight: "600", width: "20em" }}
            onClick={() => {
              fileInputRef.current?.click();
            }}
            disabled={userIsLoading || images.length === 15}
          >
            {t("Upload")}
          </Button>
          <Typography sx={{ fontSize: "0.8rem", color: "#2C3E5080" }}>
            {t("Maximum 15 photos")}
          </Typography>
        </Box>
        {images.length !== 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1em",
              width: "30em",
            }}
          >
            {images.map((image) => (
              <Box
                key={image.pk}
                sx={{
                  width: "5em",
                  height: "5em",
                  position: "relative",
                  borderRadius: "8px",
                  backgroundColor: "#D9D9D9",
                  backgroundImage: `url(${
                    import.meta.env.VITE_REACT_APP_API_URL
                  }${image.image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPositionY: "center",
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
                  onClick={() => handleDeleteImage(image.pk)}
                  disabled={userIsLoading}
                >
                  <CancelIcon sx={{ color: "#FC4848" }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={uploading}>
        <CircularProgress
          color="inherit"
          variant="determinate"
          value={uploadProgress}
        />
      </Backdrop>
    </Box>
  );
};

export default Step2;
