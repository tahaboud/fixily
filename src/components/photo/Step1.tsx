import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  createRef,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { FaceImageIcon } from "../../assets/Icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ActionEnums } from "../../state/types/actionEnums";

const Step1 = ({
  image,
  setImage,
  uploadProgress,
  uploading,
}: {
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  uploadProgress: number;
  uploading: boolean;
}) => {
  const { t } = useTranslation();
  const fileInputRef = createRef<HTMLInputElement>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const { data } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
  }, [dispatch]);
  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);
  useEffect(() => {
    if (data && data.picture) {
      setImageUrl(`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${data.picture}`);
      setImageUploaded(true);
    }
  }, [data]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1em",
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "600" }}
      >
        {t("Bienvenu")}
        {` ${data?.first_name},`}
      </Typography>
      <Typography sx={{ textAlign: "center", fontWeight: "600" }}>
        {t("Telechargez votre photo de profile")}
      </Typography>
      <Typography
        sx={{ textAlign: "center", fontSize: "0.9rem", color: "#2C3E5080" }}
      >
        {t(
          "Les clients font plus de confiance aux professionels avec une photo de profil. Vous ouvez avoir x3 plus de clients"
        )}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          id="image"
          sx={{
            width: "10em",
            height: "10em",
            borderRadius: "8px",
            backgroundColor: "#D9D9D9",
            position: "relative",
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: "center",
            "&:hover": {
              backgroundColor: "#c0bfbf",
              cursor: "pointer",
            },
          }}
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
                setImageUploaded(false);
              }
            }}
          />
          <Box
            sx={{
              height: "2em",
              width: "2em",
              backgroundColor: "#FFFFFF",
              borderRadius: "8px 16px 16px 8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaceImageIcon />
          </Box>
          {uploading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#00000080",
              }}
            >
              <CircularProgress
                size={50}
                variant="determinate"
                value={uploadProgress}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        {t("Photo de profile")}
      </Typography>
      {imageUploaded && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CheckCircleIcon sx={{ color: "#1ABC9C" }} />
          <Typography sx={{ color: "#1ABC9C" }}>{t("Uploaded")}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Step1;
