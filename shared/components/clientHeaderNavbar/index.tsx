import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const navigate = useRouter();
    const { t } = useTranslation('client');

    return (
        <ul className=" gap-2 sm:justify-around text-lg w-full sm:w-1/2 text-client-main-gray1 font-medium hidden sm:flex">
            <li onClick={() => navigate.push("/")} className={`cursor-pointer transition-all ${navigate.pathname === "/" ? "text-client-main-red" : "hover:text-client-main-red"}`}>{t("Home")}</li>
            <li onClick={() => navigate.push("/restaurants")} className={`cursor-pointer transition-all ${navigate.pathname === "/restaurants" ? "text-client-main-red" : "hover:text-client-main-red"}`}>{t("Restaurants")}</li>
            <li onClick={() => navigate.push("/about-us")} className={`cursor-pointer transition-all ${navigate.pathname === "/about-us" ? "text-client-main-red" : "hover:text-client-main-red"}`}>{t("About Us")}</li>
            <li onClick={() => navigate.push("/how-it-works")} className={`cursor-pointer transition-all ${navigate.pathname === "/how-it-works" ? "text-client-main-red" : "hover:text-client-main-red"}`}>{t("How It Works")}</li>
            <li onClick={() => navigate.push("/faqs")} className={`cursor-pointer transition-all ${navigate.pathname === "/faqs" ? "text-client-main-red" : "hover:text-client-main-red"}`}>{t("Faqs")}</li>
        </ul>
    );
}

export default Navbar;
