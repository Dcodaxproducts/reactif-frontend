import { PageShell } from "@/components/common/PageShell";
import { Configuration } from "@/components/pages/order/OrderAddress/Configuration";
import { WhyProtection } from "@/components/pages/order/OrderAddress/WhyProtection";
import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata;

const page = () => {
  return (
    <PageShell className="pb-10">
      <section className="w-full flex flex-col items-center gap-10 py-8 px-5 md:px-0">
        <WhyProtection />
        <Configuration
          buttonText="Get quote"
          backgroundColor="bg-green-500"
          textColor="text-white"
          basePrice={150.0}
          finalPrice={200.0}
          basePriceText="Gtechhalo"
          finalPriceText="Gtechhalo"
          basePriceColor="text-green-500"
          finalPriceColor="text-green-500"
          route="/paint-protection/5"
        />
      </section>
    </PageShell>
  );
};

export default page;
