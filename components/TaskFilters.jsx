const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

export default function TaskFilters({ filter, setFilter }) {
  return (
    <div className="segmented" aria-label="Task filters">
      {filters.map((item) => (
        <button
          key={item.value}
          className={`segment ${filter === item.value ? "active" : ""}`}
          type="button"
          onClick={() => setFilter(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
