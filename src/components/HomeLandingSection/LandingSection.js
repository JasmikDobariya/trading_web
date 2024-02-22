import Image from "next/image";
import React from "react";

const LandingSection = () => {
  return (
    <section>
      <div className="container m-auto pt-8">
        <div className="lg:grid lg:grid-cols-2 h-full flex flex-col  ">
          <div className="flex  justify-center p-8 gap-5  flex-col">
            <h1 className="text-6xl font-bold" > Invest Your Money With <span className="text-blue-700">Higher Return</span></h1>
            <span className="text-gray-500">
              Anyone can invest money to different currency to increase their
              earnings by the help of Bitrader through online
            </span>
            <div>
            <div className=" lg:py-3 lg:px-10 lg:w-[30%] py-3 px-2 text-center bg-green-500 rounded-lg">
              <button>Learn More</button>
            </div>
              
            </div>
          </div>
          <div>
            <div className="flex  justify-center items-center" >
              <Image className="animate-pulse" src="/homePageImages/landing_page_image.png" width={500} height={500} alt="main image"  />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
