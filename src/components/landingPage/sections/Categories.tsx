import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GridList from "./shared/GridList";
// import { categories } from "@/data/data";
import axios from "axios";
import Explore from "./Explore";

type Category = {
  id: number;
  name_ar: string;
  name_en: string;
  image: string;
};

const Categories = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState(null || []);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || i18n.language
  );

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/services/categories/`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSearchCategories = (searchTerm: string): void => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    if (searchTerm) {
      const filtered = categories.filter((categ: Category) => {
        if (language === "ar") {
          return categ.name_ar.toLowerCase().includes(lowerCaseSearchTerm);
        } else {
          return categ.name_en.toLowerCase().includes(lowerCaseSearchTerm);
        }
      });
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories); // Reset to all categories if search term is empty
    }
  };

  return (
    <section className="w-full flex flex-col justify-between items-center gap-9 my-5 font-lato">
      <Explore onSearchCategories={onSearchCategories} />
      <h1 className="text-[46px] max-md:text-[24px] max-lg:text-[32px] font-semibold text-myblack text-center">
        {t("categories.h1")}
      </h1>
      <GridList
        categories={
          filteredCategories.length == 0 ? categories : filteredCategories
        }
        language={language}
      />
      {/* <button className="bg-primary w-[222px] h-[62px] rounded-full text-[20px] font-semibold text-myblack mt-3">
        {t("categories.btn_text")}
      </button> */}
    </section>
  );
};

export default Categories;
