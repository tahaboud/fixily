import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUser } from "../../state/actions/authActions";
import { getCategories } from "../../state/actions/servicesAction";
import { ActionEnums } from "../../state/types/actionEnums";
import {
  SnackbarContext,
  SnackbarContextType,
} from "../common/SnackbarContext";

const Body = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { categories } = useAppSelector((state) => state.services);
  const { token, detail, userIsLoading, data } = useAppSelector(
    (state) => state.auth
  );
  const { setSnack } = useContext<SnackbarContextType>(SnackbarContext);
  const dispatch = useAppDispatch();
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    []
  );

  useEffect(() => {
    dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(getCategories());
    }
  }, [dispatch, token]);

  const handleToggleCategory = ({ categoryId }: { categoryId: string }) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((oldCategories) => {
        const categories = [...oldCategories];
        const categoryIndex = categories.indexOf(categoryId);
        categories.splice(categoryIndex, 1);
        return categories;
      });
    } else {
      if (selectedCategories.length === 3) {
        setSnack({
          message: t("max_categories"),
          color: "error",
          open: true,
          duration: 1000,
        });
      } else {
        setSelectedCategories((oldCategories) => [
          ...oldCategories,
          categoryId,
        ]);
      }
    }
  };

  const handleNext = () => {
    if (token) {
      dispatch(updateUser({ token, categories: selectedCategories }));
    }
  };

  useEffect(() => {
    if (detail && detail.detail === "user updated successfully") {
      dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
      navigate("/sub-categories");
    }
  }, [detail, navigate, dispatch]);

  useEffect(() => {
    if (data && data.categories) {
      const userCategories: Array<string> = [];
      data.categories.map((cat) => userCategories.push(cat.id));
      setSelectedCategories([...userCategories]);
    }
  }, [data]);

  return (
    <Box sx={{ backgroundColor: "#FFFFFF", height: "100vh" }}>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1em",
            height: "100vh",
          }}
        >
          <img src={logoImage} />
          <Typography>
            {t("Veuillez choisir votre domaines de service")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2em",
              justifyContent: "center",
            }}
          >
            {categories?.map((category) => (
              <Box
                key={category.id}
                sx={{
                  width: "7em",
                  height: "12em",
                  position: "relative",
                }}
              >
                {selectedCategories.includes(category.id) ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      height: "2em",
                      width: "2em",
                      borderRadius: "50%",
                      backgroundColor: "#37C4A8",
                      transform: "translate(50%, -50%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                    }}
                  >
                    <CheckIcon sx={{ color: "#FFFFFF" }} />
                  </Box>
                ) : null}
                <Box
                  sx={{
                    height: "7em",
                    width: "7em",
                    borderRadius: "8px",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "scale(1.02)",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() =>
                    handleToggleCategory({ categoryId: category.id })
                  }
                >
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${
                      category.image
                    }`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography
                  sx={{ width: "100%", textAlign: "center", margin: "1em 0" }}
                >
                  {category.name_en}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              endIcon={<ArrowForwardIosIcon />}
              sx={{
                borderRadius: "8px",
                backgroundColor: "#F1C40F",
                color: "#2C3E50",
                textTransform: "none",
                padding: "0.5em 2em",
                "&:hover": {
                  backgroundColor: "#e4b90f",
                },
              }}
              onClick={handleNext}
              disabled={userIsLoading || selectedCategories.length === 0}
            >
              {t("Suivant")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Body;
