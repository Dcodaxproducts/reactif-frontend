import Navbar from "@/components/layout/navbar/navbar";
import Configuration from "@/components/pages/order/OrderAddress/Configuration";
import WhyProtection from "@/components/pages/order/OrderAddress/WhyProtection";
import GlobalBackground from "@/hooks/GlobalBackground";
import Image from "next/image";

const page = () => {
  return (
    <section className="relative overflow-hidden pb-10">
      <Navbar />
      <GlobalBackground />

      <section className="w-full flex flex-col items-center gap-10 py-8 px-5 md:px-0">
        <WhyProtection />
        <Configuration
          buttonText="Get quote"
          backgroundColor="bg-green-500" // Dynamic green background
          textColor="text-white" // White text color
          basePrice={150.0} // Dynamic base price
          finalPrice={200.0} // Dynamic final price
          basePriceText="Gtechhalo" // Dynamic base price text
          finalPriceText="Gtechhalo" // Dynamic final price text
          basePriceColor="text-green-500" // Dynamic color for Base Price text
          finalPriceColor="text-green-500" // Dynamic color for Final Price text
          route="/paint-protection/5"
        />
      </section>
    </section>
  );
};

export default page;
