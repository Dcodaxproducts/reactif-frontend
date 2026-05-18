"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {

  const [loading, setLoading] = useState(false);

  const handleRequestQuote = () => {

    setLoading(true);

    setTimeout(() => setLoading(false), 2000);

  };


  return (

    <section className="relative py-10 md:py-5 overflow-hidden">


      {/* Background */}

      <Image
        src="/assets/hero/gradient.png"
        alt="Background"
        fill
        className="object-cover -z-10"
      />



      <div className="mx-auto px-4 sm:px-6 md:px-30">


        {/* Glass Container */}

        <div className="rounded-[12px] border border-[#F5F5F580] py-12 md:py-20 px-6 sm:px-10 md:px-16 text-center">


          {/* Heading */}

          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6"
            style={{
              background:
                "linear-gradient(90deg, #FF6EC7 0%, #9F73F1 50%, #5FC5FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >

            READY TO BRING YOUR PROJECT TO LIFE?

          </h2>



          {/* Description */}

          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-8 md:mb-10 font-hk">

            Contact us today for a free personalized quote. Our team of experts is available to advise you.

          </p>



          {/* Button */}

          <div className="flex justify-center">

            <Link  href="/all-vendor-services"
              onClick={handleRequestQuote}
              className="px-5 md:px-6 py-2.5 md:py-3 text-[14px] md:text-[15px] rounded-full font-medium 
                         bg-white text-black font-sans
                         flex items-center gap-2
                         transition-all duration-300
                         hover:opacity-90"
              style={{
                boxShadow: "0px 0px 85px 0px #FFFFFF",
              }}
            >

              {loading ? (

                "Requesting..."

              ) : (

                <>
                  Request a Free Quote
                  <ArrowRight size={18} />
                </>

              )}

            </Link>

          </div>


        </div>


      </div>


    </section>

  );

}
