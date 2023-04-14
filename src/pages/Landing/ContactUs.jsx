import React from "react";

const ContactUs = () => {
  return (
    <section className="py-20" id="contact">
      <div className="container flex flex-col items-center">
        <h1>Contact us</h1>
        <div className=" h-0.5 w-32 my-4 bg-gradient-to-r from-primary to-secondary"></div>
        <p className="w-3/4 lg:w-1/2 text-center text-neutral-500">
          Don't hesitate contacting us when you have an issue using the app.
        </p>
      </div>

      <div className="container"></div>
    </section>
  );
};

export default ContactUs;
