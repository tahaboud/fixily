import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { logout } from "../../../state/actions/authActions";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Navbar = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || i18n.language
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem("language", lng);
  }, [i18n]);

  const handleLanguageChange = (value: string) => {
    //for resposivity
    setLanguage(value);

    //changing the website language
    i18n.changeLanguage(value);

    //using local storage to store the current lang
    localStorage.setItem("language", value);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center text-4xl h-[100px] px-4 md:px-20 xl:px-40 bg-secondary z-20 ${"shadow-lg"}`}>
      <div>
        <img src="/src/assets/fixily.png" alt="" className="w-[120px]" />
      </div>
      <div className="gap-4 items-center justify-end w-full max-w-[70%] hidden md:flex">
        <Select onValueChange={handleLanguageChange}>
          <SelectTrigger className="text-myblack font-bold w-fit bg-secondary">
            <img src="/src/assets/translate.png" alt="translate" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="fr">
                <div
                  className={`${language === "ar" ? "text-right" : ""} w-full`}>
                  {t("navbar.language.francais")}
                </div>
              </SelectItem>
              <SelectItem value="ar">
                <div
                  className={`${language === "ar" ? "text-right" : ""} w-full`}>
                  {t("navbar.language.arabe")}
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Button
              className="bg-transparent text-myblack rounded-3xl w-[112px] h-[48px] border border-myblack"
              onClick={() => navigate("/account")}>
              {t("navbar.account")}
            </Button>
            <Button
              className="bg-primary text-myblack rounded-3xl w-[112px] h-[48px]"
              onClick={() => (token ? dispatch(logout({ token })) : null)}>
              {t("navbar.logout")}
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              className="bg-transparent text-myblack rounded-3xl w-[112px] h-[48px] border border-myblack"
              onClick={() => navigate("/login")}>
              {t("navbar.seconnecter")}
            </Button>
            <Button
              className="bg-primary text-myblack rounded-3xl w-[112px] h-[48px]"
              onClick={() => navigate("/login")}>
              {t("navbar.rejoindre")}
            </Button>
          </div>
        )}
      </div>
      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="border-none bg-transparent">
              <img src="/src/assets/burger_menu.png" alt="burger menu" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>

            <div className="flex flex-col gap-9 p-4">
              <Select onValueChange={handleLanguageChange}>
                <SelectTrigger className="text-myblack font-bold w-full bg-secondary">
                  <img src="/src/assets/translate.png" alt="translate" />
                  <SelectValue
                    placeholder={t("navbar.language.language")}
                    className="hidden"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="fr">
                      <div
                        className={`${
                          language === "ar" ? "text-right" : ""
                        } w-full`}>
                        {t("navbar.language.francais")}
                      </div>
                    </SelectItem>
                    <SelectItem value="ar">
                      <div
                        className={`${
                          language === "ar" ? "text-right" : ""
                        } w-full`}>
                        {t("navbar.language.arabe")}
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger className="text-myblack text-base font-medium flex items-center gap-2 hover:bg-secondary p-2 rounded-lg">
                  <div
                    className={`p-1 flex items-center gap-1 w-full ${
                      language === "ar" ? "flex-row-reverse" : ""
                    }`}>
                    <div className="flex justify-center items-center w-full">
                      {t("navbar.services")}
                    </div>
                    <img src="/src/assets/arrow_down.png" alt="arrow down" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-3">
                  <DropdownMenuLabel
                    className={`${
                      language === "ar" ? "text-right" : ""
                    } w-full`}>
                    {t("navbar.services")}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="w-full">
                    <div
                      className={`${
                        language === "ar" ? "text-right" : ""
                      } w-full`}>
                      وفي
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="w-full">
                    <div
                      className={`${
                        language === "ar" ? "text-right" : ""
                      } w-full`}>
                      Billing
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="w-full">
                    <div
                      className={`${
                        language === "ar" ? "text-right" : ""
                      } w-full`}>
                      Team
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="w-full">
                    <div
                      className={`${
                        language === "ar" ? "text-right" : ""
                      } w-full`}>
                      Subscription
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="link" className="text-myblack">
                {t("navbar.mesdemandes")}
              </Button>

              <Button
                className="bg-transparent text-myblack rounded-3xl w-full h-[48px] border border-myblack"
                onClick={() => navigate("/login")}>
                {t("navbar.seconnecter")}
              </Button>
              <Button
                className="bg-primary text-myblack rounded-3xl w-full h-[48px]"
                onClick={() => navigate("/login")}>
                {t("navbar.rejoindre")}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
