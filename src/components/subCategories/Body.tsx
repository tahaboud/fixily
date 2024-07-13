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

  const { token, data, userIsLoading, detail } = useAppSelector(
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
      const categoryIds: Array<string> = [];
      data.categories.map((cat) => categoryIds.push(cat.id));
      dispatch(getSubCategories({ categoryIds }));
      dispatch(getCategories());
    }
  }, [token, dispatch, data]);

  useEffect(() => {
    if (categories && data && data.categories) {
      const extractedNames: string[] = data.categories.map(
        (category) => category.name_en
      );

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
    dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
  }, [dispatch]);

  useEffect(() => {
    if (detail && detail.detail === "user updated successfully") {
      dispatch({ type: ActionEnums.CLEAN_AUTH_STATE });
      navigate("/wilayas");
    }
  }, [detail, navigate, dispatch]);

  useEffect(() => {
    if (data && data.sub_categories) {
      const userSubCategories = data.sub_categories.map(
        (sub_cat) => sub_cat.id
      );
      setSelectedSubCategories([...userSubCategories]);
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
            height: "100vh",
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
                key={subCategory.id}
                label={subCategory.name_en}
                variant="outlined"
                onClick={() => {
                  if (!selectedSubCategories.includes(subCategory.id)) {
                    setSelectedSubCategories((oldSubCategories) => [
                      ...oldSubCategories,
                      subCategory.id,
                    ]);
                  } else {
                    setSelectedSubCategories((oldSubCategories) => {
                      const subCategoryIndex = oldSubCategories.indexOf(
                        subCategory.id
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
                    subCategory.id
                  )
                    ? "#7CA5F4"
                    : "transparent",
                  color: selectedSubCategories.includes(subCategory.id)
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
