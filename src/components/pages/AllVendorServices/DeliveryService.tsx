import DeliveryServiceHeader from "./DeliveryServiceHeader";
import DeliveryShippingCard from "./DeliveryShippingCard";

export default function DeliveryService() {
  return (
    <section className="w-full mx-auto p-6 sm:p-8 md:p-10 rounded-xl border border-stone-500/50 flex flex-col gap-8 md:gap-10">
      <DeliveryServiceHeader />
      <DeliveryShippingCard />
    </section>
  );
}
