export function VegDot({ veg }: { veg: boolean }) {
  return (
    <span
      className="inline-flex h-4 w-4 items-center justify-center border"
      style={{ borderColor: veg ? "#2f8f2f" : "#b81b1b" }}
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: veg ? "#2f8f2f" : "#b81b1b" }}
      />
    </span>
  );
}
