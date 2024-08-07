import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getSubCategories } from "../../../../state/actions/servicesAction";
import { Category, SubCategory } from "../../../../types";

const SubCategoryStep = ({
  setStep,
  selectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
}: {
  setStep: Dispatch<SetStateAction<0 | 1 | 2 | 3 | 4>>;
  selectedCategory: Category | null;
  selectedSubCategory: SubCategory | null;
  setSelectedSubCategory: Dispatch<SetStateAction<SubCategory | null>>;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);
  const { subCategories } = useAppSelector((state) => state.services);

  useEffect(() => {
    if (token && selectedCategory) {
      dispatch(getSubCategories({ categoryIds: [selectedCategory.id] }));
    }
  }, [token, dispatch, selectedCategory]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography sx={{ margin: "1em 0", fontWeight: 600 }}>
        {t("choose_a_sub_category")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1em",
          padding: "1em 0",
          height: "82%",
        }}
      >
        <RadioGroup
          value={selectedSubCategory?.id}
          onChange={(e) => {
            if (subCategories) {
              const subCategoryIndex = subCategories.findIndex(
                (value) => value.id == e.target.value
              );
              setSelectedSubCategory(subCategories[subCategoryIndex]);
            }
          }}
          sx={{ width: "100%", gap: "1em" }}
        >
          {subCategories?.map((subCategory) => (
            <FormControlLabel
              key={subCategory.id}
              value={subCategory.id}
              control={<Radio />}
              label={subCategory.name_en}
              sx={{
                border: "1px solid #2C3E5033",
                borderRadius: "8px",
                "&:hover": {
                  border: "1px solid #447EEF4D",
                  backgroundColor: "#447EEF33",
                },
              }}
            />
          ))}
        </RadioGroup>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <IconButton
          sx={{
            backgroundColor: "#2C3E50",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#283849" },
          }}
          onClick={() => setStep(0)}
        >
          <KeyboardArrowLeftIcon sx={{ color: "#FFFFFF" }} />
        </IconButton>
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
          onClick={() => setStep(2)}
          disabled={selectedSubCategory === null}
        >
          {t("next")}
        </Button>
      </Box>
    </Box>
  );
};

export default SubCategoryStep;
