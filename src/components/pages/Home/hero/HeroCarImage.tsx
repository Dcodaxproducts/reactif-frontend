import Image from "next/image";

const speedLineKeys = [
  "speed-line-1",
  "speed-line-2",
  "speed-line-3",
  "speed-line-4",
  "speed-line-5",
  "speed-line-6",
  "speed-line-7",
];

export function HeroCarImage() {
  return (
    <div
      className="relative flex min-h-[330px] w-full items-center justify-center pt-2 transition-transform duration-300 sm:min-h-[420px] lg:min-h-[550px] lg:justify-end lg:self-center lg:pt-0"
      style={{
        transform:
          "translate3d(calc(var(--hero-parallax-x, 0px) * 0.68), calc(var(--hero-parallax-y, 0px) * 0.58), 0)",
      }}
    >
      <div className="hero-showcase-stage" aria-hidden="true">
        <div className="hero-showcase-atmosphere" />
        <div className="hero-showcase-speed-lines">
          {speedLineKeys.map((key) => (
            <span key={key} />
          ))}
        </div>
        <div className="hero-showcase-road hero-showcase-road-cyan" />
        <div className="hero-showcase-road hero-showcase-road-pink" />
        <div className="hero-showcase-reflection" />

        <div className="hero-showcase-car">
          <Image
            src="/assets/hero/reactif-neon-car.png"
            alt=""
            width={1363}
            height={470}
            priority
            sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 54vw, 95vw"
            className="hero-showcase-car-image"
          />
          <span className="hero-showcase-wheel hero-showcase-wheel-front">
            <span />
          </span>
          <span className="hero-showcase-wheel hero-showcase-wheel-rear">
            <span />
          </span>
        </div>
      </div>
    </div>
  );
}
