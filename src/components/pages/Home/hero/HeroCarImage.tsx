import Image from "next/image";

export function HeroCarImage() {
  return (
    <div className="relative flex w-full justify-center pt-4 md:pt-0 lg:justify-end">
      <Image
        src="/assets/hero/car_with_shadow.png"
        alt="Car"
        width={980}
        height={700}
        priority
        className="object-contain w-full max-w-[520px] sm:max-w-[620px] md:max-w-[700px] lg:max-w-[760px] xl:max-w-[860px] 2xl:max-w-[940px] lg:translate-x-6 xl:translate-x-10"
      />
    </div>
  );
}
