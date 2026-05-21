import Image from "next/image";

export function HeroCarImage() {
  return (
    <div className="relative flex justify-center md:justify-end pt-6 md:pt-0 w-full">
      <Image
        src="/assets/hero/car_with_shadow.png"
        alt="Car"
        width={820}
        height={586}
        priority
        className="object-contain w-[90%] sm:w-[80%] md:w-full max-w-[620px] xl:max-w-[760px] 2xl:max-w-[820px]"
      />
    </div>
  );
}
