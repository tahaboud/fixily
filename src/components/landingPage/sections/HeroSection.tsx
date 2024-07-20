import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || i18n.language
  );

  useEffect(() => {
    setLanguage(localStorage.getItem("language") || i18n.language);
  }, [i18n.language]);

  return (
    <section
      className={`px-20 h-auto bg-secondary flex ${
        language == "ar" ? "flex-row-reverse" : ""
      } items-center justify-around font-lato w-full max-lg:flex-col max-lg:gap-7  max-lg:py-4 max-md:gap-5 max-md:pt-6`}
    >
      <div
        className={`flex flex-col justify-around gap-4 max-md:items-center  ${
          language == "ar" ? "text-right" : ""
        } `}
      >
        <h1 className="text-[46px] max-md:text-[30px] font-semibold text-myblack">
          <Trans i18nKey="hero.h1" />
        </h1>
        <p className="text-lightblack  tracking-wide">{t("hero.subtitle")}</p>
        <div
          className={`flex flex-1 items-center ${
            language == "ar" ? "justify-end" : ""
          } gap-5 max-sm:flex-col`}
        >
          <img src="/src/assets/apple.webp" alt="" />
          <img src="/src/assets/google.webp" alt="" />
        </div>
      </div>
      <div>
        <img
          src="/src/assets/hero_image.webp"
          alt=""
          className="w-full h-auto max-w-[419px] max-h-[589px] md:max-w-[300px]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
