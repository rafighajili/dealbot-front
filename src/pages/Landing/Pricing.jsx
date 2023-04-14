import React from "react";
import { cross, checked } from "../../assets";

const Pricing = () => {
  return (
    <section className="py-32" id="pricing">
      <div className="container flex flex-col items-center">
        <h1>Pricing</h1>
        <div className=" h-0.5 w-32 my-4 bg-gradient-to-r from-primary to-secondary"></div>
        <p className="w-3/4 lg:w-1/2 text-center text-neutral-500">
        You can choose a subscription package best fitting to your needs.
        </p>
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mt-8 sm:mt-16">
        <div className="bg-neutral-100 rounded-3xl py-4 sm:py-8 lg:py-6 xl:py-8 px-8 sm:px-16 lg:px-12 xl:px-16 text-center">
          <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            BASIC
          </h4>

          <h1 className="my-8">
            5AZN<span className=" text-base">/MONTH</span>
          </h1>

          <p className="small font-medium mb-2 text-start">Including:</p>

          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-2">
              <img src={checked} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={checked} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={cross} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={cross} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={cross} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={cross} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
          </ul>

          <button className="btn w-full py-4 mt-8 text-xs sm:text-sm hover:from-secondary hover:to-primary">
            Purchase
          </button>

          <p className="small text-neutral-500 mt-2">1 month free</p>
        </div>

        <div className="bg-neutral-100 rounded-3xl py-4 sm:py-8 lg:py-6 xl:py-8 px-8 sm:px-16 lg:px-12 xl:px-16 text-center border-4 border-neutral-300 scale-100 lg:scale-105">
          <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            STANDART
          </h4>

          <h1 className="my-8">
            8AZN<span className=" text-base">/MONTH</span>
          </h1>

          <p className="small font-medium mb-2 text-start">Including:</p>

          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-2">
              <img src={checked} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={checked} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={checked} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={cross} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={cross} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={cross} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
          </ul>

          <button className="btn w-full py-4 mt-8 text-xs sm:text-sm hover:from-secondary hover:to-primary">
            Purchase
          </button>

          <p className="small text-neutral-500 mt-2">1 month free</p>
        </div>

        <div className="bg-neutral-100 rounded-3xl py-4 sm:py-8 lg:py-6 xl:py-8 px-8 sm:px-16 lg:px-12 xl:px-16 text-center">
          <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            PREMIUM
          </h4>

          <h1 className="my-8">
            12AZN<span className=" text-base">/MONTH</span>
          </h1>

          <p className="small font-medium mb-2 text-start">Including:</p>

          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-2">
              <img src={checked} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={checked} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={checked} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={checked} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={checked} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex items-center gap-2">
              <img src={checked} alt="" className="w-[16px] sm:w-[20px]" />
              <p className="small text-start">Lorem ipsum dolor sit amet</p>
            </li>
          </ul>

          <button className="btn w-full py-4 mt-8 text-xs sm:text-sm hover:from-secondary hover:to-primary">
            Purchase
          </button>

          <p className="small text-neutral-500 mt-2">1 month free</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
