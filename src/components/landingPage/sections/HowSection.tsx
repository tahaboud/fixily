import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { steps } from "../data";
import GridSteps from "./shared/GridSteps";

const HowSection = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || i18n.language
  );

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <section
      className={`h-auto w-full bg-secondary py-14 font-lato px-[180px] max-md:px-7 ${
        language == "ar" ? "text-right" : ""
      }`}
    >
      <div className="flex flex-col justify-between gap-8">
        <h1 className="text-[46px] max-md:text-[24px] max-lg:text-[32px] font-semibold text-myblack ">
          {t("howSection.h1")}
        </h1>
        <p className="text-lightblack">
          <Trans i18nKey="howSection.para" />
        </p>
        <GridSteps steps={steps} showEtape={true} />
      </div>
    </section>
  );
};

export default HowSection;
