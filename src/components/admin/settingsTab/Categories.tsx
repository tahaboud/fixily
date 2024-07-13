import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getCategories } from "../../../state/actions/servicesAction";
import { Category } from "../../../types";

const Categories = ({
  handleClickCategory,
}: {
  handleClickCategory: (category: Category) => void;
}) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.services);
  const { token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      dispatch(getCategories());
    }
  }, [token, dispatch]);
  return (
    <Box sx={{ display: "flex", gap: "1em", flexWrap: "wrap", padding: "1em" }}>
      {categories &&
        categories.map((category) => (
          <Box
            key={category.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: "7em",
                width: "7em",
                backgroundImage: `url(${
                  import.meta.env.VITE_REACT_APP_IMAGE_URL
                }${category.image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                borderRadius: "8px",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => handleClickCategory(category)}
            />
            <Typography>{category.name_en}</Typography>
          </Box>
        ))}
    </Box>
  );
};

export default Categories;
