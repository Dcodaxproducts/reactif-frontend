import { CheckCircle } from "lucide-react";

function TermsBlock({
  id,
  title,
  content,
  list,
  highlight,
}: any) {
  return (
    <div className="space-y-4">
      {/* TITLE ROW */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 flex items-center justify-center rounded-md bg-pink-500/20 text-pink-400 text-sm font-bold">
          {id}
        </div>

        <h3 className="text-white text-lg md:text-xl font-semibold">
          {title}
        </h3>
      </div>

      {/* CONTENT (aligned under title, not number) */}
      <div className="pl-10 space-y-4">
        {/* PARAGRAPHS */}
        {content?.map((text: string, i: number) => (
          <p
            key={i}
            className="text-slate-400 text-sm md:text-base leading-relaxed"
          >
            {text}
          </p>
        ))}

        {/* LIST */}
        {list && (
          <div className="space-y-3">
            {list.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle
                  className="text-pink-500 mt-1 flex-shrink-0"
                  size={16}
                />
                <p className="text-slate-400 text-sm md:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* HIGHLIGHT */}
        {highlight && (
          <div className="border-l-2 border-pink-500 pl-4 py-3 bg-pink-500/5 rounded-md text-slate-300 text-sm">
            "{highlight}"
          </div>
        )}
      </div>
    </div>
  );
}
export default TermsBlock