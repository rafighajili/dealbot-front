import React from "react";
import { useState } from "react";

import { sc } from "../../assets";
import { confirm_tg } from "../../assets";
import { step_3 } from "../../assets";
import { step_4 } from "../../assets";


const HowItWorks = () => {
  const [activeMenuTab, setActiveMenuTab] = useState("content1");

  window.addEventListener("scroll", () => {
    // active menu tab
    const contents = document.querySelectorAll(".content div");

    contents.forEach((content) => {
      if (pageYOffset >= content.offsetTop - 200) {
        setActiveMenuTab(content.getAttribute("id"));
      }
    });
  });

  return (
    <section className="py-32" id="howitworks">
      <div className="container flex flex-col items-center">
        <h1>Usage guide</h1>
        <div className=" h-0.5 w-32 my-4 bg-gradient-to-r from-primary to-secondary"></div>
        <p className="w-3/4 lg:w-1/2 text-center text-neutral-500">
          Get acquintated with our usage guide and start rocking!
        </p>
      </div>

      <div className="container grid grid-cols-howitworks gap-16 mt-16">
        <div className="sidemenu">
          <ul className="sticky h-[360px] flex flex-col justify-around top-[calc(50%-180px+32px)]">
            <li>
              <a
                href="#content1"
                className={`py-4 px-8 font-medium flex rounded-lg hover:bg-neutral-200 duration-300 ${
                  activeMenuTab == "content1" ? "text-secondary" : ""
                }`}
              >
                Register and Log in
              </a>
            </li>
            <li>
              <a
                href="#content2"
                className={`py-4 px-8 font-medium flex rounded-lg hover:bg-neutral-200 duration-300 ${
                  activeMenuTab == "content2" ? "text-secondary" : ""
                }`}
              >
                Confirm Telegram Log in
              </a>
            </li>
            <li>
              <a
                href="#content3"
                className={`py-4 px-8 font-medium flex rounded-lg hover:bg-neutral-200 duration-300 ${
                  activeMenuTab == "content3" ? "text-secondary" : ""
                }`}
              >
                Insert links
              </a>
            </li>
            <li>
              <a
                href="#content4"
                className={`py-4 px-8 font-medium flex rounded-lg hover:bg-neutral-200 duration-300 ${
                  activeMenuTab == "content4" ? "text-secondary" : ""
                }`}
              >
                Change subscription
              </a>
            </li>
            <li>
              <a
                href="#content5"
                className={`py-4 px-8 font-medium flex rounded-lg hover:bg-neutral-200 duration-300 ${
                  activeMenuTab == "content5" ? "text-secondary" : ""
                }`}
              >
                Lorem ipsum dolor sit amet
              </a>
            </li>
          </ul>
        </div>

        <div className="content">
          <div className="h-[80vh]" id="content1">
            <img src={sc} alt="" /> <br />
            <p>If you want to register as an advertisement manager for publishing ads to telegram audience, you should use register/log in buttons on the left. If getting notifications about price changes and fresh deals is interesting for you, you should register with your telegram account, using 'Log in with Telegram' button.</p>
          </div>
          <div className="h-[80vh]" id="content2">
            <img src={confirm_tg} alt="" /> <br />
            <p>Confirm your Telegram log in by pressing 'Confirm' button in chat with 'Telegram'</p>
          </div>
          <div className="h-[80vh]" id="content3">
            <img src={step_3} alt="" /> <br />
            <p>You can start inserting your filtered links to 'Fresh deal parsing' or 'Price tracking' modules by typing title and url to relevant inputs. You can also delete links by pressing 'Delete'</p>          
          </div>
          <div className="h-[80vh]" id="content4">
            <img src={step_4} alt="" /> <br />
            <p>Limits for Basic plan is 3, for Standart plan is 5, and for Premium plan, 8. You may run into an error if you try to add more links than your subscription limit. You can always upgrade or downgrade your plan from 'Change subscription' page.</p>
          </div>
          <div className="h-[80vh]" id="content5">
            Content 5
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
