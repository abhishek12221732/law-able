import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { lawlogo } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import { HamburgerMenu } from "./design/Header";
import MenuSvg from "../assets/svg/MenuSvg";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useSelector } from "react-redux";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-14/90 lg:backdrop-blur-sm 
      ${openNavigation ? "bg-n-14" : "bg-n-14/90 backdrop-blur-sm"}`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8 border-none" href="#hero">
          <img
            src={lawlogo}
            width={196}
            height={40}
            alt="Law-Aware logo" className="border-none outline-none"
          />
        </a>
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-n-1 xl:px-12
              ${item.onlyMobile ? "lg:hidden" : ""}
              ${
                item.url === pathname.hash
                  ? "z-2 lg:text-n-1"
                  : "lg:text-n-1/50"
              }`}
                onClick={handleClick}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>
        {
          currentUser &&  <Button className="hidden lg:flex" href="/quiz">
          Play Quiz Game
        </Button>
        }
        {!currentUser && <><Link
          to="/sign-up"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          New account
        </Link>
        <Button className="hidden lg:flex">
          <Link to="/sign-in">
          Sign in</Link>
        </Button></>}
        
        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
