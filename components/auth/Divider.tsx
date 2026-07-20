interface DividerProps {
  text?: string;
}

export default function Divider({
  text = "OR CONTINUE WITH",
}: DividerProps) {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/10" />
      </div>

      <div className="relative flex justify-center">
        <span className="bg-[#0B1221] px-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          {text}
        </span>
      </div>
    </div>
  );
}