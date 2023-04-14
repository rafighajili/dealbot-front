import React from "react";
import { halfphone } from "../../assets";

const Trial = () => {
  return (
    <section className="bg-dark-600 pt-10" id="pricing">
      <div className="container flex flex-col items-center">
        <h1 className="text-white">Get your 1 month free subscription NOW!</h1>
        <div className=" h-0.5 w-32 my-4 bg-gradient-to-r from-primary to-secondary"></div>
        <p className="w-3/4 lg:w-1/2 text-center text-neutral-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          voluptatem modi, ut facere rerum optio nobis. Fuga nemo eos iure!
        </p>
      </div>

      <div className="container text-white flex flex-col items-center">
        <button className="btn py-4 px-8 text-xs sm:text-sm my-8 before:bg-dark-600">
          Register
        </button>
        <img src={halfphone} alt="" className="w-[300px]" />
      </div>
    </section>
  );
};

export default Trial;
