"use client"

import React from "react"
import { FiCheckCircle, FiXCircle } from "react-icons/fi"

const Design = () => {
  const sampleImages = Array(7).fill("/assets/design.png") // 7 placeholder images

  return (
    <section className="w-full max-w-6xl flex flex-col gap-6 px-4 md:px-6">
      <div className="w-full p-9 bg-zinc-900/80 rounded-[12px] border border-neutral-50/30 flex flex-col gap-5">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-neutral-50 text-lg md:text-xl font-bold font-['HK_Grotesk']">
              Sample Design
            </h3>
            <p className="text-neutral-50/60 text-sm md:text-base font-medium font-['HK_Grotesk']">
              Upload photos of the finished vehicle to trigger payment release.
            </p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-neutral-50/30"></div>

        {/* Images Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          {sampleImages.map((src, idx) => (
            <img
              key={idx}
              className="w-full h-36 object-cover rounded-lg"
              src={src}
              alt={`Design ${idx + 1}`}
            />
          ))}
          <div className="absolute top-2 left-2 text-stone-500 text-sm font-medium font-['HK_Grotesk']">
            Side View
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col md:flex-row justify-start gap-3">
          <button className="flex items-center justify-center gap-2 w-full md:w-56 px-3 py-2 bg-blue-600 rounded-lg text-white text-sm md:text-base font-semibold font-['HK_Grotesk'] hover:bg-blue-700">
            Accept Request
          </button>

          <button className="flex items-center justify-center gap-2 w-full md:w-56 px-3 py-2 rounded-lg border border-neutral-50/30 text-neutral-50 text-sm md:text-base font-semibold font-['HK_Grotesk'] hover:bg-neutral-50/10">
            Reject
          </button>
        </div>

      </div>
    </section>
  )
}

export default Design
