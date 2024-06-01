import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  adminCreateSubCategory,
  adminDeleteSubCategory,
  adminUpdateSubCategory,
} from "../../../state/actions/adminAction";
import { Category, SubCategory } from "../../../types";

const EditSubCategory = ({
  creatingSubCategory,
  setCreatingSubCategory,
  subCategoryArTitle,
  setSubCategoryArTitle,
  subCategoryEnTitle,
  setSubCategoryEnTitle,
  subCategoryPoints,
  setSubCategoryPoints,
  selectedSubCategory,
  setSelectedSubCategory,
  selectedCategory,
}: {
  creatingSubCategory: boolean;
  setCreatingSubCategory: React.Dispatch<React.SetStateAction<boolean>>;
  subCategoryArTitle: string;
  setSubCategoryArTitle: React.Dispatch<React.SetStateAction<string>>;
  subCategoryEnTitle: string;
  setSubCategoryEnTitle: React.Dispatch<React.SetStateAction<string>>;
  subCategoryPoints: number;
  setSubCategoryPoints: React.Dispatch<React.SetStateAction<number>>;
  selectedSubCategory: SubCategory | null;
  setSelectedSubCategory: React.Dispatch<
    React.SetStateAction<SubCategory | null>
  >;
  selectedCategory: Category | null;
}) => {
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleSaveSubCategory = () => {
    if (token && selectedCategory) {
      if (selectedSubCategory) {
        dispatch(
          adminUpdateSubCategory({
            token,
            subCategoryId: selectedSubCategory.pk,
            nameAr: subCategoryArTitle,
            nameEn: subCategoryEnTitle,
            points: subCategoryPoints,
            categoryId: selectedCategory.pk,
          })
        );
      } else if (creatingSubCategory) {
        dispatch(
          adminCreateSubCategory({
            token,
            nameAr: subCategoryArTitle,
            nameEn: subCategoryEnTitle,
            points: subCategoryPoints,
            categoryId: selectedCategory.pk,
          })
        );
      }
      setSelectedSubCategory(null);
      setCreatingSubCategory(false);
    }
  };
  const handleDeleteSubCategory = () => {
    if (token && selectedCategory && selectedSubCategory) {
      dispatch(
        adminDeleteSubCategory({
          token,
          subCategoryId: selectedSubCategory.pk,
          categoryId: selectedCategory.pk,
        })
      );
      setSelectedSubCategory(null);
    }
  };
  return (
    <Box sx={{ display: "flex", flex: 1, gap: "1em", padding: "1em" }}>
      <Box
        sx={{
          width: "5px",
          maxHeight: "100%",
          background:
            "repeating-linear-gradient(to bottom,transparent 0 4px,#2C3E5080 20px) 3px 100% no-repeat",
        }}
      />
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1em",
          }}
        >
          <Typography>{t("Category name (Arabic)")}</Typography>
          <TextField
            sx={{
              width: "20em",
              direction: "rtl",
              backgroundColor: "#F5F7F8",
              borderRadius: "8px",
            }}
            size="small"
            value={subCategoryArTitle}
            onChange={(e) => setSubCategoryArTitle(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1em",
            margin: "1em 0",
          }}
        >
          <Typography>{t("Category name (French)")}</Typography>
          <TextField
            sx={{
              width: "20em",
              backgroundColor: "#F5F7F8",
              borderRadius: "8px",
            }}
            size="small"
            value={subCategoryEnTitle}
            onChange={(e) => setSubCategoryEnTitle(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1em",
            margin: "0 0 1em 0",
          }}
        >
          <Typography>{t("Points per task")}</Typography>
          <TextField
            type="number"
            sx={{
              width: "20em",
              direction: "rtl",
              backgroundColor: "#F5F7F8",
              borderRadius: "8px",
            }}
            size="small"
            value={subCategoryPoints}
            inputProps={{ min: "0" }}
            onChange={(e) => setSubCategoryPoints(Number(e.target.value))}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#447EEF",
              padding: "0.5em 1em",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#3d77eb",
              },
            }}
            onClick={() => {
              setSelectedSubCategory(null);
              setCreatingSubCategory(false);
            }}
          >
            {t("Cancel")}
          </Button>
          {!creatingSubCategory && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FC4848",
                textTransform: "none",
                padding: "0.5em 1em",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#f83939",
                },
              }}
              onClick={handleDeleteSubCategory}
            >
              {t("Delete")}
            </Button>
          )}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1ABC9C",
              textTransform: "none",
              padding: "0.5em 1em",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#0ec09c",
              },
            }}
            onClick={handleSaveSubCategory}
          >
            {t("Save")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditSubCategory;
