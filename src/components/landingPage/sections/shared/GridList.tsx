import { createSearchParams, useNavigate } from "react-router-dom";

type Category = {
  id: number;
  name_ar: string;
  name_en: string;
  image: string;
};

type CategoryProps = {
  categories: Category[];
  language: string; // Assume language is passed as a prop
};

const GridList = ({ categories, language }: CategoryProps) => {
  const navigate = useNavigate();

  return (
    <ul className="grid-container">
      {categories.map((category) => (
        <li
          key={category.id}
          className="flex flex-col items-center gap-5"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate({
              pathname: "new-job",
              search: createSearchParams({
                category: String(category.id),
              }).toString(),
            })
          }
        >
          <img
            src={
              import.meta.env.VITE_REACT_APP_IMAGE_URL + category.image ||
              "/assets/images/renovation.png"
            }
            alt={
              language.substring(0, 2) === "ar"
                ? category.image
                : category.name_en
            }
            className="object-cover"
          />
          <h3 className="text-[24px] font-semibold text-myblack text-center">
            {language.substring(0, 2) === "ar"
              ? category.name_ar
              : category.name_en}
          </h3>
        </li>
      ))}
    </ul>
  );
};

export default GridList;
