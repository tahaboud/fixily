import { Box, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { adminDeleteCategory } from "../../../state/actions/adminAction";
import { Category } from "../../../types";

const Header = ({
  selectedCategory,
  setSelectedCategory,
  handleCreateSave,
  creating,
  setCreating,
}: {
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  handleCreateSave: () => void;
  creating: boolean;
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleDeleteCategory = () => {
    if (token && selectedCategory) {
      dispatch(adminDeleteCategory({ token, categoryId: selectedCategory.id }));
      setSelectedCategory(null);
    }
  };
  return (
    <Box sx={{ padding: "1em" }}>
      <Box
        sx={{
          height: "5em",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {selectedCategory || creating ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#447EEF",
              textTransform: "none",
              borderRadius: "32px",

              "&:hover": { backgroundColor: "#3d79f0" },
            }}
            onClick={() => {
              setSelectedCategory(null), setCreating(false);
            }}
          >
            {t("Cancel")}
          </Button>
        ) : null}
        <Box sx={{ flex: 1 }} />
        {selectedCategory && !creating ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FC4848",
              textTransform: "none",
              borderRadius: "32px",

              "&:hover": { backgroundColor: "#f83939" },
            }}
            onClick={handleDeleteCategory}
          >
            {t("Delete")}
          </Button>
        ) : null}
        <Box sx={{ flex: 1 }} />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#F1C40F",
            textTransform: "none",
            borderRadius: "32px",
            color: "#000000",
            padding: "0.5em 1em",
            "&:hover": { backgroundColor: "#eec009" },
          }}
          onClick={handleCreateSave}
        >
          {selectedCategory || creating ? t("Save") : t("Create")}
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
