import Image from "next/image";

export function HeroCarImage() {
  return (
    <div className="relative flex w-full justify-center pt-2 lg:justify-end lg:self-start lg:pt-4 xl:pt-6">
      <Image
        src="/assets/hero/car_with_shadow.png"
        alt="Car"
        width={980}
        height={760}
        priority
        className="w-full max-w-[500px] object-contain sm:max-w-[600px] md:max-w-[680px] lg:max-w-[780px] lg:translate-x-4 xl:max-w-[900px] xl:translate-x-6 2xl:max-w-[980px]"
      />
    </div>
  );
}
