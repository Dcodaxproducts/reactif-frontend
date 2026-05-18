import { projectSummary } from "@/data/order";

export function DetailsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="text-neutral-50 text-base sm:text-lg md:text-xl font-bold font-hk">
          {projectSummary.title}
        </h3>
        <p className="text-neutral-50/60 text-xs sm:text-sm md:text-base font-medium font-hk">
          {projectSummary.description}
        </p>
      </div>

      <div className="flex flex-col sm:items-end gap-0.5">
        <p className="text-neutral-50/60 text-xs sm:text-sm md:text-base font-medium font-hk">
          Due Date
        </p>
        <p className="text-red-600 text-base sm:text-lg md:text-xl font-bold font-hk">
          {projectSummary.dueDate}
        </p>
      </div>
    </div>
  );
}
