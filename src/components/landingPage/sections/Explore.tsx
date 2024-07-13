import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type ExploreProps = {
  onSearchCategories: (term: string) => void;
};

const Explore = ({ onSearchCategories }: ExploreProps) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem("language"));

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchCategories(event.target.value);
  };

  return (
    <section className="h-[400px] flex justify-center items-center xl:px-[400px] max-lg:px-[200px] max-md:px-[30px] font-lato">
      <div className="w-full  flex flex-col justify-around items-center gap-5">
        <h1 className="text-[46px] max-md:text-[24px] max-lg:text-[32px] font-semibold text-myblack text-center">
          {t("explore.h1")}
        </h1>
        <div className="w-[448px] max-sm:w-[300px] h-[86px] border border-myblue rounded-lg relative p-3 flex justify-between items-center">
          <input
            type="email"
            placeholder={t("explore.placeholder")}
            className={`border-none ring-0 outline-none ml-2 h-[80px] w-[70%] ${
              language == "ar" ? "text-right ml-[120px] max-sm:ml-[80px]" : ""
            } `}
            onChange={handleSearch}
          />

          <div
            className={`bg-myblue hover:bg-blue-400 w-[55px] h-[55px] flex justify-center items-center rounded-lg absolute ${
              language == "ar" ? "left-2" : "right-2"
            }  hover:cursor-pointer`}
          >
            <img src="/src/assets/loop.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
