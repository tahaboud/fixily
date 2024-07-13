import { Trans, useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useEffect, useState } from "react";

const QaSection = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || i18n.language
  );

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <section className="h-auto w-full py-6 font-lato">
      <div className="flex flex-col gap-7 justify-between items-center px-7 xl:px-[250px] 2xl:px-[400px]">
        <h1 className="text-[46px] max-md:text-[24px] max-lg:text-[32px] font-semibold text-myblack text-center">
          {t("qa.h1")}
        </h1>
        <p className="text-lightblack text-[20px] max-md:text-[18px] text-center">
          <Trans i18nKey="qa.sub" />
        </p>
        <Accordion
          type="single"
          collapsible
          dir={language === "ar" ? "rtl" : "ltr"}
          className="w-full border border-myblack rounded-xl px-4 py-4"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-[24px] text-myblack font-semibold">
              <div
                className={`w-full ${
                  language === "ar" ? "text-right" : "text-left"
                } px-3`}
              >
                {t("qa.q1")}
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={`text-[18px] text-lightblack px-2  ${
                language == "ar" ? "text-right" : ""
              }`}
            >
              {t("qa.a1")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-[24px] text-myblack font-semibold">
              <div
                className={`w-full ${
                  language === "ar" ? "text-right" : "text-left"
                } px-3`}
              >
                {t("qa.q2")}
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={`text-[18px] text-lightblack px-2  ${
                language == "ar" ? "text-right" : ""
              }`}
            >
              {t("qa.a2")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-[24px] text-myblack font-semibold">
              <div
                className={`w-full ${
                  language === "ar" ? "text-right" : "text-left"
                } px-3`}
              >
                {t("qa.q3")}
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={`text-[18px] text-lightblack px-2  ${
                language == "ar" ? "text-right" : ""
              }`}
            >
              {t("qa.a3")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-[24px] text-myblack font-semibold">
              <div
                className={`w-full ${
                  language === "ar" ? "text-right" : "text-left"
                } px-3`}
              >
                {t("qa.q4")}
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={`text-[18px] text-lightblack px-2  ${
                language == "ar" ? "text-right" : ""
              }`}
            >
              {t("qa.a4")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-[24px] text-myblack font-semibold">
              <div
                className={`w-full ${
                  language === "ar" ? "text-right" : "text-left"
                } px-3`}
              >
                {t("qa.q5")}
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={`text-[18px] text-lightblack px-2  ${
                language == "ar" ? "text-right" : ""
              }`}
            >
              {t("qa.a5")}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default QaSection;
