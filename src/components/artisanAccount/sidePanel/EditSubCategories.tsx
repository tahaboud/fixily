import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { updateUser } from "../../../state/actions/authActions";
import {
  getCategories,
  getSubCategories,
} from "../../../state/actions/servicesAction";
import { User } from "../../../types";
import {
  SnackbarContext,
  SnackbarContextType,
} from "../../common/SnackbarContext";

const EditSubCategories = ({
  user,
  setSidePanelOpen,
}: {
  user: User;
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { categories, subCategories } = useAppSelector(
    (state) => state.services
  );
  const { token } = useAppSelector((state) => state.auth);
  const { setSnack } = useContext<SnackbarContextType>(SnackbarContext);

  const [editingStep, setEditingStep] = useState<
    "categories" | "sub_categories"
  >("categories");
  const [selectedCategories, setSelectedCategories] = useState(
    user.categories.map((category) => category.id)
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState(
    user.sub_categories.map((subCategory) => subCategory.id)
  );

  useEffect(() => {
    if (token) {
      dispatch(getCategories());
    }
  }, [token, dispatch]);

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

  const handleToggleSubCategory = ({
    subCategoryId,
  }: {
    subCategoryId: string;
  }) => {
    if (!selectedSubCategories.includes(subCategoryId)) {
      setSelectedSubCategories((oldSubCategories) => [
        ...oldSubCategories,
        subCategoryId,
      ]);
    } else {
      setSelectedSubCategories((oldSubCategories) => {
        const subCategoryIndex = oldSubCategories.indexOf(subCategoryId);
        const newSubCategories = [...oldSubCategories];
        newSubCategories.splice(subCategoryIndex, 1);
        return newSubCategories;
      });
    }
  };

  const handleNext = () => {
    if (token) {
      if (editingStep === "categories") {
        setEditingStep("sub_categories");
        dispatch(getSubCategories({ categoryIds: selectedCategories }));
      } else {
        dispatch(
          updateUser({
            token,
            categories: selectedCategories,
            subCategories: selectedSubCategories,
          })
        );
        setSidePanelOpen(false);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        height: "90%",
        padding: "0 1em 0 0",
      }}
    >
      {editingStep === "categories" ? (
        <Box
          sx={{
            display: "flex",
            gap: "1em",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {categories?.map((category) => (
            <Box
              key={category.id}
              sx={{
                position: "relative",
              }}
            >
              {selectedCategories.includes(category.id) ? (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: "1.2em",
                    width: "1.2em",
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
                  height: "4em",
                  width: "4em",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundImage: `url(${
                    import.meta.env.VITE_REACT_APP_IMAGE_URL
                  }${category.image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  "&:hover": {
                    transform: "scale(1.02)",
                    cursor: "pointer",
                  },
                }}
                onClick={() =>
                  handleToggleCategory({ categoryId: category.id })
                }
              />
              <Typography
                sx={{ width: "100%", textAlign: "center", margin: "1em 0" }}
              >
                {category.name_en}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          {subCategories?.map((subCategory) => (
            <Chip
              key={subCategory.id}
              label={subCategory.name_en}
              variant="outlined"
              onClick={() =>
                handleToggleSubCategory({ subCategoryId: subCategory.id })
              }
              sx={{
                fontSize: "1.2rem",
                padding: "0.5em 1em",
                backgroundColor: selectedSubCategories.includes(subCategory.id)
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
      )}
      <Box sx={{ flex: 1 }} />
      <Box sx={{ display: "flex", gap: "1em" }}>
        {editingStep === "sub_categories" ? (
          <IconButton
            sx={{
              backgroundColor: "#2C3E50",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#263544",
              },
            }}
            onClick={() => setEditingStep("categories")}
          >
            <ArrowBackIosNewIcon sx={{ color: "#FFFFFF" }} />
          </IconButton>
        ) : null}
        <Button
          variant="contained"
          sx={{
            width: "100%",
            color: "#FFFFFF",
            backgroundColor: "#F1C40F",
            textTransform: "none",
            "&:hover": { backgroundColor: "#e4b90f" },
          }}
          disabled={selectedCategories.length === 0}
          onClick={handleNext}
        >
          {editingStep === "categories" ? t("next") : t("save")}
        </Button>
      </Box>
    </Box>
  );
};

export default EditSubCategories;
