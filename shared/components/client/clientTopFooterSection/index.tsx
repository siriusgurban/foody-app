// components/FooterTopSection.jsx
import React from 'react';
import Image from 'next/image';

const FooterTopSection = () => {
    return (
        <section className="w-3/4 flex justify-around bg-client-black27 absolute items-center rounded-3xl py-12 px-0 sm:px-12 text-white">
            <Image
                className="hidden sm:block sm:w-4/12"
                width={200}
                height={0}
                src={"/footerPizza.svg"}
                alt="pizza"
            />
            <div className="flex flex-col items-center gap-5">
                <p className="font-medium text-lg sm:text-4xl w-9/12 text-center leading-tight">
                    Discover Restaurants Near From you
                </p>
                <button className="bg-client-main-orange px-14 py-4 font-medium text-md rounded-[30px] hover:scale-95 transition-all duration-500">
                    Explore now
                </button>
            </div>
            <Image
                className="hidden sm:block sm:w-4/12"
                width={250}
                height={0}
                src={"/footerBurger.svg"}
                alt="burger"
            />
        </section>
    );
};

export default FooterTopSection;
