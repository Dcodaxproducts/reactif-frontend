import React, { Suspense } from "react";
import Subcategories from "./SubcategoriesMain";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div className="py-10 text-center">Loading subcategories...</div>}>
        <Subcategories />
      </Suspense>
    </div>
  );
};

export default page;