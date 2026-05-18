"use client";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactForm() {

  return (

    <div className="w-full mx-auto rounded-xl border border-stone-500 flex flex-col md:flex-row overflow-hidden">


      {/* ================= LEFT PANEL ================= */}

      <div className="relative p-6 sm:p-8 md:p-12 md:max-w-[51%] w-full flex flex-col gap-10 md:gap-14 bg-black/40 backdrop-blur-xl">


        <h2 className="text-white text-2xl md:text-3xl font-semibold uppercase font-hk">

          Contact Information

        </h2>



        {/* Contact Items */}

        <div className="flex flex-col gap-6 md:gap-8">


          {[
            {
              icon: FaPhoneAlt,
              label: "Phone",
              value: "+33 1 23 45 67 89",
            },
            {
              icon: FaEnvelope,
              label: "Email",
              value: "reactif@gmail.com",
            },
            {
              icon: FaMapMarkerAlt,
              label: "Address",
              value: "123 Avenue des Champs, Paris, France",
            },
          ].map((item, index) => (

            <div key={index} className="flex items-start gap-4">


              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-800/60 border border-pink-600 flex items-center justify-center">

                <item.icon className="text-pink-500 text-sm md:text-lg" />

              </div>


              <div className="flex flex-col gap-1">

                <span className="text-[#F5F5F580] text-xs md:text-sm font-medium">

                  {item.label}

                </span>

                <span className="text-white text-sm md:text-md font-semibold">

                  {item.value}

                </span>

              </div>

            </div>

          ))}


        </div>



        {/* Trusted */}

        <div className="relative mt-6 md:mt-10 rounded-xl border border-white/50 p-4 md:p-6 overflow-hidden">


          <div
            className="absolute inset-0 blur-[20px]"
            style={{
              background:
                "conic-gradient(from 146deg at 50% 98%, rgba(242,98,181,0) 125deg, rgba(95,197,255,0.2) 193deg, rgba(128,84,255,0.2) 236deg, rgba(119,157,255,0.2) 260deg, rgba(159,115,241,0) 311deg)",
            }}
          />


          <div className="relative z-10 flex flex-col gap-4 md:gap-6">


            <span className="text-[#F5F5F580] text-xs md:text-sm font-medium">

              Trusted By

            </span>


            <div className="flex items-center flex-wrap">


              {[...Array(6)].map((_, i) => (

                <div
                  key={i}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-700 bg-zinc-800 -ml-2 first:ml-0"
                >

                  <img
                    src="/assets/hero/user.png"
                    alt={`user ${i + 1}`}
                    className="w-full h-full object-cover rounded-full"
                  />

                </div>

              ))}


              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center -ml-2 bg-black">

                <span className="text-white text-[10px] md:text-xs font-semibold">

                  500+

                </span>

              </div>


            </div>


          </div>


        </div>


      </div>



      {/* ================= RIGHT PANEL ================= */}

      <div className="relative flex-1 overflow-hidden">


        {/* Glow */}

        <div
          className="absolute inset-0 blur-[20px]"
          style={{
            background:
              "conic-gradient(from 162deg at 58% 96%, rgba(255,172,136,0.5) 0deg, rgba(242,98,181,0) 125deg, rgba(95,197,255,0.5) 193deg, rgba(128,84,255,0.5) 236deg, rgba(119,157,255,0.5) 260deg, rgba(159,115,241,0) 311deg)",
          }}
        />


        <div className="relative z-10 flex flex-col gap-6 md:gap-8 bg-black/40 backdrop-blur-xl border-t md:border-t-0 md:border-l border-stone-500 p-6 sm:p-8 md:p-10">


          {/* Name */}

          <div className="flex flex-col gap-2">

            <label className="text-[#F5F5F580] text-xs md:text-sm font-medium">

              Full Name

            </label>

            <input className="h-11 md:h-12 rounded-xl bg-zinc-800/25 border border-white/10 px-4 text-white outline-none focus:border-blue-500 transition" />

          </div>



          {/* Email Phone */}

          <div className="flex flex-col sm:flex-row gap-4 md:gap-5">


            {["Email", "Phone"].map((label, i) => (

              <div key={i} className="flex-1 flex flex-col gap-2">


                <label className="text-[#F5F5F580] text-xs md:text-sm font-medium">

                  {label}

                </label>


                <input className="h-11 md:h-12 rounded-xl bg-zinc-800/25 border border-white/10 px-4 text-white outline-none focus:border-blue-500 transition" />

              </div>

            ))}


          </div>



          {/* Select */}

          <div className="flex flex-col gap-2">

            <label className="text-[#F5F5F580] text-xs md:text-sm font-medium">

              Service Interested In

            </label>


            <select className="h-11 md:h-12 rounded-xl bg-zinc-800/25 border border-blue-600 px-4 text-white outline-none">

              <option>Select a service</option>

            </select>

          </div>



          {/* Message */}

          <div className="flex flex-col gap-2">


            <label className="text-[#F5F5F580] text-xs md:text-sm font-medium">

              Message

            </label>


            <textarea className="h-32 md:h-40 rounded-2xl bg-zinc-800/25 border border-white/10 px-4 py-3 text-white outline-none resize-none focus:border-blue-500 transition" />

          </div>



          {/* Button */}

          <button className="h-11 md:h-12 bg-white rounded-xl text-zinc-800 text-base md:text-lg font-semibold flex justify-center items-center gap-2 hover:scale-[1.02] transition">

            Send Message →

          </button>


        </div>


      </div>


    </div>

  );

}
