import { Box, TextField, Typography } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  createRef,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getSubCategories } from "../../../state/actions/servicesAction";
import { Category, SubCategory } from "../../../types";
import EditSubCategory from "./EditSubCategory";

const EditCategory = ({
  creatingCategory,
  category,
  categoryArTitle,
  setCategoryArTitle,
  categoryEnTitle,
  setCategoryEnTitle,
  picture,
  setPicture,
  pictureUrl,
  setPictureUrl,
}: {
  creatingCategory: boolean;
  category: Category | null;
  categoryArTitle: string;
  setCategoryArTitle: Dispatch<SetStateAction<string>>;
  categoryEnTitle: string;
  setCategoryEnTitle: Dispatch<SetStateAction<string>>;
  picture: File | null;
  setPicture: Dispatch<SetStateAction<File | null>>;
  pictureUrl: string | null;
  setPictureUrl: Dispatch<SetStateAction<string | null>>;
}) => {
  const { t } = useTranslation();
  const inputRef = createRef<HTMLInputElement>();
  const [creatingSubCategory, setCreatingSubCategory] = useState(false);
  const [subCategoryArTitle, setSubCategoryArTitle] = useState("");
  const [subCategoryEnTitle, setSubCategoryEnTitle] = useState("");
  const [subCategoryPoints, setSubCategoryPoints] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const dispatch = useAppDispatch();
  const { subCategories } = useAppSelector((state) => state.services);
  const { token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (token && category) {
      dispatch(getSubCategories({ token, categoryIds: [category.pk] }));
    }
  }, [token, dispatch, category]);
  useEffect(() => {
    if (picture) {
      setPictureUrl(URL.createObjectURL(picture));
    }
  }, [picture, setPictureUrl]);
  const handleSelectSubCategory = (subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory);
    setSubCategoryArTitle(subCategory.name_ar);
    setSubCategoryEnTitle(subCategory.name_en);
    setSubCategoryPoints(subCategory.point_cost);
  };
  return (
    <Box sx={{ display: "flex", gap: "1em", position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1em",
          gap: "1em",
          flex: 2,
        }}
      >
        <Box
          sx={{
            height: "7em",
            width: "7em",
            backgroundColor: "#D9D9D9",
            backgroundImage: picture
              ? `url(${pictureUrl})`
              : `url(${import.meta.env.VITE_REACT_APP_API_URL}${pictureUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "8px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => inputRef.current?.click()}
        />
        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={(e) => {
            if (e.target.files) {
              setPicture(e.target.files[0]);
            }
          }}
        />
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
            value={categoryArTitle}
            onChange={(e) => setCategoryArTitle(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1em",
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
            value={categoryEnTitle}
            onChange={(e) => setCategoryEnTitle(e.target.value)}
          />
        </Box>
        {!creatingCategory && (
          <>
            <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
              {t("Sub-categories")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1em",
              }}
            >
              {subCategories &&
                subCategories.map((subCategory) => (
                  <Box
                    sx={{
                      borderRadius: "100px",
                      border: "1px solid #2C3E504D",
                      padding: "1em",
                      backgroundColor:
                        selectedSubCategory?.pk === subCategory.pk
                          ? "#7CA5F4"
                          : "transparent",
                      userSelect: "none",
                      "&:hover": {
                        backgroundColor:
                          selectedSubCategory?.pk === subCategory.pk
                            ? "#6c99f3"
                            : "#F5F7F8",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleSelectSubCategory(subCategory)}
                  >
                    <Typography textAlign={"center"}>
                      {subCategory.name_ar}
                    </Typography>
                    <Typography textAlign={"center"}>
                      {subCategory.name_en}
                    </Typography>
                  </Box>
                ))}
              <Box
                sx={{
                  borderRadius: "100px",
                  border: "1px dashed #447EEF",
                  padding: "1em",
                  backgroundColor: "transparent",
                  userSelect: "none",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => setCreatingSubCategory(true)}
              >
                <Typography textAlign={"center"} sx={{ color: "#447EEF" }}>
                  {t("Add")}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
      {selectedSubCategory || creatingSubCategory ? (
        <EditSubCategory
          creatingSubCategory={creatingSubCategory}
          setCreatingSubCategory={setCreatingSubCategory}
          selectedCategory={category}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          subCategoryArTitle={subCategoryArTitle}
          setSubCategoryArTitle={setSubCategoryArTitle}
          subCategoryEnTitle={subCategoryEnTitle}
          setSubCategoryEnTitle={setSubCategoryEnTitle}
          subCategoryPoints={subCategoryPoints}
          setSubCategoryPoints={setSubCategoryPoints}
        />
      ) : null}
    </Box>
  );
};

export default EditCategory;
