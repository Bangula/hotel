import React from "react";
import ringImg from "@assets/images/services/ring.jpg";
import serviceGym from "@assets/images/services/service_gym.jpg";
import servicePool from "@assets/images/services/service_pool.jpg";
import serviceRestauraunt from "@assets/images/services/service_restauraunt.jpg";
import serviceWellness from "@assets/images/services/service_wellness.jpg";
const Services = () => {
  return (
    <>
      <div className="header-image" />
      <div className="container mx-auto flex flex-wrap ">
        <div className="w-1/2 ring-image">
          <img src={ringImg} alt="ring image" className="m-auto pt-6 " />
        </div>
        <div className="w-1/2">
          <h2 className="text-4xl mb-8">
            {" "}
            A wonderful serenity has taken <br /> possession of my entire soul{" "}
          </h2>
          <p className="text-xl tracking-wide leading-loose text-justify mb-8  text-gray-600">
            {" "}
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            upidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Sed ut perspiciatis unde omnis iste natu.
          </p>
          <h4 className="mb-6 text-xl text-gray-900 tracking-wider">
            {" "}
            SERVICE DETAILS{" "}
          </h4>
          <div className="flex justify-between  text-2xl ">
            <i className="far fa-check-circle text-orange-400 pt-4 pr-4" />
            <p className="tracking-wide text-gray-600 mb-4 text-xl">
              {" "}
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit.
            </p>
          </div>
          <div className="flex justify-between  text-2xl ">
            {" "}
            <i className="far fa-check-circle text-orange-400 pt-4 pr-4" />
            <p className="tracking-wide text-gray-600 mb-4 text-xl">
              {" "}
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
          </div>
        </div>
      </div>
      <section className="mt-10 max-h-full  text-4xl">
        <div className="services flex max-h-full text-center">
          <div className="services__gym ">
            <i className="fas fa-dumbbell text-orange-600 " />
          </div>

          <div className="services__pool">
            <i className="fas fa-swimmer text-orange-600" />
          </div>

          <div className="services__sport">
            <i className="fas fa-basketball-ball text-orange-600" />
          </div>

          <div className="services__wellness">
            <i className="fas fa-spa text-orange-600" />{" "}
          </div>
        </div>

        <div className="services2 flex max-h-full text-center">
          <div className="services2__restauraunt w-1/2">
            <i className="fas fa-utensils text-orange-600" />
          </div>

          <div className="services2__rent w-1/2">
            <i className="fas fa-car text-orange-600" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
