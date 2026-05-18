"use client";

import { Truck, BadgeCheck } from "lucide-react";

export default function DeliveryService() {

  const carriers = ["DHL Express", "UPS", "DPD", "Swiss Post"];


  return (

    <section className="w-full mx-auto p-6 sm:p-8 md:p-10 rounded-xl border border-stone-500/50 flex flex-col gap-8 md:gap-10">


      {/* HEADER */}


      <div className="flex flex-col items-center gap-3 md:gap-4 text-center">


        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase font-hk text-neutral-50">


          Delivery{" "}


          <span
            className="font-mulish text-3xl sm:text-4xl md:text-5xl font-bold uppercase"
            style={{
              background:
                "linear-gradient(90deg, #F262B5 0%, #5FC5FF 42.79%, #FFAC89 55.77%, #8155FF 69.23%, #789DFF 82.21%, #9F73F1 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >

            Service

          </span>


        </h2>



        <p className="max-w-[600px] text-stone-300 text-sm sm:text-base font-medium font-hk">


          We ensure your products arrive safely and on time, whether through our trusted
          partners or our specialized installation team.


        </p>


      </div>



      {/* INNER CARD */}


      <div className="w-full p-6 sm:p-8 md:p-10 rounded-xl border border-stone-500/50 flex flex-col items-center gap-5 md:gap-6 text-center">


        {/* Title */}


        <div className="flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-bold text-white">


          <Truck className="text-indigo-400" size={24} />


          Nationwide Shipping


        </div>



        {/* Description */}


        <p className="text-stone-300 text-sm sm:text-base max-w-[700px]">


          We ship orders through reputable Swiss carriers to ensure fast and
          reliable delivery throughout the country.


        </p>



        {/* Carriers */}


        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mt-3 md:mt-4">


          {carriers.map((carrier, index) => (

            <div
              key={index}
              className="px-4 md:px-5 py-2 rounded-full border border-stone-500/50 flex items-center gap-2 text-white text-sm md:text-base font-semibold hover:border-indigo-400 transition"
            >


              <BadgeCheck size={16} className="text-indigo-400" />


              {carrier}


            </div>

          ))}


        </div>


      </div>


    </section>

  );

}
