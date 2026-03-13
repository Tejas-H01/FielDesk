const tones = {
  Active: "bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200",
  Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        tones[status] || "bg-ink-100 text-ink-600 dark:bg-ink-700 dark:text-ink-200"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
