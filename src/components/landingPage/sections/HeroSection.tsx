import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import apple from "../../../assets/apple.webp";
import google from "../../../assets/google.webp";
import hero_image from "../../../assets/hero_image.webp";

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
      className={`px-4 md:px-20 xl:px-40 h-screen bg-secondary flex ${
        language == "ar" ? "flex-row-reverse" : ""
      } items-center justify-between font-lato w-full max-lg:flex-col max-lg:gap-7  max-lg:py-4 max-md:gap-5 max-lg:pt-10 pt-0`}>
      <div
        className={`flex flex-col justify-around gap-4 max-md:items-center  ${
          language == "ar" ? "text-right" : ""
        } `}>
        <h1 className="text-[46px] max-md:text-[30px] font-semibold text-myblack">
          <Trans i18nKey="hero.h1" />
        </h1>
        <p className="text-lightblack  tracking-wide">{t("hero.subtitle")}</p>
        <div
          className={`flex flex-1 items-center ${
            language == "ar" ? "justify-end" : ""
          } gap-5 max-sm:flex-col`}>
          <img src={apple} alt="" />
          <img src={google} alt="" />
        </div>
      </div>
      <div>
        <img
          src={hero_image}
          alt=""
          className="w-full h-auto max-w-[419px] max-h-[589px] md:max-w-[500px]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
