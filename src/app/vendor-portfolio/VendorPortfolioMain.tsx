import Navbar from "@/components/navbar/navbar";
import Image from "next/image";
import ServiceCard from "@/components/cards/ServiceCard";
import { MapPin, Star, CheckCircle } from "lucide-react";
import GlobalBackground from "@/hooks/GlobalBackground";


const services = [
  {
    category: "Paint Protection",
    title: "Full Body Stealth",
    features: ["Self Healing", "Anti-Yellowing", "10 Yrs Warranty"],
    price: "125.00",
    popular: true,
  },
  {
    category: "Window Tinting",
    title: "Privacy Glass Edition",
    features: ["UV Protection", "Heat Reduction", "Lifetime Warranty"],
    price: "125.00",
  },
  {
    category: "Paint Protection",
    title: "Full Body Stealth",
    features: ["Self Healing", "Anti-Yellowing", "10 Yrs Warranty"],
    price: "125.00",
  },
  {
    category: "Window Tinting",
    title: "Full Body Stealth",
    features: ["Self Healing", "Anti-Yellowing", "10 Yrs Warranty"],
    price: "125.00",
  },
];


export default function VendorPortfolio() {

  return (

    <section className="relative overflow-hidden">


      <Navbar />


      {/* Background */}


    <GlobalBackground />



      <div className="w-full mx-auto px-4 sm:px-6 md:px-35 py-12 md:py-20 flex flex-col gap-10 md:gap-14">


        {/* ================= Vendor Header ================= */}


        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">


          {/* LEFT */}


          <div className="flex items-center gap-4 md:gap-5">


            {/* Avatar */}


            <div className="w-12 h-12 md:w-14 md:h-14 bg-pink-400 rounded-full flex items-center justify-center shadow-inner flex-shrink-0">


              <CheckCircle className="text-white" />


            </div>



            {/* Info */}


            <div className="min-w-0">


              <div className="flex items-center gap-2 flex-wrap">


                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-100 font-hk">

                  Reactif Studio

                </h2>


                <CheckCircle size={18} className="text-blue-500" />


              </div>



              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-stone-300 mt-1">


                <div className="flex items-center gap-1">


                  <MapPin size={12} />


                  Geneva, CH


                </div>



                <div className="flex items-center gap-1">


                  <Star size={12} className="text-yellow-400 fill-yellow-400" />


                  <span className="text-neutral-50">

                    4.9

                  </span>


                  <span>

                    (127 Reviews)

                  </span>


                </div>



                <span className="text-emerald-500">

                  Available

                </span>


              </div>


            </div>


          </div>



          {/* Contact Button */}


          <button className="px-5 py-2.5 bg-white rounded-full text-black font-medium w-fit">

            Contact

          </button>


        </div>



        {/* ================= Filter Pills ================= */}


        <div className="flex flex-wrap gap-3">


          <div className="px-4 md:px-5 py-2 bg-pink-400 rounded-full text-white text-sm md:text-base">

            All

          </div>


          <div className="px-4 md:px-5 py-2 bg-gray-900 rounded-full border border-stone-500/50 text-stone-300 text-sm md:text-base">

            Paint Protection

          </div>


          <div className="px-4 md:px-5 py-2 bg-gray-900 rounded-full border border-stone-500/50 text-stone-300 text-sm md:text-base">

            Window Tinting

          </div>


        </div>



        {/* ================= Services Grid ================= */}


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-10">


          {services.map((service, index) => (

            <ServiceCard
              key={index}
              {...service}
            />

          ))}


        </div>


      </div>


    </section>

  );

}
