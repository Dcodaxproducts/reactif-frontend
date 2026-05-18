"use client";

import Image from "next/image";
import { IconType } from "react-icons";
import { FiPhone } from "react-icons/fi";
import { FaShieldAlt, FaAward, FaUsers, FaTools, FaRocket } from "react-icons/fa";
import { SectionHeader } from "../shared/SectionHeader";


/* =========================
   Card
========================= */

interface WhyCardProps {
  title: string;
  description: string;
  icon: IconType;
  variant?: "pink" | "blue" | "red";
}


function WhyCard({
  title,
  description,
  icon: Icon,
  index,
}: WhyCardProps & { index: number }) {


  const isPink = index === 0 || index === 3;


  return (

    <div className="rounded-[12px] border border-[#F5F5F580] bg-[#14161C] p-6 md:p-8 transition hover:border-white/40">


      {/* Icon */}

      <div
        className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white text-lg md:text-xl mb-4 md:mb-6"
        style={{
          background: `
            linear-gradient(${isPink ? "#F262B5" : "#5FC5FF"}, ${isPink ? "#F262B5" : "#5FC5FF"}) padding-box,
            linear-gradient(258.29deg, rgba(255,255,255,0.05) -1.28%, #FFFFFF 44.49%, rgba(255,255,255,0.05) 100%) border-box
          `,
          border: "0.5px solid transparent",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: `
            inset 0px 2px 4px 0px #FFFFFF66,
            inset 0px -2px 4px 0px #00000033
          `,
        }}
      >

        <Icon size={20} />

      </div>



      <h3 className="text-white text-lg md:text-xl font-semibold mb-2 md:mb-3 font-hk">

        {title}

      </h3>



      <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6">

        {description}

      </p>



      {/* Arrow */}

      <div className="flex items-center gap-2">

        <span
          className={`w-8 md:w-10 h-[2px] ${
            isPink ? "bg-[#F262B5]" : "bg-[#5FC5FF]"
          }`}
        />

        <span className="text-white/70 text-[24px] md:text-[30px]">

          ›

        </span>

      </div>


    </div>

  );

}


/* =========================
   Section
========================= */

export default function WhyChooseUs() {


  const whyData = [

    {
      title: "Recognized Expertise",
      description:
        "Over 15 years of experience in automotive visual communication",
      icon: FiPhone,
    },

    {
      title: "Recognized Expertise",
      description:
        "Over 15 years of experience in automotive visual communication",
      icon: FaShieldAlt,
    },

    {
      title: "Recognized Expertise",
      description:
        "Over 15 years of experience in automotive visual communication",
      icon: FaAward,
    },


    {
      title: "Recognized Expertise",
      description:
        "Over 15 years of experience in automotive visual communication",
      icon: FaUsers,
    },

    {
      title: "Recognized Expertise",
      description:
        "Over 15 years of experience in automotive visual communication",
      icon: FaTools,
    },

    {
      title: "Recognized Expertise",
      description:
        "Over 15 years of experience in automotive visual communication",
      icon: FaRocket,
    },

  ];


  return (

    <section className="relative py-16 md:py-28 overflow-hidden">


      {/* Background */}

      <Image
        src="/assets/hero/gradient.png"
        alt="Background"
        fill
        className="object-cover -z-10"
      />


      <div className="mx-auto px-4 sm:px-6 md:px-30">


        {/* Header */}

        <SectionHeader
          badgeText="Our Commitment"
          title={
            <>
              WHY{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #F262B5 0%, #9F73F1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                CHOOSE US
              </span>
            </>
          }
          description="Our Commitment To Excellence And Your Satisfaction Makes Us The Ideal Partner For Your Visual Communication Projects."
        />


        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">


          {whyData.map((item, index) => (

            <WhyCard key={index} {...item} index={index} />

          ))}


        </div>


      </div>


    </section>

  );

}
