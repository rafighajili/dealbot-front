import { logo } from "../../assets";

const Footer = () => {
  return (
    <footer className="bg-dark-600">
      <div className="container py-8 flex justify-between flex-wrap items-center gap-y-4 gap-x-16">
        <img src={logo} alt="" className="h-5 sm:h-6" />

        <ul className="flex flex-wrap gap-x-4 gap-y-0">
          <li>
            <a
              href="#"
              className="text-white text-xs sm:text-sm hover:text-secondary duration-300"
            >
              Home page
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white text-xs sm:text-sm hover:text-secondary duration-300"
            >
              Usage guide
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white text-xs sm:text-sm hover:text-secondary duration-300"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white text-xs sm:text-sm hover:text-secondary duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      <div className="text-center py-4 border-t-[1px] border-neutral-500">
        <p className="small text-white">© 2022 Dealbot</p>
      </div>
    </footer>
  );
};

export default Footer;
