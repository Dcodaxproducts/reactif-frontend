
import Navbar from "@/components/navbar/navbar";
import OrderAddress from "@/components/order/OrderAddress";


export default function Page() {

  return (

    <section className="relative overflow-hidden">
      <Navbar />
       <div
  className="fixed top-0 left-0 w-screen h-screen -z-50 bg-cover bg-center bg-no-repeat bg-[#010304]"
  style={{
    backgroundImage: "url('/assets/AllVendorServices/background.png')",
  }}
/>
      <OrderAddress />
    </section>

  );

}
