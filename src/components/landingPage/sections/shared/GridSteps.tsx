// import { steps } from "@/data/data";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Step = {
  imgUrl: string;
  order?: string;
  title_fr: string;
  title_ar: string;
  content_fr: string;
  content_ar: string;
};

type StepsProps = {
  steps: Step[];
  showEtape: boolean;
};

const GridSteps = ({ steps, showEtape }: StepsProps) => {
  const { t, i18n } = useTranslation();

  const [isReversed, setIsReversed] = useState(false);

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || i18n.language
  );

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    const handleResize = () => {
      setIsReversed(window.innerWidth >= 1280); // lg size and higher
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, [i18n]);

  const displaySteps = isReversed ? [...steps].reverse() : steps;

  return (
    <div className="w-full flex justify-center items-center mt-5 font-lato">
      <ul className={`grid-steps w-full ${language === "ar" ? "rtl" : ""}`}>
        {displaySteps.map((step, index) => (
          <li key={index} className="flex flex-col items-center gap-5">
            <img
              src={step.imgUrl}
              alt={language === "ar" ? step.title_ar : step.title_fr}
              className={`object-cover h-[250px] w-[250px] ${
                !showEtape ? "rounded-lg w-[300px]" : ""
              }`}
            />
            <div
              className={`flex flex-col gap-3 text-center ${
                !showEtape ? "max-sm:px-3 max-w-[400px]" : ""
              }`}
            >
              {showEtape && (
                <h3 className="text-[24px] font-semibold text-myblack text-center">
                  <div
                    className={`flex justify-center items-center gap-2 w-full ${
                      language === "ar" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <p>{t("howSection.etape")}</p>
                    <p>{step.order}</p>
                  </div>
                </h3>
              )}
              <p className="text-[24px] font-semibold text-myblack text-center">
                {language === "ar" ? step.title_ar : step.title_fr}
              </p>
              <p className="text-lightblack">
                {language === "ar" ? step.content_ar : step.content_fr}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GridSteps;
