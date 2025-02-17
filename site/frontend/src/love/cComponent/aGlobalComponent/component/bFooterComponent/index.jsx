import brand from "@/love/dFunction/gBrand";
import FinalRouteName from "@/love/gRoute/FinalRouteName";
import React from "react";
import { Link } from "react-router-dom";

function FooterComponent({ Redux }) {
  return (
    Redux?.state?.RequiredObject?.Loading ? null :
    <React.Fragment>
      <footer className="backdrop-blur supports-[backdrop-filter]:bg-[#F2EDD7]/60 dark:supports-[backdrop-filter]:bg-[#755139]/60 text-[#755139] dark:text-[#F2EDD7]">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link to={FinalRouteName.GlobalRoute.HomeRoute} className="flex title-font font-medium items-center mb-4 md:mb-0">
            <img className="w-10 h-10 object-cover object-center rounded" alt="hero" src={brand().logo} />
            <span className="ml-3 text-xl">{brand().name}</span>
          </Link>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2024 {brand().name}</p>
          </span>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default FooterComponent;
