import { logo, menu, close } from "../../assets";
import { useState, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);

  const sidemenu = useRef();

  useClickOutside(sidemenu, () => setToggle(false));

  window.addEventListener("scroll", () => {
    // scrolled nav
    if (window.scrollY > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // active tab
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      if (pageYOffset >= section.offsetTop - 200) {
        setActiveTab(section.getAttribute("id"));
      }
    });
  });

  const tgBtn = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("src", "https://telegram.org/js/telegram-widget.js?21");
    script.setAttribute("data-telegram-login", "turboazparser_bot");
    script.setAttribute("data-size", "medium");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    tgBtn?.current?.appendChild(script);
    return () => {
      tgBtn?.current?.removeChild(script);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full duration-500 ${
        scrolled ? "bg-dark-600 py-4 shadow-md" : "py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        <img
          src={logo}
          alt="logo"
          className="h-[24px] cursor-pointer pointer-events-auto"
          onClick={() => {
            window.scroll(0, 0);
          }}
        />

        <ul
          ref={sidemenu}
          className={`bg-dark-600 xl:bg-transparent flex items-center xl:translate-x-0 xl:relative xl:flex-row flex-col absolute right-0 top-0 w-2/3 sm:w-1/2 md:w-1/3 h-[100vh] xl:w-auto xl:h-auto p-8 xl:p-0 gap-8 xl:gap-4 z-20 ${
            toggle ? "translate-x-0" : "translate-x-full"
          } duration-300`}
        >
          <li className="self-start xl:hidden">
            <img
              src={close}
              alt=""
              className="w-[20px] h-[20px]  cursor-pointer pointer-events-auto z-10"
              onClick={() => setToggle(false)}
            />
          </li>
          <li>
            <a
              href="#"
              className={`navTab ${activeTab == "home" ? "active" : ""}`}
              onClick={() => setToggle(false)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#howitworks"
              className={`navTab ${activeTab == "howitworks" ? "active" : ""}`}
              onClick={() => setToggle(false)}
            >
              Usage guide
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className={`navTab ${activeTab == "pricing" ? "active" : ""}`}
              onClick={() => setToggle(false)}
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`navTab ${activeTab == "contact" ? "active" : ""}`}
              onClick={() => setToggle(false)}
            >
              Contact
            </a>
          </li>
          <li>
            <button className="btn before:bg-[hsla(0,0%,0%,0.5)] text-xs text-white duration-500 px-8 py-2">
              <Link to="/register">Register</Link>
            </button>
          </li>
          <li>
            <button className="btn before:bg-[hsla(0,0%,0%,0.25)] text-xs text-white duration-500 px-8 py-2">
              <Link to="/login">Log in</Link>
            </button>
          </li>
          <li className="flex">
            <button ref={tgBtn}></button>
          </li>
        </ul>

        <img
          src={menu}
          alt=""
          className="flex xl:hidden w-[24px] h-[24px] cursor-pointer pointer-events-auto"
          onClick={() => setToggle(true)}
        />

        <div
          className={`fixed bg-black w-[100vw] h-[100vh] top-0 left-0 z-10 ${
            toggle ? "opacity-50" : "opacity-0 pointer-events-none"
          } duration-300`}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
