import Image from "next/image";

export function HeroCarImage() {
  return (
    <div className="relative flex justify-center md:justify-end pt-6 md:pt-5">
      <Image
        src="/assets/hero/car_with_shadow.png"
        alt="Car"
        width={700}
        height={500}
        priority
        className="object-contain w-[90%] sm:w-[80%] md:w-auto max-w-[700px]"
      />
    </div>
  );
}
