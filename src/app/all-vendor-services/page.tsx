import React, { Suspense } from "react";
import AllVendorServicesMain from "./AllVendorServicesMain";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div className="py-10 text-center">Loading subcategories...</div>}>
        <AllVendorServicesMain />
      </Suspense>
    </div>
  );
};

export default page;