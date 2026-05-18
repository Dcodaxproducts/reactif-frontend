type SpecialistTagsProps = {
  tags: string[];
};

export const SpecialistTags = ({ tags }: SpecialistTagsProps) => (
  <div className="flex gap-2 flex-wrap">
    {tags?.length ? (
      tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 md:px-3 py-1 text-[11px] md:text-xs text-stone-300 border border-stone-500 rounded-md"
        >
          {tag}
        </span>
      ))
    ) : (
      <span className="px-2 md:px-3 py-1 text-[11px] md:text-xs text-stone-300 border border-stone-500 rounded-md">
        Designer
      </span>
    )}
  </div>
);
