export function TailoredServicesAnimations() {
  return (
    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      @keyframes fadeUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
  );
}
