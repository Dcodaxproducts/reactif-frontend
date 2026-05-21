import { useEffect, useState } from "react";

export function useOtpCountdown(initialSeconds = 60) {
  const [countdown, setCountdown] = useState(initialSeconds);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const restartCountdown = () => setCountdown(initialSeconds);

  return { countdown, restartCountdown };
}
