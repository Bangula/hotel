import React, { useEffect } from "react";

// Components
import ContactForm from "./components/ContactForm";
import Map from "./components/Map";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Quantox Hotel - Contact";
  });
  return (
    <>
      <div className="header-image" />
      <div>
        <h1 className="home-header text-center text-5xl text-gray-600 z-50">
          <i className="fas fa-envelope" />
          <br />
          Contact Us
        </h1>
        <div className="flex flex-wrap contact-info container mx-auto mt-16 px-4 text-center md:text-left">
          <div className="w-full md:w-1/2 ">
            <h1 className="home-header  text-3xl text-gray-600">Info:</h1>
            <p className="leading-loose mt-8 text-lg">
              <i className="fas fa-map-marker-alt mr-2 text-gray-600" />
              Gospodara Vučića 245
            </p>
            <p className="leading-loose">
              <i className="fas fa-phone mr-2 text-gray-600 home-header" />
              +38111300400
            </p>
            <p className="leading-loose">
              <i className="fas fa-envelope mr-2 text-gray-600 home-header" />
              info@quantox.com
            </p>
          </div>
          <div className="w-full md:w-1/2 home-header mt-16 md:mt-0">
            <ContactForm />
          </div>
        </div>
      </div>
      <Map />
    </>
  );
};

export default ContactUs;
