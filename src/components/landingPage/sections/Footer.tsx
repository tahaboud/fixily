import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  const agencyDetails = {
    email: "Taha@fixily.com",
    mobileNumber: "0770 12 23 34",
  };

  return (
    <footer className="h-auto bg-secondary font-lato">
      <div className="w-full flex flex-col gap-9 p-8 lg:px-[200px] lg:py-[100px] max-lg:px-[30px]">
        <div className="flex max-md:flex-col lg:gap-[200px] gap-[80px] ">
          <div className="flex flex-col gap-8 ">
            <img
              src="/src/assets/fixily.webp"
              alt="logo"
              className="w-[172px] h-[64px]"
            />
            <p className="text-lightblack pl-[20px]">
              {<Trans i18nKey="footer.txt_below_logo" />}
            </p>
            <div className="flex gap-2 pl-[20px] pt-2">
              <img src="/src/assets/facebook.webp" alt="" />
              <img src="/src/assets/insta.webp" alt="" />
              <img src="/src/assets/linkedIn.webp" alt="" />
              <img src="/src/assets/youtube.webp" alt="" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-[35px] max-md:text-[24px]  font-semibold text-myblack ">
              {t("footer.contanctez_nous")}
            </h2>
            <p className="text-base  font-semibold text-lightblack ">
              {agencyDetails.email}
            </p>
            <p className="text-base  font-semibold text-lightblack ">
              {agencyDetails.mobileNumber}
            </p>
            <div className="flex max-xl:flex-col  xl:items-center w-full gap-4 pt-[25px]">
              <img
                src="/src/assets/apple.webp"
                alt="apple"
                className="w-[227px]"
              />
              <img
                src="/src/assets/google.webp"
                alt="ggle"
                className="w-[227px]"
              />
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-slate-950"></div>
        <div className="w-full flex max-md:flex-col md:justify-center items-center gap-5 text-base  font-semibold text-lightblack">
          <Link to="/">{t("footer.copyright")}</Link>
          <Link to="/">{t("footer.droits")}</Link>
          <Link to="/">{t("footer.mentions")}</Link>
          <Link to="/">{t("footer.condition")}</Link>
          <Link to="/policy">{t("footer.politique")}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;