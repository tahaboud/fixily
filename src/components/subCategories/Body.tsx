import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUser } from "../../state/actions/authActions";
import {
  getCategories,
  getSubCategories,
} from "../../state/actions/servicesAction";
import { ActionEnums } from "../../state/types/actionEnums";

const Body = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, data, userIsLoading, details } = useAppSelector(
    (state) => state.auth
  );
  const { categories, subCategories } = useAppSelector(
    (state) => state.services
  );
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState<
    Array<string>
  >([]);
  useEffect(() => {
    if (token && data && data.categories) {
      dispatch(getSubCategories({ token, categoryIds: data.categories }));
      dispatch(getCategories({ token }));
    }
  }, [token, dispatch, data]);
  useEffect(() => {
    if (categories && data && data.categories) {
      const extractedNames: string[] = data.categories.map((category) => {
        const categoryName = categories.find((cat) => cat.pk === category);
        return categoryName ? categoryName.name_en : "";
      });

      const finalString: string = extractedNames.reduce((acc, name, index) => {
        if (index === 0) {
          return name;
        } else if (index === extractedNames.length - 1) {
          return acc + " et " + name;
        } else {
          return acc + ", " + name;
        }
      }, "");
      setSelectedCategories(finalString);
    }
  }, [categories, data]);
  const handleNext = () => {
    if (token) {
      dispatch(updateUser({ token, subCategories: selectedSubCategories }));
    }
  };
  useEffect(() => {
    if (details && details.details === "user updated successfully") {
      navigate("/wilayas");
    }
  }, [details, navigate]);
  useEffect(() => {
    dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
  }, [dispatch]);
  useEffect(() => {
    if (data && data.sub_categories) {
      setSelectedSubCategories(data.sub_categories);
    }
  }, [data]);
  return (
    <Box sx={{ backgroundColor: "#FFFFFF" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1em",
          }}
        >
          <img src={logoImage} />
          <Typography sx={{ fontSize: "1.3rem" }}>
            {selectedCategories}
          </Typography>
          <Typography>{t("Veuillez choisir votre specialité")}</Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1em",
              margin: "1em",
              height: "60vh",
            }}
          >
            {subCategories?.map((subCategory) => (
              <Chip
                key={subCategory.pk}
                label={subCategory.name_en}
                variant="outlined"
                onClick={() => {
                  if (!selectedSubCategories.includes(subCategory.pk)) {
                    setSelectedSubCategories((oldSubCategories) => [
                      ...oldSubCategories,
                      subCategory.pk,
                    ]);
                  } else {
                    setSelectedSubCategories((oldSubCategories) => {
                      const subCategoryIndex = oldSubCategories.indexOf(
                        subCategory.pk
                      );
                      const newSubCategories = [...oldSubCategories];
                      newSubCategories.splice(subCategoryIndex, 1);
                      return newSubCategories;
                    });
                  }
                }}
                sx={{
                  fontSize: "1.2rem",
                  padding: "0.5em 1em",
                  backgroundColor: selectedSubCategories.includes(
                    subCategory.pk
                  )
                    ? "#7CA5F4"
                    : "transparent",
                  color: selectedSubCategories.includes(subCategory.pk)
                    ? "#FFFFFF"
                    : "#000000",
                  "&:hover": {
                    backgroundColor: "#5a8ef7 !important",
                    color: "#FFFFFF",
                  },
                }}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: "#2C3E50",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#273644" },
              }}
              onClick={() => navigate("/categories")}
            >
              <ArrowBackIosNewIcon sx={{ color: "#FFFFFF" }} />
            </IconButton>
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
              disabled={userIsLoading || selectedSubCategories.length === 0}
              onClick={handleNext}
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
