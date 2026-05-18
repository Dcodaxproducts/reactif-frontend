"use client"

import PersonalInfo from "./OrderAddress/PersonalInfo"
import WhyProtection from "./OrderAddress/WhyProtection"
import Configuration from "./OrderAddress/Configuration"

const OrderAddress = () => {
  return (
    <section className="w-full flex flex-col items-center gap-10 py-8 px-5 md:px-0">
      <PersonalInfo />
      <WhyProtection />
      <Configuration route="/order/payment" />
    </section>
  )
}

export default OrderAddress
