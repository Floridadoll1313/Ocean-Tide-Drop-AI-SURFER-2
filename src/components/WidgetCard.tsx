type Props = {
  title: string;
  desc: string;
  locked?: boolean;
};

export default function WidgetCard({
  title,
  desc,
  locked,
}: Props) {
  return (
    <div
      className={`p-5 rounded-xl border ${
        locked
          ? "bg-slate-900 border-slate-700 opacity-60"
          : "bg-slate-900 border-blue-600"
      }`}
    >
      <h3 className="font-semibold mb-2">
        {locked ? "🔒 " : "⚡ "}
        {title}
      </h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  );
}