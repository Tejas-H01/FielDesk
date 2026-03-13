const ProgressBar = ({ value, status }) => {
  const isComplete = value >= 100 || status === "Completed";
  const barColor = isComplete
    ? "from-emerald-500 to-emerald-500"
    : "from-brand-400 to-steel-500";
  return (
    <div className="h-2 w-full rounded-full bg-ink-100 dark:bg-ink-800">
      <div
        className={`h-2 rounded-full bg-gradient-to-r ${barColor} transition-[width] duration-700 ease-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ProgressBar;
