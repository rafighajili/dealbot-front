import React from "react";
import { phone, bottom } from "../../assets";
import Typewriter from "typewriter-effect";

const Home = () => {
  return (
    <section
      className="bg-dark-600 h-auto lg:h-[110vh] pt-16 lg:pt-0 flex items-end relative"
      id="home"
    >
      <div className="container flex flex-col lg:flex-row h-auto lg:h-[80%]">
        <div className="flex-[2] z-10 order-last lg:order-first flex justify-center lg:justify-start">
          <img
            src={phone}
            alt=""
            className="w-[80%] xs:w-[60%] lg:w-auto mt-16 lg:mt-0"
          />
        </div>

        <div className="flex-[3]">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white pt-16 text-center lg:text-start">
            Receive push notification <br className="sm:block lg:hidden" />
            when <br className="hidden lg:block xl:hidden" />
            <Typewriter
              options={{
                strings: ["property", "car", "item"],
                autoStart: true,
                loop: true,
              }}
            /><br/>
            corresponding to your search filter is added to deal app
          </h1>

          <p className="text-neutral-300 mt-8 text-center lg:text-start">
            Do you want to get instant notifications about recent deal insertions fitting into your filters? Or maybe you want to be notified about price change on particular deal?
            You are in a right place then, buddy.
          </p>
        </div>
      </div>

      <img
        src={bottom}
        alt=""
        className="absolute bottom-0 w-full h-[100px] object-cover"
      />
    </section>
  );
};

export default Home;
