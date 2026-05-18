"use client";

import React from "react";
import clsx from "clsx";

interface GlobalBackgroundProps {
  imageUrl?: string;
  overlayColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const GlobalBackground: React.FC<GlobalBackgroundProps> = ({
  imageUrl = "/assets/AllVendorServices/background.png",
  overlayColor = "#010304",
  className,
  style,
}) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 -z-50 bg-cover bg-center bg-no-repeat",
        className
      )}
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundColor: overlayColor,
        ...style,
      }}
    />
  );
};

export default GlobalBackground;