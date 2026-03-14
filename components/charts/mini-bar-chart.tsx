export function MiniBarChart({ values }: { values: number[] }) {
  const maxValue = Math.max(...values, 1);

  return (
    <div className="flex h-32 items-end gap-2">
      {values.map((value, index) => (
        <div
          key={`${value}-${index}`}
          className="flex-1 rounded-t-2xl bg-gradient-to-t from-telecom-700 to-telecom-300"
          style={{ height: `${(value / maxValue) * 100}%` }}
        />
      ))}
    </div>
  );
}
