type SpecialistTagsProps = {
  tags: string[];
};

export const SpecialistTags = ({ tags }: SpecialistTagsProps) => {
  const uniqueTags = [...new Set(tags)];

  return (
    <div className="flex gap-2 flex-wrap">
      {uniqueTags.length ? (
        uniqueTags.map((tag) => (
          <span
            key={tag}
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
};
