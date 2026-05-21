import Image from "next/image";

export function HeroCarImage() {
  return (
    <div className="relative flex w-full justify-center pt-0 lg:justify-end lg:self-start">
      <Image
        src="/assets/hero/car_with_shadow.png"
        alt="Car"
        width={980}
        height={700}
        priority
        className="object-contain w-full max-w-[500px] sm:max-w-[600px] md:max-w-[680px] lg:max-w-[780px] xl:max-w-[900px] 2xl:max-w-[980px] lg:-translate-y-12 lg:translate-x-4 xl:-translate-y-16 xl:translate-x-6"
      />
    </div>
  );
}
