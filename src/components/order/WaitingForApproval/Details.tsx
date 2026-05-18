"use client"

import { Info } from "lucide-react"
import React from "react"
import { FiCheckCircle } from "react-icons/fi"

export default function Details() {

  return (

    <section className="w-full max-w-6xl mx-auto px-4 md:px-6">


      <div className="p-4 sm:p-6 md:p-9 bg-neutral-800/80 rounded-xl border border-neutral-50/30 flex flex-col gap-6">


        {/* ================= Header ================= */}

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">


          {/* Left */}

          <div className="flex flex-col gap-1">


            <h3 className="text-neutral-50 text-base sm:text-lg md:text-xl font-bold font-hk">

              Fleet Vehicle Wraps (5 Units)

            </h3>


            <p className="text-neutral-50/60 text-xs sm:text-sm md:text-base font-medium font-hk">

              Full body vinyl wraps for Ford Transit Connects.

            </p>


          </div>


          {/* Right */}

          <div className="flex flex-col sm:items-end gap-0.5">


            <p className="text-neutral-50/60 text-xs sm:text-sm md:text-base font-medium font-hk">

              Due Date

            </p>


            <p className="text-red-600 text-base sm:text-lg md:text-xl font-bold font-hk">

              Nov 12, 2025

            </p>


          </div>


        </div>



        <div className="h-px bg-neutral-50/20" />



        {/* ================= Content ================= */}

        <div className="flex flex-col md:flex-row gap-5 md:gap-6">


          {/* ================= Technical ================= */}

          <div className="flex-1 flex flex-col gap-3">


            <p className="text-neutral-50/60 text-xs sm:text-sm md:text-base font-bold font-hk">

              Technical Specifications

            </p>


            <SpecItem
              label="Material"
              value="3M IJ180Cv3 Controltac"
              icon={<FiCheckCircle size={16} className="text-blue-500" />}
            />


            <SpecItem
              label="Lamination Finish"
              value="8518 Gloss Overlaminate"
              icon={<FiCheckCircle size={16} className="text-purple-500" />}
            />


            <SpecItem
              label="Dimensions/Coverage"
              value="Full Wrap (Roof + Bumpers)"
              icon={<FiCheckCircle size={16} className="text-orange-500" />}
            />


          </div>



          {/* ================= Vehicle Details ================= */}

          <div className="flex-1 flex flex-col gap-3">


            <p className="text-neutral-50/60 text-xs sm:text-sm md:text-base font-bold font-hk">

              Vehicle Details

            </p>


            <div className="flex flex-col gap-3">


              <DetailRow
                left={{ label: "Make/Model", value: "Ford Transit Connect" }}
                right={{ label: "Year", value: "2024" }}
              />


              <DetailRow
                left={{ label: "Color", value: "Oxford White" }}
                right={{ label: "Condition", value: "New (Clean)" }}
              />



              {/* Installation Note */}


              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">


                <div className="flex gap-2">


                  <Info className="w-4 h-4 text-amber-800 mt-0.5" />


                  <div>


                    <p className="text-amber-800 text-xs font-semibold font-hk">

                      Installation Note

                    </p>


                    <p className="text-amber-800 text-xs font-medium font-hk">

                      Client requested removal of rear badges prior to install. Badges to be saved.

                    </p>


                  </div>


                </div>


              </div>


            </div>


          </div>


        </div>


      </div>


    </section>

  )

}



/* ================= Spec Item ================= */


function SpecItem({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {

  return (

    <div className="p-3 bg-zinc-900 rounded-lg border border-neutral-50/10 flex gap-2">


      {icon}


      <div>


        <p className="text-neutral-50/60 text-xs font-medium font-hk">

          {label}

        </p>


        <p className="text-neutral-50 text-sm font-semibold font-hk">

          {value}

        </p>


      </div>


    </div>

  )

}



/* ================= Detail Row ================= */


function DetailRow({
  left,
  right,
}: {
  left: { label: string; value: string }
  right: { label: string; value: string }
}) {

  return (

    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">


      <div>


        <p className="text-neutral-50/60 text-xs font-medium font-hk">

          {left.label}

        </p>


        <p className="text-neutral-50 text-sm font-semibold font-hk">

          {left.value}

        </p>


      </div>


      <div>


        <p className="text-neutral-50/60 text-xs font-medium font-hk">

          {right.label}

        </p>


        <p className="text-neutral-50 text-sm font-semibold font-hk">

          {right.value}

        </p>


      </div>


    </div>

  )

}
