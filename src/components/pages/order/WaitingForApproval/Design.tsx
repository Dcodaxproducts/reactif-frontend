import Image from "next/image";
import { Button } from "@/components/ui/button";
import { sampleDesignImages } from "@/data/order";

const Design = () => {
  return (
    <section className="w-full max-w-6xl flex flex-col gap-6 px-4 md:px-6">
      <div className="w-full p-9 bg-zinc-900/80 rounded-[12px] border border-neutral-50/30 flex flex-col gap-5">
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

        <div className="w-full h-[1px] bg-neutral-50/30" />

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          {sampleDesignImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative w-full h-36 overflow-hidden rounded-lg"
            >
              <Image
                className="object-cover"
                src={src}
                alt={`Design ${index + 1}`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
              />
            </div>
          ))}
          <div className="absolute top-2 left-2 text-stone-500 text-sm font-medium font-['HK_Grotesk']">
            Side View
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-start gap-3">
          <Button variant="brandSolid" className="flex items-center justify-center gap-2 w-full md:w-56 px-3 py-2 text-sm md:text-base font-semibold font-['HK_Grotesk']">
            Accept Request
          </Button>

          <Button variant="neutralOutline" className="flex items-center justify-center gap-2 w-full md:w-56 px-3 py-2 text-sm md:text-base font-semibold font-['HK_Grotesk']">
            Reject
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Design;
