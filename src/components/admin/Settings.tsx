import { Box } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  adminCreateCategory,
  adminUpdateCategory,
} from "../../state/actions/adminAction";
import { Category } from "../../types";
import Categories from "./settingsTab/Categories";
import EditCategory from "./settingsTab/EditCategory";
import Header from "./settingsTab/Header";

const Settings = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [categoryArTitle, setCategoryArTitle] = useState("");
  const [categoryEnTitle, setCategoryEnTitle] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCategoryArTitle(category.name_ar);
    setCategoryEnTitle(category.name_en);
    setPictureUrl(category.image);
  };
  const handleCreateSave = () => {
    if (token) {
      if (selectedCategory) {
        if (picture) {
          dispatch(
            adminUpdateCategory({
              token,
              categoryId: selectedCategory.pk,
              nameAr: categoryArTitle,
              nameEn: categoryEnTitle,
              image: picture,
            })
          );
        } else {
          dispatch(
            adminUpdateCategory({
              token,
              categoryId: selectedCategory.pk,
              nameAr: categoryArTitle,
              nameEn: categoryEnTitle,
            })
          );
        }
      } else if (creatingCategory && picture) {
        dispatch(
          adminCreateCategory({
            token,
            nameAr: categoryArTitle,
            nameEn: categoryEnTitle,
            image: picture,
          })
        );
      }
      setSelectedCategory(null);
      setCreatingCategory(false);
    } else {
      setCreatingCategory(true);
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 8px 0px #00000017",
        borderRadius: "16px",
        margin: "2em",
        height: "100%",
      }}
    >
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleCreateSave={handleCreateSave}
        creating={creatingCategory}
        setCreating={setCreatingCategory}
      />
      {selectedCategory === null && !creatingCategory ? (
        <Categories handleClickCategory={handleCategorySelect} />
      ) : (
        <EditCategory
          creatingCategory={creatingCategory}
          category={selectedCategory}
          categoryArTitle={categoryArTitle}
          setCategoryArTitle={setCategoryArTitle}
          categoryEnTitle={categoryEnTitle}
          setCategoryEnTitle={setCategoryEnTitle}
          picture={picture}
          setPicture={setPicture}
          pictureUrl={pictureUrl}
          setPictureUrl={setPictureUrl}
        />
      )}
    </Box>
  );
};

export default Settings;
