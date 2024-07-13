import { useTranslation } from "react-i18next";
import { articles } from "../data";
import GridSteps from "./shared/GridSteps";

const ArticleSection = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full flex flex-col justify-between items-center gap-9 my-[80px] font-lato">
      <h1 className="text-[46px] max-md:text-[24px] max-lg:text-[32px] font-semibold text-myblack text-center">
        {t("articles.h1")}
      </h1>
      <GridSteps steps={articles} showEtape={false} />
      <button className="bg-primary w-[222px] h-[62px] rounded-full text-[20px] font-semibold text-myblack mt-3">
        {t("articles.btn_text")}
      </button>
    </section>
  );
};

export default ArticleSection;
