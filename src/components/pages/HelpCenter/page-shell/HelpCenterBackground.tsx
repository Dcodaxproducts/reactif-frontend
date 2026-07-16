import { GlobalBackground } from "@/hooks/GlobalBackground";

export function HelpCenterBackground() {
  return (
    <>
      <GlobalBackground
        style={{
          backgroundImage: "linear-gradient(180deg, #010101 0%, #030303 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 bg-[#1e3a8a]/20 blur-[120px] opacity-50" />
        <div className="absolute left-1/2 top-[30%] h-[300px] w-[600px] -translate-x-1/2 bg-[#0a0f1c]/40 blur-[100px] opacity-50" />
      </div>
    </>
  );
}
