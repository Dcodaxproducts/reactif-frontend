export default function DeliveryServiceHeader() {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase font-hk text-neutral-50">
        Delivery{" "}
        <span
          className="font-mulish text-3xl sm:text-4xl md:text-5xl font-bold uppercase"
          style={{
            background:
              "linear-gradient(90deg, #F262B5 0%, #5FC5FF 42.79%, #FFAC89 55.77%, #8155FF 69.23%, #789DFF 82.21%, #9F73F1 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Service
        </span>
      </h2>

      <p className="max-w-[600px] text-stone-300 text-sm sm:text-base font-medium font-hk">
        We ensure your products arrive safely and on time, whether through our
        trusted partners or our specialized installation team.
      </p>
    </div>
  );
}
