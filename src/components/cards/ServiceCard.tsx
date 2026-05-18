"use client";

import { Star, Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

interface ServiceCardProps {
  category: string;
  title: string;
  features: string[];
  price: string;
  popular?: boolean;
}




export default function ServiceCard({
  category,
  title,
  features,
  price,
  popular,
}: ServiceCardProps) {
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();

  return (

    <div
      className={`w-full p-6 sm:p-8 md:p-10 bg-neutral-900/80 rounded-xl border 
      ${
        popular
          ? "border-pink-400 shadow-[0px_0px_20px_rgba(242,98,181,0.5)]"
          : "border-stone-500/50"
      }
      flex flex-col justify-between gap-10 md:gap-16`}
    >


      {/* Top */}


      <div className="flex justify-between items-start gap-3 flex-wrap">


        <div className="px-3 py-1.5 bg-gray-900 rounded-full border border-stone-500/50 text-xs text-stone-300">

          {category}

        </div>



        {popular && (

          <div className="px-3 py-1.5 bg-pink-400 rounded-full flex items-center gap-1 text-white text-xs">

            <Star size={14} className="text-amber-300 fill-amber-300" />

            Popular

          </div>

        )}


      </div>



      {/* Middle */}


      <div className="flex flex-col gap-6 md:gap-8">


        <div>


          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-50 font-inter">

            {title}

          </h3>



          <div className="flex flex-wrap gap-2 mt-3 md:mt-4">


            {features.map((feature, index) => (

              <div
                key={index}
                className="px-2 py-1 md:px-2.5 md:py-1 rounded border border-stone-500/50 flex items-center gap-1 text-[11px] md:text-xs text-stone-300"
              >

                <Check size={12} className="text-emerald-500" />

                {feature}

              </div>

            ))}


          </div>


        </div>



        <div className="h-px bg-white/20" />


      </div>



      {/* Bottom */}


      <div className="flex justify-between items-center">


        <div>


          <p className="text-xs text-stone-500 font-hk">

            STARTING FROM

          </p>



          <p className="text-xl sm:text-2xl font-bold text-neutral-50 font-hk">

            $ {price}

          </p>


        </div>



        <Link href={`/portfolio-details${queryString ? `?${queryString}` : ""}`}
          className={`w-9 h-9 md:w-10 md:h-10 rounded-[20px] flex items-center justify-center 
          ${popular ? "bg-pink-400" : "bg-white"}`}
        >


          <ArrowUpRight
            size={18}
            className={popular ? "text-white" : "text-black"}
          />


        </Link>


      </div>


    </div>

  );

}
