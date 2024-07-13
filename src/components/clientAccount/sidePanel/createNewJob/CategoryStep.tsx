import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getCategories } from "../../../../state/actions/servicesAction";
import { Category } from "../../../../types";

const SubCategoryStep = ({
  setStep,
  selectedCategory,
  setSelectedCategory,
}: {
  setStep: Dispatch<SetStateAction<0 | 1 | 2 | 3 | 4>>;
  selectedCategory: Category | null;
  setSelectedCategory: Dispatch<SetStateAction<Category | null>>;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.services);

  useEffect(() => {
    if (token) {
      dispatch(getCategories());
    }
  }, [token, dispatch]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "0 1em 1em 0",
      }}
    >
      <Typography sx={{ fontWeight: 600 }}>{t("choose_a_category")}</Typography>
      <Box
        className="scrollbar"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1em",
          padding: "1em 0",
          maxHeight: "calc(100% - 7em)",
          overflowY: "auto",
        }}
      >
        {categories?.map((category) => (
          <Box key={category.id}>
            <Box
              sx={{
                backgroundImage: `url(${
                  import.meta.env.VITE_REACT_APP_IMAGE_URL
                }${category.image})`,
                backgroundSize: "cover",
                backgroundRepeat: "none",
                borderRadius: "8px",
                position: "relative",
                height: "5em",
                width: "5em",
                cursor: "pointer",
              }}
              onClick={() => setSelectedCategory(category)}
            >
              {selectedCategory === category && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: "1em",
                    width: "1em",
                    borderRadius: "50%",
                    backgroundColor: "#37C4A8",
                    transform: "translate(50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <CheckIcon sx={{ color: "#FFFFFF", fontSize: "0.8rem" }} />
                </Box>
              )}
            </Box>
            <Typography sx={{ textAlign: "center" }}>
              {category.name_en}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ flex: 1 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1em",
          height: "2em",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#F1C40F",
            borderRadius: "8px",
            textTransform: "none",
            color: "#000000",
            width: "100%",
            "&:hover": {
              backgroundColor: "#d8b011",
            },
          }}
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          onClick={() => setStep(1)}
          disabled={selectedCategory === null}
        >
          {t("next")}
        </Button>
      </Box>
    </Box>
  );
};

export default SubCategoryStep;
